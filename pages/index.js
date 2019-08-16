import Layout from '../components/Layout.js'
import Link from 'next/link'
import { Header } from 'semantic-ui-react'
import projects from '../data/books'
// import { prisma } from '../gen/prisma'
//
// // A `main` function so that we can use async/await
// async function main() {
//   // Create a new user called `Alice`
//   const newUser = await prisma.createUser({ name: 'Alice' })
//   console.log(`Created new user: ${newUser.name} (ID: ${newUser.id})`)
//
//   // Read all users from the database and print them to the console
//   const allUsers = await prisma.users()
//   console.log(allUsers)
// }
//
// main().catch(e => console.error(e))

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
