if device.desktop()
  window.Franchino = angular.module('Franchino', [
    'ngSanitize'
    'ui.router'
    'btford.socket-io'
    'tap.controllers'
    'tap.directives'
  ])
else
  window.Franchino = angular.module('Franchino', [
    'ionic'
    'btford.socket-io'
    'tap.controllers'
    'tap.directives'
  ]).run(($ionicPlatform) ->
    $ionicPlatform.ready ->
      if window.StatusBar
        return StatusBar.styleDefault()
      return
  )

Franchino.config ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) ->
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
    url: '/cast'
    views: menuContent:
      controller: 'CastCtrl'
      templateUrl: 'cast.html').state('app.cast',
    url: '/expansionpacks'
    views: menuContent:
      controller: 'ExpansionpacksCtrl'
      templateUrl: 'expansionpacks.html').state('app.expansionpacks',
    url: '/book'
    views: menuContent:
      controller: 'BookCtrl'
      templateUrl: 'book.html').state('app.book',
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
      templateUrl: 'job-monthlys-two.html')
  $urlRouterProvider.otherwise '/'

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

Franchino.run ($state) ->
  $state.go 'app.home'


Franchino.run ($rootScope, copy) ->
  $rootScope.copy = copy
  if device.desktop()
    $rootScope.$on '$includeContentLoaded', (event) ->
      ## Snapscroll and bg video
      $('#fullpage').fullpage
        verticalCentered: true
        sectionsColor: [
          '#1bbc9b'
          '#040b15'
          '#040b15'
          '#040b15'
          '#ccddff'
        ]
        anchors: [
          'firstPage'
          'secondPage'
          '3rdPage'
          '4thpage'
          'lastPage'
        ]
        menu: '#menu'
        scrollingSpeed: 800
        afterRender: ->
          $('video').get(0).play()
          return
      return
  else


    
Franchino.factory 'Socket', (socketFactory) ->
  socketFactory()
Franchino.factory 'Docs', (Socket) ->
  service = undefined
  service =
    list: []
    find: (permalink) ->
      _.find service.list, (doc) ->
        doc.permalink == permalink
  Socket.on 'docs', (docs) ->
    service.list = docs
  service





Franchino.controller 'HomeCtrl', [
  '$scope'
  ($scope) ->

    do ->
      bodyEl = undefined
      closebtn = undefined
      content = undefined
      init = undefined
      initEvents = undefined
      isOpen = undefined
      openbtn = undefined
      toggleMenu = undefined
      bodyEl = document.body
      content = document.querySelector('.content-wrap')
      openbtn = document.getElementById('open-button')
      closebtn = document.getElementById('close-button')
      isOpen = false

      init = ->
        initEvents()
        return

      initEvents = ->
        $ = undefined
        cssId = undefined
        head = undefined
        link = undefined
        if device.desktop()
          
        else if device.mobile()
          $ = document
          cssId = 'myCss'
          if !$.getElementById(cssId)
            head = $.getElementsByTagName('head')[0]
            link = $.createElement('link')
            link.id = cssId
            link.rel = 'stylesheet'
            link.type = 'text/css'
            link.href = 'https://code.ionicframework.com/1.0.0-beta.13/css/ionic.min.css'
            link.media = 'all'
            head.appendChild link
        if device.desktop()
          openbtn.addEventListener 'click', toggleMenu
          if closebtn
            closebtn.addEventListener 'click', toggleMenu
          content.addEventListener 'click', (ev) ->
            target = undefined
            target = ev.target
            if isOpen and target != openbtn
              toggleMenu()
            return
          return
        else

        

      toggleMenu = ->
        if isOpen
          classie.remove bodyEl, 'show-menu'
        else
          classie.add bodyEl, 'show-menu'
        isOpen = !isOpen
        return

      init()
      return
]

Franchino.controller 'ContactSheetCtrl', ($scope, $ionicActionSheet) ->

  $scope.showActionsheet = ->
    $ionicActionSheet.show
      titleText: 'Contact Franchino'
      buttons: [
        { text: 'Github <i class="icon ion-share"></i>' }
        { text: 'Email Me <i class="icon ion-email"></i>' }
        { text: 'Twitter <i class="icon ion-social-twitter"></i>' }
        { text: '224-241-9189 <i class="icon ion-ios-telephone"></i>' }
      ]
      cancelText: 'Cancel'
      cancel: ->
        console.log 'CANCELLED'
        return
      buttonClicked: (index) ->
        if index == 2
          window.location.href = '224-241-9189'
        if index == 2
          window.location.href = 'http://twitter.com/franchino_che'
        if index == 1
          window.location.href = 'mailto:franchino.nonce@gmail.com'
        if index == 0
          window.location.href = 'http://github.com/frangucc'
        true

  return
