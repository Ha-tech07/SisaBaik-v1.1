# SisaBaik API — Chapter 8

## Persyaratan
- Node.js 22 atau lebih baru
- PostgreSQL lokal dan database `sisabaik_dev`
- Dependency npm

## Menyiapkan
1. Pastikan skema Chapter 6–7 dan data lama tersedia. Jangan menjalankan ulang `database/01_schema.sql` pada database berisi data.
2. Terapkan migrasi: `psql -h localhost -U postgres -d sisabaik_dev -v ON_ERROR_STOP=1 -f database/07_auth.sql`
3. Salin `.env.example` menjadi `.env`, lalu isi kredensial PostgreSQL lokal dan `JWT_SECRET` dengan 64 digit hex acak. Jangan commit `.env`.
4. Jalankan `npm install`, lalu `npm run dev`.
5. Buka `http://127.0.0.1:3000/auth.html`.

## Perintah
- `npm run db:check` — memeriksa koneksi database
- `npm run auth:test` — uji integrasi Chapter 8; hanya untuk database praktikum lokal
- `npm run penyedia:verifikasi -- email@domain.com` — menyetujui penyedia melalui CLI lokal

## Keamanan
Password disimpan sebagai hash bcrypt, JWT hanya disimpan di memori halaman latihan, dan endpoint bisnis mengambil identitas dari sesi terverifikasi. Jangan membagikan password, hash, JWT, atau `.env`.
