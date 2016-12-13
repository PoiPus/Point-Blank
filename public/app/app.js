(function () {
  'use strict';

  angular
    .module('point-blank', ['ui.router', 'point-blank.splash', 'point-blank.poi', 'point-blank.search', 'point-blank.auth'])
    .config(config)
    .run(run);

  function config ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('splash', {
        url: '/',
        templateUrl: 'app/splash/splash.template.html',
        controller: 'splash-controller as vm'
      })
      .state('search', {
        url: '/search',
        templateUrl: 'app/search/search.template.html',
        controller: 'search-controller as vm',
        access: {
          restricted: true
        }
      })
      .state('poi', {
        url: '/poi/:name',
        templateUrl: 'app/poi/poi.template.html',
        controller: 'poi-controller as vm',
        access: {
          restricted: true
        }
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'app/auth/signup.template.html',
        controller: 'auth-controller as vm'
      })
      .state('signin', {
        url: '/signin',
        templateUrl: 'app/auth/signin.template.html'
      });

    $urlRouterProvider.otherwise('/');
  }

  function run ($rootScope, authFactory, $state) {
    $rootScope.$on('$stateChangeStart', function (event, toState) {
      if (toState.access && toState.access.restricted && !authFactory.isLoggedIn) {
        event.preventDefault(); // prevent transition from happening
        authFactory.authService()
        .then(function (response) {
          if (response.status === 401) {
            $state.go('signin');
          } else {
            authFactory.isLoggedIn = true;
            $rootScope.loggedIn = true;
            $rootScope.id = response.data.id;      // logged in user's id
            $rootScope.name = response.data.name;  // logged in user's name
            $rootScope.facebookId = response.data.facebookId //facebookId added to rootscope
            $state.go(toState.name);
          }
        });
      }
    });
  }
})();
