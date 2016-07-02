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

