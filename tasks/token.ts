import "@nomiclabs/hardhat-web3"
import { task, types } from "hardhat/config"
const keccak256 = require('keccak256')
import fs = require('fs');

task("deployToken", "Deploy Token")
    .addParam("name", "token name")
    .addParam("symbol", "token symbol")
    .addParam("decimals", "decimals")
    .addParam("minter", "minter address")
    .setAction(async (taskArgs, hre) => {
        const tokenFactory = await hre.ethers.getContractFactory('ERC20MinterBurnerDecimals')
        const token = await tokenFactory.deploy(taskArgs.name, taskArgs.symbol, taskArgs.decimals, taskArgs.minter)
        await token.deployed();

        console.log("Token %s deployed to:%s", taskArgs.name, token.address.toLocaleLowerCase());
        console.log("export ERC20_TOKEN=%s", token.address.toLocaleLowerCase());
    });

task("mintToken", "Deploy Token")
    .addParam("address", "token address")
    .addParam("to", "reciver")
    .addParam("amount", "token mint amount")
    .setAction(async (taskArgs, hre) => {
        const tokenFactory = await hre.ethers.getContractFactory('ERC20MinterBurnerDecimals')
        const token = await tokenFactory.attach(taskArgs.address)

        console.log(await token.mint(taskArgs.to, taskArgs.amount))
    });

task("hasMinterRole", "Deploy Token")
    .addParam("address", "ERC20 contract address")
    .addParam("minter", "transfer address")
    .setAction(async (taskArgs, hre) => {
        const tokenFactory = await hre.ethers.getContractFactory('ERC20MinterBurnerDecimals')
        const token = await tokenFactory.attach(taskArgs.address)

        console.log(await token.hasRole(keccak256("MINTER_ROLE"), taskArgs.transfer))
    });

task("burnToken", "Burn Token")
    .addParam("address", "token address")
    .addParam("from", "reciver")
    .addParam("amount", "token mint amount")
    .setAction(async (taskArgs, hre) => {
        const tokenFactory = await hre.ethers.getContractFactory('ERC20MinterBurnerDecimals')
        const token = await tokenFactory.attach(taskArgs.address)

        console.log(await token.burnCoins(taskArgs.from, taskArgs.amount))
    });

task("queryErc20balances", "Query ERC20 balances")
    .addParam("address", "token address")
    .addParam("user", "user address ")
    .setAction(async (taskArgs, hre) => {
        const tokenFactory = await hre.ethers.getContractFactory('ERC20MinterBurnerDecimals')
        const token = await tokenFactory.attach(taskArgs.address)

        let balances = (await token.balanceOf(taskArgs.user)).toString()
        console.log(balances)
    });
module.exports = {}
