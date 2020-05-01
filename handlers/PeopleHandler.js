'use strict'

const Boom = require('@hapi/boom')
const People = require('../model/People')


const createPeople = async (request, h) => {
    // let db = request.mongo.db
    let people;
    try {
        const now = new Date();
        // const result = await db.collection('people').insertOne({ name: request.payload.name, completed: request.payload.completed, created_at: now });

        let p1 = new People()
        p1.name = request.payload.name
        p1.completed = request.payload.completed
        p1.created_at = now

        people = await p1.save()
    } catch (err) {
        Boom.internal('Internal MongoDB error', err)
    }

    return h.response(people).type('application/json')
}

const getPeople = async (request, h) => {
    // let db = request.mongo.db
    let people = []
    try {
        // people = await db.collection('people').find().toArray()
        people = await People.find()
    } catch (err) {
        Boom.internal('Internal MongoDB error', err)
    }

    return h.response(people).type('application/json')
}

module.exports = {
    createPeople,
    getPeople
}