const Sequelize = require('sequelize')
const db = require('../db')


const Song = db.define(
    'songs',
    {
        title: {
            type: Sequelize.STRING,
            field: 'title'
        },
        artist: {
            type: Sequelize.STRING,
            field: 'artist'
        },
        album: {
            type: Sequelize.STRING,
            field: 'album'
        },
        playlistId: {
            type: Sequelize.INTEGER,
            field: 'playlistId',
            allowNull: false
        }
    },
    {
      tableName: 'songs',
      timestamps: false
      
    }
)
// Song.belongsTo(Playlist, {as: playlists, foreignKey: 'playlistId'})

module.exports = Song