import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store'
import { ThemeProvider } from './contexts/ThemeContext'
import { AppRouter } from './routes/Router'

export default function App(){
  return (
    <Provider store={store}>
      <ThemeProvider>
        <BrowserRouter>
          <div>
            <AppRouter />
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  )
}
