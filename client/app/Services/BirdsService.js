import { appState } from '../AppState.js';
import { Bird } from '../Models/Bird.js';
import { Creep } from '../Models/Creep.js';
import { server } from '../Services/AxiosService.js'

class BirdsService {
  async becomeCreep(birdId) {
    const res = await server.post('api/creeps', { birdId })
    console.log(res.data);
  }
  async peepTheCreeps(birdId) {
    appState.creepers = []
    // This works
    // const res = await server.get(`api/creeps?birdId=${birdId}`)
    const res = await server.get('api/creeps', { params: { birdId: birdId } })
    console.log(res.data);
    appState.creepers = res.data.map(c => new Creep(c))
  }
  async addBird(formData) {
    const res = await server.post('api/birds', formData)
    console.log(res.data);
    appState.birds = [...appState.birds, new Bird(res.data)]
  }
  async getBirds() {
    const res = await server.get('api/birds')
    console.log(res.data);
    appState.birds = res.data.map(b => new Bird(b))
  }

}

export const birdsService = new BirdsService()