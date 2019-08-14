import _ from 'lodash'
import {useRouter} from 'next/router';
import Layout from '../components/Layout.js';
import Section from '../components/Section.js';
import books from "../data/books"

const Book = ({uid}) => {
  const router = useRouter();
  const book = _.find(books, {uid})

  return (
    <Layout>
      <h1>{book.title}</h1>
      <div dangerouslySetInnerHTML={{__html: book.content}} />
      {book.sections.map(section => <Section key={section.uid} book={book} section={section} />)}
    </Layout>
  );
}

Book.getInitialProps = async ({query}) => {
  return {uid: query.book}
}

export default Book
