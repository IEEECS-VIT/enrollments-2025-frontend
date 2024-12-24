// "use server"

import './App.css'
import Bg from './components/bg'
import Navbar from './components/Navbar'
import Start from './components/Start'

function App() {
  return (
    <div className="overflow-x-hidden relative h-[100vh]">
      <Bg />
      <Navbar />
      <Start />
    </div>
  )
}

export default App
