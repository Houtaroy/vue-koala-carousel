import jsx from 'acorn-jsx';
import typescript from '@rollup/plugin-typescript';
import babel from '@rollup/plugin-babel';
import { name } from './package.json';

export default {
  input: './packages/index.tsx',
  output: {
    name,
    dir: 'lib',
    format: 'es',
    globals: {
      vue: 'Vue'
    }
  },
  external: ['vue'],
  acornInjectPlugins: [jsx()],
  plugins: [typescript(), babel({ babelHelpers: 'bundled', extensions: ['.ts', '.js', '.tsx'] })]
};
