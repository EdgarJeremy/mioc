(function () {
	'use strict';

	angular
		.module('mioc')
		.directive('ivhTreeviewCheckbox', ivhTreeviewCheckbox);

	ivhTreeviewCheckbox.inject = ['ivhTreeviewMgr'];
	function ivhTreeviewCheckbox(ivhTreeviewMgr) {
		// Usage:
		//
		// Creates:
		//
		var ivhTreeviewCheckbox = {
			// require: '^ivhTreeView',
			restrict: 'C',
			link: link
		};
		return ivhTreeviewCheckbox;

		function link(scope, element, attrs) {
			element.wrap('<label class="ivh-treeview-checkbox-appearance"></label>');
			element.after('<span></span>')
		}
	}
	/* @ngInject */
	function ControllerController() {

	}
})();