import React from 'react'
import Blog from './components/Blog'
import MessageNotification from './components/MessageNotification'
import ErrorNotification from './components/ErrorNotification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      blogTitle: '',
      blogAuthor: '',
      blogUrl: '',
      username: '',
      password: '',
      message: null,
      error: null,
      user: null
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )

    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({user})
    }
  }

  login = async (event) => {
    event.preventDefault()
    console.log('login in with', this.state.username, this.state.password)
    try {
        const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)

        this.setState({ username: '', password: '', user })
    } catch(exception) {
        this.setState({
          error: 'wrong username or password',
        })
        setTimeout(() => {
          this.setState({ error: null })
        }, 5000)
      }
  }

  logout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    this.setState({ user: null})
  }

  addBlog = (event) => {
    event.preventDefault()
    this.blogForm.toggleVisibility()

      const blogObj = {
        title: this.state.blogTitle,
        author: this.state.blogAuthor,
        url: this.state.blogUrl
      }
      blogService
        .create(blogObj)
        .then(newBlog => {
          this.setState({
              blogs: this.state.blogs.concat(newBlog),
              message: `a new blog '${newBlog.title}' by ${newBlog.author} added`,
              blogTitle: '',
              blogAuthor: '',
              blogUrl: ''
            })
            setTimeout(() => {
              this.setState({ message: null })
            }, 5000)
        })
        .catch(error => {
          this.setState({
            error: 'something went wrong',
            blogTitle: '',
            blogAuthor: '',
            blogUrl: ''
          })
          setTimeout(() => {
            this.setState({ error: null })
          }, 5000)
        })
  }

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleBlogFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    const blogForm = () => (
      <Togglable buttonLabel="new blog" ref={component => this.blogForm = component}>
        <BlogForm
          visible={this.state.visible}
          handleSubmit={this.addBlog}
          handleChange={this.handleBlogFieldChange}
          blogTitle={this.state.blogTitle}
          blogAuthor={this.state.blogAuthor}
          blogUrl={this.state.blogUrl}
        />
      </Togglable>
    )

    const loginForm = () => (
      <Togglable buttonLabel="login">
        <LoginForm
          visible={this.state.visible}
          username={this.state.username}
          password={this.state.password}
          handleChange={this.handleLoginFieldChange}
          handleSubmit={this.login}
        />
      </Togglable>
    )

    return (
      <div>

      <MessageNotification message={this.state.message} />
      <ErrorNotification error={this.state.error} />

        <h2>blogs</h2>

        {this.state.user === null ?
          loginForm() :
          <div>
            <p>
              {this.state.user.name} logged in
              <button onClick={this.logout}>logout</button>
            </p>
            {blogForm()}
          </div>
        }

        {this.state.blogs.map(blog =>
          <Blog key={blog.id}
            title={blog.title}
            author={blog.author}
            url={blog.url}
            likes={blog.likes}
            name={blog.user['name']} />
        )}
      </div>
    );
  }
}

export default App;
