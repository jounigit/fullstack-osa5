import React from 'react';

const generateId = () => Number((Math.random() * 1000000).toFixed(0))

class App extends React.Component {
  addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    this.props.store.dispatch({
      type: 'NEW_ANECDOTE',
      data: {
        content: content,
        id: generateId(),
        votes: 0
      }
    })
    event.target.anecdote.value = ''
  }
  toggleVote = (id) => () => {
    this.props.store.dispatch({
      type: 'TOGGLE_VOTE',
      data: { id }
    })
  }
  render() {
    const anecdotes = this.props.store.getState()
    anecdotes.sort((a,b) => b.votes - a.votes )
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.map(anecdote=>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={this.toggleVote(anecdote.id)}>vote</button>
            </div>
          </div>
        )}
        <h2>create new</h2>
        <form onSubmit={this.addAnecdote}>
          <div><input name="anecdote" /></div>
          <button type="submit">create</button>
        </form>
      </div>
    )
  }
}

export default App
