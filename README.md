# Mampu Frontend Test Project

Proyek ini adalah aplikasi web direktori pengguna yang dibangun sebagai bagian dari tes frontend. Aplikasi ini menampilkan daftar pengguna beserta aktivitas mereka (jumlah post dan pending todo), serta detail pengguna.

## 🛠 Tech Stack yang Digunakan

Proyek ini dibangun menggunakan teknologi modern untuk memastikan performa, skalabilitas, dan pengalaman developer yang baik:

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **Library UI**: [React 19](https://react.dev/)
- **Bahasa Pemrograman**: [TypeScript](https://www.typescriptlang.org/) untuk *type safety* yang kuat.
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) untuk styling berbasis utility yang cepat dan responsif.
- **Data Fetching & State Management**: [TanStack React Query v5](https://tanstack.com/query/latest) untuk mengelola *server state*, *caching*, dan sinkronisasi data.
- **Testing**: [Jest](https://jestjs.io/) & [React Testing Library](https://testing-library.com/) untuk pengujian unit (unit testing).
- **Iconography**: [Lucide React](https://lucide.dev/) untuk ikon SVG yang ringan dan konsisten.

---

## 📁 Struktur Folder

Proyek ini menggunakan struktur folder yang memisahkan tanggung jawab (Separation of Concerns) agar kode lebih mudah di-*maintain*:

```text
src/
├── __mocks__/        # Mocking data atau module untuk keperluan testing
├── __tests__/        # Kumpulan file unit test (Jest & React Testing Library)
├── app/              # Next.js App Router (pages, layouts, error boundaries, dll.)
├── components/       # Komponen UI React yang reusable
│   ├── skeletons/    # Komponen loading skeleton
│   ├── ui/           # Komponen dasar (buttons, inputs, dll.)
│   └── users/        # Komponen spesifik domain pengguna (UserList, UserDetail, dll.)
├── hooks/            # Custom React Hooks (membungkus logika React Query & URL state)
├── lib/              # Fungsi utilitas (utils.ts seperti cn, truncate, debounce)
├── providers/        # Context Providers (misalnya QueryClientProvider)
├── services/         # Layer pemanggilan API (api.ts, user.service.ts)
└── types/            # Definisi interface dan tipe data TypeScript global
```

---

## 🏗 Arsitektur Desain

Proyek ini mengadopsi arsitektur berbasis komponen dan *Separation of Concerns*:

1. **Service Layer (`services/`)**: Bertanggung jawab khusus untuk berkomunikasi dengan API eksternal. Semua konfigurasi `fetch` dan penanganan *error* dari API difokuskan di sini.
2. **Custom Hooks Layer (`hooks/`)**: Logika *data fetching* (menggunakan React Query), manipulasi data (sorting, filtering), dan sinkronisasi URL (mengambil parameter URL) diisolasi ke dalam *custom hooks* (seperti `useGetAllUser`). Hal ini membuat komponen UI menjadi bersih dan fokus hanya pada tampilan.
3. **Container-Presenter Pattern**: Komponen UI dipecah menjadi komponen cerdas (*Container*) yang mengambil data dari *hooks*, dan komponen presentasional yang hanya merender UI berdasarkan *props*.
4. **URL as Single Source of Truth**: State aplikasi seperti pagination, filter, dan pencarian disimpan di parameter URL (`?page=1&search=Budi`). Ini memungkinkan pengguna membagikan URL (*shareable links*) dan menggunakan navigasi bawaan browser (Back/Forward).

---

## 🚀 Fitur Optimalisasi (Performance & UX)

Aplikasi ini mengimplementasikan beberapa fitur dan teknik untuk memastikan performa yang sangat optimal dan pengalaman pengguna yang mulus:

### 1. Incremental Static Regeneration (ISR)
Data *fetching* yang ada di layer *service* memanfaatkan fitur asli bawaan Next.js `fetch` dengan opsi revalidasi:
```typescript
const res = await fetch(finalUrl, {
  next: { revalidate: 60 }, 
});
```
**Manfaat**: Halaman atau data dapat di-*cache* oleh server Next.js dan diperbarui di latar belakang setiap 60 detik. Ini memberikan performa pemuatan yang sangat cepat setara halaman statis, sambil tetap memastikan data tidak terlalu usang.

### 2. React Query Caching
Di sisi *client*, data di-*cache* menggunakan `@tanstack/react-query` dengan pengaturan `staleTime: 60_000` (1 menit).
**Manfaat**: Mencegah pemanggilan API yang redundan saat pengguna berpindah halaman atau berinteraksi dengan antarmuka yang membutuhkan data yang sama berulang kali.

### 3. Debounce Pencarian
Pencarian teks menggunakan fitur **Debounce** (via `useDebounce` hook di `lib/utils.ts`).
**Manfaat**: Menunda proses *filtering* atau pemanggilan fungsi selama jeda waktu tertentu (misalnya 300ms) setelah pengguna berhenti mengetik. Ini mencegah CPU aplikasi atau jaringan kewalahan dengan eksekusi berulang pada setiap ketikan tombol (*keystroke*).

### 4. Pagination
Aplikasi menerapkan **Pagination** (pembagian halaman) untuk daftar pengguna.
**Manfaat**: Membatasi jumlah node DOM yang dirender ke layar pada satu waktu (misalnya 5 baris per halaman). Rendering *list* yang sangat panjang tanpa batasan dapat menyebabkan performa *scroll* dan responsivitas UI menurun drastis.

### 5. Skeleton Loading States
Saat data sedang diambil atau diproses, aplikasi menampilkan komponen *Skeleton* (seperti tulang rangka UI).
**Manfaat**: Mencegah layout *shift* (pergeseran tata letak) yang mengganggu dan memberikan indikasi visual langsung kepada pengguna bahwa konten sedang dimuat.

### 6. Filter & Sort Dinamis
Pemrosesan *filter* dan *sorting* dilakukan menggunakan algoritma yang efisien dan reaktif. Kombinasi dari URL State (`useSearchParams`) dengan memoization di *hooks* memastikan UI sangat reaktif terhadap perubahan parameter.

### 7. Unit Testing
Aplikasi ini dilengkapi dengan unit testing menggunakan Jest dan React Testing Library.
**Manfaat**: Memastikan kualitas kode dan mencegah regresi saat melakukan perubahan pada kode.

---

## 🧪 Cara Menjalankan Tests

Mengaktifkan dan menjalankan unit test sangatlah mudah. Jalankan perintah berikut pada terminal di direktori root proyek:

```bash
npm run test
# atau
yarn test
# atau
pnpm test
# atau
bun test
```

### 8. Responsive Design
Aplikasi ini dirancang dengan pendekatan mobile-first menggunakan Tailwind CSS v4.
**Manfaat**: Memastikan tampilan dan pengalaman pengguna yang optimal di berbagai ukuran layar, mulai dari perangkat seluler hingga desktop.
