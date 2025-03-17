import { transformSync } from "@swc/core";

function genCode(len) {
  return `
    export function add(a) {
      return ${'a + "hello swc, minify" + '.repeat(len)} 'c'
    }
  `;
}

function minifyLen(len, fn) {
  try {
    const start = Date.now();
    const code = fn(len);
    transformSync(code, {
      jsc: {
        parser: {
          syntax: "ecmascript",
        },
        transform: {},
        minify: {
          mangle: true,
          compress: {
            defaults: false,
          },
        },
      },
      minify: true,
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
