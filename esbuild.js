import { buildSync } from "esbuild";
import { genCode, genCode2, genCode3, genCode4 } from "./genCodes.js";

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

console.log('case 1: `a + "hello esbuild, minify" + "c"`');
minifyLen(100, genCode);
minifyLen(1000, genCode);
minifyLen(2000, genCode);
minifyLen(3000, genCode);
minifyLen(5000, genCode);
minifyLen(10000, genCode);
console.log('case 2: `"a" + "hello swc, minify" + "c"`');
minifyLen(100, genCode2);
minifyLen(1000, genCode2);
minifyLen(2000, genCode2);
minifyLen(3000, genCode2);
minifyLen(5000, genCode2);
minifyLen(10000, genCode2);
console.log("case 3: `a + b + c`");
minifyLen(100, genCode3);
minifyLen(1000, genCode3);
minifyLen(2000, genCode3);
minifyLen(3000, genCode3);
minifyLen(5000, genCode3);
minifyLen(10000, genCode3);
console.log("case 4: `${a}${b}${c}`");
minifyLen(100, genCode4);
minifyLen(1000, genCode4);
minifyLen(2000, genCode4);
minifyLen(3000, genCode4);
minifyLen(5000, genCode4);
minifyLen(10000, genCode4);
