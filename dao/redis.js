const redis = require("redis");

const client = redis.createClient(({
    port: "6379",
    host: "localhost"
}));

client.set('hello', 'I am redis content.', redis.print);

client.get('hello', (err, reply) => {
    console.log('Error %s', err);
    console.log('Reply %s', reply);
});

module.exports = client;