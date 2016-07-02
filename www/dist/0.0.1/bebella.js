var Bebella = angular.module('Bebella', ['ionic', 'angularMoment']);

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
            dest[e] = moment(src[e]).fromNow();
        } else if (e.startsWith("has_") || e.startsWith("is_") || e.startsWith("used_for_")) {
            dest[e] = (src[e] === 1);
        } else {
            dest[e] = src[e];
        }
    }
}

Bebella.run(['$ionicPlatform', 'amMoment',
    function ($ionicPlatform, amMoment) {
        
        amMoment.changeLocale('pt-br');
        
        $ionicPlatform.ready(function () {

            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }
        });
    }
]);


Bebella.factory('Recipe', [
    function () {
        var Recipe = function () {
            this.tags = new Array();
            this.steps = new Array();
            this.products = new Array();
            this.comments = new Array();
            this.related = new Array();
        };
        
        return Recipe;
    }
]);




Bebella.service('RecipeRepository', ['$http', '$q', 'Recipe',
    function ($http, $q, Recipe) {
        var repository = this;
        
        repository.find = function (id) {
            var deferred = $q.defer();
            
            $http.get(api_v1('recipe/find/' + id)).then(
                function (res) {
                    var recipe = new Recipe();
                    
                    attr(recipe, res.data);
                    
                    deferred.resolve(recipe);
                },
                function (res) {
                    deferred.reject(res);
                }
            );

            return deferred.promise;
        };
        
        repository.all = function () {
            var deferred = $q.defer();
            
            $http.get(api_v1("recipe/all")).then(
                function (res) {
                    var recipes = _.map(res.data, function (json) {
                        var recipe = new Recipe();
                        
                        attr(recipe, json);
                        
                        return recipe;
                    });
                    
                    deferred.resolve(recipes);
                },
                function (res) {
                    deferred.reject(res);
                }
            );
            
            return deferred.promise;
        };
        
        repository.edit = function (recipe) {
            var deferred = $q.defer();
            
            var data = JSON.stringify(recipe);
            
            $http.post(api_v1("recipe/edit"), data).then(
                 function (res) {
                     deferred.resolve(recipe);
                 },
                 function (res) {
                     deferred.reject(res);
                 }
            );
            
            return deferred.promise;
        };
        
        repository.save = function (recipe) {
            var deferred = $q.defer();
            
            var data = JSON.stringify(recipe);
            
            $http.post(api_v1("recipe/save"), data).then(
                function (res) {
                    recipe.id = res.data.id;
                    
                    deferred.resolve(recipe);
                },
                function (res) {
                    deferred.reject(res);
                }
            );
            
            return deferred.promise;
        };
    }
]);


Bebella.controller('IndexCtrl', ['$scope', 'RecipeRepository',
    function ($scope, RecipeRepository) {
        
        $scope.appUrl = APP_URL;
        
        RecipeRepository.all().then(
            function onSuccess (list) {
                $scope.recipes = list;
                console.log(list);
            },
            function onError (res) {
                alert("Houve um erro na obtenção da lista de receitas");
            }
        );
        
    }
]);


Bebella.controller('RecipeIndexCtrl', ['$scope', '$stateParams', 'RecipeRepository',
    function ($scope, $stateParams, RecipeRepository) {
        
        $scope.appUrl = APP_URL;
        
        RecipeRepository.find($stateParams.recipeId).then(
            function onSuccess (recipe) {
                $scope.recipe = recipe;
                console.log(recipe);
            },
            function onError (res) {
                alert("Erro ao obter os detalhes da receita");
            }
        );
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
                    
                    .state('recipe', {
                        url: '/recipe/{recipeId}',
                        templateUrl: view('recipe/index'),
                        controller: 'RecipeIndexCtrl'
                    });

                    
        }
    ]
);
