import './app.less'
import { Link } from 'react-router-dom'

const App = () => {
  return (
    <div>
      <ul>
        <li><Link to={'/indexBarDemo'}>indexBarDemo</Link></li>
        <li><Link to={'/pullRefreshDemo'}>pullRefreshDemo</Link></li>
      </ul>
    </div>
  )
}

export default App

