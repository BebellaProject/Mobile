Bebella.controller('SubscriptionIndexCtrl', ['$scope', 'ChannelRepository',
    function ($scope, ChannelRepository) {
        
        $scope.appUrl = APP_URL;
        
        ChannelRepository.all().then(
            function onSuccess (list) {
                $scope.channels = list;
            },
            function onError (res) {
                alert("Houve um erro na obtenção da lista de canais");
            }
        );
        
    }
]);
