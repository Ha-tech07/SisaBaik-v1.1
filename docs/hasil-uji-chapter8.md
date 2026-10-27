# Hasil Uji Chapter 8

> Isi berdasarkan hasil aktual setelah pengujian dijalankan. Jangan mengisi PASS/FAIL berdasarkan ekspektasi modul.

- Tanggal/waktu pengujian:
- Commit/branch:
- Database yang digunakan: `sisabaik_dev`
- Node.js:
- Perintah yang dijalankan:
- Hasil `npm run auth:test`:
- Bukti uji manual (tanpa password, hash, atau token):
- Catatan kegagalan dan tindak lanjut:

| Skenario | Status HTTP aktual | `error.code` aktual | Efek database aktual | Hasil |
|---|---:|---|---|---|
| Request tanpa token | | | | |
| Token rusak/kedaluwarsa/dicabut | | | | |
| Peran salah | | | | |
| Penyedia belum terverifikasi | | | | |
| Penyedia mengubah penawaran milik orang lain | | | | |
| Pembeli membaca pesanan milik orang lain | | | | |
| Logout mencabut token lama | | | | |
| Identitas tambahan pada body ditolak | | | | |
