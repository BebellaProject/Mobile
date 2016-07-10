var Bebella = angular.module('Bebella', ['ionic', 'angularMoment', 'ngStorage']);

var APP_URL = "http://localhost:8000";

function view(path) {
    return "views/" + path + ".html";
}

function api_v1(path, token) {
    return APP_URL + "/api/v1/" + path + "?api_token=" + token;
}

function attr(dest, src) {
    for (var e in src) {
        if (e == "created_at" || e == "updated_at") {
            dest[e] = moment(src[e]).fromNow();
        } else if (e.startsWith("has_") || e.startsWith("is_") || e.startsWith("used_for_")) {
            dest[e] = (src[e] == 1);
        } else {
            dest[e] = src[e];
        }
    }
}

Bebella.run(['$ionicPlatform', 'amMoment', 'AuthUser', '$state', 'FilterOptions',
    function ($ionicPlatform, amMoment, AuthUser, $state, FilterOptions) {

        amMoment.changeLocale('pt-br');

        $ionicPlatform.ready(function () {

            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
                StatusBar.styleDefault();
            }

            AuthUser.get().then(
                    function onSuccess(user) {
                        $state.go('tabs.home');
                    },
                    function onError(err) {
                        $state.go('login');
                    }
            );

            FilterOptions.get().then(
                    function onSuccess(opts) {
                    },
                    function onError(res) {
                        FilterOptions.setDefault();
                    }
            );
        });
    }
]);


Bebella.factory('Channel', [
    function () {
        var Channel = new Function();
        
        return Channel;
    }
]);



Bebella.factory('Product', [
    function () {
        var Product = new Function();
        
        return Product;
    }
]);


Bebella.factory('ProductOption', [
    function () {
        var ProductOption = new Function();
        
        return ProductOption;
    }
]);




Bebella.factory('Recipe', [
    function () {
        var Recipe = function () {
            this.tags = new Array();
            this.steps = new Array();
            this.products = new Array();
            this.comments = new Array();
            this.related = new Array();
        };
        
        return Recipe;
    }
]);




Bebella.factory('User', [
    function () {
        var User = new Function();
        
        return User;
    }
]);


Bebella.service('AuthUser', ['$q', '$localStorage',
    function ($q, $localStorage) {
        var service = this;
    
        service.get = function () {
            var deferred = $q.defer();
            
            var _user = $localStorage.auth_user;
            
            if (_user) {
                deferred.resolve(_user);
            } else {
                deferred.reject("Usuário não salvo");
            }
            
            return deferred.promise;
        };
    
        service.set = function (user) {
            $localStorage.auth_user = user;
        };
    
        service.destroy = function () {
            $localStorage.$reset();
        };
    
    }
]);


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
                clothing: true,
                health: true,
                food: true
            };
        };
    }
]);


