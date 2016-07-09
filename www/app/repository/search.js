Bebella.service('SearchRepository', ['$http', '$q', 'Recipe', 'AuthUser',
    function ($http, $q, Recipe, AuthUser) {
        var repository = this;
        
        repository.searchRecipe = function (term, page) {
            var deferred = $q.defer();
            
            var data = JSON.stringify({
                term: term,
                page: page
            });
            
            AuthUser.get().then(
                function onSuccess (auth) {
                    $http.post(api_v1("search/recipe", auth.api_token), data).then(
                        function (res) {
                            var recipes = _.map(res.data.result, function (json) {
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
    }
]);


