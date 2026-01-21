import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import _ from 'lodash'

function App() {
  return (
    <div>
      <div>{_.join(['This', 'is', 'App'], ' ')}</div>
    </div>
  )
}

const root = createRoot(document.getElementById('root'))
root.render(
  <StrictMode>
    <App />
  </StrictMode>,
)
