import _ from 'lodash'
import url from 'url'
import { useRouter } from 'next/router'
import { DiscussionEmbed } from 'disqus-react'
import Layout from '../components/Layout.js'
import Section from '../components/Section.js'
import books from '../data/books'
import { disqusConfig, getBaseUrl } from '../data/helpers'

const Book = ({ uid, baseUrl }) => {
  const router = useRouter()
  const book = _.find(books, { uid })
  // const c = disqusConfig({
  //   identifier: `/${book.uid}`,
  //   title: book.title,
  //   baseUrl,
  // })
  // console.log('arguments', c);

  return (
    <Layout>
      <h1>{book.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: book.content }}/>
      {book.sections.map(section => <Section key={section.uid} book={book} section={section}/>)}
      <DiscussionEmbed {...disqusConfig({
        identifier: `/${book.uid}`,
        title: book.title,
        baseUrl,
      })}/>
    </Layout>
  )
}

Book.getInitialProps = async ({ query, req }) => {
  return { uid: query.book, baseUrl: getBaseUrl(req) }
}

export default Book
