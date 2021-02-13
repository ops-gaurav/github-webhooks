/**
 * the ecosystem can have multiple processes running with similar configuration and names
 * This script will validate the incoming process configuration with the list of processes
 * already in the list and throws exception if any uncertainity is found.
 */
const config = require('./config.json');

module.exports = (processConfiguration) => {
	const { name } = processConfiguration;
	if (config.apps[name]) {
		throw new Error(`Multiple apps on cluster with similar version: ${name}`);
	}
};
