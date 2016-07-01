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


Bebella.controller('BeautyIndexCtrl', ['$scope',
    function ($scope) {
        
    }
]);



Bebella.controller('ClothingIndexCtrl', ['$scope',
    function ($scope) {
        
    }
]);



Bebella.controller('DecorationIndexCtrl', ['$scope',
    function ($scope) {
        
    }
]);



Bebella.controller('IndexCtrl', ['$scope',
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


                    .state('tabs.beauty', {
                        url: '/beauty',
                        views: {
                            'tab1': {
                                templateUrl: view('beauty/recipes'),
                                controller: 'BeautyIndexCtrl'
                            }
                        }
                    })

                    .state('tabs.decoration', {
                        url: '/decoration',
                        views: {
                            'tab2': {
                                templateUrl: view('decoration/index'),
                                controller: 'DecorationIndexCtrl'
                            }
                        }
                    })

                    .state('tabs.clothing', {
                        url: '/clothing',
                        views: {
                            'tab3': {
                                templateUrl: view('clothing/index'),
                                controller: 'ClothingIndexCtrl'
                            }
                        }
                    })
                    
                    .state('tabs.home', {
                        url: '/home',
                        views: {
                            'tab4': {
                                templateUrl: view('index'),
                                controller: 'IndexCtrl'
                            }
                        }
                    })
                    
                    .state('beauty_recipes', {
                        url:'/beauty/recipes',
                        templateUrl: view('beauty/recipes')
                    })
                    
                    .state('beauty_trending', {
                        url:'/beauty/trending',
                        templateUrl: view('beauty/trending')
                    })
                    
                    .state('beauty_channels', {
                        url:'/beauty/channels',
                        templateUrl: view('beauty/channels')
                    });
                    
        }
    ]
);
