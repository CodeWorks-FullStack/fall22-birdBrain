import { appState } from "../AppState.js"
import { birdsService } from "../Services/BirdsService.js"
import { getFormData } from "../Utils/FormHandler.js"
import { Pop } from "../Utils/Pop.js"
import { setHTML, setText } from "../Utils/Writer.js"

function _drawBirds() {
  let template = ''
  appState.birds.forEach(b => template += b.BirdTemplate)
  setHTML('birds', template)
}

function _drawCreeps() {
  let template = ''
  appState.creepers.forEach(c => template += c.CreepTemplate)

  setHTML('creeps', template)
  if (!appState.activeBird) { return }
  setText('offcanvasExampleLabel', appState.activeBird.name + ' ' + appState.creepers.length)

}

export class BirdsController {
  constructor () {
    this.getBirds()
    appState.on('birds', _drawBirds)
    appState.on('creepers', _drawCreeps)
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
      // @ts-ignore
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

  async peepTheCreeps(birdId) {
    try {

      await birdsService.peepTheCreeps(birdId)
    } catch (error) {
      console.error(error)
      Pop.error(error.message)
    }
  }

  async becomeCreep(birdId) {
    try {
      if (await Pop.confirm("Are you sure you've seen this bird, you creep?")) {
        await birdsService.becomeCreep(birdId)
        Pop.success("YOU'RE A CREEP NOW 👺")
      }
    } catch (error) {
      console.error(error)
      Pop.error(error.message)
    }
  }
}
