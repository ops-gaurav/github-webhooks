/**
 * This command will reove remove the process from the configuration
 */
const fs = require('fs');
const config = require('./config.json');

const appName = process.argv[2];

const appConfig = config.apps[appName];
if (!appConfig) {
	throw new Error(`No running app found with "${appName}" name.`);
}
const { env: { PORT } } = appConfig;

delete config.apps[appName];
config.network.allocatedPorts.splice(config.network.allocatedPorts.indexOf(PORT), 1);
fs.writeFileSync('config.json', JSON.stringify(config));
