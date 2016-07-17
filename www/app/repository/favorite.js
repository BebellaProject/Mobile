Bebella.service('FavoriteRepository', ['$http', '$q', 'Recipe', 'AuthUser',
    function ($http, $q, Recipe, AuthUser) {
    	var repository = this;

    	repository.byUser = function () {
    		var deferred = $q.defer();

    		AuthUser.get().then(
                function onSuccess(auth) {
                	$http.get(api_v1("favorite/byUser/" + auth.id, auth.api_token)).then(
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
                function onError(err) {
                	console.log(err);
                }
            );

    		return deferred.promise;
    	};

    	repository.add = function (id) {
    		var deferred = $q.defer();

    		AuthUser.get().then(
                function onSuccess(auth) {
                	$http.get(api_v1('favorite/add/' + id, auth.api_token)).then(
                        function (res) {
                        	deferred.resolve(res.data);
                        },
                        function (res) {
                        	deferred.reject(res);
                        }
                    );
                },
                function onError(err) {
                	console.log(err);
                }
            );

    		return deferred.promise;
    	};

    	repository.remove = function (id) {
    		var deferred = $q.defer();

    		AuthUser.get().then(
                function onSuccess(auth) {
                	$http.get(api_v1('favorite/remove/' + id, auth.api_token)).then(
                        function (res) {
                        	deferred.resolve(res.data);
                        },
                        function (res) {
                        	deferred.reject(res);
                        }
                    );
                },
                function onError(err) {
                	console.log(err);
                }
            );

    		return deferred.promise;
    	};
    }
]);


