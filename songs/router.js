const { Router } = require('express')
const Song = require('./model')
const authentication  = require('../users/router')
const router = new Router()

router.post('/playlists/:id/songs', authentication, (request, response, next) => {

  Song
  .create(request.body)
  .then(song => {
    if (!song)
    return response.status(404).send({
      message: 'Song does not exist'
         });
      return response.status(201).send(song)
  })
  .catch(error => next(error))
})


module.exports = router
