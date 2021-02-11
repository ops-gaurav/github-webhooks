

/**
 * this expression will auto deploy all the routes in this path
 */
export default (app) => {
	app.get('/baremetal', (req, res) => res.send('Hello Bare Metal Express Server'));
	app.post('/pr', (req, res) => {
		console.log('PR webhook invoked');
		console.log(req.body);
		res.send({ code: 100 });
	});
};
