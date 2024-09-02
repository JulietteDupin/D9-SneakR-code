import { useState } from 'react'
import { Home } from './Pages/Home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <HashRouter>
      <Link id="toHome" to="/Home" tabIndex="1">Return to Home</Link>
      <Routes>
          <Route path="/Home" element={<Home />} />
      </Routes>
   </HashRouter>
  )
}

export default App
