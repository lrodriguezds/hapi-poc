'use strict'

const Joi = require('@hapi/joi')

const PeopleHandler = require('../handlers/PeopleHandler')

exports.load = [
    {
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
        handler: PeopleHandler.createPeople
    },
    {
        method: 'GET',
        path: '/api/people',
        handler: PeopleHandler.getPeople
    },
    {
        method: 'GET',
        path: '/api/people/{peopleId?}',
        handler: PeopleHandler.getPeople
    },
]