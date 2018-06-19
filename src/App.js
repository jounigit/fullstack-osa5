import React from 'react'
import Blog from './components/Blog'
import MessageNotification from './components/MessageNotification'
import ErrorNotification from './components/ErrorNotification'
import blogService from './services/blogs'
import loginService from './services/login'

const LoginForm = ({ handleSubmit, handleChange, username, password }) => {
  return (
    <div>
      <h2>Kirjaudu sovellukseen</h2>

      <form onSubmit={handleSubmit}>
        <div>
          käyttäjätunnus
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleChange}          
          />
        </div>
        <div>
          salasana
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">kirjaudu</button>
      </form>
    </div>
  )
}

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
      <div>
        <h2>create new</h2>

        <form onSubmit={this.addBlog}>
          <div>
            Title
            <input
              type="text"
              name="blogTitle"
              value={this.state.blogTitle}
              onChange={this.handleBlogFieldChange}
            />
          </div>
          <div>
            Author
            <input
              type="text"
              name="blogAuthor"
              value={this.state.blogAuthor}
              onChange={this.handleBlogFieldChange}
            />
          </div>
          <div>
            Url
            <input
              type="text"
              name="blogUrl"
              value={this.state.blogUrl}
              onChange={this.handleBlogFieldChange}
            />
          </div>
          <button type="submit">tallenna</button>
        </form>
      </div>
    )

    if (this.state.user === null) {
      console.log('ERROR::::  ', this.state.error)
      return (
        <div>
        <ErrorNotification error={this.state.error} />
        <h2>Kirjaudu sovellukseen</h2>
        <form onSubmit={this.login}>
          <div>
            käyttäjätunnus
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <div>
            salasana
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <button type="submit">kirjaudu</button>
        </form>
      </div>
    )
  }

    return (
      <div>

      <MessageNotification message={this.state.message} />
      <ErrorNotification error={this.state.error} />

        <h2>blogs</h2>

        <p>
          {this.state.user.name} logged in
          <button onClick={this.logout}>logout</button>
        </p>

        {blogForm()}

        {this.state.blogs.map(blog =>
          <Blog key={blog.id} blog={blog}/>
        )}
      </div>
    );
  }
}

export default App;