Franchino.controller 'SlidesTapOneCtrl', ($scope) ->
  $scope.date = 'NOVEMBER 2014'
  $scope.title = 'Tapcentive manager UX overhaul and front-end'
  $scope.images = [ {
    'alt': 'Tapcentive.com UX overhaul and SPA front-end'
    'url': '/img/gif/report.gif'
    'text': '<p>Study the user and their goals and overhaul the experience while re-writing the front-end in Angular.</p><a href=\'http://tapcentive.com\' target=\'_blank\'>Visit Website</a>'
  } ]
Franchino.controller 'SlidesTapTwoCtrl', ($scope) ->
  $scope.date = 'OCTOBER 2014'
  $scope.title = 'Desktop and mobile web friendly marketing website'
  $scope.images = [ {
    'alt': 'Some alt text'
    'url': '/img/franchino-tapcentive-yellow.jpg'
    'text': '<p>Create a knockout brand strategy with an awesome look and feel. Make a sophisticated offering look simple and easy to use.</p><a href=\'http://tapcentive.com\' target=\'_blank\'>Visit Website</a>'
  } ]
Franchino.controller 'SlidesCpgCtrl', ($scope) ->
  $scope.date = 'JULY 2014'
  $scope.title = 'Identity, full-stack MVP, and marketing website for a new CPG eDistribution company'
  $scope.images = [ {
    'alt': 'Some alt text'
    'url': '/img/francino_cpgio.jpg'
    'text': '<p>Turn an old school CPG business into a sophisticated technology company. Design secure, automated and transformative platform, technical architecture and execute an MVP enough to aquire first customers. Mission accomplished.</p><a href=\'http://cpg.io\' target=\'_blank\'>Visit Website</a>'
  } ]
Franchino.controller 'SlidesMedycationCtrl', ($scope) ->
  $scope.date = 'APRIL 2014'
  $scope.title = 'User experience design and rapid prototyping for Medycation, a new healthcare price comparison website'
  $scope.images = [
    {
      'alt': 'Some alt text'
      'url': '/img/franchino-medycation.jpg'
      'text': '<p>Waltz up in the online healthcare industry guns blazing with killer design and instincts. Get this new company off the ground with it\'s MVP. Swipe for more views.</p><a href=\'http://medycation.com\' target=\'_blank\'>Visit Website</a>'
    }
    {
      'alt': 'Some alt text'
      'url': '/img/franchino-medycation2.jpg'
      'text': ''
    }
    {
      'alt': 'Some alt text'
      'url': '/img/franchino-medycation3.jpg'
    }
    {
      'alt': 'Some alt text'
      'url': '/img/franchino-medycation4.jpg'
    }
  ]
Franchino.controller 'SlidesCSTCtrl', ($scope) ->
  $scope.date = 'APRIL 2014'
  $scope.title = 'Designed and developed a new version of the Chicago Sun Times using a hybrid Ionic/Angular stack'
  $scope.images = [
    {
      'alt': 'Some alt text'
      'url': '/img/franchino-cst.jpg'
      'text': '<p>Help the struggling media giant upgrade their consumer facing technology. Create one code base in Angular capable of generating kick-ass experiences for mobile, tablet, web and TV.'
    }
    {
      'alt': 'Some alt text'
      'url': '/img/franchino-cst2.jpg'
    }
    {
      'alt': 'Some alt text'
      'url': '/img/franchino-cst3.jpg'
    }
  ]
Franchino.controller 'SlidesKoupnCtrl', ($scope) ->
  $scope.date = 'MARCH 2014'
  $scope.title = 'Brand refresh, marketing site and platform experience overhaul'
  $scope.images = [
    {
      'alt': 'Some alt text'
      'url': '/img/franchino-koupn1.jpg'
    }
    {
      'alt': 'Some alt text'
      'url': '/img/franchino-koupn2.jpg'
    }
    {
      'alt': 'Some alt text'
      'url': '/img/franchino-koupn.jpg'
    }
  ]
