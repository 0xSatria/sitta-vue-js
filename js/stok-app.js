new Vue({
  el: '#app',
  data: {
    daftarBahanAjar: dataBahanAjar,
    formBaru: {
      kodeLokasi: '',
      kodeBarang: '',
      namaBarang: '',
      jenisBarang: 'BMP',
      edisi: 1,
      stok: 0,
      cover: ''
    },
    errorTambah: ''
  },

  // ========== COMPUTED PROPERTIES ==========
  computed: {
    totalBuku() {
      return this.daftarBahanAjar.length;
    },
    totalStok() {
      return this.daftarBahanAjar.reduce((total, item) => total + item.stok, 0);
    },
    rataStok() {
      if (this.totalBuku === 0) return 0;
      return Math.round(this.totalStok / this.totalBuku);
    }
  },

  // ========== WATCHERS ==========
  watch: {
    // Watcher 1: Memantau total stok, beri peringatan jika terlalu rendah
    totalStok(nilaiBaru, nilaiLama) {
      if (nilaiBaru < 100 && nilaiLama >= 100) {
        alert('⚠️ Peringatan: Total stok keseluruhan kurang dari 100 eksemplar!');
      }
    },

    // Watcher 2: Memantau form cover, otomatis isi default jika kosong
    'formBaru.cover'(nilaiBaru) {
      if (nilaiBaru.trim() === '') {
        // Tidak langsung diubah di sini, biarkan methods yang handle
      }
    }
  },

  // ========== METHODS ==========
  methods: {
    tambahBarang() {
      // Validasi sederhana
      if (!this.formBaru.kodeLokasi || !this.formBaru.kodeBarang || !this.formBaru.namaBarang) {
        this.errorTambah = 'Harap isi Kode Lokasi, Kode Barang, dan Nama Barang!';
        return;
      }

      // Cek duplikat kode barang
      var sudahAda = this.daftarBahanAjar.find(function(item) {
        return item.kodeBarang === this.formBaru.kodeBarang;
      }.bind(this));

      if (sudahAda) {
        this.errorTambah = 'Kode Barang sudah ada! Gunakan kode yang berbeda.';
        return;
      }

      // Tambah ke array
      var coverFinal = this.formBaru.cover.trim() !== '' ? this.formBaru.cover.trim() : 'img/default.jpg';
      
      this.daftarBahanAjar.push({
        kodeLokasi: this.formBaru.kodeLokasi,
        kodeBarang: this.formBaru.kodeBarang,
        namaBarang: this.formBaru.namaBarang,
        jenisBarang: this.formBaru.jenisBarang || 'BMP',
        edisi: this.formBaru.edisi,
        stok: this.formBaru.stok,
        cover: coverFinal
      });

      // Reset form
      this.formBaru = {
        kodeLokasi: '',
        kodeBarang: '',
        namaBarang: '',
        jenisBarang: 'BMP',
        edisi: 1,
        stok: 0,
        cover: ''
      };
      this.errorTambah = '';
      alert('✅ Stok baru berhasil ditambahkan!');
    },

    tambahStok(index) {
      this.daftarBahanAjar[index].stok++;
    },

    kurangiStok(index) {
      if (this.daftarBahanAjar[index].stok > 0) {
        this.daftarBahanAjar[index].stok--;
      }
    }
  }
});