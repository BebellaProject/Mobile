Bebella.controller('IndexCtrl', ['$scope', 'RecipeRepository', 'FilterOptions', 'CurrentFeed',
    function ($scope, RecipeRepository, FilterOptions, CurrentFeed) {

        $scope.appUrl = APP_URL;
        $scope.moreDataCanBeLoaded = true;

        var feed_page = 1;
        
        $scope.refresh = function () {
            $scope.moreDataCanBeLoaded = true;
            
            FilterOptions.get().then(
                    function onSuccess(options) {
                        feed_page = 1;

                        RecipeRepository.paginateWithFilters(feed_page, options).then(
                                function onSuccess(recipes) {
                                    $scope.recipes = recipes;

                                    $scope.$broadcast('scroll.refreshComplete');
                                },
                                function onError(res) {
                                    alert("Não foi possível obter o feed.");
                                }
                        );
                    },
                    function onError(res) {
                        alert("Erro ao obter os filtros do usuário");
                    }
            );
        };

        $scope.nextPage = function () {
            feed_page += 1;

            FilterOptions.get().then(
                    function onSuccess(options) {
                        RecipeRepository.paginateWithFilters(feed_page, options).then(
                                function onSuccess(recipes) {
                                    if (recipes.length == 0) {
                                        $scope.moreDataCanBeLoaded = false;
                                    } else {
                                        $scope.recipes.push.apply($scope.recipes, recipes);  
                                    }
                                    
                                    $scope.$broadcast('scroll.infiniteScrollComplete');
                                },
                                function onError() {
                                    alert("Erro ao obter próxima página");
                                }
                        );
                    },
                    function onError(res) {
                        alert("Erro ao obter os filtros do usuário");
                    }
            );
        };
        

        FilterOptions.get().then(
                function onSuccess(options) {
                    RecipeRepository.paginateWithFilters(feed_page, options).then(
                            function onSuccess(recipes) {
                                $scope.recipes = recipes;
                            },
                            function onError(res) {
                                alert("Não foi possível obter o feed.");
                            }
                    );
                },
                function onError(res) {
                    alert("Falha ao obter os filtros");
                }
        );

        $scope.$on('$stateChangeSuccess', function () {
            $scope.nextPage();
        });

    }
]);
