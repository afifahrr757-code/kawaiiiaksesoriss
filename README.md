# 🎀 KawaiiCraft & Co. v2 — Website E-Commerce Aksesoris Unik (Login & Pembelian)

Template website toko online modern dan responsif untuk jual beli aksesoris unik & lucu, kini dilengkapi dengan sistem **Autentikasi Pengunjung (Daftar & Login)**, **Alur Pembelian / Checkout Lengkap**, serta **Riwayat Pesanan** per akun.

## ✨ Fitur Utama
- **Daftar Akun & Login Pengunjung:** Pengunjung dapat mendaftar akun baru atau masuk menggunakan akun yang sudah ada (tersedia juga akun demo siap pakai: `demo@kawaiicraft.id` / `123456`).
- **Pembelian Langsung & Checkout Keranjang:**
  - Tombol **Beli** langsung pada setiap kartu produk maupun **Lanjut Pembelian** dari keranjang belanja.
  - Formulir alamat pengiriman, perhitungan gratis ongkir otomatis (minimal belanja Rp 100.000), dan pilihan metode pembayaran (QRIS, Transfer Bank, COD).
- **Riwayat Pesanan per Akun:** Setiap transaksi tersimpan di akun pembeli dan dapat dilihat kembali melalui ikon paket (📦) di bilah navigasi.
- **Katalog Interaktif:** Filter kategori, pencarian *real-time*, pengurutan harga, dan penyimpanan *wishlist*.

## 📁 Struktur File
```text
aksesoris_unik_store_v2/
├── index.html   # Struktur halaman, modal login/daftar, checkout, & riwayat pesanan
├── style.css    # Styling pastel aesthetic & responsif
├── script.js    # Logika autentikasi, keranjang, transaksi pembelian, & riwayat order
└── README.md    # Dokumentasi panduan penggunaan
```

## 🚀 Cara Menjalankan
1. Ekstrak file ZIP ke dalam satu folder.
2. Buka `index.html` menggunakan browser (Chrome, Edge, Safari, atau Firefox).
3. Klik **Masuk / Daftar** di pojok kanan atas untuk mencoba fitur login atau mendaftar akun baru, lalu coba lakukan pembelian produk.

> **Catatan Pengembangan:** Untuk keperluan demo/prototipe frontend, data akun dan pesanan disimpan di `localStorage` browser. Jika ingin digunakan untuk transaksi komersial skala besar secara online lintas perangkat, hubungkan fungsi login dan penyimpanan pesanan di `script.js` ke layanan backend seperti **Firebase**, **Supabase**, atau **Google Apps Script**.
