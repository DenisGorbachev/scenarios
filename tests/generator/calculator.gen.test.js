import _ from 'lodash'
import testgen from './testgen/testgen'
import utils from './testgen/calculator.utils'

const expectationsDir = `${process.env.PWD}${__filename}`.replace('.js', '')

const generators = []
generators.push(function () {
  const symbols = ["1"]
  // const symbols = ['+', '-', '/', '*', '%', '1', '0', '0.1', '0.2']
  return symbols.map(function (symbol) {
    return {
      name: 'send',
      args: [symbol],
      context: {},
    }
  })
})
generators.push(function () {
  return [
    {
      name: 'run',
      args: [],
      context: {},
    },
  ]
})

const validators = []
// validators['MeteorAccounts.createUser'] = [];
// validators['MeteorAccounts.createUser'].push(function (event, history) {
//   // if (_.find(history))
//   return true;
// });

// Enable testgen:
testgen('Calculator', generators, validators, {}, expectationsDir, utils)
