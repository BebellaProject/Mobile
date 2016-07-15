Bebella.controller('ProductOptionDetailCtrl', ['$scope', '$stateParams', 'ProductOptionRepository',
    function ($scope, $stateParams, ProductOptionRepository) {
        
        $scope.appUrl = APP_URL;
        
        ProductOptionRepository.find($stateParams.productOptionId).then(
            function onSuccess (option) {
                $scope.productOption = option;
            },
            function onError (res) {
                alert("Houve um erro na obtenção desta opção de produto.");
            }
        );
        
    }
]);
