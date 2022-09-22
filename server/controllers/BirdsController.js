import { Auth0Provider } from "@bcwdev/auth0provider";
import { birdsService } from "../services/BirdsService.js";
import BaseController from "../utils/BaseController.js";

export class BirdsController extends BaseController {
  constructor() {
    super('api/birds')
    this.router
      .get('', this.get)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
  }


  async get(req, res, next) {
    try {
      const birds = await birdsService.getBirds()
      res.send(birds)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.peeperId = req.userInfo.id
      const bird = await birdsService.createBird(req.body)
      res.send(bird)
    } catch (error) {
      next(error)
    }
  }

}
