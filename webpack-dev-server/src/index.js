import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import axios from 'axios'

function App() {
  useEffect(() => {
    axios.get('/react/api/header.json').then((res) => {
      console.log(res)
    })
  }, [])

  return <div>Hello World</div>
}

const root = createRoot(document.getElementById('root'))
root.render(
  <StrictMode>
    <App />
  </StrictMode>,
)
