# SETUP

1. Open a new terminal and type
```bash
$ cd src/
$ rm -r client/src/contracts
$ npx truffle develop
truffle(development) > compile
truffle(development) > migrate
truffle(development) > deploy

```

2. Import the truffle 12 word mnemonic in Metamask, use the correct chain ID (1337) to connect to the same instance.

3. Open a new terminal and type
```bash
$ cd src/client
$ yarn
$ yarn start
```

Go to http://localhost:3000/ to view the App.