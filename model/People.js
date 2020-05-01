const mongoose = require('mongoose')

const Schema = mongoose.Schema

const PeopleModel = new Schema({
    name: { type: String, required: true }, // Number, String, Boolean, Date, BigInt, Object, Undefined, Null
    completed: { type: Boolean, required: true },
    created_at: { type: Date, required: true } ,
})

module.exports = mongoose.model('People', PeopleModel)