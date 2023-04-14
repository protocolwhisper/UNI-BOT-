## 🦄 UniBot
UniBot is a simple yet powerful trading bot that tracks gas prices and performs a swap with routing on Uniswap V3 when the gas target is met. Let UniBot save you time and effort by automating your trades! 🚀 UniBot also sends notifications about the completed swaps and gas prices through Mailchain.


<p align="center">
  <a href="https://www.youtube.com/watch?v=Ua3HtrrQtJc&ab_channel=CartesianCaramel">
    <img src="https://bafkreidpw6vgjaj4yblf34r5juej3jafjzl5e2wyq56rqblyofdnosjili.ipfs.nftstorage.link/" alt="Video Thumbnail">
  </a>
</p>


## 🌟 Features
- Tracks gas prices on the Ethereum network
- Automatically performs a swap when the gas price meets the target
- Uses Uniswap V3 routing to find the best swap route
- Sends notifications about completed swaps and gas prices via Mailchain

## 🛠️ Installation

Follow these steps to install and run UniBot on your machine:

1. Clone the repository:

```bash
git clone https://github.com/protocolwhisper/UNI-BOT-.git
cd UniBot
```
2. Install the dependencies:
```
yarn install
```
3. Create a .env file like this : 
```
GAS_TARGET=The gas target that you want 
ETHERSCAN_API_KEY=""
#Variables for trading
TOKEN_IN=""
TOKEN_OUT=""
POOL_FEE= MEDIUM

##Wallet Confiuration
PRIVATE_KEY=""
```
5. Run UniBot:
```
yarn run
```
## 💌 Mailchain Notifications
UniBot uses Mailchain to send notifications about completed swaps and gas prices. Once a swap is executed, you'll receive an email notification containing the details of the transaction, such as the gas price used and the amount of tokens swapped.

Stay up-to-date with your trades and never miss a great swap opportunity with UniBot!

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 💖 Support
Give a ⭐️ if you like this project!

## 📄 License
This project is MIT licensed.
