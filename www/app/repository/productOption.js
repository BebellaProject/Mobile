Bebella.service('ProductOptionRepository', ['$http', '$q', 'ProductOption', 'AuthUser',
    function ($http, $q, ProductOption, AuthUser) {
        var repository = this;
        
        repository.find = function (id) {
            var deferred = $q.defer();
            
            AuthUser.get().then(
                function onSuccess (auth) {
                    $http.get(api_v1('product_option/find/' + id, auth.api_token)).then(
                        function (res) {
                            var product_option = new ProductOption();

                            attr(product_option, res.data);

                            deferred.resolve(product_option);
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
        
        repository.getStoreUrl = function (id, recipe_id) {
            var deferred = $q.defer();
            
            AuthUser.get().then(
                function onSuccess (auth) {
                    $http.get(api_v1('product_option/getStoreUrl/' + id, auth.api_token) + '&recipe_id=' + recipe_id).then(
                        function (res) {
                            deferred.resolve(res.data);
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
                    $http.get(api_v1("product_option/all", auth.api_token)).then(
                        function (res) {
                            var product_options = _.map(res.data, function (json) {
                                var product_option = new ProductOption();

                                attr(product_option, json);

                                return product_option;
                            });

                            deferred.resolve(product_options);
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
        
        repository.byProduct = function (id, recipe_id) {
            var deferred = $q.defer();
            
            AuthUser.get().then(
                function onSuccess (auth) {
                    $http.get(api_v1("product_option/byProduct/" + id, auth.api_token) + '&recipe_id=' + recipe_id).then(
                        function (res) {
                            var product_options = _.map(res.data, function (json) {
                                var product_option = new ProductOption();

                                attr(product_option, json);

                                return product_option;
                            });

                            deferred.resolve(product_options);
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
        
        repository.edit = function (product_option) {
            var deferred = $q.defer();
            
            AuthUser.get().then(
                function onSuccess (auth) {
                    var data = JSON.stringify(product_option);

                    $http.post(api_v1("product_option/edit", auth.api_token), data).then(
                        function (res) {
                            deferred.resolve(product_option);
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
        
        repository.save = function (product_option) {
            var deferred = $q.defer();
            
            AuthUser.get().then(
                function onSuccess (auth) {
                    var data = JSON.stringify(product_option);

                    $http.post(api_v1("product_option/save", auth.api_token), data).then(
                        function (res) {
                            product_option.id = res.data.id;

                            deferred.resolve(product_option);
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



