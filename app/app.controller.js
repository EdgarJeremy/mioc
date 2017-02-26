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

		vm.treeListFunc = function (baseURL, nama) {

			var kmlLoadFunc = function (fileName) {
				var kmlLayer = new google.maps.KmlLayer({
					'url': baseURL + fileName
				})

				google.maps.event.addListener(kmlLayer, 'click', function(e){
					console.log(e.featureData);
				})

				return kmlLayer;
			}

			vm.treeList = {
				'group': [
					{
						'id': 1,
						'label': 'Bangunan',
						'kmlLayer': kmlLoadFunc(nama + '_bangunan.kmz')
					}, {
						'id': 2,
						'label': 'Bidang Tanah',
						'kmlLayer': kmlLoadFunc(nama + '_bidangtanah.kmz')
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
				]
			}
			console.log(vm.treeList);
		}

		NgMap.getMap().then(function (map) {

			var kmlLoadFunc = function (urls) {
				var kmlLayer = new google.maps.KmlLayer({
					// map: map,
					url: src3 + urls
				});

				google.maps.event.addListener(kmlLayer, 'click', function(e){
					console.log(e);
					console.log(e.featureData);
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

		vm.windowDetails = {
			'id': undefined,
			'label': undefined
		};

		vm.kmlToggle = function (data) {

			NgMap.getMap().then(function (map) {

				kmlLayerHidden();

				data.kmlLayer.setMap(map);

				var url_kota = 'http://laporan.manadokota.go.id/assets/geo/kota/';
				var url_kecamatan = 'http://laporan.manadokota.go.id/assets/geo/kecamatan/';
				var url_kelurahan = 'http://laporan.manadokota.go.id/assets/geo/kelurahan/';

				vm.treeList = [];


				if (data.type == 'kota') {

					var kmlLoadFunc = function (urls) {
						var kmlLayer = new google.maps.KmlLayer({
							// map: map,
							url: urls_kota + urls
						});

						google.maps.event.addListener(kmlLayer, 'click', function (e) {
							console.log(e.featureData)
						})

						return kmlLayer;
					}

					vm.treeListFunc(url_kota, data.value);

				} else if (data.type == 'kecamatan') {

					var kmlLoadFunc = function (urls) {
						var kmlLayer = new google.maps.KmlLayer({
							// map: map,
							url: urls_kecamatan + urls
						});

						google.maps.event.addListener(kmlLayer, 'click', function (e) {
							console.log(e);
							console.log(e.featureData);
						})

						return kmlLayer;
					}

					vm.treeListFunc(url_kecamatan, data.value);

					console.log(vm.treeList)
				} else {

					var kmlLoadFunc = function (urls) {
						var kmlLayer = new google.maps.KmlLayer({
							// map: map,
							url: urls_kelurahan + urls
						});

						google.maps.event.addListener(kmlLayer, 'click', function (e) {
							console.log(e.featureData)
						})

						return kmlLayer;
					}
					
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