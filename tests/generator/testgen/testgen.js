import _ from 'lodash'
import fs from 'fs'
import path from 'path'
import objectHash from 'object-hash'

function generate(generators, validators, history = []) {
  let events = []
  for (const generator of generators) {
    events = events.concat(_.filter(generator.call(this), function (event) {
      for (const validator of (validators[event.name] || [])) {
        if (!validator(event, history)) {
          return false
        }
      }
      return true
    }))
  }
  return events
}

// NOTE: isSeen shouldn't depend on diff, because we can arrive at a homogeneous state via multiple event sequences, so diffs may be different (e.g. "place two orders + cancel one" is homogeneous to "place one order")
function isSeen(nextState, store) {
  // console.log('isSeen');
  // console.log('nextState.__image', nextState.__image);
  // console.log('store', store);
  for (const state of store) {
    if (_.isEqual(nextState.__image, state.__image)) {
      return true
    }
  }
  return false
}

function isDiffEmpty(diff) {
  for (const name in diff) {
    if (diff[name].length) {
      return false
    }
  }
  return true
}

function getDiff(nextState, state) {
  // const diff = {}
  // for (const name in collections) {
  //   diff[name] = _.differenceWith(nextState[name], state[name], _.isEqual)
  // }
  // return diff
  return _.differenceWith(nextState, state, _.isEqual)
}

function getExpectationCode(test) {
  return `/* eslint-disable quotes,quote-props,comma-dangle */

module.exports = {};

module.exports.state = ${JSON.stringify(test.state, null, 2)};

module.exports.event = ${JSON.stringify(test.event, null, 2)};

module.exports.result = undefined;

module.exports.diff = {
  'Users': [],
};
`
}

function ensureExpectationTemplate(filename, test) {
  if (!fs.existsSync(filename)) {
    // const expectationFilenameTmp = path.join(os.tmpdir(), expectationFilename);
    // const expectationFilenameLocal = path.join('.' + __dirname, expectationFilename.replace('./', ''));
    if (!fs.existsSync(path.dirname(filename))) {
      fs.mkdirSync(path.dirname(filename))
    }
    fs.writeFileSync(filename, getExpectationCode(test))
  }
}

export default function testgen(name, generators, validators, expectations, expectationsDir, utils) {
  utils.init()
  describe(`${name} testgen`, function () {
    utils.setState(/* empty state (reset) */)
    // unprocessed states, with one zero currState in the beginning
    // using getState() to allow fixtures
    const state = utils.getState()
    // states to be processed
    const states = [state]
    // store of seen states (including unprocessed)
    const store = [state]
    const stateProvider = (function * () {
      while (states.length) {
        yield states.shift()
      }
    }())
    for (const state of stateProvider) {
      const events = generate(generators, validators)
      for (const event of events) {
        const test = { state, event }
        const hash = objectHash(test)
        // eslint-disable-next-line no-shadow
        it(`scenario #${hash}`, (function (state, event) {
          console.info(`Running ${hash}`)
          utils.setState(state)
          const result = utils.handleEvent(_.cloneDeep(event), state)
          const future = utils.getState()
          const diff = getDiff(future, state)
          // NOTE: We want to assert the result even upon empty diff, since the result should contain the error
          // NOTE: In case of empty diff, the state will be homogenous, so we need the "or condition" for empty diff
          if (!isSeen(future, store) || isDiffEmpty(diff)) {
            const expectation = expectations[hash]
            if (expectation === undefined || expectation.result === undefined || expectation.diff === undefined) {
              const expectationFilename = `${expectationsDir}/${hash}.js`
              ensureExpectationTemplate(expectationFilename, test)
              throw new Error(`Add expectation in ${expectationFilename}`)
            }
            expect(result).toEqual(expectation.result)
            expect(diff).toEqual(expectation.diff)
            if (!isDiffEmpty(diff)) {
              states.push(future)
              // storing unprocessed states is necessary for cross-root homogeneity checking
              store.push(future)
            }
          }
        }).bind(this, state, event))
      }
    }
  })
}

const pruneScenarios = [
  {
    name: 'System prunes second root Users.signup',
    sequences: [
      [
        {
          name: 'Users.signup',
          args: { email: 'alice@example.com' },
        },
      ],
      [
        {
          name: 'Users.signup',
          args: { email: 'bob@example.com' },
        },
      ],
    ],
  },
  {
    name: 'System prunes third user signup with same email',
    approach: 'Prune on generation stage by filtering out emails',
    sequences: [],
  },
  {
    name: 'System prunes second sequence of two user signups with same email (we have already checked unique email validation)',
    approach: 'Should already be pruned by homogenicity of first & second user signups with different email',
    sequences: [],
  },
  {
    // next-event-homogenicity: AB ~ ACB
    // * don't generate event
    // * approach: 'Prune on generation stage by filtering out emails',
    name: 'System does not generate second user signup with same email after testing it once (we have already tested it)',
    sequences: [],
  },
  {
    name: 'System does not generate second sequence of order fill, even though the state is not fully homogenous because of new trades',
    sequences: [],
    /**
     * - Remove trades from non-homogenous state (can't - need to remove balances which are updated, but these are important for other tests)
     * - ! Funny that at some point, the order fill scenario will actually throw an error (when the balances deplete)
     */
  },
  // {
  //   name: 'System prunes ',
  //   approach: '',
  //   sequences: [],
  // },
]
