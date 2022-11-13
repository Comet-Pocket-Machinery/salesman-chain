
const API_KEY = "0zK3ljg6yvA4BNNMVVa8ubI3vQkhCYeo";
const CONTRACT_ADDRESS = "0x443f1a7CaC8a25bb28136e0cd1d0E3690418b8C3"; /////// 
const API_URL = "https://eth-goerli.g.alchemy.com/v2/0zK3ljg6yvA4BNNMVVa8ubI3vQkhCYeo";
const PUBLIC_KEY = "0xa1116dc51c64f3DD77be3f199DfdDB4362B1D1Cf";
const PRIVATE_KEY = "8c8cdfdd317327b48ae12db55dbbb75953e6f6546785b6a5e6084f20186a388a";

import { createAlchemyWeb3 } from "@alch/alchemy-web3";
const web3 = createAlchemyWeb3(API_URL);


import contract from "./eventos.json" assert { type: "json" };


const eventosContract = new web3.eth.Contract(contract.abi, CONTRACT_ADDRESS);




async function crearEvento(boletosACrear, nombreEvento, fechaEvento, precioBoleto) {
    const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); // get latest nonce
    const gasEstimate = await eventosContract.methods.crearEvento(boletosACrear, nombreEvento, fechaEvento, precioBoleto).estimateGas(); // estimate gas
    const tx = {
        'from': PUBLIC_KEY,
        'to': CONTRACT_ADDRESS,
        'nonce': nonce,
        'gas': gasEstimate,
        "gasLimit": 500000,
        'data': eventosContract.methods.crearEvento(boletosACrear, nombreEvento, fechaEvento, precioBoleto).encodeABI()
    };

    // Sign the transaction
    const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
    signPromise.then((signedTx) => {
        web3.eth.sendSignedTransaction(signedTx.rawTransaction, function (err, hash) {
            if (!err) {
                console.log("The hash of your transaction is: ", hash);
            } else {
                console.log("Something went wrong when submitting your transaction:", err)
            }
        });
    }).catch((err) => {
        console.log("Promise failed:", err);
    });
}

async function comprarBoleto(id_evento) {
    const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); // get latest nonce
    const gasEstimate = await eventosContract.methods.comprarBoleto(id_evento).estimateGas(); // estimate gas
    const tx = {
        'from': PUBLIC_KEY,
        'to': CONTRACT_ADDRESS,
        'nonce': nonce,
        'gas':  Math.round(gasEstimate*1.40),
        'data': eventosContract.methods.comprarBoleto(id_evento).encodeABI()
    };

    // Sign the transaction
    const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
    signPromise.then((signedTx) => {
        web3.eth.sendSignedTransaction(signedTx.rawTransaction, function (err, hash) {
            if (!err) {
                console.log("The hash of your transaction is: ", hash);
            } else {
                console.log("Something went wrong when submitting your transaction:", err)
            }
        });
    }).catch((err) => {
        console.log("Promise failed:", err);
    });
}

///getBoletosRestantesPorUsuario
async function getBoletosRestantesPorUsuario(id_evento) {
    const message1 = await eventosContract.methods.getBoletosRestantesPorUsuario().call();
    console.log("The message is: " + message1);

    await crearEvento(42, "miky", 188630, 1);

    const message2 = await eventosContract.methods.getBoletosRestantesPorUsuario().call();
    console.log("The message is: " + message2);

    return ;


}

///getBoletosCompradosPorUsuarioContador
async function getBoletosCompradosPorUsuarioContador() {
    const message1 = await eventosContract.methods.getBoletosCompradosPorUsuarioContador().call();
    console.log("The message is: " + message1);

    await crearEvento(42, "miky", 188630, 1);

    const message2 = await eventosContract.methods.getBoletosCompradosPorUsuarioContador().call();
    console.log("The message is: " + message2);

    return ;
}

///getCantidadEventos()
async function getCantidadEventos() {
    const message1 = await eventosContract.methods.getCantidadEventos().call();
    console.log("The message is: " + message1);

    await crearEvento(42, "miky", 188630, 1);

    const message2 = await eventosContract.methods.getCantidadEventos().call();
    console.log("The message is: " + message2);

    return ;
}

async function main() {
    //  await crearEvento(42, "miky", 1857738793, 1);

    // const message1 = await eventosContract.methods.getTodosLosEventos().call();
    // console.log("The message is: " + message1[0]);
    await comprarBoleto(0);

    //  const message2 = await eventosContract.methods.getBoletosRestantesPorUsuario(0).call();
    //  const message2 = await eventosContract.methods.getBoletosCompradosPorUsuarioContador().call();

    // console.log("The message is: " + message2);

    console.info(message2);




}


main();

