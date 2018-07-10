import React from 'react'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  toggleVisibility = () => {
    this.setState({ visible: !this.state.visible })
  }

  render() {
    //const hideWhenVisible = { display: this.state.visible ? 'none' : '' }
    const showWhenVisible = {
      display: this.state.visible ? '' : 'none',
      paddingLeft: 12
     }

    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }

    return (
      <div style={blogStyle}>
        <div onClick={this.toggleVisibility} className="titleAndAuthor">
          <div className="title" style={{display: 'inline'}}>{this.props.title},</div>
          <div className="author" style={{display: 'inline'}}>{this.props.author}</div>
        </div>
        <div style={showWhenVisible} className="content">
            <a href="{this.props.url}">{this.props.url}</a><br />
            {this.props.likes} likes <button onClick={this.props.toggleLike}>like</button><br />
            added by {this.props.name}<br />
            {this.props.name === this.props.loggedUser || this.props.name === 'anonymous' ?
              <button onClick={this.props.moveBlog}>delete</button> : ''
            }
        </div>
      </div>
    )
  }
}

export default Blog
