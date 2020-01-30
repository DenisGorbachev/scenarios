#!/usr/bin/env node

const YAML = require('yaml');

/*
 * How to use this file:
 * - Add projects
 * - Add people
 *   - Add jobs
 *     - Get a job template by running `node THIS_FILE`
 *     - Paste the template into person jobs array
 *     - Remove irrelevant tags
 *     - Add missing tags (mostly domain-specific, e.g. 'insurance', or tech-specific, e.g. 'rust')
 */

const projects = [
  {
    name: 'Pintask',
    // supports multiple urls (web, ios, android, github)
    urls: ['https://pintask.me/'],
  },
  {
    name: 'Moonbase',
    urls: ['https://moonbase.exchange/'],
  },
  {
    name: 'CoinMarketBook',
    urls: ['https://coinmarketbook.cc/'],
  },
  {
    name: 'FlowBAT',
    urls: ['http://www.flowbat.com/', 'https://github.com/chrissanders/FlowBAT'],
  },
  {
    name: 'ParkQX',
    urls: ['https://keenethics.com/parkqx-c2c-e-commerce'],
  },
  {
    name: 'Education System Platform',
    urls: ['https://keenethics.com/project-education-system-platform'],
  },
  {
    name: 'OneRemission',
    urls: ['https://keenethics.com/project-one-remission'],
  },
  {
    name: 'Pree',
    urls: ['https://keenethics.com/project-pree'],
  },
];

const people = [
  {
    name: 'Denis Gorbachev',
    urls: [
      'https://github.com/DenisGorbachev',
      'https://linkedin.com/in/dengorbachev/',
      'https://twitter.com/DenGorbachev',
    ],
    jobs: [
      {
        // matches one of project urls
        projectUrl: 'https://pintask.me/',
        tags: [
          // domains (important: allows to select people who have specific domain knowledge) (may include multiple)
          'task-tracking',
          // company types (may include multiple)
          'startup',
          // task types (may include multiple)
          'idea',
          'ui',
          'code',
          'management',
          // platforms
          'web',
          // languages
          'coffeescript',
          'javascript',
          'stylus',
          'less',
          // frameworks
          'node',
          'meteor',
          // databases
          'mongodb',
          // testing
          'unit-tests',
          // deployment
          'mup',
          'docker',
          // apis
          'trello-api',
          'google-calendar-api',
          'mixpanel-api',
          'google-analytics-api',
        ],
      },
      {
        projectUrl: 'https://moonbase.exchange/',
        tags: [
          //
          'crypto',
          'exchange',
          //
          'startup',
          //
          'idea',
          'ui',
          'code',
          'devops',
          'management',
          //
          'web',
          'rest',
          'websocket',
          //
          'unit-tests',
          'integration-tests',
          //
          'elixir',
          'javascript',
          'html',
          'css',
          //
          'phoenix',
          'react',
          'jest',
          'storybook',
          //
          'postgresql',
          'redis',
          //
          'distillery',
          //
          'bitmex-api',
          'binance-api',
          //
          'bitcoin-rpc',
          'ethereum-rpc',
          //
          'tradingview-charting-library',
        ],
      },
      {
        projectUrl: 'https://coinmarketbook.cc/',
        tags: [
          // domains (important: allows to select people who have specific domain knowledge) (may include multiple)
          'crypto',
          'directory',
          // environment
          'startup', /* new company, e.g. Moonbase */
          // tasks
          'idea',
          'ui',
          'devops',
          'management',
          // platforms
          'web',
          // testing
          'unit-tests',
          // languages
          'javascript',
          'html',
          'css',
          // frameworks
          'node',
          'react',
          'jest',
          'storybook',
          // databases
          'postgresql',
          // deployment
          'pm2',
          // apis
          'google-analytics-api',
          'bitmex-api',
          'bitfinex-api',
          'binance-api',
          'huobi-api',
          'okex-api',
          // extras
          'ccxt-library',
          'tradingview-charting-library',
        ],
      },
      {
        projectUrl: 'http://www.flowbat.com/',
        tags: [
          'security',
          'silk-suite',
          'freelance',
          'ui',
          'code',
          'devops',
          'management',
          'web',
          'unit-tests',
          'mongodb',
          'node',
          'meteor',
          'coffeescript',
          'javascript',
          'stylus',
          'jade',
          'mup',
          'ssh',
        ],
      },
    ],
    languages: ['English', 'Russian', 'Ukrainian'],
    location: 'Russia',
  },
  {
    name: 'Sergey Gornostaev',
    urls: [
      'https://github.com/keenethics'
    ],
    jobs: [
      {
        // matches one of project urls
        projectUrl: 'https://keenethics.com/project-workbooking',
        tags: [
          // domains (important: allows to select people who have specific domain knowledge) (may include multiple)
          'Consumer app', 'job platform',
          // company types (may include multiple)
          'startup',
          // task types (may include multiple)
          'idea',
          'ui',
          'code',
          'management',
          // platforms
          'web',
          // languages
          'javascript',
          // frameworks
          'React',
          'meteor',
          // databases
          'mongodb',
          // testing
          'unit-tests',
          // deployment
          'mup',
          'docker',
          // apis
          'trello-api',
          'google-calendar-api',
          'mixpanel-api',
          'google-analytics-api',
        ],
      },
      {
        projectUrl: 'https://keenethics.com/project-knote',
        tags: [
          //
          'Business',
          //
          'startup',
          //
          'idea',
          'ui',
          'code',
          'devops',
          'management',
          //
          'web',
          'rest',
          'websocket',
          //
          'unit-tests',
          'integration-tests',
          //
          'javascript',
          //
          'react',
          'Meteor',
          'Blaze',
        ],
      },
    ],
    languages: ['English', 'Russian', 'Ukrainian'],
    location: 'Ukraine',
  },
];

// print them all, remove irrelevant (ensures that you won't miss important tags)
const jobTemplate = `
- projectUrl: 
  tags:
    # domains (important: allows to select people who have specific domain knowledge) (may include multiple)
    crypto
    insurance
    task-tracking
    # environment
    startup # new company, e.g. Moonbase
    corporation # established company, e.g. Skyscanner
    unicorn # well-known company, e.g. Google
    freelance # your own company
    # tasks
    idea
    ui
    code
    devops
    management
    # platforms
    web
    ios
    android
    windows
    mac
    linux
    rest # if application exposes an API for developers
    websocket
    cli
    # testing
    unit-tests
    integration-tests
    # languages
    javascript
    html
    css
    # frameworks
    node
    meteor
    react
    jest
    storybook
    # databases
    mongodb
    postgresql
    mysql
    mssql
    cassandra
    redis
    # queue systems
    kafka
    # deployment
    mup
    docker
    # apis
    trello-api
    google-calendar-api
    mixpanel-api
    google-analytics-api
    # rpcs
    bitcoin-rpc
    ethereum-rpc
    # libraries
    ccxt-library
    tradingview-charting-library
    # NOTE: don't forget to add other tags relevant to this project!
`.trim();

// using old school modules for backward compatibility
module.exports = { projects, people };

console.info(YAML.stringify({
  projects,
  people,
}));

// console.info(jobTemplate);
