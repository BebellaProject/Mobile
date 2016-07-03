Bebella.service('ChannelRepository', ['$http', '$q', 'Channel',
    function ($http, $q, Channel) {
        var repository = this;
        
        repository.find = function (id) {
            var deferred = $q.defer();
            
            $http.get(api_v1('channel/find/' + id)).then(
                function (res) {
                    var channel = new Channel();
                    
                    attr(channel, res.data);
                    
                    deferred.resolve(channel);
                },
                function (res) {
                    deferred.reject(res);
                }
            );

            return deferred.promise;
        };
        
        repository.all = function () {
            var deferred = $q.defer();
            
            $http.get(api_v1("channel/all")).then(
                function (res) {
                    var channels = _.map(res.data, function (json) {
                        var channel = new Channel();
                        
                        attr(channel, json);
                        
                        return channel;
                    });
                    
                    deferred.resolve(channels);
                },
                function (res) {
                    deferred.reject(res);
                }
            );
            
            return deferred.promise;
        };
        
        repository.edit = function (channel) {
            var deferred = $q.defer();
            
            var data = JSON.stringify(channel);
            
            $http.post(api_v1("channel/edit"), data).then(
                 function (res) {
                     deferred.resolve(channel);
                 },
                 function (res) {
                     deferred.reject(res);
                 }
            );
            
            return deferred.promise;
        };
        
        repository.save = function (channel) {
            var deferred = $q.defer();
            
            var data = JSON.stringify(channel);
            
            $http.post(api_v1("channel/save"), data).then(
                function (res) {
                    channel.id = res.data.id;
                    
                    deferred.resolve(channel);
                },
                function (res) {
                    deferred.reject(res);
                }
            );
            
            return deferred.promise;
        };
    }
]);


