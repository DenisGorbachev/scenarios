import { useRouter } from 'next/router'
import Layout from '../../../components/Layout.js'
import Section from '../../../components/Section'
import _ from 'lodash'
import books from '../../../data/books'

const Post = (query) => {
  const router = useRouter()
  const book = _.find(books, { uid: query.book })
  const section = _.find(book.sections, { uid: query.section })
  const page = _.find(section.pages, { uid: query.page })

  return (
    <Layout>
      <h1>{page.title}</h1>
      <div dangerouslySetInnerHTML={{__html: page.content}} />
    </Layout>
  )
}

Post.getInitialProps = async ({ query }) => {
  return query
}

export default Post
