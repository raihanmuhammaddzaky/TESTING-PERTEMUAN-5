# 🚀 Panduan & Tutorial Skenario Testing JWT di Postman
**Mata Kuliah:** Pemrograman Web II — Pertemuan 11–12  
**Topik:** Autentikasi Pengguna & Pengamanan Endpoint menggunakan JSON Web Token (JWT)

---

## 📌 Prasyarat Pengujian

1. Pastikan server sudah berjalan di terminal:
   ```bash
   npm run start
   ```
   Pastikan muncul log:
   ```text
   Terhubung ke MongoDB Atlas
   Server berjalan di http://localhost:3000
   ```
2. Buka aplikasi **Postman**.

> [!TIP]
> **Cara Instan (1 Klik):**  
> Anda dan mahasiswa bisa langsung mengimpor file [PAW2_JWT_Postman_Collection.json](file:///c:/Muhammad%20Dzaky%20R/Asdos/Asdos%20PW%20II%20Pak%20Nur/SI0027-PAWII-Project/pertemuan-11-12-restful-api-crud-nosql/PAW2_JWT_Postman_Collection.json) ke Postman dengan cara:  
> Buka Postman $\rightarrow$ Klik tombol **Import** di kiri atas $\rightarrow$ Drag & drop file JSON tersebut $\rightarrow$ Semua request di bawah ini otomatis terpasang rapi!

---

## 📋 Alur Skenario Pengujian

Berikut adalah urutan skenario pengujian yang ideal dipraktikkan di depan kelas:

```
[Skenario 1: Akses Tanpa Token] ──> Ditolak (401 Unauthorized)
               │
[Skenario 2: Register User] ───────> Berhasil (201 Created)
               │
[Skenario 3: Login Password Salah] > Ditolak (401 Password Salah)
               │
[Skenario 4: Login Berhasil] ──────> Berhasil (200 OK + Dapat Token JWT)
               │
[Skenario 5: Bedah Token di jwt.io]> Mahasiswa melihat isi Header, Payload, Signature
               │
[Skenario 6: Akses Pakai Token] ───> Berhasil (201 Created!)
               │
[Skenario 7: Token Dirusak/Palsu] ─> Ditolak (401 Token Tidak Valid)
```

---

## 🛠️ Langkah Demi Langkah (Step-by-Step) di Postman

---

### Skenario 1: Coba Tambah Mahasiswa Tanpa Login / Tanpa Token
*Tujuan: Membuktikan bahwa endpoint `POST /mahasiswa` sudah berhasil dikunci oleh middleware `verifyToken`.*

1. Di Postman, buat request baru dengan tab **`+`**.
2. Pilih method: **`POST`**.
3. Masukkan URL:
   ```text
   http://localhost:3000/mahasiswa
   ```
4. Masuk ke tab **Body** $\rightarrow$ pilih **raw** $\rightarrow$ ganti format text menjadi **JSON**.
5. Isi JSON:
   ```json
   {
     "nama": "Budi Santoso",
     "nim": "2226250001",
     "alamat": {
       "jalan": "Jl. Sudirman No. 10",
       "kota": "Palembang"
     }
   }
   ```
6. Klik tombol **Send**.
7. **Ekspektasi Hasil:**
   * **Status Code:** `401 Unauthorized`
   * **Response Body:**
     ```json
     {
       "message": "Token Tidak Ditemukan"
     }
     ```
   * *Poin Penjelasan Asdos:* *"Sistem kita menolak request ini karena tidak ada tiket/gelang masuk (Header Authorization)."*

---

### Skenario 2: Registrasi Pengguna Baru (`POST /auth/register`)
*Tujuan: Mendaftarkan akun admin/user baru dan melihat bahwa password terenkripsi.*

1. Buat tab request baru di Postman.
2. Method: **`POST`**.
3. URL:
   ```text
   http://localhost:3000/auth/register
   ```
4. Tab **Body** $\rightarrow$ **raw** $\rightarrow$ **JSON**:
   ```json
   {
     "username": "admin_paw2",
     "password": "rahasia123"
   }
   ```
5. Klik **Send**.
6. **Ekspektasi Hasil:**
   * **Status Code:** `201 Created`
   * **Response Body:**
     ```json
     {
       "message": "Registrasi berhasil",
       "user": {
         "id": "671ce9a...",
         "username": "admin_paw2"
       }
     }
     ```
   * *Poin Penjelasan Asdos:* *"Password `rahasia123` sudah diacak menggunakan `bcrypt.hash(password, 10)` sebelum disimpan ke MongoDB."*

---

### Skenario 3: Uji Coba Login dengan Password Salah
*Tujuan: Menguji keamanan bahwa password yang salah akan ditolak.*

1. Buat tab request baru di Postman.
2. Method: **`POST`**.
3. URL:
   ```text
   http://localhost:3000/auth/login
   ```
4. Tab **Body** $\rightarrow$ **raw** $\rightarrow$ **JSON**:
   ```json
   {
     "username": "admin_paw2",
     "password": "passwordsalah123"
   }
   ```
5. Klik **Send**.
6. **Ekspektasi Hasil:**
   * **Status Code:** `401 Unauthorized`
   * **Response Body:**
     ```json
     {
       "message": "Password Salah"
     }
     ```

---

### Skenario 4: Login Berhasil & Dapatkan Token JWT
*Tujuan: Menerbitkan tiket digital (JWT) yang sah.*

1. Pada request login yang sama, perbaiki password-nya menjadi benar:
   ```json
   {
     "username": "admin_paw2",
     "password": "rahasia123"
   }
   ```
2. Klik **Send**.
3. **Ekspektasi Hasil:**
   * **Status Code:** `200 OK`
   * **Response Body:**
     ```json
     {
       "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MWNlOWExMjMiLCJ1c2VybmFtZSI6ImFkbWluX3BhdzIiLCJpYXQiOjE3Mjk5MDAwMDAsImV4cCI6MTcyOTk4NjQwMH0.abcdef123456..."
     }
     ```
4. **PENTING:** Salin (*copy*) string token yang ada di dalam tanda petik tersebut (tanpa tanda kutipnya).

---

### Skenario 5: Bedah Token di jwt.io (Sesi Edukasi)
*Tujuan: Memperlihatkan anatomi 3 blok JWT secara visual ke mahasiswa.*

1. Buka browser dan kunjungi: **[https://jwt.io](https://jwt.io)**
2. Tempel (*paste*) token tadi ke kolom **Encoded** (sebelah kiri).
3. Perhatikan hasil terjemahan di sebelah kanan:
   * **Header (Merah):** `{"alg": "HS256", "typ": "JWT"}`
   * **Payload (Ungu):** 
     ```json
     {
       "id": "671ce9a...",
       "username": "admin_paw2",
       "iat": 1729900000,
       "exp": 1729986400
     }
     ```
   * *Poin Penjelasan Asdos:* *"Lihat, di payload tertulis username kita dan waktu kedaluwarsa (`exp`). Payload ini bisa dibaca siapa pun, jadi JANGAN PERNAH menyimpan password di payload JWT!"*

---

### Skenario 6: Tambah Mahasiswa Menggunakan Bearer Token
*Tujuan: Menggunakan token JWT untuk mengakses route yang sebelumnya terkunci.*

Kembali ke request `POST http://localhost:3000/mahasiswa` (dari Skenario 1). Ada **dua cara** menyetel token di Postman:

#### Cara A: Menggunakan Tab "Authorization" Postman (Direkomendasikan)
1. Klik tab **Authorization** (di sebelah tab Headers).
2. Pada dropdown **Type**, pilih **`Bearer Token`**.
3. Di kolom **Token**, *paste* string token yang Anda peroleh dari Skenario 4.
4. Klik **Send**.

#### Cara B: Menggunakan Tab "Headers" (Manual)
1. Klik tab **Headers**.
2. Tambahkan baris baru:
   * **Key:** `Authorization`
   * **Value:** `Bearer eyJhbGciOiJIUzI1NiIsIn...` *(Ingat: ada spasi setelah kata Bearer)*.
3. Klik **Send**.

**Ekspektasi Hasil:**
* **Status Code:** `201 Created`
* **Response Body:** Data mahasiswa berhasil tersimpan di database MongoDB!
  ```json
  {
    "_id": "671ce9b...",
    "nama": "Budi Santoso",
    "nim": "2226250001",
    "createdAt": "2026-10-26T..."
  }
  ```

---

### Skenario 7: Simulasi Token Dirusak / Palsu
*Tujuan: Membuktikan kekuatan segel digital (Signature) pada JWT.*

1. Masih di request `POST http://localhost:3000/mahasiswa`.
2. Buka tab **Authorization** tempat token ditempel.
3. Ubah **1 karakter saja** di bagian tengah token (misal ganti huruf `a` menjadi `z`).
4. Klik **Send**.
5. **Ekspektasi Hasil:**
   * **Status Code:** `401 Unauthorized`
   * **Response Body:**
     ```json
     {
       "message": "Token Tidak ditemukan Atau Kadaluarsa"
     }
     ```
   * *Poin Penjelasan Asdos:* *"Server langsung mengetahui bahwa token ini telah dimanipulasi di jalan karena signature-nya tidak lagi cocok dengan racikan `process.env.JWT_SECRET` milik server!"*

---

## 💡 Troubleshooting Saat Sesi Praktik di Kelas

| Gejala Masalah | Penyebab | Solusi |
|---|---|---|
| Response `404 Not Found` saat akses `/auth/register` | Lupa mendaftarkan route di `app.js` | Pastikan ada `app.use("/auth", authRoutes);` di [app.js](file:///c:/Muhammad%20Dzaky%20R/Asdos/Asdos%20PW%20II%20Pak%20Nur/SI0027-PAWII-Project/pertemuan-11-12-restful-api-crud-nosql/app.js). |
| Request Postman berputar (*hanging*) tanpa batas waktu | Fungsi `register` tidak memiliki `res.status().json()` | Tambahkan `res.status(201).json(...)` di akhir fungsi `register`. |
| Error `"secretOrPrivateKey must have a value"` | Variabel `JWT_SECRET` belum ada di `.env` | Tambahkan `JWT_SECRET=rahasia_anda` di file [.env](file:///c:/Muhammad%20Dzaky%20R/Asdos/Asdos%20PW%20II%20Pak%20Nur/SI0027-PAWII-Project/pertemuan-11-12-restful-api-crud-nosql/.env). |
| Token selalu ditolak meski baru login | Lupa spasi di `split` middleware | Cek [verificationToken.js](file:///c:/Muhammad%20Dzaky%20R/Asdos/Asdos%20PW%20II%20Pak%20Nur/SI0027-PAWII-Project/pertemuan-11-12-restful-api-crud-nosql/middlewares/verificationToken.js#L10), pastikan `header.split(' ')[1]` memakai spasi `' '`. |
