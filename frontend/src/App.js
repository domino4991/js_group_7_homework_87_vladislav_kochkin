import React from 'react';
import './App.css';
import Layout from "./components/Layout/Layout";
import Main from "./containers/Main/Main";
import {Route, Switch} from "react-router-dom";
import SinglePost from "./containers/SinglePost/SinglePost";
import Login from "./containers/Login/Login";
import Register from "./containers/Register/Register";

const App = () => {
  return (
    <>
      <Layout>
          <Switch>
              <Route path='/' exact component={Main} />
              <Route path="/login" exact component={Login} />
              <Route path="/register" exact component={Register} />
              <Route path="/post/:id" component={SinglePost} />
              <Route render={() => <h1 style={{textAlign: 'center'}}>404 Page Not Found</h1>} />
          </Switch>
      </Layout>
    </>
  );
}

export default App;
