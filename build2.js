import { transformSync } from "@swc/core";
import { genCode2 } from "./genCodes.js";

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

minifyLen(100, genCode2);
minifyLen(1000, genCode2);
minifyLen(2000, genCode2);
minifyLen(3000, genCode2);
minifyLen(4000, genCode2);
minifyLen(5000, genCode2);
minifyLen(10000, genCode2);
