import { dbContext } from "../db/DbContext.js"

class BirdsService {
  async getBirds() {
    const birds = await dbContext.Birds.find().populate('peeper', 'name picture')
    return birds
  }

  async createBird(formData) {
    const bird = await dbContext.Birds.create(formData)
    await bird.populate('peeper', 'name picture')
    return bird
  }
}

export const birdsService = new BirdsService()
