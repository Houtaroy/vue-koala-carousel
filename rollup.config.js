import { babel } from '@rollup/plugin-babel';
import typescript from 'rollup-plugin-typescript2';
import vue from 'rollup-plugin-vue';
import { name } from './package.json';

export default {
  input: './packages/index.tsx',
  output: [
    {
      file: `lib/vue-koala-carousel.js`,
      format: 'es'
    }
  ],
  external: ['vue'],
  plugins: [
    babel({ babelHelpers: 'bundled', extensions: ['.tsx'] }),
    typescript({
      tsconfigOverride: {
        compilerOptions: { declaration: true }
      }
    }),
    vue()
  ]
};
