// Controls
const playButton = document.getElementById('play');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const progressBar = document.querySelector('.progress');
const progressBarContainer = document.querySelector('.progress-bar');
const currentTimeEl = document.querySelector('.current-time');
const durationEl = document.querySelector('.duration');
const visualizerBars = document.querySelectorAll('.visualizer-bar');

// Playlist configuration
const playlist = [
    '../intro-music/This Side Of Paradise.mp3',
    '../intro-music/The Big Sleep.mp3',
    '../intro-music/Realitätsprinzip.mp3',
    '../intro-music/Dreamwalker.mp3',
    '../intro-music/Light Showers.mp3',
    '../intro-music/Waltzing in the Rain.mp3',
    '../intro-music/The Vault.mp3',
    '../intro-music/Attachments.mp3',
    '../intro-music/Flight.mp3',
    "../intro-music/Dreams' Swirling Whispers.mp3",
    "../intro-music/Coruscating Street.mp3",
    "../intro-music/Fountain of Belleau.mp3",
    "../intro-music/Equation.mp3",
    "../intro-music/Ballad of Many Waters.mp3",
    "../intro-music/Dream Express.mp3",
    "../intro-music/Pluie sur la ville.mp3",
    "../intro-music/Nocturnal Illumination.mp3",
    "../intro-music/Quand la lumiere resplendira.mp3",
    "../intro-music/La nuit silencieuse et paisible.mp3",
    "../intro-music/Que le vent soit doux.mp3",
    "../intro-music/Anyone Can Cook.mp3",
    "../intro-music/Luminescence of Eventide.mp3",
    "../intro-music/Le Souvenir avec le crepuscule.mp3",
    "../intro-music/French Kiss.mp3",
    "../intro-music/Joie De Vivre.mp3",
    "../intro-music/Ratatouille Main Theme.mp3",
    "../intro-music/Claire de Lune.mp3",
    "../intro-music/Ballad Du Paris.mp3",
    "../intro-music/Julia's Theme.mp3",
    "../intro-music/Fables About the Stars.mp3",
    "../intro-music/Comet Observatory.mp3",
    "../intro-music/Star Chance.mp3",
    "../intro-music/To the Gateway.mp3",
    "../intro-music/Space Fantasy.mp3",
    "../intro-music/Star Festival.mp3",
    "../intro-music/Space Junk Galaxy.mp3",
    "../intro-music/Dawn  (A New Morning).mp3",
    "../intro-music/Suis-moi.mp3",
    "../intro-music/A Sweet Smile.mp3",
    "../intro-music/Moonlight in Mondstadt.mp3",
    "../intro-music/Midnight in Mondstadt.mp3",
    "../intro-music/Mondstadt Starlit.mp3",
    "../intro-music/Pure Sky.mp3",
    "../intro-music/Dawn Winery.mp3",
    "../intro-music/Cold Night.mp3",
    '../intro-music/Lily-Pads.mp3',
    '../intro-music/Kelp-Caves.mp3',
    '../intro-music/Below-Zero.mp3',
    '../intro-music/Twisty-Bridges.mp3',
    '../intro-music/Arctic-Peeper.mp3',
    '../intro-music/Arc-Lights.mp3',
    '../intro-music/A-Thousand-Strings.mp3',
    '../intro-music/A-Continuous-Thrum.mp3',
    '../intro-music/Into-the-Unknown.mp3',
    '../intro-music/Salutations.mp3'
];

// Initialize audio state from localStorage or default values
let currentTrack = parseInt(localStorage.getItem('currentTrack')) || 0;
let currentTime = parseFloat(localStorage.getItem('currentTime')) || 0;
let isPlaying = JSON.parse(localStorage.getItem('isPlaying')) || false;

const audio = new Audio(playlist[currentTrack]);
audio.preload = "auto"; // Preload audio for smoother transitions
audio.autoplay = true; // Autoplay enabled
audio.loop = false; // Individual tracks don't loop, but playlist will
audio.volume = 0.2;

// "tag" inside player
const cornerTag = document.getElementById('cornerTag');

// Initialize player state
function initializePlayer() {
    // Set initial time if resuming and also low volume lol
    audio.volume = 0.2;
    audio.currentTime = currentTime;
    
    // Autoplay if it was playing before
    if (isPlaying) {
        const playPromise = audio.play();
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.log("Autoplay prevented:", error);
                isPlaying = false;
                updatePlayButton();
            });
        }
    }
    
    // Save state periodically
    setInterval(savePlayerState, 1000);
}

// Save player state to localStorage
function savePlayerState() {
    localStorage.setItem('currentTrack', currentTrack);
    localStorage.setItem('currentTime', audio.currentTime);
    localStorage.setItem('isPlaying', isPlaying);
}

// Toggle play/pause
function togglePlay() {
    if (isPlaying) {
        audio.pause();
    } else {
        audio.play();
    }
}

// Update the play button icon
function updatePlayButton() {
    playButton.innerHTML = isPlaying ? 
        '<i class="fas fa-pause"></i>' : 
        '<i class="fas fa-play"></i>';
}

// Visualizer animation
function toggleVisualizer(playing) {
    visualizerBars.forEach((bar) => {
        bar.style.animationPlayState = playing ? 'running' : 'paused';
    });
}

// Play next track
function playNext() {
    currentTrack = (currentTrack + 1) % playlist.length;
    loadAndPlayTrack();
}

// Play previous track
function playPrev() {
    currentTrack = (currentTrack - 1 + playlist.length) % playlist.length;
    loadAndPlayTrack();
}

// Load and play track
function loadAndPlayTrack() {
    const wasPlaying = true; // Always autoplay on track change
    audio.src = playlist[currentTrack];
    audio.currentTime = 0; // Reset time for the new track
    if (wasPlaying) {
        audio.play().catch(error => console.log("Error playing track:", error));
    }
    savePlayerState();
}

// Event Listeners
playButton.addEventListener('click', togglePlay);
nextButton.addEventListener('click', playNext);
prevButton.addEventListener('click', playPrev);

// Audio event listeners
audio.addEventListener('play', () => {
    isPlaying = true;
    updatePlayButton();
    toggleVisualizer(true);
    if (cornerTag) {
        cornerTag.classList.add('hide');
    }
    savePlayerState();
});

audio.addEventListener('pause', () => {
    isPlaying = false;
    updatePlayButton();
    toggleVisualizer(false);
    savePlayerState();
});

audio.addEventListener('timeupdate', () => {
    if (audio.duration) {
        const progressPercent = (audio.currentTime / audio.duration) * 100;
        progressBar.style.width = `${progressPercent}%`;
    }
    updateCurrentTime();
    updateDuration();
});

audio.addEventListener('ended', () => {
    playNext(); // Automatically play next track when current one ends
});

// Seek on progress bar click
progressBarContainer.addEventListener('click', (e) => {
    const width = progressBarContainer.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    if (duration) {
        audio.currentTime = (clickX / width) * duration;
    }
});

// Time display functions
function updateCurrentTime() {
    const minutes = Math.floor(audio.currentTime / 60);
    const seconds = Math.floor(audio.currentTime % 60).toString().padStart(2, '0');
    currentTimeEl.textContent = `${minutes}:${seconds}`;
}

function updateDuration() {
    if (audio.duration) {
        const minutes = Math.floor(audio.duration / 60);
        const seconds = Math.floor(audio.duration % 60).toString().padStart(2, '0');
        durationEl.textContent = `${minutes}:${seconds}`;
    }
}

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        savePlayerState();
    }
});

// Initialize the player when the page loads
initializePlayer();

