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

  watch: {
    totalStok(nilaiBaru, nilaiLama) {
      if (nilaiBaru < 100 && nilaiLama >= 100) {
        alert('⚠️ Peringatan: Total stok keseluruhan kurang dari 100 eksemplar!');
      }
    }
  },

  methods: {
    tambahBarang() {
      if (!this.formBaru.kodeLokasi || !this.formBaru.kodeBarang || !this.formBaru.namaBarang) {
        this.errorTambah = 'Harap isi Kode Lokasi, Kode Barang, dan Nama Barang!';
        return;
      }

      var sudahAda = this.daftarBahanAjar.find(function(item) {
        return item.kodeBarang === this.formBaru.kodeBarang;
      }.bind(this));

      if (sudahAda) {
        this.errorTambah = 'Kode Barang sudah ada! Gunakan kode yang berbeda.';
        return;
      }

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
  var stokBaru = this.daftarBahanAjar[index].stok + 1;
  this.$set(this.daftarBahanAjar[index], 'stok', stokBaru);
},
kurangiStok(index) {
  if (this.daftarBahanAjar[index].stok > 0) {
    var stokBaru = this.daftarBahanAjar[index].stok - 1;
    this.$set(this.daftarBahanAjar[index], 'stok', stokBaru);
  }
}
  }
});