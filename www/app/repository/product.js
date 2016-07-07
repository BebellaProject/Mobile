Bebella.service('ProductRepository', ['$http', '$q', 'Product', 'AuthUser',
    function ($http, $q, Product, AuthUser) {
        var repository = this;
        
        repository.find = function (id) {
            var deferred = $q.defer();
            
            AuthUser.get().then(
                function onSuccess (auth) {
                    $http.get(api_v1('product/find/' + id, auth.api_token)).then(
                        function (res) {
                            var product = new Product();

                            attr(product, res.data);

                            deferred.resolve(product);
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
                    $http.get(api_v1("product/all", auth.api_token)).then(
                        function (res) {
                            var products = _.map(res.data, function (json) {
                                var product = new Product();

                                attr(product, json);

                                return product;
                            });

                            deferred.resolve(products);
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
        
        repository.edit = function (product) {
            var deferred = $q.defer();
            
            AuthUser.get().then(
                function onSuccess (auth) {
                    var data = JSON.stringify(product);

                    $http.post(api_v1("product/edit", auth.api_token), data).then(
                        function (res) {
                            deferred.resolve(product);
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
        
        repository.save = function (product) {
            var deferred = $q.defer();
            
            AuthUser.get().then(
                function onSuccess (auth) {
                    var data = JSON.stringify(product);

                    $http.post(api_v1("product/save", auth.api_token), data).then(
                        function (res) {
                            product.id = res.data.id;

                            deferred.resolve(product);
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


