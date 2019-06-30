const { Router } = require('express')
const Playlist = require('./model')
const Song = require('../songs/model')

const router = new Router()

router.get(
  '/playlists',
  (request, response, next) => Playlist
    .findAll()
    .then(playlists => response.send(playlists))
    .catch(error => next(error))
)

router.get('/playlists/:id', function (request, response, next) {
    const id = request.params.id
    Playlist
    .findByPk(id)
    .then(playlists => response.send(playlists))
    .catch(error => next(error))
  })

router.post(
    '/playlists',
    (request, response, next) => Playlist
    .create(request.body)
    .then(playlists => response.json(playlists))
    .catch(error => next(error))
)

router.put('/playlists/:id', function (request, response) {
    const id = request.params.id

    Playlist
    .findByPk(id)
    .then(playlists => playlists.update(request.body))
    .then(playlists => response.send(playlists))
    .catch(error => next(error))
  })

module.exports = router