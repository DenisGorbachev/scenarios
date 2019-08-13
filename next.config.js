const _ = require('lodash')
const withCSS = require('@zeit/next-css')

module.exports = withCSS({
  webpack (config, options) {
    // remove deprecated option
    for (let i = 0; i < config.module.rules.length; i++) {
      const rule = config.module.rules[i];
      const usage = _.find(rule.use, { loader: 'css-loader' })
      if (usage) {
        delete usage.options.minimize;
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
    };

    return config
  }
})
