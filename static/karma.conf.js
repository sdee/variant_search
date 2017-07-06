module.exports = function (config) {
    config.set({
        basePath: 'src',
        singleRun: true,
        frameworks: ['mocha', 'expect'],
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
                extensions: ['', '.js', '.ts', '.json'],
                modulesDirectories: ['node_modules', 'src'],
            },
            devtool: 'inline-source-map', // just do inline source maps instead of the default
            module: {
                loaders: [{
                    test: /\.js$/,
                    exclude: /\/node_modules\//,
                    loader: 'babel',
                    query: {
                        plugins: ['transform-decorators-legacy', 'transform-regenerator'],
                        presets: ['react', 'es2015', 'stage-1'],
                    },

                },
               { test: /\.json$/, loader: 'json' },
                ],
            },
            externals: {

                'react/addons': true,
                'react/lib/ExecutionEnvironment': true,
                'react/lib/ReactContext': true,
            },
        },
    });
};
