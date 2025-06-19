import { transformSync } from "@swc/core";

function genCode4(len) {
  const code = "${a}${b}${c}";
  return `
    export function add(a, b, c) {
      return \`${code.repeat(len)}\`;
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

minifyLen(100, genCode4);
minifyLen(1000, genCode4);
minifyLen(2000, genCode4);
minifyLen(3000, genCode4);
