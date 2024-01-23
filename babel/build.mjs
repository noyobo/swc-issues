import fs from 'node:fs';
import path from 'node:path';
import { transform as babelTransform } from '@babel/core';
import { verifySourcemap } from '../verifySourcemap.mjs';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const fileCode = fs.readFileSync(path.join(__dirname, '../a.js'), 'utf-8');
const fileMap = fs.readFileSync(path.join(__dirname, '../a.js.map'), 'utf-8');

console.log('==== use babel transform es6 to es5 ====');
//
babelTransform(
  fileCode,
  {
    filename: 'a.js',
    sourceMaps: true,
    inputSourceMap: JSON.parse(fileMap),
    presets: ['@babel/preset-env'],
  },
  async function (err, babelResult) {
    fs.writeFileSync(path.join(__dirname, './a.babel.js'), babelResult.code);
    fs.writeFileSync(path.join(__dirname, './a.babel.js.map'), JSON.stringify(babelResult.map));

    await verifySourcemap({
      code: babelResult.code,
      sourceMap: babelResult.map,
      offset: 207274,
      line: 1,
    });

    console.log('======== use babel transform again ==========');
    babelTransform(
      babelResult.code,
      {
        filename: 'a.js',
        sourceMaps: true,
        inputSourceMap: babelResult.map,
        presets: ['@babel/preset-env'],
      },
      async function (err, babelResult2) {
        fs.writeFileSync(path.join(__dirname, './a.babel2.js'), babelResult2.code);
        fs.writeFileSync(path.join(__dirname, './a.babel2.js.map'), JSON.stringify(babelResult2.map));
        // Verification passed by: https://evanw.github.io/source-map-visualization/
        console.log('babel transform again success');

        await verifySourcemap({
          code: babelResult2.code,
          sourceMap: babelResult2.map,
          offset: 207274,
          line: 1,
        });
      },
    );
  },
);
