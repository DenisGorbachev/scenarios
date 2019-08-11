import Entity from "../../lib/Entity"
import Project from "../../lib/Project"

const story = new Entity({
  name: 'Story'

})

const storytailor = new Project({
  uid: 'storytailor',
  name: 'Storytailor',
  definitions: [story]
})

export default storytailor
