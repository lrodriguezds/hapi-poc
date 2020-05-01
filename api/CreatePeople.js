'use strict'

const Joi = require('@hapi/joi')
const Boom = require('@hapi/boom')

const createPeople = {
    name: 'createPeople',
    version: '0.1.0',
    register: (server, options) => {
        server.route({
            method: 'POST',
            path: '/api/people',
            options: {
                validate: {
                    payload: Joi.object({
                        name: Joi.string().required(),
                        completed: Joi.boolean().required()
                    })
                }
            },
            handler: async (request, h) => {
                let db = request.mongo.db
                let people;
                try {
                    const now = new Date();
                    const result = await db.collection('people').insertOne({ name: request.payload.name, completed: request.payload.completed, created_at: now });

                    people = result.ops[0]
                } catch (err) {
                    Boom.internal('Internal MongoDB error', err)
                }

                return h.response(people).type('application/json')
            }
        })
    }
}

module.exports = createPeople
