'use strict'

const mongoose = require("mongoose")

let chai = require('chai')
let chaiHttp = require('chai-http')
let should = chai.should()

const { init } = require('../lib/server')

chai.use(chaiHttp);

describe('People', () => {
    let server

    beforeEach(async () => {
        server = await init();
    })

    afterEach(async () => {
        await server.stop();
    })

    it('it should nos create people for missing name', (done) => {

        const p1 = {
            completed: true,
        }

        chai.request(server.listener)
        .post('/api/people')
        .send(p1)
        .end((err, res) => {
            res.should.have.status(400)
            done()
            })

    })

})
