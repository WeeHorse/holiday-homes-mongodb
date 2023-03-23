import express from 'express'

const port = 3030
const api = express()
api.use(express.json({limit: '100MB'}))

// lägg till session-hantering
import session from 'express-session'
api.use(session({
    secret: '.l,rtkdyfhgs.xdsdalkrdfgkcdhmsrfkx', // för att salta våra session ids
    resave: false,
    httpOnly: true, // hidden from JS document.cookie
    saveUninitialized: false, // save session even if there is no data in it?
    cookie: { secure: false } // vi SKA använda secure cookies i produktion, MEN KAN INTE i dev
}))

import mongoose from 'mongoose'

const conn = "mongodb+srv://fullstack22:cmO1jP1ou3ZDsap5@fullstack22.pr2jw72.mongodb.net/test"

mongoose.connect(conn, {dbName: 'fullstack22'}).then((result, error) => {
    if (result) console.info('connected to mongodb atlas cluster')
    else if (error) console.error(error)
})

// attach mongoose db to req object (so we can pass it to other modules)
// api.request.mongoose = mongoose

// starta upp servern
api.listen(port, ()=>{
   console.log("http://localhost running at port " + port) 
})

// register domain object routes
import homesRouter from "./routes/homes-routes.js"
api.use('/api/homes', homesRouter)

import homeOwnersRouter from "./routes/home-owners-routes.js"
api.use('/api/home-owners', homeOwnersRouter)

import agentsRouter from "./routes/agents-routes.js"
api.use('/api/agents', agentsRouter)

import loginRouter from "./routes/login-routes.js"
api.use('/api/login', loginRouter)






