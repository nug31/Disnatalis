import React, { useState, useEffect, useRef } from 'react';
import { Music, VolumeX } from 'lucide-react';

const MusicPlayer = () => {
    // Default royalty-free music (Cinematic/Event style)
    // Source: Pixabay (Royalty Free)
    const audioUrl = "/hbd.mp3";

    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    useEffect(() => {
        audioRef.current = new Audio(audioUrl);
        const audio = audioRef.current;
        audio.loop = true;

        // Cleanup
        return () => {
            audio.pause();
        };
    }, []);

    const togglePlay = () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying) {
            audio.pause();
        } else {
            audio.play().catch(error => {
                console.error("Audio play failed:", error);
            });
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <div className="music-player-container">
            <button
                onClick={togglePlay}
                className={`music-toggle-btn ${isPlaying ? 'playing' : 'paused'}`}
                title={isPlaying ? "Matikan Musik" : "Putar Musik"}
            >
                {isPlaying ? <Music size={24} /> : <VolumeX size={24} />}
            </button>
        </div>
    );
};

export default MusicPlayer;
