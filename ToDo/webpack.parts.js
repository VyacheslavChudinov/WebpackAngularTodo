const path = require("path");
const PurifyCSSPlugin = require("purifycss-webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

exports.clean = path => ({
    plugins: [new CleanWebpackPlugin()],
});

exports.devServer = ({ host, port } = {}) => ({
    devServer: {
        stats: "errors-only",
        host,
        port,
        open: true,
        overlay: true,
    },
});

exports.loadImages = ({ include, exclude, options } = {}) => ({
    module: {
        rules: [
            {
                test: /\.(png|jpg)$/,
                include,
                exclude,
                use: {
                    loader: "url-loader",
                    options,
                },
            },
        ],
    },
});

exports.loadCSS = ({ include, exclude } = {}) => ({
    module: {
        rules: [
            {
                test: /\.css$/,
                exclude: path.resolve(__dirname, 'src/app'),
                use: [
                    "css-loader"
                ]
            },
            {
                test: /\.css$/,
                include: path.resolve(__dirname, 'src/app'),
                loader: 'raw-loader'
            }
        ],
    },
});

exports.extractCSS = () => {
    return {
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: ["raw-loader"]
                },
            ],
        },
    };
};

exports.autoprefix = () => ({
    loader: "postcss-loader",
    options: {
        plugins: () => [require("autoprefixer")()],
    },
});

exports.purifyCSS = ({ paths }) => ({
    plugins: [new PurifyCSSPlugin({ paths })],
});

exports.loadHTML = () => ({
    module: {
        rules: [
            {
                test: /\.html$/,
                use: 'html-loader'
            }
        ],
    },
});

exports.loadJavaScript = ({ include, exclude } = {}) => ({
    module: {
        rules: [
            {
                test: /\.js$/,
                include,
                exclude,
                use: "babel-loader",
            },
            {
                test: /\.ts$/,
                loaders: [
                    'babel-loader',
                    {
                        loader: 'awesome-typescript-loader',
                        options: {
                            configFileName: path.resolve(__dirname, 'tsconfig.json')
                        }
                    },
                    'angular2-template-loader',
                    'angular-router-loader'
                ],
                exclude: [/node_modules/]
            }
        ],
    },
});