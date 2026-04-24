import { useState, useContext } from "react"
import { MusicContext } from "./MusicContextObject"


const Songs = [
    {
        id: 1,
        title: "سورة الشمس",
        artist: "أنور شحات أنور",
        duration: "04:56",
        url: "/Quran/song1.mp3",
    },
    {
        id: 2,
        title: "سورة البقرة",
        artist: "رعد الكردي",
        duration: "00:57",
        url: "/Quran/song2.m4a",
    },
    {
        id: 3,
        title: "ربنا افرغ علينا صبرا",
        artist: "غير معروف",
        duration: "02:15",
        url: "/Quran/song3.m4a",
    },
    {
        id: 4,
        title: "سورة طه",
        artist: "سعد الغامدي",
        duration: "01:03",
        url: "/Quran/song4.m4a",
    },
    {
        id: 5,
        title: "إعداد قناة قرآن",
        artist: "القارئ عبد القادر سنكر",
        duration: "03:24",
        url: "/Quran/song5.mp3",
    },
    {
        id: 6,
        title: "سورة الضحى",
        artist: "غير معروف",
        duration: "02:08",
        url: "/Quran/song6.m4a",
    },
    {
        id: 7,
        title: "إعداد قناة قرآن",
        artist: "أبو بكر الشاطري",
        duration: "02:32",
        url: "/Quran/song7.m4a",
    }

]
export const MusicProvider = ({ children }) => {

    const [allSongs] = useState(Songs)
    const [currentTrack, setCurrentTrack] = useState(Songs[0])
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
    const [currentTime, setCurrentTime] = useState("0:00")
    const [currentProgress, setCurrentProgress] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
    const [duration, setDuration] = useState("0:00")
    const [volume, setVolume] = useState(0.5)
    const [playlists, setPlaylists] = useState([])


    function handleSongClick(song, key) {
        setCurrentTrack(song)
        setCurrentTrackIndex(key)
        setCurrentTime("0:00")
        setCurrentProgress(0)
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60)
        const remainingSeconds = Math.floor(seconds % 60)
        return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`
    }

    const nextTrack = () => {
        setCurrentTrackIndex((prev) => {
            const nextIndex = (prev + 1) % allSongs.length
            setCurrentTrack(allSongs[nextIndex])
            return nextIndex
        })
        setCurrentTime("0:00")
        setCurrentProgress(0)
        setIsPlaying(false)
    }

    const previousTrack = () => {
        setCurrentTrackIndex((prev) => {
            const nextIndex = (prev === 0 ? allSongs.length - 1 : prev - 1)
            setCurrentTrack(allSongs[nextIndex])
            return nextIndex
        })
        setCurrentTime("0:00")
        setCurrentProgress(0)
        setIsPlaying(false)
    }

    const play = () => {
        setIsPlaying(true)
    }

    const pause = () => {
        setIsPlaying(false)
    }

    const createPlaylist = (name) => {
        const newPlaylist = {
            id: Date.now(),
            name: name,
            songs: []
        }
        setPlaylists((prev) => [...prev, newPlaylist])
        localStorage.setItem("playlists", JSON.stringify([...playlists, newPlaylist]))
    }

    const deletePlaylist = (playlistId) => {
        setPlaylists((prev) => prev.filter((playlist) => {
            if (playlist.id !== playlistId) return playlist
        }))
        localStorage.setItem("playlists", JSON.stringify(playlists.filter((playlist) => {
            if (playlist.id !== playlistId) return playlist
        })))
    }


    return (
        <MusicContext.Provider value={{
            allSongs,
            currentTrack,
            currentTrackIndex,
            currentTime,
            duration,
            setDuration,
            setCurrentTime,
            currentProgress,
            setCurrentProgress,
            volume,
            setVolume,
            handleSongClick,
            nextTrack,
            previousTrack,
            isPlaying,
            play,
            pause,
            formatTime,
            playlists,
            setPlaylists,
            createPlaylist,
            deletePlaylist
        }}
        >{children}</MusicContext.Provider>)
}

export const UseMusic = () => {
    const context = useContext(MusicContext)
    return context
}