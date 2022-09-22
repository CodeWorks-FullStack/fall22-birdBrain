import { dbContext } from "../db/DbContext.js"
import { BadRequest } from "../utils/Errors.js"

class BirdsService {
  async removeBird(id) {
    const bird = await this.getBirdById(id)
    await bird.remove()
    return bird
  }

  async getBirds() {
    const birds = await dbContext.Birds.find().populate('peeper', 'name picture')
    return birds
  }

  async createBird(formData) {
    const bird = await dbContext.Birds.create(formData)
    await bird.populate('peeper', 'name picture')
    return bird
  }

  async getBirdById(id) {
    const bird = await dbContext.Birds.findById(id).populate('peeper', 'name picture')
    if (!bird) {
      throw new BadRequest('Bad Bird Id')
    }

    return bird
  }



}

export const birdsService = new BirdsService()
