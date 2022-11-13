
//const API_KEY = "0zK3ljg6yvA4BNNMVVa8ubI3vQkhCYeo";
const CONTRACT_ADDRESS = "0x443f1a7CaC8a25bb28136e0cd1d0E3690418b8C3"; /////// 
const API_URL = "https://eth-goerli.g.alchemy.com/v2/0zK3ljg6yvA4BNNMVVa8ubI3vQkhCYeo";
const PUBLIC_KEY = "0xa1116dc51c64f3DD77be3f199DfdDB4362B1D1Cf";
const PRIVATE_KEY = "8c8cdfdd317327b48ae12db55dbbb75953e6f6546785b6a5e6084f20186a388a";

import { createAlchemyWeb3 } from "@alch/alchemy-web3";
const web3 = createAlchemyWeb3(API_URL);


import contract from "./eventos.json" assert { type: "json" };


const eventosContract = new web3.eth.Contract(contract.abi, CONTRACT_ADDRESS);


export async function crearEvento(boletosACrear, nombreEvento, fechaEvento, precioBoleto) {
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
    try {
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
    } catch (err) {
        return {
            "status": 500,
            "message": err
        };
    }
    return { "status": 200, "message": "success" };
}

export async function comprarBoleto(id_evento) {
    const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); // get latest nonce
    const gasEstimate = await eventosContract.methods.comprarBoleto(id_evento).estimateGas(); // estimate gas
    const tx = {
        'from': PUBLIC_KEY,
        'to': CONTRACT_ADDRESS,
        'nonce': nonce,
        'gas': Math.round(gasEstimate * 1.40),
        'data': eventosContract.methods.comprarBoleto(id_evento).encodeABI()
    };

    // Sign the transaction
    try {
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
    } catch (err) {
        return {
            "status": 500,
            "message": err
        };
    }
    return { "status": 200, "message": "success" };
}

///getBoletosRestantesPorUsuario
async function getBoletosRestantesPorUsuario(id_evento) {
    try {
        const message1 = await eventosContract.methods.getBoletosRestantesPorUsuario().call();
        return {
            "status": 200,
            "messagge": "success",
            "response": message1
        };
    } catch (err) {
        return {
            "status": 401,
            "message": err
        };
    }

}

///getBoletosCompradosPorUsuarioContador
async function getBoletosCompradosPorUsuarioContador() {
    try {
        const message1 = await eventosContract.methods.getBoletosCompradosPorUsuarioContador().call();
        return {
            "status": 200,
            "messagge": "success",
            "response": message1
        };
    } catch (err) {
        return {
            "status": 401,
            "message": err
        };
    }

    return;
}

///getCantidadEventos()
async function getCantidadEventos() {
    try {
        const message1 = await eventosContract.methods.getCantidadEventos().call();
        return {
            "status": 200,
            "messagge": "success",
            "response": message1
        };
    } catch (err) {
        return {
            "status": 401,
            "message": err
        };
    }

}






async function crearEventoDesdeFrontend(numeroTickets, NombreEvento, TimeStamp, PrecioIndividualTicket) {
    await crearEvento(numeroTickets, NombreEvento, TimeStamp, PrecioIndividualTicket);
}

async function getTodosLosEventosFrontend() {
    return eventosContract.methods.getTodosLosEventos().call();

}
async function getBoletosRestantesPorUsuarioFrontend(id_evento) {
    return eventosContract.methods.getBoletosRestantesPorUsuario(id_evento).call();


}

async function getBoletosRestantesDelEventoFrontend(indiceDelEvento) {
    return eventosContract.methods.getBoletosRestantesDelEvento(indiceDelEvento).call();

}


async function geEventosActivosJsonFrontend() {
    return eventosContract.methods.geEventosActivos1().call();


}


async function geEventosActivosIndiceFrontend() {
    return eventosContract.methods.geEventosActivos1().call();

}

async function comprarBoletoDesdeFrontend(indiceDelEvento) {
    await comprarBoleto(indiceDelEvento);
}

async function getCantidadEventosFrontend() {
    return eventosContract.methods.getCantidadEventos().call();

}




export async function main() {
    const crearEvento = await crearEventoDesdeFrontend(numeroTickets, NombreEvento, TimeStamp, PrecioIndividualTicket);


    // const getTodosLosEventos = await getTodosLosEventosFrontend();
    // console.info(getTodosLosEventos);



    // const boletosRestantesEventoX = await getBoletosRestantesDelEventoFrontend(3);
    // console.info(boletosRestantesEventoX);


    // const getCantidadDeEventosTotal = await getCantidadEventosFrontend();
    // console.info(getCantidadDeEventosTotal);

    const eventosIndicesActivos = await geEventosActivosIndiceFrontend();
    console.info(eventosIndicesActivos);


    // const eventosActivosDetallados = await geEventosActivosJsonFrontend();
    // console.info(eventosActivosDetallados);



    // const comprarBoletos = await comprarBoletoDesdeFrontend(3);


    // const boletosRestantesDeEventoX = await getBoletosRestantesDelEventoFrontend(3);
    // console.info(boletosRestantesDeEventoX);






    return eventosIndicesActivos;

}


main();

export default { crearEvento, comprarBoleto, main };

/**
 * await comprarBoleto(1);
 * crearEvento
 *
 */


// no funcionando

