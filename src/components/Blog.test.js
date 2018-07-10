import React from 'react'
import { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Blog from './Blog'

describe.only('<Blog />', () => {
  let blogComponent

  beforeEach(() => {
    blogComponent = shallow(
      <Blog
        title='Testblog'
        author='Testeri'
        url='test.com'
        likes='0'
        name='anonymous'
      />
    )
  })

  it('displays title', () => {
    const titleDiv = blogComponent.find('.title')
    console.log(blogComponent.debug())
    expect(titleDiv.text()).toContain('Testblog')
  })
  it('displays author', () => {
    const titleDiv = blogComponent.find('.author')
    expect(titleDiv.text()).toContain('Testeri')
  })
  it('at start rest of the information is not displayed', () => {
    const contentDiv = blogComponent.find('.content')
    expect(contentDiv.getElement().props.style).toEqual({ display: 'none', paddingLeft: 12 })
  })
  it('after clicking the titleAndAuthor div, all the information is displayed', () => {
    const titleAndAuthorDiv = blogComponent.find('.titleAndAuthor')

    titleAndAuthorDiv.at(0).simulate('click')
    const contentDiv = blogComponent.find('.content')
    expect(contentDiv.getElement().props.style).toEqual({ display: '', paddingLeft: 12 })

  })
})
