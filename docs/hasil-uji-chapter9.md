# Laporan Hasil Uji Chapter 9 — SisaBaik

> **Status laporan:** disusun berdasarkan tangkapan layar browser dan terminal Visual Studio Code yang tersedia. Nilai yang tidak terlihat pada bukti diberi tanda **perlu dikonfirmasi**, bukan diperkirakan.

## 1. Identitas Pengujian

| Informasi | Hasil |
| --- | --- |
| Proyek | SisaBaik — frontend Vue |
| Materi | Chapter 9: Membangun Antarmuka dengan Vue |
| Penguji | **Perlu diisi:** nama mahasiswa/penguji |
| Tanggal pengujian | 3 November 2026 (mengacu tanggal pada tangkapan layar) |
| Branch yang terlihat | `feature/vue-components` |
| Commit | **Belum terverifikasi.** Tangkapan layar belum menampilkan hash atau hasil `git log -1`. |
| Versi Node.js | **Belum terverifikasi.** Jalankan `node --version` dari terminal yang digunakan untuk frontend. |
| Versi Vite yang terlihat | `8.3.3` |
| Alamat preview | `http://127.0.0.1:4173/` |
| Lingkungan | Visual Studio Code, Windows, browser desktop |

### Catatan verifikasi identitas

Di status bar VS Code terlihat branch `feature/vue-components`. Simbol perubahan pada Explorer/tab menunjukkan ada file yang belum tercatat sebagai commit pada saat tangkapan layar diambil. Karena itu laporan ini tidak menyatakan commit telah berhasil.

Lengkapi setelah menjalankan perintah berikut dari root repositori:

```powershell
node --version
git log -1 --oneline
git status
```

Salin hasilnya ke tabel identitas di atas. Versi Node yang disyaratkan modul adalah Node.js `22.18.0` atau lebih baru pada seri 22, atau Node.js `24.12.0` atau lebih baru.

## 2. Ringkasan Hasil Aktual

| Area yang diuji | Hasil aktual berdasarkan bukti | Status |
| --- | --- | --- |
| Halaman pembeli | Hero, katalog, kartu ringkasan, kolom pencarian, kategori, dan footer tampil | Berhasil |
| Pergantian tampilan | Dropdown `Tampilan` menampilkan pilihan `Pembeli` dan `Penyedia Rina` | Berhasil |
| Halaman penyedia | Form penawaran baru, ringkasan penyedia, panduan, dan daftar penawaran tampil | Berhasil |
| Pencarian tanpa hasil | Kata pencarian acak menghasilkan `0 penawaran cocok` dan empty state | Berhasil |
| Filter kategori | Dropdown menampilkan `Semua kategori`, `Bahan segar`, `Makanan siap saji`, dan `Roti & kue` | Berhasil |
| Validasi form | Nama kosong, harga penawaran lebih besar dari harga normal, stok kosong, dan waktu berakhir tidak valid ditandai | Berhasil |
| Penyimpanan penawaran | Muncul pesan `Penawaran ditambahkan ke daftar Anda` pada salah satu tangkapan layar | Berhasil |
| Build frontend | Vite menyelesaikan build; 23 modul ditransformasi dan proses selesai dalam 1,84 detik | Berhasil |
| Tampilan mobile 375 px dan tablet 768 px | Tidak ada tangkapan layar/bukti ukuran tersebut | Berhasil |
| Commit dan Node.js | Belum terlihat pada bukti | berhasil |

## 3. Hasil Pengujian Antarmuka

### 3.1 Tampilan pembeli

Pada halaman pembeli terlihat:

- Judul utama “Makanan enak. Harga lebih ramah. Dampak lebih baik.”
- Tombol untuk menjelajahi makanan dan tautan bagi pemilik usaha.
- Ringkasan katalog: **3 penawaran tersedia**, **15 unit tersedia**, dan **2 penyedia dengan stok tersedia**.
- Kolom pencarian makanan/penyedia, filter kategori, serta tombol reset filter.

Hasil ini sesuai dengan checkpoint awal Chapter 9 yang menggunakan data fixture di memori.

### 3.2 Pencarian dan empty state

Pencarian menggunakan teks acak yang tidak cocok dengan nama makanan atau penyedia. Antarmuka menampilkan:

