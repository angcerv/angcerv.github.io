import writeStudioIcon from './assets/apps/write-studio.png';
import whatsCookingIcon from './assets/apps/whats-cooking.png';
import daycraftIcon from './assets/apps/daycraft.png';
import brujulaEmpleoIcon from './assets/apps/brujula-empleo.png';

export type Platform = 'android' | 'desktop' | 'macos' | 'windows' | 'linux' | 'ipad' | 'iphone' | 'web';
export type ApplicationIcon =
  | { kind: 'image'; src: string }
  | { kind: 'symbol'; name: 'panels' | 'layers' | 'orbit' };
export type Access = {
  platform: Platform;
  requirements?: string;
  instructions?: string;
} & (
  | { kind: 'unavailable'; url?: never }
  | { kind: 'download' | 'web' | 'app-store' | 'testflight'; url: string }
);
export interface Application {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: ApplicationIcon;
  accent: 'teal' | 'sand' | 'blue';
  platforms: Platform[];
  status: 'available' | 'beta' | 'coming-soon';
  example?: boolean;
  features: string[];
  screenshots: { src: string; alt: string }[];
  access: Access[];
  version?: string;
  updatedAt?: string;
}
export const platformNames: Record<Platform, string> = {
  android: 'Android', desktop: 'Desktop', macos: 'macOS', windows: 'Windows', linux: 'Linux', ipad: 'iPad', iphone: 'iPhone', web: 'Web',
};

// Content and original icons come from the sibling application projects.
// Download links point to existing installers; other access stays unavailable.
export const applications: Application[] = [
  {
    id: 'write-studio',
    slug: 'write-studio',
    name: 'Write Studio',
    description: 'Write your manuscript, plan the story, and build its world in one local workspace.',
    icon: { kind: 'image', src: writeStudioIcon },
    accent: 'teal',
    platforms: ['macos', 'windows'],
    status: 'beta',
    version: '0.1.0',
    updatedAt: '2026-11-14',
    features: [
      'Organize manuscripts into books, chapters, and scenes.',
      'Plan plots and character arcs alongside your writing.',
      'Build a world with linked entries, relationships, and maps.',
      'Arrange story events on a timeline.',
    ],
    screenshots: [],
    access: [
      {
        platform: 'macos',
        kind: 'download',
        url: 'https://angcerv.github.io/downloads/Write-Studio-0.1.0-macOS-Apple-Silicon.dmg?build=2026-11-14',
        requirements: 'Apple Silicon Mac (M1 or later).',
        instructions: 'Development build, version 0.1.0, built on 14 November 2026. Open the disk image and drag Write Studio to Applications.',
      },
      {
        platform: 'windows', kind: 'download',
        url: 'https://github.com/angcerv/angcerv.github.io/releases/download/write-studio-windows/Write-Studio-Windows-x64-setup.exe',
        requirements: 'Windows x64. Download: approximately 221 MB.',
        instructions: 'Development build, version 0.1.0, built on 14 November 2026. Open the downloaded setup file and follow the installer.',
      },
    ],
  },
  {
    id: 'whats-cooking',
    slug: 'whats-cooking',
    name: 'What’s Cooking',
    description: 'Keep your recipes together, plan your meals, and turn ingredients into shopping lists.',
    icon: { kind: 'image', src: whatsCookingIcon },
    accent: 'sand',
    platforms: ['iphone', 'ipad', 'android', 'web'],
    status: 'available',
    updatedAt: '2026-11-15',
    features: [
      'Collect recipes with ingredients, instructions, and notes.',
      'Organize meals in a weekly planner.',
      'Build shopping lists from your meal plan.',
      'Review nutrition estimates from the ingredient data you provide.',
    ],
    screenshots: [],
    access: [
      { platform: 'android', kind: 'download', url: 'https://angcerv.github.io/downloads/whats-cooking-android.apk?build=2026-11-15', requirements: 'Android 7.0 or later.', instructions: 'Download the APK and allow installation from your browser when Android asks. Install the file. Data stays on this device; import a backup to transfer recipes.' },
      {
        platform: 'iphone', kind: 'web',
        url: 'https://angcerv.github.io/whats-cooking/',
        instructions: 'Open in Safari, then choose Share → Add to Home Screen. Enable Open as Web App if offered. Open the new icon before importing a backup.',
      },
      {
        platform: 'ipad', kind: 'web',
        url: 'https://angcerv.github.io/whats-cooking/',
        instructions: 'Open in Safari, then choose Share → Add to Home Screen. Enable Open as Web App if offered. Open the new icon before importing a backup.',
      },
      {
        platform: 'web', kind: 'web',
        url: 'https://angcerv.github.io/whats-cooking/',
        instructions: 'Recipes stay in this browser. Export backups regularly; data does not sync automatically between devices or with the native app.',
      },
    ],
  },
  {
    id: 'daycraft',
    slug: 'daycraft',
    name: 'DayCraft',
    description: 'Bring your calendar, tasks, habits, and journal together to organize each day.',
    icon: { kind: 'image', src: daycraftIcon },
    accent: 'blue',
    platforms: ['iphone', 'ipad', 'android', 'web'],
    status: 'beta',
    version: '0.1.0',
    updatedAt: '2026-11-15',
    features: [
      'Plan events and tasks with day, week, and month calendar views.',
      'Set up recurring events and tasks.',
      'Track daily habits and review your activity history.',
      'Keep journal entries with optional mood and activity links.',
    ],
    screenshots: [],
    access: [
      { platform: 'iphone', kind: 'web', url: 'https://angcerv.github.io/daycraft/', instructions: 'Open in Safari, then choose Share → Add to Home Screen. Open the new icon before importing a backup. iCloud, native reminders, and iPhone widgets are not included in the web app.' },
      { platform: 'ipad', kind: 'web', url: 'https://angcerv.github.io/daycraft/', instructions: 'Open in Safari, then choose Share → Add to Home Screen. Open the new icon before importing a backup. iCloud, native reminders, and iPhone widgets are not included in the web app.' },
      { platform: 'android', kind: 'download', url: 'https://angcerv.github.io/downloads/daycraft-android.apk?build=2026-11-15', requirements: 'Android 7.0 or later.', instructions: 'Download the APK and allow installation from your browser when Android asks. Install the file. iCloud and iPhone widgets are not included.' },
      { platform: 'web', kind: 'web', url: 'https://angcerv.github.io/daycraft/', instructions: 'Data stays in this browser. Export backups regularly; data does not sync automatically with other devices or native apps. Native reminders, iCloud, and iPhone widgets are not included.' },
    ],
  },
  {
    id: 'brujula-empleo',
    slug: 'brujula-empleo',
    name: 'Brújula Empleo',
    description: 'Search job boards, compare openings with your profile, and track your applications.',
    icon: { kind: 'image', src: brujulaEmpleoIcon },
    accent: 'teal',
    platforms: ['windows'],
    status: 'beta',
    version: '0.1.0',
    features: [
      'Search supported job boards and open the original listings.',
      'Import a CV or enter your profile to see how well openings match.',
      'Save jobs and track applications with data stored on your device.',
    ],
    screenshots: [],
    access: [
      {
        platform: 'windows',
        kind: 'download',
        url: 'https://github.com/angcerv/ScientistIrene/releases/download/brujula-empleo-windows/Brujula-Empleo-Windows-x64-setup.exe',
        requirements: 'Windows x64 with Microsoft Edge WebView2.',
        instructions: 'Open the downloaded setup file to install this unsigned beta. Add or import your profile after installing.',
      },
    ],
  },
];
