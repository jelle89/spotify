const Sequelize = require('sequelize')
const db = require('../db')


const Playlist = db.define(
    'playlists',
    {
        name: {
            type: Sequelize.STRING,
            field: 'playlist_name',
            allowNull: false
        }
    }
)


module.exports = Playlist