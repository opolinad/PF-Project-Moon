module.exports = {
    mode:'development',
    entry: [
      './front/src/index.js'
    ],
    devtool:'inline-source-map',
    output: {
      path: __dirname + '/front/public',
      filename: 'bundle.js',
      publicPath: 'https://localhost:3000/bundle.js'
      
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react', '@babel/preset-env']
            }
          }
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader'
          ]
        }
      ]
    },
    devServer: {
      publicPath:"/",
      historyApiFallback:{index:"./newFront/bundle.js"}
    }
  }


  