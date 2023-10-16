console.log("Hellow world");

// Variables
let index = 0;
let songs = [
    { songname: 'حسین ہے دنیا', filepath: '1.mp3', coverpath: 'cover.jpeg' },
    { songname: 'حسین ہو تم', filepath: '2.mp3', coverpath: '2.jpeg' },
    { songname: 'غم عشق', filepath: '3.mp3', coverpath: '3.jpeg' },
    { songname: 'کیسی ہے دنیا', filepath: '4.mp3', coverpath: '4.jpeg' },
    { songname: 'کچھ تو ہوا ہے', filepath: '5.mp3', coverpath: '5.jpeg' },
    { songname: 'کیا چا ہیے', filepath: '6.mp3', coverpath: '6.jpeg' },

]
let audioelement = new Audio('1.mp3');
let masterplay = document.getElementById("masterplay");
let progressbar = document.getElementById('progressbar');
let gif = document.getElementById('gif');
let songitems = Array.from(document.getElementsByClassName('songitem'));
// for (let i = 0; i < songitems.length; i++) {
//     const songItem = songitems[i];
//     console.log(songitems[i]);
//   }
let mastersongname = document.getElementById("mastersongname");

//changing covers and names using JavaScript
songitems.forEach((element, i) => {
    // console.log(element,i);
    element.getElementsByTagName('img').src = songs[i].coverpath;
    element.getElementsByClassName('covername').innerText = songs[i].songname;
})

// Handling play

masterplay.addEventListener('click', () => {
    if (audioelement.paused || audioelement.currentTime == 0) {
        audioelement.play();
        masterplay.classList.remove('fa-circle-play');
        masterplay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;

        audioelement.addEventListener('playing',event=>{
            const currentsong=event.target.currentSrc;
            const p=currentsong.slice(38,39);
            const d =document.getElementById(p);
            d.classList.remove('fa-circle-play');
            d.classList.add('fa-circle-pause');
         }) 
    }
    else {
        audioelement.pause();
        masterplay.classList.remove('fa-circle-pause');
        masterplay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
        audioelement.addEventListener('pause',event=>{
            const currentsong=event.target.currentSrc;
            const p=currentsong.slice(38,39);
            const d =document.getElementById(p);
            d.classList.remove('fa-circle-pause');
            d.classList.add('fa-circle-play');
         })
    }
})

// ProgressBar

audioelement.addEventListener('timeupdate', () => {
    let progress = parseInt((audioelement.currentTime / audioelement.duration) * 100);
    progressbar.value = progress;
    
    if (progress == 100) {
        masterplay.classList.remove('fa-circle-pause');
        masterplay.classList.add('fa-circle-play');
    }
})

progressbar.addEventListener('change', () => {

    audioelement.currentTime = progressbar.value * audioelement.duration / 100;
})


const runoneattime = () => {

    Array.from(document.getElementsByClassName('songitemplay')).forEach((element) => {
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}

//managing play and pause on song items
Array.from(document.getElementsByClassName('songitemplay')).forEach((element) => {

    element.addEventListener('click', (e) => {
        runoneattime();
        index = parseInt(e.target.id);
        if (audioelement.paused || audioelement.currentTime == 0) {
            e.target.classList.remove('fa-circle-play');
            e.target.classList.add('fa-circle-pause');
            audioelement.src = `${index}.mp3`;
            mastersongname.innerText = songs[index - 1].songname;
            audioelement.currentTime = 0;
            audioelement.play();
            masterplay.classList.remove('fa-circle-play');
            masterplay.classList.add('fa-circle-pause');
        }
        else {
            e.target.classList.remove('fa-circle-pause');
            e.target.classList.add('fa-circle-play');
            audioelement.src = `${index}.mp3`;
            mastersongname.innerText = songs[index - 1].songname;
            audioelement.currentTime = 0;
            audioelement.pause();
            masterplay.classList.remove('fa-circle-pause');
            masterplay.classList.add('fa-circle-play');
        }
    })

})


document.getElementById('previous').addEventListener('click', () => {
    if (index <= 1) {
        index = 1;
    }
    else {
        index = index - 1;
    }
    audioelement.src = `${index}.mp3`;
    mastersongname.innerText = songs[index - 1].songname;
    audioelement.currentTime = 0;
    audioelement.play();
    masterplay.classList.remove('fa-circle-play');
    masterplay.classList.add('fa-circle-pause');
    audioelement.addEventListener('playing',event=>{
        const currentsong=event.target.currentSrc;
        let p=currentsong.slice(38,39);
        p=parseInt(p);
        p=p+1;
        console.log(p);
        const d =document.getElementById(p);
        d.classList.remove('fa-circle-pause');
        d.classList.add('fa-circle-play');
       
     })

})

document.getElementById('next').addEventListener('click', () => {
    if (index >= 6) {
        index = 1;
    }
    else {
        index = index + 1;
    }
    audioelement.src = `${index}.mp3`;
    mastersongname.innerText = songs[index - 1].songname;
    audioelement.currentTime = 0;
    audioelement.play();
    masterplay.classList.remove('fa-circle-play');
    masterplay.classList.add('fa-circle-pause');
    audioelement.addEventListener('playing',event=>{
        const currentsong=event.target.currentSrc;
        const p=currentsong.slice(38,39);
        if(p==1)
        {
         
            const d =document.getElementById(6);
            d.classList.remove('fa-circle-pause');
            d.classList.add('fa-circle-play');
        }
        else
        {
        const d =document.getElementById(p-1);
        d.classList.remove('fa-circle-pause');
        d.classList.add('fa-circle-play');
        }
        
     })

})


