Bebella.controller('SideMenuCtrl', ['$scope', 'AuthUser',
    function ($scope, AuthUser) {
        
        $scope.appUrl = APP_URL;
        
        AuthUser.get().then(
            function onSuccess (user) {
                $scope.user = user;
            },
            function onError () {
            }
        );
        
    }
]);