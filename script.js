"use strict";

/* ===========================================
   ONE REEL LATER ❤️
   SCRIPT.JS - ENHANCED WITH MOBILE SUPPORT
===========================================*/

/* -------------------------
   DOM ELEMENTS
--------------------------*/

const pages = [...document.querySelectorAll(".page")];
const bgMusic = document.getElementById("bgMusic");
const loadingScreen = document.getElementById("loadingScreen");

const passwordInput = document.getElementById("passwordInput");
const unlockBtn = document.getElementById("unlockBtn");
const passwordError = document.getElementById("passwordError");

const introNext = document.getElementById("introNext");

const reasonCard = document.getElementById("reasonCard");
const reasonText = document.getElementById("reasonText");
const reasonNumber = document.getElementById("reasonNumber");
const finishReasons = document.getElementById("finishReasons");

const typewriter = document.getElementById("typewriter");
const letterNext = document.getElementById("letterNext");

const heartContainer = document.getElementById("heartContainer");

/* -------------------------
   VARIABLES
--------------------------*/

let currentPage = 0;
let reasonIndex = 0;
let typingFinished = false;
let musicStarted = false;

/* -------------------------
   PASSWORD
--------------------------*/

const PASSWORDS = [
    "aishu",
    "aishwarya",
    "aish",
    "aishu❤️"
];

/* -------------------------
   20 LOVE NOTES
--------------------------*/

const reasons = [
    "The way you make me laugh.",
    "Your voice.",
    "Your smile fixes everything.",
    "You imitate me in the cutest way.",
    "You make ordinary days exciting.",
    "You listen to me patiently.",
    "Your sense of humor.",
    "You're effortlessly understand me(sometimes).",
    "The way you care.",
    "Your pichukala goodu.",
    "You make me blush.",
    "You respect me.",
    "You make distance feel smaller.",
    "You only talk once in a day.",
    "You calm my overthinking.",
    "You're my comfort person.",
    "You never stop making me smile.",
    "You came into my life unexpectedly.",
    "You make love feel easy.",
    "Because you're jonathon. ❤️"
];

/* -------------------------
   LETTER
--------------------------*/

const letter = `
Happy Birthday, Jonathan ❤️

I honestly never imagined that
one random reel would become
the beginning of something so special.

Thank you for every laugh,
every late-night conversation,
every smile you unknowingly gave me,
and every moment that became
a memory I never want to lose.

I hope this birthday brings you
as much happiness as you bring
into my life.

I can't promise life will always
be perfect...

But I promise that whenever I can,
I'll always choose you.

Happy 20th Birthday.

I love you.

— Aishu ❤️
`;

/* -------------------------
   PAGE NAVIGATION
--------------------------*/

function showPage(index) {
    if (index < 0 || index >= pages.length) return;

    // Remove active from all pages
    pages.forEach(page => {
        page.classList.remove("active");
    });

    // Add active to target page
    pages[index].classList.add("active");
    currentPage = index;

    // Scroll to top on mobile
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 100);
}

/* -------------------------
   NEXT BUTTONS
--------------------------*/

document.querySelectorAll(".nextBtn").forEach((button) => {
    button.addEventListener("click", handleNextClick);
    // Mobile touch support
    button.addEventListener("touchend", handleNextClick);
});

function handleNextClick(e) {
    e.preventDefault();
    
    const button = e.currentTarget;
    
    // Skip special buttons that have their own handlers
    if (button.id === "finishReasons") {
        showPage(currentPage + 1);
        return;
    }
    
    if (button.id === "letterNext") {
        if (!typingFinished) {
            typewriter.textContent = letter;
            typingFinished = true;
            typingStarted = true;
            return;
        }
        showPage(currentPage + 1);
        return;
    }
    
    // Normal next button - go to next page
    showPage(currentPage + 1);
}

/* -------------------------
   INTRO BUTTON
--------------------------*/

introNext.addEventListener("click", () => {
    showPage(1);
});

introNext.addEventListener("touchend", () => {
    showPage(1);
});

/* -------------------------
   PASSWORD UNLOCK
--------------------------*/

