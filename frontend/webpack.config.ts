import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { Configuration } from 'webpack';
import { Configuration as DevServerConfiguration } from 'webpack-dev-server';

interface WebpackConfig extends Configuration {
  devServer?: DevServerConfiguration;
  proxy?: Array<{ context: string | string[]; target: string; secure?: boolean; changeOrigin?: boolean; pathRewrite?: Record<string, string> }>;
}


const config: WebpackConfig = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    rules: [
        {
            test: /\.css$/i,
            use: ["style-loader", "css-loader"],
        },
        {
            test: /\.(ts|tsx)$/,
            exclude: /node_modules/,
            use: 'ts-loader',
        },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 9000,
    historyApiFallback: true,
    proxy: [
      {
        context: ['/api/**'],
        target: 'http://task.loc',
        secure: false,
        changeOrigin: true,
        pathRewrite: { '^/api': '' }, // Здесь происходит подмена
      },
    ]
},
    mode: 'development',
};

export default config;
