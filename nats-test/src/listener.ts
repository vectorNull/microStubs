import { connect } from 'node-nats-streaming';

console.clear();

const stan = connect('tickets', '123', {
	url: 'http://localhost:4222',
});

stan.on('connect', () => {
	console.log('Listener connected to NATS');

	const subscription = stan.subscribe('ticket:created');

	subscription.on('message', (msg) => {
		console.log('Message received...');
		console.log(msg);
	});
});
