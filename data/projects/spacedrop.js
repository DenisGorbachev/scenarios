import Project from '../../lib/Project'
import { storyFromMarkdown } from '../helpers'

const spacedrop = new Project({
  uid: 'spacedrop',
  title: 'Spacedrop',
  stories: [
    storyFromMarkdown()
  ]
})

export default spacedrop
