"""Snapshot build inputs only; exclude generated builds and user data."""
import hashlib
import io
import json
from pathlib import Path
import sys
import tarfile

source = Path(sys.argv[1]).resolve()
destination = Path(__file__).resolve().parents[1] / "ci"
destination.mkdir(exist_ok=True)
roots = [
    "package.json", "package-lock.json", "index.html", "tsconfig.json",
    "tsconfig.node.json", "vite.config.ts", "README.md", "AGENTS.md",
    "src", "public", "scripts", "tests", "docs",
    "src-tauri/Cargo.toml", "src-tauri/Cargo.lock", "src-tauri/build.rs",
    "src-tauri/tauri.conf.json", "src-tauri/tauri.windows.conf.json",
    "src-tauri/src", "src-tauri/icons", "src-tauri/capabilities",
    "src-tauri/native", "src-tauri/examples",
]
files = []
for root in roots:
    path = source / root
    files.extend(sorted(path.rglob("*")) if path.is_dir() else [path])
manifest = []
archive = destination / "write-studio-source.tar.gz"
with tarfile.open(archive, "w:gz") as bundle:
    for path in files:
        if not path.is_file() or path.is_symlink() or path.name == ".DS_Store":
            continue
        relative = path.relative_to(source).as_posix()
        data = path.read_bytes()
        info = tarfile.TarInfo(relative)
        info.size = len(data)
        info.mode = 0o644
        bundle.addfile(info, io.BytesIO(data))
        manifest.append({"path": relative, "sha256": hashlib.sha256(data).hexdigest()})
(destination / "write-studio-source.json").write_text(json.dumps({
    "archive_sha256": hashlib.sha256(archive.read_bytes()).hexdigest(),
    "files": manifest,
}, indent=2) + "\n")
print(f"Packaged {len(manifest)} build inputs ({archive.stat().st_size} bytes).")
