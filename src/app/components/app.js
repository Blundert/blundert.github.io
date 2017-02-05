(function () {
	'use strict';
	angular
		.module("config", [
			'ui.router',
			'pascalprecht.translate'
		]);
	angular
		.module('blundert', [
			'config',
			'ngAnimate',
			'ngCookies',
			'ui.router',
			'ngMessages',
			'ngSanitize',
			'ui.scrollpoint',
			'pascalprecht.translate'
		]);
})();