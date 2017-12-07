module.exports = {
  entry: {
    main: './src/background.js',
  },
  output: {
    pathinfo: true,
    filename: './build/background.js',
    chunkFilename: './build/background.chunk.js'
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ["babel-preset-react-app"]
        },
      },
    ],
  }
};
