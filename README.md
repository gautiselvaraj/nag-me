# [Nag Me](https://www.gauti.info/nag-me) [![Coverage Status](https://coveralls.io/repos/github/gautiselvaraj/nag-me/badge.svg?branch=master)](https://coveralls.io/github/gautiselvaraj/nag-me?branch=master)

#### Google Chrome extension to nag users
Nag me notify users of routined tasks. Nag me notifications are soft (doesn't ring and also closes itself) so use it for low priority tasks only. I use Nag Me extension to notify me to drink water, to take a walk, to relax my eyes and so on while I'm on my computer. I needed something to remind me of these routined task but I don't want to set a repeat alarm because alarm rings and also excepts me to snooze or turn it off each time. All I wanted is something which will remind me softly without any sound and also closes itself without my intervention. Browser notification seems to be an ideal match so I created Nag Me.

## Built With

[Create React App](https://github.com/facebookincubator/create-react-app) but made some changes to CRA scripts because
1. During development, Google Chrome watches a folder and reload the extension when a file is changed in that folder. CRA in development doesn't actually create files in build folder so I needed to do modifications to CRA script to create actual files in build folder so Google Chrome can reload the extension every time we make changes.
2. Also Google Chrome extensions needed 2 files `background.js` and `index.js`. `background.js` will run all the time while `index.js` will run only when extension is opened. So I have to run both CRA script (to create `index.js`) and also a custom script (to create `background.js`) in parallel.

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

Let Google Chrome know where your extension is
1. Go to [chrome://extensions/](chrome://extensions/) in your Google Chrome
2. Choose 'Load unpacked extension...' and point to your build folder inside nag-me repo

## Author

**[Gauti Selvaraj](https://www.gauti.info)**

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
