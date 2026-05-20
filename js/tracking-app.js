new Vue({
  el: '#app',
  data: {
    nomorDO: '',
    hasilDO: null,
    errorPesan: ''
  },

  // ========== COMPUTED PROPERTIES ==========
  computed: {
    persentase() {
      if (!this.hasilDO || this.hasilDO.perjalanan.length === 0) return 0;
      var progres = Math.round((this.hasilDO.perjalanan.length / 6) * 100);
      return progres > 100 ? 100 : progres;
    }
  },

  // ========== WATCHERS ==========
  watch: {
    // Watcher 1: Memantau nomorDO, bersihkan error saat user mengetik ulang
    nomorDO(nilaiBaru) {
      if (nilaiBaru.trim() === '') {
        this.errorPesan = '';
        this.hasilDO = null;
      }
    },

    // Watcher 2: Memantau hasilDO, tampilkan alert jika status sudah "Dikirim"
    hasilDO(nilaiBaru) {
      if (nilaiBaru && nilaiBaru.status === 'Dikirim') {
        // Tidak pakai alert agar tidak mengganggu, cukup console.log
        console.log('Status pengiriman: SUDAH TERKIRIM ke ' + nilaiBaru.nama);
      }
    }
  },

  // ========== METHODS ==========
  methods: {
    cariDO() {
      var nomor = this.nomorDO.trim();

      // Validasi input
      if (nomor === '') {
        this.errorPesan = 'Harap masukkan Nomor DO!';
        this.hasilDO = null;
        return;
      }

      // Cari data
      var data = dataTracking[nomor];

      if (data) {
        this.hasilDO = data;
        this.errorPesan = '';
      } else {
        this.hasilDO = null;
        this.errorPesan = '❌ Nomor DO "' + nomor + '" tidak ditemukan. Silakan coba lagi.';
      }
    },

    resetPencarian() {
      this.nomorDO = '';
      this.hasilDO = null;
      this.errorPesan = '';
    }
  }
});