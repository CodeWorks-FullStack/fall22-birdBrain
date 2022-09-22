import { appState } from '../AppState.js';
import { Bird } from '../Models/Bird.js';
import { server } from '../Services/AxiosService.js'

class BirdsService {
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