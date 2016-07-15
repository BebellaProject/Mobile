Bebella.controller('RecipeIndexCtrl', ['$scope', '$stateParams', 'RecipeRepository', 'AuthUser',
    function ($scope, $stateParams, RecipeRepository, AuthUser) {
        
        $scope.appUrl = APP_URL;
        
        RecipeRepository.find($stateParams.recipeId).then(
            function onSuccess (recipe) {
                $scope.recipe = recipe;
            },
            function onError (res) {
                alert("Erro ao obter os detalhes da receita");
            }
        );

        $scope.comment = function (text) {
            if (text && text !== "") {
                RecipeRepository.comment($stateParams.recipeId, text).then(
                    function onSuccess (comment) {
                        var n_array = [comment];
                    
                        $scope.recipe.comments = n_array.concat($scope.recipe.comments);
                    },
                    function onError (res) {
                        alert("Erro ao enviar comentário");
                    }
                );
            }
        };
    }
]);

