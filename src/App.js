import './App.css'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Home from './components/Home'
import Header from './components/Header'
import NotFound from './components/NotFound'
import Repository from './components/Repository'
import Analysis from './components/Analysis'
import RepositoryItemDetails from './components/RepositoryItemDetails'

function App() {
  return (
    <Router>
      <Header />
      <div className="pages">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/Repositories" component={Repository} />
          <Route exact path="/Analysis" component={Analysis} />
          <Route
            path="/repositories/:repositoryId"
            component={RepositoryItemDetails}
          />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
