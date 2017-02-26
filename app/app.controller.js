(function () {
	'use strict';

	angular
		.module('mioc')
		.controller('headerController', headerController)
		.controller('dashboardController', dashboardController)
		.controller('modalController', modalController)
		;

	headerController.inject = [];
	dashboardController.inject = ['NgMap', 'dataApi', 'logger', '$scope', '$rootScope', '$http', '$uibModal'];
	modalController.inject = ['$uibModal', '$uibModalInstance', 'modalData'];
	function headerController() {
		var vm = this;


		activate();

		////////////////

		function activate() { }
	}


	function dashboardController(NgMap, dataApi, logger, $scope, $rootScope, $http, $uibModal) {
		var vm = this;

		var src = "http://edgarjeremy.com/folderbaru/kml/doc.kml";
		var src1 = "http://laporan.manadokota.go.id/assets/geo/kelurahan/pinaesaan_bangunan.kmz";
		var src2 = "http://edgarjeremy.com/folderbaru/kml/wenang.kml";
		var src3 = "http://laporan.manadokota.go.id/assets/geo/kota/";

		vm.kmlManado = [];

		vm.kmlKecamatan = [];

		vm.kmlKelurahan = [];

		vm.treeList = [];

		var agama = [
			'Islam',
			'Kristen',
			'Katolik',
			'Hindu',
			'Budha',
			'Konghuchu'
		]
		var status_kawin = [
			'Belum Kamin',
			'Sudah Kamin',
			'Cerai Hidup',
			'Cerai Mati'
		]
		var jenis_kelamin = [
			'Laki-Laki',
			'Perempuan'
		]

		var status_pembayaran = [
			'Belum',
			'Sudah'
		]

		var status_hubkel = [
			'Kepala Keluarga',
			'Suami',
			'Istri',
			'Anak',
			'Menantu',
			'Cucu',
			'Orang Tua',
			'Mertua',
			'Familiar',
			'Pembantu',
			'Lainnya',
		]

		var pend_terakhir = [
			'Tidak/ Belum Sekolah',
			'Belum Tamat SD/ Sederajat',
			'Tamat SD/ Sederajat',
			'SLTP/ Sederajat',
			'Diploma I',
			'Diploma II',
			'Strata I',
			'Strata II',
			'Strata III'
		]

		vm.windowDetails =
			{
				'daftar_kk': [
					{
						'Nomor Kartu Keluarga': undefined,
						'anggota': [
							{
								'Nama': undefined,
								'Tempat/Tgl Lahir': undefined,
								'Jenis Kelamin': undefined,
								'Alamat': undefined,
								'Agama': undefined,
								'Status Perkawinan': undefined,
								'Pekerjaan': undefined
							}
						]
					}
				],
				'sppt': {
					'NOP': undefined,
					'Nama Wajib Pajak': undefined,
					'Luas Bumi': undefined,
					'Luas Bangunan': undefined,
					'Tahun Pajak': undefined,
					'Gambar': undefined,
					'Status Pembayaran': undefined
				}
			}
			;

		vm.treeListFunc = function (baseURL, nama) {

			var kmlLoadFunc = function (fileName) {
				var kmlLayer = new google.maps.KmlLayer({
					'url': baseURL + fileName
				})

				google.maps.event.addListener(kmlLayer, 'click', function (e) {
					vm.windowDetails = {
						'daftar_kk': [],
						'sppt': undefined
					};
					dataApi.getDataBangunan(e.featureData.name).then(function (response) {
						// console.log(response);	
						vm.windowDetails.jumlah_kk = response.daftar_kk.length;
						vm.windowDetails.jumlah_anggota = 0;
						angular.forEach(response.daftar_kk, function (val, key) {
							vm.windowDetails.daftar_kk.push(
								{
									'Nomor Kartu Keluarga': val.NIK_KK,
									'Nama Kepala Keluarga': val.NAMA_KEP,
									'anggota': []
								}
							)
							console.log(val);
							vm.windowDetails.jumlah_anggota += val.anggota.length
							angular.forEach(val.anggota, function (values, keys) {
								vm.windowDetails.daftar_kk[key].anggota.push(
									{
										'Nama': values.NAMA_LGKP,
										'NIK': values.NIK,
										'Usia': new Date().getFullYear() - new Date(values.TGL_LHR).getFullYear(),
										'Status Hubungan Dalam Keluarga': status_hubkel[(values.STAT_HBKEL - 1)],
										'Pendidikan Terakhir': pend_terakhir[(values.PDDK_AKH - 1)],
										'Pekerjaan': 'Swasta',
										'Tempat/Tgl Lahir': values.TGL_LHR,
										'Jenis Kelamin': jenis_kelamin[(values.JENIS_KLMIN - 1)],
										'Alamat': val.ALAMAT,
										'Agama': agama[(values.AGAMA - 1)],
										'Status Perkawinan': status_kawin[(values.STAT_KWN - 1)],
										'Foto': 'http://laporan.manadokota.go.id/assets/geo/foto_bio/' + values.PAS_FOTO
									}
								)
							})
						})
						vm.windowDetails.sppt =
							{
								'NOP': response.sppt.NOP,
								'Nama Wajib Pajak': response.sppt.NM_WP_SPPT,
								'Luas Bumi': response.sppt.LUAS_BUMI_SPPT,
								'Luas Bangunan': response.sppt.LUAS_BNG_SPPT,
								'Tahun Pajak': response.sppt.THN_PAJAK_SPPT,
								'Gambar': 'http://laporan.manadokota.go.id/assets/geo/foto_bangunan/' + response.sppt.FOTO_BANGUNAN,
								'Status Pembayaran': (response.sppt.STATUS_PEMBAYARAN_SPPT == 1) ? "Sudah Membayar" : "Belum Membayar"
							}
						console.log(vm.windowDetails)

					})
				})

				return kmlLayer;
			}

			vm.treeList = {
				'group': [
					{
						'id': 1,
						'label': 'Bangunan',
						'kmlLayer': kmlLoadFunc(nama + '_bangunan1.kmz')
					}, {
						'id': 2,
						'label': 'Bidang Tanah',
						'kmlLayer': kmlLoadFunc(nama + '_bidangtanah1.kmz')
					}, {
						'id': 3,
						'label': 'Jalan',
						'kmlLayer': kmlLoadFunc(nama + '_jalan.kmz')
					}, {
						'id': 4,
						'label': 'Lingkungan',
						'kmlLayer': kmlLoadFunc(nama + '_lingkungan.kmz')
					}
				], 'group2': [
					{
						'id': 5,
						'label': 'Penggunaan Lahan',
						'kmlLayer': kmlLoadFunc(nama + '_penggunaanlahan.kmz')
					}, {
						'id': 6,
						'label': 'Sempadan Jalan',
						'kmlLayer': kmlLoadFunc(nama + '_sempadanjln.kmz')
					}, {
						'id': 7,
						'label': 'Sempadan Sungai',
						'kmlLayer': kmlLoadFunc(nama + '_sempadansungai.kmz')
					}
				], 'group3': [
					{
						'id': 8,
						'label': 'Status PBB 2016',
						'kmlLayer': kmlLoadFunc(nama + '_statusPBB2016.kmz')
					}
				], 'group4': [
					{
						'id': 11,
						'label': 'Penyebaran Penduduk',
						'kmlLayer': kmlLoadFunc(nama + '_penyebaranpenduduk.kmz')
					}
				]
			}
			console.log(vm.treeList);
		}

		NgMap.getMap().then(function (map) {

			var kmlLoadFunc = function (fileName) {
				var kmlLayer = new google.maps.KmlLayer({
					'url': src3 + fileName
				})

				google.maps.event.addListener(kmlLayer, 'click', function (e) {
					console.log(e.featureData);
					console.log('bijon', $http);
					$scope.$apply(function () {
						console.log($http);
						dataApi.getDataBangunan(100).then(function (response) {
							console.log(response);
						})
						$http.get('http://laporan.manadokota.go.id/index.php/api/ambil_data_bangunan/100').then(function (res) {
							console.log(res)
						})
					})
				})

				return kmlLayer;
			}

			vm.kmlManado.push({
				'id': 1,
				'label': 'Kota Manado',
				'value': 'manado',
				'type': 'kota',
				'kmlLayer': kmlLoadFunc('manado_batas.kmz')
			})

			vm.treeListFunc(src3, 'manado');

		});

		$scope.$on('treeListToggle', function (e, d1, d2) {
			if (d2 == true) {
				NgMap.getMap().then(function (map) {
					d1.kmlLayer.setMap(map);
				})
			} else {
				d1.kmlLayer.setMap(null);
			}
			console.log(d1);
		})

		var kmlLayerHidden = function (data) {
			angular.forEach(vm.kmlManado,
				function (val, key) {
					if (val.kmlLayer != "") {
						val.kmlLayer.setMap(null);
					}
				})
			angular.forEach(vm.kmlKecamatan,
				function (val, key) {
					if (val.kmlLayer != "") {
						val.kmlLayer.setMap(null);
					}
				})
			angular.forEach(vm.kmlKelurahan,
				function (val, key) {
					if (val.kmlLayer != "") {
						val.kmlLayer.setMap(null);
					}
				})
			angular.forEach(vm.treeList,
				function (val, key) {
					angular.forEach(val, function (v, k) {
						if (v.kmlLayer != "") {
							v.kmlLayer.setMap(null);
						}
					})
				})

		}

		vm.kmlToggle = function (data) {

			NgMap.getMap().then(function (map) {

				kmlLayerHidden();

				data.kmlLayer.setMap(map);

				var url_kota = 'http://laporan.manadokota.go.id/assets/geo/kota/';
				var url_kecamatan = 'http://laporan.manadokota.go.id/assets/geo/kecamatan/';
				var url_kelurahan = 'http://laporan.manadokota.go.id/assets/geo/kelurahan/';

				vm.treeList = [];


				if (data.type == 'kota') {

					vm.treeListFunc(url_kota, data.value);

				} else if (data.type == 'kecamatan') {

					vm.treeListFunc(url_kecamatan, data.value);

					console.log(vm.treeList)
				} else {

					vm.treeListFunc(url_kelurahan, data.value);

				}


			})

		};
		vm.kmlToggleKec = function (data) {
			dataApi.getDataKelurahan(data.id).then(function (response) {

				NgMap.getMap().then(function (map) {


					vm.kmlKelurahan = [];

					angular.forEach(response, function (value, key) {

						if (value.kml !== "") {

							var urls = 'http://laporan.manadokota.go.id/assets/geo/kelurahan/'

							var kmlDataLayer = function (val) {
								return new google.maps.KmlLayer({
									url: urls + val.kml + '_batas.kmz'
									// map: map
								})
							}

							vm.kmlKelurahan.push({
								'id': value.idkelurahan,
								'label': value.nama_kelurahan,
								'value': value.kml,
								'type': 'kelurahan',
								'kmlLayer': kmlDataLayer(value)
							});

						}

					})

				})

			})
		}

		vm.openModalDetails = function (itemData) {
			var modalInstance = $uibModal.open({
				ariaLabelledBy: 'modal-title',
				ariaDescribedBy: 'modal-body',
				templateUrl: 'views/template/details.html',
				controller: 'modalController',
				controllerAs: 'vm',
				size: 'lg',
				resolve: {
					modalData: function () {
						return {
							itemData: itemData
						};
					}
				}
			});
		}

		// $scope.$watch(function(){
		// 	return vm.kmlToggleData;
		// }, function(n){

		// 	if(n == true){

		// 	}
		// 	console.log(n);
		// })

		activate();

		////////////////

		function activate() {

			dataApi.getDataKecamatan().then(function (response) {

				NgMap.getMap().then(function (map) {

					angular.forEach(response, function (value, key) {

						if (value.kml !== "") {

							var urls = 'http://laporan.manadokota.go.id/assets/geo/kecamatan/'

							var kmlDataLayer = function (val) {
								return new google.maps.KmlLayer({
									url: urls + val.kml + '.kmz'
									// map: map
								})
							}

							vm.kmlKecamatan.push({
								'id': value.idkecamatan,
								'label': value.nama_kecamatan,
								'value': value.kml,
								'type': 'kecamatan',
								'kmlLayer': kmlDataLayer(value)
							});

						}

					})

				})
			})


		}
	}
	
	function modalController($uibModal,$uibModalInstance, modalData) {
		var vm = this;

		vm.data = modalData;
		
		vm.close = function(){
			$uibModalInstance.dismiss()
		}

		console.log(modalData);

		activate();

		////////////////

		function activate() { }
	}

})();
