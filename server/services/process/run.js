/* eslint-disable no-console */
import { spawn } from 'child_process';
/**
 * run any child process
 */
export default async (program, commands = [], detached = false) => {
	const command = spawn(program, commands, { detached });
	command.stdout.on('data', (data) => {
		console.log(data.toString());
	});
	command.stderr.on('data', (data) => {
		console.error(`stderr: ${data.toString()}`);
		command.unref();
		return false;
	});

	command.on('close', (code) => {
		console.log(`child process exited with code ${code}`);
		command.unref();
		return true;
	});
};
