const menuIcon = document.getElementById('menu-icon');
const navLinks = document.getElementById('nav-links');

menuIcon.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

const links = navLinks.querySelectorAll('a');
links.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});


// ORDER FORM SCRIPT
const form = document.getElementById("orderForm");

const inputDaging = document.getElementById("qtyDaging");
const inputKulit = document.getElementById("qtyKulit");
const inputCampur = document.getElementById("qtyCampur");
const inputLontong = document.getElementById("lontong");
const totalHargaText = document.getElementById("totalHarga");

function hitungTotal() {
  const daging = parseInt(inputDaging.value) || 0;
  const kulit = parseInt(inputKulit.value) || 0;
  const campur = parseInt(inputCampur.value) || 0;
  const lontong = parseInt(inputLontong.value) || 0;

  const tusukPerPorsi = 10;
  const hargaTusuk = 2500;
  const hargaLontong = 5000;

  const totalTusuk = (daging + kulit + campur) * tusukPerPorsi;
  const totalHargaSate = totalTusuk * hargaTusuk;
  const totalHargaLontong = lontong * hargaLontong;
  const total = totalHargaSate + totalHargaLontong;

  totalHargaText.textContent = `Total: Rp${total.toLocaleString("id-ID")}`;

  return { total, totalTusuk };
}

// hitung realtime
[inputDaging, inputKulit, inputCampur, inputLontong].forEach(input => {
  input.addEventListener("input", hitungTotal);
});

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const nama = document.getElementById("nama").value;
  const catatan = document.getElementById("catatan").value;

  const daging = parseInt(inputDaging.value) || 0;
  const kulit = parseInt(inputKulit.value) || 0;
  const campur = parseInt(inputCampur.value) || 0;
  const lontong = parseInt(inputLontong.value) || 0;

  const { total, totalTusuk } = hitungTotal();

  const message = `
Halo, saya mau pesan:

Nama: ${nama}
Daging: ${daging} porsi
Kulit: ${kulit} porsi
Campur: ${campur} porsi
Lontong: ${lontong} pcs
Catatan: ${catatan}

Total Tusuk: ${totalTusuk}
Total Harga: Rp${total.toLocaleString("id-ID")}
`;

  const waNumber = "628xxxxxx";
  const url = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
});