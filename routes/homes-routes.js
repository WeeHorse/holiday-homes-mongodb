// hämta en ny express router
import Router from "express"
const homesRouter = Router();

// schema
import mongoose, {Schema} from 'mongoose'

const homeSchema = new Schema({
    noRooms: Number,
    rating: Number,
    homeOwner: { type: mongoose.Schema.Types.ObjectId, ref: 'homeOwners' }
})
mongoose.model('homes', homeSchema)

// get
homesRouter.get('/', async (request, response)=>{
    const homes = await mongoose.models.homes.find().populate('homeOwner').exec();
    response.json(homes)
})

// get by id
homesRouter.get('/:id', async (request, response)=>{
    const home = await mongoose.models.homes.findById(request.params.id).populate('homeOwner').exec();
    response.json(home)
})

// post 
homesRouter.post('/', async (request, response) => {
    if (!request.session.agent) {
        return response.json({ loggedIn: false })
    }
    let result = await mongoose.models.agents.findOne({
        email: request.session.agent.email,
        password: request.session.agent.password
    })     
    if (!result) {  
        return response.json({ loggedIn: false })
    } 
    const homes = new mongoose.models.homes()
    homes.noRooms = request.body.noRooms
    homes.rating = request.body.rating
    homes.homeOwner = request.body.homeOwner // "homeOwner": {"_id":"6418e6ca66c0c7c6abfa86fb"}
    await homes.save()
    response.sendStatus(201)
})


// put by id

// delete by id




export default homesRouter