unlockBtn.addEventListener("click", unlockGift);
unlockBtn.addEventListener("touchend", unlockGift);

passwordInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        unlockGift();
    }
});

function unlockGift() {
    const answer = passwordInput.value.trim().toLowerCase();

    if (PASSWORDS.includes(answer)) {
        passwordError.textContent = "";
        showPage(2);
        startMusic();
    } else {
        passwordError.textContent = "Hmm... that's not the answer ❤️";
        passwordInput.classList.add("shake");

        setTimeout(() => {
            passwordInput.classList.remove("shake");
        }, 500);
    }
}

/* -------------------------
   LOADING SCREEN
--------------------------*/

window.addEventListener("load", () => {
    loadingScreen.classList.add("show");

    setTimeout(() => {
        loadingScreen.classList.remove("show");
        showPage(0);
    }, 1800);
});

/* -------------------------
   BACKGROUND MUSIC
--------------------------*/

function startMusic() {
    if (musicStarted) return;

    bgMusic.volume = 0.35;
    bgMusic.play().catch(() => {
        // Silent catch for autoplay restrictions
    });
    musicStarted = true;
}

/* -------------------------
   HELPER
--------------------------*/

function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}

/* ===========================
   PART 2: LOVE NOTES + HEARTS
============================*/

/* -------------------------
   LOVE NOTES CARD
--------------------------*/

function updateReasonCard() {
    reasonCard.classList.add("flip");

    setTimeout(() => {
        reasonText.textContent = reasons[reasonIndex];
        reasonNumber.textContent = `${reasonIndex + 1} / ${reasons.length}`;
    }, 250);

    setTimeout(() => {
        reasonCard.classList.remove("flip");
    }, 500);
}

/* -------------------------
   CARD INTERACTION
--------------------------*/

reasonCard.addEventListener("click", () => {
    if (reasonIndex < reasons.length - 1) {
        reasonIndex++;
        updateReasonCard();
    } else {
        finishReasons.style.display = "block";
        finishReasons.animate([
            {
                transform: "scale(.8)",
                opacity: 0
            },
            {
                transform: "scale(1.08)",
                opacity: 1
            },
            {
                transform: "scale(1)",
                opacity: 1
            }
        ], {
            duration: 500,
            easing: "ease"
        });
    }
});

// Mobile touch support for card
reasonCard.addEventListener("touchend", (e) => {
    e.preventDefault();
    reasonCard.click();
});

/* -------------------------
   FINISH REASONS BUTTON
--------------------------*/

finishReasons.addEventListener("click", () => {
    showPage(currentPage + 1);
});

finishReasons.addEventListener("touchend", (e) => {
    e.preventDefault();
    finishReasons.click();
});

/* -------------------------
   INITIAL CARD STATE
--------------------------*/

reasonText.textContent = reasons[0];
reasonNumber.textContent = `1 / ${reasons.length}`;

/* -------------------------
   BUCKET LIST CHECKBOXES
--------------------------*/

document.querySelectorAll(".futureItem").forEach(item => {
    item.addEventListener("click", function (e) {
        e.stopPropagation();
        this.style.opacity = this.style.opacity === "0.6" ? "1" : "0.6";
    });

    item.addEventListener("touchend", function (e) {
        e.stopPropagation();
        this.click();
    });
});

/* -------------------------
   FLOATING HEARTS
--------------------------*/

function createHeart() {
    const heart = document.createElement("div");
    heart.className = "floatingHeart";
    heart.innerHTML = Math.random() > 0.5 ? "❤️" : "💖";
    heart.style.left = Math.random() * 100 + "%";
    heart.style.fontSize = (Math.random() * 18 + 18) + "px";
    heart.style.animationDuration = (Math.random() * 4 + 5) + "s";
    heart.style.opacity = (Math.random() * 0.5 + 0.4);

    heartContainer.appendChild(heart);

    setTimeout(() => {
        if (heart.parentNode) {
            heart.remove();
        }
    }, 9000);
}

/* -------------------------
   AUTO HEARTS
--------------------------*/

const heartInterval = setInterval(() => {
    createHeart();
}, 650);

