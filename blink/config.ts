import 'dotenv/config';
import fs from 'fs';

// Set server
let host: string = "http://localhost"; // Comment out before production deployment
let auto: string = ""; // Auto open blink in dial.to test window : ignored in prod
if (host.includes("localhost")) {
  host = `${host}:3000`;
}

// Define rules with type
interface Rule {
  pathPattern: string;
  apiPath: string;
}

const rules: { rules: Rule[] } = {
  rules: [
    { pathPattern: "/add/fund", apiPath: `${host}/add/fund` },
  ]
};

// Export variables
export { host, rules };
