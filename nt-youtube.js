'use strict';

var module = angular.module('nt-youtube', []);

module.run(['$window', '$document', '$rootScope', '$q',
function($window, $document, $rootScope, $q) {

	var tag = $document[0].createElement('script');
	tag.src = "https://www.youtube.com/iframe_api";
	var firstScriptTag = $document[0].getElementsByTagName( 'script' )[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	$rootScope.youtubeReady = $q.defer();
	$window.onYouTubePlayerAPIReady = function() {
		$rootScope.youtubeReady.resolve();
		//$rootScope.$broadcast( 'onYouTubePlayerAPIReady' );
	};

}]).service('makeYoutube', ['$rootScope',
function($rootScope) {
	var module = new (function(){
	var defaultOptions = {
	autoplay: 0,
	enablejsapi: 1,
	events: {}
	};
	var mergedOptions;

	function makeIt (container, data){
	var player = new YT.Player(container, data);
	// if (typeof callback === 'function') setTimeout(function(){callback(player)},2400);//FIXME: temp workaround. should wait for player ready really.
	}

	this.construct = function(id, container, options){
	$rootScope.youtubeReady.promise.then(function(){
	if (typeof options !== 'object') options = {};
	options.videoId = id;
	mergedOptions = angular.extend(defaultOptions, options);
	//  console.log('extended options = ', mergedOptions, 'initial options', options);
	makeIt(container, mergedOptions);
	})
	}
	})

	return module;
}]);
