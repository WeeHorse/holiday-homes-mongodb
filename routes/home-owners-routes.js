// hämta en ny express router
import Router from "express"
const homeOwnersRouter = Router();

// schema
import mongoose, {Schema} from 'mongoose'

const homeOwnerSchema = new Schema({
    name: String
})
mongoose.model('homeOwners', homeOwnerSchema)

// get
homeOwnersRouter.get('/', async (request, response)=>{
    const homeOwners = await mongoose.models.homeOwners.find()
    response.json(homeOwners)
})

// get by id
homeOwnersRouter.get('/:id', async (request, response)=>{
    const homeOwners = await mongoose.models.homeOwners.findById(request.params.id)
    response.json(homeOwner)
})

// post 
homeOwnersRouter.post('/', async (request, response) => {
    const homeOwners = new mongoose.models.homeOwners()
    homeOwners.name = request.body.name
    await homeOwners.save()
    response.sendStatus(201)
})

// put by id

// delete by id




export default homeOwnersRouter
