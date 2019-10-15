const merge = require("webpack-merge");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const parts = require("./webpack.parts");

const commonConfig = merge([{
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Hello'
      }),
	],
  },
]);

const productionConfig = merge([
	parts.loadImages({
	  options: {
		limit: 15000,
		name: "[name].[ext]",
	  },
	}),  
  ]);

const developmentConfig = merge([
	parts.devServer({
		host: process.env.HOST,
		port: process.env.PORT,
	  }),

	parts.loadImages(),  
]);

module.exports = mode => {
	if (mode === "production") {
	  return merge(commonConfig, productionConfig, { mode });
	}
  
	return merge(commonConfig, developmentConfig, { mode });
  };

module.exports = {
	module: {
		rules: [
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [{
					loader: 'file-loader',
					options: {
						name: '[path][name].[ext]',
					},
				}],
            },
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
			{
				test: /\.html$/,
				use: [
					{
						loader: 'html-loader',
						options: { minimize: true },
					},
				],
			},
		],
	},

	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
			fileName: './index.html',
		}),
	],
};
