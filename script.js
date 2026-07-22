const page1 = document.getElementById("page1");
const page2 = document.getElementById("page2");
const page3 = document.getElementById("page3");
const page4 = document.getElementById("page4");
const page5 = document.getElementById("page5");
const page6 = document.getElementById("page6");
const page7 = document.getElementById("page7");
const page8 = document.getElementById("page8");

const startButton = document.getElementById("startButton");
const nextButton = document.getElementById("nextButton");
const videosButton = document.getElementById("videosButton");
const playVideoButton = document.getElementById("playVideoButton");
const surprisesButton = document.getElementById("surprisesButton");
const backButton = document.getElementById("backButton");
const memoryButton = document.getElementById("memoryButton");
const goToPhotos = document.getElementById("goToPhotos");
const backToSurprisesPage = document.getElementById("backToSurprisesPage");
const backgroundMusic = document.getElementById("backgroundMusic");
const introVideo = document.getElementById("introVideo");
const hourVideo = document.getElementById("hourVideo");
const memoryVideo = document.getElementById("memoryVideo");
const isPhone = window.matchMedia(
    "(pointer: coarse) and (max-width: 768px)"
).matches;

introVideo.controls = isPhone;
hourVideo.controls = isPhone;

const skipIntroButton =
document.getElementById("skipIntroButton");
skipIntroButton.onclick = () => {

    introVideo.pause();

    page4.classList.add("hidden");
    page5.classList.remove("hidden");

    backgroundMusic.play().catch(()=>{});
};
 
const backToFinalVideo =
    document.getElementById("backToFinalVideo");
const videoHourTitle = document.getElementById("videoHourTitle");
const videoMessage = document.getElementById("videoMessage");
const backToPage1 = document.getElementById("backToPage1");
const backToPage2 = document.getElementById("backToPage2");
const backToPage3 = document.getElementById("backToPage3");
const backToPage4 = document.getElementById("backToPage4");

const hourMessages = {
    "08:00": "❤️ Bună dimineața! Prima surpriză a zilei te așteaptă.",
    "08:30": "☀️ Ziua ta specială abia începe, iar noi avem multe surprize pentru tine.",
    "09:00": "😊 Sperăm că ai început această zi cu zâmbetul pe buze.",
    "09:30": "❤️ Încă un mesaj pregătit cu multă dragoste pentru tine.",
    "10:00": "🎁 Surprizele continuă! Bucură-te de fiecare moment.",
    "11:00": "🥰 O persoană dragă are ceva special să-ți spună.",
    "12:00": "❤️ Continuăm aventura acestei zile împreună.",
    "13:00": "🎉 Încă o surpriză din suflet, doar pentru tine.",
    "14:00": "🥳 Ziua continuă, iar surprizele la fel.",
    "15:00": "❤️ Îți mulțumim că faci parte din viețile noastre.",
    "16:00": "🎁 Un nou mesaj special te așteaptă.",
    "17:00": "😊 Sperăm că această zi îți aduce multe zâmbete.",
    "18:00": "❤️ Mai avem încă multe lucruri frumoase să-ți spunem.",
    "19:00": "🎉 Seara începe, dar surprizele nu s-au terminat.",
    "20:00": "❤️ O nouă surpriză pregătită din tot sufletul.",
    "21:00": "🥂 Ziua ta specială se apropie de final.",
    "21:30": "✨ Mai este puțin, dar încă mai avem o surpriză pentru tine.",
    "22:00": "❤️ Aproape de finalul acestei aventuri pline de iubire.",
    "23:00": "❤️ Ultima surpriză a zilei tale... Te iubesc tati!."
};

// PAGINI

startButton.onclick = () => {
    page1.classList.add("hidden");
    page2.classList.remove("hidden");
    backgroundMusic.volume = 0.08;
backgroundMusic.play().catch(()=>{});
};

nextButton.onclick = () => {
    page2.classList.add("hidden");
    page3.classList.remove("hidden");
};

videosButton.onclick = () => {
    page3.classList.add("hidden");
    page4.classList.remove("hidden");
    backgroundMusic.volume = 0.08;
backgroundMusic.play().catch(() => {});
};

