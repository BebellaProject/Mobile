Bebella.service('CurrentFeed', ['$q', '$sessionStorage',
    function ($q, $sessionStorage) {
        var service = this;
        
        service.get = function () {
            var deferred = $q.defer();
            
            var _feed = $sessionStorage.feed;
            
            if (_feed) {
                deferred.resolve(_feed);
            } else {
                deferred.reject("Feed não salvo");
            }
            
            return deferred.promise;
        };
    
        service.set = function (feed) {
            $sessionStorage.feed = feed;
        };
    
        service.destroy = function () {
            $sessionStorage.$reset();
        };
    
    }
]);
