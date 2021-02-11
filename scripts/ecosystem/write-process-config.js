/**
 * The helper function to update the json config
 */
const fs = require('fs');
const path = require('path');
const config = require('./config.json');

/**
 * calculate the effective port for the new instance
 */
const effectivePORT = () => {
	const { network: { allocatedPorts, portStart } } = config;
	if (!allocatedPorts.length) {
		return portStart;
	}
	const lastPort = allocatedPorts[allocatedPorts.length - 1];
	return lastPort + 1;
};
/**
 * update the config for the ecosystem
 */
const addNewAppInstance = (appConfig) => {
	if (config.apps[appConfig.name]) {
		throw new Error('There is already an app running with similar version.');
	}
	config.apps[appConfig.name] = appConfig;
	config.network.allocatedPorts.push(appConfig.env.PORT);
	fs.writeFileSync('config.json', JSON.stringify(config));
	return config;
};

module.exports = (appConfig) => {
	appConfig.env.PORT = effectivePORT();
	const pm2Config = { apps: [appConfig] };
	const data = JSON.stringify(pm2Config);
	const directory = path.resolve(__dirname, '..', '..', 'versions', appConfig.name, 'config.json');
	fs.writeFileSync(directory, data);
	addNewAppInstance(appConfig);
};