/* -------------------------
   CLICK HEART BURST
--------------------------*/

document.addEventListener("click", function (e) {
    // Don't burst on input fields
    if (e.target.tagName === "INPUT") return;

    for (let i = 0; i < 6; i++) {
        const heart = document.createElement("div");
        heart.className = "floatingHeart";
        heart.innerHTML = Math.random() > 0.5 ? "❤️" : "💖";

        const xOffset = (Math.random() - 0.5) * 200;
        const yOffset = (Math.random() - 0.5) * 200;

        heart.style.left = (e.clientX + xOffset) + "px";
        heart.style.top = (e.clientY + yOffset) + "px";
        heart.style.bottom = "auto";
        heart.style.fontSize = (Math.random() * 20 + 16) + "px";
        heart.style.animationDuration = (Math.random() * 3 + 3) + "s";

        heartContainer.appendChild(heart);

        setTimeout(() => {
            if (heart.parentNode) {
                heart.remove();
            }
        }, 4000);
    }
});

/* -------------------------
   BUTTON ANIMATIONS
--------------------------*/

document.querySelectorAll("button").forEach(btn => {
    btn.addEventListener("click", function () {
        this.animate([
            { transform: "scale(1)" },
            { transform: "scale(.95)" },
            { transform: "scale(1)" }
        ], {
            duration: 180
        });
    });
});

/* -------------------------
   PHOTO HOVER EFFECTS
--------------------------*/

