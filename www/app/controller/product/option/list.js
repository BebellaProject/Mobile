Bebella.controller('ProductOptionListCtrl', ['$scope', '$stateParams', 'ProductOptionRepository', 'ProductRepository',
    function ($scope, $stateParams, ProductOptionRepository, ProductRepository) {
        
        $scope.appUrl = APP_URL;
        
        $scope.redirectToStore = function (id) {
            ProductOptionRepository.getStoreUrl(id).then(
                function onSuccess (url) {
                    window.open(url, '_system', 'location=yes');
                },
                function onError (res) {
                    alert("Erro ao obter link para produto");
                }
            );
        };
        
        ProductRepository.find($stateParams.productId).then(
            function onSuccess (product) {
                $scope.product = product;
            },
            function onError (res) {
                alert("Erro ao obter detalhes do produto");
            }
        );
        
        ProductOptionRepository.byProduct($stateParams.productId).then(
            function onSuccess (list) {
                $scope.product_options = list;
            },
            function onError (res) {
                alert("Houve um erro na obtenção da lista de opções de produto");
            }
        );
        
    }
]);
