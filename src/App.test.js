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
})