Franchino.controller 'SlidesTroundCtrl', ($scope) ->
  $scope.date = 'AUGUST 2013'
  $scope.title = 'Social travel mobile app design, UX and rapid prototyping'
  $scope.images = [ {
    'alt': 'Some alt text'
    'url': '/img/francino_tround.jpg'
    'text': 'Design an Instagram based social travel app. Why? I don\'t know.'
  } ]
Franchino.controller 'SlidesMonthlysCtrl', ($scope) ->
  $scope.date = 'FEBRUARY 2013'
  $scope.title = 'Customer portal platform UX design and front-end'
  $scope.images = [
    {
      'alt': 'Some alt text'
      'url': '/img/franchino-monthlys-biz2.jpg'
    }
    {
      'alt': 'Some alt text'
      'url': '/img/franchino_monthlys.jpg'
    }
  ]
Franchino.controller 'SlidesMonthlysTwoCtrl', ($scope) ->
  $scope.date = 'MARCH 2012'
  $scope.title = 'Entrepreneur in residence at Lightbank'
  $scope.images = [
    {
      'alt': 'Some alt text'
      'url': '/img/franchino-monthlys7.jpg'
    }
    {
      'alt': 'Some alt text'
      'url': '/img/franchino-monthlys5.jpg'
    }
    {
      'alt': 'Some alt text'
      'url': '/img/franchino-monthlys2.jpg'
    }
  ]
