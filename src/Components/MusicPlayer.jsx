import { useRef, useEffect } from "react"
import { UseMusic } from "../Contexts/MusicContext"


export default function MusicPlayer() {

  const {
    currentTrack,
    currentTime,
    setCurrentTime,
    currentProgress,
    setCurrentProgress,
    duration,
    setDuration,
    nextTrack,
    previousTrack,
    isPlaying,
    play,
    pause,
    formatTime,
    volume,
    setVolume,
  } = UseMusic()

  const audioRef = useRef(null)

  const blockContextMenu = (event) => {
    event.preventDefault()
  }

  const handleChangeVolume = (event) => {
    const newVolume = Number(event.target.value)
    setVolume(newVolume)
    const audio = audioRef.current
    if (audio) {
      audio.volume = newVolume
    }
  }

  const handleTimeUpdate = (event) => {
    const audio = audioRef.current
    if (!audio) return
    if (!audio.duration) return

    const progress = Number(event?.target?.value ?? 0)
    setCurrentProgress(progress)
    const time = formatTime(audio.duration * progress / 100)
    setCurrentTime(time)
    audio.currentTime = audio.duration * progress / 100
  }


  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleLoadedMetadata = () => {
      setDuration(audio.duration)
    }

    const handleTimeUpdateWrapper = () => {
      setCurrentTime(formatTime(audio.currentTime))

      if (!audio.duration) {
        setCurrentProgress(0)
        return
      }

      const progress = (audio.currentTime / audio.duration) * 100
      setCurrentProgress(progress)
    }

    const handleEnded = () => {
      nextTrack()
    }

    audio.addEventListener("timeupdate", handleTimeUpdateWrapper)
    audio.addEventListener("loadedmetadata", handleLoadedMetadata)
    audio.addEventListener("ended", handleEnded)
    audio.volume = volume
    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdateWrapper)
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata)
      audio.removeEventListener("ended", handleEnded)
    }
  }, [currentTrack, formatTime, nextTrack, setCurrentProgress, setCurrentTime, setDuration, volume])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    if (isPlaying) {
      audio.play().catch((error) => {
        console.error("Error playing audio:", error)
      })
    }
    else {
      audio.pause()
    }
  }, [isPlaying, currentTrack])



  return (
    <div className="music-player" onContextMenu={blockContextMenu}>
      <audio
        ref={audioRef}
        src={currentTrack?.url ?? ""}
        preload="metadata"
        controlsList="nodownload noplaybackrate noremoteplayback"
        disablePictureInPicture
        disableRemotePlayback
        onContextMenu={blockContextMenu}
      />
      <div className="track-info">
        <h3 className="track-title">{currentTrack?.title ?? "Select a song"}</h3>
        <p className="track-artist">{currentTrack?.artist ?? ""}</p>
      </div>

      <div className="progress-container">
        <span className="time">{currentTime || "0:00"}</span>
        <input
          type="range"
          className="progress-bar"
          value={currentProgress ?? 0}
          min={0}
          max={100}
          step={0.1}
          onChange={handleTimeUpdate}
          style={{ "--progress": `${currentProgress}%` }} />
        <span className="time">{formatTime(duration || 0)}</span>

      </div>

      <div className="controls">
        <button className="control-btn" onClick={previousTrack}>
          ⏮
        </button>
        <button className="control-btn play-btn" onClick={isPlaying ? pause : play}>
          {isPlaying ? "⏸" : "▶"}
        </button>
        <button className="control-btn" onClick={nextTrack}>
          ⏭
        </button>
      </div>


      <div className="volume-container">
        <span className="volume-icon">🔊</span>
        <input type="range"
          min={0}
          max={1}
          step={0.05}
          className="volume-bar"
          value={volume}
          onChange={(e) => handleChangeVolume(e)}
          style={{ "--progress": `${volume * 100}%` }} />
      </div>



    </div>
  )
}