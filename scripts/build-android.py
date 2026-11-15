"""Build and sign a sideloadable APK from isolated app source; never launch UI."""
import argparse
import hashlib
import importlib.util
import json
import os
from pathlib import Path
import secrets
import shutil
import subprocess
from datetime import datetime, timezone

ROOT = Path(__file__).resolve().parents[1]
parser = argparse.ArgumentParser()
parser.add_argument('app', choices=['daycraft', 'whats-cooking'])
parser.add_argument('source', type=Path)
parser.add_argument('--native-only', action='store_true', help='Resume native compilation and signing after preparation')
parser.add_argument('--prepared', action='store_true', help='Use an already prepared source with installed Android dependency')
args = parser.parse_args()
stage = ROOT / '.build' / (args.app + '-android')
def run(command, cwd=stage, **kwargs):
    subprocess.run([str(x) for x in command], cwd=cwd, check=True, **kwargs)
if not args.prepared and not args.native_only:
    spec = importlib.util.spec_from_file_location('prepare_mobile', ROOT / 'scripts/prepare-mobile.py')
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    stage = module.prepare(args.source.resolve(), args.app + '-android')
    run(['npm', 'ci'])
    version = json.loads((stage / 'node_modules/@capacitor/core/package.json').read_text())['version']
    run(['npm', 'install', '--save-exact', '@capacitor/android@' + version])
android = stage / 'android'
if not args.native_only:
    if args.app == 'daycraft':
        reminders = stage / 'src/reminderSync.ts'
        text = reminders.read_text().replace('app instalada de iPhone. En', 'app instalada de iPhone o Android. En').replace('del iPhone', 'del dispositivo')
        reminders.write_text(text)
    # Capacitor 8 supplies inset variables for older Android WebViews.
    style = stage / ('src/style.css' if args.app == 'daycraft' else 'src/index.css')
    if 'var(--safe-area-inset-top' not in style.read_text():
        with style.open('a') as f:
            f.write('\n:root {\n' + '\n'.join(f' --safe-area-{edge}: var(--safe-area-inset-{edge}, env(safe-area-inset-{edge}, 0px));' if args.app == 'daycraft' else f' --safe-{edge}: var(--safe-area-inset-{edge}, env(safe-area-inset-{edge}, 0px));' for edge in ['top','right','bottom','left']) + '\n}\n')
    run(['npm', 'test'])
    run(['npm', 'run', 'build'])
    if not (stage / 'android').exists():
        run(['node_modules/.bin/cap', 'add', 'android'])
    run(['node_modules/.bin/cap', 'sync', 'android'])
    android = stage / 'android'
    res = android / 'app/src/main/res'
    # Reuse the original app artwork, resizing it only for Android density buckets.
    icon = args.source.resolve() / ('public/brand/daycraft-logo.png' if args.app == 'daycraft' else 'public/icons/app-512.png')
    for density, size in [('mdpi',48),('hdpi',72),('xhdpi',96),('xxhdpi',144),('xxxhdpi',192)]:
        folder = res / ('mipmap-' + density)
        folder.mkdir(exist_ok=True)
        for name in ['ic_launcher.png', 'ic_launcher_round.png', 'ic_launcher_foreground.png']:
            run(['sips', '--resampleHeightWidth', str(size), str(size), icon, '--out', folder/name])
    color = '#6264a7' if args.app == 'daycraft' else '#536e53'
    for p in res.glob('mipmap-anydpi-v26/*.xml'):
        p.write_text('<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android"><background android:drawable="@color/ic_launcher_background"/><foreground android:drawable="@mipmap/ic_launcher_foreground"/></adaptive-icon>\n')
    (res/'values/ic_launcher_background.xml').write_text(f'<resources><color name="ic_launcher_background">{color}</color></resources>\n')
    for p in res.glob('drawable*/splash.png'):
        p.unlink()
        p.with_suffix('.xml').write_text(f'<shape xmlns:android="http://schemas.android.com/apk/res/android"><solid android:color="{color}"/></shape>\n')
    manifest = android / 'app/src/main/AndroidManifest.xml'
    s = manifest.read_text()
    if 'android.permission.SCHEDULE_EXACT_ALARM' not in s:
        manifest.write_text(s.replace('<application', '<uses-permission android:name="android.permission.SCHEDULE_EXACT_ALARM"/>\n    <application', 1))
    # Use an increasing Android versionCode while retaining the upstream versionName.
    gradle = android / 'app/build.gradle'
    s = gradle.read_text()
    import re
    code = int(datetime.now(timezone.utc).timestamp() // 60)
    version = json.loads((stage/'package.json').read_text())['version']
    s = re.sub(r'versionCode\s+\d+', f'versionCode {code}', s)
    s = re.sub(r'versionName\s+"[^"]+"', f'versionName "{version}"', s)
    gradle.write_text(s)
sdk = ROOT / '.build/android-sdk'
env = dict(os.environ, ANDROID_HOME=str(sdk), ANDROID_SDK_ROOT=str(sdk), GRADLE_USER_HOME=str(ROOT / '.build/gradle'))
run(['bash', 'gradlew', '--no-daemon', 'assembleRelease', 'lintRelease'], cwd=android, env=env)
keys = ROOT / '.android-signing'
keys.mkdir(mode=0o700, exist_ok=True)
password = keys / (args.app + '.password')
keystore = keys / (args.app + '.jks')
if not keystore.exists():
    if password.exists():
        raise RuntimeError('Signing password exists without its keystore; restore the original key before publishing.')
    password.write_text(secrets.token_urlsafe(48) + '\n')
    password.chmod(0o600)
    run(['keytool', '-genkeypair', '-keystore', keystore, '-storetype', 'JKS', '-storepass:file', password, '-keypass:file', password, '-alias', args.app, '-keyalg', 'RSA', '-keysize', '3072', '-validity', '10000', '-dname', 'CN=Astronaut Studios'], cwd=ROOT)
    keystore.chmod(0o600)
tools = sdk / 'build-tools/36.0.0'
unsigned = android / 'app/build/outputs/apk/release/app-release-unsigned.apk'
aligned = stage / 'aligned.apk'
run([tools/'zipalign', '-f', '-p', '4', unsigned, aligned])
output = stage / (args.app + '-android.apk')
run([tools/'apksigner', 'sign', '--ks', keystore, '--ks-key-alias', args.app, '--ks-pass', 'file:' + str(password), '--out', output, aligned])
run([tools/'apksigner', 'verify', '--verbose', '--print-certs', output])
destination = ROOT / 'public/downloads' / output.name
shutil.copy2(output, destination)
print(f'Verified APK: {output.name}; SHA-256 {hashlib.sha256(output.read_bytes()).hexdigest()}')
