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