Bebella.service('PingProvider', ['$q', '$http',
    function ($q, $http) {
        var service = this;
        
        service.ping = function () {
            var deferred = $q.defer();
            
            $http.get(APP_URL + '/ping').then(
                function onSuccess (res) {
                    deferred.resolve(res.data);
                },
                function onError (res) {
                    deferred.reject(res);
                }
            );
            
            return deferred.promise;
        };
        
    }
]);


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
        
        repository.trendingWithFilters = function (page, filters) {
            var deferred = $q.defer();
            
            var data = JSON.stringify(filters);
            
            AuthUser.get().then(
                function onSuccess (auth) {
                    $http.post(api_v1("recipe/trendingWithFilters/" + page, auth.api_token), data).then(
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




Bebella.service('UserRepository', ['$http', '$q', 'User',
    function ($http, $q, User) {
        var repository = this;
        
        repository.auth = function (id) {
            var deferred = $q.defer();
            
            $http.get(APP_URL + '/auth/user').then(
                function (res) {
                    var user = new User();
                    
                    attr(user, res.data);
                    
                    deferred.resolve(user);
                },
                function (res) {
                    deferred.reject(res);
                }
            );

            return deferred.promise;
        };
        
        repository.login = function (user) {
            var deferred = $q.defer();
            
            var data = JSON.stringify(user);
            
            $http.post(APP_URL + "/auth/api_login", data).then(
                function (res) {
                    attr(user, res.data);
                    
                    deferred.resolve(user);
                },
                function (res) {
                    deferred.reject(res);
                }
            );
            
            return deferred.promise;
        };
        
        repository.register = function (user) {
            var deferred = $q.defer();
            
            var data = JSON.stringify(user);
            
            $http.post(APP_URL + "/auth/api_register", data).then(
                function (res) {
                    attr(user, res.data);
                    
                    deferred.resolve(user);
                },
                function (res) {
                    deferred.reject(res);
                }
            );
            
            return deferred.promise;
        };
    }
]);



Bebella.controller('FilterIndexCtrl', ['$scope', 'FilterOptions',
    function ($scope, FilterOptions) {
        
        FilterOptions.get().then(
            function onSuccess (options) {
                $scope.options = options;
            },
            function onError (res) {
                alert("Erro ao obter os filtros do usuário.");
            }
        );
        
    }
]);


Bebella.controller('IndexCtrl', ['$scope', 'RecipeRepository', 'FilterOptions',
    function ($scope, RecipeRepository, FilterOptions) {

        $scope.appUrl = APP_URL;
        $scope.moreDataCanBeLoaded = true;

        var feed_page = 1;
        
        $scope.refresh = function () {
            $scope.moreDataCanBeLoaded = true;
            
            FilterOptions.get().then(
                    function onSuccess(options) {
                        feed_page = 1;

                        RecipeRepository.paginateWithFilters(feed_page, options).then(
                                function onSuccess(recipes) {
                                    $scope.recipes = recipes;

                                    $scope.$broadcast('scroll.refreshComplete');
                                },
                                function onError(res) {
                                    alert("Não foi possível obter o feed.");
                                }
                        );
                    },
                    function onError(res) {
                        alert("Erro ao obter os filtros do usuário");
                    }
            );
        };

        $scope.nextPage = function () {
            feed_page += 1;

            FilterOptions.get().then(
                    function onSuccess(options) {
                        RecipeRepository.paginateWithFilters(feed_page, options).then(
                                function onSuccess(recipes) {
                                    if (recipes.length == 0) {
                                        $scope.moreDataCanBeLoaded = false;
                                    } else {
                                        $scope.recipes.push.apply($scope.recipes, recipes);  
                                    }
                                    
                                    $scope.$broadcast('scroll.infiniteScrollComplete');
                                },
                                function onError() {
                                    alert("Erro ao obter próxima página");
                                }
                        );
                    },
                    function onError(res) {
                        alert("Erro ao obter os filtros do usuário");
                    }
            );
        };
        

        FilterOptions.get().then(
                function onSuccess(options) {
                    RecipeRepository.paginateWithFilters(feed_page, options).then(
                            function onSuccess(recipes) {
                                $scope.recipes = recipes;
                            },
                            function onError(res) {
                                alert("Não foi possível obter o feed.");
                            }
                    );
                },
                function onError(res) {
                    alert("Falha ao obter os filtros");
                }
        );


    }
]);


Bebella.controller('LoginIndexCtrl', ['$scope', '$http', '$state', 'AuthUser', 'User', 'PingProvider', 'UserRepository',
    function ($scope, $http, $state, AuthUser, User, PingProvider, UserRepository) {
        
        $scope.user = new User();
        
        $scope.login = function () {
            PingProvider.ping().then(
                function onSuccess (pong) {
                    
                    UserRepository.login($scope.user).then(
                        function onSuccess (user) {
                            AuthUser.set(user);
                            
                            $state.go('tabs.home');
                        },
                        function onError (res) {
                            alert("Login falhou, por favor, verifique as credenciais fornecidas.");
                        }
                    );
                    
                },
                function onError (res) {
                    alert("Não foi possivel estabelecer comunicação com o servidor.");
                } 
            );
        };
        
    }
]);


Bebella.controller('ProductOptionListCtrl', ['$scope', '$stateParams', 'ProductOptionRepository', 'ProductRepository',
    function ($scope, $stateParams, ProductOptionRepository, ProductRepository) {
        
        $scope.appUrl = APP_URL;
        
        $scope.redirectToStore = function (id) {
            ProductOptionRepository.getStoreUrl(id, $stateParams.recipeId).then(
                function onSuccess (url) {
                    window.open(url, '_system', 'location=yes');
                },
                function onError (res) {
                    alert("Erro ao obter link para produto");
                }
            );
        };
        
        ProductRepository.find($stateParams.productId).then(
            function onSuccess (product) {
                $scope.product = product;
            },
            function onError (res) {
                alert("Erro ao obter detalhes do produto");
            }
        );
        
        ProductOptionRepository.byProduct($stateParams.productId, $stateParams.recipeId).then(
            function onSuccess (list) {
                $scope.product_options = list;
            },
            function onError (res) {
                alert("Houve um erro na obtenção da lista de opções de produto");
            }
        );
        
    }
]);


Bebella.controller('RecipeIndexCtrl', ['$scope', '$stateParams', 'RecipeRepository',
    function ($scope, $stateParams, RecipeRepository) {
        
        $scope.appUrl = APP_URL;
        
        RecipeRepository.find($stateParams.recipeId).then(
            function onSuccess (recipe) {
                $scope.recipe = recipe;
            },
            function onError (res) {
                alert("Erro ao obter os detalhes da receita");
            }
        );
    }
]);



Bebella.controller('RegisterIndexCtrl', ['$scope', '$state', 'User', 'UserRepository', 'AuthUser',
    function ($scope, $state, User, UserRepository, AuthUser) {
        
        $scope.user = new User();
    
        function check(user) {
            return true;
        };
    
        $scope.register = function () {
            if (check($scope.user)) {
                
                UserRepository.register($scope.user).then(
                    function onSuccess (user) {
                        
                        UserRepository.login($scope.user).then(
                            function onSuccess (auth) {
                                AuthUser.set(auth);
                                
                                $state.go('tabs.home');
                            },
                            function onError (res) {
                                alert("Erro durante o login");
                            }
                        );
                        
                    },
                    function onError (res) {
                        alert("Houve um erro no registro, tente novamente.");
                    }
                );
                
            }
        };
    }
]);

Bebella.controller('SearchFeedIndexCtrl', ['$scope', '$timeout', 'SearchRepository',
    function ($scope, $timeout, SearchRepository) {

        $scope.results = new Array();

        $scope.appUrl = APP_URL;
        $scope.moreDataCanBeLoaded = true;

        var feed_page = 1;

        function doSearch(term, page) {
            SearchRepository.searchRecipe(term, page).then(
                    function onSuccess(recipes) {
                        $scope.results = recipes;
                    },
                    function onError(res) {
                        alert("Erro ao obter resultados");
                    }
            );
        }

        $scope.search = function (term) {
            if (term.trim() !== '') {
                feed_page = 1;

                $scope.moreDataCanBeLoaded = false;
                
                SearchRepository.searchRecipe(term, feed_page).then(
                        function onSuccess(recipes) {
                            $scope.results = recipes;
                        },
                        function onError(res) {
                            alert("Erro ao obter resultados");
                        }
                );
            }
        };

        $scope.nextPage = function (term) {
            feed_page += 1;

            SearchRepository.searchRecipe(term, feed_page).then(
                    function onSuccess(recipes) {
                        if (recipes.length == 0) {
                            $scope.moreDataCanBeLoaded = false;
                        } else {
                            $scope.results.push.apply($scope.results, recipes);
                        }

                        $scope.$broadcast('scroll.infiniteScrollComplete');
                    },
                    function onError(res) {
                        alert("Erro ao obter resultados");
                    }
            );
        };

    }
]);


Bebella.controller('SideMenuCtrl', ['$scope', 'AuthUser',
    function ($scope, AuthUser) {
        
        $scope.appUrl = APP_URL;
        
        AuthUser.get().then(
            function onSuccess (user) {
                $scope.user = user;
            },
            function onError () {
            }
        );
        
    }
]);

Bebella.controller('SubscriptionIndexCtrl', ['$scope', 'ChannelRepository',
    function ($scope, ChannelRepository) {
        
        $scope.appUrl = APP_URL;
        
        ChannelRepository.all().then(
            function onSuccess (list) {
                $scope.channels = list;
            },
            function onError (res) {
                alert("Houve um erro na obtenção da lista de canais");
            }
        );
        
    }
]);


Bebella.controller('TabsCtrl', ['$scope','$state',
    function ($scope, $state) {
        
        $scope.changeTab = function (state) {
            $state.go(state);
        };
        
    }
]);


Bebella.controller('TrendingIndexCtrl', ['$scope', 'RecipeRepository', 'FilterOptions',
    function ($scope, RecipeRepository, FilterOptions) {
        
        $scope.appUrl = APP_URL;
        $scope.moreDataCanBeLoaded = true;
        var current_page = 1;
        
        $scope.refresh = function () {
            $scope.moreDataCanBeLoaded = true;
            
            FilterOptions.get().then(
                    function onSuccess(options) {
                        current_page = 1;

                        RecipeRepository.trendingWithFilters(current_page, options).then(
                                function onSuccess(recipes) {
                                    $scope.trendingRecipes = recipes;

                                    $scope.$broadcast('scroll.refreshComplete');
                                },
                                function onError(res) {
                                    alert("Não foi possível obter o feed.");
                                }
                        );
                    },
                    function onError(res) {
                        alert("Erro ao obter os filtros do usuário");
                    }
            );
        };

        $scope.nextPage = function () {
            current_page += 1;

            FilterOptions.get().then(
                    function onSuccess(options) {
                        RecipeRepository.paginateWithFilters(current_page, options).then(
                                function onSuccess(recipes) {
                                    if (recipes.length == 0) {
                                        $scope.moreDataCanBeLoaded = false;
                                    } else {
                                        $scope.trendingRecipes.push.apply($scope.trendingRecipes, recipes);  
                                    }
                                    
                                    $scope.$broadcast('scroll.infiniteScrollComplete');
                                },
                                function onError() {
                                    alert("Erro ao obter próxima página");
                                }
                        );
                    },
                    function onError(res) {
                        alert("Erro ao obter os filtros do usuário");
                    }
            );
        };
        

        FilterOptions.get().then(
                function onSuccess(options) {
                    RecipeRepository.trendingWithFilters(current_page, options).then(
                            function onSuccess(recipes) {
                                $scope.trendingRecipes = recipes;
                            },
                            function onError(res) {
                                alert("Não foi possível obter o feed.");
                            }
                    );
                },
                function onError(res) {
                    alert("Falha ao obter os filtros");
                }
        );

        
    }
]);


Bebella.config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {

            $urlRouterProvider.otherwise('/tabs/home');

            $stateProvider

                    .state('login', {
                        url: '/login',
                        templateUrl: view('login/index'),
                        controller: 'LoginIndexCtrl'
                    })
                    
                    .state('register', {
                        url: '/register',
                        templateUrl: view('register/index'),
                        controller: 'RegisterIndexCtrl'
                    })

                    .state('tabs', {
                        url: '/tabs',
                        templateUrl: view('tabs'),
                        controller: 'TabsCtrl',
                        abstract: true
                    })

                    .state('tabs.home', {
                        url: '/home',
                        views: {
                            'tab1': {
                                templateUrl: view('home/index'),
                                controller: 'IndexCtrl'
                            }
                        }
                    })

                    .state('tabs.trending', {
                        url: '/trending',
                        views: {
                            'tab2': {
                                templateUrl: view('trending/index'),
                                controller: 'TrendingIndexCtrl'
                            }
                        }
                    })

                    .state('tabs.subscriptions', {
                        url: '/subscriptions',
                        views: {
                            'tab3': {
                                templateUrl: view('subscription/index'),
                                controller: 'SubscriptionIndexCtrl'
                            }
                        }
                    })
                    
                    .state('tabs.filter', {
                        url: '/filter',
                        views: {
                            'tab4': {
                                templateUrl: view('filter/index'),
                                controller: 'FilterIndexCtrl'
                            }
                        }
                    })
                    
                    .state('search_feed', {
                        url: '/search_feed',
                        templateUrl: view('search_feed/index'),
                        controller: 'SearchFeedIndexCtrl'
                    })
                    
                    .state('recipe', {
                        url: '/recipe/{recipeId}',
                        templateUrl: view('recipe/index'),
                        controller: 'RecipeIndexCtrl'
                    })
                    
                    .state('product_option_list', {
                        url: '/recipe/{recipeId}/product/{productId}/options',
                        templateUrl: view('product/option/list'),
                        controller: 'ProductOptionListCtrl'
                    });
        }
    ]
);
