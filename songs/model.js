const Sequelize = require('sequelize')
const db = require('../db')
const Playlist = require('../playlists/model')

const Song = db.define(
    'songs',
    {
        title: {
            type: Sequelize.STRING,
            field: 'title',
            allowNull: false
        },
        artist: {
            type: Sequelize.STRING,
            field: 'artist',
            allowNull: false
        },
        album: {
            type: Sequelize.STRING,
            field: 'album',
            allowNull: false
        }
    }
)

Song.belongsTo(Playlist)

module.exports = Song