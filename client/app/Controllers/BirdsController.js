import { appState } from "../AppState.js"
import { birdsService } from "../Services/BirdsService.js"
import { getFormData } from "../Utils/FormHandler.js"
import { Pop } from "../Utils/Pop.js"
import { setHTML } from "../Utils/Writer.js"

function _drawBirds() {
  let template = ''
  appState.birds.forEach(b => template += b.BirdTemplate)
  setHTML('birds', template)
}

export class BirdsController {
  constructor () {
    this.getBirds()
    appState.on('birds', _drawBirds)
  }

  async getBirds() {
    try {
      await birdsService.getBirds()
    } catch (error) {
      console.error(error)
      Pop.error(error.message)
    }
  }

  async addBird() {
    try {
      // @ts-ignore
      window.event.preventDefault()
      const form = window.event.target
      const formData = getFormData(form)
      await birdsService.addBird(formData)
      // @ts-ignore
      form.reset()
      // @ts-ignore
      const modal = bootstrap.Modal.getOrCreateInstance('#exampleModal')
      modal.hide()
    } catch (error) {
      console.error(error)
      Pop.error(error.message)
    }
  }
}