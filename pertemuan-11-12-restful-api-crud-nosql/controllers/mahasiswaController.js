// Mini Project - Pertemuan 11-12: Controller Mahasiswa
// TODO 1: lengkapi getAll agar mendukung filtering, sorting, pagination, dan projection.
// getById/create/update/remove sudah lengkap (dari Pertemuan 9-10).

const Mahasiswa = require("../models/mahasiswaModel");

const MAX_LIMIT = 100;

// GET /mahasiswa?prodiId=...&sort=nama&page=1&limit=10&fields=nama,nim
exports.getAll = async (req, res) => {
  // 1. Filter: jika req.query.prodiId ada, tambahkan ke filter
  const filter = {};
  if (req.query.prodiId) {
    filter.prodiId = req.query.prodiId;
  }

  // 2. Pagination: page & limit
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const limit = Math.min(MAX_LIMIT, Math.max(1, parseInt(req.query.limit) || 10));

  // 3. Sorting: field sort (default 'createdAt')
  const sortField = req.query.sort || "createdAt";

  // 4. Projection: ubah "nama,nim" menjadi "nama nim"
  const projection = req.query.fields
    ? req.query.fields.split(",").join(" ")
    : null;

  // 5. Query data dengan populate, projection, sorting, dan pagination
  const data = await Mahasiswa.find(filter)
    .populate("prodiId")
    .select(projection)
    .sort({ [sortField]: 1 })
    .skip((page - 1) * limit)
    .limit(limit);

  // 6. Hitung total data berdasarkan filter
  const total = await Mahasiswa.countDocuments(filter);

  // 7. Kirim response JSON
  res.json({ data, page, limit, total });
};

exports.getById = async (req, res) => {
  const data = await Mahasiswa.findById(req.params.id).populate("prodiId");
  if (!data) throw { status: 404, message: "Tidak ditemukan" };
  res.json(data);
};

exports.create = async (req, res) => {
  const mahasiswa = await Mahasiswa.create(req.body);
  res.status(201).json(mahasiswa);
};

exports.update = async (req, res) => {
  const data = await Mahasiswa.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!data) throw { status: 404, message: "Tidak ditemukan" };
  res.json(data);
};

exports.remove = async (req, res) => {
  const data = await Mahasiswa.findByIdAndDelete(req.params.id);
  if (!data) throw { status: 404, message: "Tidak ditemukan" };
  res.status(204).send();
};
