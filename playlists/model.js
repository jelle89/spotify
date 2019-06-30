const Sequelize = require('sequelize')
const db = require('../db')
const Song = require('../songs/model')


const Playlist = db.define(
    'playlists',
    {
        name: {
            type: Sequelize.STRING,
            field: 'playlist_name',
            allowNull: false
        }
    },
    {
        tableName: 'playlists',
        timestamps: false
      }
)

Playlist.hasMany(Song, { onDelete: 'cascade' })

module.exports = Playlist