document.querySelectorAll(".heroPhoto, .smallPhoto, .letterPhoto").forEach(photo => {
    photo.addEventListener("mousemove", function (e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateY = ((x / rect.width) - 0.5) * 10;
        const rotateX = ((y / rect.height) - 0.5) * -10;

        this.style.transform = `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
    });

    photo.addEventListener("mouseleave", function () {
        this.style.transform = "";
    });
});

/* -------------------------
   SPARKLE EFFECT
--------------------------*/

function sparkle() {
    const sparkleEl = document.createElement("div");
    sparkleEl.textContent = "✨";
    sparkleEl.style.position = "fixed";
    sparkleEl.style.left = Math.random() * window.innerWidth + "px";
    sparkleEl.style.top = Math.random() * window.innerHeight + "px";
    sparkleEl.style.pointerEvents = "none";
    sparkleEl.style.fontSize = (10 + Math.random() * 10) + "px";
    sparkleEl.style.opacity = "0.9";
    sparkleEl.style.transition = "1.5s";
    sparkleEl.style.zIndex = "100";

    document.body.appendChild(sparkleEl);

    requestAnimationFrame(() => {
        sparkleEl.style.transform = "translateY(-30px) scale(1.5)";
        sparkleEl.style.opacity = "0";
    });

    setTimeout(() => {
        if (sparkleEl.parentNode) {
            sparkleEl.remove();
        }
    }, 1500);
}

setInterval(sparkle, 2200);

/* ===========================
   PART 3: TYPEWRITER + FINAL
============================*/

/* -------------------------
   TYPEWRITER EFFECT
--------------------------*/

let typingStarted = false;

async function startTypewriter() {
    if (typingStarted) return;

    typingStarted = true;
    typewriter.textContent = "";

    for (let i = 0; i < letter.length; i++) {
        typewriter.textContent += letter.charAt(i);

        const char = letter.charAt(i);
        const delayTime = (char === "." || char === "," || char === "!" || char === "?") ? 120 : 32;

        await sleep(delayTime);
    }

    typingFinished = true;
}

/* -------------------------
   WATCH PAGE CHANGES
--------------------------*/

const observer = new MutationObserver(() => {
    if (pages[currentPage] && pages[currentPage].id === "letterPage") {
        startTypewriter();
    }

    if (pages[currentPage] && pages[currentPage].id === "finalPage") {
        celebrate();
    }
});

pages.forEach(page => {
    observer.observe(page, {
        attributes: true,
        attributeFilter: ["class"]
    });
});

/* -------------------------
   LETTER BUTTON
--------------------------*/

letterNext.addEventListener("click", () => {
    if (!typingFinished) {
        typewriter.textContent = letter;
        typingFinished = true;
        typingStarted = true;
        return;
    }
    showPage(currentPage + 1);
});

letterNext.addEventListener("touchend", function (e) {
    e.preventDefault();
    letterNext.click();
});

/* -------------------------
   CELEBRATION EFFECT
--------------------------*/

function celebrate() {
    let count = 0;
    const burst = setInterval(() => {
        for (let i = 0; i < 8; i++) {
            createHeart();
        }
        count++;

        if (count >= 15) {
            clearInterval(burst);
        }
    }, 250);
}

/* -------------------------
   KEYBOARD NAVIGATION
--------------------------*/

document.addEventListener("keydown", e => {
    if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        if (currentPage < pages.length - 1) {
            showPage(currentPage + 1);
        }
    }

    if (e.key === "ArrowLeft") {
        e.preventDefault();
        if (currentPage > 0) {
            showPage(currentPage - 1);
        }
    }
});

/* -------------------------
   DOUBLE CLICK HEART EXPLOSION
--------------------------*/

document.addEventListener("dblclick", e => {
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const heart = document.createElement("div");
            heart.className = "floatingHeart";
            heart.innerHTML = Math.random() > 0.5 ? "❤️" : "💖";

            heart.style.left = (e.clientX + (Math.random() * 200 - 100)) + "px";
            heart.style.top = (e.clientY + (Math.random() * 120 - 60)) + "px";
            heart.style.bottom = "auto";
            heart.style.fontSize = (18 + Math.random() * 20) + "px";
            heart.style.animationDuration = (2 + Math.random() * 2) + "s";

            heartContainer.appendChild(heart);

            setTimeout(() => {
                if (heart.parentNode) {
                    heart.remove();
                }
            }, 4000);
        }, i * 30);
    }
});

/* -------------------------
   TAB VISIBILITY
--------------------------*/

document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        bgMusic.pause();
    } else {
        if (musicStarted) {
            bgMusic.play().catch(() => {});
        }
    }
});

/* -------------------------
   WINDOW RESIZE HANDLER
--------------------------*/

window.addEventListener("resize", () => {
    document.querySelectorAll(".floatingHeart").forEach(h => {
        const left = parseFloat(h.style.left);
        if (left > window.innerWidth) {
            h.style.left = (window.innerWidth - 20) + "px";
        }
    });
});

/* -------------------------
   PREVENT IMAGE DRAG
--------------------------*/

document.querySelectorAll("img").forEach(img => {
    img.draggable = false;
    img.addEventListener("selectstart", (e) => e.preventDefault());
});

/* -------------------------
   SWIPE SUPPORT FOR MOBILE
--------------------------*/

let touchStartX = 0;
let touchEndX = 0;

document.addEventListener("touchstart", e => {
    touchStartX = e.changedTouches[0].screenX;
}, false);

document.addEventListener("touchend", e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, false);

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swiped left - go next
            if (currentPage < pages.length - 1) {
                showPage(currentPage + 1);
            }
        } else {
            // Swiped right - go previous
            if (currentPage > 0) {
                showPage(currentPage - 1);
            }
        }
    }
}

/* -------------------------
   PREVENT CONTEXT MENU
   (OPTIONAL - UNCOMMENT IF NEEDED)
--------------------------*/

/*
document.addEventListener("contextmenu", e => {
    e.preventDefault();
});
*/

/* -------------------------
   INITIALIZE
--------------------------*/

showPage(0);
reasonText.textContent = reasons[0];
reasonNumber.textContent = `${reasonIndex + 1} / ${reasons.length}`;

// Create initial hearts
createHeart();
setTimeout(createHeart, 500);
setTimeout(createHeart, 900);

/* -------------------------
   CONSOLE MESSAGE
--------------------------*/

console.log(
    "%cHappy Birthday Jonathan ❤️",
    "color:#ff6b9a;font-size:22px;font-weight:bold;"
);

console.log(
    "%cMade with love by Aishu ✨",
    "color:white;font-size:15px;"
);

/* ===========================================
   END OF SCRIPT.JS
===========================================*/
