import MarkdownIt from'markdown-it'
import {JSDOM} from "jsdom"
import Story from "../lib/Story"

export const markdown = new MarkdownIt({
  typographer: false,
})

export function storyFromMarkdown(text) {
  const document = new JSDOM(markdown.render(text.trim()))
  console.log('result', document.children);
}

export function story(title, events) {
  return new Story({
    actor: title[0],
    plot: title[1],
    events: events
  })
}
