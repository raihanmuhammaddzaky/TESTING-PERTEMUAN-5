// Mini Project - Pertemuan 6-7: Layer Controller
// TODO 2: lengkapi setiap handler agar memanggil fungsi model yang sesuai.

// Mini Project - Pertemuan 6-7: Layer Controller
// TODO 2: lengkapi setiap handler agar memanggil fungsi model yang sesuai.

const mahasiswaModel = require("../models/mahasiswaModel");

exports.getAll = (req, res) => {
  try {
    const data = mahasiswaModel.getAll();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan pada server", error: error.message });
  }
};

exports.getById = (req, res) => {
  try {
    const { id } = req.params;
    const mahasiswa = mahasiswaModel.getById(id);

    if (!mahasiswa) {
      return res.status(404).json({ message: 'Tidak ditemukan' });
    }

    res.status(200).json(mahasiswa);
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan pada server", error: error.message });
  }
};

exports.create = (req, res) => {
  try {
    // Validasi sederhana sebelum data dikirim ke model
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "Data tidak boleh kosong" });
    }

    const newData = mahasiswaModel.create(req.body);
    res.status(201).json({
      message: 'Data mahasiswa berhasil ditambahkan',
      data: newData
    });
  } catch (error) {
    res.status(500).json({ message: "Gagal menambahkan data", error: error.message });
  }
};

