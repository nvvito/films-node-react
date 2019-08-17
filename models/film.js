const { Schema, model } = require('mongoose')

// create actor schema
const ActorShema = new Schema({
    f_name: {
        type: String,
        required: true,
    },
    l_name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        default: ''
    }
}, { _id: false })
// create film schema
const FilmShema = new Schema({
    name: {
        type: String,
        required: true,
    },
    release: {
        type: Date,
        required: true,
    },
    format: {
        type: String,
        enum: ['VHS', 'DVD', 'Blu-Ray'],
        required: true,
    },
    actors: [ActorShema],
}, { versionKey: false, collation: { locale: 'uk'/*'en_US'*/, strength: 1 }, })

const FilmModel = model('Film', FilmShema)

module.exports = FilmModel