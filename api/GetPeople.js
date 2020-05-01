'use strict'

const Joi = require('@hapi/joi')
const Boom = require('@hapi/boom')

const retrievePeople = {
    name: 'retrievePeople',
    version: '0.1.0',
    register: (server, options) => {
        server.route({
            method: 'GET',
            path: '/api/people',
            handler: async (request, h) => {
                let db = request.mongo.db
                let people = []
                try {
                    people = await db.collection('people').find().toArray()
                } catch (err) {
                    Boom.internal('Internal MongoDB error', err)
                }

                return h.response(people).type('application/json')
            }
        })
    }
}

module.exports = retrievePeople
