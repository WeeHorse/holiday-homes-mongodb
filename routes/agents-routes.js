// hämta en ny express router
import Router from "express"
const agentsRouter = Router();

// krypto
import getHash from "../utils/get-hash.js"

// schema
import mongoose, {Schema} from 'mongoose'

const agentSchema = new Schema({
    name: String,
    email: String,
    password: String,
    homes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'homes' }]
})
mongoose.model('agents', agentSchema)

// get
agentsRouter.get('/', async (request, response)=>{
    const agents = await mongoose.models.agents.find()
    response.json(agents)
})

// get by id
agentsRouter.get('/:id', async (request, response)=>{
    const agent = await mongoose.models.agents.findById(request.params.id)
    response.json(agent)
})

// post 
agentsRouter.post('/', async (request, response) => {
    const agents = new mongoose.models.agents()
    agents.name = request.body.name,
    agents.email = request.body.email,
    agents.password = getHash(request.body.password)
    await agents.save()
    response.sendStatus(201)
})

// put by id

// delete by id




export default agentsRouter
