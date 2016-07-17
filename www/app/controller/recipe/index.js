Bebella.controller('RecipeIndexCtrl', ['$scope', '$stateParams', 'RecipeRepository', 'AuthUser', 'FavoriteRepository',
    function ($scope, $stateParams, RecipeRepository, AuthUser, FavoriteRepository) {
        
        $scope.appUrl = APP_URL;
        $scope.has_commented = false;
        
        RecipeRepository.find($stateParams.recipeId).then(
            function onSuccess (recipe) {
                $scope.recipe = recipe;
            },
            function onError (res) {
                alert("Erro ao obter os detalhes da receita");
            }
        );

        $scope.likeIt = function () {
            FavoriteRepository.add($stateParams.recipeId).then(
                function onSuccess() {
                    $scope.recipe.is_liked = true;
                },
                function onError(res) {
                    alert("Erro ao favoritar esta receita");
                }
            );
        };

        $scope.dislikeIt = function () {
            FavoriteRepository.remove($stateParams.recipeId).then(
                function onSuccess() {
                    $scope.recipe.is_liked = false;
                },
                function onError(res) {
                    alert("Erro ao desfavoritar esta receita");
                }
            );
        };

        $scope.comment = function (text) {
            if (text && text !== "") {
                RecipeRepository.comment($stateParams.recipeId, text).then(
                    function onSuccess (comment) {
                        var n_array = [comment];
                    
                        $scope.recipe.comments = n_array.concat($scope.recipe.comments);

                        $scope.has_commented = true;
                    },
                    function onError (res) {
                        alert("Erro ao enviar comentário");
                    }
                );
            }
        };
    }
]);

