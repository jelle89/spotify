const express = require('express');
const bodyParser = require('express')
const playlistRouter = require('./playlists/router')
const songRouter = require('./songs/router')
// const authRouter = require('./auth/router')
// const userRouter = require('./user/router')
const app = express();
const jsonParser = bodyParser.json()
app.use(jsonParser)
app.use(playlistRouter)
app.use(songRouter)
// app.use(authRouter)
// app.use(userRouter)

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on :${port}`))