const { Router } = require('express')
const Playlist = require('./model')
const Song = require('../songs/model')
const authentication  = require('../users/router')

const router = new Router()

router.post(
  '/playlists', authentication,
  (request, response, next) => 
  Playlist
  .create(request.body)
  .then(playlists => response.json(playlists))
  .catch(error => next(error))
) 

router.get(
  '/playlists', authentication,
  (request, response, next) => 
    Playlist
    .findAll()
    .then(playlists => response.send(playlists))
    .catch(error => next(error))
)

router.get('/playlists/:id', authentication, function (request, response, next) {
    Playlist
    .findByPk(request.params.id, {include: [Song] })
    .then(playlists => response.send(playlists))
    .catch(error => next(error))
  })

  router.delete('/playlists/:id', authentication,function (request, response, next) {
    Playlist
    .findByPk(request.params.id)
    .then(playlists => playlists.destroy(playlists))
    .catch(error => next(error))
  })
  

module.exports = router