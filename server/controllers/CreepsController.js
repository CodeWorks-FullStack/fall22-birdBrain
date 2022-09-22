import { Auth0Provider } from "@bcwdev/auth0provider";
import { birdsService } from "../services/BirdsService.js";
import BaseController from "../utils/BaseController.js";
import { BadRequest } from "../utils/Errors.js";

export class CreepsController extends BaseController {
  constructor() {
    super('api/creeps')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
      .get('', this.get)
  }

  async get(req, res, next) {
    try {
      if (!req.query.birdId) {
        throw new BadRequest('Umm no you must provide a birdId query param')
      }
      const creeps = await birdsService.getCreeps(req.query)
      res.send(creeps)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      const formData = {
        birdId: req.body.birdId, // Untrustworthy client Knight
        creeperId: req.userInfo.id // Trusty Auth0
      }

      const creep = await birdsService.beCreepin(formData)
      res.send(creep)
    } catch (error) {
      next(error)
    }
  }
}
