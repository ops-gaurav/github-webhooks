module.exports = () => {
	const configuration = process.argv[2];
	if (!configuration) {
		throw new Error('Missing the configuration for new process');
	}
	const configJSON = configuration.split('=')[1];
	const appConfig = JSON.parse(configJSON);
	appConfig.name = process.argv[3];
	return appConfig;
};
