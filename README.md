# Private Blockchain Application

## Run the application

Clone this repo to your local computer and proceed with the following steps.

**Install dependencies**

```
npm install
```

**Run Jest tests**

```
npm run test
```

**Start the application**

```
npm run start
```

## Testing using POSTMAN

Below are the results of testing using POSTMAN

1. Run your application using the command `npm run start`
You should see in your terminal a message indicating that the server is listening in port 8000:
> Server Listening for port: 8000

2. To make sure your application is working fine and it creates the Genesis Block you can use POSTMAN to request the Genesis block:
    ![Request: http://localhost:8000/block/0 ]()
3. Make your first request of ownership sending your wallet address:
    ![Request: http://localhost:8000/requestValidation ]()
4. Sign the message with your Wallet:
    ![Use the Wallet to sign a message]()
5. Submit your Star
     ![Request: http://localhost:8000/submitstar]()
6. Retrieve Stars owned by me
    ![Request: http://localhost:8000/blocks/<WALLET_ADDRESS>]()