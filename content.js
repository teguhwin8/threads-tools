let count = 0;

async function autoLikeAndFollow() {
  // Klik tombol like
  const likeButton = document.querySelector('svg[aria-label="Suka"]');
  if (likeButton) {
    // Scroll ke tombol like
    likeButton
      .closest('div[role="button"]')
      .scrollIntoView({ behavior: "smooth", block: "center" });
    likeButton.closest('div[role="button"]').click(); // Mengklik elemen terdekat yang memiliki role button
    console.log("Tombol Like diklik");
    count++;

    // Tunggu beberapa detik sebelum mengikuti
    const followDelay = Math.floor(Math.random() * (5000 - 2000 + 1)) + 2000; // Jeda antara 2 detik sampai 5 detik
    setTimeout(() => {
      clickFollowButton(); // Panggil fungsi untuk klik tombol "Ikuti"
    }, followDelay);
  } else {
    console.log("Tombol Like tidak ditemukan, menggulir ke bawah...");
    window.scrollBy(0, window.innerHeight); // Scroll ke bawah satu layar
    setTimeout(autoLikeAndFollow, 2000); // Tunggu 2 detik sebelum mencoba lagi
    return; // Hentikan eksekusi untuk menghindari loop tak terbatas
  }

  const interval = Math.floor(Math.random() * (10000 - 3000 + 1)) + 3000; // Interval antara 3 detik sampai 10 detik
  setTimeout(autoLikeAndFollow, interval);
}

function clickFollowButton() {
  // Klik tombol follow
  const followButton = document.querySelector(
    'div[role="button"] svg[aria-label="Ikuti"]'
  );
  if (followButton) {
    // Scroll ke tombol follow
    followButton
      .closest("div")
      .scrollIntoView({ behavior: "smooth", block: "center" });
    followButton.closest("div").click(); // Mengklik elemen terdekat yang memiliki role button
    console.log("Tombol Ikuti diklik");

    // Tunggu beberapa detik untuk popup muncul
    const confirmationDelay =
      Math.floor(Math.random() * (5000 - 2000 + 1)) + 2000; // Jeda antara 2 detik sampai 5 detik
    setTimeout(() => {
      clickFollowConfirmation(); // Panggil fungsi untuk klik tombol "Mengikuti"
    }, confirmationDelay);
  } else {
    console.log("Tombol Ikuti tidak ditemukan, menggulir ke bawah...");
    window.scrollBy(0, window.innerHeight); // Scroll ke bawah satu layar
    setTimeout(clickFollowButton, 2000); // Tunggu 2 detik sebelum mencoba lagi
  }
}

function clickFollowConfirmation() {
  // Mencari elemen yang memiliki tulisan "pengikut"
  const followerCountElement = Array.from(
    document.querySelectorAll("span")
  ).find((span) => span.innerText.includes("pengikut"));

  if (followerCountElement) {
    // Naik 2 tingkat ke atas dari elemen span
    let parentDiv = followerCountElement.parentElement; // Ambil parent div pertama
    parentDiv = parentDiv.parentElement; // Ambil parent div kedua
    // const targetDiv = parentDiv.parentElement; // Ambil parent div ketiga

    // Ambil elemen berikutnya
    const confirmButton = parentDiv.nextElementSibling;

    // Pastikan confirmButton ada dan memiliki teks "Ikuti"
    if (confirmButton && confirmButton.innerText.includes("Ikuti")) {
      confirmButton.click(); // Mengklik tombol "Mengikuti"
      console.log("Tombol 'Mengikuti' diklik");
      // Tunggu 3-5 detik sebelum refresh halaman
      const refreshDelay = Math.floor(Math.random() * (5000 - 3000 + 1)) + 3000; // Jeda antara 3 detik sampai 5 detik
      setTimeout(() => {
        console.log("Halaman akan disegarkan...");
        location.reload(); // Refresh halaman
      }, refreshDelay);
    } else {
      console.log("Tombol 'Mengikuti' tidak ditemukan, menggulir ke bawah...");
      window.scrollBy(0, window.innerHeight); // Scroll ke bawah satu layar
      setTimeout(clickFollowConfirmation, 2000); // Tunggu 2 detik sebelum mencoba lagi
    }
  } else {
    console.log("Elemen pengikut tidak ditemukan, menggulir ke bawah...");
    window.scrollBy(0, window.innerHeight); // Scroll ke bawah satu layar
    setTimeout(clickFollowConfirmation, 2000); // Tunggu 2 detik sebelum mencoba lagi
  }
}

// Fungsi untuk refresh halaman setelah 3600 hingga 4000 detik
function refreshPage() {
  const refreshInterval =
    Math.floor(Math.random() * (4000000 - 3600000 + 1)) + 3600000; // Interval antara 3600 detik sampai 4000 detik
  setTimeout(() => {
    console.log("Halaman akan disegarkan...");
    location.reload(); // Refresh halaman
  }, refreshInterval);
}

// Pastikan ekstensi hanya berjalan di Threads
if (window.location.href.includes("https://www.threads.net/")) {
  // Mulai proses
  autoLikeAndFollow();
  refreshPage(); // Mulai fungsi refresh
} else {
  console.log("Ekstensi hanya dapat berjalan di Threads.");
}
