// "use server"

import './App.css'
import Bg from './components/bg'
import Navbar from './components/Navbar'
import Start from './components/Start'
import Landing from './components/Landing'

function App() {
  return (
    <div className="overflow-x-hidden relative h-[100vh]">
      <Bg />
      <Navbar />
      <Start />
      <Landing/>
    </div>
  )
}

export default App
