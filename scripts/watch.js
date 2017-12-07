process.env.NODE_ENV = 'development';

const fs = require('fs-extra');
const paths = require('react-scripts/config/paths');
const webpack = require('webpack');
const config = require('react-scripts/config/webpack.config.dev.js');

const buildFiles = ['build/index.html', 'build/static/js/bundle.js'];

// Remove webpackHotDevClient
config.entry = config.entry.filter(
  entry => !entry.includes('webpackHotDevClient')
);

// Change output file directory and point to build directory
config.output.filename = `build/${config.output.filename}`

// Change filename for all plugins and point to build directory
config.plugins.forEach(p => {
  if(p.options && p.options.filename) {
    p.options.filename = 'build/index.html'
  }
});

// Change name to all modules and point to build directory
config.module.rules.forEach(r => {
  if(r.oneOf) {
    r.oneOf.forEach(o => {
      if(o.options && o.options.name && o.options.name.includes('static')) {
        o.options.name = `build/${o.options.name}`;
      }
    })
  }
});

// Change hotUpdate file names and point to build directory
config.output.hotUpdateChunkFilename = 'build/hot-update.js';
config.output.hotUpdateMainFilename = 'build/hot-update.json';

webpack(config).watch({}, (err, stats) => {
  if (err) {
    console.error(err);
  } else {
    copyPublicFolder();
    changeJSReference();
  }
  console.error(stats.toString({
    chunks: false,
    colors: true
  }));
});

// Copy files from public folder to build folder
function copyPublicFolder() {
  fs.copySync(paths.appPublic, paths.appBuild, {
    dereference: true,
    filter: file => file !== paths.appHtml
  });
}

// Change JS and fonts reference from index.html and JS bundle
function changeJSReference() {
  buildFiles.map(f => {
    fs.readFile(f, 'utf8', (err, data) => {
      if (err) {
        return console.log(err);
      }

      fs.writeFile(f, data.replace(/\/?build\/static/g, 'static'), 'utf8', err => {
         if (err) {
           return console.log(err);
         }
      });
    });
  });
}
