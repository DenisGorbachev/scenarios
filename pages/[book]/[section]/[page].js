import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Icon } from 'semantic-ui-react'
import { DiscussionEmbed, CommentCount, CommentEmbed } from 'disqus-react'
import Layout from '../../../components/Layout.js'
import Section from '../../../components/Section'
import _ from 'lodash'
import books from '../../../data/books'
import { isProd } from '../../../data/helpers'

const Page = (query) => {
  const router = useRouter()
  const book = _.find(books, { uid: query.book })
  const section = _.find(book.sections, { uid: query.section })
  const page = _.find(section.pages, { uid: query.page })
  const url = `/${book.uid}/${section.uid}/${page.uid}`

  const disqusShortname = 'storytailor'
  const disqusConfig = {
    url: url,
    // identifier is equal to url to allow pages with the same name within different projects (e.g. 'User signs up')
    identifier: url,
    title: page.title,
  }

  useEffect(() => {

  })

  return (
    <Layout>
      <h1>{page.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: page.content }}/>
      {page.points.length && <ul className='points'>
        {page.points.map((point, index) => <li key={index}>
          <span dangerouslySetInnerHTML={{ __html: point }}/>
          &nbsp;
          <Icon name='comment alternate outline'/>
        </li>)}
      </ul>}
      <p className='x-large darkgrey text'>
        Leave a comment by clicking on any point.
      </p>
      <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
    </Layout>
  )
}

Page.getInitialProps = async ({ query }) => {
  return query
}

export default Page
