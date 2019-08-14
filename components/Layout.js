import 'semantic-ui-css/semantic.min.css'
import './Layout.css'
import Head from 'next/head'
import {Container} from "semantic-ui-react"
import NavBar from './NavBar'

export default function Layout(props) {
  return (
    <div>
      <Head>
        <title>Storytailor</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/static/favicon.ico' />
      </Head>
      <NavBar/>
      <Container className="main" text>
        {props.children}
      </Container>
    </div>
  )
}
