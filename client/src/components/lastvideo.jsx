import React, { useState, useEffect } from 'react';
import Loader from './loader';
import myLoader from '../assets/loader.gif'
import he from 'he';

const LatestVideo = ({ channelId, playlistId }) => {
    const [video, setVideo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchVideo = async () => {
            // Imposta isLoading a true prima di iniziare a caricare i dati dall'API
            setIsLoading(true);
            const response = await fetch(
                `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=1&key=AIzaSyDN5W6chBPUP8ztP9YbMwbjL9AfLfdNe10`
            );
            const data = await response.json();
            console.log(data);
            if (data.error) {
                console.error(data.error);
            } else {
                setVideo(data.items[0]);
                const videoId = data.items[0].snippet.resourceId.videoId;
                const videoResponse = await fetch(
                    `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=AIzaSyDN5W6chBPUP8ztP9YbMwbjL9AfLfdNe10`
                );
                const videoData = await videoResponse.json();
            }
            // Imposta isLoading a false dopo aver caricato i dati dall'API
            setIsLoading(false);
        };

        fetchVideo();
    }, [channelId, playlistId]);

    if (!video) return <div>Loading...</div>;

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const currentMonth = new Date().getMonth();
    const currentMonthName = monthNames[currentMonth];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'white', margin: '60px', backgroundColor: '#27292b' }}>
            <h3 style={{ margin: '40px' }}>What's new in <span>{currentMonthName}</span></h3>
            {/* Mostra il componente Loader solo quando isLoading è true */}
            {isLoading && <Loader src={myLoader} />}
            <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${video.snippet.resourceId.videoId}`}
                title={video.snippet.title ? he.decode(video.snippet.title) : ''}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
            <h3 style={{ margin: '40px' }}>
                {video.snippet.title ? he.decode(video.snippet.title) : ''}
            </h3>
        </div>
    );
};

export default LatestVideo;
