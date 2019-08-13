import _ from 'lodash'
import cheerio from 'cheerio'
import MarkdownIt from 'markdown-it'
import Book from '../lib/Book'
import Section from '../lib/Section'
import Page from '../lib/Page'
import Story from '../lib/Story'
import util from 'util'

export const markdown = new MarkdownIt({
  typographer: false,
})

const cheerioOptions = {
  withDomLvl1: true,
  normalizeWhitespace: false,
  xmlMode: true,
  decodeEntities: true,
}

export function storyFromMarkdown(text, opts = {}) {
  const options = Object.assign({
    uid: '',
    title: '',
    content: ''
    // description: '',
    // events: [],
    // notes: [],
  }, opts)
  const $ = cheerio.load(markdown.render(text.trim(), { linkify: true }).trim(), cheerioOptions)
  const nodes = $.root().children()
  for (let i = 0; i < nodes.length; i++) {
    const child = nodes[i]
    if (child.tagName === 'h3' && !options.title) {
      options.title = $(child).text()
    }
    // if (child.tagName === 'p' && !options.description) {
    //
    // }
    // if (child.tagName === 'ul' && !options.events.length) {
    //   const children = $(child).children()
    //   for (let j = 0; j < children.length; j++) {
    //     options.events.push()
    //   }
    // }
  }
  options.uid = toUid(options.title)
  options.content = $.xml()
  return new Story(options)
}

export function bookFromMarkdown(text, opts = {}) {
  const options = Object.assign({
    uid: '',
    title: '',
    content: '',
    sections: []
  }, opts)
  const $ = cheerio.load(markdown.render(text.trim(), { linkify: true }).trim(), cheerioOptions)
  const nodes = $.root().children()
  for (let i = 0; i < nodes.length; i++) {
    const child = nodes[i]
    switch (child.tagName) {
      case 'h1':
        options.title = $(child).text()
        break;
      case 'h2':
        options.sections.push(new Section(withUid({
          title: $(child).text(),
          content: ''
        })))
        break;
      default:
        if (options.sections.length) {
          options.sections[options.sections.length - 1].content += cheerio.html($(child)) + '\n'
        } else {
          options.content += cheerio.html($(child)) + '\n'
        }
    }
    // if (child.tagName === 'p' && !options.description) {
    //
    // }
    // if (child.tagName === 'ul' && !options.events.length) {
    //   const children = $(child).children()
    //   for (let j = 0; j < children.length; j++) {
    //     options.events.push()
    //   }
    // }
  }
  options.uid = toUid(options.title)
  options.sections = options.sections.map(sectionFromHtmlObject)
  options.content = options.content.trim()
  return new Book(options)
}

export function sectionFromHtmlObject() {

}

// export function bookFromMarkdownFile(filename, opts = {}) {
//   return bookFromMarkdown(fs.readFileSync(filename), opts)
// }

export function normalizeHTML(html) {
  return cheerio.load(html, cheerioOptions).xml().replace(/^\s+/gm, '')
}

export function toUid(string) {
  return _.kebabCase(string)
}

export function withUid(object) {
  return Object.assign(object, { uid: toUid(object.title) })
}

export function story(title, events) {
  return new Story({
    actor: title[0],
    plot: title[1],
    events: events
  })
}
