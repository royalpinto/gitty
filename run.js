const app = require('./app');
const config = require('./config');


console.log("Using %s environment.", config.env);

app.on('error', console.error);
app.on('listening', () => {
    console.log('Listening on %s', config.server.port);
});

app.listen(config.server.port, config.server.interface);
