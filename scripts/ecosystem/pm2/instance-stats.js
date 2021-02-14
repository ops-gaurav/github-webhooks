const pm2 = require('pm2');
/**
 * checkes whether the requested version is running or not
 */
export default async version => new Promise((resolve, reject) => {
	pm2.list((err, data) => {
		if (err) { return reject(err); }
		const payload = {
			existsLocally: false,
			running: false,
		};
		const versionInList = data.find(instance => instance.name === version);
		if (versionInList) {
			payload.existsLocally = true;
			if (versionInList.pm2_env.status === 'online') {
				payload.running = true;
			}
		}
		return resolve(payload);
	});
});
