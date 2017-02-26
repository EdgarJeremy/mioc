(function () {
	'use strict';

	angular
		.module('mioc')
		.config(config)
		.run(function ($rootScope, NgMap, $timeout) {
			$rootScope.$on('$stateChangeSuccess', function (event, toState, fromState) {
				console.log(toState);

				if (toState.url == "/") {
					$(document).ready(function (e) {
						$('#dashboard .dashboard-left-button').click(function (e) {
							$('#dashboard .dashboard-left').toggleClass('active');
							$('#dashboard .dashboard-center').toggleClass('active-left');
							NgMap.getMap().then(function (map) {

								$timeout(function () {
									google.maps.event.trigger(map, 'resize');
								}, 250)	
							})
						})
						$('#dashboard .dashboard-right-button').click(function (e) {
							$('#dashboard .dashboard-right').toggleClass('active');
							$('#dashboard .dashboard-center').toggleClass('active-right');
							NgMap.getMap().then(function (map) {

								$timeout(function () {
									google.maps.event.trigger(map, 'resize');
								}, 250)	
							})
						})
					})
				}

			})
		})
		;

	function config($stateProvider, $urlRouterProvider) {

		$urlRouterProvider.otherwise('/')

		$stateProvider
			.state('dashboard', {
				url: '/',
				views: {
					'header': {
						templateUrl: 'views/template/header.html',
						controller: 'headerController as vm'
					},
					'': {
						template: "<div id='dashboard' class='show-grid'>"
						+ "<div class='dashboard-left' ui-view='dashboardLeftBar'></div>"
						+ "<div class='dashboard-center' ui-view='dashboardContent'></div>"
						+ "<div class='dashboard-right' ui-view='dashboardRightBar'></div>"
						+ "<div class='dashboard-bottom col-md-6' ui-view='dashboardBottomBar'></div>"
						+ "</div>",
						controller: 'dashboardController as vm'
					},
					'dashboardContent@dashboard': {
						templateUrl: 'views/dashboard.content.html'
					},
					'dashboardLeftBar@dashboard': {
						templateUrl: 'views/dashboard.left.html'
					},
					'dashboardRightBar@dashboard': {
						templateUrl: 'views/dashboard.right.html'
					},
					'dashboardBottomBar@dashboard': {
						templateUrl: 'views/dashboard.bottom.html'
					}
				}
			})

	}

})();