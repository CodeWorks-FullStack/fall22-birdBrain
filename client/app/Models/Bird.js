export class Bird {
  constructor (data) {
    this.name = data.name || 'Bird?'
    this.img = data.img
    this.id = data.id
    this.peeper = data.peeper
    this.peeperId = data.peeperId
    this.location = data.location
  }

  get BirdTemplate() {
    return /*html*/`
    <div class="col-md-4 mb-3">
      <div class="card">
        <img
        onclick="app.birdsController.peepTheCreeps('${this.id}')"
        data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample"
          src="${this.img}"
          alt="${this.name}" class="img-fluid rounded-top bird-img selectable" title="Peep the creeps">
          
        <div class="card-body">
          <h4 class="text-center">${this.name}</h4>

        </div>
        <div class="card-footer">
          <div class="d-flex justify-content-between">
            <span>${this.location == 'unknown' ? '' : this.location}</span>
            <span>100 - <i onclick="app.birdsController.becomeCreep('${this.id}')" class="selectable" title="Become a creep">👀</i></span>
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
