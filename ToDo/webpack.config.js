const { AngularCompilerPlugin } = require('@ngtools/webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const parts = require("./webpack.parts");
const merge = require("webpack-merge");
const path = require("path");
const glob = require("glob");

const PATHS = {
    app: path.join(__dirname, "src"),
};

const commonConfig = merge([
    {
        module: {
            rules: [
                {
                    test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
                    loader: '@ngtools/webpack'
                },
            ]
        },

        plugins: [
            new HtmlWebpackPlugin({
                template: 'src/index.html'
            }),
            new AngularCompilerPlugin({
                tsConfigPath: 'tsconfig.json',
                entryModule: 'app.module#AppModule',
                sourceMap: true,
            })
        ],

        entry: {
            polyfills: './src/polyfills.ts',
            app: './src/main.ts'
        },

        output: {
            path: path.resolve(__dirname, 'dist'),
            publicPath: '/',
            filename: '[name].[hash].js'
        },

        resolve: {
            extensions: ['.ts', '.js']
        }
    },

    parts.loadJavaScript({ include: PATHS.app }),
    parts.loadHTML()
]);

const developmentConfig = merge([
    parts.devServer({
        host: process.env.HOST,
        port: process.env.PORT,
    }),

    parts.loadCSS(),
    parts.loadImages(),

]);

const productionConfig = merge([
    parts.clean(),
    parts.extractCSS(),
    parts.purifyCSS({
        paths: glob.sync(`${PATHS.app}/**/*.js`, { nodir: true }),
    }),
    parts.loadImages({
        options: {
            limit: 15000,
            name: "[name].[ext]",
        },
    }),
]);

module.exports = mode => {
    if (mode === "production") {
        return merge(commonConfig, productionConfig, { mode });
    }

    return merge(commonConfig, developmentConfig, { mode });
};