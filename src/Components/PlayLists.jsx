import { useEffect, useState } from "react"
import { UseMusic } from "../Contexts/MusicContext"

export default function PlayLists() {

  const { allSongs, playlists, setPlaylists, createPlaylist, deletePlaylist, currentTrackIndex, handleSongClick, play } = UseMusic()

  useEffect(() => {
    const UpdatedPlaylists = JSON.parse(localStorage.getItem("playlists"));
    if (UpdatedPlaylists) {
      setPlaylists(UpdatedPlaylists);
    }
  }, [setPlaylists])


  const [NewPlaylistName, setNewPlaylistName] = useState('')
  const [selectedPlaylist, setSelectedPlaylist] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)


  const handleCreatePlaylist = () => {
    if (NewPlaylistName.trim() === '') return
    createPlaylist(NewPlaylistName)
    setNewPlaylistName('')
  }

  const handleDeletePlaylist = (playlistId) => {
    deletePlaylist(playlistId)
  }

  const handleAddSongToPlaylist = (song) => {
    if (!selectedPlaylist) return
    const selectedPlaylistId = selectedPlaylist.id

    setPlaylists((prevPlaylists) => {
      const updatedPlaylists = prevPlaylists.map((playlist) => {
        if (playlist.id !== selectedPlaylistId) return playlist

        const songExists = (playlist.songs || []).some((s) => s.id === song.id)
        if (songExists) return playlist

        return {
          ...playlist,
          songs: [...(playlist.songs || []), song],
        }
      })

      localStorage.setItem("playlists", JSON.stringify(updatedPlaylists))
      setSelectedPlaylist(updatedPlaylists.find((playlist) => playlist.id === selectedPlaylistId) || null)
      return updatedPlaylists
    })

    setSearchQuery('')
    setShowDropdown(false)
  }

  const handlePlaySongFromPlaylist = (song) => {
    const songIndex = allSongs.findIndex((s) => s.id === song.id)
    if (songIndex < 0) return

    handleSongClick(allSongs[songIndex], songIndex)
    play()
  }

  const filtredSongs = allSongs.filter((song) => {
    const maches = song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchQuery.toLowerCase())
    const isAlreadyInPlaylist = selectedPlaylist?.songs.some(s => s.id === song.id)
    return maches && !isAlreadyInPlaylist
  })



  return (
    <div className="playlists">
      <h2>PlayLists</h2>
      <div className="create-playlist">
        <h3>create a new playlist</h3>
        <div className="playlist-form">
          <input
            type="text"
            placeholder="playlist Name ..."
            className="playlist-input"
            value={NewPlaylistName}
            onChange={(e) => setNewPlaylistName(e.target.value)}
          />
          <button className="create-btn" onClick={handleCreatePlaylist}>
            create
          </button>
        </div>

        <div className="playlists-list" style={{ marginTop: "15px" }}>
          {playlists.length === 0 ? (
            <p className="empty-message">No playlists found. Create your first playlist !</p>
          ) : (playlists.map((playlist, key) => {
            return (
              <div className="playlist-item" key={key} onClick={() => setSelectedPlaylist(playlist)}>
                <div className="playlist-header">
                  <h3>{playlist.name}</h3>
                  <div className="playlist-actions">
                    <button
                      className="delete-playlist-btn"
                      onClick={() => handleDeletePlaylist(playlist.id)}
                    >Delete</button>
                  </div>
                </div>

                <div className="add-songs-section">
                  <div className="search-container">
                    <input
                      type="text"
                      placeholder="search songs to add..."
                      className="song-search-input"
                      value={playlist.id === selectedPlaylist?.id ? searchQuery : ""}
                      onChange={(e) => {
                        setSearchQuery(e.target.value)
                        setSelectedPlaylist(playlist)
                        setShowDropdown(e.target.value.length > 0)
                      }}
                      onFocus={(e) => {
                        setSelectedPlaylist(playlist)
                        setShowDropdown(e.target.value.length > 0)
                      }}
                    />
                    {
                      selectedPlaylist?.id === playlist.id && showDropdown && (
                        <div className="search-dropdown">
                          {filtredSongs.length === 0 ? (
                            <div className="dropdown-item no-results">No songs found.</div>
                          ) : (filtredSongs.slice(0, 5).map((song, key) =>
                          (
                            <div className="dropdown-item" key={key} onClick={() => { handleAddSongToPlaylist(song); }}>
                              <span className="song-title">{song.title} </span>
                              <span className="song-artist"> {song.artist}</span>
                            </div>
                          )
                          ))}
                        </div>
                      )
                    }
                  </div>
                </div>


                <div style={{ margin: "10px" }} className="playlist-songs">
                  {
                    playlist.songs && playlist.songs.length > 0 ? (
                      playlist.songs.map((song, key) => (
                        <div
                          style={{ margin: "2px" }}
                          className={`playlist-song ${currentTrackIndex === allSongs.findIndex(s => s.id === song.id) ? "active" : ""}`}
                          key={key}
                          onClick={() => { handlePlaySongFromPlaylist(song) }}
                        >
                          <div className="song-info">
                            <span className="song-title">{song.title} </span>
                            <span className="song-artist"> {song.artist}</span>
                          </div>
                          <span className="song-duration">{song.duration}</span>
                        </div>
                      ))
                    ) : (
                      <p className="empty-playlist">No songs in this playlist. Add some songs !</p>
                    )
                  }

                </div>

              </div>
            )
          }))}

        </div>


      </div>
    </div>
  )
}