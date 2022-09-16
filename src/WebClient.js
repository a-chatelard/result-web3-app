import Web3 from 'web3';
import { ResultContractABI } from './ResultContractAbi';

let connectedUser;
let resultContract;

export const initWeb3 = async () => {
    let provider = window.ethereum;

    if (typeof provider !== 'undefined') {
        provider.request({ method: 'eth_requestAccounts' })
            .then((accounts) => {
                window.ethereum.on('account has changed', function () {
                    connectedUser = accounts[0];
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const web3 = new Web3(provider);
    const networkId = await web3.eth.net.getId();
    resultContract = new web3.eth.Contract(ResultContractABI, '0x08ee87b826a241bcFb4D270517075594D9Eae85F');
}

export const getCurrentTotalResult = async () => {
    return await resultContract.methods.getResultSnapshot().call({ from: connectedUser });
}

export const addNewResult = async (patientRef, lot, result) => {
    await resultContract.methods.addResult(patientRef, lot, result).send({ from: connectedUser });
}