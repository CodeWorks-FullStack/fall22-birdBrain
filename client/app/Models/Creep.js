export class Creep {
  constructor (data) {
    this.id = data.creeper.id
    this.name = data.creeper.name
    this.picture = data.creeper.picture
  }

  get CreepTemplate() {
    return `
    <div class="col-12">
      <img
        src="${this.picture}"
        alt="${this.name}" class="img-fluid">
      <p>${this.name}</p>
    </div>
    `
  }
}