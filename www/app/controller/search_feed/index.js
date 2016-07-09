Bebella.controller('SearchFeedIndexCtrl', ['$scope', '$timeout', 'SearchRepository',
    function ($scope, $timeout, SearchRepository) {

        $scope.results = new Array();

        $scope.appUrl = APP_URL;
        $scope.moreDataCanBeLoaded = true;

        var feed_page = 1;

        function doSearch(term, page) {
            SearchRepository.searchRecipe(term, page).then(
                    function onSuccess(recipes) {
                        $scope.results = recipes;
                    },
                    function onError(res) {
                        alert("Erro ao obter resultados");
                    }
            );
        }

        $scope.search = function (term) {
            if (term.trim() !== '') {
                feed_page = 1;

                $scope.moreDataCanBeLoaded = false;
                
                SearchRepository.searchRecipe(term, feed_page).then(
                        function onSuccess(recipes) {
                            $scope.results = recipes;
                        },
                        function onError(res) {
                            alert("Erro ao obter resultados");
                        }
                );
            }
        };

        $scope.nextPage = function (term) {
            feed_page += 1;

            SearchRepository.searchRecipe(term, feed_page).then(
                    function onSuccess(recipes) {
                        if (recipes.length == 0) {
                            $scope.moreDataCanBeLoaded = false;
                        } else {
                            $scope.results.push.apply($scope.results, recipes);
                        }

                        $scope.$broadcast('scroll.infiniteScrollComplete');
                    },
                    function onError(res) {
                        alert("Erro ao obter resultados");
                    }
            );
        };

    }
]);
