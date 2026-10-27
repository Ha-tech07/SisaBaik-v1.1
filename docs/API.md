# Kontrak API Chapter 8

Semua body request yang mengubah data memakai `Content-Type: application/json`. Respons sukses memakai `success` dan `data`; error memakai `success: false` dan `error.code`/`error.message`.

## Autentikasi
- `POST /api/auth/registrasi` — body: `namaLengkap`, `email`, `kataSandi`; membuat pembeli.
- `POST /api/auth/registrasi-penyedia` — body: `namaLengkap`, `email`, `kataSandi`, `namaUsaha`, `alamat`, `nomorTelepon`; membuat profil penyedia berstatus `menunggu`.
- `POST /api/auth/login` — body: `email`, `kataSandi`; mengembalikan `accessToken`, `tokenType`, `expiresIn`, dan profil pengguna aman.
- `GET /api/auth/saya` — membutuhkan `Authorization: Bearer <token>`.
- `POST /api/auth/logout` — membutuhkan token; mencabut semua token akun melalui `versi_token`.

## Penawaran
- `GET /api/penawaran` dan `GET /api/penawaran/:id` — katalog publik hanya menampilkan penawaran aktif, tersedia, belum berakhir, dan dari penyedia terverifikasi.
- `GET /api/penawaran/milik-saya` — penyedia terverifikasi; hanya data miliknya.
- `POST /api/penawaran`, `PUT /api/penawaran/:id`, `DELETE /api/penawaran/:id` — penyedia terverifikasi; mutasi dibatasi ke pemilik.
- Body POST/PUT tidak menerima `penyediaId`; server menentukan identitasnya.

## Pesanan
- `POST /api/pesanan` — hanya pembeli; body hanya `items` berisi `penawaranId` dan `kuantitas`.
- `GET /api/pesanan` dan `GET /api/pesanan/:id` — hanya pesanan milik pembeli atau pesanan kepada profil penyedia terautentikasi.
- Body tidak menerima `emailPembeli` atau `pembeliId`; server menentukan identitasnya.

## Status umum
`400` input/kontrak tidak valid; `401` token atau login tidak valid; `403` peran/status tidak diizinkan; `404` resource di luar cakupan; `409` konflik bisnis; `413` payload terlalu besar; `415` content type salah; `429` rate limit; `500/503` kesalahan server/database.
