// router/index.js
// import Index from '../container/Index'
import About from '@/container/About'
import Index from '@/container/Index'
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
