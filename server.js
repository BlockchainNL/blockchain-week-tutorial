const path = require('path');
const express = require('express');
const app = express();
const port = 3000 || process.env.PORT;
const bodyParser = require('body-parser');

const Web3 = require('web3');
const escrow = require('./assets/scripts/escrow.js');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
});

app.post('/create', (req, res) => {
  console.log(req.body.clientAddress);
  escrow.setClient(req.body.clientAddress);
  escrow.start(req.body.amount);
});

app.post('/complete', (req, res) => {
  escrow.setFreelancer(req.body.FreelancerAddress);
  escrow.complete();
});

app.post('/terminate', (req, res) => {
  escrow.terminate();
});


app.listen(port, () => {

  if (typeof web3 !== 'undefined') {
    console.warn("Using web3 detected from external source. If using MetaMask, see the following link - http://truffleframework.com/tutorials/truffle-and-metamask")
    // Use Mist/MetaMask's provider
    escrow.web3 = new Web3(web3.currentProvider);
  } else {
    console.warn("No web3 detected. Falling back to http://127.0.0.1:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    escrow.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    escrow.init();
    // escrow.web3.eth.getAccounts().then(accounts => console.log(accounts)); // test
  }
  
  console.log("listening at http://localhost:" + port);
});