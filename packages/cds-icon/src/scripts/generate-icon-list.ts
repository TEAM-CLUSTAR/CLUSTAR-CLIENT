import { readdirSync, writeFileSync } from 'fs';
import path, { basename, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ICON_DIR = join(__dirname, '../assets');
const OUTPUT_PATH = join(__dirname, '../icon-list.ts');

const files = readdirSync(ICON_DIR).filter((file) => file.endsWith('.svg'));

const iconNames = files.map((file) => basename(file, '.svg')).sort();

const content = `// 이 파일은 자동 생성 파일입니다. 직접 수정하지 마세요!
export const iconNames = ${JSON.stringify(iconNames)} as const;
export type IconName = (typeof iconNames)[number];
`;

writeFileSync(OUTPUT_PATH, content);
