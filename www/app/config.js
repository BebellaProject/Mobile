Bebella.config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {

            $urlRouterProvider.otherwise('/tabs/home');

            $stateProvider

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
                    
                    .state('recipe', {
                        url: '/recipe/{recipeId}',
                        templateUrl: view('recipe/index'),
                        controller: 'RecipeIndexCtrl'
                    })
                    
                    .state('product_option_list', {
                        url: '/product/{productId}/options',
                        templateUrl: view('product/option/list'),
                        controller: 'ProductOptionListCtrl'
                    })

                    
        }
    ]
);
