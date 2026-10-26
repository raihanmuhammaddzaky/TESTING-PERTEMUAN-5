

import 'dotenv/config';
import cors from 'cors';
import express from 'express';

const app = express();

const PORT = process.env.PORT;


const logger = (req, res, next) => {
  const method = req.method;
  const url = req.url;
  const time = new Date().toISOString();
  console.log(`[${time}] ${method} ${url}`);
  next();
}

app.use(logger);



app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

let mahasiswa = [
  { id: 1, nama: "Andi", jurusan: "Sistem Informasi" },
  { id: 2, nama: "Budi", jurusan: "Informatika" },
];

app.get("/mahasiswa", (req, res) => {
  res.json(mahasiswa);
});

app.get("/mahasiswa/:id", (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const data = mahasiswa.find((m) => m.id === id);
    if (!data) throw new Error("Data tidak ditemukan");
    res.json(data);
  } catch (err) {
    // TODO 5: teruskan error ini ke error-handling middleware
    next(err);
  }
});

app.post("/mahasiswa", (req, res) => {
  const { nama, jurusan } = req.body;
  const baru = { id: mahasiswa.length + 1, nama, jurusan };
  mahasiswa.push(baru);
  res.status(201).json(baru);
});

app.put("/mahasiswa/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = mahasiswa.findIndex((m) => m.id === id);
  if (index === -1) return res.status(404).json({ message: "Data tidak ditemukan" });
  mahasiswa[index] = { ...mahasiswa[index], ...req.body };
  res.json(mahasiswa[index]);
});

app.delete("/mahasiswa/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = mahasiswa.findIndex((m) => m.id === id);
  if (index === -1) return res.status(404).json({ message: "Data tidak ditemukan" });
  mahasiswa.splice(index, 1);
  res.status(204).send();
});

// TODO 6: tambahkan middleware error-handling terpusat di sini
// (paling bawah, setelah seluruh route), dengan signature
// (err, req, res, next) -> log err.stack, lalu balas status 500
// dengan JSON { message: 'Terjadi kesalahan pada server' }

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.json({ message: 'Terjadi kesalahan pada server' });
})

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
