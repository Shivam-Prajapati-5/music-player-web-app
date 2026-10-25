// ==========================================================================
// Spotify Web Player - Audio Engine & Interactive Logic
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // Song Playlist Database (Real Full Movie Songs)
    const songs = [
        {
            id: 0,
            title: "Kesariya",
            artist: "Arijit Singh, Pritam • Brahmāstra",
            img: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=500&q=80",
            src: "./assets/songs/kesariya.mp3"
        },
        {
            id: 1,
            title: "Chaleya",
            artist: "Arijit Singh, Shilpa Rao • Jawan",
            img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&q=80",
            src: "./assets/songs/chaleya.mp3"
        },
        {
            id: 2,
            title: "Apna Bana Le",
            artist: "Arijit Singh, Sachin-Jigar • Bhediya",
            img: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&q=80",
            src: "./assets/songs/apna_bana_le.mp3"
        },
        {
            id: 3,
            title: "Tum Hi Ho",
            artist: "Arijit Singh, Mithoon • Aashiqui 2",
            img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&q=80",
            src: "./assets/songs/tum_hi_ho.mp3"
        },
        {
            id: 4,
            title: "Arjan Vailly",
            artist: "Bhupinder Babbal • Animal",
            img: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&q=80",
            src: "./assets/songs/arjan_vailly.mp3"
        },
        {
            id: 5,
            title: "Pehle Bhi Main",
            artist: "Vishal Mishra, Raj Shekhar • Animal",
            img: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=500&q=80",
            src: "./assets/songs/pehle_bhi_main.mp3"
        },
        {
            id: 6,
            title: "O Maahi",
            artist: "Arijit Singh, Pritam • Dunki",
            img: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=500&q=80",
            src: "./assets/songs/o_maahi.mp3"
        },
        {
            id: 7,
            title: "Naa Ready",
            artist: "Thalapathy Vijay, Anirudh • Leo",
            img: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=500&q=80",
            src: "./assets/songs/naa_ready.mp3"
        },
        {
            id: 8,
            title: "Main Phir Bhi Tumko Chaahunga",
            artist: "Arijit Singh, Mithoon • Half Girlfriend",
            img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&q=80",
            src: "./assets/songs/main_phir_bhi.mp3"
        },
        {
            id: 9,
            title: "Channa Mereya",
            artist: "Arijit Singh, Pritam • Ae Dil Hai Mushkil",
            img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&q=80",
            src: "./assets/songs/channa_mereya.mp3"
        },
        {
            id: 10,
            title: "Agar Tum Saath Ho",
            artist: "Arijit Singh, Alka Yagnik • Tamasha",
            img: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&q=80",
            src: "./assets/songs/agar_tum_saath_ho.mp3"
        },
        {
            id: 11,
            title: "Shayad",
            artist: "Arijit Singh, Pritam • Love Aaj Kal",
            img: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=500&q=80",
            src: "./assets/songs/shayad.mp3"
        },
        {
            id: 12,
            title: "Khairiyat",
            artist: "Arijit Singh, Pritam • Chhichhore",
            img: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&q=80",
            src: "./assets/songs/khairiyat.mp3"
        },
        {
            id: 13,
            title: "Gerua",
            artist: "Arijit Singh, Antara Mitra • Dilwale",
            img: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=500&q=80",
            src: "./assets/songs/gerua.mp3"
        }
    ];

    // State Variables
    let currentSongIndex = 0;
    let isPlaying = false;
    let isShuffle = false;
    let isRepeat = false;
    let lastVolume = 0.8;

    // HTML Audio Instance
    const audio = new Audio();
    audio.volume = 0.8;

    // DOM Element References
    const playerImg = document.getElementById('player-img');
    const playerTitle = document.getElementById('player-title');
    const playerArtist = document.getElementById('player-artist');

    const playPauseBtn = document.getElementById('play-pause-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const shuffleBtn = document.getElementById('shuffle-btn');
    const repeatBtn = document.getElementById('repeat-btn');
    const likeBtn = document.getElementById('like-btn');

    const currentTimeEl = document.getElementById('current-time');
    const totalTimeEl = document.getElementById('total-time');
    const seekBar = document.getElementById('seek-bar');

    const volumeBar = document.getElementById('volume-bar');
    const volumeIcon = document.getElementById('volume-icon');

    const searchInput = document.getElementById('search-input');
    const pills = document.querySelectorAll('.pill');

    // Modal & Upload DOM Elements
    const addModal = document.getElementById('add-song-modal');
    const openAddModalBtn = document.getElementById('open-add-modal-btn');
    const heroUploadBtn = document.getElementById('hero-upload-btn');
    const libAddBtn = document.getElementById('lib-add-btn');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const tabFileBtn = document.getElementById('tab-file-btn');
    const tabUrlBtn = document.getElementById('tab-url-btn');
    const tabFileContent = document.getElementById('tab-file-content');
    const tabUrlContent = document.getElementById('tab-url-content');

    const localMp3FileInput = document.getElementById('local-mp3-file');
    const fileNameDisplay = document.getElementById('file-name-display');
    const localSongTitleInput = document.getElementById('local-song-title');
    const localSongArtistInput = document.getElementById('local-song-artist');
    const submitLocalFileBtn = document.getElementById('submit-local-file');

    const urlSongSrcInput = document.getElementById('url-song-src');
    const urlSongTitleInput = document.getElementById('url-song-title');
    const urlSongArtistInput = document.getElementById('url-song-artist');
    const urlSongImgInput = document.getElementById('url-song-img');
    const submitUrlSongBtn = document.getElementById('submit-url-song');

    const userSongsContainer = document.getElementById('user-songs-container');

    // ----------------------------------------------------------------------
    // Real Full Vocal Song Stream Engine (JioSaavn / Public Audio APIs)
    // ----------------------------------------------------------------------
    async function getRealAudioStream(songTitle, artistName) {
        // Clean query terms
        const cleanTitle = songTitle.split('•')[0].split('(')[0].trim();
        const cleanArtist = artistName.split('•')[0].split(',')[0].trim();
        const query = encodeURIComponent(`${cleanTitle} ${cleanArtist}`);

        const endpoints = [
            `https://saavn.dev/api/search/songs?query=${query}`,
            `https://saavn.me/search/songs?query=${query}`,
            `https://jiosaavn-api-private-us-east-1.vercel.app/search?query=${query}`,
            `https://jiosaavn-api-v3.vercel.app/search?query=${query}`
        ];

        for (const url of endpoints) {
            try {
                const response = await fetch(url);
                if (response.ok) {
                    const data = await response.json();
                    let results = null;

                    if (data.data && data.data.results) results = data.data.results;
                    else if (data.results) results = data.results;

                    if (results && results.length > 0) {
                        const songItem = results[0];
                        const downloadUrls = songItem.downloadUrl || songItem.download_url;

                        if (downloadUrls && downloadUrls.length > 0) {
                            // Select highest available bit-rate (320kbps or 160kbps)
                            const highQuality = downloadUrls.find(u => u.quality === '320kbps') || 
                                               downloadUrls.find(u => u.quality === '160kbps') || 
                                               downloadUrls[downloadUrls.length - 1];
                            const streamUrl = typeof highQuality === 'string' ? highQuality : (highQuality.url || highQuality.link);
                            if (streamUrl) return streamUrl;
                        }
                    }
                }
            } catch (err) {
                console.log(`Stream fetch note for ${url}:`, err);
            }
        }

        return null;
    }

    // ----------------------------------------------------------------------
    // Core Audio Functions
    // ----------------------------------------------------------------------

    // Load song details into DOM and Audio object
    function loadSong(index) {
        if (index < 0 || index >= songs.length) return;
        currentSongIndex = index;
        const song = songs[currentSongIndex];

        playerImg.src = song.img || "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&q=80";
        playerTitle.textContent = song.title;
        playerArtist.textContent = song.artist;
        document.title = `${song.title} • ${song.artist} | TuneFlow`;

        // Reset seek slider
        seekBar.value = 0;
        updateSliderFill(seekBar, 0);

        // Load local MP3 file directly
        audio.src = song.src;

        highlightPlayingCard();
    }

    // Play Audio Track
    function playSong() {
        isPlaying = true;
        if (!audio.src) {
            loadSong(currentSongIndex);
            return;
        }
        audio.play().then(() => {
            playPauseBtn.innerHTML = '<i class="fa-solid fa-circle-pause"></i>';
        }).catch(err => {
            console.log("Playback start note:", err);
        });
        highlightPlayingCard();
    }

    // Pause Audio Track
    function pauseSong() {
        isPlaying = false;
        audio.pause();
        playPauseBtn.innerHTML = '<i class="fa-solid fa-circle-play"></i>';
        highlightPlayingCard();
    }

    // Toggle Play/Pause
    function togglePlay() {
        if (isPlaying) {
            pauseSong();
        } else {
            playSong();
        }
    }

    // Play Previous Song
    function prevSong() {
        if (audio.currentTime > 3) {
            audio.currentTime = 0;
            return;
        }
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        loadSong(currentSongIndex);
        playSong();
    }

    // Play Next Song
    function nextSong() {
        if (isShuffle) {
            let randomIndex;
            do {
                randomIndex = Math.floor(Math.random() * songs.length);
            } while (randomIndex === currentSongIndex && songs.length > 1);
            currentSongIndex = randomIndex;
        } else {
            currentSongIndex = (currentSongIndex + 1) % songs.length;
        }
        loadSong(currentSongIndex);
        playSong();
    }

    // Format Seconds to MM:SS
    function formatTime(seconds) {
        if (isNaN(seconds)) return "0:00";
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }

    // Update Progress Bar & Time Labels
    function updateProgress() {
        const { currentTime, duration } = audio;
        if (duration) {
            const progressPercent = (currentTime / duration) * 100;
            seekBar.value = progressPercent;
            updateSliderFill(seekBar, progressPercent);
            currentTimeEl.textContent = formatTime(currentTime);
            totalTimeEl.textContent = formatTime(duration);
        }
    }

    // Dynamic Slider Fill Background
    function updateSliderFill(inputElement, percent) {
        inputElement.style.setProperty('--seek-progress', `${percent}%`);
        inputElement.style.background = `linear-gradient(to right, #1ed760 ${percent}%, #4d4d4d ${percent}%)`;
    }

    // Seek Audio Position
    function setSeek(e) {
        const seekTo = (e.target.value / 100) * audio.duration;
        if (!isNaN(seekTo)) {
            audio.currentTime = seekTo;
        }
    }

    // Set Volume
    function setVolume(e) {
        const value = e.target.value;
        const volumeVal = value / 100;
        audio.volume = volumeVal;
        updateSliderFill(volumeBar, value);

        if (volumeVal === 0) {
            volumeIcon.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
        } else if (volumeVal < 0.5) {
            volumeIcon.innerHTML = '<i class="fa-solid fa-volume-low"></i>';
        } else {
            volumeIcon.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
        }
    }

    // Toggle Mute
    function toggleMute() {
        if (audio.volume > 0) {
            lastVolume = audio.volume;
            audio.volume = 0;
            volumeBar.value = 0;
            updateSliderFill(volumeBar, 0);
            volumeIcon.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
        } else {
            audio.volume = lastVolume;
            volumeBar.value = lastVolume * 100;
            updateSliderFill(volumeBar, lastVolume * 100);
            volumeIcon.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
        }
    }

    // Highlight currently playing card
    function highlightPlayingCard() {
        const allCards = document.querySelectorAll('.card, .quick-card');
        allCards.forEach(card => {
            const cardSongId = parseInt(card.getAttribute('data-song'));
            if (cardSongId === currentSongIndex) {
                card.classList.add('playing-active');
            } else {
                card.classList.remove('playing-active');
            }
        });
    }

    // ----------------------------------------------------------------------
    // UI Event Handlers & Card Events
    // ----------------------------------------------------------------------

    function attachCardEvents() {
        const cards = document.querySelectorAll('.card, .quick-card');
        cards.forEach(card => {
            card.onclick = null;
            card.onclick = (e) => {
                const songId = parseInt(card.getAttribute('data-song'));
                if (!isNaN(songId)) {
                    if (currentSongIndex === songId && isPlaying) {
                        pauseSong();
                    } else {
                        loadSong(songId);
                        playSong();
                    }
                }
            };
        });
    }

    // Search bar live filtering
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            const cards = document.querySelectorAll('.card, .quick-card');
            
            cards.forEach(card => {
                const songId = parseInt(card.getAttribute('data-song'));
                const song = songs[songId];
                if (song) {
                    const match = song.title.toLowerCase().includes(query) || 
                                  song.artist.toLowerCase().includes(query);
                    card.style.display = match ? 'flex' : 'none';
                }
            });
        });
    }

    // Modal Control Functions
    function openModal() {
        addModal.classList.add('active');
    }

    function closeModal() {
        addModal.classList.remove('active');
    }

    if (openAddModalBtn) openAddModalBtn.addEventListener('click', openModal);
    if (heroUploadBtn) heroUploadBtn.addEventListener('click', openModal);
    if (libAddBtn) libAddBtn.addEventListener('click', openModal);
    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);

    // Close modal on background click
    addModal.addEventListener('click', (e) => {
        if (e.target === addModal) closeModal();
    });

    // Tab Switching
    tabFileBtn.addEventListener('click', () => {
        tabFileBtn.classList.add('active');
        tabUrlBtn.classList.remove('active');
        tabFileContent.classList.remove('hide');
        tabUrlContent.classList.add('hide');
    });

    tabUrlBtn.addEventListener('click', () => {
        tabUrlBtn.classList.add('active');
        tabFileBtn.classList.remove('active');
        tabUrlContent.classList.remove('hide');
        tabFileContent.classList.add('hide');
    });

    // File input selection display
    localMp3FileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            fileNameDisplay.textContent = file.name;
            if (!localSongTitleInput.value) {
                const cleanName = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
                localSongTitleInput.value = cleanName;
            }
        } else {
            fileNameDisplay.textContent = "No file chosen";
        }
    });

    // Submit Local Full MP3 File Song
    submitLocalFileBtn.addEventListener('click', () => {
        const file = localMp3FileInput.files[0];
        if (!file) {
            alert("Please select a full MP3 audio file first!");
            return;
        }

        const audioUrl = URL.createObjectURL(file);
        const title = localSongTitleInput.value.trim() || file.name.replace(/\.[^/.]+$/, "");
        const artist = localSongArtistInput.value.trim() || "Local Full Track";

        const newSongId = songs.length;
        const newSong = {
            id: newSongId,
            title: title,
            artist: artist,
            img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&q=80",
            src: audioUrl
        };

        songs.push(newSong);
        addSongCardToLibrary(newSong);

        // Reset modal form
        localMp3FileInput.value = "";
        fileNameDisplay.textContent = "No file chosen";
        localSongTitleInput.value = "";
        localSongArtistInput.value = "";
        closeModal();

        // Load & Play new song immediately!
        loadSong(newSongId);
        playSong();
    });

    // Submit Audio Stream URL Song
    submitUrlSongBtn.addEventListener('click', () => {
        const src = urlSongSrcInput.value.trim();
        const title = urlSongTitleInput.value.trim();
        const artist = urlSongArtistInput.value.trim();
        const img = urlSongImgInput.value.trim() || "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&q=80";

        if (!src || !title) {
            alert("Please enter both Song Stream URL and Title!");
            return;
        }

        const newSongId = songs.length;
        const newSong = {
            id: newSongId,
            title: title,
            artist: artist || "Web Stream Song",
            img: img,
            src: src
        };

        songs.push(newSong);
        addSongCardToLibrary(newSong);

        // Reset modal form
        urlSongSrcInput.value = "";
        urlSongTitleInput.value = "";
        urlSongArtistInput.value = "";
        urlSongImgInput.value = "";
        closeModal();

        // Load & Play
        loadSong(newSongId);
        playSong();
    });

    // Inject New Song Card into Library UI
    function addSongCardToLibrary(song) {
        const emptyMsg = userSongsContainer.querySelector('.empty-lib-msg');
        if (emptyMsg) emptyMsg.remove();

        const card = document.createElement('div');
        card.className = 'card';
        card.setAttribute('data-song', song.id);
        card.innerHTML = `
            <div class="card-img-wrapper">
                <img src="${song.img}" class="card-img" alt="${song.title}">
                <button class="card-play-btn"><i class="fa-solid fa-play"></i></button>
            </div>
            <p class="card-title">${song.title}</p>
            <p class="card-info">${song.artist}</p>
        `;

        userSongsContainer.appendChild(card);
        attachCardEvents();
    }

    // ----------------------------------------------------------------------
    // Standard Audio Controls & Listeners
    // ----------------------------------------------------------------------

    playPauseBtn.addEventListener('click', togglePlay);
    prevBtn.addEventListener('click', prevSong);
    nextBtn.addEventListener('click', nextSong);

    shuffleBtn.addEventListener('click', () => {
        isShuffle = !isShuffle;
        shuffleBtn.classList.toggle('active', isShuffle);
    });

    repeatBtn.addEventListener('click', () => {
        isRepeat = !isRepeat;
        repeatBtn.classList.toggle('active', isRepeat);
    });

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', () => {
        if (isRepeat) {
            audio.currentTime = 0;
            playSong();
        } else {
            nextSong();
        }
    });

    seekBar.addEventListener('input', setSeek);
    volumeBar.addEventListener('input', setVolume);
    volumeIcon.addEventListener('click', toggleMute);

    likeBtn.addEventListener('click', () => {
        likeBtn.classList.toggle('liked');
        const icon = likeBtn.querySelector('i');
        if (likeBtn.classList.contains('liked')) {
            icon.className = 'fa-solid fa-heart';
        } else {
            icon.className = 'fa-regular fa-heart';
        }
    });

    // Filter Pills Logic
    pills.forEach(pill => {
        pill.addEventListener('click', () => {
            pills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');

            const filter = pill.getAttribute('data-filter');
            const sections = document.querySelectorAll('.content-section, .hero-section');

            sections.forEach(sec => {
                if (filter === 'all' || filter === 'music') {
                    sec.style.display = 'block';
                } else if (filter === 'podcasts') {
                    sec.style.display = sec.classList.contains('hero-section') ? 'none' : 'block';
                }
            });
        });
    });

    // Initial Load
    loadSong(0);
    updateSliderFill(volumeBar, 80);
    attachCardEvents();
});
