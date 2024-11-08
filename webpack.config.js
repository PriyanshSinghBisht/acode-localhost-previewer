const { exec } = require('child_process');
const path = require('path');
const copy = require('copy-webpack-plugin')

module.exports = (env, options) => {
  const { mode = 'development' } = options;
  const rules = [
    {
      test: /\.m?js$/,
      use: [
        'html-tag-js/jsx/tag-loader.js',
        {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      ],
    },
    { test: /\.css$/, use: "raw-loader"}
  ];

  const main = {
    mode,
    entry: {
      main: './src/main.js',
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js',
      chunkFilename: '[name].js',
    },
    module: {
      rules,
    },
    plugins: [
      {
        apply: (compiler) => {
          compiler.hooks.afterDone.tap('pack-zip', () => {
            // run pack-zip.js
            exec('node .vscode/pack-zip.js', (err, stdout, stderr) => {
              if (err) {
                console.error(err);
                return;
              }
              console.log(stdout);
            });
          });
        }
      },
        new copy({
                   patterns: [
                            {
                        from: 'assets',
                        to: 'assets',
                                 },{
                             from: 'demo.gif',
                             to: 'demo.gif'
                                 }
                            ],
        }),
    ],
  };

  return [main];
}