Franchino.controller 'BlogCtrl', ($scope) ->
  $scope.articles = [
    {
      'date': 'Posted by Franchino on December 31, 2014'
      'heading': 'Gitflow?'
      'authorimg': '/img/frank.png'
      'img': '/img/dec/git-flow.jpg'
      'blob': 'Gosh darn-it, teams getting more synced with the help of new git methodologies for teams. <a href=\'https://www.atlassian.com/git/tutorials/comparing-workflows/centralized-workflow\'>I can\'t keep up</a> '
    }
    {
      'date': 'Posted by Franchino on December 22, 2014'
      'heading': 'Oh shit, Angular 2.0'
      'authorimg': '/img/frank.png'
      'img': '/img/graph_spa.jpg'
      'blob': 'Pardon my scattered brain right now. So after watching the <a href=\'https://www.youtube.com/watch?v=gNmWybAyBHI\' target=\'_blank\'>Euro ng-conf video</a> where the creators of Angular 2.0 basically said, everything in changing, I did what most developers would do and completely freaked. I must say, I\'m still, thoroughly confused, even after speaking to a dozen or so key figures in the industry. My first reaction? Tweet out in anger. F-U Angular team I pronounced. F-U. Then, more panic as I continued to read some of the posts by others feeling the same way. I asked the Angular team, how they were helping the industry by telling us in a year anything we have developed in Angular would be garbage. I did what others seemed to be doing and immediately started looking for another framework to study and invest in. That\'s when I found <a href=\'http://www.indeed.com/jobtrends?q=ember.js%2C+angular.js%2C+react.js%2C+backbone.js&l=\' target=\'_blank\'>this graph</a> telling me the only other SPA framework that has as much activity as Angular is good old Backbone. <br /><br />Backbone, my first SPA love - we\'ve met before. Even recently. But I\'ve been lost. I\'ve been inlove with Egghead.io and things like Ionic, Sprangular and all sorts of things that give me stuff for free. But then I noticed something. The backbone community has been quietly doing it\'s thing for a minute now. Backbonerails.com? Are you kidding, what a resource. Marionette? Lovely. The list goes on. I now have dozens of reasons to give Backbone another look. And then, it happened. I emailed Max Lynch over at Ionic and said, I think you need to address the fright of Angular 2.0 some of us are experiencing. And then he shed some light. After a really awesome response, he said something at the end to the tune of. Angular 2 is all about making it easier and faster to use, and more appropriate for future browser standards like Web Components. Hmm... <br /><br />Web Components. You mean, this stuff I\'ve been hearing about, things like Polymer, and these new specs the browser already has begun to support, like Shadow Dom, custom elements and imports. So. Where the hell am I right now? For now, I think I\'ll take a break from stressing about SPA frameworks and look at <a href=\'https://www.polymer-project.org/\' target=\'_blank\'>Polymer</a>, <a href=\'http://webcomponents.org/\' target=\'_blank\'>Web Components</a>, E6 and study up on <a href=\'https://material.angularjs.org/#/\' target=\'_blank\'>Material Design</a> for a minute.'
    }
    {
      'date': 'Posted by Franchino on December 12, 2014'
      'heading': 'My path to learning Swift'
      'authorimg': '/img/frank.png'
      'img': '/img/dec/newsletter-swiftris-header.gif'
      'blob': 'I\'ve been an MVC developer in every language except for iOS. This past October, I took my first real deep dive into iOS programming and started with Swift. There are two great tutorials out there. The first is from bloc.io and is free. It\'s a game, Swiftris, so get ready for some action. <br /><br /> The second will help you build something more appish, it\'s by Appcoda. Got their book and will be done with it this week. So far, books ok, but it moves really slow. I\'ll post a blog in a few days with links to the app was able to build.'
      'resource1': 'https://www.bloc.io/swiftris-build-your-first-ios-game-with-swift'
      'resource2': 'http://www.appcoda.com/swift/'
    }
    {
      'date': 'Posted by Franchino on December 11, 2014'
      'heading': 'Why I get goose bumps when you talk about automated email marketing and segmentation and customer.io and things like that.'
      'authorimg': '/img/frank.png'
      'img': '/img/dec/prepemails.png'
      'blob': 'I get teary eyed when I talk about my work at BenchPrep.com. In short, I was the first employee and helped the company get to their series B near the end of year two. I got a lot done there, and one of the things I really enjoyed was building out technology to segment leads, bring different users down different communication paths and how I mapped out the entire system using complex diagrams and workflows. <br /><br />Some of the tools were built and based on ques like Redis or Resque, others we built into ExactTarget and Customer.io. In the end, I became somewhat of an expert at monetizing emails. Within our email marketing channel, we explored tagging users based on their actions, such as opens or non opens, or what they clicked on, we targed email users who had been touched seven times with special irrisitable sales, because we know after 6 touches, we could convert. These tricks we learned led to 25-30k days, and eventually, days where we sold 100k worth of subscriptions. <br /><br />So, my point? Don\'t be surprised if I geek out and faint when I hear you talk about transactional emailing and cadences and consumer journies and stuff like that.'
    }
    {
      'date': 'Posted by Franchino on December 10, 2014'
      'heading': 'If I could have one wish; I get to use this method when designing your consumer journey funnel.'
      'authorimg': '/img/frank.png'
      'img': '/img/dec/ux_board.jpg'
      'blob': 'So after a bunch of ethnographic studies from persona matches I gather in-person, I get to fill a wall up with key things people said, felt, heard - motivators, barriers, questions, attitudes and such. I then group these post-it thoughts in various ways, looking for patterns, sentiment, new ideas. <br /><br />I then take this rich data and develop a what could be branding, a landing page or an email - with what I call, an inverted pyramid approach to content, where addressing the most important things found in the user research get addressed in a heriarchical order. I create 5-6 iterations of the landing page and re-run them through a second group of participants, stakeholders and friends. I then take even more notes on peoples speak-aloud reactions to the landing pages. After this, I\'m ready to design the final copy and pages for your funnel.'
    }
    {
      'date': 'Posted by Franchino on December 9, 2014'
      'heading': 'Who says I don\'t belong here?'
      'authorimg': '/img/frank.png'
      'img': '/img/dec/ucla.jpg'
      'blob': 'This coming weekend there\'s probably a hackathon going on in your city. Some of them are getting really big. I wasn\'t registered for LA Hacks this summer. I don\'t even know how I ended up there on a Friday night, but when I saw what was going on, I grabbed a chair and started hacking away. Worried I had just snuck in the back door and started competing, my ride left and there I was, for the next two days. <br /><br />That\'s right. I snuck in the back of LA Hacks last summer at UCLA and hacked with kids 10 years younger than me. I couldn\'t miss it. I was floored when I saw how many people were in it. Me, being the mischevious hacker I am, I thought if I used the energy of the environment to my advantage, I could build something cool. Long story short, let me just say, that if you have been having a hard time launching, sign up for a hackathon. It\'s a guaranteed way to over-compensate for your constant failure to launch. More on what happened when I took the stage by surprise and got booted later...'
    }
    {
      'date': 'Posted by Franchino on December 8, 2014'
      'heading': 'Started in Ember.js, finished in Angular.js. Why and how did this happen?'
      'authorimg': '/img/frank.png'
      'img': '/img/dec/ux1.jpg'
      'blob': 'I got love for all SPA frameworks. Collectively, they all push the envelope. My first client-side MVC project was a backbone project - and we started when they were in Beta. That project was BenchPrep. At the time, as a front-end developer, I was confused by the sweeping changes to how things needed to be done. Full fledged MVC frameworks in JavaScript lended a whole new syntax, and to top it off, our engineers on the team were using CoffeeScript, HAML, SASS and Jasmine, etc. My first SPA project did not go well and it wasn\'t until we completely re-wrote the software that I started understanding everything clearly. Two years later, a new team I was working with decided to build <a href=\'http://agentrun.com\' target=\'_blank\'>Agentrun.com</a> in Ember.js. We dove in. Four months later, we ported to Angular and since, I\'ve never looked back. I\'m on my fifth or sixth angular project now and I don\'t plan on changing frameworks for a while - at least personally. <br /><br />The angular movement reminds me the most of the RoR movement. I don\'t get stuck trying to do things like I do in Backbone or Ember. I could get into discussion and technical examples, but there are better places to compare the two. I can\'t wait for the completely revamped Angular 2.0 and am looking forward to a 5-7 year future with Angular before something new comes out, something that perhaps just builds apps for you by reading your mind. <br /><br />Oh, and if your wondering who designed this lovely website, that was yours truly. I led the UX research, UX prototyping, user research and graphic design of this product.'
    }
    {
      'date': 'Posted by Franchino on December 7, 2014'
      'heading': 'Please don\'t ask me about my art and mixed media background. I might totally avoid the question.'
      'authorimg': '/img/frank.png'
      'img': '/img/dec/mixed.jpg'
      'blob': 'I have a huge complex about my hybrid background. I can\'t tell you how many times I\'ve been on an interview where I\'ve tried to explain the fact that I\'m an artist and a programmer. The minute I do this, I\'m almost instantly written off as a jack-of-all trades or weak on one side. <br /><br />So, I\'m about to officially explain to everyone something I\'m pretty sensative about. I\'m a very talented creative director with a very sophisticated technical background. I make explainer videos, I film, I do user research, I design and I program. Yes, I program - I will front-end with the best and have a knack for front-end MVC frameworks. <br /><br />Yes, there are some things I\'m not good at. I\'m not your genius programmer that will lead your other programmers to the promise land, but not weak like your thinking - I just know a lot of hackers who don\'t concern themselves with things that I get lost in, like design or content strategy, or user research. So when I say weak, I mean weak like, I\'m talking, possibly, faul-tolerant functional progamming in low level languages or Erlang or Elixer with superviser OTP architectures and message passing. I\'m taling middleware development. I\'m talking TDD dev all day every day on a hardcore scrum team. That\'s not me. I\'m not your lead here, however I will Jr. on understanding how every line of code works in your app. I\'m your prototyper, MVP guy or follow your lead guy when it comes to programming. I can make just about anything I want, but don\'t feel comfortable leading say, an iOS or Java team. I just don\'t have enough low-level programming experience in those particulare frameworks. When it comes to JavaScript, I\'m a 7. There isn\'t anything you can\'t ask me to do with JavaScript, from Famo.us to MVC stuff - however, I\'m not your guy who\'s going to introduce the next big open-source tool in JS. I\'m a macro JS developer - meaning I can take established patterns and components and concepts and run with them. I don\'t give talks on big-o notations and I might not be down for a 40 hour a week job of hardcore TDD programming - but this doesn\'t mean you should write me off as a generalist.<br /><br />The fact is that I\'ve never been the type for a role with an early stage startup where I didn\'t wear a bunch of hats or transition periodically from a design minded thinker to a technical scrum, requirement writing, produc managing anal-ist.'
    }
  ]
