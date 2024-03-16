import {io} from 'socket.io-client'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import { Home } from './pages/Home';
import { Editor } from './pages/Editor';
function App() {
  
  
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/editor/:id" element={<Editor/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
