/**
 * the ecosystem can have multiple processes running with similar configuration and names
 * This script will validate the incoming process configuration with the list of processes
 * already in the list and throws exception if any uncertainity is found.
 */
const config = require('./config.json');

module.exports = (processConfiguration) => {
	const { env: { PORT }, name } = processConfiguration;
	for (const key of Object.keys(config.apps)) {
		const app = config.apps[key];
		if (app.name === name) {
			throw new Error(`Multiple apps on cluster with similar version: ${name}`);
		}
		if (app.env.PORT === PORT) {
			throw new Error(`Cannot run muliple apps on similar port ${PORT}. Check configuration.`);
		}
	}
};
