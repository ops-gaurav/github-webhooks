/* eslint-disable no-console */
/* eslint-disable camelcase */
import { resolve } from 'path';
import shelljs from 'shelljs';
import instanceStats from '../../../scripts/ecosystem/pm2/instance-stats';
import pull from '../git/pull';
import run from '../process/run';
/**
 * the service to run when a pull request is openend
 */
export default async (payloadData) => {
	const { pull_request: { head: { ref } }, repository: { html_url } } = payloadData;
	// check if the branch is already deployed
	const instanceDetails = await instanceStats(ref);
	const scriptsDirectory = resolve(__dirname, '..', '..', '..', 'scripts');
	if (instanceDetails.existsLocally) {
		// need to run the pull and run instancee
		await pull(ref);

		// re-run instance
		// await run('cd', [scriptsDirectory, '&&', './re-run.sh', ref]);
		await run(`${scriptsDirectory}/./re-run.sh`, [ref]);
		// execSync(`./re-run.sh ${ref}`, { cwd: scriptsDirectory });
	} else {
		// need to clone the branch locally
		// await run('cd', [scriptsDirectory, '&&', './setup-instance.sh', html_url, ref]);
		// await run(`${scriptsDirectory}/./setup-instance.sh`, [html_url, ref], true);
		shelljs.exec(`${scriptsDirectory}/./setup-instance.sh ${html_url} ${ref}`);
		// const { stderr, stdout } = await execPromise(`${scriptsDirectory}/./setup-instance.sh ${html_url} ${ref}`);
		// console.log('stdout:', stdout);
		// console.error('stderr: ', stderr);
	}
};
