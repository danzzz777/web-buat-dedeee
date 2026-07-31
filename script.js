// ==========================================
// 1. ANIMASI HUJAN HATI DI BACKGROUND
// ==========================================
function buatHati() {
    const heart = document.createElement("div");
    heart.classList.add("heart-anim");
    
    const emojis = ['💖', '💕', '🌸', '✨'];
    heart.innerText = emojis[Math.floor(Math.random() * emojis.length)];
    
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = (Math.random() * 3 + 3) + "s";
    
    document.getElementById("floating-hearts").appendChild(heart);
    
    setTimeout(() => { heart.remove(); }, 6000);
}
setInterval(buatHati, 400);


// ==========================================
// 2. NAVIGASI & PASSWORD (LAGU TETAP NYALA)
// ==========================================
const bgMusic = document.getElementById("bgMusic");

// ==============================================
// GANTI KATA SANDI DI SINI (Huruf kecil/besar berpengaruh)
// ==============================================
const KATA_SANDI_BENAR = "3005"; 

function cekPassword() {
    const inputVal = document.getElementById("password-input").value.trim().toLowerCase();
    const errorMsg = document.getElementById("error-msg");

    if (inputVal === KATA_SANDI_BENAR) {
        bgMusic.play().catch((e) => console.log("Autoplay dicegah browser."));
        pindahSlide(3);
    } else {
        errorMsg.innerText = "Ups! Kata sandinya salah, coba ingat-ingat lagi ya! 🥺";
        const inputField = document.getElementById("password-input");
        inputField.style.transform = "translateX(10px)";
        setTimeout(() => { inputField.style.transform = "translateX(-10px)"; }, 100);
        setTimeout(() => { inputField.style.transform = "translateX(0)"; }, 200);
    }
}

function pindahSlide(nomorSlide) {
    const slides = document.querySelectorAll('.slide');
    slides.forEach(slide => {
        slide.classList.remove('active');
        slide.classList.add('hidden');
    });
    
    const targetSlide = document.getElementById('slide-' + nomorSlide);
    targetSlide.classList.remove('hidden');
    targetSlide.classList.add('active');
}


// ==========================================
// 3. FITUR KIRIM KE WHATSAPP
// ==========================================
function kirimKeWhatsApp() {
    // ==============================================
    // GANTI NOMOR WHATSAPP KAMU DI SINI
    // Format: Gunakan kode negara diawali 62 (Contoh: 6281234567890)
    // ==============================================
    const nomorWA = "6283846100398"; 
    
    const pesan = "Halo sayang! Aku udah buka kejutan web-nya, gemes banget! I love you too! 💖🥰";
    
    // Membuka link WhatsApp otomatis
    const urlWA = `https://api.whatsapp.com/send?phone=${nomorWA}&text=${encodeURIComponent(pesan)}`;
    window.open(urlWA, '_blank');
}


// ==========================================
// 4. LOGIKA MINI GAME (MEMORY MATCH)
// ==========================================
const arrayEmoji = ['🐶', '🐶', '🍕', '🍕', '💍', '💍', '✈️', '✈️'];
let kartuDiacak = arrayEmoji.sort(() => Math.random() - 0.5);

let kartuPertama = null;
let kartuKedua = null;
let kunciPapan = false;
let jumlahCocok = 0;

const gameBoard = document.getElementById('game-board');

kartuDiacak.forEach((emoji) => {
    const card = document.createElement('div');
    card.classList.add('card');
    
    card.innerHTML = `
        <div class="front"></div>
        <div class="back">${emoji}</div>
    `;
    
    card.addEventListener('click', () => bukaKartu(card, emoji));
    gameBoard.appendChild(card);
});

function bukaKartu(kartu, emoji) {
    if (kunciPapan) return;
    if (kartu === kartuPertama) return;
    if (kartu.classList.contains('matched')) return;

    kartu.classList.add('flipped');

    if (kartuPertama === null) {
        kartuPertama = { elemen: kartu, nilai: emoji };
        return;
    }

    kartuKedua = { elemen: kartu, nilai: emoji };
    kunciPapan = true;

    cekKecocokan();
}

function cekKecocokan() {
    let apakahCocok = kartuPertama.nilai === kartuKedua.nilai;

    if (apakahCocok) {
        kartuPertama.elemen.classList.add('matched');
        kartuKedua.elemen.classList.add('matched');
        jumlahCocok++;
        
        resetPapan();

        if (jumlahCocok === 4) {
            setTimeout(() => {
                document.getElementById('btn-next-game').style.display = 'inline-block';
            }, 500);
        }
    } else {
        setTimeout(() => {
            kartuPertama.elemen.classList.remove('flipped');
            kartuKedua.elemen.classList.remove('flipped');
            resetPapan();
        }, 1000);
    }
}

function resetPapan() {
    kunciPapan = false;
    kartuPertama = null;
    kartuKedua = null;
}