import { ACTIONS } from '../constants';
import onOpen from '../services/pullrequest/opened';
/**
 * this expression will auto deploy all the routes in this path
 */
export default (app) => {
	app.get('/baremetal', (req, res) => res.send('Hello Bare Metal Express Server'));
	app.post('/pr', (req, res) => {
		const { body } = req;
		switch (body.action) {
			case ACTIONS.OPENED:
				onOpen(body);
				break;
			default:
				console.log('Unhandled action for', body);
		}
		res.send(req.body);
	});
};
