# CapyNion - Web3 Mental Health Chatbot

CapyNion adalah chatbot berbasis Web3 yang dirancang untuk membantu pengguna dalam masalah kesehatan mental dengan memberikan dukungan melalui percakapan.

## Description

CapyNion adalah chatbot yang memungkinkan pengguna untuk berbicara dan bertanya tentang masalah kesehatan mental. Didesain untuk memberikan kenyamanan dan dukungan, CapyNion menggunakan teknologi Web3 untuk menyimpan data percakapan secara aman dan terdesentralisasi. Setiap interaksi dengan chatbot disimpan dalam canister yang dikelola menggunakan DFINITY SDK, menjaga privasi dan keamanan data pengguna.

## Getting Started

### Dependencies

Sebelum memulai, pastikan Anda memiliki beberapa prasyarat berikut:

- **Ubuntu** atau terminal berbasis Ubuntu
- **DFINITY SDK**  
   Ikuti instruksi di [dokumentasi DFINITY](https://sdk.dfinity.org/docs/index.html) untuk menginstal `dfx` (SDK DFINITY).
- **Node.js dan npm**  
   Pastikan Node.js dan npm terinstal di komputer Anda. Jika belum, Anda bisa mengunduhnya dari [situs resmi Node.js](https://nodejs.org/).

### Installing

Ikuti langkah-langkah berikut untuk menginstal dan menyiapkan proyek di mesin lokal Anda:

1. **Clone repositori dari GitHub**:

   ```bash
    git clone <repository-url>
   ```

2. **Masuk ke direktori proyek:**:
   ```bash
    cd CapyNion
   ```
3. **Install dependencies yang diperlukan**:
   ```bash
    npm install
   ```

### Executing Program

Setelah semua dependencies terinstal, Anda bisa menjalankan proyek dengan mengikuti langkah-langkah ini:

1. **Menjalankan Internet Computer (ICP) local network:**:

   ```bash
    dfx start --clean --background
   ```

2. **Build dan Deploy Canister:**:
   ```bash
    npm run setup
    npm start
   ```

### Authors

- Ellen Chandra (ellen.chandra001@binus.ac.id)
- Kelson Vincien (kelson.vincien@gmail.com)
- Reynard Amadeus Joshua (reynard.joshua4949@gmail.com)
- Steven Imanuel Lambert (steven.lambert@binus.ac.id)
