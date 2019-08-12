import Layout from '../components/Layout.js'
import Link from 'next/link'
import {Header} from "semantic-ui-react"
import projects from "../data/projects"

export default function Index() {
  return (
    <Layout>
      <Header as='h1'>Projects</Header>
      <ul>
        {projects.map(project => (
          <li key={project.uid}>
            <Link href="/[project]" as={`/${project.uid}`}>
              <a>{project.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  )
}
