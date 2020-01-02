import _ from 'lodash'
import Calculator from '../Calculator'

export default {
  init() {
    this.calculator = new Calculator()
  },
  getState() {
    return { input: this.calculator.input }
  },
  setState: function (state = { input: '' }) {
    this.calculator.input = state.input
  },
  handleEvent: function (event, state) {
    console.log('event', event)
    if (!_.isFunction(this.calculator[event.name])) {
      throw new Error(`Handler for ${event.name} not found`)
    }
    this.calculator.context = event.context
    return this.calculator[event.name].apply(this.calculator, event.args)
  },
  getDiff(future, state) {
    return _.differenceWith(_.toPairs(future).sort(), _.toPairs(state).sort(), _.isEqual)
  },
  isEmptyDiff(diff) {
    return _.isEmpty(diff)
  },
}
