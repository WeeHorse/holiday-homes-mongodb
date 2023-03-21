// hämta en ny express router
import Router from "express"
const loginRouter = Router();

// schema
import mongoose from 'mongoose'

loginRouter.post('/', async (request, response) => {
    let result = await mongoose.models.agents.findOne({
        email: request.body.email,
        password: request.body.password
    })
    if (result) {
        request.session.agent = result
        response.json({ loggedIn: true })
    } else {
        delete (request.session.agent)
        response.json({ loggedIn: false })
    }
})


loginRouter.get('/', async (request, response) => {
    if (request.session.agent) {
        let result = await mongoose.models.agents.findOne({
            email: request.session.agent.email,
            password: request.session.agent.password
        }) 
        if (result) {
            response.json({
                name: request.session.agent.name,
                email: request.session.agent.email
            })

        } else {
            response.json({ loggedIn: false })
        }

    } else {
        response.json({ loggedIn: false })
    }
})


loginRouter.delete('/', async (request, response) => {
    delete (request.session.agent)
    response.json({ loggedIn: false })
})


export default loginRouter
