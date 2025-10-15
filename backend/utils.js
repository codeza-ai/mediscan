const os = require('os');
const https = require('https');

const getLocalIPAddress = () => {
    const interfaces = os.networkInterfaces();
    for (const interfaceName in interfaces) {
        const networkInterface = interfaces[interfaceName];
        for (const network of networkInterface) {
            if (network.family === 'IPv4' && !network.internal) {
                return network.address;
            }
        }
    }
    return 'localhost';
};

const getOutboundIPAddress = () => {
    return new Promise((resolve, reject) => {
        const req = https.request({
            hostname: 'api.ipify.org',
            port: 443,
            path: '/',
            method: 'GET',
            timeout: 5000
        }, (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                resolve(data.trim());
            });
        });

        req.on('error', (error) => {
            console.warn('Could not fetch outbound IP:', error.message);
            resolve('Unable to determine');
        });

        req.on('timeout', () => {
            req.destroy();
            console.warn('Timeout while fetching outbound IP');
            resolve('Unable to determine');
        });

        req.end();
    });
};

module.exports = {getLocalIPAddress, getOutboundIPAddress};