// VIDEO INTRO

introVideo.onclick = async () => {

    const title = document.querySelector(".videoIntroTitle");
    const customControls = document.querySelector(".controls");

    title.style.display = "none";

    backgroundMusic.pause();

    introVideo.currentTime = 0;

    if (isPhone) {
        introVideo.controls = true;
        customControls.style.display = "none";
    } else {
        introVideo.controls = false;
        customControls.style.display = "flex";
    }

    try{
        await introVideo.play();
        playPause.innerHTML="⏸️";
    }catch(e){}
};

introVideo.onended = () => {
    backgroundMusic.play().catch(() => {});
    playPause.innerHTML = "▶️";
    surprisesButton.style.display = "inline-block";
};

introVideo.onerror = () => {
    console.error(
        "Eroare intro:",
        introVideo.error,
        introVideo.currentSrc
    );
};
// MERGI LA SURPRIZE

surprisesButton.onclick = () => {
    introVideo.pause();

    page4.classList.add("hidden");
    page5.classList.remove("hidden");

    backgroundMusic.play().catch(() => {});
};
// VIDEO PE ORE

document.querySelectorAll(".hour").forEach(button => {
    button.onclick = async () => {
        if (button.disabled) return;

        page5.classList.add("hidden");
        page6.classList.remove("hidden");

        videoHourTitle.innerText = button.dataset.time;
        videoMessage.innerText =
            hourMessages[button.dataset.time] || "";

        backgroundMusic.pause();

        hourVideo.pause();
        hourVideo.currentTime = 0;

        /*
        Fișierele 01.mp4, 02.mp4 etc. trebuie să fie
        în același folder cu index.html.
        */
        hourVideo.src = "videos/" + button.dataset.video;
        hourVideo.load();

        try {
            await hourVideo.play();
            playPauseHour.innerHTML = "⏸️";
        } catch (error) {
            console.error(
                "Videoclipul nu poate porni:",
                button.dataset.video,
                error
            );

            alert(
                "Nu s-a putut deschide " +
                button.dataset.video
            );
        }
    };
});

hourVideo.onended = () => {
    playPauseHour.innerHTML = "▶️";
    backgroundMusic.play().catch(() => {});
};

hourVideo.onerror = () => {
    console.error(
        "Eroare video:",
        hourVideo.error,
        hourVideo.currentSrc
    );
};

// ÎNAPOI

backButton.onclick = () => {

    hourVideo.pause();
    backgroundMusic.play().catch(()=>{});

    page6.classList.add("hidden");
    page5.classList.remove("hidden");

};

// ÎNAPOI PAGINA 2 -> 1
backToPage1.onclick = () => {

    page2.classList.add("hidden");
    page1.classList.remove("hidden");

};

// ÎNAPOI PAGINA 3 -> 2
backToPage2.onclick = () => {

    page3.classList.add("hidden");
    page2.classList.remove("hidden");

};

// ÎNAPOI PAGINA 4 -> 3
backToPage3.onclick = () => {

    introVideo.pause();
    introVideo.currentTime = 0;

    page4.classList.add("hidden");
    page3.classList.remove("hidden");

};

// ÎNAPOI PAGINA 5 -> 4
backToPage4.onclick = () => {

    page5.classList.add("hidden");
    page4.classList.remove("hidden");

};

// ===============================
// Deblocarea videoclipurilor
// ===============================

