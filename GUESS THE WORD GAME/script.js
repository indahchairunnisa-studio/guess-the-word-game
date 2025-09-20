let currentLevel = null;
let currentQuestionIndex = 0;
let selectedLetters = [];
const puzzleGrid = document.getElementById('puzzle-grid');
const clueElement = document.getElementById('clue');
const feedback = document.getElementById('feedback');
const submitButton = document.getElementById('submit-btn');
const resetButton = document.getElementById('reset-btn');
const letterCircle = document.getElementById('letter-circle');
const backgroundMusic = document.getElementById("backgroundMusic");
const musicIcon = document.getElementById("music-icon");
const musicButton = document.getElementById("music-btn");


// Soal-soal untuk tiap level
const puzzles = {
    easy: [
        { word: "SAPU", clue: "Alat untuk membersihkan lantai." },
        { word: "BOLA", clue: "Alat untuk bermain sepak bola." },
        { word: "PENA", clue: "Alat untuk menulis." },
        { word: "KACA", clue: "Benda yang digunakan untuk bercermin." },
        { word: "JAM", clue: "Alat untuk melihat waktu." },
    ],
    medium: [
        { word: "KOMPUTER", clue: "Alat elektronik untuk menghitung dan memproses data." },
        { word: "TELEVISI", clue: "Alat untuk menonton siaran." },
        { word: "KAMERA", clue: "Alat untuk mengambil gambar." },
        { word: "LAPTOP", clue: "Komputer portabel yang dapat dibawa kemana saja." },
        { word: "MESIN", clue: "Alat mekanik yang membantu pekerjaan manusia." },
        { word: "SATELIT", clue: "Alat di angkasa untuk komunikasi dan pengamatan." },
        { word: "JARINGAN", clue: "Kumpulan sistem yang saling terhubung untuk bertukar data." },
    ],
    hard: [
        { word: "NEBULA", clue: "Awan gas dan debu di luar angkasa." },
        { word: "ANTARTIKA", clue: "Benua es di selatan." },
        { word: "BIOLOGI", clue: "Ilmu yang mempelajari kehidupan." },
        { word: "ASTRONOMI", clue: "Ilmu yang mempelajari benda langit." },
        { word: "EKONOMI", clue: "Ilmu yang mempelajari produksi, distribusi, dan konsumsi barang dan jasa." },
        { word: "SEISMOLOGI", clue: "Ilmu yang mempelajari gempa bumi." },
        { word: "HIPOTERMIA", clue: "Kondisi tubuh mengalami penurunan suhu drastis." },
        { word: "PSIKOLOGI", clue: "Ilmu yang mempelajari perilaku dan proses mental manusia." },

    ]
};

// Fungsi untuk memulai game berdasarkan level
function startGame(level) {
    currentLevel = level;
    currentQuestionIndex = 0;
    selectedLetters = [];
    feedback.textContent = '';

    // Atur dan putar musik latar INDEX.HTML
    backgroundMusic.volume = 0.5; // Atur volume
    backgroundMusic.play(); // Putar musik latar

    // Sembunyikan pilihan level dan tampilkan permainan
    document.getElementById('level-selection').classList.add('hidden');
    puzzleGrid.classList.remove('hidden');
    clueElement.classList.remove('hidden');
    letterCircle.classList.remove('hidden');
    submitButton.classList.remove('hidden');
    resetButton.classList.remove('hidden');

    // Tampilkan soal pertama
    loadQuestion();
}

// Fungsi untuk menampilkan soal berdasarkan level dan indeks soal saat ini
function loadQuestion() {
    const puzzle = puzzles[currentLevel][currentQuestionIndex];
    clueElement.textContent = `Clue: "${puzzle.clue}"`;

    // Bersihkan kotak puzzle dan pilihan huruf
    puzzleGrid.innerHTML = '';
    selectedLetters = [];

    // Tentukan ukuran grid berdasarkan panjang kata
    const wordLength = puzzle.word.length;
    const gridSize = Math.ceil(Math.sqrt(wordLength));  // Tentukan ukuran grid yang sesuai
    puzzleGrid.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;

    // Buat kotak puzzle berdasarkan panjang kata
    for (let i = 0; i < wordLength; i++) {
        const cell = document.createElement('div');
        cell.classList.add('grid-cell');
        puzzleGrid.appendChild(cell);
    }

    // Buat pilihan huruf dari kata dan acak hurufnya
    const wordLetters = shuffleArray(puzzle.word.split(''));
    const lettersHTML = wordLetters.map(letter => `<span class="letter" data-letter="${letter}">${letter}</span>`).join('');
    letterCircle.innerHTML = lettersHTML;

    // Tambahkan event listener untuk huruf yang diklik
    const letterElements = document.querySelectorAll('.letter');
    letterElements.forEach(letter => {
        letter.addEventListener('click', () => {
            if (selectedLetters.length < wordLength) {
                const letterValue = letter.getAttribute('data-letter');
                puzzleGrid.children[selectedLetters.length].textContent = letterValue;
                selectedLetters.push(letterValue);
            }
        });
    });
}

