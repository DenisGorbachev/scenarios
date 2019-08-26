import { joi } from './util'

export default class Point {
  constructor(opts) {
    Object.assign(this, joi.attempt(opts, joi.object().keys({
      uid: joi.string(/* Used to build a URL */),
      title: joi.string(/* Displayed on book main page */),
      subtitle: joi.string(/* Displayed on book main page */).optional().default('').empty(''),
    })))
  }
}
