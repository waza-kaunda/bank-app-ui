/**
 * Writes one theme override file per Figma color mode into tokens/themes/.
 *
 * Why: tokens/base.tokens.json (from the "Design Tokens" plugin) only holds
 * one mode. figma-export.json holds every mode, so it supplies the values
 * that change between themes. Each theme file contains only the tokens whose
 * value differs between modes, using the same paths and legacy
 * `type` / `value` keys as the base file so Style Dictionary can layer them.
 *
 * If you later export one tokens file per mode from Figma, you can drop this
 * step and put those files in tokens/themes/ directly.
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const exportPath = resolve(here, '../figma-export.json');
const themesDir = resolve(here, 'tokens/themes');

const data = JSON.parse(readFileSync(exportPath, 'utf8'));
const collection = data.collections.Color;
const modes = collection.modes.map((m) => m.name);

// Only tokens that vary across modes belong in theme files.
const varying = collection.variables.colors.filter(
  (c) => new Set(modes.map((m) => c.values[m].toLowerCase())).size > 1,
);

mkdirSync(themesDir, { recursive: true });

// The first mode is the default theme. Its file overrides every varying token
// (the base file may hold another mode's values). Other theme files only hold
// tokens that differ from the default, so their CSS blocks stay minimal.
const [defaultMode] = modes;

for (const mode of modes) {
  const tree = { color: {} };
  const tokens =
    mode === defaultMode
      ? varying
      : varying.filter((c) => c.values[mode].toLowerCase() !== c.values[defaultMode].toLowerCase());
  for (const c of tokens) {
    // "Brand/Brand 100" -> color.brand["brand 100"], matching base.tokens.json
    const path = c.name.toLowerCase().split('/');
    let node = tree.color;
    for (const key of path.slice(0, -1)) node = node[key] ??= {};
    node[path.at(-1)] = { type: 'color', value: c.values[mode] };
  }
  const file = resolve(themesDir, `${mode.toLowerCase()}.tokens.json`);
  writeFileSync(file, `${JSON.stringify(tree, null, 2)}\n`);
}

console.log(
  `Wrote ${modes.length} theme files (${modes.join(', ')}) with ${varying.length} varying tokens: ` +
    varying.map((c) => c.name).join(', '),
);
