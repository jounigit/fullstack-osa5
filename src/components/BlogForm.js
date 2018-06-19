import React from 'react'

const BlogForm = ({handleSubmit, handleChange, blogTitle, blogAuthor, blogUrl}) => {
  return (
    <div>
      <h2>create new</h2>

      <form onSubmit={handleSubmit}>
        <div>
          Title
          <input
            type="text"
            name="blogTitle"
            value={blogTitle}
            onChange={handleChange}
          />
        </div>
        <div>
          Author
          <input
            type="text"
            name="blogAuthor"
            value={blogAuthor}
            onChange={handleChange}
          />
        </div>
        <div>
          Url
          <input
            type="text"
            name="blogUrl"
            value={blogUrl}
            onChange={handleChange}
          />
        </div>
        <button type="submit">tallenna</button>
      </form>
    </div>
  )
}

export default BlogForm
