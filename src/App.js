import React from 'react';
import './App.css';
import HomePage from './components/home/HomePage';
import AboutPage from './components/about/AboutPage';
import { Route, Switch } from 'react-router-dom';
import Header from './components/common/Header';
import PageNotFound from './components/PageNotFound';
import CoursesPage from './components/courses/CoursesPage';

const App = () => (
  <div className='container container-fluid'>
    <Header/>
    <Switch>
      <Route exact path='/' component={HomePage}/>
      <Route path='/about' component={AboutPage}/>
      <Route path='/courses' component={CoursesPage}/>
      <Route component={PageNotFound}/>
    </Switch>
  </div>
);

export default App;
