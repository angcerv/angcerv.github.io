import writeStudioIcon from './assets/apps/write-studio.png';
import whatsCookingIcon from './assets/apps/whats-cooking.png';
import daycraftIcon from './assets/apps/daycraft.png';

export type Platform = 'desktop' | 'macos' | 'windows' | 'linux' | 'ipad' | 'iphone' | 'web';
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
  desktop: 'Desktop', macos: 'macOS', windows: 'Windows', linux: 'Linux', ipad: 'iPad', iphone: 'iPhone', web: 'Web',
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
    platforms: ['macos', 'ipad'],
    status: 'beta',
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
        url: 'https://angcerv.github.io/downloads/Write-Studio-0.1.0-macOS-Apple-Silicon.dmg',
        requirements: 'Apple Silicon Mac (M1 or later).',
        instructions: 'Development build, version 0.1.0. Open the disk image and drag Write Studio to Applications.',
      },
      { platform: 'ipad', kind: 'unavailable' },
    ],
  },
  {
    id: 'whats-cooking',
    slug: 'whats-cooking',
    name: 'What’s Cooking',
    description: 'Keep your recipes together, plan your meals, and turn ingredients into shopping lists.',
    icon: { kind: 'image', src: whatsCookingIcon },
    accent: 'sand',
    platforms: ['iphone', 'web'],
    status: 'coming-soon',
    features: [
      'Collect recipes with ingredients, instructions, and notes.',
      'Organize meals in a weekly planner.',
      'Build shopping lists from your meal plan.',
      'Review nutrition estimates from the ingredient data you provide.',
    ],
    screenshots: [],
    access: [
      { platform: 'iphone', kind: 'unavailable' },
      { platform: 'web', kind: 'unavailable' },
    ],
  },
  {
    id: 'daycraft',
    slug: 'daycraft',
    name: 'DayCraft',
    description: 'Bring your calendar, tasks, habits, and journal together to organize each day.',
    icon: { kind: 'image', src: daycraftIcon },
    accent: 'blue',
    platforms: ['iphone'],
    status: 'coming-soon',
    features: [
      'Plan events and tasks with day, week, and month calendar views.',
      'Set up recurring events and tasks.',
      'Track daily habits and review your activity history.',
      'Keep journal entries with optional mood and activity links.',
    ],
    screenshots: [],
    access: [{ platform: 'iphone', kind: 'unavailable' }],
  },
];
