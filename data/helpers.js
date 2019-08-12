import cheerio from 'cheerio'
import MarkdownIt from'markdown-it'
import Story from "../lib/Story"

export const markdown = new MarkdownIt({
  typographer: false,
})

export function storyFromMarkdown(text) {
  const $document = cheerio.load(markdown.render(text.trim()))
  return new Story(

  )
}

export function story(title, events) {
  return new Story({
    actor: title[0],
    plot: title[1],
    events: events
  })
}
