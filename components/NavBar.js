import React from "react"
import {Dropdown, Header, Image, Menu, Icon} from 'semantic-ui-react'
import { useRouter } from 'next/router'

export default function({user}) {
    const router = useRouter()
    const isDev = process.env.NODE_ENV === 'development';
    const isAdmin = user && ~user.roles.indexOf('admin')
    if (typeof window !== 'undefined') {
      router.prefetch('/')
    }

    return (
      <Menu style={{marginBottom: '10px'}} attached="top" borderless inverted>
        <Menu.Item onClick={() => router.push('/')}>
            <Header inverted>
              <Icon name="list alternate outline"/>
              <Header.Content>Storytailor</Header.Content>
            </Header>
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item position="right" as="a" href="https://github.com/DenisGorbachev/storytailor/issues/new" target="_blank">
            <Icon name="help"/>
            <span>Help</span>
          </Menu.Item>
          {/*<Dropdown*/}
          {/*  floated="right"*/}
          {/*  item*/}
          {/*  trigger={(*/}
          {/*    <>*/}
          {/*      <Icon name="user"/>*/}
          {/*      {user && user.username}*/}
          {/*    </>*/}
          {/*  )}*/}
          {/*>*/}
          {/*  <Dropdown.Menu>*/}
          {/*    {isDev && ['Alice', 'Bob', 'Sam', 'Sally', 'Admin'].map(user => (*/}
          {/*      <Dropdown.Item*/}
          {/*        icon="user"*/}
          {/*        key={user}*/}
          {/*        text={user}*/}
          {/*        onClick={(event, {text}) => Meteor.loginAsUser(`${text.toLowerCase()}@example.com`)}*/}
          {/*      />*/}
          {/*    ))}*/}
          {/*    {isDev && <Dropdown.Divider/>}*/}
          {/*    <Dropdown.Item icon="sign out" text="Sign Out" />*/}
          {/*  </Dropdown.Menu>*/}
          {/*</Dropdown>*/}
        </Menu.Menu>
      </Menu>
    );
}
