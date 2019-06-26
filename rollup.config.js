// rollup.config.js
import typescript from 'rollup-plugin-typescript2';
import resolve from 'rollup-plugin-node-resolve';
import builtins from 'rollup-plugin-node-builtins';

export default [{
  input: './frontend/src/index.ts',
  output: {
    file: 'build/index.html',
    format: 'iife'
  },
  plugins: [
    builtins(),
    resolve({
      preferBuiltins: true
    }),
    typescript()
	]
}, {
  input: './backend/src/index.ts',
  output: {
    file: 'build/index.js',
    format: 'cjs'
  },
  plugins: [
    builtins(),
    resolve({
      preferBuiltins: false
    }),
		typescript()
	]
}]
