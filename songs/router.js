const { Router } = require('express')
const Song = require('./model')
const Playlist = require('../playlists/model')

const router = new Router()

router.get(
  '/songs',
  (request, response, next) => Song
    .findAll()
    .then(songs => response.send(songs))
    .catch(error => next(error))
)

router.get('/songs/:id', function (request, response, next) {
    const id = (request.params.id)
    Song
    .findByPk(id, {include: [Playlist]})
    .then(songs => response.send(songs))
    .catch(error => next(error))
  })
  

router.post(
    '/songs',
    (request, response, next) => Song
    .create(request.body)
    .then(songs => response.json(songs))
    .catch(error => next(error))
)

router.put('/songs/:id', function (request, response) {
    const id = request.params.id

    Song
    .findByPk(id)
    .then(songs => songs.update(request.body))
    .then(songs => response.send(songs))
    .catch(error => next(error))
  })

module.exports = router