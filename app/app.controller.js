(function () {
	'use strict';

	angular
		.module('mioc')
		.controller('headerController', headerController)
		.controller('dashboardController', dashboardController)
		;

	headerController.inject = [];
	dashboardController.inject = ['Attr2MapOptions', 'NgMap', '$scope'];
	function headerController() {
		var vm = this;


		activate();

		////////////////

		function activate() { }
	}
	function dashboardController(Attr2MapOptions, NgMap, $scope) {
		var vm = this;

		var src = "http://edgarjeremy.com/folderbaru/kml/doc.kml";
		var src1 = "http://edgarjeremy.com/folderbaru/kml/wenang.kmz";
		var src2 = "http://edgarjeremy.com/folderbaru/kml/wenang.kml";

		vm.kmlLayer = [];

		vm.windowDetails = {
			'id': undefined,
			'label': undefined
		};
		vm.bijon = true;

		vm.dataViewport = [
			{
				display: 'Dropdown Item 1', href: '#', children: [
					{
						display: 'Child 1', href: '#', children: [
							{ display: 'Sub 1', href: '#sub1', children: [] },
							{ display: 'Sub 2', href: '#sub2', children: [] }]
					},
					{ display: 'Child 2', href: '#child2', children: [] }]
			},
			{ display: 'Dropdown Item 2', href: '#dropdown2', children: [] },
			{
				display: 'Dropdown Item 3', href: '#', children: [
					{ display: 'Child 3', href: '#child3', children: [] }]
			}
		];

		$scope.$watch(function () { return vm.bijon; }, function (o, n) {
			console.log(o, n);
		})

		NgMap.getMap().then(function (map) {
			vm.map = map;
			console.log(vm.map);
			var bijon = function () {
				// var kmlLayer = new google.maps.KmlLayer({
				// 	url: src1,
				// 	map: map
				// 	// preserveViewport: false
				// });
				// kmlLayer.addListener('click', function (event) {
				// 	console.log('kmlLayer.addListener \t:', event);
				// 	console.log(vm.kmlLayer);
				// 	$scope.$apply(function () {
				// 		vm.windowDetails = {
				// 			'id': event.featureData.id,
				// 			'label': event.featureData.name
				// 		}
				// 		vm.bijon = !vm.bijon;
				// 	})
				// });
				var kmlLayer = map.data.loadGeoJson('https://raw.githubusercontent.com/ilomon10/mioc/master/convert.json');
				return kmlLayer;
			}
			vm.kmlLayer.push({
				'id': 1,
				'label': 'Bangunan Pinaesaan',
				'kmlObject': bijon()
			})
		})

		$scope.$on('trvw_leaf_click', function (e, d) {
			console.log(d);
			vm.windowDetails = {
				'id': d.id,
				'label': d.label
			}
			vm.bijon = !vm.bijon;
		})

		// vm.trvwLeafCheck = function (node, selected, tree) {
			// if (selected == true) {
			// 	NgMap.getMap().then(function (map) {
			// 		node.kmlObject.setMap(map);
			// 	})
			// 	console.log(node.kmlObject);
			// } else {
			// 	node.kmlObject.setMap(null);
			// }
		// }

		activate();

		////////////////

		function activate() {
			return vm.dataItem = [
				{
					"id": 1,
					"label": "node1",
					"value": "bijon1",
					"children": [
						{
							"id": 11,
							"label": "node1.1",
							"children": [
								{
									"id": 111,
									"label": "node1.1.1",
									"children": []
								}
							]
						},
						{
							"id": 12,
							"label": "node1.2",
							"children": []
						}
					]
				},
				{
					"id": 2,
					"label": "node2",
					"nodrop": true,
					"children": [
						{
							"id": 21,
							"label": "node2.1",
							"children": []
						},
						{
							"id": 22,
							"label": "node2.2",
							"children": []
						}
					]
				},
				{
					"id": 3,
					"label": "node3",
					"children": [
						{
							"id": 31,
							"label": "node3.1",
							"children": []
						}
					]
				}
			];
		}
	}
})();