import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import localStorageMock from './setupTests'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
jest.mock('./services/blogs')
import blogService from './services/blogs'

describe('<App />', () => {
  let app

  describe('when user is logged', () => {
    beforeEach(() => {
      app = mount(<App />)
    })

      let savedItems = {}

      const localStorage = {
        setItem: (key, item) => {
          savedItems[key] = item
        },
        getItem: (key) => savedItems[key],
        clear: savedItems = {}
      }

      const user = {
        username: 'tester',
        token: '1231231214',
        name: 'Teuvo Testaaja'
      }
      localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      const localStorageObj = localStorage.getItem('loggedBlogAppUser')
      window.localStorage = localStorage

    it('all blogs are rendered', () => {
      app.update()
      const blogComponents = app.find(Blog)
      console.log('OBJ:: ', JSON.parse(localStorageObj))
    expect(blogComponents.length).toEqual(blogService.blogs.length)
    })
  })
})
