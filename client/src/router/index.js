// router/index.js
import Index from '../container/Index/Index'
import About from '../container/About'

const routes = [
  {
    path: "/",
    component: Index
  },
  {
    path: "/about",
    component: About
  }
];

export default routes