Franchino.controller 'BlogRollCtrl', ($scope) ->
Franchino.controller 'AboutCtrl', ($scope) ->
Franchino.controller 'AppCtrl', ($scope) ->
Franchino.controller 'ResumeCtrl', ($scope) ->
  $scope.blob = '<div class="row"><div class="large-12"><div class="row"><div class="large-12 columns"><h6>NOV 2013 - PRESENT</h6><br/><h2>Hybrid Experience Designer/Developer, Independent</h2><br/><p>Worked with noteable entreprenours on several new product and business launches. Held numerous roles, including content strategist, user researcher, designer and developer. </p><p><strong>Companies</strong></p><ul class="no"><li><a href="http://tapcentive.com" target="_blank">Tapcentive</a></li><li><a href="http://cpg.io" target="_blank">CPGio</a></li><li><a href="http://kou.pn/" target="_blank">Kou.pn Media</a></li><li> <a href="http://medycation.com" target="_blank">Medycation</a></li><li> <a href="http://www.suntimes.com/" target="_blank">Chicago Sun Times</a></li></ul><br/><p><strong>Tapcentive Deliverables</strong></p><ul class="bullets"><li>Complete Tapcentive.com marketing website and UX overhaul of core product, the "Tapcentive Manager"</li><li>Industrial design of the Tapcentive Touchpoint</li><li>Content strategy for corporate marketing site</li><li>Mobile first marketing website using Ionic and Angular</li></ul><p><strong>CPGio Deliverables</strong></p><ul class="bullets"><li>Product and business strategy, technical architecture and specification design</li><li>One hundred page proposal template on business model and corporate capabilities</li><li>Marketing website design and content strategy</li><li>Core product design and MVP functional prototype</li></ul><p><strong>Kou.pn Deliverables</strong></p><ul class="bullets"><li>Kou.pn Media brand refresh</li><li>Marketing site redesign</li><li>Portal user experience overhaul</li></ul><p><strong>Medycation Deliverables</strong></p><ul class="bullets"><li>Conceptual design and art direction</li><li>User research</li><li>Rapid prototypes</li></ul><p><strong>Chicago Sun Times</strong></p><ul class="bullets"><li>Conceptual design and art direction</li><li>Native iOS and Android app design and junior development</li><li>Hybrid Ionic/Angular development</li></ul></div></div><br/><div class="row"><div class="large-12 columns"><h6>MARCH 2010 - OCTOBER 2013</h6><br/><h2>Director of User Experience, Lightbank</h2><br/><p>Launched and supported multiple new companies within the Lightbank portfolio. </p><p><strong>Companies</strong></p><ul class="no"><li> <a href="http://chicagoideas.com" target="_blank">ChicagoIdeas.com</a></li><li> <a href="http://benchprep.com" target="_blank">BenchPrep.com</a></li><li> <a href="http://snapsheetapp.com" target="_blank">SnapSheetApp.com</a></li><li>Monthlys.com (defunct)</li><li> <a href="http://dough.com" target="_blank">Dough.com</a></li><li> <a href="http://groupon.com" target="_blank">Groupon.com</a></li></ul><br/><p><strong>Chicago Ideas Deliverables</strong></p><ul class="bullets"><li>Website design refresh, art direction</li><li>Custom ticket purchasing platform UX research &amp; design</li><li>Ruby on Rails development, maintenence</li><li>Graphic design support</li><li>Annual report design</li></ul><p><strong>BenchPrep.com Deliverables</strong></p><ul class="bullets"><li>Re-branding, complete BenchPrep identity package</li><li>Supported company with all design and ux from zero to eight million in financing</li><li>Lead art and UX direction for two years</li><li>Front-end using Backbone and Bootstrap</li><li>User research, ethnographic studies, user testing</li><li>Email marketing cadence system design and execution</li><li>Scripted, storyboarded and executed both animated and live motion explainer videos</li></ul><p><strong>SnapSheetApp.com Deliverables</strong></p><ul class="bullets"><li>Large scale portal UX research and information architecture</li><li>Three rounds of rapid prototyping and user testing</li><li>Graphic design and interaction design framework</li><li>User testing</li></ul><p><strong>Monthlys.com Deliverables</strong></p><ul class="bullets"><li>Identity and art direction</li><li>Product strategy and new company launch</li><li>Online marketing strategy, including transactional email, promotion design and lead generation</li><li>Product experience design and front-end</li><li>Content strategy</li><li>Scripted, storyboarded and executed both animated and live motion explainer videos</li></ul><p><strong>Dough.com Deliverables</strong></p><ul class="bullets bullets"><li>Consumer journey mapping and ethnographic studies</li><li>Rapid prototyping, conceptual design</li><li>Messaging strategy, user testing</li></ul><p><strong>Groupon.com Deliverables</strong></p><ul class="bullets"><li>Emerging markets research</li><li>Rapid design and prototyping</li><li>Visual design on new concepts</li><li>Email segmentation research</li></ul></div></div><br/><div class="row"><div class="large-12 columns"><h6>NOVEMBER 2007 - APRIL 2010</h6><br/><h2>Developer &amp; Co-founder, Dillyeo.com</h2><br/><p>Co-founded, designed and developed a daily deal eCommerce website.</p><p><strong>Role</strong><br/>Designed, developed and launched companies first cart with PHP. Iterated and grew site to more than two hundred and fifty thousand subscribers in less than one year. </p><p><strong>Noteable Stats</strong></p><ul class="bullets"><li>Built a list of 250,000 subscribers in the first year</li><li>Pivoted and tweaked design, business and approach to 1000 transactions per daily</li><li>Sold business in December 2009 to Innovative Commerce Solutions</li></ul></div></div><br/><div class="row"><div class="large-12 columns"><h6>MARCH 2005 - OCTOBER 2007</h6><br/><h2>Solutions Architect &amp; Senior Developer, <a href="http://www.manifestdigital.com/">Manifest Digital</a></h2><br/><p>Built and managed multiple CareerBuilder.com niche sites for the largest independent agency in the midwest.</p><p><strong>Role</strong><br/>Research and explore emerging technologies, implement solutions and manage other developers. Worked with asp.net on a daily basis for almost two years. </p><p><strong>Noteable Accomplishments</strong></p><ul class="bullets"><li>Recognized for launching high quality web app for Career Builder in record time</li><li>Managed extreme SEO project with more than 500 thousand links, pages and over 8 million UGC artifacts</li><li>Shifted agencies development practices to various new client-centric AJAX methodologies</li><li>Managed multiple projects concurrently, including choosechicago.com and briefing.com</li></ul></div></div><br/><div class="row"><div class="large-12 columns"><h6>APRIL 2004 - JANUARY 2007</h6><br/><h2>Junior PLD Developer,  <a href="http://www.avenue-inc.com/">Avenue</a></h2><br/><p>Front-end developer and UX design intern for Avenue A Razorfishs\' legacy company, Avenue-inc.</p><p><strong>Role</strong><br/>Develop front-end for multiple client websites, including flor.com, achievement.org, canyonranch.com and turbochef.</p><p><strong>Noteable Accomplishments</strong></p><ul class="bullets"><li>Executed front-end projects on-time and under-budget</li><li>Assigned UX internship role, recognized by design team as a young talent</li><li>Wireframed custom shopping cart platform for flor.com</li><li>Developed internal SEO practice</li></ul></div></div><br/><div class="row"><div class="large-12 columns"><h6>JULY 2000 - JANUARY 2004</h6><br/><h2>eCommerce Developer, Atova</h2><br/><p>General web designer and developer for family owned paint distribution business. </p><p><strong>Role</strong><br/>Built several shopping carts in classic ASP and PHP. Grew business using online marketing strategies to two million in revenue. </p><p><strong>Noteable Accomplishments</strong></p><ul class="bullets"><li>Became first company to ship paints and coatings across the United States</li><li>First employee, developed company to 2+ million in revenue with Overture, Google Adwords and SEO</li><li>Created, marketed and subscribed vocational school for specialty coatings</li><li>Worked with top Italian paint manufacturers overseas to build exclusive distribution rights</li></ul></div></div><br/><div class="row"><div class="large-12 columns"><h6>SEPTEMBER 2000 - MAY 2002</h6><br/><h2>Education</h2><br/><p>Self educated designer/programmer with vocational training. </p><p><strong>Certifications</strong><br/>iNET+, A+ Certification </p><p><strong>Apprenticeship</strong><br/>Year long personal apprenticeship with first engineer at Amazon.com</p></div></div></div></div><br/><br/>'
