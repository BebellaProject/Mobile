Bebella.service('FilterOptions', ['$q', '$localStorage',
    function ($q, $localStorage) {
        var service = this;
    
        service.get = function () {
            var deferred = $q.defer();
            
            var _filter_options = $localStorage.filter_options;
            
            if (_filter_options) {
                deferred.resolve(_filter_options);
            } else {
                deferred.reject("Opções de filtro não salvas");
            }
            
            return deferred.promise;
        };
    
        service.set = function (filter_options) {
            $localStorage.filter_options = filter_options;
        };
        
        service.setDefault = function () {
            $localStorage.filter_options = {
                beauty: true,
                decoration: true,
                clothing: true
            };
        };
    }
]);
