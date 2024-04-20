import './App.css'
import routes from '../src/router'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
function App() {
  return (
    <>
      {/* <div>hello</div> */}
      <Router>
        <Routes>
      {routes.map(route => <Route exact key={route.path} path={route.path} element={<route.component />} />)}
      </Routes>
      </Router>
    </>
  )
}

export default App
