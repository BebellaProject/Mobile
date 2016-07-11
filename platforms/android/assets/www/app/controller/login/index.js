Bebella.controller('LoginIndexCtrl', ['$scope', '$http', '$state', 'AuthUser', 'User', 'PingProvider', 'UserRepository',
    function ($scope, $http, $state, AuthUser, User, PingProvider, UserRepository) {
        
        $scope.user = new User();
        
        $scope.login = function () {
            PingProvider.ping().then(
                function onSuccess (pong) {
                    
                    UserRepository.login($scope.user).then(
                        function onSuccess (user) {
                            AuthUser.set(user);
                            
                            $state.go('tabs.home');
                        },
                        function onError (res) {
                            alert("Login falhou, por favor, verifique as credenciais fornecidas.");
                        }
                    );
                    
                },
                function onError (res) {
                    alert("Não foi possivel estabelecer comunicação com o servidor.");
                } 
            );
        };
        
    }
]);