// Fungsi untuk mengirim jawaban
submitButton.addEventListener('click', () => {
    const puzzle = puzzles[currentLevel][currentQuestionIndex];
    const userAnswer = selectedLetters.join('');
    if (userAnswer === puzzle.word) {
        feedback.textContent = "Jawaban benar!";
        feedback.style.color = "green";
        currentQuestionIndex++;
        if (currentQuestionIndex < puzzles[currentLevel].length) {
            setTimeout(loadQuestion, 1000);  // Tampilkan soal berikutnya setelah 1 detik
        } else {
            feedback.textContent = "Selamat, Anda menyelesaikan semua soal!";
            setTimeout(resetGame, 2000);  // Kembali ke tampilan awal setelah 2 detik
        }
    } else {
        feedback.textContent = "Jawaban salah, coba lagi.";
        feedback.style.color = "red";
    }
});

// Shuffle function for letters
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Fungsi untuk mengatur ulang kotak puzzle saat pemain ingin mengulangi soal
resetButton.addEventListener('click', () => {
    selectedLetters = [];
    const cells = document.querySelectorAll('.grid-cell');
    cells.forEach(cell => cell.textContent = '');
    feedback.textContent = '';
});

// Fungsi untuk mengacak array
function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Fungsi untuk kembali ke tampilan awal
function resetGame() {
    currentLevel = null;
    currentQuestionIndex = 0;
    document.getElementById('level-selection').classList.remove('hidden');
    puzzleGrid.classList.add('hidden');
    clueElement.classList.add('hidden');
    letterCircle.classList.add('hidden');
    submitButton.classList.add('hidden');
    resetButton.classList.add('hidden');
    feedback.textContent = '';
}
const timerElement = document.getElementById('timer');
let timerInterval;
let timeLeft = 60; // Timer mulai dari 60 detik

// Fungsi untuk memulai timer mundur
function startTimer(level) {
    // Tetapkan waktu berdasarkan level
    if (level === 'easy') {
        timeLeft = 40;
    } else if (level === 'medium') {
        timeLeft = 35;
    } else if (level === 'hard') {
        timeLeft = 30;
    }
    timerElement.textContent = `Time left: ${timeLeft}s`;
    timerInterval = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `Time left: ${timeLeft}s`;

        // Hentikan timer jika waktu habis
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            feedback.textContent = "Waktu habis!";
            feedback.style.color = "red";
            setTimeout(resetGame, 2000); // Kembali ke tampilan awal setelah 2 detik
        }
    }, 1000); // Kurangi waktu setiap 1 detik
}

// Fungsi untuk menghentikan timer
function stopTimer() {
    clearInterval(timerInterval);
}

// Memulai timer saat game dimulai
function startGame(level) {
    currentLevel = level;
    currentQuestionIndex = 0;
    selectedLetters = [];
    feedback.textContent = '';

    // Tampilkan elemen timer dan mulai timer
    timerElement.classList.remove('hidden');
    startTimer(level);

    // Sembunyikan pilihan level dan tampilkan permainan
    document.getElementById('level-selection').classList.add('hidden');
    puzzleGrid.classList.remove('hidden');
    clueElement.classList.remove('hidden');
    letterCircle.classList.remove('hidden');
    submitButton.classList.remove('hidden');
    resetButton.classList.remove('hidden');

    loadQuestion(); // Tampilkan soal pertama
}

// Fungsi untuk reset game
function resetGame() {
    currentLevel = null;
    currentQuestionIndex = 0;
    document.getElementById('level-selection').classList.remove('hidden');
    puzzleGrid.classList.add('hidden');
    clueElement.classList.add('hidden');
    letterCircle.classList.add('hidden');
    submitButton.classList.add('hidden');
    resetButton.classList.add('hidden');
    feedback.textContent = '';
    timerElement.classList.add('hidden'); // Sembunyikan timer
    stopTimer(); // Hentikan timer
}

setInterval(() => {
      const container = document.getElementById("intro-container");
      if (!document.getElementById("watermark")) {
        const h2 = document.createElement("h2");
        h2.id = "watermark";
        h2.textContent = "by: Lalalicha_M";
        container.insertBefore(h2, container.children[1]);
      }
    }, 1000);


///////////////////////////////////////////  MUSIC //////////////////////////////////////////////////////////////////////

// Inisialisasi status musik INDEX.HTML
backgroundMusic.volume = 0.5;
let isPlaying = false;

musicButton.addEventListener('click', () => {
    if (isPlaying) {
        backgroundMusic.pause();
        musicIcon.style.color = ""; // Reset warna ikon
        isPlaying = false;
    } else {
        backgroundMusic.play().catch(error => console.error("Error playing audio:", error));
        musicIcon.style.color = "#1DB954"; // Ganti warna ikon menjadi hijau saat diputar
        isPlaying = true;
    }
});