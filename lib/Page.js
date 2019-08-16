import { joi } from './util'

export default class Page {
  constructor(opts) {
    Object.assign(this, joi.attempt(opts, joi.object().keys({
      uid: joi.string(/* Used to build a URL */),
      title: joi.string(/* Displayed on book main page */),
      content: joi.string(/* Displayed under title */).optional().default('').empty(''),
      points: joi.array().items(joi.string().optional()).optional().default([]),
    })))
  }
}
