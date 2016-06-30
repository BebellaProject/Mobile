angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('beleza', {
    url: '/beauty',
    templateUrl: 'templates/beleza.html',
    controller: 'belezaCtrl'
  })

  .state('beleza2', {
    url: '/beauty/trending',
    templateUrl: 'templates/beleza2.html',
    controller: 'beleza2Ctrl'
  })

  .state('beleza3', {
    url: '/beauty/channels',
    templateUrl: 'templates/beleza3.html',
    controller: 'beleza3Ctrl'
  })

  .state('decoraO', {
    url: '/decoration',
    templateUrl: 'templates/decoraO.html',
    controller: 'decoraOCtrl'
  })

  .state('decoraO2', {
    url: '/decoration/trending',
    templateUrl: 'templates/decoraO2.html',
    controller: 'decoraO2Ctrl'
  })

  .state('decoraO3', {
    url: '/decoration/channels',
    templateUrl: 'templates/decoraO3.html',
    controller: 'decoraO3Ctrl'
  })

  .state('roupas', {
    url: '/clothing',
    templateUrl: 'templates/roupas.html',
    controller: 'roupasCtrl'
  })

  .state('tabsController', {
    url: '/page1',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  .state('tabsController.home', {
    url: '/home',
    views: {
      'tab4': {
        templateUrl: 'templates/home.html',
        controller: 'homeCtrl'
      }
    }
  })

  .state('tabsController.home2', {
    url: '/home-beauty',
    views: {
      'tab1': {
        templateUrl: 'templates/home2.html',
        controller: 'home2Ctrl'
      }
    }
  })

  .state('tabsController.home3', {
    url: '/home-decoration',
    views: {
      'tab2': {
        templateUrl: 'templates/home3.html',
        controller: 'home3Ctrl'
      }
    }
  })

  .state('tabsController.home4', {
    url: '/home-clothing',
    views: {
      'tab3': {
        templateUrl: 'templates/home4.html',
        controller: 'home4Ctrl'
      }
    }
  })

  .state('selagemCVinagreDeMa', {
    url: '/beauty/receipt/1',
    templateUrl: 'templates/selagemCVinagreDeMa.html',
    controller: 'selagemCVinagreDeMaCtrl'
  })

  .state('hidratanteX', {
    url: '/product/1/options',
    templateUrl: 'templates/hidratanteX.html',
    controller: 'hidratanteXCtrl'
  })

  .state('wishlist', {
    url: '/wishlist',
    templateUrl: 'templates/wishlist.html',
    controller: 'wishlistCtrl'
  })

  .state('minhaSacola', {
    url: '/my-bag',
    templateUrl: 'templates/minhaSacola.html',
    controller: 'minhaSacolaCtrl'
  })

  .state('meusPedidos', {
    url: '/orders',
    templateUrl: 'templates/meusPedidos.html',
    controller: 'meusPedidosCtrl'
  })

$urlRouterProvider.otherwise('/page1/home')

  

});