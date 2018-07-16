import React from 'react'
import ReactDOM from 'react-dom'
import {createStore} from 'redux'
import counterReducer from './reducer'

const store = createStore(counterReducer)
console.log(store.getState())


const Statistiikka = ({onClick}) => {
  const palautteita = store.getState()
  const keskiarvo = palautteita.good - palautteita.bad / 2
  const countPos = (palautteita.good * 100) / (palautteita.good + palautteita.ok + palautteita.bad)
  const positiivisia = palautteita.good === 0 ? 0 : countPos.toFixed(1)

  if (palautteita === 0) {
    return (
      <div>
        <h2>statistiikka</h2>
        <div>ei yhtään palautetta annettu</div>
      </div>
    )
  }

  return (
    <div>
      <h2>statistiikka</h2>
      <table>
        <tbody>
          <tr>
            <td>hyvä</td>
            <td>{palautteita.good}</td>
          </tr>
          <tr>
            <td>neutraali</td>
            <td>{palautteita.ok}</td>
          </tr>
          <tr>
            <td>huono</td>
            <td>{palautteita.bad}</td>
          </tr>
          <tr>
            <td>keskiarvo</td>
            <td>{keskiarvo}</td>
          </tr>
          <tr>
            <td>positiivisia</td>
            <td>{positiivisia} %</td>
          </tr>
        </tbody>
      </table>

      <button onClick={onClick}>nollaa tilasto</button>
    </div >
  )
}

class App extends React.Component {
  klik = (nappi) => () => {
    switch (nappi) {
      case 'GOOD':
        store.dispatch({ type: 'GOOD' })
        break
      case 'OK':
        store.dispatch({ type: 'OK' })
        break
      case 'BAD':
        store.dispatch({ type: 'BAD' })
        break
      case 'ZERO':
        store.dispatch({ type: 'ZERO' })
        break
      default:
        store.dispatch({ type: 'DO_NOTHING' })
    }
  }

  render() {
    return (
      <div>
        <h2>anna palautetta</h2>
        <button onClick={this.klik('GOOD')}>hyvä</button>
        <button onClick={this.klik('OK')}>neutraali</button>
        <button onClick={this.klik('BAD')}>huono</button>
        <Statistiikka onClick={this.klik('ZERO')} />
        {console.log(store.getState())}
      </div>
    )
  }
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
