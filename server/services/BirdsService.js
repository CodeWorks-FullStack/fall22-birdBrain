import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class BirdsService {
  async getCreeps(query) {
    const creeps = await dbContext.Creepers.find({ birdId: query.birdId })
      .populate('bird').populate('creeper', 'name picture')
    return creeps
  }

  async beCreepin(formData) {

    const bird = await this.getBirdById(formData.birdId)
    const creep = await dbContext.Creepers.create(formData)
    await creep.populate('bird')
    await creep.populate('creeper', 'name picture')
    // @ts-ignore
    // creep.bird = bird

    return creep
  }

  async removeBird(id, userInfo) {
    const bird = await this.getBirdById(id)
    if (bird.peeperId != userInfo.id) {
      throw new Forbidden('Not yo bird')
    }
    await bird.remove()
    return bird
  }

  async getBirds() {
    const birds = await dbContext.Birds.find().populate('peeper', 'name picture').populate('creeepinCreepers')
    return birds
  }

  async createBird(formData) {
    const bird = await dbContext.Birds.create(formData)
    await bird.populate('peeper', 'name picture')
    return bird
  }

  async getBirdById(id) {
    const bird = await dbContext.Birds.findById(id).populate('peeper', 'name picture').populate('creeepinCreepers')
    if (!bird) {
      throw new BadRequest('Bad Bird Id')
    }

    return bird
  }



}

export const birdsService = new BirdsService()
