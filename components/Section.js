import Link from 'next/link'

const Section = ({ book, section }) => {
  return (
    <div>
      <h2 id={section.uid}>{section.title}</h2>
      <div dangerouslySetInnerHTML={{__html: section.content}} />
      <ul>
        {section.pages.map(page => (
          <li key={page.uid}>
            <Link href="/[book]/[section]/[page]" as={`/${book.uid}/${section.uid}/${page.uid}`} prefetch>
              <a>{page.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Section
