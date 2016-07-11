Bebella.service('ChannelRepository', ['$http', '$q', 'Channel', 'AuthUser',
    function ($http, $q, Channel, AuthUser) {
        var repository = this;
        
        repository.find = function (id) {
            var deferred = $q.defer();
            
            AuthUser.get().then(
                function onSuccess (auth) {
                    $http.get(api_v1('channel/find/' + id, auth.api_token)).then(
                        function (res) {
                            var channel = new Channel();

                            attr(channel, res.data);

                            deferred.resolve(channel);
                        },
                        function (res) {
                            deferred.reject(res);
                        }
                    );    
                },
                function onError (err) {
                    console.log(err);
                }
            );
            
            return deferred.promise;
        };
        
        repository.all = function () {
            var deferred = $q.defer();
            
            AuthUser.get().then(
                function onSuccess (auth) {
                    $http.get(api_v1("channel/all", auth.api_token)).then(
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
                },
                function onError (err) {
                    console.log(err);
                }
            );
            
            return deferred.promise;
        };
        
        repository.edit = function (channel) {
            var deferred = $q.defer();
            
            AuthUser.get().then(
                function onSuccess (auth) {
                    var data = JSON.stringify(channel);

                    $http.post(api_v1("channel/edit", auth.api_token), data).then(
                        function (res) {
                            deferred.resolve(channel);
                        },
                        function (res) {
                            deferred.reject(res);
                        }
                    );                    
                },
                function onError (err) {
                    console.log(err);
                }
            );
            
            return deferred.promise;
        };
        
        repository.save = function (channel) {
            var deferred = $q.defer();
            
            AuthUser.get().then(
                function onSuccess (auth) {
                    var data = JSON.stringify(channel);

                    $http.post(api_v1("channel/save", auth.api_token), data).then(
                        function (res) {
                            channel.id = res.data.id;

                            deferred.resolve(channel);
                        },
                        function (res) {
                            deferred.reject(res);
                        }
                    );
                },
                function onError (err) {
                    console.log(err);
                }
            );
            
            return deferred.promise;
        };
    }
]);


