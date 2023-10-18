import { createBrowserRouter } from 'react-router-dom'
import IndexBarDemo from '../src/demos/IndexBar'
import PullRefreshDemo from '../src/demos/PullRefresh'
import App from '../src/App.tsx'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
  },
  {
    path: '/indexBarDemo',
    element: <IndexBarDemo/>,
  },
  {
    path: '/pullRefreshDemo',
    element: <PullRefreshDemo/>,
  },
])
