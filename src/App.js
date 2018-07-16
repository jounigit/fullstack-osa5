import React from 'react';


class App extends React.Component {
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
        <form>
          <div><input /></div>
          <button>create</button>
        </form>
      </div>
    )
  }
}

export default App