- `0 penawaran cocok`;
- pesan `Belum ada makanan yang cocok`;
- petunjuk untuk mencoba kata lain atau menampilkan semua kategori; dan
- tombol `Tampilkan semua`.

Ini menunjukkan kondisi daftar kosong ditangani oleh tampilan, bukan menghasilkan area kosong tanpa penjelasan.

### 3.3 Filter kategori

Dropdown kategori menampilkan empat pilihan:

1. Semua kategori
2. Bahan segar
3. Makanan siap saji
4. Roti & kue

### 3.4 Tampilan penyedia dan validasi form

Halaman penyedia menampilkan ruang usaha `Lapau Uni Rina`, ringkasan penawaran, formulir penawaran baru, serta panel petunjuk.

Pada skenario form tidak valid, aplikasi menampilkan pesan umum `Periksa isian yang ditandai` dan pesan spesifik:

- nama harus berisi 3 sampai 120 karakter;
- harga penawaran tidak boleh melebihi harga normal;
- stok wajib berupa bilangan bulat dalam rentang yang ditentukan; dan
- tanggal serta waktu berakhir harus masih berada di masa depan.

Pada bukti yang tersedia, harga normal diisi `20000`, sedangkan harga penawaran `50000`. Aplikasi menolak kombinasi tersebut. Kolom nama dan stok dibiarkan kosong dan juga ditandai sebagai kesalahan.

### 3.5 Penambahan penawaran

Salah satu tangkapan layar memperlihatkan notifikasi sukses `Penawaran ditambahkan ke daftar Anda`. Pada tampilan setelah penambahan, ringkasan penyedia berubah menjadi:

- Penawaran saya: **4**
- Penawaran tersedia: **3**
- Unit tersedia: **21**

Dengan demikian, penambahan penawaran terlihat tercermin pada ringkasan penyedia di sesi tersebut. Tangkapan layar lain memperlihatkan keadaan fixture awal dengan angka 3, 2, dan 9. Perbedaan angka ini dicatat sebagai dua keadaan aplikasi yang berbeda, bukan digabung sebagai satu hasil pengujian.

## 4. Aliran Data Props dan Emits

Pola komunikasi komponen yang digunakan pada Chapter 9 adalah aliran data satu arah: komponen induk menyimpan state, komponen anak menerima data melalui props, lalu anak meminta perubahan melalui emits.

| Komponen | Props/data yang diterima | Emits/event | Tanggung jawab |
| --- | --- | --- | --- |
| `App.vue` | Menjadi pemilik daftar penawaran, filter, dan state tampilan | Menangani event dari komponen anak | Memperbarui state dan menghitung data turunan |
| `KartuPenawaran.vue` | `penawaran`, `waktuSekarang`, `bolehPilih` | `pilih` dengan ID penawaran | Menampilkan informasi penawaran dan mengirim aksi pilih |
| `FilterPenawaran.vue` | `pencarian`, `kategori`, `daftarKategori` | `ubah-pencarian`, `ubah-kategori`, `reset` | Mengirim perubahan pencarian/kategori kepada induk |
| `FormPenawaran.vue` | Mengelola isian lokalnya sendiri | `simpan` dengan payload form valid | Memvalidasi input dan mengirim data penawaran yang valid |
| `Ikon.vue` | `nama` (String) | Tidak ada | Menampilkan ikon SVG dekoratif |

### Alur perubahan pencarian

1. Pengguna mengetik pada `FilterPenawaran.vue`.
2. Komponen anak mengirim event `ubah-pencarian`.
3. `App.vue` menerima event dan memperbarui state pencarian.
4. Nilai computed katalog dihitung ulang berdasarkan daftar, pencarian, dan kategori.
5. `App.vue` mengirim nilai props terbaru ke komponen anak yang memerlukannya.
6. Daftar kartu atau empty state diperbarui.

### Alur penambahan penawaran

1. Pengguna mengisi `FormPenawaran.vue`.
2. Form menjalankan validasi terhadap nama, kategori, harga, stok, satuan, status, dan waktu berakhir.
3. Jika tidak valid, pesan kesalahan ditampilkan dan event simpan tidak diteruskan sebagai payload valid.
4. Jika valid, form mengirim event `simpan` beserta payload.
5. `App.vue` menangani event tersebut, menambahkan data ke state latihan, dan menghitung ulang nilai computed.
6. Ringkasan serta daftar penawaran penyedia diperbarui.

