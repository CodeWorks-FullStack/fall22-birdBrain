import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import { birdsService } from '../services/BirdsService.js'
import BaseController from '../utils/BaseController'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      .post('/creep', this.createCreep)
      .get('/creeps', this.getCreeps)
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

  async createCreep(req, res, next) {
    try {
      req.body.creeperId = req.userInfo.id
      const creep = await birdsService.beCreepin(req.body)
      res.send(creep)
    } catch (error) {
      next(error)
    }
  }

  async getCreeps(req, res, next) {
    try {
      const creeps = await birdsService.getCreeps({
        creeperId: req.userInfo.id
      })
      res.send(creeps)
    } catch (error) {
      next(error)
    }
  }

}
