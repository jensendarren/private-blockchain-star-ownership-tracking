# Private Blockchain Application

[![Build Status](https://travis-ci.org/jensendarren/private-blockchain-star-ownership-tracking.svg?branch=master)](https://travis-ci.org/jensendarren/private-blockchain-star-ownership-tracking)

This is a Node JS application that simulates a basic blockchain protocol.

## Run the application

Clone this repo to your local computer and proceed with the following steps.

**Install dependencies**

```
npm install
```

**Run Jest tests**

```
npm test
```

**Start the application**

```
npm start
```

## Development

If you want to make changes to the code, I recommend following Test Driven Development and start up Jest in watch mode as follows:

```
npm run test-watch
```

Now start to make changes to the tests and the application code and watch the tests run!

## Testing using POSTMAN

Below are the results of testing using POSTMAN

1. Run your application using the command `npm run start`
You should see in your terminal a message indicating that the server is listening in port 8000:
> Server Listening for port: 8000

2. To make sure your application is working fine and it creates the Genesis Block you can use POSTMAN to request the Genesis block:
    ![Request: http://localhost:8000/block/0 ](./tests/img/test-1-get-genesis-block.png)
3. Make your first request of ownership sending your wallet address:
    ![Request: http://localhost:8000/requestValidation ](./tests/img/test-2-post-request-validation.png)
4. Sign the message with your Wallet:
    ![Use the Wallet to sign a message](./tests/img/test-3-sign-message-with-bitcoin-wallet.png)
5. Submit your Star
     ![Request: http://localhost:8000/submitstar](./tests/img/test-4-post-submit-star.png)
6. Retrieve Stars owned by me
    ![Request: http://localhost:8000/blocks/<WALLET_ADDRESS>](./tests/img/test-5-get-my-stars.png)

## VSCode Debugging the app or with Jest

If you want to start the debugger and attach to the running application instance or running Jest tests, then you can use VSCode launch configurations file to do so `launch.json`. For this project, I am using the following configurations:

```
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Launch Program",
      "skipFiles": [
        "<node_internals>/**"
      ],
      "program": "${workspaceFolder}/start.js"
    },
    {
      "type": "node",
      "request": "launch",
      "name": "Jest Tests",
      "internalConsoleOptions": "openOnSessionStart",
      "program": "${workspaceFolder}/node_modules/jest/bin/jest"
    }
  ]
}
```

### Issue Reporting

If you experience with bugs or need further improvement, please create a new issue under [Issues](https://github.com/jensendarren/private-blockchain-star-ownership-tracking/issues).

### Contributing to this private blockchain!

Pull requests are very welcome. Before submitting a pull request, please make sure that your changes are well tested. Pull requests without tests will not be accepted. In this project we currently use Jest and Supertest.

### Authors

This **Privae Blockchain: Star Ownership Tracking** application was developed as part of the Blockchain Nanodegree with [Udacity](http://www.udacity.com) and [Darren Jensen](http://www.tweetegy.com).

### License

This **Privae Blockchain: Star Ownership Tracking** application is released under [AGPL](http://www.gnu.org/licenses/agpl-3.0-standalone.html)

### Disclaimer

This application is part of a _project assignment_ and is most definitely __not__ suitable for Production use! :)