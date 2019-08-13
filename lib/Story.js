import { joi } from './util'

export default class Story {
  constructor (opts) {
    Object.assign(this, joi.attempt(opts, joi.object().keys({
      uid: joi.string(/* Required to build a story URL */),
      title: joi.string(/* Required to display a link to story on project page */),
      content: joi.string(/* Story HTML, including title */),
      actor: joi.object(/* Required for autolinking & personification within title */),
      // description: joi.string().optional().default('').empty(''),
      // events: joi.array().items(joi.string().optional()),
      // notes: joi.array().items(joi.string().optional()).optional().default([]),
    })))
  }
}
