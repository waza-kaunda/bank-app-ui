/**
 * Style Dictionary build. Writes tokens.generated.css containing:
 *   - :root with every primitive, using the first theme (default)
 *   - [data-theme='<name>'] with only the tokens that theme overrides
 *   - .ds-text-* classes for the composite font styles
 *
 * Sources:
 *   tokens/base.tokens.json      Figma "Design Tokens" plugin export (include)
 *   tokens/themes/*.tokens.json  per-mode overrides (source), see extract-themes.mjs
 *
 * Usage: npm run tokens
 */
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import StyleDictionary from 'style-dictionary';

const here = dirname(fileURLToPath(import.meta.url));
const basePath = resolve(here, 'tokens/base.tokens.json');
const themesDir = resolve(here, 'tokens/themes');
const output = resolve(here, 'tokens.generated.css');

// Default theme is the first mode in the Figma export.
const figmaModeNames = JSON.parse(readFileSync(resolve(here, '../figma-export.json'), 'utf8'))
  .collections.Color.modes.map((m) => m.name);
const figmaModes = figmaModeNames.map((m) => m.toLowerCase());
const available = readdirSync(themesDir)
  .filter((f) => f.endsWith('.tokens.json'))
  .map((f) => f.replace('.tokens.json', ''));
const themes = figmaModes.filter((m) => available.includes(m));
if (themes.length === 0) throw new Error(`No theme files in ${themesDir}. Run extract-themes.mjs first.`);

// ------------------------------------------------------------------ helpers
const PREFIX = 'ds';
const FONT_TYPE = 'custom-fontStyle';
/**
 * Text styles are exported per platform (font.ios.*, font.android.*) but are
 * the same apart from the font. The web gets one platform-neutral set of
 * classes using the device's system font: SF Pro on Apple, Roboto on
 * Android, Segoe UI on Windows.
 */
const FONT_FAMILY_STACK =
  "-apple-system, BlinkMacSystemFont, 'SF Pro Text', Roboto, 'Segoe UI', system-ui, sans-serif";
// Where the platforms disagree on a value, this platform's value is used
// and a warning is printed so the difference can be fixed in Figma.
const PRIMARY_PLATFORM = 'android';
const TEXT_CASE = { uppercase: 'uppercase', lowercase: 'lowercase', capitalize: 'capitalize' };

const slug = (s) =>
  String(s)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
const num = (n) => String(Math.round(Number(n) * 1000) / 1000);
const px = (v) => (Number(v) === 0 ? '0' : `${num(v)}px`);

/**
 * Platform-neutral class name for a font style token.
 * path: ["font", <platform>, <group>, ...style]
 *   font.ios.heading["headline 2"]           -> ds-text-headline-2
 *   font.android.body["body 15"].regular     -> ds-text-body-15-regular
 *   font.ios.caption["caption 13pt"]         -> ds-text-caption-13
 * The group is dropped because every style name already says what it is.
 * Fixes from Figma: "Healine" typo (Android), "pt" suffix (iOS captions).
 */
function textClassName(token) {
  const style = token.path.slice(3).map((s) =>
    slug(
      String(s)
        .replace(/healine/i, 'heading')
        .replace(/(\d+)\s*pt\b/i, '$1'),
    ),
  );
  return `${PREFIX}-text-${style.join('-')}`;
}

/** Turns a resolved font style value into CSS declarations (without font-family). */
function textDeclarations(v) {
  const props = {
    'font-size': px(v.fontSize),
    'font-weight': String(v.fontWeight),
    'line-height': px(v.lineHeight),
    'letter-spacing': px(v.letterSpacing),
  };
  if (TEXT_CASE[v.textCase]) props['text-transform'] = TEXT_CASE[v.textCase];
  if (v.textDecoration && v.textDecoration !== 'none') props['text-decoration'] = v.textDecoration;
  return props;
}

// --------------------------------------------------------------- transforms
StyleDictionary.registerTransform({
  name: 'name/ds',
  type: 'name',
  transform: (token) => {
    const [category, ...rest] = token.path;
    if (category === 'color') return `${PREFIX}-color-${slug(token.path.at(-1))}`;
    if (category === 'primitives') return `${PREFIX}-${slug(token.path.at(-1))}`;
    // Kept platform-specific so Style Dictionary sees unique names. The
    // text class format merges platforms using textClassName().
    if (category === 'font') return `${PREFIX}-font-${slug(rest.join('-'))}`;
    return `${PREFIX}-${slug(token.path.join('-'))}`;
  },
});

StyleDictionary.registerTransform({
  name: 'size/ds-px',
  type: 'value',
  filter: (token) => token.type === 'dimension' && typeof token.value === 'number',
  transform: (token) => px(token.value),
});

