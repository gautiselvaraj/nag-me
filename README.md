# Nag Me
[![Coverage Status](https://coveralls.io/repos/github/gautiselvaraj/nag-me/badge.svg?branch=master)](https://coveralls.io/github/gautiselvaraj/nag-me?branch=master)
[![Build Status](https://travis-ci.org/gautiselvaraj/nag-me.svg?branch=master)](https://travis-ci.org/gautiselvaraj/nag-me)

#### Browser extension to nag users
Nag me notifies users of routine tasks. Nag me notifications are soft (doesn't ring and auto closes) so use it for low priority tasks only. Some use cases of Nag Me are to notify to drink water, to take a walk, to relax your eyes and so on while you are on your computer. Nag Me works in [Google Chrome](https://chrome.google.com/webstore/detail/nag-me/jhppmbkjpboolciccfleojhinfjjdfmd), [Firefox](https://addons.mozilla.org/en-US/firefox/addon/nag-me/), and [Opera](https://addons.opera.com/en/extensions/details/nag-me/).

## Built With
- React [(Create React App)](https://github.com/facebookincubator/create-react-app) but made some changes to CRA scripts because
  1. During development, browsers watches a folder and reload the extension when a file is changed in that folder. CRA in development doesn't actually create files in build folder so I needed to do modifications to CRA script to create actual files in build folder so Google Chrome can reload the extension every time we make changes.
  2. Also Nag me needed 2 files `background.js` and `index.js`. `background.js` will run all the time while `index.js` will run only when extension is opened. So I have to run both CRA script (to create `index.js`) and also a custom script (to create `background.js`) in parallel.
- Jest
- Redux
- Immutable.js
- React-Motion
- styled-components

## Getting Started
Clone this repo

```
git clone https://github.com/gautiselvaraj/nag-me.git
cd nag-me
```

Install Dependencies
```yarn```

Start the server
```yarn start```

Let browsers know where your extension is
- Chrome
  1. Visit `chrome://extensions/` in your Google Chrome browser
  2. Enable `Developer mode` by ticking the checkbox in the upper-right corner
  3. Click on the `Load unpacked extension...` button and select the build folder
- Firefox
  1. Visit `about:debugging` in your Firefox browser
  2. Click on the `Load Temporary Add-on` button and choose the `manifest.json` file from build folder
- Opera
  1. Visit `opera:extensions` in your Opera browser
  2. Click on the `Developer Mode` button
  3. Click on the `Load unpacked extension...` button and select the build folder

## Build
Run `yarn build` to build the extension.

## Test
Run `yarn test` to run tests.

## Author
**[Gauti Selvaraj](https://www.gauti.info)**

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
