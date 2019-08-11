export default class Project {
  constructor(opts) {
    Object.assign(this, {
      stories: [],
      definitions: [],
    })
    Object.assign(this, opts)
  }
}
