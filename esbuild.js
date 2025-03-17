import { buildSync } from "esbuild";

function genCode(len) {
  return `
    export function add(a) {
      return ${'a + "hello esbuild, minify" + '.repeat(len)} 'c';
    }
  `;
}

function genCode2(len) {
  return `
    export function add() {
      return ${'"a" + "hello swc, minify" + '.repeat(len)} 'c'
    }
  `;
}

function genCode3(len) {
  return `
    export function add(a, b, c) {
      return ${"a + b + ".repeat(len)} c;
    }
  `;
}

function minifyLen(len, fn) {
  try {
    const start = Date.now();
    const code = fn(len);
    buildSync({
      stdin: {
        contents: code,
        resolveDir: ".",
        sourcefile: "input.js",
        loader: "js",
      },
      minify: true,
      bundle: true,
      write: false,
    });
    console.log(fn.name, len, "cost:", Date.now() - start, "ms");
  } catch (e) {
    console.log(fn.name, len, "error:", e);
  }
}

minifyLen(100, genCode);
minifyLen(1000, genCode);
minifyLen(2000, genCode);
minifyLen(3000, genCode);
minifyLen(5000, genCode);
minifyLen(10000, genCode);
console.log();
minifyLen(100, genCode2);
minifyLen(1000, genCode2);
minifyLen(2000, genCode2);
minifyLen(3000, genCode2);
minifyLen(5000, genCode2);
minifyLen(10000, genCode2);
console.log();
minifyLen(100, genCode3);
minifyLen(1000, genCode3);
minifyLen(2000, genCode3);
minifyLen(3000, genCode3);
minifyLen(5000, genCode3);
minifyLen(10000, genCode3);