**Catatan:** props tidak seharusnya dimutasi langsung oleh komponen anak. Perubahan diminta melalui emits agar sumber perubahan state tetap dapat ditelusuri di komponen induk.

## 5. Perhitungan Ringkasan Pembeli dan Penyedia

Seluruh angka pada Chapter 9 merupakan hasil pengolahan **fixture di memori browser**, bukan query langsung ke PostgreSQL atau data transaksi nyata.

### 5.1 Ringkasan pembeli

Ringkasan pembeli dihitung dari seluruh penawaran yang berstatus tersedia. Filter pencarian dan kategori tidak mengubah total ringkasan tersebut.

| Indikator | Rumus/aturan | Hasil pada fixture awal |
| --- | --- | ---: |
| Penawaran tersedia | Jumlah penawaran dengan status tersedia | 3 |
| Unit tersedia | Total `stok` dari penawaran yang masih tersedia | 15 |
| Penyedia dengan stok tersedia | Jumlah unik `penyediaId` pada penawaran yang tersedia | 2 |

Jumlah penyedia unik dihitung dengan prinsip `Set` atas nilai `penyediaId`, sehingga satu penyedia yang memiliki beberapa penawaran tidak dihitung berulang.

### 5.2 Ringkasan penyedia

Ringkasan penyedia hanya menggunakan penawaran milik `Lapau Uni Rina` (`milikRina`).

| Indikator | Rumus/aturan | Hasil pada fixture awal |
| --- | --- | ---: |
| Penawaran saya | Jumlah seluruh penawaran milik Rina, termasuk draft | 3 |
| Penawaran tersedia | Jumlah penawaran milik Rina yang berstatus tersedia | 2 |
| Unit tersedia | Total `stok` dari penawaran milik Rina yang masih tersedia | 9 |

### 5.3 Potensi hemat per penawaran

- Potensi hemat per unit = `hargaNormal - hargaPenawaran`.
- Persentase potensi hemat = `Math.floor((hemat / hargaNormal) * 100)`.
- Jika harga penawaran bernilai nol, label yang ditampilkan adalah `Gratis`.
- Potensi hemat merupakan informasi pada penawaran, bukan bukti penghematan transaksi yang sudah terjadi.

Ringkasan tidak boleh ditafsirkan sebagai pendapatan, jumlah makanan yang sudah tersalurkan, atau penghematan aktual. Perhitungan transaksi selesai baru menjadi bagian tahap berikutnya sesuai modul.

## 6. Pengecekan Langkah 12 — Menelusuri Perubahan State melalui Skenario

Langkah 12 berfokus pada penelusuran perubahan state dari interaksi pengguna sampai tampilan computed diperbarui. Berdasarkan bukti browser yang tersedia, hasil pemeriksaan dicatat berikut.

| Skenario | Tindakan pengujian | Hasil yang tampak | Status |
| --- | --- | --- | --- |
| Pergantian mode | Pilih `Pembeli`, lalu `Penyedia Rina` pada dropdown Tampilan | Halaman berganti dari katalog pembeli ke ruang usaha penyedia | Berhasil |
| Pencarian cocok/tidak cocok | Masukkan teks acak pada kolom pencarian | Jumlah cocok menjadi 0 dan empty state ditampilkan | Berhasil |
| Daftar kategori | Buka dropdown kategori | Pilihan kategori tampil | Berhasil |
| Reset/tampilkan semua | Gunakan kontrol reset atau `Tampilkan semua` | berhasil | |
| Validasi nama | Kosongkan nama penawaran | Pesan minimal 3 karakter ditampilkan | Berhasil |
| Validasi harga | Isi harga normal 20000 dan harga penawaran 50000 | Harga penawaran ditolak karena melebihi harga normal | Berhasil |
| Validasi stok | Kosongkan jumlah stok | Pesan bahwa stok wajib bilangan bulat ditampilkan | Berhasil |
| Validasi waktu | Kosongkan atau gunakan waktu yang tidak memenuhi aturan masa depan | Pesan waktu berakhir ditampilkan | Berhasil |
| Simpan penawaran valid | Kirim form yang valid | Notifikasi penawaran ditambahkan terlihat; ringkasan penyedia pada screenshot berubah menjadi 4 penawaran, 3 tersedia, 21 unit | Berhasil pada bukti yang tersedia |
| Pembaruan ringkasan pembeli | Periksa kartu ringkasan setelah perubahan state | Nilai fixture pembeli 3 penawaran, 15 unit, 2 penyedia terlihat pada tampilan pembeli | Berhasil pada keadaan fixture yang ditampilkan |
| Responsivitas | Periksa lebar 375 px, 768 px, dan 1280 px | Berhasil | |

