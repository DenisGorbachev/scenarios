import { joi } from './util'

export default class Book {
  constructor(opts) {
    Object.assign(this, joi.attempt(opts, joi.object().keys({
      uid: joi.string(/* Used to build a URL */),
      title: joi.string(/* Displayed on book main page */),
      content: joi.string(/* Displayed under title */).optional().default('').empty(''),
      sections: joi.array().optional().default([]).items(joi.object().optional().keys({
        title: joi.string(),
      })),
    })))
  }
}
