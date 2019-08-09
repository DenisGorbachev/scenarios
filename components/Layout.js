import 'semantic-ui-css/semantic.min.css'
import './Layout.css'
import {Container} from "semantic-ui-react"
import NavBar from './NavBar'

export default function Layout(props) {
  return (
    <div>
      <NavBar/>
      <Container className="main" text>
        {props.children}
      </Container>
    </div>
  )
}
