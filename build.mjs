import { transform } from '@swc/core';
import fs from 'fs';
import path from 'path';

const __dirname = new URL('.', import.meta.url).pathname;

const code = fs.readFileSync(path.resolve(__dirname, './a.js'), 'utf-8');
const map = fs.readFileSync(path.resolve(__dirname, './a.js.map'), 'utf-8');

const cjs = await transform(code, {
  filename: 'a.js',
  sourceMaps: true,
  inputSourceMap: map,
  jsc: { target: 'es5' },
  module: { type: 'commonjs', strictMode: false },
}).then(() => {
  console.log('ok')
}).catch((e) => {
  console.error('[esm2cjs]', e);
});
