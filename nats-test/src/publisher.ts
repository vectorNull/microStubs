import { connect } from 'node-nats-streaming';

console.clear();

// a client to connect to NATS streaming service
//
const stan = connect('tickets', 'abc', {
	url: 'http://localhost:4222',
});

stan.on('connect', () => {
	console.log('Publisher connected to NATS');

	// NATS takes JSON data, not objects
	const data = JSON.stringify({
		id: '123',
		title: 'concert ticket',
		price: 20,
	});

	stan.publish('ticket:created', data, () => {
		console.log('Event published...');
	});
});
