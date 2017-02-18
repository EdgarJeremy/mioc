(function () {
	'use strict';

	angular
		.module('mioc')
		.factory('dataApi', dataApi);

	dataApi.inject = ['$http'];
	function dataApi($http) {
		var dataApi = {
			getDataMap: getDataMap
		};

		return dataApi;

		////////////////
		function getDataMap() { }
	}
})();