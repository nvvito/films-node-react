const router = require('express').Router()
//model
const film = require('../../controllers/film')
//router
router.get('/', film.getAll)
router.get('/:id', film.getOneById)
router.post('/', film.createOne)
router.put('/:id', film.updateOneById)
router.delete('/:id', film.deleteOneById)
//custom routes
router.post('/search', film.searchByNameAndActorName)
router.post('/import', film.import)
//export
module.exports = router