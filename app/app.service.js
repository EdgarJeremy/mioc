(function () {
	'use strict';

	angular
		.module('mioc')
		.service('logger', logger)
		.factory('dataApi', dataApi)
		;

	logger.inject = ['$log'];
	dataApi.inject = ['$http', 'logger'];

	function logger($log) {
		var vm = this;
		vm.info = function (msg) { $log.info(msg); }
		vm.warn = function (msg) { $log.warn(msg); }
		vm.error = function (msg) { $log.error(msg); }
		vm.debug = function (msg) { $log.debug(msg); }
	}

	function dataApi($http, logger) {
		var dataApi = {
			getDataKecamatan: getDataKecamatan,
			getDataKelurahan: getDataKelurahan,
			getDataBangunan: getDataBangunan
		};

		var baseURL = 'http://laporan.manadokota.go.id/index.php/api'

		return dataApi;

		////////////////
		function getDataKecamatan() {
			return $http.get(baseURL + '/ambil_kecamatan')
				.then(getSuccess)
				.catch(getError('Gagal mengambil data Laporan'));
		}
		function getDataKelurahan(idKecamatan) {
			return $http.get(baseURL + '/ambil_kelurahan/' + idKecamatan)
				.then(getSuccess)
				.catch(getError('Gagal mengambil data Laporan'));
		}
		function getDataBangunan(idBangunan) {
			return $http.get(baseURL + '/ambil_data_bangunan/' + idBangunan)
				.then(getSuccess)
				.catch(getError('Gagal mengambil data Laporan'));
		}

		///////////////

		function getSuccess(response) {
			console.log(response.data);

			return response.data;
		}

		function getError(error){
			return function (){
				logger.error(error);
				return {
					success: false, message: error
				}
			}
		}
	}
})();