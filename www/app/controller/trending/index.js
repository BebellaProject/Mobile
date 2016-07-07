Bebella.controller('TrendingIndexCtrl', ['$scope', 'RecipeRepository', 'FilterOptions',
    function ($scope, RecipeRepository, FilterOptions) {
        
        $scope.appUrl = APP_URL;
        $scope.moreDataCanBeLoaded = true;
        var current_page = 1;
        
        $scope.refresh = function () {
            $scope.moreDataCanBeLoaded = true;
            
            FilterOptions.get().then(
                    function onSuccess(options) {
                        current_page = 1;

                        RecipeRepository.trendingWithFilters(current_page, options).then(
                                function onSuccess(recipes) {
                                    $scope.trendingRecipes = recipes;

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
            current_page += 1;

            FilterOptions.get().then(
                    function onSuccess(options) {
                        RecipeRepository.paginateWithFilters(current_page, options).then(
                                function onSuccess(recipes) {
                                    if (recipes.length == 0) {
                                        $scope.moreDataCanBeLoaded = false;
                                    } else {
                                        $scope.trendingRecipes.push.apply($scope.trendingRecipes, recipes);  
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
                    RecipeRepository.paginateWithFilters(current_page, options).then(
                            function onSuccess(recipes) {
                                $scope.trendingRecipes = recipes;
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
