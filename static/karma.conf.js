module.exports = function (config) {
  config.set({
    basePath: 'src',
    singleRun: true,
    frameworks: ['mocha'],
    reporters: ['dots'],
    browsers: ['Chrome'],
    files: [
      'tests/**/*.spec.js',
    ],
    preprocessors: {
      'tests/**/*.spec.js': ['webpack'],
    },
    webpack: {
      resolve: {
        extensions: ['', '.js', '.ts'],
        modulesDirectories: ['node_modules', 'src'],
      },
      devtool: 'inline-source-map', // just do inline source maps instead of the default
      module: {
        loaders: [{
          test: /\.js$/,
          exclude: /\/node_modules\//,
          loader: 'babel',
          query: {
            presets: ['airbnb'],
          },
        }],
      },
      externals: {
        cheerio: 'window',
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true,
      },
     },
     // ...
   });
 };
