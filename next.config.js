const _ = require('lodash')
const fs = require('fs')
const withCSS = require('@zeit/next-css')

requireIfExists = function (filename, defaultValue = {}) {
  return fs.existsSync(filename) ? require(filename) : defaultValue
}

const env = _.merge(
  requireIfExists(`${__dirname}/storytailor.config.js`),
  requireIfExists(`${__dirname}/storytailor.secret.config.js`),
  requireIfExists(`${__dirname}/storytailor.local.config.js`)
)

const prod = process.env.NODE_ENV === 'production'

module.exports = withCSS({
  env,
  webpack(config, options) {
    // remove deprecated option
    for (let i = 0; i < config.module.rules.length; i++) {
      const rule = config.module.rules[i]
      const usage = _.find(rule.use, { loader: 'css-loader' })
      if (usage) {
        delete usage.options.minimize
      }
    }

    // add loader for fonts
    config.module.rules.push({
      test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 100000
        }
      }
    })

    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader'
    })

    // stub modules for Joi
    config.node = {
      ...(config.node || {}),
      net: 'empty',
      tls: 'empty',
      dns: 'empty'
    }

    return config
  }
})
