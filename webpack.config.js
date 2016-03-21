import path from 'path';
import webpack from 'webpack';

export default {
    cache: true,
    debug: true,
    watch: true,
    entry: {
        angular: [
            'webpack-hot-middleware/client?reload=true',
            path.join(__dirname, 'src/angular/tags-input.module.js')
        ]
    },
    output: {
        path: path.join(__dirname, '/dist/'),
        filename: '[name]/app.js',
        publicPath: '/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ],
    module: {
        loaders: [
            {
                test: /\.js?$/,
                exclude: /(node_modules)/,
                loader: 'babel',
                query: {
                    presets: ['es2015']
                }
            },
        ]
    }
};
