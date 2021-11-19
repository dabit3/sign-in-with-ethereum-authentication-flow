# Sign in with Ethereum authentication flow

A basic example of how to create an authentication flow using Next.js, public key encryption, and an Ethereum or EVM compatible wallet that works on both desktop and mobile sites.

This project was inspired by [Rahat Chowdhury's](https://github.com/Rahat-ch) [ETH SSO workshop](https://github.com/Rahat-ch/eth-sso-workshop/tree/solution)

### How it works

Using React, ethers.js, Web3Modal, and WalletConnect, sign into an app and authenticate the user on the server, in our case using a Next.js SSR route, using either a browser wallet or a mobile wallet. This codebase also works on mobile devices, legeraging WalletConnect to connect to your mobile wallet of choice.

![Example of ](demo.gif)

### Open in Gitpod

To deploy this project to Gitpod, click this button:

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#github.com/dabit3/sign-in-with-ethereum-authentication-flow)

### Run locally

To run this project locally, follow these steps.

1. Clone the project locally, change into the directory, and install the dependencies:

```sh
git clone git@github.com:dabit3/sign-in-with-ethereum-authentication-flow.git

cd sign-in-with-ethereum-authentication-flow

# install using NPM or Yarn
npm install

# or

yarn
```

2. Start the app

```sh
npm run build && npm start
```