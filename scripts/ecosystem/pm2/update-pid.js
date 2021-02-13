/* eslint-disable no-console */
/**
 * the script that deals with updating the pid of the instance after the pm2 instance
 * is up and running.
 */
const pm2 = require('pm2');
const { spawn } = require('child_process');
const { resolve } = require('path');
const { writeFileSync } = require('fs');
const applicationConfig = require('../config.json');

const versionName = process.argv[2];
if (!versionName) {
	throw new Error('Missing version name.');
}

const removeProcessCommand = () => {
	const command = spawn('node', ['../remove-process.js', versionName]);
	command.stdout.on('data', (data) => {
		console.log(data);
	});
	command.stderr.on('data', (data) => {
		console.error(`stderr: ${data}`);
	});

	command.on('close', (code) => {
		console.log(`child process exited with code ${code}`);
	});
};

pm2.list((err, data) => {
	if (err) { throw new Error(err.message); }
	const deployedKeys = Object.keys(applicationConfig.apps);
	if (!deployedKeys.includes(versionName)) {
		throw new Error(`"${versionName}" version is not deployed.`);
	}
	const config = applicationConfig.apps[versionName];
	const runningInstances = data.find(instance => instance.name === versionName && instance.pm2_env.status === 'online');
	if (!runningInstances) {
		/**
		 * Run the remove-process script to remove the instance
		 * from the config file
		 */
		removeProcessCommand();
		throw new Error(`No running instance with name ${versionName}`);
	}
	config.pid = runningInstances.pid;
	config.pm_id = runningInstances.pm_id;
	applicationConfig.apps[versionName] = config;
	const directory = resolve(__dirname, '..', 'config.json');
	writeFileSync(directory, JSON.stringify(applicationConfig));
	process.exit(0);
});
