const express = require('express')
const path = require('path')

const app = express()

// const Web3 = require('web3')
// let web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})


app.listen(process.env.PORT || 3000)