StyleDictionary.registerTransformGroup({
  name: 'ds/css',
  // color/css strips the opaque "ff" alpha and uses rgba() for translucent colors.
  transforms: ['attribute/cti', 'name/ds', 'size/ds-px', 'color/css'],
});

// ------------------------------------------------------------------ filters
const isPrimitive = (token) =>
  (token.path[0] === 'color' || token.path[0] === 'primitives') && token.type !== FONT_TYPE;
const isFontStyle = (token) => token.path[0] === 'font' && token.type === FONT_TYPE;
// The plugin also exports "typography", which repeats "font" with each
// property split out. It is ignored because "font" already covers it.

// ------------------------------------------------------------------ formats
StyleDictionary.registerFormat({
  name: 'css/ds-variables',
  format: ({ dictionary, options }) => {
    const lines = dictionary.allTokens
      .slice()
      .sort((a, b) => a.name.localeCompare(b.name, 'en', { numeric: true }))
      .map((t) => `  --${t.name}: ${t.value};`);
    return `${options.selector} {\n${lines.join('\n')}\n}`;
  },
});

StyleDictionary.registerFormat({
  name: 'css/ds-text-classes',
  format: ({ dictionary }) => {
    /** className -> { [platform]: { props, source } } */
    const styles = new Map();

    for (const token of dictionary.allTokens) {
      const platform = token.path[1];
      const className = textClassName(token);
      const entry = styles.get(className) ?? {};
      if (entry[platform]) {
        // Two styles on the same platform would overwrite each other.
        throw new Error(
          `Text class name collision: ${className} from "${entry[platform].source}" and ` +
            `"${token.path.join('/')}". Rename one of them in Figma.`,
        );
      }
      entry[platform] = { props: textDeclarations(token.value), source: token.path.join('/') };
      styles.set(className, entry);
    }

    const blocks = [];
    for (const [className, entry] of styles) {
      const platforms = Object.keys(entry);
      const chosen = entry[PRIMARY_PLATFORM] ?? entry[platforms[0]];

      // Report values that differ between platforms.
      for (const other of platforms) {
        for (const [prop, value] of Object.entries(entry[other].props)) {
          if (chosen.props[prop] !== value) {
            console.warn(
              `  ! ${className}: ${prop} is ${value} in ${other}, using ${chosen.props[prop] ?? 'none'} ` +
                `from ${chosen.source.split('/')[1]}`,
            );
          }
        }
      }

      const declarations = { 'font-family': `var(--${PREFIX}-font-family)`, ...chosen.props };
      const body = Object.entries(declarations)
        .map(([prop, value]) => `  ${prop}: ${value};`)
        .join('\n');
      blocks.push(`.${className} {\n${body}\n}`);
    }

    const root = `:root {\n  --${PREFIX}-font-family: ${FONT_FAMILY_STACK};\n}`;
    return [root, ...blocks].join('\n\n');
  },
});

// -------------------------------------------------------------------- build
/** Formats one platform and returns the CSS string. */
async function render(theme, files) {
  const sd = new StyleDictionary({
    include: [basePath],
    source: [resolve(themesDir, `${theme}.tokens.json`)],
    log: { verbosity: 'default' },
    platforms: { css: { transformGroup: 'ds/css', files } },
  });
  const results = await sd.formatPlatform('css');
  return results.map((r) => r.output);
}

const [defaultTheme, ...otherThemes] = themes;

// Default theme: every primitive (base + overrides) in :root, plus text classes.
const [rootCss, textCss] = await render(defaultTheme, [
  { destination: 'root.css', format: 'css/ds-variables', filter: isPrimitive, options: { selector: ':root' } },
  { destination: 'text.css', format: 'css/ds-text-classes', filter: isFontStyle },
]);

// Other themes: only the tokens their override file defines (isSource).
const themeCss = [];
for (const theme of otherThemes) {
  const [css] = await render(theme, [
    {
      destination: `${theme}.css`,
      format: 'css/ds-variables',
      filter: (token) => token.isSource && isPrimitive(token),
      options: { selector: `[data-theme='${theme}']` },
    },
  ]);
  themeCss.push(css);
}

const css = `/*
 * GENERATED FILE. Do not edit by hand.
 * Built with Style Dictionary from design_system/style-dictionary/tokens/
 * Regenerate with: npm run tokens
 */

/* Primitives. Colors use the "${figmaModeNames[figmaModes.indexOf(defaultTheme)] ?? defaultTheme}" mode by default. */
${rootCss}

/* Theme overrides. Set data-theme on <html> to switch. */
${themeCss.join('\n\n')}

/* Text styles */
${textCss}
`;

writeFileSync(output, css);
console.log(`Wrote ${output}\n  default: ${defaultTheme}, overrides: ${otherThemes.join(', ') || 'none'}`);
