let audio;

const play_btn = document.getElementById('playBtn')
const track_name = document.getElementById('trackName')
const volume_inp = document.getElementById('volumeInp')
const logo = document.getElementById('logo')
const listeners_label = document.getElementById('listeners')
const menu_btn = document.getElementById('lines_menu')
const nav = document.getElementById('nav')
const nav_links = document.body.querySelectorAll('#nav_link')

const copyright_text = document.getElementById('contribution-tratemark-text')

const date = new Date

copyright_text.textContent = `©${date.getFullYear()} Усі права захищені`

menu_btn.onclick = function() {
    if (nav.style.display == 'flex') {
        nav.style.display = ''
        menu_btn.style.position = ''
    } else {
        nav.style.display = 'flex'
        menu_btn.style.position = 'fixed'

        for (let i=0;i <= nav_links.length - 1; i ++) {
            nav_links[i].onclick = function() {
                nav.style.display = ''
                menu_btn.style.position = ''
            }
        }
    }
}

play_btn.onclick = function () {
    let sound = new Audio('./sound/switch.mp3')

    sound.play()

    if (!audio) {
        axios.get('https://complex.in.ua/status-json.xsl?mount=/yantarne')
            .then(response => {
                audio = new Audio(response.data.icestats.source.listenurl);
                audio.play();
                isPlaying = true;
                play_btn.innerHTML = '<i class="fa-solid fa-pause"></i>';

                if (localStorage.getItem('volume')) {
                    audio.volume = localStorage.getItem('volume')
                } else {
                    audio.volume = 0.5
                }
            })
    } else {
        if (isPlaying) {
            audio.pause()
            isPlaying = false
            play_btn.innerHTML = '<i class="fa-solid fa-play"></i>';
        } else {
            audio.play()
            isPlaying = true
            play_btn.innerHTML = '<i class="fa-solid fa-pause"></i>';
        }
    }

}

function SetVolume(volume) {
    if (audio){
        localStorage.setItem('volume',volume)
        audio.volume = volume

    }
}

volume_inp.value = localStorage.getItem('volume')

volume_inp.addEventListener('input',()=> {
    SetVolume(volume_inp.value)
})

logo.onclick = function() {
    window.open('https://yantarne.fm/')
}

function UpdateLyric() {
    axios.get('https://complex.in.ua/status-json.xsl?mount=/yantarne')
        .then(response => {
            listeners_label.innerHTML = '<i class="fa-solid fa-headphones"> ' + response.data.icestats.source.listeners
            track_name.innerHTML = response.data.icestats.source.title
        })
}

UpdateLyric()
setInterval(UpdateLyric, 1000)