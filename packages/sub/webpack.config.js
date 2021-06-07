const ModuleFederationPlugin = require('webpack').container.ModuleFederationPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-react']
                        ]
                    }
                }
            }
        ]
    },
    //排除打包逻辑
    // externals: {
    //     react: 'react',
    //     'react-dom': 'react-dom'
    // },
    //抽取公共部分逻辑
    optimization: {
        runtimeChunk: {
            name: 'runtime'
        }
    },
    plugins: [
        //模块向导
        new ModuleFederationPlugin({
            name: 'sub',
            //打出的包长什么样
            library: { type: 'var', name: 'sub' },
            //导出的模块
            exposes: {
                "./Button": "./src/Button",
            },
            //维护一个模块，所有远程的模块
            filename: "remoteEntry.js",
            //解决微前端多模块复用组件
            shared: {
                react: {
                    singleton: true,
                    eager: true,
                },
                'react-dom': {
                    singleton: true,
                    eager: true,
                }
            }
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html'
        })
    ],
}