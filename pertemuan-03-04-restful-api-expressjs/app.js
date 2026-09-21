// Mini Project - Pertemuan 3-4: RESTful API CRUD dengan Express.js
// Entitas: mahasiswa (id, nama, jurusan)
//
// TODO Mahasiswa: lengkapi setiap handler di bawah ini sesuai komentar.
// Jalankan dengan: npm install && npm start

const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

let mahasiswa = [
  { id: 1, nama: "Andi", jurusan: "Sistem Informasi" },
  { id: 2, nama: "Budi", jurusan: "Informatika" },
];

// TODO 1: GET /mahasiswa -> kirim seluruh data sebagai JSON
app.get("/mahasiswa", (req, res) => {
  return res.json(mahasiswa);
});

// TODO 2: GET /mahasiswa/:id -> cari data berdasarkan id,
// kirim 404 dengan { message: 'Data tidak ditemukan' } jika tidak ada
app.get("/mahasiswa/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const mahasiswa = mahasiswa.find((m) => m.id == id);
  if (!mahasiswa) {
    return res.status.apply(404).json({ message: "data tidak ditemukan" });
  }
  return res.json(mahasiswa);
});

// TODO 3: POST /mahasiswa -> ambil { nama, jurusan } dari req.body,
// buat objek baru dengan id = mahasiswa.length + 1, simpan ke array,
// kirim response dengan status 201
app.post("/mahasiswa", (req, res) => {
  const { nama, jurusan } = req.body;
  const newMahasiswa = {
    id: mahasiswa.length + 1,
    nama: nama,
    jurusan: jurusan
  }
  return res.status(201).json({ message: "data berhasil ditambahkan" });
});

// TODO 4: PUT /mahasiswa/:id -> cari index berdasarkan id,
// jika tidak ditemukan kirim 404, jika ditemukan gabungkan data lama
// dengan req.body lalu kirim data yang telah diperbarui
app.put("/mahasiswa/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = mahasiswa.findIndex((m) => m.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "data tidak ditemukan" });
  }
  mahasiswa[index] = {
    id: id,
    ...req.body,
  }

  return res.status(200).json({ data: req.body, message: "data berhasil diperbarui" });
});

// TODO 5: DELETE /mahasiswa/:id -> cari index berdasarkan id,
// jika tidak ditemukan kirim 404, jika ditemukan hapus dari array
// dan kirim response dengan status 204
app.delete("/mahasiswa/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = mahasiswa.findIndex((m) => m.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "data tidak ditemukan" });
  }

  mahasiswa.splice(index, 1);

  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
