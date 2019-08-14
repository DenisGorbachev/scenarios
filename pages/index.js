import Layout from '../components/Layout.js'
import Link from 'next/link'
import {Header} from "semantic-ui-react"
import projects from "../data/books"

export default function Index() {
  return (
    <Layout>
      <Header as='h1'>Projects</Header>
      <ul>
        {projects.map(project => (
          <li key={project.uid}>
            <Link href="/[book]" as={`/${project.uid}`} prefetch>
              <a>{project.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  )
}
