import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { host, rules } from './config';
import open from 'open';

// Create express app
const app = express();
app.use(bodyParser.json());

// Enable CORS
app.options('*', cors(
    {
        "methods": ["GET,PUT,POST,OPTIONS"],
        "allowedHeaders": ['Content-Type, Authorization, Content-Encoding, Accept-Encoding, X-Accept-Action-Version, X-Accept-Blockchain-Ids'],
        "exposedHeaders": ['X-Action-Version, X-Blockchain-Ids'],
        "preflightContinue": true,
        "optionsSuccessStatus": 204
    }
));
app.use((_, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Encoding, Accept-Encoding');
    res.setHeader('X-Blockchain-Ids', 'solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp');
    res.setHeader('X-Action-Version', '0.1');
    res.setHeader('Content-Encoding', 'compress');
    res.setHeader('Content-Type', 'application/json');
    next();
});

// GET for actions
app.get("/actions.json", (req, res) => {
    res.send(JSON.stringify(rules));
});

// Define routes


// Start server
app.listen(process.env.PORT || 3000, async () => {
    console.log("solana-action-express is running!");
    if (host.includes("localhost")) {
        open("https://dial.to/?action=solana-action:" + host);
    }
});