Bebella.service('RecipeRepository', ['$http', '$q', 'Recipe',
    function ($http, $q, Recipe) {
        var repository = this;
        
        repository.find = function (id) {
            var deferred = $q.defer();
            
            $http.get(api_v1('recipe/find/' + id)).then(
                function (res) {
                    var recipe = new Recipe();
                    
                    attr(recipe, res.data);
                    
                    deferred.resolve(recipe);
                },
                function (res) {
                    deferred.reject(res);
                }
            );

            return deferred.promise;
        };
        
        repository.all = function () {
            var deferred = $q.defer();
            
            $http.get(api_v1("recipe/all")).then(
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
            
            return deferred.promise;
        };
        
        repository.trending = function () {
            var deferred = $q.defer();
            
            $http.get(api_v1("recipe/trending")).then(
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
            
            return deferred.promise;
        };
        
        repository.edit = function (recipe) {
            var deferred = $q.defer();
            
            var data = JSON.stringify(recipe);
            
            $http.post(api_v1("recipe/edit"), data).then(
                 function (res) {
                     deferred.resolve(recipe);
                 },
                 function (res) {
                     deferred.reject(res);
                 }
            );
            
            return deferred.promise;
        };
        
        repository.save = function (recipe) {
            var deferred = $q.defer();
            
            var data = JSON.stringify(recipe);
            
            $http.post(api_v1("recipe/save"), data).then(
                function (res) {
                    recipe.id = res.data.id;
                    
                    deferred.resolve(recipe);
                },
                function (res) {
                    deferred.reject(res);
                }
            );
            
            return deferred.promise;
        };
    }
]);