function updateHours() {

    const now = new Date();

    const eventDate = new Date(2026, 6, 24
    ); // 24 iulie 2026

    const isEventDay =
        now.getFullYear() === eventDate.getFullYear() &&
        now.getMonth() === eventDate.getMonth() &&
        now.getDate() === eventDate.getDate();

    document.querySelectorAll(".hour").forEach(button => {

        const hourText = button.dataset.time;

        // Înainte de 24 iulie -> toate deschise
        if (now < eventDate) {

            button.disabled = false;

            if (button.classList.contains("last")) {

                button.innerHTML = `
                    23:00 ❤️
                    <br>
                    <small>Ultima oră din ziua ta, o vom dansa ❤️</small>
                `;

            } else {

                button.innerHTML = hourText + " 🎁";

            }

            return;
        }

        // După 24 iulie -> toate deschise
        if (!isEventDay && now > eventDate) {

            button.disabled = false;

            if (button.classList.contains("last")) {

                button.innerHTML = `
                    23:00 ❤️
                    <br>
                    <small>Ultima oră din ziua ta, o vom dansa ❤️</small>
                `;

            } else {

                button.innerHTML = hourText + " 🎁";

            }

            return;
        }

        // Doar pe 24 iulie
        const [hour, minute] = hourText.split(":");

        const unlockMinutes = Number(hour) * 60 + Number(minute);

        const currentMinutes = now.getHours() * 60 + now.getMinutes();

        if (currentMinutes >= unlockMinutes) {

            button.disabled = false;

            if (button.classList.contains("last")) {

                button.innerHTML = `
                    23:00 ❤️
                    <br>
                    <small>Ultima oră din ziua ta, o vom dansa ❤️</small>
                `;

            } else {

                button.innerHTML = hourText + " 🎁";

            }

        } else {

            button.disabled = true;

            if (button.classList.contains("last")) {

                button.innerHTML = `
                    23:00 🔒
                    <br>
                    <small>Ultima oră din ziua ta, o vom dansa ❤️</small>
                `;

            } else {

                button.innerHTML = hourText + " 🔒";

            }

        }

    });

}

updateHours();

setInterval(updateHours, 60000);


// =========================
// PLAYER VIDEO PE ORE
// =========================

const playPauseHour = document.getElementById("playPauseHour");
const back10Hour = document.getElementById("back10Hour");
const forward10Hour = document.getElementById("forward10Hour");
const progressHour = document.getElementById("progressHour");
const fullscreenHour = document.getElementById("fullscreenHour");
const volumeHour = document.getElementById("volumeHour");
const timeDisplayHour = document.getElementById("timeDisplayHour");



volumeHour.addEventListener("input", () => {

    hourVideo.volume = volumeHour.value;

});


// Play / Pause
playPauseHour.onclick = () => {

    if (hourVideo.paused) {

        hourVideo.play();
        playPauseHour.innerHTML = "⏸️";

    } else {

        hourVideo.pause();
        playPauseHour.innerHTML = "▶️";

    }

};

// Înapoi 10 secunde
back10Hour.onclick = () => {

    hourVideo.currentTime = Math.max(0, hourVideo.currentTime - 10);

};

// Înainte 10 secunde
forward10Hour.onclick = () => {

    hourVideo.currentTime = Math.min(hourVideo.duration, hourVideo.currentTime + 10);

};

// Actualizare bară progres

hourVideo.addEventListener("timeupdate", () => {

    if (timeDisplayHour) {
        timeDisplayHour.innerHTML =
`${formatTime(hourVideo.currentTime)} / ${formatTime(hourVideo.duration)}`;
    }

    progressHour.max = hourVideo.duration || 0;
    progressHour.value = hourVideo.currentTime;

});

// Derulare cu bara
progressHour.addEventListener("input", () => {

    hourVideo.currentTime = progressHour.value;

});

// Fullscreen
fullscreenHour.onclick = () => {

    if (hourVideo.requestFullscreen) {

        hourVideo.requestFullscreen();

    }

};

function formatTime(seconds){

    if(isNaN(seconds)) return "00:00";

    const min = Math.floor(seconds/60);
    const sec = Math.floor(seconds%60);

    return `${String(min).padStart(2,"0")}:${String(sec).padStart(2,"0")}`;

}

// =========================
// PLAYER PERSONALIZAT INTRO
// =========================

const playPause = document.getElementById("playPause");
const back10 = document.getElementById("back10");
const forward10 = document.getElementById("forward10");
const progress = document.getElementById("progress");
const fullscreen = document.getElementById("fullscreen");
const volume = document.getElementById("volume");
const timeDisplay = document.getElementById("timeDisplay");


volume.addEventListener("input", () => {

    introVideo.volume = volume.value;

});


// Play / Pause
playPause.onclick = () => {

    if (introVideo.paused) {

        introVideo.play();
        playPause.innerHTML = "⏸️";

    } else {

        introVideo.pause();
        playPause.innerHTML = "▶️";

    }

};

