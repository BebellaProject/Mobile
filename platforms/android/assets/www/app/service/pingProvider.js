Bebella.service('PingProvider', ['$q', '$http',
    function ($q, $http) {
        var service = this;
        
        service.ping = function () {
            var deferred = $q.defer();
            
            $http.get(APP_URL + '/ping').then(
                function onSuccess (res) {
                    deferred.resolve(res.data);
                },
                function onError (res) {
                    deferred.reject(res);
                }
            );
            
            return deferred.promise;
        };
        
    }
]);
