import { joi } from './util'

export default class Project {
  constructor(opts) {
    Object.assign(this, joi.attempt(opts, joi.object().keys({
      uid: joi.string(/* Required to build a project URL */),
      title: joi.string(/* Required to display a link to project on main page */),
      stories: joi.array().optional().default([]),
      definitions: joi.array().optional().default([]),
    })))
  }
}
