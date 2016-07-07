Bebella.controller('FilterIndexCtrl', ['$scope', 'FilterOptions',
    function ($scope, FilterOptions) {
        
        FilterOptions.get().then(
            function onSuccess (options) {
                $scope.options = options;
            },
            function onError (res) {
                alert("Erro ao obter os filtros do usuário.");
            }
        );
        
    }
]);
