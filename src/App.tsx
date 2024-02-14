import { RouterProvider } from 'react-router-dom'
import GlobalStyle from './ui/theme/globalStyles'
import { Routes } from './infrastructure/routes/Routes'
import { store } from './infrastructure/redux/store'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <RouterProvider router={Routes} />
      <ToastContainer />
    </Provider>
  )
}

export default App
