var Bebella = angular.module('Bebella', ['ionic']);

var APP_URL = "http://localhost:8000";

function view(path) {
    return "views/" + path + ".html";
}

function api_v1(path) {
    return APP_URL + "/api/v1/" + path;
}

function attr(dest, src) {
    for (var e in src) {
        if (e == "created_at" || e == "updated_at") {
            dest[e] = new Date(src[e]);
        } else if (e.startsWith("has_") || e.startsWith("is_") || e.startsWith("used_for_")) {
            dest[e] = (src[e] === 1);
        } else {
            dest[e] = src[e];
        }
    }
}

Bebella.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {

        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
});


Bebella.controller('IndexCtrl', ['$scope',
    function ($scope) {
        
    }
]);


Bebella.controller('SubscriptionIndexCtrl', ['$scope',
    function ($scope) {
        
    }
]);


Bebella.controller('TrendingIndexCtrl', ['$scope',
    function ($scope) {
        
    }
]);


Bebella.config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {

            $urlRouterProvider.otherwise('/tabs/home');

            $stateProvider

                    .state('tabs', {
                        url: '/tabs',
                        templateUrl: view('tabs'),
                        abstract: true
                    })

                    .state('tabs.home', {
                        url: '/home',
                        views: {
                            'tab1': {
                                templateUrl: view('home/index'),
                                controller: 'IndexCtrl'
                            }
                        }
                    })

                    .state('tabs.trending', {
                        url: '/trending',
                        views: {
                            'tab2': {
                                templateUrl: view('trending/index'),
                                controller: 'TrendingIndexCtrl'
                            }
                        }
                    })

                    .state('tabs.subscriptions', {
                        url: '/subscriptions',
                        views: {
                            'tab3': {
                                templateUrl: view('subscription/index'),
                                controller: 'SubscriptionIndexCtrl'
                            }
                        }
                    })

                    
        }
    ]
);