Franchino.controller 'JobTapcentiveCtrl', ($scope) ->
Franchino.controller 'JobTapcentiveTwoCtrl', ($scope) ->
Franchino.controller 'JobCpgioCtrl', ($scope) ->
Franchino.controller 'JobMedycationCtrl', ($scope) ->
Franchino.controller 'JobCstCtrl', ($scope) ->
Franchino.controller 'LandingCtrl', ($scope) ->
  #youtube script
  tag = document.createElement("script")
  tag.src = "//www.youtube.com/iframe_api"
  firstScriptTag = document.getElementsByTagName("script")[0]
  firstScriptTag.parentNode.insertBefore tag, firstScriptTag
  player = undefined
  onYouTubeIframeAPIReady = ->
    player = new YT.Player("player",
      height: "244"
      width: "434"
      videoId: "AkyQgpqRyBY" # youtube video id
      playerVars:
        autoplay: 0
        rel: 0
        showinfo: 0

      events:
        onStateChange: onPlayerStateChange
    )

  onPlayerStateChange = (event) ->
    $(".start-video").fadeIn "normal"  if event.data is YT.PlayerState.ENDED


Franchino.controller 'JobKoupnCtrl', ($scope) ->
Franchino.controller 'CastCtrl', ($scope) ->
Franchino.controller 'ExpansionpacksCtrl', ($scope) ->
Franchino.controller 'BookCtrl', ($scope) ->
Franchino.controller 'JobMedycationCtrl', ($scope) ->
Franchino.controller 'JobMedycationCtrl', ($scope) ->
Franchino.controller 'JobTroundCtrl', ($scope) ->
Franchino.controller 'JobMonthlysOneCtrl', ($scope) ->
Franchino.controller 'JobMonthlysTwoCtrl', ($scope) ->
Franchino.controller 'JobBenchprepCtrl', ($scope) ->
Franchino.controller 'ContactCtrl', ($scope) ->
Franchino.controller 'DevelopersCtrl', ($scope) ->
Franchino.controller 'DeveloperCenterCtrl', ($scope) ->
Franchino.controller 'DocsCtrl', ($scope, Docs) ->
  $scope.$watch (->
    Docs.list
  ), ->
    $scope.docs = Docs.list
