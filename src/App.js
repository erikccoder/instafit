import React from 'react'
import { Root, Routes, addPrefetchExcludes } from 'react-static'
//
import { Link, Router } from 'components/Router'
import Dynamic from 'containers/Dynamic'

import './app.css'

// Any routes that start with 'dynamic' will be treated as non-static routes
addPrefetchExcludes(['dynamic'])

function App() {
  return (
    <Root>
      <nav className="p-2 border-bottom bg-light">
          <div className="container px-0">
              <Link to="/">Insta<span className="h4 font-weight-lighter">Fit</span></Link>
              <Link to="/about">About</Link>
              <a href="//windinteractive.com" target="blank"> @windinteractive </a>
          </div>
      </nav>
      <div className="container px-0">
        <React.Suspense fallback={<em>Loading...</em>}>
          <Router>
            <Dynamic path="dynamic" />
            <Routes path="*" />
          </Router>
        </React.Suspense>
      </div>
    </Root>
  )
}

export default App
