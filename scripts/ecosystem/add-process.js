/* eslint-disable no-console */
const parseArguments = require('./parse-arguments');
const validateProcessConfig = require('./validate-process');
const writeProcessConfig = require('./write-process-config');

(async () => {
	const processConfig = await parseArguments();
	// check if there is already a similar process running
	validateProcessConfig(processConfig);
	await writeProcessConfig(processConfig);
	console.log(`Added the process config to "${processConfig.name}" version.`);
})();