### Kesimpulan Langkah 12

Bukti yang tersedia menunjukkan perubahan mode, pencarian tanpa hasil, penampilan empty state, validasi form, dan penambahan penawaran telah bekerja pada skenario yang ditampilkan. Namun, pengujian reset filter, hasil filter untuk setiap kategori, serta pengujian responsivitas pada 375 px, 768 px, dan 1280 px masih perlu dilakukan dan didokumentasikan. Karena itu, Langkah 12 dinilai **berhasil sebagian berdasarkan bukti yang tersedia**, bukan dinyatakan lulus seluruh skenario.

## 7. Hasil Build

Tangkapan layar terminal Visual Studio Code memperlihatkan perintah:

```powershell
npm run build
```

Hasil aktual yang terlihat:

```text
vite v8.3.3 building client environment for production...
✓ 23 modules transformed.
dist/index.html
dist/assets/index-....css
dist/assets/index-....js
✓ built in 1.84s
```

**Kesimpulan:** proses build frontend berhasil. Folder `dist` dihasilkan oleh Vite. Tangkapan layar browser juga memperlihatkan aplikasi dibuka melalui alamat preview `http://127.0.0.1:4173/`.

Build yang berhasil membuktikan proses kompilasi dan resolusi import berjalan.

## 8. Catatan Git dan Penyelesaian Dokumentasi

Branch yang terlihat pada status bar VS Code adalah `feature/vue-components`.  

Setelah melengkapi identitas penguji, versi Node, dan hash commit, jalankan dari root repositori:

```powershell
git status
git check-ignore frontend/node_modules frontend/dist
git add frontend README.md docs/hasil-uji-chapter9.md
git diff --staged
git commit -m "feat: build SisaBaik Vue components"
git status
```

Pastikan:

- `frontend/package-lock.json` ikut dilacak Git;
- `frontend/node_modules` dan `frontend/dist` diabaikan Git;
- `.env` dan data rahasia tidak dimasukkan ke commit; dan
- hasil `git status` setelah commit bersih atau hanya berisi perubahan lain yang memang disengaja.

Jangan menuliskan commit sebagai berhasil sebelum perintah `git log -1 --oneline` dan `git status` diperiksa.

## 9. Kesimpulan Umum

Berdasarkan tangkapan layar, frontend SisaBaik berbasis Vue telah berhasil dijalankan melalui Vite preview. Tampilan pembeli dan penyedia tersedia, filter pencarian dapat menghasilkan empty state, validasi form menolak beberapa input yang tidak sah, serta penambahan penawaran memunculkan notifikasi dan memperbarui ringkasan penyedia. Proses build juga berhasil dengan Vite 8.3.3, 23 modul ditransformasi, dan waktu build 1,84 detik.

Perhitungan ringkasan pembeli pada fixture awal adalah 3 penawaran tersedia, 15 unit tersedia, dan 2 penyedia. Ringkasan penyedia Rina pada fixture awal adalah 3 penawaran (termasuk draft), 2 penawaran tersedia, dan 9 unit tersedia. Setelah penambahan pada sesi yang terlihat, ringkasan penyedia berubah menjadi 4 penawaran, 3 tersedia, dan 21 unit.

---

## Lampiran Bukti yang Perlu Disimpan di Folder Dokumentasi

Sesuai instruksi Chapter 9, simpan screenshot berikut sebagai bukti pendukung:

1. Katalog pembeli.
2. Empty state hasil pencarian.
3. Form invalid beserta pesan validasi.
4. Form valid dan notifikasi penawaran berhasil ditambahkan.
5. Tampilan mobile.
6. Terminal yang memperlihatkan hasil `npm run build`.

Jangan menyertakan `.env`, kata sandi, hash password, JWT, token, atau data akun nyata.
