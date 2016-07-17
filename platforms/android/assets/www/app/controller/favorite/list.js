Bebella.controller('FavoriteListCtrl', ['$scope', 'FavoriteRepository',
    function ($scope, FavoriteRepository) {
        
        $scope.appUrl = APP_URL;

        FavoriteRepository.byUser().then(
            function onSuccess(list) {
                $scope.favorites = list;
            },
            function onError(res) {
                alert("Houve um erro na obtenção dos favoritos.");
            }
        );

    }
]);