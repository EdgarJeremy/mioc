(function () {
	'use strict';

	angular
		.module('mioc')
		.controller('headerController', headerController)
		.controller('dashboardController', dashboardController)
		;

	headerController.inject = [];
	dashboardController.inject = ['NgMap', 'dataApi', 'logger', '$scope', '$rootScope'];
	function headerController() {
		var vm = this;


		activate();

		////////////////

		function activate() { }
	}


	function dashboardController(NgMap, dataApi, logger, $scope, $rootScope) {
		var vm = this;

		var src = "http://edgarjeremy.com/folderbaru/kml/doc.kml";
		var src1 = "http://laporan.manadokota.go.id/assets/geo/kelurahan/pinaesaan_bangunan.kmz";
		var src2 = "http://edgarjeremy.com/folderbaru/kml/wenang.kml";
		var src3 = "http://laporan.manadokota.go.id/assets/geo/kota/";

		vm.kmlManado = [];

		vm.kmlKecamatan = [];

		vm.kmlKelurahan = [];

		vm.treeList = [];

		NgMap.getMap().then(function (map) {

			var kmlLoadFunc = function (urls) {
				var kmlLayer = new google.maps.KmlLayer({
					// map: map,
					url: src3 + urls
				});

				return kmlLayer;
			}
			vm.kmlManado.push({
				'id': 1,
				'label': 'Kota Manado',
				'value': 'manado',
				'type': 'kota',
				'kmlLayer': kmlLoadFunc('manado_batas.kmz')
			})

			vm.treeList = [];

			vm.treeList.push(
				{
					'id': 1,
					'label': 'Bangunan',
					'kmlLayer': kmlLoadFunc('manado_bangunan.kmz')
				}, {
					'id': 2,
					'label': 'Bidang Tanah',
					'kmlLayer': kmlLoadFunc('manado_bidangtanah.kmz')
				}, {
					'id': 3,
					'label': 'Jalan',
					'kmlLayer': kmlLoadFunc('manado_jalan.kmz')
				}, {
					'id': 4,
					'label': 'Lingkungan',
					'kmlLayer': kmlLoadFunc('manado_lingkungan.kmz')
				}, {
					'id': 5,
					'label': 'Penggunaan Lahan',
					'kmlLayer': kmlLoadFunc('manado_penggunaanlahan.kmz')
				}, {
					'id': 6,
					'label': 'Sempadan Jalan',
					'kmlLayer': kmlLoadFunc('manado_sempadanjln.kmz')
				}, {
					'id': 7,
					'label': 'Sempadan Sungai',
					'kmlLayer': kmlLoadFunc('manado_sempadansungai.kmz')
				}
			)

		});

		$scope.$on('treeListToggle', function (e, d1, d2) {
			if (d2 == true) {
				NgMap.getMap().then(function (map) {
					d1.kmlLayer.setMap(map);
				})
			} else {
				d1.kmlLayer.setMap(null);
			}
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
					if (val.kmlLayer != "") {
						val.kmlLayer.setMap(null);
					}
				})

		}

		vm.windowDetails = {
			'id': undefined,
			'label': undefined
		};

		vm.kmlToggle = function (data) {

			NgMap.getMap().then(function (map) {

				kmlLayerHidden();

				data.kmlLayer.setMap(map);

				var urls_kota = 'http://laporan.manadokota.go.id/assets/geo/kota/';
				var urls_kecamatan = 'http://laporan.manadokota.go.id/assets/geo/kecamatan/';
				var urls_kelurahan = 'http://laporan.manadokota.go.id/assets/geo/kelurahan/';

				vm.treeList = [];


				if (data.type == 'kota') {
					var kmlLoadFunc = function (urls) {
						var kmlLayer = new google.maps.KmlLayer({
							// map: map,
							url: urls_kota + urls
						});

						return kmlLayer;
					}
					vm.treeList.push(
						{
							'id': 1,
							'label': 'Bangunan',
							'kmlLayer': kmlLoadFunc(data.value + '_bangunan.kmz')
						}, {
							'id': 2,
							'label': 'Bidang Tanah',
							'kmlLayer': kmlLoadFunc(data.value + '_bidangtanah.kmz')
						}, {
							'id': 3,
							'label': 'Jalan',
							'kmlLayer': kmlLoadFunc(data.value + '_jalan.kmz')
						}, {
							'id': 4,
							'label': 'Lingkungan',
							'kmlLayer': kmlLoadFunc(data.value + '_lingkungan.kmz')
						}, {
							'id': 5,
							'label': 'Penggunaan Lahan',
							'kmlLayer': kmlLoadFunc(data.value + '_penggunaanlahan.kmz')
						}, {
							'id': 6,
							'label': 'Sempadan Jalan',
							'kmlLayer': kmlLoadFunc(data.value + '_sempadanjln.kmz')
						}, {
							'id': 7,
							'label': 'Sempadan Sungai',
							'kmlLayer': kmlLoadFunc(data.value + '_sempadansungai.kmz')
						}
					)
				} else if (data.type == 'kecamatan') {
					var kmlLoadFunc = function (urls) {
						var kmlLayer = new google.maps.KmlLayer({
							// map: map,
							url: urls_kecamatan + urls
						});

						return kmlLayer;
					}
					vm.treeList.push(
						{
							'id': 1,
							'label': 'Bangunan',
							'kmlLayer': kmlLoadFunc(data.value + '_bangunan.kmz')
						}, {
							'id': 2,
							'label': 'Bidang Tanah',
							'kmlLayer': kmlLoadFunc(data.value + '_bidangtanah.kmz')
						}, {
							'id': 3,
							'label': 'Jalan',
							'kmlLayer': kmlLoadFunc(data.value + '_jalan.kmz')
						}, {
							'id': 4,
							'label': 'Lingkungan',
							'kmlLayer': kmlLoadFunc(data.value + '_lingkungan.kmz')
						}, {
							'id': 5,
							'label': 'Penggunaan Lahan',
							'kmlLayer': kmlLoadFunc(data.value + '_penggunaanlahan.kmz')
						}, {
							'id': 6,
							'label': 'Sempadan Jalan',
							'kmlLayer': kmlLoadFunc(data.value + '_sempadanjln.kmz')
						}, {
							'id': 7,
							'label': 'Sempadan Sungai',
							'kmlLayer': kmlLoadFunc(data.value + '_sempadansungai.kmz')
						}
					)
				} else {
					var kmlLoadFunc = function (urls) {
						var kmlLayer = new google.maps.KmlLayer({
							// map: map,
							url: urls_kelurahan + urls
						});

						return kmlLayer;
					}
					vm.treeList.push(
						{
							'id': 1,
							'label': 'Bangunan',
							'kmlLayer': kmlLoadFunc(data.value + '_bangunan.kmz')
						}, {
							'id': 2,
							'label': 'Bidang Tanah',
							'kmlLayer': kmlLoadFunc(data.value + '_bidangtanah.kmz')
						}, {
							'id': 3,
							'label': 'Jalan',
							'kmlLayer': kmlLoadFunc(data.value + '_jalan.kmz')
						}, {
							'id': 4,
							'label': 'Lingkungan',
							'kmlLayer': kmlLoadFunc(data.value + '_lingkungan.kmz')
						}, {
							'id': 5,
							'label': 'Penggunaan Lahan',
							'kmlLayer': kmlLoadFunc(data.value + '_penggunaanlahan.kmz')
						}, {
							'id': 6,
							'label': 'Sempadan Jalan',
							'kmlLayer': kmlLoadFunc(data.value + '_sempadanjln.kmz')
						}, {
							'id': 7,
							'label': 'Sempadan Sungai',
							'kmlLayer': kmlLoadFunc(data.value + '_sempadansungai.kmz')
						}
					)
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

		vm.kmlToggleKel = function (data) {

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

})();