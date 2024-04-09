import {Switch, Route, Redirect} from 'react-router-dom'

import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import LoginForm from './components/LoginForm'
import SpecificPlaylistDetailsRoute from './components/SpecificPlaylistDetailsRoute'
import SpecificCategoryPlaylistsDetails from './components/SpecificCategoryPlaylistsDetails'
// import SpecificAlbumDetailsRoute from './components/SpecificAlbumDetailsRoute'
import SpecificNewReleasesRoute from './components/SpecificNewReleasesRoute'
import NotFound from './components/NotFound'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginForm} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute
      exact
      path="/playlist/:id"
      component={SpecificPlaylistDetailsRoute}
    />
    <ProtectedRoute
      exact
      path="/category/:id/playlists"
      component={SpecificCategoryPlaylistsDetails}
    />
    <ProtectedRoute
      exact
      path="/album/:id"
      component={SpecificNewReleasesRoute}
    />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
