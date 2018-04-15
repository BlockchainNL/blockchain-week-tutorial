const $ = require('jquery');
const contract = require('truffle-contract');
const escrow_artifact = require('../../build/contracts/Escrow.json');
const Escrow = contract(escrow_artifact);



module.exports = {
    init: function() {
        let self = this;

        Escrow.setProvider(self.web3.currentProvider);
        if (typeof Escrow.currentProvider.sendAsync !== "function") {
            Escrow.currentProvider.sendAsync = function() {
              return Escrow.currentProvider.send.apply(
                Escrow.currentProvider, arguments
              );
            };
        }

        // Escrow.defaults({from: self.web3.eth.coinbase});

        self.web3.eth.getAccounts().then(accounts => {
            console.log(accounts)
            self.web3.eth.defaultAccount = accounts[0]

            // Escrow.defaults(accounts[0]);
        }); // test
    },
    setClient: function(clientAddress) {
        let self = this;
        console.log("setClient:\t" + clientAddress + "default:\t" + self.web3.eth.defaultAccount);
        
        self.client = clientAddress;
        Escrow.defaults(self.client);

        Escrow.setProvider(self.web3.currentProvider);
        
        let escrowInstance;
        Escrow.deployed().then((instace) => {
            escrowInstance = instace;
            escrowInstance.setClient(clientAddress);
        }).then(() => {
            console.log(escrowInstance.client);
        }).catch((err) => {
            console.log("error in setClient");
            console.log(err);
        });
    },
    setFreelancer: function(freelancerAddress) {
        let escrowInstance;
        Escrow.deployed().then((instace) => {
            escrowInstance = instace;
            escrowInstance.setFreelancer(freelancerAddress);
        }).then(() => {
            console.log(escrowInstance.freelancer);
        }).catch((err) => {
            console.log(err);
        });
    },
    start: function(amount) {
        let self = this;
        console.log("start:\t" + amount);
        let escrowInstance;
        Escrow.defaults(self.client);
        Escrow.deployed().then((instace) => {
            escrowInstance = instace;
            escrowInstance.start();
        }).catch((err) => {
            console.log("error in start");
            console.log(err);
        });
    },
    complete: function() {
        let escrowInstance;
        Escrow.deployed().then((instace) => {
            escrowInstance = instace;
            escrowInstance.complete();
        }).then(() => {
            console.log(escrowInstance.state);
            console.log(escrowInstance.payment);
        }).catch((err) => {
            console.log(err);
        });
    },
    terminate: function() {
        let escrowInstance;
        Escrow.deployed().then((instace) => {
            escrowInstance = instace;
            escrowInstance.terminate();
        }).catch((err) => {
            console.log(err);
        });
    }
};
