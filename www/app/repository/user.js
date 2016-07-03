Bebella.service('UserRepository', ['$http', '$q', 'User',
    function ($http, $q, User) {
        var repository = this;
        
        repository.auth = function (id) {
            var deferred = $q.defer();
            
            $http.get(APP_URL + '/auth/user').then(
                function (res) {
                    var user = new User();
                    
                    attr(user, res.data);
                    
                    deferred.resolve(user);
                },
                function (res) {
                    deferred.reject(res);
                }
            );

            return deferred.promise;
        };
        
        repository.login = function (user) {
            var deferred = $q.defer();
            
            var data = JSON.stringify(user);
            
            $http.post(APP_URL + "/auth/api_login", data).then(
                function (res) {
                    attr(user, res.data);
                    
                    deferred.resolve(user);
                },
                function (res) {
                    deferred.reject(res);
                }
            );
            
            return deferred.promise;
        };
    }
]);

