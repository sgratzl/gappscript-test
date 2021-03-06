// rollup.config.js
import typescript from 'rollup-plugin-typescript2';
import resolve from 'rollup-plugin-node-resolve';
import builtins from 'rollup-plugin-node-builtins';
import commonjs from 'rollup-plugin-commonjs';

// based on https://github.com/bengsfort/rollup-plugin-generate-html-template/

import {readFile} from 'fs';
import {promisify} from 'util';

function wrapHTML(options = {}) {
  const DEFAULT_TEMPLATE = `<!DOCTYPE html>
  <html>
  <head>
  </head>
  <body>
  </body>
  </html>`;
  const template = options.template;

  const readFileAsync = promisify(readFile);
  return {
    name: 'inline-html',
    renderChunk: (code, chunk, chunkOptions) => {
      if (!chunk.isEntry) {
        return null;
      }
      return Promise.resolve(template ? readFileAsync(template).then((b) => b.toString('utf8')) : DEFAULT_TEMPLATE).then((tmpl) => {
        const bodyCloseTag = tmpl.lastIndexOf('</body>');
        // Inject the script tags before the body close tag
        return [
          tmpl.slice(0, bodyCloseTag),
          `<script>${code}</script>\n`,
          tmpl.slice(bodyCloseTag, tmpl.length),
        ].join('');
      });
    },
  };
}

function gaswrapper(options = {}) {
  return {
    name: 'gaswrapper',
    renderChunk: (code, chunk, chunkOptions) => {
      if (!chunk.isEntry) {
        return null;
      }
      return `
${code}
// generate wrapper for all exports
${chunk.exports.map((f) => `function ${f}() {
  return ${chunkOptions.name}.${f}.apply(this, arguments);
}`).join('\n\n')}`;
    }
  };
}


export default [{
  input: './frontend/src/dialog.ts',
  output: {
    file: 'build/dialog.html',
    format: 'iife'
  },
  plugins: [
    builtins(),
    resolve({
      preferBuiltins: true
    }),
    commonjs(),
    typescript({
      tsconfig: './frontend/tsconfig.json'
    }),
    wrapHTML({
      template: './frontend/src/dialog.html'
    })
  ]
}, {
  input: './backend/src/index.ts',
  output: {
    file: 'build/index.js',
    name: 'test',
    format: 'iife'
  },
  plugins: [
    builtins(),
    resolve({
      preferBuiltins: false
    }),
    commonjs(),
    typescript({
      tsconfig: './backend/tsconfig.json'
    }),
    gaswrapper()
  ]
}]
