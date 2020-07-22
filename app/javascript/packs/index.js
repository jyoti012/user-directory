import React from 'react'
import ReactDOM from 'react-dom'
import App from '../components/App'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Router>
      <I18nextProvider i18n={i18n}>
         <Route path="/" component={App}/>
      </I18nextProvider>
    </Router>,
    document.body.appendChild(document.createElement('div')),
  )
})
