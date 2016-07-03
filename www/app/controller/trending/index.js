Bebella.controller('TrendingIndexCtrl', ['$scope', 'RecipeRepository',
    function ($scope, RecipeRepository) {
        
        $scope.appUrl = APP_URL;
        
        RecipeRepository.trending().then(
            function onSuccess (list) {
                $scope.recipes = list;
            },
            function onError (res) {
                alert("Houve um erro na obtenção da lista de tendências");
            }
        );
        
    }
]);
