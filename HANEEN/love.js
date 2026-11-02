
const answers = [
    {
        question: "إيه اللي خلاك تحبني؟",

        answer: "يمكن أكتر حاجة خلتني أحبك إني لقيت نفسي مع الوقت مستني كلامك، ومستني وجودك في يومي، وبقيت أهتم بتفاصيلك حتى لو كانت صغيرة. حبيت طريقة تفكيرك، أسلوبك، كلامنا مع بعض، والطريقة اللي قدرتي بيها تخلي حد متعلق بيكي من ورا شاشة. والغريب إني رغم إننا لسه متقابلناش في الواقع، قدرتي تبقي قريبة مني بالشكل ده"
    },

    {
        question: "وهل أنت متأكد إنك بتحبني مش مجرد إعجاب منك وهيروح؟",

        answer: "أنا فكرت في السؤال ده، ومش عايز أجاوبك لمجرد إني أطمنك بكلمتين حلوين. أنا عارف إننا لسه منعرفش بعض في كل الظروف، ولسه في حاجات كتير محتاجين نكتشفها عن بعض، خصوصًا إن معرفتنا بدأت من ورا شاشة. بس ده مش معناه إن إحساسي مجرد إعجاب. أنا حاسس إنك بقيتي شخص مهم بالنسبالي، وإن وجودك بقى فارق معايا فعلًا. ومش عايز أحكم على حبنا بكلام دلوقتي، عايز الأيام والمواقف تثبتلك إن إحساسي حقيقي"
    }
];

const intro = document.getElementById("intro");
const questions = document.getElementById("questions");
const ending = document.getElementById("ending");

const song = document.getElementById("loveSong");

const questionTitle = document.getElementById("questionTitle");
const answerText = document.getElementById("answerText");
const questionNumber = document.getElementById("questionNumber");
const progressBar = document.getElementById("progressBar");

const openButton = document.getElementById("openButton");
const nextButton = document.getElementById("nextButton");
const backButton = document.getElementById("backButton");
const replayButton = document.getElementById("replayButton");
const musicStatus = document.getElementById("musicStatus");

let currentQuestion = 0;

// توقيت بداية الجزء المطلوب من الأغنية بالثواني.
// غيّره بعد وضع ملف الصوت ومعرفة توقيت الجملة.
const SONG_START_TIME = 0;


// تغيير الشاشة
function showScreen(screen) {

    document.querySelectorAll(".screen").forEach(item => {
        item.classList.remove("active");
    });

    screen.classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// عرض السؤال الحالي
function renderQuestion() {

    const item = answers[currentQuestion];

    questionTitle.textContent = item.question;
    answerText.textContent = item.answer;

    questionNumber.textContent =
        `0${currentQuestion + 1} / 0${answers.length}`;

    progressBar.style.width =
        `${((currentQuestion + 1) / answers.length) * 100}%`;

    backButton.disabled = currentQuestion === 0;

    if (currentQuestion === answers.length - 1) {

        nextButton.textContent = "كمّلي ♡";

    } else {

        nextButton.textContent = "السؤال اللي بعده ♡";

    }
}


// فتح الرسالة وتشغيل الأغنية
openButton.addEventListener("click", async () => {
const SONG_START_TIME = 53.38;
    showScreen(questions);
    renderQuestion();

    try {
        if (song.readyState < 1) {
            await new Promise((resolve, reject) => {
                song.addEventListener("loadedmetadata", resolve, { once: true });
                song.addEventListener("error", reject, { once: true });
                song.load();
            });
        }

        song.currentTime = SONG_START_TIME;
        await song.play();

        musicStatus.textContent = "♫ الموسيقى شغالة في الخلفية";

    } catch (error) {
        console.error("Audio Error:", error);
        musicStatus.textContent = "حصلت مشكلة في تشغيل الأغنية ♡";
    }

});


// السؤال التالي
nextButton.addEventListener("click", () => {

    if (currentQuestion < answers.length - 1) {

        currentQuestion++;

        renderQuestion();

    } else {

        showScreen(ending);

    }

});


// الرجوع للسؤال السابق
backButton.addEventListener("click", () => {

    if (currentQuestion > 0) {

        currentQuestion--;

        renderQuestion();

    }

});


// إعادة قراءة الرسالة
replayButton.addEventListener("click", async () => {

    currentQuestion = 0;

    renderQuestion();

    showScreen(questions);

    if (song.paused) {
        try {
            song.currentTime = SONG_START_TIME;
            await song.play();
            musicStatus.textContent = "♫ الموسيقى شغالة في الخلفية";
        } catch (error) {
            musicStatus.textContent = "مش قادر أشغل الأغنية، تأكد من ملف الصوت ♡";
            console.error("Audio Error:", error);
        }
    }

});


// قلوب متحركة في الخلفية
const heartsContainer =
    document.getElementById("backgroundHearts");

function createHeart() {

    const heart = document.createElement("span");

    heart.className = "floating-heart";

    heart.textContent =
        Math.random() > 0.5 ? "♡" : "♥";

    heart.style.left =
        Math.random() * 100 + "vw";

    heart.style.fontSize =
        (12 + Math.random() * 15) + "px";

    heart.style.animationDuration =
        (8 + Math.random() * 8) + "s";

    heartsContainer.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 17000);

}

setInterval(createHeart, 1000);
