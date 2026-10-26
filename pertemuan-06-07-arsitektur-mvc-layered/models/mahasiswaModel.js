// Mini Project - Pertemuan 6-7: Layer Model
// TODO 1: lengkapi data awal & tiga fungsi akses data di bawah ini.

let mahasiswa = [
  { id: 1, nama: "Andi", jurusan: "Sistem Informasi" },
  { id: 2, nama: "Budi", jurusan: "Informatika" },
];

function getAll() {
  // TODO: kembalikan seluruh data mahasiswa
  return mahasiswa;
}

function getById(id) {
  // TODO: cari & kembalikan satu data berdasarkan id
  return mahasiswa.find((m) => m.id === parseInt(id));
}

function create(data) {
  // TODO: buat objek baru dengan id = mahasiswa.length + 1,
  // gabungkan dengan `data`, simpan ke array, lalu kembalikan objek baru tsb
  const newId = mahasiswa.length + 1;

  const newMahasiswa = {
    id: newId,
    ...data
  }

  mahasiswa.push(newMahasiswa);

  return newMahasiswa;
}

module.exports = { getAll, getById, create };
