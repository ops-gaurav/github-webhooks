/* eslint-disable no-console */
import { spawn } from 'child_process';
import { resolve } from 'path';
/**
 * Run the git pull on specified repository version
 */
export default async (version) => {
	const path = resolve(__dirname, '..', '..', '..', 'versions', version);
	const command = spawn(`git -C ${path} pull`);
	command.stdout.on('data', (data) => {
		console.log(`stdout: ${data.toString()}`);
	});

	command.stderr.on('data', (data) => {
		console.log(`stderr: ${data.toString()}`);
		return false;
	});

	command.on('exit', (code) => {
		console.log(`child process exited with code ${code.toString()}`);
		return false;
	});
};
