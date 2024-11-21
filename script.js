const videos = [
    { id: 1, user: 'dumbo', description: '13 year old flex on stream after hitting his first big rug! #TikTuk #Dance', song: 'Rugging Quant - dumbo', src: './videos/dance.mp4' },
    { id: 2, user: 'High', description: 'Dev passes out while trying to pump his coin higher', song: 'Hardfall - meth heads', src: './videos/cooking.mp4' },
    { id: 3, user: 'Incest Family', description: 'Son pimping mom out for some sol #TikTuk #boobs', song: 'Got boobs for sol - Incest Fam', src: './videos/travel.mp4' },
    { id: 4, user: 'NotMe', description: 'Pumpfun tokens when i sell #Tiktuk #pump', song: 'i wantu kms- me', src: './videos/rocket.mp4' },
    { id: 5, user: 'The Dodge Father', description: 'the one who pumped our bags #Tiktuk #pump', song: 'PumpIt- Elon Musk', src: './videos/elon.mp4' },
    { id: 6, user: 'The Saviour', description: 'the one who saved our bags #Tiktuk #pumpit', song: 'higher- Donald Trump', src: './videos/trump.mp4' },



];

let currentVideoIndex = 0;
const likes = [1234, 5678, 9012];
let isMuted = true;

const videoContainer = document.getElementById('videoContainer');
const muteButton = document.getElementById('muteButton');

function createVideoElement(video, index) {
    const videoItem = document.createElement('div');
    videoItem.className = 'video-item';
    videoItem.innerHTML = `
        <video src="${video.src}" loop playsinline controls muted></video>
        <div class="video-info">
            <p><strong>@${video.user}</strong></p>
            <p>${video.description}</p>
            <p><small>${video.song}</small></p>
        </div>
        <div class="video-actions">
            <div class="avatar">${video.user.slice(0, 2)}</div>
            <button class="action-button like-button" onclick="handleLike(${index})" aria-label="Like">❤️</button>
            <span class="action-count likes-count">${likes[index]}</span>
            <button class="action-button" aria-label="Comment">💬</button>
            <span class="action-count">88</span>
            <button class="action-button" aria-label="Share">➡️</button>
            <span class="action-count">55</span>
        </div>
    `;
    return videoItem;
}

function renderVideos() {
    videoContainer.innerHTML = '';
    videos.forEach((video, index) => {
        const videoElement = createVideoElement(video, index);
        videoContainer.appendChild(videoElement);
    });
    playCurrentVideo();
}

function handleLike(index) {
    likes[index]++;
    const likesCount = document.querySelectorAll('.likes-count')[index];
    likesCount.textContent = likes[index];
}

function playCurrentVideo() {
    const videoElements = document.querySelectorAll('video');
    videoElements.forEach((video, index) => {
        if (index === currentVideoIndex) {
            video.play().catch(error => console.error('Error playing video:', error));
        } else {
            video.pause();
        }
        video.muted = isMuted;
    });
}

function handleScroll() {
    const videoItems = document.querySelectorAll('.video-item');
    const middleOfViewport = window.innerHeight / 2;

    videoItems.forEach((item, index) => {
        const rect = item.getBoundingClientRect();
        if (rect.top <= middleOfViewport && rect.bottom >= middleOfViewport) {
            currentVideoIndex = index;
            playCurrentVideo();
        }
    });
}

function toggleMute() {
    isMuted = !isMuted;
    const videoElements = document.querySelectorAll('video');
    videoElements.forEach(video => {
        video.muted = isMuted;
    });
    updateMuteButtonIcon();
}

function updateMuteButtonIcon() {
    muteButton.innerHTML = isMuted ? 
        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>' :
        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>';
}

videoContainer.addEventListener('scroll', handleScroll);
muteButton.addEventListener('click', toggleMute);

renderVideos();
updateMuteButtonIcon();

// Ensure videos play on mobile devices
document.addEventListener('click', () => {
    if (isMuted) {
        toggleMute();
    }
    playCurrentVideo();
}, { once: true });
