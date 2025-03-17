import { transformSync } from "@swc/core";

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

minifyLen(100, genCode3);
minifyLen(1000, genCode3);
minifyLen(2000, genCode3);
minifyLen(3000, genCode3);
