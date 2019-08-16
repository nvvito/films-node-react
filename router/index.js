const router = require('express').Router()
const path = require('path')
//routes
const film = require('./routes/film')
//film routes
router.use('/api/film', film)
//index
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'))
})
//export 
module.exports = router