// Înapoi 10 secunde
back10.onclick = () => {

    introVideo.currentTime = Math.max(0, introVideo.currentTime - 10);

};

// Înainte 10 secunde
forward10.onclick = () => {

    introVideo.currentTime = Math.min(introVideo.duration, introVideo.currentTime + 10);

};

// Actualizare bară progres
introVideo.addEventListener("timeupdate", () => {

    if (timeDisplay) {
        timeDisplay.innerHTML =
`${formatTime(introVideo.currentTime)} / ${formatTime(introVideo.duration)}`;
    }

    progress.max = introVideo.duration || 0;
    progress.value = introVideo.currentTime;

});

// Derulare cu bara
progress.addEventListener("input", () => {

    introVideo.currentTime = progress.value;

});

// Fullscreen
fullscreen.onclick = () => {

    if (introVideo.requestFullscreen) {

        introVideo.requestFullscreen();

    }

};
// =========================
// INIMI PLUTITOARE
// =========================

const hearts = document.querySelector(".hearts");

for(let i = 0; i < 12; i++){

    const heart = document.createElement("div");

    heart.className = "heart";

    heart.innerHTML = "❤️";

    heart.style.left = Math.random()*100 + "%";

    heart.style.fontSize = (18 + Math.random()*28) + "px";

    heart.style.animationDuration = (10 + Math.random()*10) + "s";

    heart.style.animationDelay = (Math.random()*10) + "s";

    hearts.appendChild(heart);

}

// =========================
// INIMI TITLU
// =========================

const titleContainer = document.querySelector(".titleContainer");

for(let i=0;i<3;i++){

    const heart = document.createElement("div");

    heart.className="titleHeart";

    heart.innerHTML="💖";

    heart.style.fontSize=(18+Math.random()*12)+"px";

    titleContainer.appendChild(heart);

}
// ===============================
// VIDEOCLIP SPECIAL - PAGINA 7
// ===============================

memoryButton.addEventListener("click", () => {

    page5.classList.add("hidden");
    page7.classList.remove("hidden");

    backgroundMusic.pause();

    memoryVideo.pause();
    memoryVideo.src = "./videos/final.mp4";
    memoryVideo.load();
});

memoryVideo.addEventListener("click", async () => {

    try {

        if (memoryVideo.paused) {

            backgroundMusic.pause();
            await memoryVideo.play();

        } else {

            memoryVideo.pause();

        }

    } catch (error) {

        console.error("Eroare video special:", error);
        console.error("Adresă încercată:", memoryVideo.currentSrc);
        console.error("Cod eroare:", memoryVideo.error);

        alert(
            "Videoclipul nu poate fi redat. Verifică numele, locația și formatul fișierului final.mp4."
        );
    }
});

memoryVideo.addEventListener("ended", () => {

    backgroundMusic.volume = 0.08;
    backgroundMusic.play().catch(() => {});
});

memoryButton.onclick = () => {

    page5.classList.add("hidden");
    page7.classList.remove("hidden");

    backgroundMusic.pause();

    memoryVideo.pause();
    memoryVideo.src = "videos/final.mp4";
    memoryVideo.load();
};

backToSurprisesPage.addEventListener("click", () => {

    memoryVideo.pause();
    memoryVideo.removeAttribute("src");
    memoryVideo.load();

    page7.classList.add("hidden");
    page5.classList.remove("hidden");

    backgroundMusic.volume = 0.08;
    backgroundMusic.play().catch(() => {});
});

goToPhotos.onclick = () => {

    memoryVideo.pause();

    page7.classList.add("hidden");
    page8.classList.remove("hidden");

    backgroundMusic.volume = 0.08;
    backgroundMusic.play().catch(() => {});
};

backToFinalVideo.onclick = () => {

    page8.classList.add("hidden");
    page7.classList.remove("hidden");

    backgroundMusic.pause();
};

backToFinalVideo.onclick = () => {

    page8.classList.add("hidden");
    page7.classList.remove("hidden");

    backgroundMusic.pause();
};