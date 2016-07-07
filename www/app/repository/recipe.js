Bebella.service('RecipeRepository', ['$http', '$q', 'Recipe', 'AuthUser',
    function ($http, $q, Recipe, AuthUser) {
        var repository = this;
        
        repository.find = function (id) {
            var deferred = $q.defer();
            
            AuthUser.get().then(
                function onSuccess (auth) {
                    $http.get(api_v1('recipe/find/' + id, auth.api_token)).then(
                        function (res) {
                            var recipe = new Recipe();

                            attr(recipe, res.data);

                            deferred.resolve(recipe);
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
        
        repository.paginateWithFilters = function (page, filters) {
            var deferred = $q.defer();
            
            var data = JSON.stringify(filters);
            
            AuthUser.get().then(
                function onSuccess (auth) {
                    $http.post(api_v1("recipe/paginateWithFilters/" + page, auth.api_token), data).then(
                        function (res) {
                            var recipes = _.map(res.data.data, function (json) {
                                var recipe = new Recipe();

                                attr(recipe, json);

                                return recipe;
                            });

                            deferred.resolve(recipes);
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
                    $http.get(api_v1("recipe/all", auth.api_token)).then(
                        function (res) {
                            var recipes = _.map(res.data, function (json) {
                                var recipe = new Recipe();

                                attr(recipe, json);

                                return recipe;
                            });

                            deferred.resolve(recipes);
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
        
        repository.trending = function () {
            var deferred = $q.defer();

            AuthUser.get().then(
                function onSuccess (auth) {
                    $http.get(api_v1("recipe/trending", auth.api_token)).then(
                        function (res) {
                            var recipes = _.map(res.data, function (json) {
                                var recipe = new Recipe();

                                attr(recipe, json);

                                return recipe;
                            });

                            deferred.resolve(recipes);
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
        
        repository.edit = function (recipe) {
            var deferred = $q.defer();

            AuthUser.get().then(
                function onSuccess (auth) {
                    var data = JSON.stringify(recipe);

                    $http.post(api_v1("recipe/edit", auth.api_token), data).then(
                         function (res) {
                             deferred.resolve(recipe);
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
        
        repository.save = function (recipe) {
            var deferred = $q.defer();
            
            AuthUser.get().then(
                function onSuccess (auth) {
                    var data = JSON.stringify(recipe);

                    $http.post(api_v1("recipe/save", auth.api_token), data).then(
                        function (res) {
                            recipe.id = res.data.id;

                            deferred.resolve(recipe);
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
