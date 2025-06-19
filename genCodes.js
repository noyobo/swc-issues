export function genCode(len) {
  return `
    export function add(a) {
      return ${'a + "hello esbuild, minify" + '.repeat(len)} "c";
    }
  `;
}

export function genCode2(len) {
  return `
    export function add() {
      return ${'"a" + "hello swc, minify" + '.repeat(len)} "c"
    }
  `;
}

export function genCode3(len) {
  return `
    export function add(a, b, c) {
      return ${"a + b + ".repeat(len)} c;
    }
  `;
}

export function genCode4(len) {
  const code = "${a}${b}${c}";
  return `
    export function add(a, b, c) {
      return \`${code.repeat(len)}\`;
    }
  `;
}
