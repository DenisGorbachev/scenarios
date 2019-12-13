import _ from 'lodash'
import { resetDatabase } from 'meteor/xolvio:cleaner'
import { Users } from '/imports/api/Users/Users'
import { VtmVotes } from '/imports/api/VtmVotes/VtmVotes'
import { Random } from 'meteor/random'
import '/imports/api/methods'
import '/imports/bootstrap.test'

export const collections = { Users, VtmVotes }

// FIXME: use hwillson:stub-collections to speedup tests (replace DB collections with minimongo collections)
// Meteor.connection._stores['Users']._getCollection()

export default {
  init() {
    Random.seed = 0
    Random.id = function (charsCount = 17) {
      Random.seed++
      return Random.seed.toString()
        .padStart(charsCount, '0')
    }
  },
  getState() {
    const state = { __seed: Random.seed, __image: {} }
    for (const name in collections) {
      state[name] = collections[name].find({}, { sort: { _id: 1 }, transform: collections[name].toStateObject })
        .fetch()
      state.__image[name] = state[name].map(collections[name].toStateImage)
    }
    return state
  },
  setState: function (state = { __seed: 0 }) {
    Random.seed = state.__seed
    for (const name in state) {
      if (state.hasOwnProperty(name) && !name.startsWith('__')) {
        collections[name].remove({})
        // FIXME: optimize using native `collection.insertMany` method
        for (const object of state[name]) {
          collections[name].insert(object)
        }
      }
    }
  },
  handleEvent: function (event, state) {
    const _Meteor_user = Meteor.user
    // if (event.context.email) {
    //   const r = Meteor.apply('login', [{email: event.context.email, isAutologin: true}]);
    //   isLoggedIn = true;
    //   console.log(r);
    // } else {
    //   if (isLoggedIn) Meteor.apply('logout');
    //   isLoggedIn = false;
    // }
    if (event.context.email) {
      const user = Users.findOne({ 'emails.address': event.context.email })
      Meteor.user = function () {
        return user
      }
      event.context.userId = user && user._id
    }
    if (!Meteor.server.method_handlers[event.name]) {
      throw new Error(`Handler for ${event.name} not found`)
    }
    const result = Meteor.server.method_handlers[event.name].apply(event.context, event.args)
    Meteor.user = _Meteor_user
    return result
  },
}
