Bebella.service('AuthUser', ['$q', '$localStorage',
    function ($q, $localStorage) {
        var service = this;
    
        service.get = function () {
            var deferred = $q.defer();
            
            var _user = $localStorage.auth_user;
            
            if (_user) {
                deferred.resolve(_user);
            } else {
                deferred.reject("Usuário não salvo");
            }
            
            return deferred.promise;
        };
    
        service.set = function (user) {
            $localStorage.auth_user = user;
        };
    
    }
]);
