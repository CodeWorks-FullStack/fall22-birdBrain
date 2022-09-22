export class Bird {
  constructor (data) {
    this.name = data.name || 'Bird?'
    this.img = data.img
    this.id = data.id
    this.peeper = data.peeper
    this.peeperId = data.peeperId
    this.location = data.location || 'The roof'
    this.watchers = data.watchers
  }

  get BirdTemplate() {
    return /*html*/`
    <div class="col-md-4 mb-3">
      <div class="card">
        <img
          src="${this.img}"
          alt="${this.name}" class="img-fluid rounded-top bird-img">
        <div class="card-body">
          <h4 class="text-center">${this.name}</h4>

        </div>
        <div class="card-footer">
          <div class="d-flex justify-content-between">
            <span></span>
            <span>${this.watchers} - 👀</span>
            <span>
              <img
                title="${this.peeper.name}"
                src="${this.peeper.picture}"
                alt="${this.peeper.name}" class="img-fluid rounded picture">
            </span>
          </div>
        </div>
      </div>
    </div>
    `
  }
}
