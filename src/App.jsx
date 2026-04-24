import { BrowserRouter, Routes, Route } from 'react-router'
import AllSongs from './Components/AllSongs'
import PlayLists from './Components/PlayLists'
import MusicPlayer from './Components/MusicPlayer'
import { MusicProvider } from './Contexts/MusicContext'
import { NavBar } from './Components/NavBar'



function App() {

  return (

    <BrowserRouter>
      <MusicProvider>
        <div className="app">

          <div>
            <NavBar />
          </div>

          <main className='app-main'>

            <div className="player-section">
              <MusicPlayer />
            </div>

            <div className="content-section">
              <Routes>
                <Route path="/" element={<AllSongs />} />
                <Route path="/PlayLists" element={<PlayLists />} />
              </Routes>
            </div>

          </main>
        </div>
      </MusicProvider>

    </BrowserRouter>
  )
}

export default App
