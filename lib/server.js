'use strict';

const Hapi = require('@hapi/hapi')
const mongoose = require('mongoose')

const Routes = require('../routes/Routes')

const server = Hapi.server({
    port: 3000,
    host: 'localhost'
});

server.route(Routes.load)

server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {
        return h.response('up and running').type('text')
    }
})

mongoose.connect('mongodb://localhost:27017/test', {}, (err) => {
    if (err) {
        throw err;
    }
})

exports.init = async () => {
    await server.initialize()
    return server
};

process.on('unhandledRejection', (err) => {
    console.log(err)
    process.exit(1)
})

exports.start = async () => {
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
    return server;
}
