Bebella.config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {

            $urlRouterProvider.otherwise('/tabs/home');

            $stateProvider

                    .state('login', {
                        url: '/login',
                        templateUrl: view('login/index'),
                        controller: 'LoginIndexCtrl'
                    })
                    
                    .state('register', {
                        url: '/register',
                        templateUrl: view('register/index'),
                        controller: 'RegisterIndexCtrl'
                    })

                    .state('tabs', {
                        url: '/tabs',
                        templateUrl: view('tabs'),
                        controller: 'TabsCtrl',
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
                    
                    .state('tabs.filter', {
                        url: '/filter',
                        views: {
                            'tab4': {
                                templateUrl: view('filter/index'),
                                controller: 'FilterIndexCtrl'
                            }
                        }
                    })
                    
                    .state('search_feed', {
                        url: '/search_feed',
                        templateUrl: view('search_feed/index'),
                        controller: 'SearchFeedIndexCtrl'
                    })
                    
                    .state('recipe', {
                        url: '/recipe/{recipeId}',
                        templateUrl: view('recipe/index'),
                        controller: 'RecipeIndexCtrl'
                    })
                    
                    .state('product_option_list', {
                        url: '/recipe/{recipeId}/product/{productId}/options',
                        templateUrl: view('product/option/list'),
                        controller: 'ProductOptionListCtrl'
                    });
        }
    ]
);
