import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe.only('<SimpleBlog />', () => {
  it('renders title', () => {
    const blog = {
      title: 'Komponenttitestaus tapahtuu jestillä ja enzymellä',
      author: 'Testeri',
      likes: 0
    }

    const blogComponent = shallow(<SimpleBlog blog={blog} />)
    console.log(blogComponent.debug())

    const titleDiv = blogComponent.find('.title')

    console.log(titleDiv.debug())

    expect(titleDiv.text()).toContain(blog.title)
  })

  it('renders author', () => {
    const blog = {
      title: 'Komponenttitestaus tapahtuu jestillä ja enzymellä',
      author: 'Testeri',
      likes: 0
    }

    const blogComponent = shallow(<SimpleBlog blog={blog} />)

    const authorDiv = blogComponent.find('.author')

    console.log(authorDiv.debug())

    expect(authorDiv.text()).toContain(blog.author)
  })

  it('renders likes', () => {
    const blog = {
      title: 'Komponenttitestaus tapahtuu jestillä ja enzymellä',
      author: 'Testeri',
      likes: 0
    }

    const blogComponent = shallow(<SimpleBlog blog={blog} />)

    const likesDiv = blogComponent.find('.likes')
    console.log(likesDiv.debug())

    expect(likesDiv.text()).toContain(blog.likes)
  })
})
