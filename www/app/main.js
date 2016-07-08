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
