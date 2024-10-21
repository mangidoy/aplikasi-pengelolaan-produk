var nama = document.getElementById("nama");
var harga = document.getElementById("harga");
var jumlah = document.getElementById("jumlah");
var gambar = document.getElementById("gambar");
var display = document.getElementById("display");
var grandTotal = document.getElementById("totalAll");
var hasilTotal = 0;
var nomor = 1;
var currentlyEditingRow = null;

function tambahProduk() {
  var namaProduk = nama.value;
  var hargaProduk = parseFloat(harga.value);
  var jumlahProduk = parseFloat(jumlah.value);
  var total = hargaProduk * jumlahProduk;
  var fileGambar = gambar.files[0];

  if (namaProduk && hargaProduk && jumlahProduk && fileGambar) {
    var reader = new FileReader();
    reader.onload = function (e) {
      if (currentlyEditingRow) {
        updateRow(
          currentlyEditingRow,
          namaProduk,
          hargaProduk,
          jumlahProduk,
          total,
          e.target.result
        );
        currentlyEditingRow = null;
      } else {
        addNewRow(
          namaProduk,
          hargaProduk,
          jumlahProduk,
          total,
          e.target.result
        );
      }

      nama.value = "";
      harga.value = "";
      jumlah.value = "";
      gambar.value = "";

      grandTotal.innerHTML =
        "Total Harga: Rp. " + hasilTotal.toLocaleString("id-ID");
    };
    reader.readAsDataURL(fileGambar);
  } else {
    alert("Masukkan semua data termasuk gambar produk terlebih dahulu...");
  }
}

function addNewRow(namaProduk, hargaProduk, jumlahProduk, total, imageUrl) {
  var newProduk = document.createElement("tr");

  var idProduk = document.createElement("td");
  idProduk.textContent = nomor++;
  newProduk.appendChild(idProduk);

  var imgProduk = document.createElement("td");
  var imgElement = document.createElement("img");
  imgElement.src = imageUrl;
  imgProduk.appendChild(imgElement);
  newProduk.appendChild(imgProduk);

  var dataNama = document.createElement("td");
  dataNama.textContent = namaProduk;
  newProduk.appendChild(dataNama);

  var dataHarga = document.createElement("td");
  dataHarga.textContent = "Rp. " + hargaProduk.toLocaleString("id-ID");
  newProduk.appendChild(dataHarga);

  var dataJumlah = document.createElement("td");
  dataJumlah.textContent = jumlahProduk;
  newProduk.appendChild(dataJumlah);

  var dataTotal = document.createElement("td");
  dataTotal.textContent = "Rp. " + total.toLocaleString("id-ID");
  newProduk.appendChild(dataTotal);

  var aksi = document.createElement("td");
  var aksiButtons = document.createElement("div");
  aksiButtons.className = "aksi-button";

  var tombolEdit = document.createElement("button");
  tombolEdit.textContent = "Edit";
  tombolEdit.onclick = function () {
    editProduk(
      newProduk,
      namaProduk,
      hargaProduk,
      jumlahProduk,
      total,
      imageUrl
    );
  };

  var tombolHapus = document.createElement("button");
  tombolHapus.textContent = "Hapus";
  tombolHapus.onclick = function () {
    hapusProduk(newProduk, total);
  };

  aksiButtons.appendChild(tombolEdit);
  aksiButtons.appendChild(tombolHapus);
  aksi.appendChild(aksiButtons);
  newProduk.appendChild(aksi);

  display.appendChild(newProduk);

  hasilTotal += total;
  grandTotal.innerHTML =
    "Total Harga: Rp. " + hasilTotal.toLocaleString("id-ID");
}

function updateRow(
  row,
  namaProduk,
  hargaProduk,
  jumlahProduk,
  total,
  imageUrl
) {
  var cells = row.getElementsByTagName("td");

  cells[2].textContent = namaProduk;
  cells[3].textContent = "Rp. " + hargaProduk.toLocaleString("id-ID");
  cells[4].textContent = jumlahProduk;
  cells[5].textContent = "Rp. " + total.toLocaleString("id-ID");

  var imgElement = cells[1].getElementsByTagName("img")[0];
  imgElement.src = imageUrl;

  hasilTotal += total;
  grandTotal.innerHTML =
    "Total Harga: Rp. " + hasilTotal.toLocaleString("id-ID");
}

function editProduk(
  row,
  namaProduk,
  hargaProduk,
  jumlahProduk,
  total,
  imageUrl
) {
  nama.value = namaProduk;
  harga.value = hargaProduk;
  jumlah.value = jumlahProduk;

  currentlyEditingRow = row;

  hasilTotal -= total;
  grandTotal.innerHTML =
    "Total Harga: Rp. " + hasilTotal.toLocaleString("id-ID");

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function hapusProduk(row, total) {
  var acc = confirm("Apakah kamu yakin untuk menghapus produk?");

  if (acc === true) {
    display.removeChild(row);
    hasilTotal -= total;
    grandTotal.innerHTML =
      "Total Harga: Rp. " + hasilTotal.toLocaleString("id-ID");
    updateIDs();
  } else {
    alert("Kamu tidak jadi menghapus produk");
  }
}

function updateIDs() {
  var rows = display.getElementsByTagName("tr");
  for (var i = 0; i < rows.length; i++) {
    rows[i].cells[0].textContent = i + 1;
  }
}

function cariProduk() {
  var input = document.getElementById("search");
  var filter = input.value.toLowerCase();
  var rows = display.getElementsByTagName("tr");

  for (var i = 0; i < rows.length; i++) {
    var namaProduk = rows[i].getElementsByTagName("td")[2];
    if (namaProduk) {
      var textValue = namaProduk.textContent || namaProduk.innerText;
      if (textValue.toLowerCase().indexOf(filter) > -1) {
        rows[i].style.display = "";
      } else {
        rows[i].style.display = "none";
      }
    }
  }
}

function login() {
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;

  if (username === "doy" && password === "123") {
    alert("Kamu Berhasil Login");
    window.location.href = "index.html";
  } else {
    alert("Username atau Password Kamu Salah!");
    alert("Masukkan Kembali Username dan Password Kamu");
  }
}

function logout() {
  var accLogout = confirm("Apakah Kamu Ingin Logout?");

  if (accLogout === true) {
    window.location.href = "login.html";
  } else {
    alert("Kamu Tidak Jadi Logout");
  }
}
