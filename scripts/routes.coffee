Franchino.config ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, authProvider, jwtInterceptorProvider) ->
  $stateProvider.state('app',
    url: ''
    abstract: true
    controller: 'AppCtrl'
    templateUrl: 'menu.html').state('app.home',
    url: '/'
    views: menuContent:
      controller: 'HomeCtrl'
      templateUrl: 'home.html').state('blog',
    url: '/blogroll'
    controller: 'BlogRollCtrl'
    templateUrl: '').state('app.docs',
    url: '/docs'
    views: menuContent:
      controller: 'DocsCtrl'
      templateUrl: 'docs/index.html').state('app.about',
    url: '/landing'
    views: menuContent:
      controller: 'LandingCtrl'
      templateUrl: 'landing.html').state('app.landing',
    url: '/about'
    views: menuContent:
      controller: 'AboutCtrl'
      templateUrl: 'about.html').state('app.blog',
    url: '/blog'
    views: menuContent:
      controller: 'BlogCtrl'
      templateUrl: 'blog.html').state('app.resume',
    url: '/login'
    views: menuContent:
      controller: 'LoginCtrl'
      templateUrl: 'login.html').state('app.login',
    url: '/contact'
    views: menuContent:
      controller: 'ContactCtrl'
      templateUrl: 'contact.html').state('app.doc',
    url: '/job-monthlys-two'
    views: menuContent:
      controller: 'JobMonthlysTwoCtrl'
      templateUrl: 'job-monthlys-two.html').state 'app.job-benchprep'
  $urlRouterProvider.otherwise '/'
  jwtInterceptorProvider.tokenGetter = (store, jwtHelper, auth) ->
    idToken = store.get('token')
    refreshToken = store.get('refreshToken')
    if !idToken or !refreshToken
      return null
    if jwtHelper.isTokenExpired(idToken)
      auth.refreshIdToken(refreshToken).then (idToken) ->
        store.set 'token', idToken
        idToken
    else
      idToken

    $httpProvider.interceptors.push 'jwtInterceptor'
    return

  $httpProvider.interceptors.push ->
     request: (config) ->
       if config.url.match(/\.html$/) && !config.url.match(/^shared\//)
         if device.tablet()
           type = 'tablet'
         else if device.mobile()
           type = 'mobile'
         else
           type = 'desktop'

         config.url = "/#{type}/#{config.url}"

       config
  authProvider.on "loginSuccess", ($location, $window, profilePromise, idToken, store, refreshToken) ->
    profilePromise.then (profile) ->
      lock = new Auth0Lock('A126XWdJZY715w3B6yVCevpS8tYmPJrj', 'footbros.auth0.com');

      store.set 'profile', profile
      store.set 'token', idToken
      store.set 'refreshToken', refreshToken

      storage = new CrossStorageClient("https://vapealcura.com/#/hub")

      setKeys = ->
        storage.set "token", idToken

      storage.onConnect().then(setKeys)
      $window.location.href = 'https://shop.vapealcura.com'

  authProvider.on "authenticated", ($location, error) ->
    $location.url 'https://shop.vapealcura.com'


  authProvider.on "loginFailure", ($location, error) ->
Franchino.run ($state) ->
  $state.go 'app.home'
