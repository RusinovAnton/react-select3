const pkg = require('./package.json');
const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');
const resolve = require('rollup-plugin-node-resolve');


module.exports = [
  // browser-friendly UMD build
  {
    entry: './src/index.js',
    exports: 'named',
    dest: pkg.browser,
    format: 'umd',
    moduleName: 'reactSelect3',
    sourceMap: true,
    plugins: [
      resolve(),
      commonjs({
        include: [
          'node_modules/**',
        ],
        exclude: [
          'node_modules/process-es6/**',
        ],
        namedExports: {
          'node_modules/react/react.js': ['Children', 'Component', 'PropTypes', 'createElement'],
          'node_modules/react-dom/index.js': ['render'],
        },
      }),
      babel({
        babelrc: false,
        exclude: 'node_modules/**',
        presets: [
          'react',
          [
            'latest',
            {
              es2015: {
                modules: false,
              },
            },
          ],
          'stage-0',
        ],
        plugins: ['external-helpers'],
      }),
    ],
  },

  // CommonJS (for Node) and ES module (for bundlers) build.
  // (We could have three entries in the configuration array
  // instead of two, but it's quicker to generate multiple
  // builds from a single configuration where possible, using
  // the `targets` option which can specify `dest` and `format`)
  {
    entry: './src/index.js',
    exports: 'named',
    sourceMap: true,
    targets: [
      { dest: pkg.main, format: 'cjs' },
      { dest: pkg.module, format: 'es' },
    ],
    plugins: [
      resolve(),
      commonjs({
        include: [
          'node_modules/**',
        ],
        exclude: [
          'node_modules/process-es6/**',
        ],
        namedExports: {
          'node_modules/react/react.js': ['Children', 'Component', 'PropTypes', 'createElement'],
          'node_modules/react-dom/index.js': ['render'],
        },
      }),
      babel({
        babelrc: false,
        exclude: 'node_modules/**',
        presets: [
          'react',
          [
            'latest',
            {
              'es2015': {
                'modules': false,
              },
            },
          ],
          'stage-0',
        ],
        plugins: ['external-helpers'],
      }),
    ],
  },
];
