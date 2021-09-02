const music = document.querySelector("audio");
const img = document.querySelector('img');
const play = document.getElementById('play');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const previ = document.getElementById('previ');
const next = document.getElementById('next');
const current = document.getElementById('current');
let total_duration = document.getElementById('duration');
const prog_div = document.getElementById('prog_div');

let progress = document.getElementById('progress');

const songs = [{
    name: "Blue Eyes",
    title: "Blue Eyes",
    artist: "Honey singh",
},
{
    name: "Chogada",
    title: "Chogada",
    artist: "Darshan Raval",
},
{
    name: "Closer Kabira",
    title: "Closer Kabira",
    artist: "Vidya Vox",
},
{
    name: "Dharia",
    title: "Dharia",
    artist: "Sugar and Brownies",
},
{
    name: "Faded",
    title: "Faded",
    artist: "Alan Walker",
},
{
    name: "Paniyon Sa",
    title: "Paniyon Sa",
    artist: "Atif Aslam",
},
{
    name: "Tu Jaane Na",
    title: "Tu Jaane Na",
    artist: "Atif Aslam",
}]

let isPlaying = false;

//for play
const playMusic= () => {
    isPlaying = true;
    music.play();
    play.classList.replace('fa-play', 'fa-pause');
    img.classList.add('animation');   
};
//for pause
const pauseMusic = () => {
    isPlaying = false;
    music.pause();
    play.classList.replace("fa-pause" , "fa-play");
    img.classList.remove('animation');   
};

play.addEventListener("click" , () => {
    
    isPlaying ? pauseMusic() : playMusic();

});

//change

const loadSong = (songs) =>{
    title.textContent = songs.title;
    artist.textContent = songs.artist;
    artist.textContent = songs.artist;
    music.src = "music/" +songs.name + ".mp3";
    img.src = "images/" +songs.name + ".jpg";
}

songIndex = 0;
// loadSong(songs[2]);

const nextSong = () => {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songs[songIndex]);
    playMusic();
}

const previSong = () => {
    
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songs[songIndex]);
    playMusic();
}

//progress

music.addEventListener('timeupdate', (event)  => {
    const { currentTime, duration }  = event.srcElement;
    let progress_time = (currentTime / duration) * 100;
    progress.style.width = `${progress_time}%`;

    // music duration update

    let min_duration = Math.floor(duration / 60);
    let sec_duration = Math.floor(duration % 60);

    let tot_duration = `${min_duration}:${sec_duration}`;
    if(duration){

        total_duration.textContent = `${tot_duration}`; 
    }

    // current duration update

    let min_currentTime = Math.floor(currentTime / 60);
    let sec_currentTime = Math.floor(currentTime % 60);

    if(sec_currentTime < 10){
        sec_currentTime = `0${sec_currentTime}`
    }
    let tot_currentTime = `${min_currentTime}:${sec_currentTime}`;
    current.textContent = `${tot_currentTime}`; 


});

prog_div.addEventListener('click' , (event) => {
    const {duration} = music;
    let move_progress = (event.offsetX / event.srcElement.clientWidth) * duration;

    music.currentTime = move_progress;


});

music.addEventListener('ended', nextSong);

next.addEventListener("click", nextSong);
previ.addEventListener("click", previSong);




