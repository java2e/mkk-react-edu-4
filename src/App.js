import { Route, Switch } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import HomePage from './pages/HomePage';

function App() {
  return (

    <Layout>

      <Switch>
        <Route path='/' exact>
            <HomePage />
        </Route>
        <Route>
          <UserProfile />
        </Route>
      </Switch>


    </Layout>
    
  );
}

export default App;
