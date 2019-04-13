require('dotenv').config();
let Web3 = require('web3');
let ABSTRACT_ABI = require('./abi/token_abi')

// Track "DAI", "USDC" and "BNB" token transfer events on ethereum mainnet
// Addresses are in .env file
// We use basic abi (only transfer and balanceof)

async function watchTokenTransfers() {
  // Instantiate web3 with WebSocketProvider
  const web3 = new Web3(new Web3.providers.WebsocketProvider(process.env.INFURA_WS_URL))

  // Instantiate token contract object with JSON ABI and address
  const dai = new web3.eth.Contract(
    ABSTRACT_ABI, process.env.DAI_CONTRACT_ADDRESS,
    (error, result) => { 
      if (error) console.log(error);
     }
  )

  const usdc = new web3.eth.Contract(
    ABSTRACT_ABI, process.env.USDC_CONTRACT_ADDRESS,
    (error, result) => {
      if(error) console.log(error);
    }
  )

  const binance = new web3.eth.Contract(
    ABSTRACT_ABI, process.env.BINANCE_CONTRACT_ADDRESS,
    (error, result) => {
      if(error) console.log(error);
    }
  )

  console.log('Started listening for dai, usdc and binance token transfers');

  // Generate filter options
  const options = {
    fromBlock: 'latest'
  }

  // Subscribe to Transfer events matching filter criteria
  dai.events.Transfer(options, async (error, event) => {
    if (error) {
      console.log(error)
      return
    }

    console.log('Found incoming DAI transaction \n');
    console.log('Token address is: ' + event.address)
    console.log('Transaction hash is: ' + event.transactionHash + '\n')

    return
  })

  // Subscribe to Transfer events from USDC
  usdc.events.Transfer(options, async (error, event) => {
    if (error) {
      console.log(error)
      return
    }

    console.log('Found incoming USDC transaction \n');
    console.log('Token address is: ' + event.address)
    console.log('Transaction hash is: ' + event.transactionHash + '\n')

    return
  })

  binance.events.Transfer(options, async (error, event) => {
    if (error) {
      console.log(error)
      return
    }

    console.log('Found incoming Binance transaction \n');
    console.log('Token address is: ' + event.address)
    console.log('Transaction hash is: ' + event.transactionHash + '\n')

    return
  })
}

watchTokenTransfers();
