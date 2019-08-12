import { joi } from './util'

export default class Story {
  constructor (opts) {
    Object.assign(this, joi.attempt(opts, joi.object().keys({
      actor: joi.object(/* Required for autolinking & personification within title */),
      title: joi.string(),
      description: joi.string().optional(),
      events: joi.array().items(joi.string()),
      notes: joi.array().items(joi.string()),
    })))
  }
}
