Bebella.controller('RegisterIndexCtrl', ['$scope', '$state', 'User', 'UserRepository', 'AuthUser', 'FilterOptions',
    function ($scope, $state, User, UserRepository, AuthUser, FilterOptions) {
        
        $scope.user = new User();
    
        function check(user) {
            return true;
        };
    
        $scope.register = function () {
            if (check($scope.user)) {
                
                UserRepository.register($scope.user).then(
                    function onSuccess (user) {
                        
                        UserRepository.login($scope.user).then(
                            function onSuccess (auth) {
                                AuthUser.set(auth);
                                FilterOptions.setDefault();
                                
                                $state.go('tabs.home');
                            },
                            function onError (res) {
                                alert("Erro durante o login");
                            }
                        );
                        
                    },
                    function onError (res) {
                        alert("Houve um erro no registro, tente novamente.");
                    }
                );
                
            }
        };
    }
]);