import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Child from 'child'
// import picture from './child/picture.jpg'

function App() {
  return (
    <div>
      <div>This is App</div>
      <Child />
    </div>
  )
}

const root = createRoot(document.getElementById('root'))
root.render(
  <StrictMode>
    <App />
  </StrictMode>,
)