Franchino.controller 'DocCtrl', ($scope, $sce, $stateParams, $timeout, Docs) ->
  $scope.index = if $stateParams.step then $stateParams.step - 1 else 0
  $scope.$watch (->
    Docs.list
  ), ->
    $scope.doc = Docs.find($stateParams.permalink)
    if $scope.doc
      $scope.step = $scope.doc.steps[$scope.index]
      $scope.step.url = $sce.trustAsResourceUrl($scope.step.url)
      if $scope.step.type == 'dialog'
        $scope.messageIndex = 0
        $scope.messages = []
        return $timeout($scope.nextMessage, 1000)
    return

  $scope.hasMoreSteps = ->
    if $scope.step
      return $scope.step.index < $scope.doc.steps.length
    return

Franchino.directive 'mySlideshow', ->
  {
    restrict: 'AC'
    link: (scope, element, attrs) ->
      config = undefined
      config = angular.extend({ slides: '.slide' }, scope.$eval(attrs.mySlideshow))
      setTimeout (->
        $(element).cycle ->
          {
            fx: 'fade'
            speed: 'fast'
            next: '#next2'
            prev: '#prev2'
            caption: '#alt-caption'
            caption_template: '{{images.alt}}'
            pause_on_hover: 'true'
          }
      ), 0

  }
