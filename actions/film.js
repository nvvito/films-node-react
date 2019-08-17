const FilmModel = require('../models/film')
//controller
function FilmAction(model) {
    this.model = model
    this.getAll = async ({ page, limit, sort_field, sort_direction }) => {
        try {
            let result = await this.model.find()
                .sort({ [sort_field]: sort_direction })
                .skip((page - 1) * limit)
                .limit(limit)
            let count = await this.model.countDocuments()
            return {
                result: result,
                count: count,
            }
        } catch (error) {
            return {
                error: true,
                message: error,
            }
        }
    }
    this.getOneById = async (_id) => {
        try {
            let result = await this.model.findById(_id)
            if (result) return result
            else return {
                error: true,
                message: 'ID not found',
            }
        } catch (error) {
            return {
                error: true,
                message: error,
            }
        }
    }
    this.createOne = async (data) => {
        try {
            let result = await this.model(data).save()
            return result
        } catch (error) {
            return {
                error: true,
                message: error,
            }
        }
    }
    this.updateOneById = async (_id, data) => {
        try {
            let result = await this.model.findByIdAndUpdate(_id, data, { new: true, runValidators: true, useFindAndModify: false })
            if (result) return result
            else return {
                error: true,
                message: 'ID not found',
            }
        } catch (error) {
            return {
                error: true,
                message: error,
            }
        }

    }
    this.deleteOneById = async (_id) => {
        try {
            let result = await this.model.findByIdAndDelete(_id, { useFindAndModify: false })
            if (result) return result
            else return {
                error: true,
                message: 'ID not found',
            }
        } catch (error) {
            return {
                error: true,
                message: error,
            }
        }
    }
    this.searchByNameAndActorName = async (name) => {
        try {
            let result = await this.model.find()
                .or([{ name: { $regex: name } }, { 'actors.f_name': { $regex: name } }, { 'actors.l_name': { $regex: name } }, { 'actors.surname': { $regex: name } }])
                .limit(4)
            return result
        } catch (error) {
            return {
                error: true,
                message: error,
            }
        }
    }
    this.import = async (data) => {
        try {
            let result = await this.model.insertMany(data)
            return result
        } catch (error) {
            return {
                error: true,
                message: error,
            }
        }
    }
}

//export
module.exports = new FilmAction(FilmModel)