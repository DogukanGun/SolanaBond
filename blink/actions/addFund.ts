import express from 'express';
import {host} from '../config.js';

const addFund = express.Router();

addFund.get('/add/fund', (req, res) => {
    const obj = {
        icon: "",
        title: "Fund the Bond",
        description: "Enter USDC amount and click Send",
        label: "donate",
        links: {
            actions: [
                {
                    label: "Send",
                    href: `${host}/donate-usdc-build?amount={amount}`,
                    parameters: [
                        {
                            name: "amount",
                            label: "USDC Amount",
                        }
                    ]
                }
            ]
        }
    };
    res.json(obj);
});

addFund.post('/add/fund', (req, res) => {
    //TODO: Add fund to the bond
});