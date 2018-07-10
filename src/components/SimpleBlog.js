import React from 'react'

const SimpleBlog = ({ blog, onClick }) => (
  <div>
    <div>
      <div className="title" style={{display: 'inline'}}>{blog.title},</div>
      <div className="author" style={{display: 'inline'}}>{blog.author}</div>
    </div>
    <div className="likes">
      blog has {blog.likes} likes
      <button onClick={onClick}>like</button>
    </div>
  </div>
)

export default SimpleBlog
