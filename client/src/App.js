import react, { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"
import routes from '../src/router'
function App() {
  return <>
     <Routes>
      {routes.map(route => <Route exact key={route.path} path={route.path} element={<route.component />} />)}
     </Routes>
   </>
}

export default App