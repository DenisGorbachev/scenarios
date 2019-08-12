import { joi } from './util'

export default class Event {
  constructor (opts) {
    Object.assign(this, joi.attempt(opts, joi.object().keys({
      actor: joi.object(/* Required for autolinking & personification within title */),
      title: joi.string(/* Required to display a link to story on project page */),
      extras: joi.array().items(joi.object().keys({ title: joi.string(), points: joi.array().items(joi.string()) })).optional().default([]),
      notes: joi.array().items(joi.string()).optional().default([]),
    })))
  }
}
