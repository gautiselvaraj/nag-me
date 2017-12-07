process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const webpack = require('webpack');
const config = require(`../config/webpack.background.${process.env.NODE_ENV}.js`);

// Watch if it is development ENV
if(process.env.NODE_ENV === 'production') {
  webpack(config, (err, stats) => {
    if (err) {
      console.error(err);
    }
    console.error(stats.toString({
      chunks: false,
      colors: true
    }));
  });
} else {
  webpack(config).watch({}, (err, stats) => {
    if (err) {
      console.error(err);
    }
    console.error(stats.toString({
      chunks: false,
      colors: true
    }));
  });

}