angular.module 'tap.controllers', []
angular.module('tap.directives', []).directive('device', ->
  {
    restrict: 'A'
    link: ->
      device.init()

  }
).service 'copy', ($sce) ->
  copy = undefined
  trustValues = undefined
  copy =
    about:
      heading: 'We\'re <strong>tapping</strong> into the future'
      sub_heading: 'Tapcentive was created by a team that has lived the mobile commerce revolution from the earliest days of mCommerce with WAP, to leading the charge in mobile payments and services with NFC worldwide.'
      copy: '<p>For us, mobile commerce has always been about much more than payment:  marketing, promotions, product content, and loyalty, all come to life inside a mobile phone. Mobile commerce really gets interesting when it bridges the digital and physical worlds.</p><p>Our goal at Tapcentive is to create a state-of-the-art mobile engagement platform that enables marketers and developers to create entirely new customer experiences in physical locations – all with a minimum amount of technology development.</p><p>We think you’ll like what we’ve built so far. And just as mobile technology is constantly evolving, so is the Tapcentive platform. Give it a test drive today.</p>'
    team:
      heading: ''
      bios:
        dave_role: ''
        dave_copy: ''

  trustValues = (values) ->
    _.each values, (val, key) ->
      switch typeof val
        when 'string'
          return $sce.trustAsHtml(val)
        when 'object'
          return trustValues(val)
      return

  trustValues copy
  copy
