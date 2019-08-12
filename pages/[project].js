import _ from 'lodash'
import {useRouter} from 'next/router';
import Link from "next/link"
import Layout from '../components/Layout.js';
import projects from "../data/projects"
import Post from "./p/[id]"

const Project = ({uid}) => {
  const router = useRouter();
  const project = _.find(projects, {uid})

  return (
    <Layout>
      <h1>{project.title}</h1>
      <ul>
        {project.stories.map(story => (
          <li key={story.uid}>
            <Link href="/[project]/[story]" as={`/${project.uid}/${story.uid}`}>
              <a>{story.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

Project.getInitialProps = async ({query}) => {
  return {uid: query.project}
}

export default Project
