const FilmAction = require('../actions/film')
const Joi = require('@hapi/joi')

class FilmController {
    constructor(action) {
        this.action = action
    }
    getAll = async (req, res) => {
        //validate query
        let query = Joi.validate(req.query, paginationSchema)
        if (!query.error) {
            //call method
            let result = await this.action.getAll(query.value)
            if (!result.error) return res.send({
                status: true,
                message: result
            })
            else return res.status(500).send({
                status: false,
                message: result.message
            })
        } else return res.status(500).send({
            status: false,
            message: query.error
        })
    }
    getOneById = async (req, res) => {
        //params
        let { id } = req.params
        //call method
        let result = await this.action.getOneById(id)
        if (!result.error) return res.send({
            status: true,
            message: result
        })
        else return res.status(500).send({
            status: false,
            message: result.message
        })
    }
    createOne = async (req, res) => {
        //params
        let data = req.body
        //call method
        let result = await this.action.createOne(data)
        if (!result.error) return res.send({
            status: true,
            message: result
        })
        else return res.status(500).send({
            status: false,
            message: result.message
        })
    }
    updateOneById = async (req, res) => {
        //params
        let { id } = req.params
        let data = req.body
        //call method
        let result = await this.action.updateOneById(id, data)
        if (!result.error) return res.send({
            status: true,
            message: result
        })
        else return res.status(500).send({
            status: false,
            message: result.message
        })
    }
    deleteOneById = async (req, res) => {
        //params
        let { id } = req.params
        //call method
        let result = await this.action.deleteOneById(id)
        if (!result.error) return res.send({
            status: true,
            message: result
        })
        else return res.status(500).send({
            status: false,
            message: result.message
        })
    }
    searchByNameAndActorName = async (req, res) => {
        //params
        let { name } = req.body
        // validate name
        if (name) {
            //call method
            let result = await this.action.searchByNameAndActorName(name)
            if (!result.error) return res.send({
                status: true,
                message: result
            })
            else return res.status(500).send({
                status: false,
                message: result.message
            })
        } else return res.status(500).send({
            status: false,
            message: 'Name not given'
        })
    }
    import = async (req, res) => {
        let { data } = req.body
        if (data) {
            //call method
            let result = await this.action.import(data)
            if (!result.error) return res.send({
                status: true
            })
            else return res.status(500).send({
                status: false,
                message: result.message
            })
        } else return res.status(500).send({
            status: false,
            message: 'DATA not given'
        })
    }
}

module.exports = new FilmController(FilmAction)

const paginationSchema = Joi.object().keys({
    page: Joi.number().default(1),
    limit: Joi.number().default(5),
    sort_field: Joi.string().valid('_id', 'name', 'release', 'format').default('name'),
    sort_direction: Joi.string().valid('asc', 'desc').default('asc')
})