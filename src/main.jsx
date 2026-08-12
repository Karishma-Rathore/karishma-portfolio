import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './store'
import App from './App'
import './styles.css'

class ErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { error: null } }
  static getDerivedStateFromError(error) { return { error } }
  render() {
    if (this.state.error) return <main style={{padding: 40, color: '#173c38', background: '#fbf8f1', minHeight: '100vh'}}>
      <h1 style={{fontSize: 36}}>Portfolio could not load.</h1>
      <p>{this.state.error.message}</p>
      <button onClick={() => location.reload()}>Reload page</button>
    </main>
    return this.props.children
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <ErrorBoundary><Provider store={store}><App /></Provider></ErrorBoundary>
)
