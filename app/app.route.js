(function () {
	'use strict';

	angular
		.module('mioc')
		.config(config);

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
						+ "<div class='dashboard-left col-md-2' ui-view='dashboardLeftBar'></div>"
						+ "<div class='dashboard-center col-md-8' ui-view='dashboardContent'></div>"
						+ "<div class='dashboard-right col-md-2' ui-view='dashboardRightBar'></div>"
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