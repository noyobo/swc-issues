import { transform } from 'esbuild';
import fs from 'node:fs';
import path from 'node:path';
import { verifySourcemap } from '../verifySourcemap.mjs';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const fileCode = fs.readFileSync(path.join(__dirname, '../a.js'), 'utf-8');
const fileMap = fs.readFileSync(path.join(__dirname, '../a.js.map'), 'utf-8');
// valid check https://evanw.github.io/source-map-visualization/

console.log('==== use esbuild transform  ====');
// transformed successfully

const code =
  fileCode + '\n//# sourceMappingURL=data:application/json;base64,' + Buffer.from(fileMap).toString('base64');

const result = await transform(code, {
  minify: true,
  sourcemap: true,
});

fs.writeFileSync(path.join(__dirname, './a.esbuild.js'), result.code);
fs.writeFileSync(path.join(__dirname, './a.esbuild.js.map'), result.map);

await verifySourcemap({
  code: result.code,
  sourceMap: JSON.parse(result.map),
  offset: 69929,
  line: 24,
});

console.log('==== use esbuild transform again  ====');
const result2 = await transform(
  result.code + '\n//# sourceMappingURL=data:application/json;base64,' + Buffer.from(result.map).toString('base64'),
  {
    minify: true,
    sourcemap: true,
  },
);

fs.writeFileSync(path.join(__dirname, './a.esbuild2.js'), result2.code);
fs.writeFileSync(path.join(__dirname, './a.esbuild2.js.map'), result2.map);

await verifySourcemap({
  code: result2.code,
  sourceMap: JSON.parse(result2.map),
  offset: 69929,
  line: 24,
});
