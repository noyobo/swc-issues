import { SourceMapConsumer } from 'source-map'; // 0.7.4
import { codeFrameColumns } from '@babel/code-frame';

export async function verifySourcemap({ code, sourceMap, offset, line }) {
  const consumer = await new SourceMapConsumer(sourceMap);
  const originalPosition = consumer.originalPositionFor({
    line: line,
    column: offset,
  });
  if (originalPosition.source === null) {
    // @swc/core@nightly always return null for source
    console.log('Cannot find original source');
    return null;
  }

  let miniCode = code.split('\n')[line - 1];
  miniCode = miniCode.substring(offset - 50, offset + 50);

  const miniCodeFrame = codeFrameColumns(miniCode, {
    start: { line: 1, column: 50 },
  });

  const source = consumer.sourceContentFor(originalPosition.source);

  const sourceCode = codeFrameColumns(source, {
    start: { line: originalPosition.line, column: originalPosition.column },
  });

  // lgt 1.7.6 versions that works
  console.log('');
  console.log(miniCodeFrame);
  console.log('');
  console.log('sourceFile', originalPosition.source);
  console.log('');
  console.log(sourceCode);
  console.log('');
}
