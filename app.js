const song = document.getElementById('song');
const playBtn = document.querySelector('.player-inner');
const prevBtn = document.querySelector('.play-back');
const nextBtn = document.querySelector('.play-forward');
const durationTime = document.querySelector('.duration');
const remainingTime = document.querySelector('.remaining');
const rangeBar = document.querySelector('.range');
const musicName = document.querySelector('.music-name');
const musicThumb= document.querySelector('.music-thumb');
const musicImage = document.querySelector('.music-thumb img');
const playRepeat = document.querySelector('.play-repeat');

//Range
rangeBar.addEventListener('change',  handleChangeBar);
function handleChangeBar() {
    song.currentTime = rangeBar.value;
}

//Timer
function displayTimer() {
    const {duration, currentTime} = song;
    rangeBar.max = duration;
    rangeBar.value = currentTime;
    remainingTime.textContent = formatTimer(currentTime);
    if (!duration) {
        durationTime.textContent = '00:00';
    } else {
        durationTime.textContent = formatTimer(duration);
    }
}
    //+ Format Timer
function formatTimer(number) {
    const minutes = Math.floor(number / 60);
    const seconds = Math.floor(number - minutes * 60)
    return `${minutes < 10 ? '0' + minutes : minutes}: ${seconds < 10 ? '0' + seconds : seconds}`;
}

/*Play/Pause*/
let timer;
let isPlaying = true;
playBtn.addEventListener('click', playPause);
function playPause() {
    if (isPlaying) {
        song.play();
        musicThumb.classList.add('is-playing');
        playBtn.innerHTML = '<ion-icon name="pause-circle"></ion-icon>';
        isPlaying = false;
        timer = setInterval(displayTimer, 500);
    }  else {
        song.pause();
        musicThumb.classList.remove('is-playing');
        playBtn.innerHTML = ' <ion-icon name="play"></ion-icon>';
        isPlaying = true;
        clearInterval(timer);
    }  
}

/*Pre/Next*/
// const musics = ['running.mp3', 'future.mp3', 'oneday.mp3']
let indexSong = 0;
prevBtn.addEventListener('click', function() {
    changeSong(-1);
});
nextBtn.addEventListener('click', function() {
    changeSong(1);
});
song.addEventListener('ended', handleEndedSong);
function handleEndedSong() {
    repeatCount ++;
    if (isRepeat && repeatCount === 1) {
        isPlaying = true;
        playPause();
    } else {
        changeSong(1);
    }
}
function changeSong(dir) {
    if (dir === -1) {
        //Prev song
        indexSong--;
        if (indexSong < 0) {
            indexSong = musics.length - 1;
        }
        isPlaying = true;
    }
    if (dir === 1) {
        //Next song
        indexSong++;
        if (indexSong >= musics.length) {
            indexSong = 0;
        }
        isPlaying = true;
    }
    init(indexSong);
    // song.setAttribute('src', `./Music/${musics[indexSong].file}`);
    playPause();
}

//Repeat
let isRepeat = false;
let repeatCount = 0;
playRepeat.addEventListener('click', function() {
    if(isRepeat) {
        isRepeat = false;
        playRepeat.removeAttribute('style');
    } else {
        isRepeat = true;
        playRepeat.style.color = '#ffb86c';
    }
}) 

//Object Constructor
const musics = [
    { 
        id: 1,
        title: 'Running',
        file: 'running.mp3',
        image: 'https://go-korea.com/wp-content/uploads/2020/12/Start-Up-CP1-716x1024.jpg'
    },
    { 
        id: 2,
        title: 'Future',
        file: 'future.mp3',
        image: 'https://go-korea.com/wp-content/uploads/2020/12/start-up-696x995-1.jpg'
    },
    { 
        id: 3,
        title: 'One day',
        file: 'oneday.mp3',
        image: 'https://www.elle.vn/wp-content/uploads/2020/10/28/421200/Suzy-mac-trang-phuc-cong-so-trong-phim-start-up.jpg'
    },
]
function init(indexSong) {
    displayTimer();
    song.setAttribute('src', `./Music/${musics[indexSong].file}`);
    musicImage.setAttribute('src', musics[indexSong].image);
    musicName.textContent = musics[indexSong].title;
}
init(indexSong);

