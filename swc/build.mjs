import { transform } from '@swc/core';
import fs from 'node:fs';
import path from 'node:path';
import { verifySourcemap } from '../verifySourcemap.mjs';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const fileCode = fs.readFileSync(path.join(__dirname, '../a.js'), 'utf-8');
const fileMap = fs.readFileSync(path.join(__dirname, '../a.js.map'), 'utf-8');

console.log('==== use swc transform es6 to es5 ====');
// transformed successfully
const result = await transform(fileCode, {
  filename: 'a.js',
  sourceMaps: true,
  inputSourceMap: fileMap,
  jsc: { target: 'es5' },
  minify: true,
  module: { type: 'commonjs', strictMode: false },
});

fs.writeFileSync(path.join(__dirname, './a.swc.js'), result.code);
fs.writeFileSync(path.join(__dirname, './a.swc.js.map'), result.map);

await verifySourcemap({
  code: result.code,
  sourceMap: JSON.parse(result.map),
  offset: 207274,
  line: 1,
});

// Using the result again to transform throws an error
// and verification failed in https://evanw.github.io/source-map-visualization/

console.log('==== use swc transform again ====');

const swcResult2 = await transform(result.code, {
  filename: 'a.js',
  sourceMaps: true,
  inputSourceMap: result.map,
  minify: true,
  module: { type: 'commonjs', strictMode: false },
}).catch((e) => {
  /**
   * [Error: failed to read input source map from user-provided sourcemap
   *
   * Caused by:
   *     bad reference to source #299] {
   *   code: 'GenericFailure'
   * }
   */
  console.log('swc transform again error:', e);
});

fs.writeFileSync(path.join(__dirname, './a.swc2.js'), swcResult2.code);
fs.writeFileSync(path.join(__dirname, './a.swc2.js.map'), swcResult2.map);

await verifySourcemap({
  code: swcResult2.code,
  sourceMap: JSON.parse(swcResult2.map),
  offset: 207274,
  line: 1,
});
