import {joi} from "./util"

export default class Actor {
  constructor(opts) {
    Object.assign(this, joi.attempt(opts, joi.object().keys({
      title: joi.string(),
      isPersonalized: joi.boolean().optional().default(false),
    })))
  }
}
