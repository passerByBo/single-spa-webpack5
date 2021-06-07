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
    plugins: [
        //模块向导
        new ModuleFederationPlugin({
            name: 'main',
            //打出的包长什么样
            library:{type: 'var', name: 'main'},
            //远程需要使用的模块sub
            remotes: {sub: 'app2'},
            //解决微前端多模块复用组件
            shared:{
                react:{
                    singleton:true,
                    eager:true,
                },
                'react-dom':{
                    singleton:true,
                    eager:true,
                }
            }
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html'
        })
    ],
}