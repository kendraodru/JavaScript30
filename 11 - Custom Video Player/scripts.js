// get our elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress')
const progressBar = player.querySelector('.progress__filled')

const toggle = player.querySelector('.toggle')
const skipButtons = player.querySelectorAll('[data-skip]')
const ranges = player.querySelectorAll('.player__slider')


//build functions
function togglePlay(){
    if (video.paused){
        video.play()
    }else{
        video.pause() 
    }
}

function updateButton(){
    const icon = this.paused ? "►" : "❚ ❚";
    toggle.textContent = icon;
}

function skip(){
    console.log(this.dataset["skip"])
    video.currentTime += parseFloat(this.dataset.skip)
}

function handleRangeUpdate(){
    console.log(this.value)
    video[this.name] = this.value;
}

function handleProgress(){
    const percent = (video.currentTime / video.duration)*100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e){
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration
    video.currentTime = scrubTime;
}

//hook up event listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);

skipButtons.forEach(btn=> btn.addEventListener('click', skip))

let rangeMouseDown = true
ranges.forEach(slider => slider.addEventListener('change', handleRangeUpdate))
ranges.forEach(slider => slider.addEventListener('mousemove', handleRangeUpdate))

let mouseDown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mouseDown && scrub(e))
//if mouseDown is true will more on to scrub, if not will return false and wont run scrub
progress.addEventListener('mousedown',()=> mouseDown = true)
progress.addEventListener('mouseup', ()=>mouseDown = false)


