import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import localStorage from './setupTests'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
jest.mock('./services/blogs')
import blogService from './services/blogs'

describe('<App />', () => {
  let app

  describe('when user is not logged', () => {
    beforeEach(() => {
      app = mount(<App />)
    })

    it('no blogs is rendered', () => {
      app.update()
      const blogComponents = app.find(Blog)
      expect(blogComponents.length).toBe(0)
    })
    it('only login form is rendered', () => {
      app.update()
      const loginFormComponents = app.find(LoginForm)
      expect(loginFormComponents.length).toBe(1)
    })
  })

  describe('when user is logged', () => {
    beforeEach(() => {
      app = mount(<App />)
      const user = {
        username: 'tester',
        token: '1231231214',
        name: 'Teuvo Testaaja'
      }
      localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
    })

    /*let savedItems = {}

    const localStorageMock = {
      setItem: (key, item) => {
        savedItem[key] = item
      },
      getItem: (key) => savedItems[key],
      clear: savedItems = {}
    }*/
    /*
    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Teuvo Testaaja'
    }
    */
    //const localStorage = localStorageMock.setItem('loggedBlogAppUser', JSON.stringify(user))

  //  window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

    it('all blogs are rendered', () => {
      app.update()
      const blogComponents = app.find(Blog)
    expect(blogComponents.length).toEqual(blogService.blogs.length)
    })
  })
})
