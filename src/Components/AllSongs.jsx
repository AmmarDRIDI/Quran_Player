import { UseMusic } from "../Contexts/MusicContext"



export default function AllSongs() {

    const { allSongs, currentTrackIndex, handleSongClick } = UseMusic()
    return (
        <div className="all-songs">
            <h2>{`All Songs (${allSongs?.length ?? "null"})`}</h2>
            <div className="songs-grid">
                {allSongs.map((song, key) => {
                    return (
                        <div
                            className={`song-card ${currentTrackIndex === key ? "active" : ""}`}
                            key={key}
                            onClick={() => handleSongClick(song, key)}>
                            <div className="song-info">
                                <h3 className="song-title">{song.title}</h3>
                                <p className="song-artist">{song.artist}</p>
                                <span className="song-duration">{song.duration}</span>
                            </div>
                            <div className="play-button">
                                {currentTrackIndex === key ? "♪" : "▶"}
                            </div>
                        </div>
                    )
                })

                }
            </div>
        </div>

    )
}