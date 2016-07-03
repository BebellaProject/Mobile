Bebella.controller('TabsCtrl', ['$scope','$state',
    function ($scope, $state) {
        
        $scope.changeTab = function (state) {
            $state.go(state);
        };
        
    }
]);
