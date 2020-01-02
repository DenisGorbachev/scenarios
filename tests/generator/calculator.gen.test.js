import _ from 'lodash'
import fs from 'fs'
import testgen from './testgen/testgen'
import utils from './testgen/calculator.utils'

const expectationsDir = `${__filename}`.replace('.js', '')
// const expectations = {}
//   fs.readdirSync(expectationsDir).forEach(function(filename) {
//
//   });
// })(expectationsDir)

const generators = []
generators.push(function () {
  const symbols = ['1']
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

const tests = testgen('Calculator', generators, validators, expectationsDir, utils)

/**
 * Ways:
 * - Test operation count
 * - Test generated tests
 *   - But can't generate tests without database state
 * - Gather test sequences (state + event), test for inclusion
 */
it('generates necessary tests', () => {
  expect(tests).toEqual([
    {
      state: {
        input: '',
      },
      event: {
        name: 'send',
        args: ['1'],
        context: {},
      },
    },
    {
      state: {
        input: '',
      },
      event: {
        name: 'run',
        args: [],
        context: {},
      },
    },
  ])
})
