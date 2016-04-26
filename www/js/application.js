if (device.desktop()) {
  window.Franchino = angular.module('Franchino', ['ngSanitize', 'ui.router', 'btford.socket-io', 'tap.controllers', 'tap.directives']);
} else {
  window.Franchino = angular.module('Franchino', ['ionic', 'btford.socket-io', 'tap.controllers', 'tap.directives']).run(function($ionicPlatform) {
    return $ionicPlatform.ready(function() {
      if (window.StatusBar) {
        return StatusBar.styleDefault();
      }
    });
  });
}

Franchino.config(function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
  $stateProvider.state('app', {
    url: '',
    abstract: true,
    controller: 'AppCtrl',
    templateUrl: 'menu.html'
  }).state('app.home', {
    url: '/',
    views: {
      menuContent: {
        controller: 'HomeCtrl',
        templateUrl: 'home.html'
      }
    }
  }).state('blog', {
    url: '/blogroll',
    controller: 'BlogRollCtrl',
    templateUrl: ''
  }).state('app.docs', {
    url: '/docs',
    views: {
      menuContent: {
        controller: 'DocsCtrl',
        templateUrl: 'docs/index.html'
      }
    }
  }).state('app.about', {
    url: '/landing',
    views: {
      menuContent: {
        controller: 'LandingCtrl',
        templateUrl: 'landing.html'
      }
    }
  }).state('app.landing', {
    url: '/node',
    views: {
      menuContent: {
        controller: 'NodeCtrl',
        templateUrl: 'node.html'
      }
    }
  }).state('app.node', {
    url: '/about',
    views: {
      menuContent: {
        controller: 'AboutCtrl',
        templateUrl: 'about.html'
      }
    }
  }).state('app.blog', {
    url: '/blog',
    views: {
      menuContent: {
        controller: 'BlogCtrl',
        templateUrl: 'blog.html'
      }
    }
  }).state('app.resume', {
    url: '/cast',
    views: {
      menuContent: {
        controller: 'CastCtrl',
        templateUrl: 'cast.html'
      }
    }
  }).state('app.cast', {
    url: '/expansionpacks',
    views: {
      menuContent: {
        controller: 'ExpansionpacksCtrl',
        templateUrl: 'expansionpacks.html'
      }
    }
  }).state('app.expansionpacks', {
    url: '/book',
    views: {
      menuContent: {
        controller: 'BookCtrl',
        templateUrl: 'book.html'
      }
    }
  }).state('app.book', {
    url: '/products',
    views: {
      menuContent: {
        controller: 'ProductsCtrl',
        templateUrl: 'products.html'
      }
    }
  }).state('app.products', {
    url: '/parents',
    views: {
      menuContent: {
        controller: 'ParentsCtrl',
        templateUrl: 'parents.html'
      }
    }
  }).state('app.parents', {
    url: '/educators',
    views: {
      menuContent: {
        controller: 'EducatorsCtrl',
        templateUrl: 'educators.html'
      }
    }
  }).state('app.educators', {
    url: '/login',
    views: {
      menuContent: {
        controller: 'LoginCtrl',
        templateUrl: 'login.html'
      }
    }
  }).state('app.login', {
    url: '/contact',
    views: {
      menuContent: {
        controller: 'ContactCtrl',
        templateUrl: 'contact.html'
      }
    }
  }).state('app.doc', {
    url: '/job-monthlys-two',
    views: {
      menuContent: {
        controller: 'JobMonthlysTwoCtrl',
        templateUrl: 'job-monthlys-two.html'
      }
    }
  });
  $urlRouterProvider.otherwise('/');
  return $httpProvider.interceptors.push(function() {
    return {
      request: function(config) {
        var type;
        if (config.url.match(/\.html$/) && !config.url.match(/^shared\//)) {
          if (device.tablet()) {
            type = 'tablet';
          } else if (device.mobile()) {
            type = 'mobile';
          } else {
            type = 'desktop';
          }
          config.url = "/" + type + "/" + config.url;
        }
        return config;
      }
    };
  });
});

Franchino.run(function($state) {
  return $state.go('app.home');
});

Franchino.run(function($rootScope, copy) {
  $rootScope.copy = copy;
  if (device.desktop()) {
    return $rootScope.$on('$includeContentLoaded', function(event) {
      $('#fullpage').fullpage({
        verticalCentered: true,
        sectionsColor: ['#1bbc9b', '#040b15', '#040b15', '#040b15', '#ccddff'],
        anchors: ['firstPage', 'secondPage', '3rdPage', '4thpage', 'lastPage'],
        menu: '#menu',
        scrollingSpeed: 800,
        afterRender: function() {
          $('video').get(0).play();
        }
      });
    });
  } else {

  }
});

Franchino.factory('Socket', function(socketFactory) {
  return socketFactory();
});

Franchino.factory('Docs', function(Socket) {
  var service;
  service = void 0;
  service = {
    list: [],
    find: function(permalink) {
      return _.find(service.list, function(doc) {
        return doc.permalink === permalink;
      });
    }
  };
  Socket.on('docs', function(docs) {
    return service.list = docs;
  });
  return service;
});

Franchino.controller('HomeCtrl', [
  '$scope', function($scope) {
    return (function() {
      var bodyEl, closebtn, content, init, initEvents, isOpen, openbtn, toggleMenu;
      bodyEl = void 0;
      closebtn = void 0;
      content = void 0;
      init = void 0;
      initEvents = void 0;
      isOpen = void 0;
      openbtn = void 0;
      toggleMenu = void 0;
      bodyEl = document.body;
      content = document.querySelector('.content-wrap');
      openbtn = document.getElementById('open-button');
      closebtn = document.getElementById('close-button');
      isOpen = false;
      init = function() {
        initEvents();
      };
      initEvents = function() {
        var $, cssId, head, link;
        $ = void 0;
        cssId = void 0;
        head = void 0;
        link = void 0;
        if (device.desktop()) {

        } else if (device.mobile()) {
          $ = document;
          cssId = 'myCss';
          if (!$.getElementById(cssId)) {
            head = $.getElementsByTagName('head')[0];
            link = $.createElement('link');
            link.id = cssId;
            link.rel = 'stylesheet';
            link.type = 'text/css';
            link.href = 'https://code.ionicframework.com/1.0.0-beta.13/css/ionic.min.css';
            link.media = 'all';
            head.appendChild(link);
          }
        }
        if (device.desktop()) {
          openbtn.addEventListener('click', toggleMenu);
          if (closebtn) {
            closebtn.addEventListener('click', toggleMenu);
          }
          content.addEventListener('click', function(ev) {
            var target;
            target = void 0;
            target = ev.target;
            if (isOpen && target !== openbtn) {
              toggleMenu();
            }
          });
        } else {

        }
      };
      toggleMenu = function() {
        if (isOpen) {
          classie.remove(bodyEl, 'show-menu');
        } else {
          classie.add(bodyEl, 'show-menu');
        }
        isOpen = !isOpen;
      };
      init();
    })();
  }
]);

Franchino.controller('ParentsCtrl', [
  '$scope', function($scope) {
    return (function() {
      var bodyEl, closebtn, content, init, initEvents, isOpen, openbtn, toggleMenu;
      bodyEl = void 0;
      closebtn = void 0;
      content = void 0;
      init = void 0;
      initEvents = void 0;
      isOpen = void 0;
      openbtn = void 0;
      toggleMenu = void 0;
      bodyEl = document.body;
      content = document.querySelector('.content-wrap');
      openbtn = document.getElementById('open-button');
      closebtn = document.getElementById('close-button');
      isOpen = false;
      init = function() {
        initEvents();
      };
      initEvents = function() {
        var $, cssId, head, link;
        $ = void 0;
        cssId = void 0;
        head = void 0;
        link = void 0;
        if (device.desktop()) {

        } else if (device.mobile()) {
          $ = document;
          cssId = 'myCss';
          if (!$.getElementById(cssId)) {
            head = $.getElementsByTagName('head')[0];
            link = $.createElement('link');
            link.id = cssId;
            link.rel = 'stylesheet';
            link.type = 'text/css';
            link.href = 'https://code.ionicframework.com/1.0.0-beta.13/css/ionic.min.css';
            link.media = 'all';
            head.appendChild(link);
          }
        }
        if (device.desktop()) {
          openbtn.addEventListener('click', toggleMenu);
          if (closebtn) {
            closebtn.addEventListener('click', toggleMenu);
          }
          content.addEventListener('click', function(ev) {
            var target;
            target = void 0;
            target = ev.target;
            if (isOpen && target !== openbtn) {
              toggleMenu();
            }
          });
        } else {

        }
      };
      toggleMenu = function() {
        if (isOpen) {
          classie.remove(bodyEl, 'show-menu');
        } else {
          classie.add(bodyEl, 'show-menu');
        }
        isOpen = !isOpen;
      };
      init();
    })();
  }
]);

Franchino.controller('ContactSheetCtrl', function($scope, $ionicActionSheet) {
  $scope.showActionsheet = function() {
    return $ionicActionSheet.show({
      titleText: 'Contact Franchino',
      buttons: [
        {
          text: 'Github <i class="icon ion-share"></i>'
        }, {
          text: 'Contact Us <i class="icon ion-email"></i>'
        }, {
          text: 'Twitter <i class="icon ion-social-twitter"></i>'
        }, {
          text: '224-241-9189 <i class="icon ion-ios-telephone"></i>'
        }
      ],
      cancelText: 'Cancel',
      cancel: function() {
        console.log('CANCELLED');
      },
      buttonClicked: function(index) {
        if (index === 2) {
          window.location.href = '224-241-9189';
        }
        if (index === 2) {
          window.location.href = 'http://twitter.com/gamifyed_';
        }
        if (index === 1) {
          window.location.href = 'mailto:frank@fye2.com';
        }
        if (index === 0) {
          window.location.href = 'http://github.com/frangucc';
        }
        return true;
      }
    });
  };
});

Franchino.controller('SlidesTapOneCtrl', function($scope) {
  $scope.date = 'NOVEMBER 2014';
  $scope.title = 'Tapcentive manager UX overhaul and front-end';
  return $scope.images = [
    {
      'alt': 'Tapcentive.com UX overhaul and SPA front-end',
      'url': '/img/gif/report.gif',
      'text': '<p>Study the user and their goals and overhaul the experience while re-writing the front-end in Angular.</p><a href=\'http://tapcentive.com\' target=\'_blank\'>Visit Website</a>'
    }
  ];
});

Franchino.controller('SlidesTapTwoCtrl', function($scope) {
  $scope.date = 'OCTOBER 2014';
  $scope.title = 'Desktop and mobile web friendly marketing website';
  return $scope.images = [
    {
      'alt': 'Some alt text',
      'url': '/img/franchino-tapcentive-yellow.jpg',
      'text': '<p>Create a knockout brand strategy with an awesome look and feel. Make a sophisticated offering look simple and easy to use.</p><a href=\'http://tapcentive.com\' target=\'_blank\'>Visit Website</a>'
    }
  ];
});

Franchino.controller('SlidesCpgCtrl', function($scope) {
  $scope.date = 'JULY 2014';
  $scope.title = 'Identity, full-stack MVP, and marketing website for a new CPG eDistribution company';
  return $scope.images = [
    {
      'alt': 'Some alt text',
      'url': '/img/francino_cpgio.jpg',
      'text': '<p>Turn an old school CPG business into a sophisticated technology company. Design secure, automated and transformative platform, technical architecture and execute an MVP enough to aquire first customers. Mission accomplished.</p><a href=\'http://cpg.io\' target=\'_blank\'>Visit Website</a>'
    }
  ];
});

Franchino.controller('SlidesMedycationCtrl', function($scope) {
  $scope.date = 'APRIL 2014';
  $scope.title = 'User experience design and rapid prototyping for Medycation, a new healthcare price comparison website';
  return $scope.images = [
    {
      'alt': 'Some alt text',
      'url': '/img/franchino-medycation.jpg',
      'text': '<p>Waltz up in the online healthcare industry guns blazing with killer design and instincts. Get this new company off the ground with it\'s MVP. Swipe for more views.</p><a href=\'http://medycation.com\' target=\'_blank\'>Visit Website</a>'
    }, {
      'alt': 'Some alt text',
      'url': '/img/franchino-medycation2.jpg',
      'text': ''
    }, {
      'alt': 'Some alt text',
      'url': '/img/franchino-medycation3.jpg'
    }, {
      'alt': 'Some alt text',
      'url': '/img/franchino-medycation4.jpg'
    }
  ];
});

Franchino.controller('SlidesCSTCtrl', function($scope) {
  $scope.date = 'APRIL 2014';
  $scope.title = 'Designed and developed a new version of the Chicago Sun Times using a hybrid Ionic/Angular stack';
  return $scope.images = [
    {
      'alt': 'Some alt text',
      'url': '/img/franchino-cst.jpg',
      'text': '<p>Help the struggling media giant upgrade their consumer facing technology. Create one code base in Angular capable of generating kick-ass experiences for mobile, tablet, web and TV.'
    }, {
      'alt': 'Some alt text',
      'url': '/img/franchino-cst2.jpg'
    }, {
      'alt': 'Some alt text',
      'url': '/img/franchino-cst3.jpg'
    }
  ];
});

Franchino.controller('SlidesKoupnCtrl', function($scope) {
  $scope.date = 'MARCH 2014';
  $scope.title = 'Brand refresh, marketing site and platform experience overhaul';
  return $scope.images = [
    {
      'alt': 'Some alt text',
      'url': '/img/franchino-koupn1.jpg'
    }, {
      'alt': 'Some alt text',
      'url': '/img/franchino-koupn2.jpg'
    }, {
      'alt': 'Some alt text',
      'url': '/img/franchino-koupn.jpg'
    }
  ];
});

Franchino.controller('SlidesTroundCtrl', function($scope) {
  $scope.date = 'AUGUST 2013';
  $scope.title = 'Social travel mobile app design, UX and rapid prototyping';
  return $scope.images = [
    {
      'alt': 'Some alt text',
      'url': '/img/francino_tround.jpg',
      'text': 'Design an Instagram based social travel app. Why? I don\'t know.'
    }
  ];
});

Franchino.controller('SlidesMonthlysCtrl', function($scope) {
  $scope.date = 'FEBRUARY 2013';
  $scope.title = 'Customer portal platform UX design and front-end';
  return $scope.images = [
    {
      'alt': 'Some alt text',
      'url': '/img/franchino-monthlys-biz2.jpg'
    }, {
      'alt': 'Some alt text',
      'url': '/img/franchino_monthlys.jpg'
    }
  ];
});

Franchino.controller('SlidesMonthlysTwoCtrl', function($scope) {
  $scope.date = 'MARCH 2012';
  $scope.title = 'Entrepreneur in residence at Lightbank';
  return $scope.images = [
    {
      'alt': 'Some alt text',
      'url': '/img/franchino-monthlys7.jpg'
    }, {
      'alt': 'Some alt text',
      'url': '/img/franchino-monthlys5.jpg'
    }, {
      'alt': 'Some alt text',
      'url': '/img/franchino-monthlys2.jpg'
    }
  ];
});

Franchino.controller('BlogCtrl', function($scope) {
  return $scope.articles = [
    {
      'date': 'Posted by Franchino on December 31, 2014',
      'heading': 'Gitflow?',
      'authorimg': '/img/frank.png',
      'img': '/img/dec/git-flow.jpg',
      'blob': 'Gosh darn-it, teams getting more synced with the help of new git methodologies for teams. <a href=\'https://www.atlassian.com/git/tutorials/comparing-workflows/centralized-workflow\'>I can\'t keep up</a> '
    }, {
      'date': 'Posted by Franchino on December 22, 2014',
      'heading': 'Oh shit, Angular 2.0',
      'authorimg': '/img/frank.png',
      'img': '/img/graph_spa.jpg',
      'blob': 'Pardon my scattered brain right now. So after watching the <a href=\'https://www.youtube.com/watch?v=gNmWybAyBHI\' target=\'_blank\'>Euro ng-conf video</a> where the creators of Angular 2.0 basically said, everything in changing, I did what most developers would do and completely freaked. I must say, I\'m still, thoroughly confused, even after speaking to a dozen or so key figures in the industry. My first reaction? Tweet out in anger. F-U Angular team I pronounced. F-U. Then, more panic as I continued to read some of the posts by others feeling the same way. I asked the Angular team, how they were helping the industry by telling us in a year anything we have developed in Angular would be garbage. I did what others seemed to be doing and immediately started looking for another framework to study and invest in. That\'s when I found <a href=\'http://www.indeed.com/jobtrends?q=ember.js%2C+angular.js%2C+react.js%2C+backbone.js&l=\' target=\'_blank\'>this graph</a> telling me the only other SPA framework that has as much activity as Angular is good old Backbone. <br /><br />Backbone, my first SPA love - we\'ve met before. Even recently. But I\'ve been lost. I\'ve been inlove with Egghead.io and things like Ionic, Sprangular and all sorts of things that give me stuff for free. But then I noticed something. The backbone community has been quietly doing it\'s thing for a minute now. Backbonerails.com? Are you kidding, what a resource. Marionette? Lovely. The list goes on. I now have dozens of reasons to give Backbone another look. And then, it happened. I emailed Max Lynch over at Ionic and said, I think you need to address the fright of Angular 2.0 some of us are experiencing. And then he shed some light. After a really awesome response, he said something at the end to the tune of. Angular 2 is all about making it easier and faster to use, and more appropriate for future browser standards like Web Components. Hmm... <br /><br />Web Components. You mean, this stuff I\'ve been hearing about, things like Polymer, and these new specs the browser already has begun to support, like Shadow Dom, custom elements and imports. So. Where the hell am I right now? For now, I think I\'ll take a break from stressing about SPA frameworks and look at <a href=\'https://www.polymer-project.org/\' target=\'_blank\'>Polymer</a>, <a href=\'http://webcomponents.org/\' target=\'_blank\'>Web Components</a>, E6 and study up on <a href=\'https://material.angularjs.org/#/\' target=\'_blank\'>Material Design</a> for a minute.'
    }, {
      'date': 'Posted by Franchino on December 12, 2014',
      'heading': 'My path to learning Swift',
      'authorimg': '/img/frank.png',
      'img': '/img/dec/newsletter-swiftris-header.gif',
      'blob': 'I\'ve been an MVC developer in every language except for iOS. This past October, I took my first real deep dive into iOS programming and started with Swift. There are two great tutorials out there. The first is from bloc.io and is free. It\'s a game, Swiftris, so get ready for some action. <br /><br /> The second will help you build something more appish, it\'s by Appcoda. Got their book and will be done with it this week. So far, books ok, but it moves really slow. I\'ll post a blog in a few days with links to the app was able to build.',
      'resource1': 'https://www.bloc.io/swiftris-build-your-first-ios-game-with-swift',
      'resource2': 'http://www.appcoda.com/swift/'
    }, {
      'date': 'Posted by Franchino on December 11, 2014',
      'heading': 'Why I get goose bumps when you talk about automated email marketing and segmentation and customer.io and things like that.',
      'authorimg': '/img/frank.png',
      'img': '/img/dec/prepemails.png',
      'blob': 'I get teary eyed when I talk about my work at BenchPrep.com. In short, I was the first employee and helped the company get to their series B near the end of year two. I got a lot done there, and one of the things I really enjoyed was building out technology to segment leads, bring different users down different communication paths and how I mapped out the entire system using complex diagrams and workflows. <br /><br />Some of the tools were built and based on ques like Redis or Resque, others we built into ExactTarget and Customer.io. In the end, I became somewhat of an expert at monetizing emails. Within our email marketing channel, we explored tagging users based on their actions, such as opens or non opens, or what they clicked on, we targed email users who had been touched seven times with special irrisitable sales, because we know after 6 touches, we could convert. These tricks we learned led to 25-30k days, and eventually, days where we sold 100k worth of subscriptions. <br /><br />So, my point? Don\'t be surprised if I geek out and faint when I hear you talk about transactional emailing and cadences and consumer journies and stuff like that.'
    }, {
      'date': 'Posted by Franchino on December 10, 2014',
      'heading': 'If I could have one wish; I get to use this method when designing your consumer journey funnel.',
      'authorimg': '/img/frank.png',
      'img': '/img/dec/ux_board.jpg',
      'blob': 'So after a bunch of ethnographic studies from persona matches I gather in-person, I get to fill a wall up with key things people said, felt, heard - motivators, barriers, questions, attitudes and such. I then group these post-it thoughts in various ways, looking for patterns, sentiment, new ideas. <br /><br />I then take this rich data and develop a what could be branding, a landing page or an email - with what I call, an inverted pyramid approach to content, where addressing the most important things found in the user research get addressed in a heriarchical order. I create 5-6 iterations of the landing page and re-run them through a second group of participants, stakeholders and friends. I then take even more notes on peoples speak-aloud reactions to the landing pages. After this, I\'m ready to design the final copy and pages for your funnel.'
    }, {
      'date': 'Posted by Franchino on December 9, 2014',
      'heading': 'Who says I don\'t belong here?',
      'authorimg': '/img/frank.png',
      'img': '/img/dec/ucla.jpg',
      'blob': 'This coming weekend there\'s probably a hackathon going on in your city. Some of them are getting really big. I wasn\'t registered for LA Hacks this summer. I don\'t even know how I ended up there on a Friday night, but when I saw what was going on, I grabbed a chair and started hacking away. Worried I had just snuck in the back door and started competing, my ride left and there I was, for the next two days. <br /><br />That\'s right. I snuck in the back of LA Hacks last summer at UCLA and hacked with kids 10 years younger than me. I couldn\'t miss it. I was floored when I saw how many people were in it. Me, being the mischevious hacker I am, I thought if I used the energy of the environment to my advantage, I could build something cool. Long story short, let me just say, that if you have been having a hard time launching, sign up for a hackathon. It\'s a guaranteed way to over-compensate for your constant failure to launch. More on what happened when I took the stage by surprise and got booted later...'
    }, {
      'date': 'Posted by Franchino on December 8, 2014',
      'heading': 'Started in Ember.js, finished in Angular.js. Why and how did this happen?',
      'authorimg': '/img/frank.png',
      'img': '/img/dec/ux1.jpg',
      'blob': 'I got love for all SPA frameworks. Collectively, they all push the envelope. My first client-side MVC project was a backbone project - and we started when they were in Beta. That project was BenchPrep. At the time, as a front-end developer, I was confused by the sweeping changes to how things needed to be done. Full fledged MVC frameworks in JavaScript lended a whole new syntax, and to top it off, our engineers on the team were using CoffeeScript, HAML, SASS and Jasmine, etc. My first SPA project did not go well and it wasn\'t until we completely re-wrote the software that I started understanding everything clearly. Two years later, a new team I was working with decided to build <a href=\'http://agentrun.com\' target=\'_blank\'>Agentrun.com</a> in Ember.js. We dove in. Four months later, we ported to Angular and since, I\'ve never looked back. I\'m on my fifth or sixth angular project now and I don\'t plan on changing frameworks for a while - at least personally. <br /><br />The angular movement reminds me the most of the RoR movement. I don\'t get stuck trying to do things like I do in Backbone or Ember. I could get into discussion and technical examples, but there are better places to compare the two. I can\'t wait for the completely revamped Angular 2.0 and am looking forward to a 5-7 year future with Angular before something new comes out, something that perhaps just builds apps for you by reading your mind. <br /><br />Oh, and if your wondering who designed this lovely website, that was yours truly. I led the UX research, UX prototyping, user research and graphic design of this product.'
    }, {
      'date': 'Posted by Franchino on December 7, 2014',
      'heading': 'Please don\'t ask me about my art and mixed media background. I might totally avoid the question.',
      'authorimg': '/img/frank.png',
      'img': '/img/dec/mixed.jpg',
      'blob': 'I have a huge complex about my hybrid background. I can\'t tell you how many times I\'ve been on an interview where I\'ve tried to explain the fact that I\'m an artist and a programmer. The minute I do this, I\'m almost instantly written off as a jack-of-all trades or weak on one side. <br /><br />So, I\'m about to officially explain to everyone something I\'m pretty sensative about. I\'m a very talented creative director with a very sophisticated technical background. I make explainer videos, I film, I do user research, I design and I program. Yes, I program - I will front-end with the best and have a knack for front-end MVC frameworks. <br /><br />Yes, there are some things I\'m not good at. I\'m not your genius programmer that will lead your other programmers to the promise land, but not weak like your thinking - I just know a lot of hackers who don\'t concern themselves with things that I get lost in, like design or content strategy, or user research. So when I say weak, I mean weak like, I\'m talking, possibly, faul-tolerant functional progamming in low level languages or Erlang or Elixer with superviser OTP architectures and message passing. I\'m taling middleware development. I\'m talking TDD dev all day every day on a hardcore scrum team. That\'s not me. I\'m not your lead here, however I will Jr. on understanding how every line of code works in your app. I\'m your prototyper, MVP guy or follow your lead guy when it comes to programming. I can make just about anything I want, but don\'t feel comfortable leading say, an iOS or Java team. I just don\'t have enough low-level programming experience in those particulare frameworks. When it comes to JavaScript, I\'m a 7. There isn\'t anything you can\'t ask me to do with JavaScript, from Famo.us to MVC stuff - however, I\'m not your guy who\'s going to introduce the next big open-source tool in JS. I\'m a macro JS developer - meaning I can take established patterns and components and concepts and run with them. I don\'t give talks on big-o notations and I might not be down for a 40 hour a week job of hardcore TDD programming - but this doesn\'t mean you should write me off as a generalist.<br /><br />The fact is that I\'ve never been the type for a role with an early stage startup where I didn\'t wear a bunch of hats or transition periodically from a design minded thinker to a technical scrum, requirement writing, produc managing anal-ist.'
    }
  ];
});

Franchino.controller('BlogRollCtrl', function($scope) {});

Franchino.controller('AboutCtrl', function($scope) {});

Franchino.controller('AppCtrl', function($scope) {});

Franchino.controller('ResumeCtrl', function($scope) {
  return $scope.blob = '<div class="row"><div class="large-12"><div class="row"><div class="large-12 columns"><h6>NOV 2013 - PRESENT</h6><br/><h2>Hybrid Experience Designer/Developer, Independent</h2><br/><p>Worked with noteable entreprenours on several new product and business launches. Held numerous roles, including content strategist, user researcher, designer and developer. </p><p><strong>Companies</strong></p><ul class="no"><li><a href="http://tapcentive.com" target="_blank">Tapcentive</a></li><li><a href="http://cpg.io" target="_blank">CPGio</a></li><li><a href="http://kou.pn/" target="_blank">Kou.pn Media</a></li><li> <a href="http://medycation.com" target="_blank">Medycation</a></li><li> <a href="http://www.suntimes.com/" target="_blank">Chicago Sun Times</a></li></ul><br/><p><strong>Tapcentive Deliverables</strong></p><ul class="bullets"><li>Complete Tapcentive.com marketing website and UX overhaul of core product, the "Tapcentive Manager"</li><li>Industrial design of the Tapcentive Touchpoint</li><li>Content strategy for corporate marketing site</li><li>Mobile first marketing website using Ionic and Angular</li></ul><p><strong>CPGio Deliverables</strong></p><ul class="bullets"><li>Product and business strategy, technical architecture and specification design</li><li>One hundred page proposal template on business model and corporate capabilities</li><li>Marketing website design and content strategy</li><li>Core product design and MVP functional prototype</li></ul><p><strong>Kou.pn Deliverables</strong></p><ul class="bullets"><li>Kou.pn Media brand refresh</li><li>Marketing site redesign</li><li>Portal user experience overhaul</li></ul><p><strong>Medycation Deliverables</strong></p><ul class="bullets"><li>Conceptual design and art direction</li><li>User research</li><li>Rapid prototypes</li></ul><p><strong>Chicago Sun Times</strong></p><ul class="bullets"><li>Conceptual design and art direction</li><li>Native iOS and Android app design and junior development</li><li>Hybrid Ionic/Angular development</li></ul></div></div><br/><div class="row"><div class="large-12 columns"><h6>MARCH 2010 - OCTOBER 2013</h6><br/><h2>Director of User Experience, Lightbank</h2><br/><p>Launched and supported multiple new companies within the Lightbank portfolio. </p><p><strong>Companies</strong></p><ul class="no"><li> <a href="http://chicagoideas.com" target="_blank">ChicagoIdeas.com</a></li><li> <a href="http://benchprep.com" target="_blank">BenchPrep.com</a></li><li> <a href="http://snapsheetapp.com" target="_blank">SnapSheetApp.com</a></li><li>Monthlys.com (defunct)</li><li> <a href="http://dough.com" target="_blank">Dough.com</a></li><li> <a href="http://groupon.com" target="_blank">Groupon.com</a></li></ul><br/><p><strong>Chicago Ideas Deliverables</strong></p><ul class="bullets"><li>Website design refresh, art direction</li><li>Custom ticket purchasing platform UX research &amp; design</li><li>Ruby on Rails development, maintenence</li><li>Graphic design support</li><li>Annual report design</li></ul><p><strong>BenchPrep.com Deliverables</strong></p><ul class="bullets"><li>Re-branding, complete BenchPrep identity package</li><li>Supported company with all design and ux from zero to eight million in financing</li><li>Lead art and UX direction for two years</li><li>Front-end using Backbone and Bootstrap</li><li>User research, ethnographic studies, user testing</li><li>Email marketing cadence system design and execution</li><li>Scripted, storyboarded and executed both animated and live motion explainer videos</li></ul><p><strong>SnapSheetApp.com Deliverables</strong></p><ul class="bullets"><li>Large scale portal UX research and information architecture</li><li>Three rounds of rapid prototyping and user testing</li><li>Graphic design and interaction design framework</li><li>User testing</li></ul><p><strong>Monthlys.com Deliverables</strong></p><ul class="bullets"><li>Identity and art direction</li><li>Product strategy and new company launch</li><li>Online marketing strategy, including transactional email, promotion design and lead generation</li><li>Product experience design and front-end</li><li>Content strategy</li><li>Scripted, storyboarded and executed both animated and live motion explainer videos</li></ul><p><strong>Dough.com Deliverables</strong></p><ul class="bullets bullets"><li>Consumer journey mapping and ethnographic studies</li><li>Rapid prototyping, conceptual design</li><li>Messaging strategy, user testing</li></ul><p><strong>Groupon.com Deliverables</strong></p><ul class="bullets"><li>Emerging markets research</li><li>Rapid design and prototyping</li><li>Visual design on new concepts</li><li>Email segmentation research</li></ul></div></div><br/><div class="row"><div class="large-12 columns"><h6>NOVEMBER 2007 - APRIL 2010</h6><br/><h2>Developer &amp; Co-founder, Dillyeo.com</h2><br/><p>Co-founded, designed and developed a daily deal eCommerce website.</p><p><strong>Role</strong><br/>Designed, developed and launched companies first cart with PHP. Iterated and grew site to more than two hundred and fifty thousand subscribers in less than one year. </p><p><strong>Noteable Stats</strong></p><ul class="bullets"><li>Built a list of 250,000 subscribers in the first year</li><li>Pivoted and tweaked design, business and approach to 1000 transactions per daily</li><li>Sold business in December 2009 to Innovative Commerce Solutions</li></ul></div></div><br/><div class="row"><div class="large-12 columns"><h6>MARCH 2005 - OCTOBER 2007</h6><br/><h2>Solutions Architect &amp; Senior Developer, <a href="http://www.manifestdigital.com/">Manifest Digital</a></h2><br/><p>Built and managed multiple CareerBuilder.com niche sites for the largest independent agency in the midwest.</p><p><strong>Role</strong><br/>Research and explore emerging technologies, implement solutions and manage other developers. Worked with asp.net on a daily basis for almost two years. </p><p><strong>Noteable Accomplishments</strong></p><ul class="bullets"><li>Recognized for launching high quality web app for Career Builder in record time</li><li>Managed extreme SEO project with more than 500 thousand links, pages and over 8 million UGC artifacts</li><li>Shifted agencies development practices to various new client-centric AJAX methodologies</li><li>Managed multiple projects concurrently, including choosechicago.com and briefing.com</li></ul></div></div><br/><div class="row"><div class="large-12 columns"><h6>APRIL 2004 - JANUARY 2007</h6><br/><h2>Junior PLD Developer,  <a href="http://www.avenue-inc.com/">Avenue</a></h2><br/><p>Front-end developer and UX design intern for Avenue A Razorfishs\' legacy company, Avenue-inc.</p><p><strong>Role</strong><br/>Develop front-end for multiple client websites, including flor.com, achievement.org, canyonranch.com and turbochef.</p><p><strong>Noteable Accomplishments</strong></p><ul class="bullets"><li>Executed front-end projects on-time and under-budget</li><li>Assigned UX internship role, recognized by design team as a young talent</li><li>Wireframed custom shopping cart platform for flor.com</li><li>Developed internal SEO practice</li></ul></div></div><br/><div class="row"><div class="large-12 columns"><h6>JULY 2000 - JANUARY 2004</h6><br/><h2>eCommerce Developer, Atova</h2><br/><p>General web designer and developer for family owned paint distribution business. </p><p><strong>Role</strong><br/>Built several shopping carts in classic ASP and PHP. Grew business using online marketing strategies to two million in revenue. </p><p><strong>Noteable Accomplishments</strong></p><ul class="bullets"><li>Became first company to ship paints and coatings across the United States</li><li>First employee, developed company to 2+ million in revenue with Overture, Google Adwords and SEO</li><li>Created, marketed and subscribed vocational school for specialty coatings</li><li>Worked with top Italian paint manufacturers overseas to build exclusive distribution rights</li></ul></div></div><br/><div class="row"><div class="large-12 columns"><h6>SEPTEMBER 2000 - MAY 2002</h6><br/><h2>Education</h2><br/><p>Self educated designer/programmer with vocational training. </p><p><strong>Certifications</strong><br/>iNET+, A+ Certification </p><p><strong>Apprenticeship</strong><br/>Year long personal apprenticeship with first engineer at Amazon.com</p></div></div></div></div><br/><br/>';
});

Franchino.controller('JobTapcentiveCtrl', function($scope) {});

Franchino.controller('JobTapcentiveTwoCtrl', function($scope) {});

Franchino.controller('JobCpgioCtrl', function($scope) {});

Franchino.controller('JobMedycationCtrl', function($scope) {});

Franchino.controller('JobCstCtrl', function($scope) {});

Franchino.controller('LandingCtrl', [
  '$scope', function($scope) {
    return (function() {
      var bodyEl, closebtn, content, init, initEvents, isOpen, openbtn, toggleMenu;
      bodyEl = void 0;
      closebtn = void 0;
      content = void 0;
      init = void 0;
      initEvents = void 0;
      isOpen = void 0;
      openbtn = void 0;
      toggleMenu = void 0;
      bodyEl = document.body;
      content = document.querySelector('.content-wrap');
      openbtn = document.getElementById('open-button');
      closebtn = document.getElementById('close-button');
      isOpen = false;
      init = function() {
        initEvents();
      };
      initEvents = function() {
        var $, cssId, head, link;
        $ = void 0;
        cssId = void 0;
        head = void 0;
        link = void 0;
        if (device.desktop()) {

        } else if (device.mobile()) {
          $ = document;
          cssId = 'myCss';
          if (!$.getElementById(cssId)) {
            head = $.getElementsByTagName('head')[0];
            link = $.createElement('link');
            link.id = cssId;
            link.rel = 'stylesheet';
            link.type = 'text/css';
            link.href = 'https://code.ionicframework.com/1.0.0-beta.13/css/ionic.min.css';
            link.media = 'all';
            head.appendChild(link);
          }
        }
        if (device.desktop()) {
          openbtn.addEventListener('click', toggleMenu);
          if (closebtn) {
            closebtn.addEventListener('click', toggleMenu);
          }
          content.addEventListener('click', function(ev) {
            var target;
            target = void 0;
            target = ev.target;
            if (isOpen && target !== openbtn) {
              toggleMenu();
            }
          });
        } else {

        }
      };
      toggleMenu = function() {
        if (isOpen) {
          classie.remove(bodyEl, 'show-menu');
        } else {
          classie.add(bodyEl, 'show-menu');
        }
        isOpen = !isOpen;
      };
      init();
    })();
  }
]);

Franchino.controller('ProductsCtrl', [
  '$scope', function($scope) {
    return (function() {
      var bodyEl, closebtn, content, init, initEvents, isOpen, openbtn, toggleMenu;
      bodyEl = void 0;
      closebtn = void 0;
      content = void 0;
      init = void 0;
      initEvents = void 0;
      isOpen = void 0;
      openbtn = void 0;
      toggleMenu = void 0;
      bodyEl = document.body;
      content = document.querySelector('.content-wrap');
      openbtn = document.getElementById('open-button');
      closebtn = document.getElementById('close-button');
      isOpen = false;
      init = function() {
        initEvents();
      };
      initEvents = function() {
        var $, cssId, head, link;
        $ = void 0;
        cssId = void 0;
        head = void 0;
        link = void 0;
        if (device.desktop()) {

        } else if (device.mobile()) {
          $ = document;
          cssId = 'myCss';
          if (!$.getElementById(cssId)) {
            head = $.getElementsByTagName('head')[0];
            link = $.createElement('link');
            link.id = cssId;
            link.rel = 'stylesheet';
            link.type = 'text/css';
            link.href = 'https://code.ionicframework.com/1.0.0-beta.13/css/ionic.min.css';
            link.media = 'all';
            head.appendChild(link);
          }
        }
        if (device.desktop()) {
          openbtn.addEventListener('click', toggleMenu);
          if (closebtn) {
            closebtn.addEventListener('click', toggleMenu);
          }
          content.addEventListener('click', function(ev) {
            var target;
            target = void 0;
            target = ev.target;
            if (isOpen && target !== openbtn) {
              toggleMenu();
            }
          });
        } else {

        }
      };
      toggleMenu = function() {
        if (isOpen) {
          classie.remove(bodyEl, 'show-menu');
        } else {
          classie.add(bodyEl, 'show-menu');
        }
        isOpen = !isOpen;
      };
      init();
    })();
  }
]);

Franchino.controller('ExpansionpacksCtrl', [
  '$scope', function($scope) {
    var onPlayerStateChange;
    onPlayerStateChange = function(event) {
      if (event.data === YT.PlayerState.ENDED) {
        return $(".start-video").fadeIn("normal");
      }
    };
    return (function() {
      var bodyEl, closebtn, content, init, initEvents, isOpen, openbtn, toggleMenu;
      bodyEl = void 0;
      closebtn = void 0;
      content = void 0;
      init = void 0;
      initEvents = void 0;
      isOpen = void 0;
      openbtn = void 0;
      toggleMenu = void 0;
      bodyEl = document.body;
      content = document.querySelector('.content-wrap');
      openbtn = document.getElementById('open-button');
      closebtn = document.getElementById('close-button');
      isOpen = false;
      init = function() {
        initEvents();
      };
      initEvents = function() {
        var $, cssId, head, link;
        $ = void 0;
        cssId = void 0;
        head = void 0;
        link = void 0;
        if (device.desktop()) {

        } else if (device.mobile()) {
          $ = document;
          cssId = 'myCss';
          if (!$.getElementById(cssId)) {
            head = $.getElementsByTagName('head')[0];
            link = $.createElement('link');
            link.id = cssId;
            link.rel = 'stylesheet';
            link.type = 'text/css';
            link.href = 'https://code.ionicframework.com/1.0.0-beta.13/css/ionic.min.css';
            link.media = 'all';
            head.appendChild(link);
          }
        }
        if (device.desktop()) {
          openbtn.addEventListener('click', toggleMenu);
          if (closebtn) {
            closebtn.addEventListener('click', toggleMenu);
          }
          content.addEventListener('click', function(ev) {
            var target;
            target = void 0;
            target = ev.target;
            if (isOpen && target !== openbtn) {
              toggleMenu();
            }
          });
        } else {

        }
      };
      toggleMenu = function() {
        if (isOpen) {
          classie.remove(bodyEl, 'show-menu');
        } else {
          classie.add(bodyEl, 'show-menu');
        }
        isOpen = !isOpen;
      };
      init();
    })();
  }
]);

Franchino.controller('JobKoupnCtrl', function($scope) {});

Franchino.controller('LandingCtrl', [
  '$scope', function($scope) {
    return (function() {
      var bodyEl, closebtn, content, init, initEvents, isOpen, openbtn, toggleMenu;
      bodyEl = void 0;
      closebtn = void 0;
      content = void 0;
      init = void 0;
      initEvents = void 0;
      isOpen = void 0;
      openbtn = void 0;
      toggleMenu = void 0;
      bodyEl = document.body;
      content = document.querySelector('.content-wrap');
      openbtn = document.getElementById('open-button');
      closebtn = document.getElementById('close-button');
      isOpen = false;
      init = function() {
        initEvents();
      };
      initEvents = function() {
        var $, cssId, head, link;
        $ = void 0;
        cssId = void 0;
        head = void 0;
        link = void 0;
        if (device.desktop()) {

        } else if (device.mobile()) {
          $ = document;
          cssId = 'myCss';
          if (!$.getElementById(cssId)) {
            head = $.getElementsByTagName('head')[0];
            link = $.createElement('link');
            link.id = cssId;
            link.rel = 'stylesheet';
            link.type = 'text/css';
            link.href = 'https://code.ionicframework.com/1.0.0-beta.13/css/ionic.min.css';
            link.media = 'all';
            head.appendChild(link);
          }
        }
        if (device.desktop()) {
          openbtn.addEventListener('click', toggleMenu);
          if (closebtn) {
            closebtn.addEventListener('click', toggleMenu);
          }
          content.addEventListener('click', function(ev) {
            var target;
            target = void 0;
            target = ev.target;
            if (isOpen && target !== openbtn) {
              toggleMenu();
            }
          });
        } else {

        }
      };
      toggleMenu = function() {
        if (isOpen) {
          classie.remove(bodyEl, 'show-menu');
        } else {
          classie.add(bodyEl, 'show-menu');
        }
        isOpen = !isOpen;
      };
      init();
    })();
  }
]);

Franchino.controller('BookCtrl', [
  '$scope', function($scope) {
    var onPlayerStateChange;
    onPlayerStateChange = function(event) {
      if (event.data === YT.PlayerState.ENDED) {
        return $(".start-video").fadeIn("normal");
      }
    };
    return (function() {
      var bodyEl, closebtn, content, init, initEvents, isOpen, openbtn, toggleMenu;
      bodyEl = void 0;
      closebtn = void 0;
      content = void 0;
      init = void 0;
      initEvents = void 0;
      isOpen = void 0;
      openbtn = void 0;
      toggleMenu = void 0;
      bodyEl = document.body;
      content = document.querySelector('.content-wrap');
      openbtn = document.getElementById('open-button');
      closebtn = document.getElementById('close-button');
      isOpen = false;
      init = function() {
        initEvents();
      };
      initEvents = function() {
        var $, cssId, head, link;
        $ = void 0;
        cssId = void 0;
        head = void 0;
        link = void 0;
        if (device.desktop()) {

        } else if (device.mobile()) {
          $ = document;
          cssId = 'myCss';
          if (!$.getElementById(cssId)) {
            head = $.getElementsByTagName('head')[0];
            link = $.createElement('link');
            link.id = cssId;
            link.rel = 'stylesheet';
            link.type = 'text/css';
            link.href = 'https://code.ionicframework.com/1.0.0-beta.13/css/ionic.min.css';
            link.media = 'all';
            head.appendChild(link);
          }
        }
        if (device.desktop()) {
          openbtn.addEventListener('click', toggleMenu);
          if (closebtn) {
            closebtn.addEventListener('click', toggleMenu);
          }
          content.addEventListener('click', function(ev) {
            var target;
            target = void 0;
            target = ev.target;
            if (isOpen && target !== openbtn) {
              toggleMenu();
            }
          });
        } else {

        }
      };
      toggleMenu = function() {
        if (isOpen) {
          classie.remove(bodyEl, 'show-menu');
        } else {
          classie.add(bodyEl, 'show-menu');
        }
        isOpen = !isOpen;
      };
      init();
    })();
  }
]);

Franchino.controller('CastCtrl', [
  '$scope', function($scope) {
    var onPlayerStateChange;
    onPlayerStateChange = function(event) {
      if (event.data === YT.PlayerState.ENDED) {
        return $(".start-video").fadeIn("normal");
      }
    };
    return (function() {
      var bodyEl, closebtn, content, init, initEvents, isOpen, openbtn, toggleMenu;
      bodyEl = void 0;
      closebtn = void 0;
      content = void 0;
      init = void 0;
      initEvents = void 0;
      isOpen = void 0;
      openbtn = void 0;
      toggleMenu = void 0;
      bodyEl = document.body;
      content = document.querySelector('.content-wrap');
      openbtn = document.getElementById('open-button');
      closebtn = document.getElementById('close-button');
      isOpen = false;
      init = function() {
        initEvents();
      };
      initEvents = function() {
        var $, cssId, head, link;
        $ = void 0;
        cssId = void 0;
        head = void 0;
        link = void 0;
        if (device.desktop()) {

        } else if (device.mobile()) {
          $ = document;
          cssId = 'myCss';
          if (!$.getElementById(cssId)) {
            head = $.getElementsByTagName('head')[0];
            link = $.createElement('link');
            link.id = cssId;
            link.rel = 'stylesheet';
            link.type = 'text/css';
            link.href = 'https://code.ionicframework.com/1.0.0-beta.13/css/ionic.min.css';
            link.media = 'all';
            head.appendChild(link);
          }
        }
        if (device.desktop()) {
          openbtn.addEventListener('click', toggleMenu);
          if (closebtn) {
            closebtn.addEventListener('click', toggleMenu);
          }
          content.addEventListener('click', function(ev) {
            var target;
            target = void 0;
            target = ev.target;
            if (isOpen && target !== openbtn) {
              toggleMenu();
            }
          });
        } else {

        }
      };
      toggleMenu = function() {
        if (isOpen) {
          classie.remove(bodyEl, 'show-menu');
        } else {
          classie.add(bodyEl, 'show-menu');
        }
        isOpen = !isOpen;
      };
      init();
    })();
  }
]);

Franchino.controller('NodeCtrl', [
  '$scope', function($scope) {
    var onPlayerStateChange;
    onPlayerStateChange = function(event) {
      if (event.data === YT.PlayerState.ENDED) {
        return $(".start-video").fadeIn("normal");
      }
    };
    return (function() {
      var bodyEl, closebtn, content, init, initEvents, isOpen, openbtn, toggleMenu;
      bodyEl = void 0;
      closebtn = void 0;
      content = void 0;
      init = void 0;
      initEvents = void 0;
      isOpen = void 0;
      openbtn = void 0;
      toggleMenu = void 0;
      bodyEl = document.body;
      content = document.querySelector('.content-wrap');
      openbtn = document.getElementById('open-button');
      closebtn = document.getElementById('close-button');
      isOpen = false;
      init = function() {
        initEvents();
      };
      initEvents = function() {
        var $, cssId, head, link;
        $ = void 0;
        cssId = void 0;
        head = void 0;
        link = void 0;
        if (device.desktop()) {

        } else if (device.mobile()) {
          $ = document;
          cssId = 'myCss';
          if (!$.getElementById(cssId)) {
            head = $.getElementsByTagName('head')[0];
            link = $.createElement('link');
            link.id = cssId;
            link.rel = 'stylesheet';
            link.type = 'text/css';
            link.href = 'https://code.ionicframework.com/1.0.0-beta.13/css/ionic.min.css';
            link.media = 'all';
            head.appendChild(link);
          }
        }
        if (device.desktop()) {
          openbtn.addEventListener('click', toggleMenu);
          if (closebtn) {
            closebtn.addEventListener('click', toggleMenu);
          }
          content.addEventListener('click', function(ev) {
            var target;
            target = void 0;
            target = ev.target;
            if (isOpen && target !== openbtn) {
              toggleMenu();
            }
          });
        } else {

        }
      };
      toggleMenu = function() {
        if (isOpen) {
          classie.remove(bodyEl, 'show-menu');
        } else {
          classie.add(bodyEl, 'show-menu');
        }
        isOpen = !isOpen;
      };
      init();
    })();
  }
]);

Franchino.controller('EducatorsCtrl', [
  '$scope', function($scope) {
    return (function() {
      var bodyEl, closebtn, content, init, initEvents, isOpen, openbtn, toggleMenu;
      bodyEl = void 0;
      closebtn = void 0;
      content = void 0;
      init = void 0;
      initEvents = void 0;
      isOpen = void 0;
      openbtn = void 0;
      toggleMenu = void 0;
      bodyEl = document.body;
      content = document.querySelector('.content-wrap');
      openbtn = document.getElementById('open-button');
      closebtn = document.getElementById('close-button');
      isOpen = false;
      init = function() {
        initEvents();
      };
      initEvents = function() {
        var $, cssId, head, link;
        $ = void 0;
        cssId = void 0;
        head = void 0;
        link = void 0;
        if (device.desktop()) {

        } else if (device.mobile()) {
          $ = document;
          cssId = 'myCss';
          if (!$.getElementById(cssId)) {
            head = $.getElementsByTagName('head')[0];
            link = $.createElement('link');
            link.id = cssId;
            link.rel = 'stylesheet';
            link.type = 'text/css';
            link.href = 'https://code.ionicframework.com/1.0.0-beta.13/css/ionic.min.css';
            link.media = 'all';
            head.appendChild(link);
          }
        }
        if (device.desktop()) {
          openbtn.addEventListener('click', toggleMenu);
          if (closebtn) {
            closebtn.addEventListener('click', toggleMenu);
          }
          content.addEventListener('click', function(ev) {
            var target;
            target = void 0;
            target = ev.target;
            if (isOpen && target !== openbtn) {
              toggleMenu();
            }
          });
        } else {

        }
      };
      toggleMenu = function() {
        if (isOpen) {
          classie.remove(bodyEl, 'show-menu');
        } else {
          classie.add(bodyEl, 'show-menu');
        }
        isOpen = !isOpen;
      };
      init();
    })();
  }
]);

Franchino.controller('HomeCtrl', [
  '$scope', function($scope) {
    return (function() {
      var bodyEl, closebtn, content, init, initEvents, isOpen, openbtn, toggleMenu;
      bodyEl = void 0;
      closebtn = void 0;
      content = void 0;
      init = void 0;
      initEvents = void 0;
      isOpen = void 0;
      openbtn = void 0;
      toggleMenu = void 0;
      bodyEl = document.body;
      content = document.querySelector('.content-wrap');
      openbtn = document.getElementById('open-button');
      closebtn = document.getElementById('close-button');
      isOpen = false;
      init = function() {
        initEvents();
      };
      initEvents = function() {
        var $, cssId, head, link;
        $ = void 0;
        cssId = void 0;
        head = void 0;
        link = void 0;
        if (device.desktop()) {

        } else if (device.mobile()) {
          $ = document;
          cssId = 'myCss';
          if (!$.getElementById(cssId)) {
            head = $.getElementsByTagName('head')[0];
            link = $.createElement('link');
            link.id = cssId;
            link.rel = 'stylesheet';
            link.type = 'text/css';
            link.href = 'https://code.ionicframework.com/1.0.0-beta.13/css/ionic.min.css';
            link.media = 'all';
            head.appendChild(link);
          }
        }
        if (device.desktop()) {
          openbtn.addEventListener('click', toggleMenu);
          if (closebtn) {
            closebtn.addEventListener('click', toggleMenu);
          }
          content.addEventListener('click', function(ev) {
            var target;
            target = void 0;
            target = ev.target;
            if (isOpen && target !== openbtn) {
              toggleMenu();
            }
          });
        } else {

        }
      };
      toggleMenu = function() {
        if (isOpen) {
          classie.remove(bodyEl, 'show-menu');
        } else {
          classie.add(bodyEl, 'show-menu');
        }
        isOpen = !isOpen;
      };
      init();
    })();
  }
]);

Franchino.controller('JobMedycationCtrl', function($scope) {});

Franchino.controller('JobMedycationCtrl', function($scope) {});

Franchino.controller('JobTroundCtrl', function($scope) {});

Franchino.controller('JobMonthlysOneCtrl', function($scope) {});

Franchino.controller('JobMonthlysTwoCtrl', function($scope) {});

Franchino.controller('JobBenchprepCtrl', function($scope) {});

Franchino.controller('ContactCtrl', function($scope) {});

Franchino.controller('DevelopersCtrl', function($scope) {});

Franchino.controller('DeveloperCenterCtrl', function($scope) {});

Franchino.controller('DocsCtrl', function($scope, Docs) {
  return $scope.$watch((function() {
    return Docs.list;
  }), function() {
    return $scope.docs = Docs.list;
  });
});

Franchino.controller('DocCtrl', function($scope, $sce, $stateParams, $timeout, Docs) {
  $scope.index = $stateParams.step ? $stateParams.step - 1 : 0;
  $scope.$watch((function() {
    return Docs.list;
  }), function() {
    $scope.doc = Docs.find($stateParams.permalink);
    if ($scope.doc) {
      $scope.step = $scope.doc.steps[$scope.index];
      $scope.step.url = $sce.trustAsResourceUrl($scope.step.url);
      if ($scope.step.type === 'dialog') {
        $scope.messageIndex = 0;
        $scope.messages = [];
        return $timeout($scope.nextMessage, 1000);
      }
    }
  });
  return $scope.hasMoreSteps = function() {
    if ($scope.step) {
      return $scope.step.index < $scope.doc.steps.length;
    }
  };
});

Franchino.directive('mySlideshow', function() {
  return {
    restrict: 'AC',
    link: function(scope, element, attrs) {
      var config;
      config = void 0;
      config = angular.extend({
        slides: '.slide'
      }, scope.$eval(attrs.mySlideshow));
      return setTimeout((function() {
        return $(element).cycle(function() {
          return {
            fx: 'fade',
            speed: 'fast',
            next: '#next2',
            prev: '#prev2',
            caption: '#alt-caption',
            caption_template: '{{images.alt}}',
            pause_on_hover: 'true'
          };
        });
      }), 0);
    }
  };
});

angular.module('tap.controllers', []);

angular.module('tap.directives', []).directive('device', function() {
  return {
    restrict: 'A',
    link: function() {
      return device.init();
    }
  };
}).service('copy', function($sce) {
  var copy, trustValues;
  copy = void 0;
  trustValues = void 0;
  copy = {
    about: {
      heading: 'We\'re <strong>tapping</strong> into the future',
      sub_heading: 'Tapcentive was created by a team that has lived the mobile commerce revolution from the earliest days of mCommerce with WAP, to leading the charge in mobile payments and services with NFC worldwide.',
      copy: '<p>For us, mobile commerce has always been about much more than payment:  marketing, promotions, product content, and loyalty, all come to life inside a mobile phone. Mobile commerce really gets interesting when it bridges the digital and physical worlds.</p><p>Our goal at Tapcentive is to create a state-of-the-art mobile engagement platform that enables marketers and developers to create entirely new customer experiences in physical locations – all with a minimum amount of technology development.</p><p>We think you’ll like what we’ve built so far. And just as mobile technology is constantly evolving, so is the Tapcentive platform. Give it a test drive today.</p>'
    },
    team: {
      heading: '',
      bios: {
        dave_role: '',
        dave_copy: ''
      }
    }
  };
  trustValues = function(values) {
    return _.each(values, function(val, key) {
      switch (typeof val) {
        case 'string':
          return $sce.trustAsHtml(val);
        case 'object':
          return trustValues(val);
      }
    });
  };
  trustValues(copy);
  return copy;
});

angular.module("tap.controllers", []);

angular.module("tap.directives", []).directive("device", function() {
  return {
    restrict: "A",
    link: function() {
      return device.init();
    }
  };
}).service('copy', function($sce) {
  var copy, trustValues;
  copy = {
    about: {
      heading: "We're <strong>tapping</strong> into the future",
      sub_heading: "Tapcentive was created by a team that has lived the mobile commerce revolution from the earliest days of mCommerce with WAP, to leading the charge in mobile payments and services with NFC worldwide.",
      copy: "<p>For us, mobile commerce has always been about much more than payment:  marketing, promotions, product content, and loyalty, all come to life inside a mobile phone. Mobile commerce really gets interesting when it bridges the digital and physical worlds.</p><p>Our goal at Tapcentive is to create a state-of-the-art mobile engagement platform that enables marketers and developers to create entirely new customer experiences in physical locations – all with a minimum amount of technology development.</p><p>We think you’ll like what we’ve built so far. And just as mobile technology is constantly evolving, so is the Tapcentive platform. Give it a test drive today.</p>"
    },
    team: {
      heading: "",
      bios: {
        dave_role: "",
        dave_copy: ""
      }
    }
  };
  trustValues = function(values) {
    return _.each(values, function(val, key) {
      switch (typeof val) {
        case 'string':
          return $sce.trustAsHtml(val);
        case 'object':
          return trustValues(val);
      }
    });
  };
  trustValues(copy);
  return copy;
});

var $, cssId, head, link;

if (device.desktop()) {

} else if (device.mobile()) {
  $ = document;
  cssId = 'myCss';
  if (!$.getElementById(cssId)) {
    head = $.getElementsByTagName('head')[0];
    link = $.createElement('link');
    link.id = cssId;
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = 'https://code.ionicframework.com/1.0.0-beta.13/css/ionic.min.css';
    link.media = 'all';
    head.appendChild(link);
  }
}



//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5jb2ZmZWUiLCJjb250cm9sbGVycy5jb2ZmZWUiLCJkaXJlY3RpdmVzLmNvZmZlZSIsImluaXQuY29mZmVlIiwicm91dGVzLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFHLE1BQU0sQ0FBQyxPQUFQLENBQUEsQ0FBSDtBQUNFLEVBQUEsTUFBTSxDQUFDLFNBQVAsR0FBbUIsT0FBTyxDQUFDLE1BQVIsQ0FBZSxXQUFmLEVBQTRCLENBQzdDLFlBRDZDLEVBRTdDLFdBRjZDLEVBRzdDLGtCQUg2QyxFQUk3QyxpQkFKNkMsRUFLN0MsZ0JBTDZDLENBQTVCLENBQW5CLENBREY7Q0FBQSxNQUFBO0FBU0UsRUFBQSxNQUFNLENBQUMsU0FBUCxHQUFtQixPQUFPLENBQUMsTUFBUixDQUFlLFdBQWYsRUFBNEIsQ0FDN0MsT0FENkMsRUFFN0Msa0JBRjZDLEVBRzdDLGlCQUg2QyxFQUk3QyxnQkFKNkMsQ0FBNUIsQ0FLakIsQ0FBQyxHQUxnQixDQUtaLFNBQUMsY0FBRCxHQUFBO1dBQ0wsY0FBYyxDQUFDLEtBQWYsQ0FBcUIsU0FBQSxHQUFBO0FBQ25CLE1BQUEsSUFBRyxNQUFNLENBQUMsU0FBVjtBQUNFLGVBQU8sU0FBUyxDQUFDLFlBQVYsQ0FBQSxDQUFQLENBREY7T0FEbUI7SUFBQSxDQUFyQixFQURLO0VBQUEsQ0FMWSxDQUFuQixDQVRGO0NBQUE7O0FBQUEsU0FxQlMsQ0FBQyxNQUFWLENBQWlCLFNBQUMsY0FBRCxFQUFpQixrQkFBakIsRUFBcUMsaUJBQXJDLEVBQXdELGFBQXhELEdBQUE7QUFDZixFQUFBLGNBQWMsQ0FBQyxLQUFmLENBQXFCLEtBQXJCLEVBQ0U7QUFBQSxJQUFBLEdBQUEsRUFBSyxFQUFMO0FBQUEsSUFDQSxRQUFBLEVBQVUsSUFEVjtBQUFBLElBRUEsVUFBQSxFQUFZLFNBRlo7QUFBQSxJQUdBLFdBQUEsRUFBYSxXQUhiO0dBREYsQ0FJMkIsQ0FBQyxLQUo1QixDQUlrQyxVQUpsQyxFQUtFO0FBQUEsSUFB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QUFMLEdBQVksWUFIWixDQUFBO0FBQUEsSUFJQSxJQUFJLENBQUMsSUFBTCxHQUFZLFVBSlosQ0FBQTtBQUFBLElBS0EsSUFBSSxDQUFDLElBQUwsR0FBWSxpRUFMWixDQUFBO0FBQUEsSUFNQSxJQUFJLENBQUMsS0FBTCxHQUFhLEtBTmIsQ0FBQTtBQUFBLElBT0EsSUFBSSxDQUFDLFdBQUwsQ0FBaUIsSUFBakIsQ0FQQSxDQURKO0dBSkk7Q0FGTDs7QUNjMkIiLCJmaWxlIjoiYXBwbGljYXRpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpZiBkZXZpY2UuZGVza3RvcCgpXG4gIHdpbmRvdy5GcmFuY2hpbm8gPSBhbmd1bGFyLm1vZHVsZSgnRnJhbmNoaW5vJywgW1xuICAgICduZ1Nhbml0aXplJ1xuICAgICd1aS5yb3V0ZXInXG4gICAgJ2J0Zm9yZC5zb2NrZXQtaW8nXG4gICAgJ3RhcC5jb250cm9sbGVycydcbiAgICAndGFwLmRpcmVjdGl2ZXMnXG4gIF0pXG5lbHNlXG4gIHdpbmRvdy5GcmFuY2hpbm8gPSBhbmd1bGFyLm1vZHVsZSgnRnJhbmNoaW5vJywgW1xuICAgICdpb25pYydcbiAgICAnYnRmb3JkLnNvY2tldC1pbydcbiAgICAndGFwLmNvbnRyb2xsZXJzJ1xuICAgICd0YXAuZGlyZWN0aXZlcydcbiAgXSkucnVuKCgkaW9uaWNQbGF0Zm9ybSkgLT5cbiAgICAkaW9uaWNQbGF0Zm9ybS5yZWFkeSAtPlxuICAgICAgaWYgd2luZG93LlN0YXR1c0JhclxuICAgICAgICByZXR1cm4gU3RhdHVzQmFyLnN0eWxlRGVmYXVsdCgpXG4gICAgICByZXR1cm5cbiAgKVxuXG5GcmFuY2hpbm8uY29uZmlnICgkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyLCAkbG9jYXRpb25Qcm92aWRlciwgJGh0dHBQcm92aWRlcikgLT5cbiAgJHN0YXRlUHJvdmlkZXIuc3RhdGUoJ2FwcCcsXG4gICAgdXJsOiAnJ1xuICAgIGFic3RyYWN0OiB0cnVlXG4gICAgY29udHJvbGxlcjogJ0FwcEN0cmwnXG4gICAgdGVtcGxhdGVVcmw6ICdtZW51Lmh0bWwnKS5zdGF0ZSgnYXBwLmhvbWUnLFxuICAgIHVybDogJy8nXG4gICAgdmlld3M6IG1lbnVDb250ZW50OlxuICAgICAgY29udHJvbGxlcjogJ0hvbWVDdHJsJ1xuICAgICAgdGVtcGxhdGVVcmw6ICdob21lLmh0bWwnKS5zdGF0ZSgnYmxvZycsXG4gICAgdXJsOiAnL2Jsb2dyb2xsJ1xuICAgIGNvbnRyb2xsZXI6ICdCbG9nUm9sbEN0cmwnXG4gICAgdGVtcGxhdGVVcmw6ICcnKS5zdGF0ZSgnYXBwLmRvY3MnLFxuICAgIHVybDogJy9kb2NzJ1xuICAgIHZpZXdzOiBtZW51Q29udGVudDpcbiAgICAgIGNvbnRyb2xsZXI6ICdEb2NzQ3RybCdcbiAgICAgIHRlbXBsYXRlVXJsOiAnZG9jcy9pbmRleC5odG1sJykuc3RhdGUoJ2FwcC5hYm91dCcsXG4gICAgdXJsOiAnL2xhbmRpbmcnXG4gICAgdmlld3M6IG1lbnVDb250ZW50OlxuICAgICAgY29udHJvbGxlcjogJ0xhbmRpbmdDdHJsJ1xuICAgICAgdGVtcGxhdGVVcmw6ICdsYW5kaW5nLmh0bWwnKS5zdGF0ZSgnYXBwLmxhbmRpbmcnLFxuICAgIHVybDogJy9ub2RlJ1xuICAgIHZpZXdzOiBtZW51Q29udGVudDpcbiAgICAgIGNvbnRyb2xsZXI6ICdOb2RlQ3RybCdcbiAgICAgIHRlbXBsYXRlVXJsOiAnbm9kZS5odG1sJykuc3RhdGUoJ2FwcC5ub2RlJyxcbiAgICB1cmw6ICcvYWJvdXQnXG4gICAgdmlld3M6IG1lbnVDb250ZW50OlxuICAgICAgY29udHJvbGxlcjogJ0Fib3V0Q3RybCdcbiAgICAgIHRlbXBsYXRlVXJsOiAnYWJvdXQuaHRtbCcpLnN0YXRlKCdhcHAuYmxvZycsXG4gICAgdXJsOiAnL2Jsb2cnXG4gICAgdmlld3M6IG1lbnVDb250ZW50OlxuICAgICAgY29udHJvbGxlcjogJ0Jsb2dDdHJsJ1xuICAgICAgdGVtcGxhdGVVcmw6ICdibG9nLmh0bWwnKS5zdGF0ZSgnYXBwLnJlc3VtZScsXG4gICAgdXJsOiAnL2Nhc3QnXG4gICAgdmlld3M6IG1lbnVDb250ZW50OlxuICAgICAgY29udHJvbGxlcjogJ0Nhc3RDdHJsJ1xuICAgICAgdGVtcGxhdGVVcmw6ICdjYXN0Lmh0bWwnKS5zdGF0ZSgnYXBwLmNhc3QnLFxuICAgIHVybDogJy9leHBhbnNpb25wYWNrcydcbiAgICB2aWV3czogbWVudUNvbnRlbnQ6XG4gICAgICBjb250cm9sbGVyOiAnRXhwYW5zaW9ucGFja3NDdHJsJ1xuICAgICAgdGVtcGxhdGVVcmw6ICdleHBhbnNpb25wYWNrcy5odG1sJykuc3RhdGUoJ2FwcC5leHBhbnNpb25wYWNrcycsXG4gICAgdXJsOiAnL2Jvb2snXG4gICAgdmlld3M6IG1lbnVDb250ZW50OlxuICAgICAgY29udHJvbGxlcjogJ0Jvb2tDdHJsJ1xuICAgICAgdGVtcGxhdGVVcmw6ICdib29rLmh0bWwnKS5zdGF0ZSgnYXBwLmJvb2snLFxuICAgIHVybDogJy9wcm9kdWN0cydcbiAgICB2aWV3czogbWVudUNvbnRlbnQ6XG4gICAgICBjb250cm9sbGVyOiAnUHJvZHVjdHNDdHJsJ1xuICAgICAgdGVtcGxhdGVVcmw6ICdwcm9kdWN0cy5odG1sJykuc3RhdGUoJ2FwcC5wcm9kdWN0cycsXG4gICAgdXJsOiAnL3BhcmVudHMnXG4gICAgdmlld3M6IG1lbnVDb250ZW50OlxuICAgICAgY29udHJvbGxlcjogJ1BhcmVudHNDdHJsJ1xuICAgICAgdGVtcGxhdGVVcmw6ICdwYXJlbnRzLmh0bWwnKS5zdGF0ZSgnYXBwLnBhcmVudHMnLFxuICAgIHVybDogJy9lZHVjYXRvcnMnXG4gICAgdmlld3M6IG1lbnVDb250ZW50OlxuICAgICAgY29udHJvbGxlcjogJ0VkdWNhdG9yc0N0cmwnXG4gICAgICB0ZW1wbGF0ZVVybDogJ2VkdWNhdG9ycy5odG1sJykuc3RhdGUoJ2FwcC5lZHVjYXRvcnMnLFxuICAgIHVybDogJy9sb2dpbidcbiAgICB2aWV3czogbWVudUNvbnRlbnQ6XG4gICAgICBjb250cm9sbGVyOiAnTG9naW5DdHJsJ1xuICAgICAgdGVtcGxhdGVVcmw6ICdsb2dpbi5odG1sJykuc3RhdGUoJ2FwcC5sb2dpbicsXG4gICAgdXJsOiAnL2NvbnRhY3QnXG4gICAgdmlld3M6IG1lbnVDb250ZW50OlxuICAgICAgY29udHJvbGxlcjogJ0NvbnRhY3RDdHJsJ1xuICAgICAgdGVtcGxhdGVVcmw6ICdjb250YWN0Lmh0bWwnKS5zdGF0ZSgnYXBwLmRvYycsXG4gICAgdXJsOiAnL2pvYi1tb250aGx5cy10d28nXG4gICAgdmlld3M6IG1lbnVDb250ZW50OlxuICAgICAgY29udHJvbGxlcjogJ0pvYk1vbnRobHlzVHdvQ3RybCdcbiAgICAgIHRlbXBsYXRlVXJsOiAnam9iLW1vbnRobHlzLXR3by5odG1sJylcbiAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSAnLydcblxuICAkaHR0cFByb3ZpZGVyLmludGVyY2VwdG9ycy5wdXNoIC0+XG4gICAgIHJlcXVlc3Q6IChjb25maWcpIC0+XG4gICAgICAgaWYgY29uZmlnLnVybC5tYXRjaCgvXFwuaHRtbCQvKSAmJiAhY29uZmlnLnVybC5tYXRjaCgvXnNoYXJlZFxcLy8pXG4gICAgICAgICBpZiBkZXZpY2UudGFibGV0KClcbiAgICAgICAgICAgdHlwZSA9ICd0YWJsZXQnXG4gICAgICAgICBlbHNlIGlmIGRldmljZS5tb2JpbGUoKVxuICAgICAgICAgICB0eXBlID0gJ21vYmlsZSdcbiAgICAgICAgIGVsc2VcbiAgICAgICAgICAgdHlwZSA9ICdkZXNrdG9wJ1xuXG4gICAgICAgICBjb25maWcudXJsID0gXCIvI3t0eXBlfS8je2NvbmZpZy51cmx9XCJcblxuICAgICAgIGNvbmZpZ1xuXG5GcmFuY2hpbm8ucnVuICgkc3RhdGUpIC0+XG4gICRzdGF0ZS5nbyAnYXBwLmhvbWUnXG5cblxuRnJhbmNoaW5vLnJ1biAoJHJvb3RTY29wZSwgY29weSkgLT5cbiAgJHJvb3RTY29wZS5jb3B5ID0gY29weVxuICBpZiBkZXZpY2UuZGVza3RvcCgpXG4gICAgJHJvb3RTY29wZS4kb24gJyRpbmNsdWRlQ29udGVudExvYWRlZCcsIChldmVudCkgLT5cbiAgICAgICMjIFNuYXBzY3JvbGwgYW5kIGJnIHZpZGVvXG4gICAgICAkKCcjZnVsbHBhZ2UnKS5mdWxscGFnZVxuICAgICAgICB2ZXJ0aWNhbENlbnRlcmVkOiB0cnVlXG4gICAgICAgIHNlY3Rpb25zQ29sb3I6IFtcbiAgICAgICAgICAnIzFiYmM5YidcbiAgICAgICAgICAnIzA0MGIxNSdcbiAgICAgICAgICAnIzA0MGIxNSdcbiAgICAgICAgICAnIzA0MGIxNSdcbiAgICAgICAgICAnI2NjZGRmZidcbiAgICAgICAgXVxuICAgICAgICBhbmNob3JzOiBbXG4gICAgICAgICAgJ2ZpcnN0UGFnZSdcbiAgICAgICAgICAnc2Vjb25kUGFnZSdcbiAgICAgICAgICAnM3JkUGFnZSdcbiAgICAgICAgICAnNHRocGFnZSdcbiAgICAgICAgICAnbGFzdFBhZ2UnXG4gICAgICAgIF1cbiAgICAgICAgbWVudTogJyNtZW51J1xuICAgICAgICBzY3JvbGxpbmdTcGVlZDogODAwXG4gICAgICAgIGFmdGVyUmVuZGVyOiAtPlxuICAgICAgICAgICQoJ3ZpZGVvJykuZ2V0KDApLnBsYXkoKVxuICAgICAgICAgIHJldHVyblxuICAgICAgcmV0dXJuXG4gIGVsc2VcblxuXG4gICAgXG5GcmFuY2hpbm8uZmFjdG9yeSAnU29ja2V0JywgKHNvY2tldEZhY3RvcnkpIC0+XG4gIHNvY2tldEZhY3RvcnkoKVxuRnJhbmNoaW5vLmZhY3RvcnkgJ0RvY3MnLCAoU29ja2V0KSAtPlxuICBzZXJ2aWNlID0gdW5kZWZpbmVkXG4gIHNlcnZpY2UgPVxuICAgIGxpc3Q6IFtdXG4gICAgZmluZDogKHBlcm1hbGluaykgLT5cbiAgICAgIF8uZmluZCBzZXJ2aWNlLmxpc3QsIChkb2MpIC0+XG4gICAgICAgIGRvYy5wZXJtYWxpbmsgPT0gcGVybWFsaW5rXG4gIFNvY2tldC5vbiAnZG9jcycsIChkb2NzKSAtPlxuICAgIHNlcnZpY2UubGlzdCA9IGRvY3NcbiAgc2VydmljZVxuXG5cblxuXG5cbkZyYW5jaGluby5jb250cm9sbGVyICdIb21lQ3RybCcsIFtcbiAgJyRzY29wZSdcbiAgKCRzY29wZSkgLT5cblxuICAgIGRvIC0+XG4gICAgICBib2R5RWwgPSB1bmRlZmluZWRcbiAgICAgIGNsb3NlYnRuID0gdW5kZWZpbmVkXG4gICAgICBjb250ZW50ID0gdW5kZWZpbmVkXG4gICAgICBpbml0ID0gdW5kZWZpbmVkXG4gICAgICBpbml0RXZlbnRzID0gdW5kZWZpbmVkXG4gICAgICBpc09wZW4gPSB1bmRlZmluZWRcbiAgICAgIG9wZW5idG4gPSB1bmRlZmluZWRcbiAgICAgIHRvZ2dsZU1lbnUgPSB1bmRlZmluZWRcbiAgICAgIGJvZHlFbCA9IGRvY3VtZW50LmJvZHlcbiAgICAgIGNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGVudC13cmFwJylcbiAgICAgIG9wZW5idG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb3Blbi1idXR0b24nKVxuICAgICAgY2xvc2VidG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2xvc2UtYnV0dG9uJylcbiAgICAgIGlzT3BlbiA9IGZhbHNlXG5cbiAgICAgIGluaXQgPSAtPlxuICAgICAgICBpbml0RXZlbnRzKClcbiAgICAgICAgcmV0dXJuXG5cbiAgICAgIGluaXRFdmVudHMgPSAtPlxuICAgICAgICAkID0gdW5kZWZpbmVkXG4gICAgICAgIGNzc0lkID0gdW5kZWZpbmVkXG4gICAgICAgIGhlYWQgPSB1bmRlZmluZWRcbiAgICAgICAgbGluayA9IHVuZGVmaW5lZFxuICAgICAgICBpZiBkZXZpY2UuZGVza3RvcCgpXG4gICAgICAgICAgXG4gICAgICAgIGVsc2UgaWYgZGV2aWNlLm1vYmlsZSgpXG4gICAgICAgICAgJCA9IGRvY3VtZW50XG4gICAgICAgICAgY3NzSWQgPSAnbXlDc3MnXG4gICAgICAgICAgaWYgISQuZ2V0RWxlbWVudEJ5SWQoY3NzSWQpXG4gICAgICAgICAgICBoZWFkID0gJC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdXG4gICAgICAgICAgICBsaW5rID0gJC5jcmVhdGVFbGVtZW50KCdsaW5rJylcbiAgICAgICAgICAgIGxpbmsuaWQgPSBjc3NJZFxuICAgICAgICAgICAgbGluay5yZWwgPSAnc3R5bGVzaGVldCdcbiAgICAgICAgICAgIGxpbmsudHlwZSA9ICd0ZXh0L2NzcydcbiAgICAgICAgICAgIGxpbmsuaHJlZiA9ICdodHRwczovL2NvZGUuaW9uaWNmcmFtZXdvcmsuY29tLzEuMC4wLWJldGEuMTMvY3NzL2lvbmljLm1pbi5jc3MnXG4gICAgICAgICAgICBsaW5rLm1lZGlhID0gJ2FsbCdcbiAgICAgICAgICAgIGhlYWQuYXBwZW5kQ2hpbGQgbGlua1xuICAgICAgICBpZiBkZXZpY2UuZGVza3RvcCgpXG4gICAgICAgICAgb3BlbmJ0bi5hZGRFdmVudExpc3RlbmVyICdjbGljaycsIHRvZ2dsZU1lbnVcbiAgICAgICAgICBpZiBjbG9zZWJ0blxuICAgICAgICAgICAgY2xvc2VidG4uYWRkRXZlbnRMaXN0ZW5lciAnY2xpY2snLCB0b2dnbGVNZW51XG4gICAgICAgICAgY29udGVudC5hZGRFdmVudExpc3RlbmVyICdjbGljaycsIChldikgLT5cbiAgICAgICAgICAgIHRhcmdldCA9IHVuZGVmaW5lZFxuICAgICAgICAgICAgdGFyZ2V0ID0gZXYudGFyZ2V0XG4gICAgICAgICAgICBpZiBpc09wZW4gYW5kIHRhcmdldCAhPSBvcGVuYnRuXG4gICAgICAgICAgICAgIHRvZ2dsZU1lbnUoKVxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIGVsc2VcblxuICAgICAgICBcblxuICAgICAgdG9nZ2xlTWVudSA9IC0+XG4gICAgICAgIGlmIGlzT3BlblxuICAgICAgICAgIGNsYXNzaWUucmVtb3ZlIGJvZHlFbCwgJ3Nob3ctbWVudSdcbiAgICAgICAgZWxzZVxuICAgICAgICAgIGNsYXNzaWUuYWRkIGJvZHlFbCwgJ3Nob3ctbWVudSdcbiAgICAgICAgaXNPcGVuID0gIWlzT3BlblxuICAgICAgICByZXR1cm5cblxuICAgICAgaW5pdCgpXG4gICAgICByZXR1cm5cbl1cblxuRnJhbmNoaW5vLmNvbnRyb2xsZXIgJ1BhcmVudHNDdHJsJywgW1xuICAnJHNjb3BlJ1xuICAoJHNjb3BlKSAtPlxuICAgICMgVE9ETzogTW92ZSB0aGlzIG1lbnUgaW50byBhIGRpcmVjdGl2ZVxuICAgIGRvIC0+XG4gICAgICBib2R5RWwgPSB1bmRlZmluZWRcbiAgICAgIGNsb3NlYnRuID0gdW5kZWZpbmVkXG4gICAgICBjb250ZW50ID0gdW5kZWZpbmVkXG4gICAgICBpbml0ID0gdW5kZWZpbmVkXG4gICAgICBpbml0RXZlbnRzID0gdW5kZWZpbmVkXG4gICAgICBpc09wZW4gPSB1bmRlZmluZWRcbiAgICAgIG9wZW5idG4gPSB1bmRlZmluZWRcbiAgICAgIHRvZ2dsZU1lbnUgPSB1bmRlZmluZWRcbiAgICAgIGJvZHlFbCA9IGRvY3VtZW50LmJvZHlcbiAgICAgIGNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGVudC13cmFwJylcbiAgICAgIG9wZW5idG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb3Blbi1idXR0b24nKVxuICAgICAgY2xvc2VidG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2xvc2UtYnV0dG9uJylcbiAgICAgIGlzT3BlbiA9IGZhbHNlXG5cbiAgICAgIGluaXQgPSAtPlxuICAgICAgICBpbml0RXZlbnRzKClcbiAgICAgICAgcmV0dXJuXG5cbiAgICAgIGluaXRFdmVudHMgPSAtPlxuICAgICAgICAkID0gdW5kZWZpbmVkXG4gICAgICAgIGNzc0lkID0gdW5kZWZpbmVkXG4gICAgICAgIGhlYWQgPSB1bmRlZmluZWRcbiAgICAgICAgbGluayA9IHVuZGVmaW5lZFxuICAgICAgICBpZiBkZXZpY2UuZGVza3RvcCgpXG4gICAgICAgICAgXG4gICAgICAgIGVsc2UgaWYgZGV2aWNlLm1vYmlsZSgpXG4gICAgICAgICAgJCA9IGRvY3VtZW50XG4gICAgICAgICAgY3NzSWQgPSAnbXlDc3MnXG4gICAgICAgICAgaWYgISQuZ2V0RWxlbWVudEJ5SWQoY3NzSWQpXG4gICAgICAgICAgICBoZWFkID0gJC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdXG4gICAgICAgICAgICBsaW5rID0gJC5jcmVhdGVFbGVtZW50KCdsaW5rJylcbiAgICAgICAgICAgIGxpbmsuaWQgPSBjc3NJZFxuICAgICAgICAgICAgbGluay5yZWwgPSAnc3R5bGVzaGVldCdcbiAgICAgICAgICAgIGxpbmsudHlwZSA9ICd0ZXh0L2NzcydcbiAgICAgICAgICAgIGxpbmsuaHJlZiA9ICdodHRwczovL2NvZGUuaW9uaWNmcmFtZXdvcmsuY29tLzEuMC4wLWJldGEuMTMvY3NzL2lvbmljLm1pbi5jc3MnXG4gICAgICAgICAgICBsaW5rLm1lZGlhID0gJ2FsbCdcbiAgICAgICAgICAgIGhlYWQuYXBwZW5kQ2hpbGQgbGlua1xuICAgICAgICBpZiBkZXZpY2UuZGVza3RvcCgpXG4gICAgICAgICAgb3BlbmJ0bi5hZGRFdmVudExpc3RlbmVyICdjbGljaycsIHRvZ2dsZU1lbnVcbiAgICAgICAgICBpZiBjbG9zZWJ0blxuICAgICAgICAgICAgY2xvc2VidG4uYWRkRXZlbnRMaXN0ZW5lciAnY2xpY2snLCB0b2dnbGVNZW51XG4gICAgICAgICAgY29udGVudC5hZGRFdmVudExpc3RlbmVyICdjbGljaycsIChldikgLT5cbiAgICAgICAgICAgIHRhcmdldCA9IHVuZGVmaW5lZFxuICAgICAgICAgICAgdGFyZ2V0ID0gZXYudGFyZ2V0XG4gICAgICAgICAgICBpZiBpc09wZW4gYW5kIHRhcmdldCAhPSBvcGVuYnRuXG4gICAgICAgICAgICAgIHRvZ2dsZU1lbnUoKVxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIGVsc2VcblxuICAgICAgICBcblxuICAgICAgdG9nZ2xlTWVudSA9IC0+XG4gICAgICAgIGlmIGlzT3BlblxuICAgICAgICAgIGNsYXNzaWUucmVtb3ZlIGJvZHlFbCwgJ3Nob3ctbWVudSdcbiAgICAgICAgZWxzZVxuICAgICAgICAgIGNsYXNzaWUuYWRkIGJvZHlFbCwgJ3Nob3ctbWVudSdcbiAgICAgICAgaXNPcGVuID0gIWlzT3BlblxuICAgICAgICByZXR1cm5cblxuICAgICAgaW5pdCgpXG4gICAgICByZXR1cm5cbl1cblxuXG5GcmFuY2hpbm8uY29udHJvbGxlciAnQ29udGFjdFNoZWV0Q3RybCcsICgkc2NvcGUsICRpb25pY0FjdGlvblNoZWV0KSAtPlxuXG4gICRzY29wZS5zaG93QWN0aW9uc2hlZXQgPSAtPlxuICAgICRpb25pY0FjdGlvblNoZWV0LnNob3dcbiAgICAgIHRpdGxlVGV4dDogJ0NvbnRhY3QgRnJhbmNoaW5vJ1xuICAgICAgYnV0dG9uczogW1xuICAgICAgICB7IHRleHQ6ICdHaXRodWIgPGkgY2xhc3M9XCJpY29uIGlvbi1zaGFyZVwiPjwvaT4nIH1cbiAgICAgICAgeyB0ZXh0OiAnQ29udGFjdCBVcyA8aSBjbGFzcz1cImljb24gaW9uLWVtYWlsXCI+PC9pPicgfVxuICAgICAgICB7IHRleHQ6ICdUd2l0dGVyIDxpIGNsYXNzPVwiaWNvbiBpb24tc29jaWFsLXR3aXR0ZXJcIj48L2k+JyB9XG4gICAgICAgIHsgdGV4dDogJzIyNC0yNDEtOTE4OSA8aSBjbGFzcz1cImljb24gaW9uLWlvcy10ZWxlcGhvbmVcIj48L2k+JyB9XG4gICAgICBdXG4gICAgICBjYW5jZWxUZXh0OiAnQ2FuY2VsJ1xuICAgICAgY2FuY2VsOiAtPlxuICAgICAgICBjb25zb2xlLmxvZyAnQ0FOQ0VMTEVEJ1xuICAgICAgICByZXR1cm5cbiAgICAgIGJ1dHRvbkNsaWNrZWQ6IChpbmRleCkgLT5cbiAgICAgICAgaWYgaW5kZXggPT0gMlxuICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJzIyNC0yNDEtOTE4OSdcbiAgICAgICAgaWYgaW5kZXggPT0gMlxuICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJ2h0dHA6Ly90d2l0dGVyLmNvbS9nYW1pZnllZF8nXG4gICAgICAgIGlmIGluZGV4ID09IDFcbiAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICdtYWlsdG86ZnJhbmtAZnllMi5jb20nXG4gICAgICAgIGlmIGluZGV4ID09IDBcbiAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICdodHRwOi8vZ2l0aHViLmNvbS9mcmFuZ3VjYydcbiAgICAgICAgdHJ1ZVxuXG4gIHJldHVyblxuRnJhbmNoaW5vLmNvbnRyb2xsZXIgJ1NsaWRlc1RhcE9uZUN0cmwnLCAoJHNjb3BlKSAtPlxuICAkc2NvcGUuZGF0ZSA9ICdOT1ZFTUJFUiAyMDE0J1xuICAkc2NvcGUudGl0bGUgPSAnVGFwY2VudGl2ZSBtYW5hZ2VyIFVYIG92ZXJoYXVsIGFuZCBmcm9udC1lbmQnXG4gICRzY29wZS5pbWFnZXMgPSBbIHtcbiAgICAnYWx0JzogJ1RhcGNlbnRpdmUuY29tIFVYIG92ZXJoYXVsIGFuZCBTUEEgZnJvbnQtZW5kJ1xuICAgICd1cmwnOiAnL2ltZy9naWYvcmVwb3J0LmdpZidcbiAgICAndGV4dCc6ICc8cD5TdHVkeSB0aGUgdXNlciBhbmQgdGhlaXIgZ29hbHMgYW5kIG92ZXJoYXVsIHRoZSBleHBlcmllbmNlIHdoaWxlIHJlLXdyaXRpbmcgdGhlIGZyb250LWVuZCBpbiBBbmd1bGFyLjwvcD48YSBocmVmPVxcJ2h0dHA6Ly90YXBjZW50aXZlLmNvbVxcJyB0YXJnZXQ9XFwnX2JsYW5rXFwnPlZpc2l0IFdlYnNpdGU8L2E+J1xuICB9IF1cbkZyYW5jaGluby5jb250cm9sbGVyICdTbGlkZXNUYXBUd29DdHJsJywgKCRzY29wZSkgLT5cbiAgJHNjb3BlLmRhdGUgPSAnT0NUT0JFUiAyMDE0J1xuICAkc2NvcGUudGl0bGUgPSAnRGVza3RvcCBhbmQgbW9iaWxlIHdlYiBmcmllbmRseSBtYXJrZXRpbmcgd2Vic2l0ZSdcbiAgJHNjb3BlLmltYWdlcyA9IFsge1xuICAgICdhbHQnOiAnU29tZSBhbHQgdGV4dCdcbiAgICAndXJsJzogJy9pbWcvZnJhbmNoaW5vLXRhcGNlbnRpdmUteWVsbG93LmpwZydcbiAgICAndGV4dCc6ICc8cD5DcmVhdGUgYSBrbm9ja291dCBicmFuZCBzdHJhdGVneSB3aXRoIGFuIGF3ZXNvbWUgbG9vayBhbmQgZmVlbC4gTWFrZSBhIHNvcGhpc3RpY2F0ZWQgb2ZmZXJpbmcgbG9vayBzaW1wbGUgYW5kIGVhc3kgdG8gdXNlLjwvcD48YSBocmVmPVxcJ2h0dHA6Ly90YXBjZW50aXZlLmNvbVxcJyB0YXJnZXQ9XFwnX2JsYW5rXFwnPlZpc2l0IFdlYnNpdGU8L2E+J1xuICB9IF1cbkZyYW5jaGluby5jb250cm9sbGVyICdTbGlkZXNDcGdDdHJsJywgKCRzY29wZSkgLT5cbiAgJHNjb3BlLmRhdGUgPSAnSlVMWSAyMDE0J1xuICAkc2NvcGUudGl0bGUgPSAnSWRlbnRpdHksIGZ1bGwtc3RhY2sgTVZQLCBhbmQgbWFya2V0aW5nIHdlYnNpdGUgZm9yIGEgbmV3IENQRyBlRGlzdHJpYnV0aW9uIGNvbXBhbnknXG4gICRzY29wZS5pbWFnZXMgPSBbIHtcbiAgICAnYWx0JzogJ1NvbWUgYWx0IHRleHQnXG4gICAgJ3VybCc6ICcvaW1nL2ZyYW5jaW5vX2NwZ2lvLmpwZydcbiAgICAndGV4dCc6ICc8cD5UdXJuIGFuIG9sZCBzY2hvb2wgQ1BHIGJ1c2luZXNzIGludG8gYSBzb3BoaXN0aWNhdGVkIHRlY2hub2xvZ3kgY29tcGFueS4gRGVzaWduIHNlY3VyZSwgYXV0b21hdGVkIGFuZCB0cmFuc2Zvcm1hdGl2ZSBwbGF0Zm9ybSwgdGVjaG5pY2FsIGFyY2hpdGVjdHVyZSBhbmQgZXhlY3V0ZSBhbiBNVlAgZW5vdWdoIHRvIGFxdWlyZSBmaXJzdCBjdXN0b21lcnMuIE1pc3Npb24gYWNjb21wbGlzaGVkLjwvcD48YSBocmVmPVxcJ2h0dHA6Ly9jcGcuaW9cXCcgdGFyZ2V0PVxcJ19ibGFua1xcJz5WaXNpdCBXZWJzaXRlPC9hPidcbiAgfSBdXG5GcmFuY2hpbm8uY29udHJvbGxlciAnU2xpZGVzTWVkeWNhdGlvbkN0cmwnLCAoJHNjb3BlKSAtPlxuICAkc2NvcGUuZGF0ZSA9ICdBUFJJTCAyMDE0J1xuICAkc2NvcGUudGl0bGUgPSAnVXNlciBleHBlcmllbmNlIGRlc2lnbiBhbmQgcmFwaWQgcHJvdG90eXBpbmcgZm9yIE1lZHljYXRpb24sIGEgbmV3IGhlYWx0aGNhcmUgcHJpY2UgY29tcGFyaXNvbiB3ZWJzaXRlJ1xuICAkc2NvcGUuaW1hZ2VzID0gW1xuICAgIHtcbiAgICAgICdhbHQnOiAnU29tZSBhbHQgdGV4dCdcbiAgICAgICd1cmwnOiAnL2ltZy9mcmFuY2hpbm8tbWVkeWNhdGlvbi5qcGcnXG4gICAgICAndGV4dCc6ICc8cD5XYWx0eiB1cCBpbiB0aGUgb25saW5lIGhlYWx0aGNhcmUgaW5kdXN0cnkgZ3VucyBibGF6aW5nIHdpdGgga2lsbGVyIGRlc2lnbiBhbmQgaW5zdGluY3RzLiBHZXQgdGhpcyBuZXcgY29tcGFueSBvZmYgdGhlIGdyb3VuZCB3aXRoIGl0XFwncyBNVlAuIFN3aXBlIGZvciBtb3JlIHZpZXdzLjwvcD48YSBocmVmPVxcJ2h0dHA6Ly9tZWR5Y2F0aW9uLmNvbVxcJyB0YXJnZXQ9XFwnX2JsYW5rXFwnPlZpc2l0IFdlYnNpdGU8L2E+J1xuICAgIH1cbiAgICB7XG4gICAgICAnYWx0JzogJ1NvbWUgYWx0IHRleHQnXG4gICAgICAndXJsJzogJy9pbWcvZnJhbmNoaW5vLW1lZHljYXRpb24yLmpwZydcbiAgICAgICd0ZXh0JzogJydcbiAgICB9XG4gICAge1xuICAgICAgJ2FsdCc6ICdTb21lIGFsdCB0ZXh0J1xuICAgICAgJ3VybCc6ICcvaW1nL2ZyYW5jaGluby1tZWR5Y2F0aW9uMy5qcGcnXG4gICAgfVxuICAgIHtcbiAgICAgICdhbHQnOiAnU29tZSBhbHQgdGV4dCdcbiAgICAgICd1cmwnOiAnL2ltZy9mcmFuY2hpbm8tbWVkeWNhdGlvbjQuanBnJ1xuICAgIH1cbiAgXVxuRnJhbmNoaW5vLmNvbnRyb2xsZXIgJ1NsaWRlc0NTVEN0cmwnLCAoJHNjb3BlKSAtPlxuICAkc2NvcGUuZGF0ZSA9ICdBUFJJTCAyMDE0J1xuICAkc2NvcGUudGl0bGUgPSAnRGVzaWduZWQgYW5kIGRldmVsb3BlZCBhIG5ldyB2ZXJzaW9uIG9mIHRoZSBDaGljYWdvIFN1biBUaW1lcyB1c2luZyBhIGh5YnJpZCBJb25pYy9Bbmd1bGFyIHN0YWNrJ1xuICAkc2NvcGUuaW1hZ2VzID0gW1xuICAgIHtcbiAgICAgICdhbHQnOiAnU29tZSBhbHQgdGV4dCdcbiAgICAgICd1cmwnOiAnL2ltZy9mcmFuY2hpbm8tY3N0LmpwZydcbiAgICAgICd0ZXh0JzogJzxwPkhlbHAgdGhlIHN0cnVnZ2xpbmcgbWVkaWEgZ2lhbnQgdXBncmFkZSB0aGVpciBjb25zdW1lciBmYWNpbmcgdGVjaG5vbG9neS4gQ3JlYXRlIG9uZSBjb2RlIGJhc2UgaW4gQW5ndWxhciBjYXBhYmxlIG9mIGdlbmVyYXRpbmcga2ljay1hc3MgZXhwZXJpZW5jZXMgZm9yIG1vYmlsZSwgdGFibGV0LCB3ZWIgYW5kIFRWLidcbiAgICB9XG4gICAge1xuICAgICAgJ2FsdCc6ICdTb21lIGFsdCB0ZXh0J1xuICAgICAgJ3VybCc6ICcvaW1nL2ZyYW5jaGluby1jc3QyLmpwZydcbiAgICB9XG4gICAge1xuICAgICAgJ2FsdCc6ICdTb21lIGFsdCB0ZXh0J1xuICAgICAgJ3VybCc6ICcvaW1nL2ZyYW5jaGluby1jc3QzLmpwZydcbiAgICB9XG4gIF1cbkZyYW5jaGluby5jb250cm9sbGVyICdTbGlkZXNLb3VwbkN0cmwnLCAoJHNjb3BlKSAtPlxuICAkc2NvcGUuZGF0ZSA9ICdNQVJDSCAyMDE0J1xuICAkc2NvcGUudGl0bGUgPSAnQnJhbmQgcmVmcmVzaCwgbWFya2V0aW5nIHNpdGUgYW5kIHBsYXRmb3JtIGV4cGVyaWVuY2Ugb3ZlcmhhdWwnXG4gICRzY29wZS5pbWFnZXMgPSBbXG4gICAge1xuICAgICAgJ2FsdCc6ICdTb21lIGFsdCB0ZXh0J1xuICAgICAgJ3VybCc6ICcvaW1nL2ZyYW5jaGluby1rb3VwbjEuanBnJ1xuICAgIH1cbiAgICB7XG4gICAgICAnYWx0JzogJ1NvbWUgYWx0IHRleHQnXG4gICAgICAndXJsJzogJy9pbWcvZnJhbmNoaW5vLWtvdXBuMi5qcGcnXG4gICAgfVxuICAgIHtcbiAgICAgICdhbHQnOiAnU29tZSBhbHQgdGV4dCdcbiAgICAgICd1cmwnOiAnL2ltZy9mcmFuY2hpbm8ta291cG4uanBnJ1xuICAgIH1cbiAgXVxuRnJhbmNoaW5vLmNvbnRyb2xsZXIgJ1NsaWRlc1Ryb3VuZEN0cmwnLCAoJHNjb3BlKSAtPlxuICAkc2NvcGUuZGF0ZSA9ICdBVUdVU1QgMjAxMydcbiAgJHNjb3BlLnRpdGxlID0gJ1NvY2lhbCB0cmF2ZWwgbW9iaWxlIGFwcCBkZXNpZ24sIFVYIGFuZCByYXBpZCBwcm90b3R5cGluZydcbiAgJHNjb3BlLmltYWdlcyA9IFsge1xuICAgICdhbHQnOiAnU29tZSBhbHQgdGV4dCdcbiAgICAndXJsJzogJy9pbWcvZnJhbmNpbm9fdHJvdW5kLmpwZydcbiAgICAndGV4dCc6ICdEZXNpZ24gYW4gSW5zdGFncmFtIGJhc2VkIHNvY2lhbCB0cmF2ZWwgYXBwLiBXaHk/IEkgZG9uXFwndCBrbm93LidcbiAgfSBdXG5GcmFuY2hpbm8uY29udHJvbGxlciAnU2xpZGVzTW9udGhseXNDdHJsJywgKCRzY29wZSkgLT5cbiAgJHNjb3BlLmRhdGUgPSAnRkVCUlVBUlkgMjAxMydcbiAgJHNjb3BlLnRpdGxlID0gJ0N1c3RvbWVyIHBvcnRhbCBwbGF0Zm9ybSBVWCBkZXNpZ24gYW5kIGZyb250LWVuZCdcbiAgJHNjb3BlLmltYWdlcyA9IFtcbiAgICB7XG4gICAgICAnYWx0JzogJ1NvbWUgYWx0IHRleHQnXG4gICAgICAndXJsJzogJy9pbWcvZnJhbmNoaW5vLW1vbnRobHlzLWJpejIuanBnJ1xuICAgIH1cbiAgICB7XG4gICAgICAnYWx0JzogJ1NvbWUgYWx0IHRleHQnXG4gICAgICAndXJsJzogJy9pbWcvZnJhbmNoaW5vX21vbnRobHlzLmpwZydcbiAgICB9XG4gIF1cbkZyYW5jaGluby5jb250cm9sbGVyICdTbGlkZXNNb250aGx5c1R3b0N0cmwnLCAoJHNjb3BlKSAtPlxuICAkc2NvcGUuZGF0ZSA9ICdNQVJDSCAyMDEyJ1xuICAkc2NvcGUudGl0bGUgPSAnRW50cmVwcmVuZXVyIGluIHJlc2lkZW5jZSBhdCBMaWdodGJhbmsnXG4gICRzY29wZS5pbWFnZXMgPSBbXG4gICAge1xuICAgICAgJ2FsdCc6ICdTb21lIGFsdCB0ZXh0J1xuICAgICAgJ3VybCc6ICcvaW1nL2ZyYW5jaGluby1tb250aGx5czcuanBnJ1xuICAgIH1cbiAgICB7XG4gICAgICAnYWx0JzogJ1NvbWUgYWx0IHRleHQnXG4gICAgICAndXJsJzogJy9pbWcvZnJhbmNoaW5vLW1vbnRobHlzNS5qcGcnXG4gICAgfVxuICAgIHtcbiAgICAgICdhbHQnOiAnU29tZSBhbHQgdGV4dCdcbiAgICAgICd1cmwnOiAnL2ltZy9mcmFuY2hpbm8tbW9udGhseXMyLmpwZydcbiAgICB9XG4gIF1cbkZyYW5jaGluby5jb250cm9sbGVyICdCbG9nQ3RybCcsICgkc2NvcGUpIC0+XG4gICRzY29wZS5hcnRpY2xlcyA9IFtcbiAgICB7XG4gICAgICAnZGF0ZSc6ICdQb3N0ZWQgYnkgRnJhbmNoaW5vIG9uIERlY2VtYmVyIDMxLCAyMDE0J1xuICAgICAgJ2hlYWRpbmcnOiAnR2l0Zmxvdz8nXG4gICAgICAnYXV0aG9yaW1nJzogJy9pbWcvZnJhbmsucG5nJ1xuICAgICAgJ2ltZyc6ICcvaW1nL2RlYy9naXQtZmxvdy5qcGcnXG4gICAgICAnYmxvYic6ICdHb3NoIGRhcm4taXQsIHRlYW1zIGdldHRpbmcgbW9yZSBzeW5jZWQgd2l0aCB0aGUgaGVscCBvZiBuZXcgZ2l0IG1ldGhvZG9sb2dpZXMgZm9yIHRlYW1zLiA8YSBocmVmPVxcJ2h0dHBzOi8vd3d3LmF0bGFzc2lhbi5jb20vZ2l0L3R1dG9yaWFscy9jb21wYXJpbmctd29ya2Zsb3dzL2NlbnRyYWxpemVkLXdvcmtmbG93XFwnPkkgY2FuXFwndCBrZWVwIHVwPC9hPiAnXG4gICAgfVxuICAgIHtcbiAgICAgICdkYXRlJzogJ1Bvc3RlZCBieSBGcmFuY2hpbm8gb24gRGVjZW1iZXIgMjIsIDIwMTQnXG4gICAgICAnaGVhZGluZyc6ICdPaCBzaGl0LCBBbmd1bGFyIDIuMCdcbiAgICAgICdhdXRob3JpbWcnOiAnL2ltZy9mcmFuay5wbmcnXG4gICAgICAnaW1nJzogJy9pbWcvZ3JhcGhfc3BhLmpwZydcbiAgICAgICdibG9iJzogJ1BhcmRvbiBteSBzY2F0dGVyZWQgYnJhaW4gcmlnaHQgbm93LiBTbyBhZnRlciB3YXRjaGluZyB0aGUgPGEgaHJlZj1cXCdodHRwczovL3d3dy55b3V0dWJlLmNvbS93YXRjaD92PWdObVd5YkF5QkhJXFwnIHRhcmdldD1cXCdfYmxhbmtcXCc+RXVybyBuZy1jb25mIHZpZGVvPC9hPiB3aGVyZSB0aGUgY3JlYXRvcnMgb2YgQW5ndWxhciAyLjAgYmFzaWNhbGx5IHNhaWQsIGV2ZXJ5dGhpbmcgaW4gY2hhbmdpbmcsIEkgZGlkIHdoYXQgbW9zdCBkZXZlbG9wZXJzIHdvdWxkIGRvIGFuZCBjb21wbGV0ZWx5IGZyZWFrZWQuIEkgbXVzdCBzYXksIElcXCdtIHN0aWxsLCB0aG9yb3VnaGx5IGNvbmZ1c2VkLCBldmVuIGFmdGVyIHNwZWFraW5nIHRvIGEgZG96ZW4gb3Igc28ga2V5IGZpZ3VyZXMgaW4gdGhlIGluZHVzdHJ5LiBNeSBmaXJzdCByZWFjdGlvbj8gVHdlZXQgb3V0IGluIGFuZ2VyLiBGLVUgQW5ndWxhciB0ZWFtIEkgcHJvbm91bmNlZC4gRi1VLiBUaGVuLCBtb3JlIHBhbmljIGFzIEkgY29udGludWVkIHRvIHJlYWQgc29tZSBvZiB0aGUgcG9zdHMgYnkgb3RoZXJzIGZlZWxpbmcgdGhlIHNhbWUgd2F5LiBJIGFza2VkIHRoZSBBbmd1bGFyIHRlYW0sIGhvdyB0aGV5IHdlcmUgaGVscGluZyB0aGUgaW5kdXN0cnkgYnkgdGVsbGluZyB1cyBpbiBhIHllYXIgYW55dGhpbmcgd2UgaGF2ZSBkZXZlbG9wZWQgaW4gQW5ndWxhciB3b3VsZCBiZSBnYXJiYWdlLiBJIGRpZCB3aGF0IG90aGVycyBzZWVtZWQgdG8gYmUgZG9pbmcgYW5kIGltbWVkaWF0ZWx5IHN0YXJ0ZWQgbG9va2luZyBmb3IgYW5vdGhlciBmcmFtZXdvcmsgdG8gc3R1ZHkgYW5kIGludmVzdCBpbi4gVGhhdFxcJ3Mgd2hlbiBJIGZvdW5kIDxhIGhyZWY9XFwnaHR0cDovL3d3dy5pbmRlZWQuY29tL2pvYnRyZW5kcz9xPWVtYmVyLmpzJTJDK2FuZ3VsYXIuanMlMkMrcmVhY3QuanMlMkMrYmFja2JvbmUuanMmbD1cXCcgdGFyZ2V0PVxcJ19ibGFua1xcJz50aGlzIGdyYXBoPC9hPiB0ZWxsaW5nIG1lIHRoZSBvbmx5IG90aGVyIFNQQSBmcmFtZXdvcmsgdGhhdCBoYXMgYXMgbXVjaCBhY3Rpdml0eSBhcyBBbmd1bGFyIGlzIGdvb2Qgb2xkIEJhY2tib25lLiA8YnIgLz48YnIgLz5CYWNrYm9uZSwgbXkgZmlyc3QgU1BBIGxvdmUgLSB3ZVxcJ3ZlIG1ldCBiZWZvcmUuIEV2ZW4gcmVjZW50bHkuIEJ1dCBJXFwndmUgYmVlbiBsb3N0LiBJXFwndmUgYmVlbiBpbmxvdmUgd2l0aCBFZ2doZWFkLmlvIGFuZCB0aGluZ3MgbGlrZSBJb25pYywgU3ByYW5ndWxhciBhbmQgYWxsIHNvcnRzIG9mIHRoaW5ncyB0aGF0IGdpdmUgbWUgc3R1ZmYgZm9yIGZyZWUuIEJ1dCB0aGVuIEkgbm90aWNlZCBzb21ldGhpbmcuIFRoZSBiYWNrYm9uZSBjb21tdW5pdHkgaGFzIGJlZW4gcXVpZXRseSBkb2luZyBpdFxcJ3MgdGhpbmcgZm9yIGEgbWludXRlIG5vdy4gQmFja2JvbmVyYWlscy5jb20/IEFyZSB5b3Uga2lkZGluZywgd2hhdCBhIHJlc291cmNlLiBNYXJpb25ldHRlPyBMb3ZlbHkuIFRoZSBsaXN0IGdvZXMgb24uIEkgbm93IGhhdmUgZG96ZW5zIG9mIHJlYXNvbnMgdG8gZ2l2ZSBCYWNrYm9uZSBhbm90aGVyIGxvb2suIEFuZCB0aGVuLCBpdCBoYXBwZW5lZC4gSSBlbWFpbGVkIE1heCBMeW5jaCBvdmVyIGF0IElvbmljIGFuZCBzYWlkLCBJIHRoaW5rIHlvdSBuZWVkIHRvIGFkZHJlc3MgdGhlIGZyaWdodCBvZiBBbmd1bGFyIDIuMCBzb21lIG9mIHVzIGFyZSBleHBlcmllbmNpbmcuIEFuZCB0aGVuIGhlIHNoZWQgc29tZSBsaWdodC4gQWZ0ZXIgYSByZWFsbHkgYXdlc29tZSByZXNwb25zZSwgaGUgc2FpZCBzb21ldGhpbmcgYXQgdGhlIGVuZCB0byB0aGUgdHVuZSBvZi4gQW5ndWxhciAyIGlzIGFsbCBhYm91dCBtYWtpbmcgaXQgZWFzaWVyIGFuZCBmYXN0ZXIgdG8gdXNlLCBhbmQgbW9yZSBhcHByb3ByaWF0ZSBmb3IgZnV0dXJlIGJyb3dzZXIgc3RhbmRhcmRzIGxpa2UgV2ViIENvbXBvbmVudHMuIEhtbS4uLiA8YnIgLz48YnIgLz5XZWIgQ29tcG9uZW50cy4gWW91IG1lYW4sIHRoaXMgc3R1ZmYgSVxcJ3ZlIGJlZW4gaGVhcmluZyBhYm91dCwgdGhpbmdzIGxpa2UgUG9seW1lciwgYW5kIHRoZXNlIG5ldyBzcGVjcyB0aGUgYnJvd3NlciBhbHJlYWR5IGhhcyBiZWd1biB0byBzdXBwb3J0LCBsaWtlIFNoYWRvdyBEb20sIGN1c3RvbSBlbGVtZW50cyBhbmQgaW1wb3J0cy4gU28uIFdoZXJlIHRoZSBoZWxsIGFtIEkgcmlnaHQgbm93PyBGb3Igbm93LCBJIHRoaW5rIElcXCdsbCB0YWtlIGEgYnJlYWsgZnJvbSBzdHJlc3NpbmcgYWJvdXQgU1BBIGZyYW1ld29ya3MgYW5kIGxvb2sgYXQgPGEgaHJlZj1cXCdodHRwczovL3d3dy5wb2x5bWVyLXByb2plY3Qub3JnL1xcJyB0YXJnZXQ9XFwnX2JsYW5rXFwnPlBvbHltZXI8L2E+LCA8YSBocmVmPVxcJ2h0dHA6Ly93ZWJjb21wb25lbnRzLm9yZy9cXCcgdGFyZ2V0PVxcJ19ibGFua1xcJz5XZWIgQ29tcG9uZW50czwvYT4sIEU2IGFuZCBzdHVkeSB1cCBvbiA8YSBocmVmPVxcJ2h0dHBzOi8vbWF0ZXJpYWwuYW5ndWxhcmpzLm9yZy8jL1xcJyB0YXJnZXQ9XFwnX2JsYW5rXFwnPk1hdGVyaWFsIERlc2lnbjwvYT4gZm9yIGEgbWludXRlLidcbiAgICB9XG4gICAge1xuICAgICAgJ2RhdGUnOiAnUG9zdGVkIGJ5IEZyYW5jaGlubyBvbiBEZWNlbWJlciAxMiwgMjAxNCdcbiAgICAgICdoZWFkaW5nJzogJ015IHBhdGggdG8gbGVhcm5pbmcgU3dpZnQnXG4gICAgICAnYXV0aG9yaW1nJzogJy9pbWcvZnJhbmsucG5nJ1xuICAgICAgJ2ltZyc6ICcvaW1nL2RlYy9uZXdzbGV0dGVyLXN3aWZ0cmlzLWhlYWRlci5naWYnXG4gICAgICAnYmxvYic6ICdJXFwndmUgYmVlbiBhbiBNVkMgZGV2ZWxvcGVyIGluIGV2ZXJ5IGxhbmd1YWdlIGV4Y2VwdCBmb3IgaU9TLiBUaGlzIHBhc3QgT2N0b2JlciwgSSB0b29rIG15IGZpcnN0IHJlYWwgZGVlcCBkaXZlIGludG8gaU9TIHByb2dyYW1taW5nIGFuZCBzdGFydGVkIHdpdGggU3dpZnQuIFRoZXJlIGFyZSB0d28gZ3JlYXQgdHV0b3JpYWxzIG91dCB0aGVyZS4gVGhlIGZpcnN0IGlzIGZyb20gYmxvYy5pbyBhbmQgaXMgZnJlZS4gSXRcXCdzIGEgZ2FtZSwgU3dpZnRyaXMsIHNvIGdldCByZWFkeSBmb3Igc29tZSBhY3Rpb24uIDxiciAvPjxiciAvPiBUaGUgc2Vjb25kIHdpbGwgaGVscCB5b3UgYnVpbGQgc29tZXRoaW5nIG1vcmUgYXBwaXNoLCBpdFxcJ3MgYnkgQXBwY29kYS4gR290IHRoZWlyIGJvb2sgYW5kIHdpbGwgYmUgZG9uZSB3aXRoIGl0IHRoaXMgd2Vlay4gU28gZmFyLCBib29rcyBvaywgYnV0IGl0IG1vdmVzIHJlYWxseSBzbG93LiBJXFwnbGwgcG9zdCBhIGJsb2cgaW4gYSBmZXcgZGF5cyB3aXRoIGxpbmtzIHRvIHRoZSBhcHAgd2FzIGFibGUgdG8gYnVpbGQuJ1xuICAgICAgJ3Jlc291cmNlMSc6ICdodHRwczovL3d3dy5ibG9jLmlvL3N3aWZ0cmlzLWJ1aWxkLXlvdXItZmlyc3QtaW9zLWdhbWUtd2l0aC1zd2lmdCdcbiAgICAgICdyZXNvdXJjZTInOiAnaHR0cDovL3d3dy5hcHBjb2RhLmNvbS9zd2lmdC8nXG4gICAgfVxuICAgIHtcbiAgICAgICdkYXRlJzogJ1Bvc3RlZCBieSBGcmFuY2hpbm8gb24gRGVjZW1iZXIgMTEsIDIwMTQnXG4gICAgICAnaGVhZGluZyc6ICdXaHkgSSBnZXQgZ29vc2UgYnVtcHMgd2hlbiB5b3UgdGFsayBhYm91dCBhdXRvbWF0ZWQgZW1haWwgbWFya2V0aW5nIGFuZCBzZWdtZW50YXRpb24gYW5kIGN1c3RvbWVyLmlvIGFuZCB0aGluZ3MgbGlrZSB0aGF0LidcbiAgICAgICdhdXRob3JpbWcnOiAnL2ltZy9mcmFuay5wbmcnXG4gICAgICAnaW1nJzogJy9pbWcvZGVjL3ByZXBlbWFpbHMucG5nJ1xuICAgICAgJ2Jsb2InOiAnSSBnZXQgdGVhcnkgZXllZCB3aGVuIEkgdGFsayBhYm91dCBteSB3b3JrIGF0IEJlbmNoUHJlcC5jb20uIEluIHNob3J0LCBJIHdhcyB0aGUgZmlyc3QgZW1wbG95ZWUgYW5kIGhlbHBlZCB0aGUgY29tcGFueSBnZXQgdG8gdGhlaXIgc2VyaWVzIEIgbmVhciB0aGUgZW5kIG9mIHllYXIgdHdvLiBJIGdvdCBhIGxvdCBkb25lIHRoZXJlLCBhbmQgb25lIG9mIHRoZSB0aGluZ3MgSSByZWFsbHkgZW5qb3llZCB3YXMgYnVpbGRpbmcgb3V0IHRlY2hub2xvZ3kgdG8gc2VnbWVudCBsZWFkcywgYnJpbmcgZGlmZmVyZW50IHVzZXJzIGRvd24gZGlmZmVyZW50IGNvbW11bmljYXRpb24gcGF0aHMgYW5kIGhvdyBJIG1hcHBlZCBvdXQgdGhlIGVudGlyZSBzeXN0ZW0gdXNpbmcgY29tcGxleCBkaWFncmFtcyBhbmQgd29ya2Zsb3dzLiA8YnIgLz48YnIgLz5Tb21lIG9mIHRoZSB0b29scyB3ZXJlIGJ1aWx0IGFuZCBiYXNlZCBvbiBxdWVzIGxpa2UgUmVkaXMgb3IgUmVzcXVlLCBvdGhlcnMgd2UgYnVpbHQgaW50byBFeGFjdFRhcmdldCBhbmQgQ3VzdG9tZXIuaW8uIEluIHRoZSBlbmQsIEkgYmVjYW1lIHNvbWV3aGF0IG9mIGFuIGV4cGVydCBhdCBtb25ldGl6aW5nIGVtYWlscy4gV2l0aGluIG91ciBlbWFpbCBtYXJrZXRpbmcgY2hhbm5lbCwgd2UgZXhwbG9yZWQgdGFnZ2luZyB1c2VycyBiYXNlZCBvbiB0aGVpciBhY3Rpb25zLCBzdWNoIGFzIG9wZW5zIG9yIG5vbiBvcGVucywgb3Igd2hhdCB0aGV5IGNsaWNrZWQgb24sIHdlIHRhcmdlZCBlbWFpbCB1c2VycyB3aG8gaGFkIGJlZW4gdG91Y2hlZCBzZXZlbiB0aW1lcyB3aXRoIHNwZWNpYWwgaXJyaXNpdGFibGUgc2FsZXMsIGJlY2F1c2Ugd2Uga25vdyBhZnRlciA2IHRvdWNoZXMsIHdlIGNvdWxkIGNvbnZlcnQuIFRoZXNlIHRyaWNrcyB3ZSBsZWFybmVkIGxlZCB0byAyNS0zMGsgZGF5cywgYW5kIGV2ZW50dWFsbHksIGRheXMgd2hlcmUgd2Ugc29sZCAxMDBrIHdvcnRoIG9mIHN1YnNjcmlwdGlvbnMuIDxiciAvPjxiciAvPlNvLCBteSBwb2ludD8gRG9uXFwndCBiZSBzdXJwcmlzZWQgaWYgSSBnZWVrIG91dCBhbmQgZmFpbnQgd2hlbiBJIGhlYXIgeW91IHRhbGsgYWJvdXQgdHJhbnNhY3Rpb25hbCBlbWFpbGluZyBhbmQgY2FkZW5jZXMgYW5kIGNvbnN1bWVyIGpvdXJuaWVzIGFuZCBzdHVmZiBsaWtlIHRoYXQuJ1xuICAgIH1cbiAgICB7XG4gICAgICAnZGF0ZSc6ICdQb3N0ZWQgYnkgRnJhbmNoaW5vIG9uIERlY2VtYmVyIDEwLCAyMDE0J1xuICAgICAgJ2hlYWRpbmcnOiAnSWYgSSBjb3VsZCBoYXZlIG9uZSB3aXNoOyBJIGdldCB0byB1c2UgdGhpcyBtZXRob2Qgd2hlbiBkZXNpZ25pbmcgeW91ciBjb25zdW1lciBqb3VybmV5IGZ1bm5lbC4nXG4gICAgICAnYXV0aG9yaW1nJzogJy9pbWcvZnJhbmsucG5nJ1xuICAgICAgJ2ltZyc6ICcvaW1nL2RlYy91eF9ib2FyZC5qcGcnXG4gICAgICAnYmxvYic6ICdTbyBhZnRlciBhIGJ1bmNoIG9mIGV0aG5vZ3JhcGhpYyBzdHVkaWVzIGZyb20gcGVyc29uYSBtYXRjaGVzIEkgZ2F0aGVyIGluLXBlcnNvbiwgSSBnZXQgdG8gZmlsbCBhIHdhbGwgdXAgd2l0aCBrZXkgdGhpbmdzIHBlb3BsZSBzYWlkLCBmZWx0LCBoZWFyZCAtIG1vdGl2YXRvcnMsIGJhcnJpZXJzLCBxdWVzdGlvbnMsIGF0dGl0dWRlcyBhbmQgc3VjaC4gSSB0aGVuIGdyb3VwIHRoZXNlIHBvc3QtaXQgdGhvdWdodHMgaW4gdmFyaW91cyB3YXlzLCBsb29raW5nIGZvciBwYXR0ZXJucywgc2VudGltZW50LCBuZXcgaWRlYXMuIDxiciAvPjxiciAvPkkgdGhlbiB0YWtlIHRoaXMgcmljaCBkYXRhIGFuZCBkZXZlbG9wIGEgd2hhdCBjb3VsZCBiZSBicmFuZGluZywgYSBsYW5kaW5nIHBhZ2Ugb3IgYW4gZW1haWwgLSB3aXRoIHdoYXQgSSBjYWxsLCBhbiBpbnZlcnRlZCBweXJhbWlkIGFwcHJvYWNoIHRvIGNvbnRlbnQsIHdoZXJlIGFkZHJlc3NpbmcgdGhlIG1vc3QgaW1wb3J0YW50IHRoaW5ncyBmb3VuZCBpbiB0aGUgdXNlciByZXNlYXJjaCBnZXQgYWRkcmVzc2VkIGluIGEgaGVyaWFyY2hpY2FsIG9yZGVyLiBJIGNyZWF0ZSA1LTYgaXRlcmF0aW9ucyBvZiB0aGUgbGFuZGluZyBwYWdlIGFuZCByZS1ydW4gdGhlbSB0aHJvdWdoIGEgc2Vjb25kIGdyb3VwIG9mIHBhcnRpY2lwYW50cywgc3Rha2Vob2xkZXJzIGFuZCBmcmllbmRzLiBJIHRoZW4gdGFrZSBldmVuIG1vcmUgbm90ZXMgb24gcGVvcGxlcyBzcGVhay1hbG91ZCByZWFjdGlvbnMgdG8gdGhlIGxhbmRpbmcgcGFnZXMuIEFmdGVyIHRoaXMsIElcXCdtIHJlYWR5IHRvIGRlc2lnbiB0aGUgZmluYWwgY29weSBhbmQgcGFnZXMgZm9yIHlvdXIgZnVubmVsLidcbiAgICB9XG4gICAge1xuICAgICAgJ2RhdGUnOiAnUG9zdGVkIGJ5IEZyYW5jaGlubyBvbiBEZWNlbWJlciA5LCAyMDE0J1xuICAgICAgJ2hlYWRpbmcnOiAnV2hvIHNheXMgSSBkb25cXCd0IGJlbG9uZyBoZXJlPydcbiAgICAgICdhdXRob3JpbWcnOiAnL2ltZy9mcmFuay5wbmcnXG4gICAgICAnaW1nJzogJy9pbWcvZGVjL3VjbGEuanBnJ1xuICAgICAgJ2Jsb2InOiAnVGhpcyBjb21pbmcgd2Vla2VuZCB0aGVyZVxcJ3MgcHJvYmFibHkgYSBoYWNrYXRob24gZ29pbmcgb24gaW4geW91ciBjaXR5LiBTb21lIG9mIHRoZW0gYXJlIGdldHRpbmcgcmVhbGx5IGJpZy4gSSB3YXNuXFwndCByZWdpc3RlcmVkIGZvciBMQSBIYWNrcyB0aGlzIHN1bW1lci4gSSBkb25cXCd0IGV2ZW4ga25vdyBob3cgSSBlbmRlZCB1cCB0aGVyZSBvbiBhIEZyaWRheSBuaWdodCwgYnV0IHdoZW4gSSBzYXcgd2hhdCB3YXMgZ29pbmcgb24sIEkgZ3JhYmJlZCBhIGNoYWlyIGFuZCBzdGFydGVkIGhhY2tpbmcgYXdheS4gV29ycmllZCBJIGhhZCBqdXN0IHNudWNrIGluIHRoZSBiYWNrIGRvb3IgYW5kIHN0YXJ0ZWQgY29tcGV0aW5nLCBteSByaWRlIGxlZnQgYW5kIHRoZXJlIEkgd2FzLCBmb3IgdGhlIG5leHQgdHdvIGRheXMuIDxiciAvPjxiciAvPlRoYXRcXCdzIHJpZ2h0LiBJIHNudWNrIGluIHRoZSBiYWNrIG9mIExBIEhhY2tzIGxhc3Qgc3VtbWVyIGF0IFVDTEEgYW5kIGhhY2tlZCB3aXRoIGtpZHMgMTAgeWVhcnMgeW91bmdlciB0aGFuIG1lLiBJIGNvdWxkblxcJ3QgbWlzcyBpdC4gSSB3YXMgZmxvb3JlZCB3aGVuIEkgc2F3IGhvdyBtYW55IHBlb3BsZSB3ZXJlIGluIGl0LiBNZSwgYmVpbmcgdGhlIG1pc2NoZXZpb3VzIGhhY2tlciBJIGFtLCBJIHRob3VnaHQgaWYgSSB1c2VkIHRoZSBlbmVyZ3kgb2YgdGhlIGVudmlyb25tZW50IHRvIG15IGFkdmFudGFnZSwgSSBjb3VsZCBidWlsZCBzb21ldGhpbmcgY29vbC4gTG9uZyBzdG9yeSBzaG9ydCwgbGV0IG1lIGp1c3Qgc2F5LCB0aGF0IGlmIHlvdSBoYXZlIGJlZW4gaGF2aW5nIGEgaGFyZCB0aW1lIGxhdW5jaGluZywgc2lnbiB1cCBmb3IgYSBoYWNrYXRob24uIEl0XFwncyBhIGd1YXJhbnRlZWQgd2F5IHRvIG92ZXItY29tcGVuc2F0ZSBmb3IgeW91ciBjb25zdGFudCBmYWlsdXJlIHRvIGxhdW5jaC4gTW9yZSBvbiB3aGF0IGhhcHBlbmVkIHdoZW4gSSB0b29rIHRoZSBzdGFnZSBieSBzdXJwcmlzZSBhbmQgZ290IGJvb3RlZCBsYXRlci4uLidcbiAgICB9XG4gICAge1xuICAgICAgJ2RhdGUnOiAnUG9zdGVkIGJ5IEZyYW5jaGlubyBvbiBEZWNlbWJlciA4LCAyMDE0J1xuICAgICAgJ2hlYWRpbmcnOiAnU3RhcnRlZCBpbiBFbWJlci5qcywgZmluaXNoZWQgaW4gQW5ndWxhci5qcy4gV2h5IGFuZCBob3cgZGlkIHRoaXMgaGFwcGVuPydcbiAgICAgICdhdXRob3JpbWcnOiAnL2ltZy9mcmFuay5wbmcnXG4gICAgICAnaW1nJzogJy9pbWcvZGVjL3V4MS5qcGcnXG4gICAgICAnYmxvYic6ICdJIGdvdCBsb3ZlIGZvciBhbGwgU1BBIGZyYW1ld29ya3MuIENvbGxlY3RpdmVseSwgdGhleSBhbGwgcHVzaCB0aGUgZW52ZWxvcGUuIE15IGZpcnN0IGNsaWVudC1zaWRlIE1WQyBwcm9qZWN0IHdhcyBhIGJhY2tib25lIHByb2plY3QgLSBhbmQgd2Ugc3RhcnRlZCB3aGVuIHRoZXkgd2VyZSBpbiBCZXRhLiBUaGF0IHByb2plY3Qgd2FzIEJlbmNoUHJlcC4gQXQgdGhlIHRpbWUsIGFzIGEgZnJvbnQtZW5kIGRldmVsb3BlciwgSSB3YXMgY29uZnVzZWQgYnkgdGhlIHN3ZWVwaW5nIGNoYW5nZXMgdG8gaG93IHRoaW5ncyBuZWVkZWQgdG8gYmUgZG9uZS4gRnVsbCBmbGVkZ2VkIE1WQyBmcmFtZXdvcmtzIGluIEphdmFTY3JpcHQgbGVuZGVkIGEgd2hvbGUgbmV3IHN5bnRheCwgYW5kIHRvIHRvcCBpdCBvZmYsIG91ciBlbmdpbmVlcnMgb24gdGhlIHRlYW0gd2VyZSB1c2luZyBDb2ZmZWVTY3JpcHQsIEhBTUwsIFNBU1MgYW5kIEphc21pbmUsIGV0Yy4gTXkgZmlyc3QgU1BBIHByb2plY3QgZGlkIG5vdCBnbyB3ZWxsIGFuZCBpdCB3YXNuXFwndCB1bnRpbCB3ZSBjb21wbGV0ZWx5IHJlLXdyb3RlIHRoZSBzb2Z0d2FyZSB0aGF0IEkgc3RhcnRlZCB1bmRlcnN0YW5kaW5nIGV2ZXJ5dGhpbmcgY2xlYXJseS4gVHdvIHllYXJzIGxhdGVyLCBhIG5ldyB0ZWFtIEkgd2FzIHdvcmtpbmcgd2l0aCBkZWNpZGVkIHRvIGJ1aWxkIDxhIGhyZWY9XFwnaHR0cDovL2FnZW50cnVuLmNvbVxcJyB0YXJnZXQ9XFwnX2JsYW5rXFwnPkFnZW50cnVuLmNvbTwvYT4gaW4gRW1iZXIuanMuIFdlIGRvdmUgaW4uIEZvdXIgbW9udGhzIGxhdGVyLCB3ZSBwb3J0ZWQgdG8gQW5ndWxhciBhbmQgc2luY2UsIElcXCd2ZSBuZXZlciBsb29rZWQgYmFjay4gSVxcJ20gb24gbXkgZmlmdGggb3Igc2l4dGggYW5ndWxhciBwcm9qZWN0IG5vdyBhbmQgSSBkb25cXCd0IHBsYW4gb24gY2hhbmdpbmcgZnJhbWV3b3JrcyBmb3IgYSB3aGlsZSAtIGF0IGxlYXN0IHBlcnNvbmFsbHkuIDxiciAvPjxiciAvPlRoZSBhbmd1bGFyIG1vdmVtZW50IHJlbWluZHMgbWUgdGhlIG1vc3Qgb2YgdGhlIFJvUiBtb3ZlbWVudC4gSSBkb25cXCd0IGdldCBzdHVjayB0cnlpbmcgdG8gZG8gdGhpbmdzIGxpa2UgSSBkbyBpbiBCYWNrYm9uZSBvciBFbWJlci4gSSBjb3VsZCBnZXQgaW50byBkaXNjdXNzaW9uIGFuZCB0ZWNobmljYWwgZXhhbXBsZXMsIGJ1dCB0aGVyZSBhcmUgYmV0dGVyIHBsYWNlcyB0byBjb21wYXJlIHRoZSB0d28uIEkgY2FuXFwndCB3YWl0IGZvciB0aGUgY29tcGxldGVseSByZXZhbXBlZCBBbmd1bGFyIDIuMCBhbmQgYW0gbG9va2luZyBmb3J3YXJkIHRvIGEgNS03IHllYXIgZnV0dXJlIHdpdGggQW5ndWxhciBiZWZvcmUgc29tZXRoaW5nIG5ldyBjb21lcyBvdXQsIHNvbWV0aGluZyB0aGF0IHBlcmhhcHMganVzdCBidWlsZHMgYXBwcyBmb3IgeW91IGJ5IHJlYWRpbmcgeW91ciBtaW5kLiA8YnIgLz48YnIgLz5PaCwgYW5kIGlmIHlvdXIgd29uZGVyaW5nIHdobyBkZXNpZ25lZCB0aGlzIGxvdmVseSB3ZWJzaXRlLCB0aGF0IHdhcyB5b3VycyB0cnVseS4gSSBsZWQgdGhlIFVYIHJlc2VhcmNoLCBVWCBwcm90b3R5cGluZywgdXNlciByZXNlYXJjaCBhbmQgZ3JhcGhpYyBkZXNpZ24gb2YgdGhpcyBwcm9kdWN0LidcbiAgICB9XG4gICAge1xuICAgICAgJ2RhdGUnOiAnUG9zdGVkIGJ5IEZyYW5jaGlubyBvbiBEZWNlbWJlciA3LCAyMDE0J1xuICAgICAgJ2hlYWRpbmcnOiAnUGxlYXNlIGRvblxcJ3QgYXNrIG1lIGFib3V0IG15IGFydCBhbmQgbWl4ZWQgbWVkaWEgYmFja2dyb3VuZC4gSSBtaWdodCB0b3RhbGx5IGF2b2lkIHRoZSBxdWVzdGlvbi4nXG4gICAgICAnYXV0aG9yaW1nJzogJy9pbWcvZnJhbmsucG5nJ1xuICAgICAgJ2ltZyc6ICcvaW1nL2RlYy9taXhlZC5qcGcnXG4gICAgICAnYmxvYic6ICdJIGhhdmUgYSBodWdlIGNvbXBsZXggYWJvdXQgbXkgaHlicmlkIGJhY2tncm91bmQuIEkgY2FuXFwndCB0ZWxsIHlvdSBob3cgbWFueSB0aW1lcyBJXFwndmUgYmVlbiBvbiBhbiBpbnRlcnZpZXcgd2hlcmUgSVxcJ3ZlIHRyaWVkIHRvIGV4cGxhaW4gdGhlIGZhY3QgdGhhdCBJXFwnbSBhbiBhcnRpc3QgYW5kIGEgcHJvZ3JhbW1lci4gVGhlIG1pbnV0ZSBJIGRvIHRoaXMsIElcXCdtIGFsbW9zdCBpbnN0YW50bHkgd3JpdHRlbiBvZmYgYXMgYSBqYWNrLW9mLWFsbCB0cmFkZXMgb3Igd2VhayBvbiBvbmUgc2lkZS4gPGJyIC8+PGJyIC8+U28sIElcXCdtIGFib3V0IHRvIG9mZmljaWFsbHkgZXhwbGFpbiB0byBldmVyeW9uZSBzb21ldGhpbmcgSVxcJ20gcHJldHR5IHNlbnNhdGl2ZSBhYm91dC4gSVxcJ20gYSB2ZXJ5IHRhbGVudGVkIGNyZWF0aXZlIGRpcmVjdG9yIHdpdGggYSB2ZXJ5IHNvcGhpc3RpY2F0ZWQgdGVjaG5pY2FsIGJhY2tncm91bmQuIEkgbWFrZSBleHBsYWluZXIgdmlkZW9zLCBJIGZpbG0sIEkgZG8gdXNlciByZXNlYXJjaCwgSSBkZXNpZ24gYW5kIEkgcHJvZ3JhbS4gWWVzLCBJIHByb2dyYW0gLSBJIHdpbGwgZnJvbnQtZW5kIHdpdGggdGhlIGJlc3QgYW5kIGhhdmUgYSBrbmFjayBmb3IgZnJvbnQtZW5kIE1WQyBmcmFtZXdvcmtzLiA8YnIgLz48YnIgLz5ZZXMsIHRoZXJlIGFyZSBzb21lIHRoaW5ncyBJXFwnbSBub3QgZ29vZCBhdC4gSVxcJ20gbm90IHlvdXIgZ2VuaXVzIHByb2dyYW1tZXIgdGhhdCB3aWxsIGxlYWQgeW91ciBvdGhlciBwcm9ncmFtbWVycyB0byB0aGUgcHJvbWlzZSBsYW5kLCBidXQgbm90IHdlYWsgbGlrZSB5b3VyIHRoaW5raW5nIC0gSSBqdXN0IGtub3cgYSBsb3Qgb2YgaGFja2VycyB3aG8gZG9uXFwndCBjb25jZXJuIHRoZW1zZWx2ZXMgd2l0aCB0aGluZ3MgdGhhdCBJIGdldCBsb3N0IGluLCBsaWtlIGRlc2lnbiBvciBjb250ZW50IHN0cmF0ZWd5LCBvciB1c2VyIHJlc2VhcmNoLiBTbyB3aGVuIEkgc2F5IHdlYWssIEkgbWVhbiB3ZWFrIGxpa2UsIElcXCdtIHRhbGtpbmcsIHBvc3NpYmx5LCBmYXVsLXRvbGVyYW50IGZ1bmN0aW9uYWwgcHJvZ2FtbWluZyBpbiBsb3cgbGV2ZWwgbGFuZ3VhZ2VzIG9yIEVybGFuZyBvciBFbGl4ZXIgd2l0aCBzdXBlcnZpc2VyIE9UUCBhcmNoaXRlY3R1cmVzIGFuZCBtZXNzYWdlIHBhc3NpbmcuIElcXCdtIHRhbGluZyBtaWRkbGV3YXJlIGRldmVsb3BtZW50LiBJXFwnbSB0YWxraW5nIFRERCBkZXYgYWxsIGRheSBldmVyeSBkYXkgb24gYSBoYXJkY29yZSBzY3J1bSB0ZWFtLiBUaGF0XFwncyBub3QgbWUuIElcXCdtIG5vdCB5b3VyIGxlYWQgaGVyZSwgaG93ZXZlciBJIHdpbGwgSnIuIG9uIHVuZGVyc3RhbmRpbmcgaG93IGV2ZXJ5IGxpbmUgb2YgY29kZSB3b3JrcyBpbiB5b3VyIGFwcC4gSVxcJ20geW91ciBwcm90b3R5cGVyLCBNVlAgZ3V5IG9yIGZvbGxvdyB5b3VyIGxlYWQgZ3V5IHdoZW4gaXQgY29tZXMgdG8gcHJvZ3JhbW1pbmcuIEkgY2FuIG1ha2UganVzdCBhYm91dCBhbnl0aGluZyBJIHdhbnQsIGJ1dCBkb25cXCd0IGZlZWwgY29tZm9ydGFibGUgbGVhZGluZyBzYXksIGFuIGlPUyBvciBKYXZhIHRlYW0uIEkganVzdCBkb25cXCd0IGhhdmUgZW5vdWdoIGxvdy1sZXZlbCBwcm9ncmFtbWluZyBleHBlcmllbmNlIGluIHRob3NlIHBhcnRpY3VsYXJlIGZyYW1ld29ya3MuIFdoZW4gaXQgY29tZXMgdG8gSmF2YVNjcmlwdCwgSVxcJ20gYSA3LiBUaGVyZSBpc25cXCd0IGFueXRoaW5nIHlvdSBjYW5cXCd0IGFzayBtZSB0byBkbyB3aXRoIEphdmFTY3JpcHQsIGZyb20gRmFtby51cyB0byBNVkMgc3R1ZmYgLSBob3dldmVyLCBJXFwnbSBub3QgeW91ciBndXkgd2hvXFwncyBnb2luZyB0byBpbnRyb2R1Y2UgdGhlIG5leHQgYmlnIG9wZW4tc291cmNlIHRvb2wgaW4gSlMuIElcXCdtIGEgbWFjcm8gSlMgZGV2ZWxvcGVyIC0gbWVhbmluZyBJIGNhbiB0YWtlIGVzdGFibGlzaGVkIHBhdHRlcm5zIGFuZCBjb21wb25lbnRzIGFuZCBjb25jZXB0cyBhbmQgcnVuIHdpdGggdGhlbS4gSSBkb25cXCd0IGdpdmUgdGFsa3Mgb24gYmlnLW8gbm90YXRpb25zIGFuZCBJIG1pZ2h0IG5vdCBiZSBkb3duIGZvciBhIDQwIGhvdXIgYSB3ZWVrIGpvYiBvZiBoYXJkY29yZSBUREQgcHJvZ3JhbW1pbmcgLSBidXQgdGhpcyBkb2VzblxcJ3QgbWVhbiB5b3Ugc2hvdWxkIHdyaXRlIG1lIG9mZiBhcyBhIGdlbmVyYWxpc3QuPGJyIC8+PGJyIC8+VGhlIGZhY3QgaXMgdGhhdCBJXFwndmUgbmV2ZXIgYmVlbiB0aGUgdHlwZSBmb3IgYSByb2xlIHdpdGggYW4gZWFybHkgc3RhZ2Ugc3RhcnR1cCB3aGVyZSBJIGRpZG5cXCd0IHdlYXIgYSBidW5jaCBvZiBoYXRzIG9yIHRyYW5zaXRpb24gcGVyaW9kaWNhbGx5IGZyb20gYSBkZXNpZ24gbWluZGVkIHRoaW5rZXIgdG8gYSB0ZWNobmljYWwgc2NydW0sIHJlcXVpcmVtZW50IHdyaXRpbmcsIHByb2R1YyBtYW5hZ2luZyBhbmFsLWlzdC4nXG4gICAgfVxuICBdXG5GcmFuY2hpbm8uY29udHJvbGxlciAnQmxvZ1JvbGxDdHJsJywgKCRzY29wZSkgLT5cbkZyYW5jaGluby5jb250cm9sbGVyICdBYm91dEN0cmwnLCAoJHNjb3BlKSAtPlxuRnJhbmNoaW5vLmNvbnRyb2xsZXIgJ0FwcEN0cmwnLCAoJHNjb3BlKSAtPlxuRnJhbmNoaW5vLmNvbnRyb2xsZXIgJ1Jlc3VtZUN0cmwnLCAoJHNjb3BlKSAtPlxuICAkc2NvcGUuYmxvYiA9ICc8ZGl2IGNsYXNzPVwicm93XCI+PGRpdiBjbGFzcz1cImxhcmdlLTEyXCI+PGRpdiBjbGFzcz1cInJvd1wiPjxkaXYgY2xhc3M9XCJsYXJnZS0xMiBjb2x1bW5zXCI+PGg2Pk5PViAyMDEzIC0gUFJFU0VOVDwvaDY+PGJyLz48aDI+SHlicmlkIEV4cGVyaWVuY2UgRGVzaWduZXIvRGV2ZWxvcGVyLCBJbmRlcGVuZGVudDwvaDI+PGJyLz48cD5Xb3JrZWQgd2l0aCBub3RlYWJsZSBlbnRyZXByZW5vdXJzIG9uIHNldmVyYWwgbmV3IHByb2R1Y3QgYW5kIGJ1c2luZXNzIGxhdW5jaGVzLiBIZWxkIG51bWVyb3VzIHJvbGVzLCBpbmNsdWRpbmcgY29udGVudCBzdHJhdGVnaXN0LCB1c2VyIHJlc2VhcmNoZXIsIGRlc2lnbmVyIGFuZCBkZXZlbG9wZXIuIDwvcD48cD48c3Ryb25nPkNvbXBhbmllczwvc3Ryb25nPjwvcD48dWwgY2xhc3M9XCJub1wiPjxsaT48YSBocmVmPVwiaHR0cDovL3RhcGNlbnRpdmUuY29tXCIgdGFyZ2V0PVwiX2JsYW5rXCI+VGFwY2VudGl2ZTwvYT48L2xpPjxsaT48YSBocmVmPVwiaHR0cDovL2NwZy5pb1wiIHRhcmdldD1cIl9ibGFua1wiPkNQR2lvPC9hPjwvbGk+PGxpPjxhIGhyZWY9XCJodHRwOi8va291LnBuL1wiIHRhcmdldD1cIl9ibGFua1wiPktvdS5wbiBNZWRpYTwvYT48L2xpPjxsaT4gPGEgaHJlZj1cImh0dHA6Ly9tZWR5Y2F0aW9uLmNvbVwiIHRhcmdldD1cIl9ibGFua1wiPk1lZHljYXRpb248L2E+PC9saT48bGk+IDxhIGhyZWY9XCJodHRwOi8vd3d3LnN1bnRpbWVzLmNvbS9cIiB0YXJnZXQ9XCJfYmxhbmtcIj5DaGljYWdvIFN1biBUaW1lczwvYT48L2xpPjwvdWw+PGJyLz48cD48c3Ryb25nPlRhcGNlbnRpdmUgRGVsaXZlcmFibGVzPC9zdHJvbmc+PC9wPjx1bCBjbGFzcz1cImJ1bGxldHNcIj48bGk+Q29tcGxldGUgVGFwY2VudGl2ZS5jb20gbWFya2V0aW5nIHdlYnNpdGUgYW5kIFVYIG92ZXJoYXVsIG9mIGNvcmUgcHJvZHVjdCwgdGhlIFwiVGFwY2VudGl2ZSBNYW5hZ2VyXCI8L2xpPjxsaT5JbmR1c3RyaWFsIGRlc2lnbiBvZiB0aGUgVGFwY2VudGl2ZSBUb3VjaHBvaW50PC9saT48bGk+Q29udGVudCBzdHJhdGVneSBmb3IgY29ycG9yYXRlIG1hcmtldGluZyBzaXRlPC9saT48bGk+TW9iaWxlIGZpcnN0IG1hcmtldGluZyB3ZWJzaXRlIHVzaW5nIElvbmljIGFuZCBBbmd1bGFyPC9saT48L3VsPjxwPjxzdHJvbmc+Q1BHaW8gRGVsaXZlcmFibGVzPC9zdHJvbmc+PC9wPjx1bCBjbGFzcz1cImJ1bGxldHNcIj48bGk+UHJvZHVjdCBhbmQgYnVzaW5lc3Mgc3RyYXRlZ3ksIHRlY2huaWNhbCBhcmNoaXRlY3R1cmUgYW5kIHNwZWNpZmljYXRpb24gZGVzaWduPC9saT48bGk+T25lIGh1bmRyZWQgcGFnZSBwcm9wb3NhbCB0ZW1wbGF0ZSBvbiBidXNpbmVzcyBtb2RlbCBhbmQgY29ycG9yYXRlIGNhcGFiaWxpdGllczwvbGk+PGxpPk1hcmtldGluZyB3ZWJzaXRlIGRlc2lnbiBhbmQgY29udGVudCBzdHJhdGVneTwvbGk+PGxpPkNvcmUgcHJvZHVjdCBkZXNpZ24gYW5kIE1WUCBmdW5jdGlvbmFsIHByb3RvdHlwZTwvbGk+PC91bD48cD48c3Ryb25nPktvdS5wbiBEZWxpdmVyYWJsZXM8L3N0cm9uZz48L3A+PHVsIGNsYXNzPVwiYnVsbGV0c1wiPjxsaT5Lb3UucG4gTWVkaWEgYnJhbmQgcmVmcmVzaDwvbGk+PGxpPk1hcmtldGluZyBzaXRlIHJlZGVzaWduPC9saT48bGk+UG9ydGFsIHVzZXIgZXhwZXJpZW5jZSBvdmVyaGF1bDwvbGk+PC91bD48cD48c3Ryb25nPk1lZHljYXRpb24gRGVsaXZlcmFibGVzPC9zdHJvbmc+PC9wPjx1bCBjbGFzcz1cImJ1bGxldHNcIj48bGk+Q29uY2VwdHVhbCBkZXNpZ24gYW5kIGFydCBkaXJlY3Rpb248L2xpPjxsaT5Vc2VyIHJlc2VhcmNoPC9saT48bGk+UmFwaWQgcHJvdG90eXBlczwvbGk+PC91bD48cD48c3Ryb25nPkNoaWNhZ28gU3VuIFRpbWVzPC9zdHJvbmc+PC9wPjx1bCBjbGFzcz1cImJ1bGxldHNcIj48bGk+Q29uY2VwdHVhbCBkZXNpZ24gYW5kIGFydCBkaXJlY3Rpb248L2xpPjxsaT5OYXRpdmUgaU9TIGFuZCBBbmRyb2lkIGFwcCBkZXNpZ24gYW5kIGp1bmlvciBkZXZlbG9wbWVudDwvbGk+PGxpPkh5YnJpZCBJb25pYy9Bbmd1bGFyIGRldmVsb3BtZW50PC9saT48L3VsPjwvZGl2PjwvZGl2Pjxici8+PGRpdiBjbGFzcz1cInJvd1wiPjxkaXYgY2xhc3M9XCJsYXJnZS0xMiBjb2x1bW5zXCI+PGg2Pk1BUkNIIDIwMTAgLSBPQ1RPQkVSIDIwMTM8L2g2Pjxici8+PGgyPkRpcmVjdG9yIG9mIFVzZXIgRXhwZXJpZW5jZSwgTGlnaHRiYW5rPC9oMj48YnIvPjxwPkxhdW5jaGVkIGFuZCBzdXBwb3J0ZWQgbXVsdGlwbGUgbmV3IGNvbXBhbmllcyB3aXRoaW4gdGhlIExpZ2h0YmFuayBwb3J0Zm9saW8uIDwvcD48cD48c3Ryb25nPkNvbXBhbmllczwvc3Ryb25nPjwvcD48dWwgY2xhc3M9XCJub1wiPjxsaT4gPGEgaHJlZj1cImh0dHA6Ly9jaGljYWdvaWRlYXMuY29tXCIgdGFyZ2V0PVwiX2JsYW5rXCI+Q2hpY2Fnb0lkZWFzLmNvbTwvYT48L2xpPjxsaT4gPGEgaHJlZj1cImh0dHA6Ly9iZW5jaHByZXAuY29tXCIgdGFyZ2V0PVwiX2JsYW5rXCI+QmVuY2hQcmVwLmNvbTwvYT48L2xpPjxsaT4gPGEgaHJlZj1cImh0dHA6Ly9zbmFwc2hlZXRhcHAuY29tXCIgdGFyZ2V0PVwiX2JsYW5rXCI+U25hcFNoZWV0QXBwLmNvbTwvYT48L2xpPjxsaT5Nb250aGx5cy5jb20gKGRlZnVuY3QpPC9saT48bGk+IDxhIGhyZWY9XCJodHRwOi8vZG91Z2guY29tXCIgdGFyZ2V0PVwiX2JsYW5rXCI+RG91Z2guY29tPC9hPjwvbGk+PGxpPiA8YSBocmVmPVwiaHR0cDovL2dyb3Vwb24uY29tXCIgdGFyZ2V0PVwiX2JsYW5rXCI+R3JvdXBvbi5jb208L2E+PC9saT48L3VsPjxici8+PHA+PHN0cm9uZz5DaGljYWdvIElkZWFzIERlbGl2ZXJhYmxlczwvc3Ryb25nPjwvcD48dWwgY2xhc3M9XCJidWxsZXRzXCI+PGxpPldlYnNpdGUgZGVzaWduIHJlZnJlc2gsIGFydCBkaXJlY3Rpb248L2xpPjxsaT5DdXN0b20gdGlja2V0IHB1cmNoYXNpbmcgcGxhdGZvcm0gVVggcmVzZWFyY2ggJmFtcDsgZGVzaWduPC9saT48bGk+UnVieSBvbiBSYWlscyBkZXZlbG9wbWVudCwgbWFpbnRlbmVuY2U8L2xpPjxsaT5HcmFwaGljIGRlc2lnbiBzdXBwb3J0PC9saT48bGk+QW5udWFsIHJlcG9ydCBkZXNpZ248L2xpPjwvdWw+PHA+PHN0cm9uZz5CZW5jaFByZXAuY29tIERlbGl2ZXJhYmxlczwvc3Ryb25nPjwvcD48dWwgY2xhc3M9XCJidWxsZXRzXCI+PGxpPlJlLWJyYW5kaW5nLCBjb21wbGV0ZSBCZW5jaFByZXAgaWRlbnRpdHkgcGFja2FnZTwvbGk+PGxpPlN1cHBvcnRlZCBjb21wYW55IHdpdGggYWxsIGRlc2lnbiBhbmQgdXggZnJvbSB6ZXJvIHRvIGVpZ2h0IG1pbGxpb24gaW4gZmluYW5jaW5nPC9saT48bGk+TGVhZCBhcnQgYW5kIFVYIGRpcmVjdGlvbiBmb3IgdHdvIHllYXJzPC9saT48bGk+RnJvbnQtZW5kIHVzaW5nIEJhY2tib25lIGFuZCBCb290c3RyYXA8L2xpPjxsaT5Vc2VyIHJlc2VhcmNoLCBldGhub2dyYXBoaWMgc3R1ZGllcywgdXNlciB0ZXN0aW5nPC9saT48bGk+RW1haWwgbWFya2V0aW5nIGNhZGVuY2Ugc3lzdGVtIGRlc2lnbiBhbmQgZXhlY3V0aW9uPC9saT48bGk+U2NyaXB0ZWQsIHN0b3J5Ym9hcmRlZCBhbmQgZXhlY3V0ZWQgYm90aCBhbmltYXRlZCBhbmQgbGl2ZSBtb3Rpb24gZXhwbGFpbmVyIHZpZGVvczwvbGk+PC91bD48cD48c3Ryb25nPlNuYXBTaGVldEFwcC5jb20gRGVsaXZlcmFibGVzPC9zdHJvbmc+PC9wPjx1bCBjbGFzcz1cImJ1bGxldHNcIj48bGk+TGFyZ2Ugc2NhbGUgcG9ydGFsIFVYIHJlc2VhcmNoIGFuZCBpbmZvcm1hdGlvbiBhcmNoaXRlY3R1cmU8L2xpPjxsaT5UaHJlZSByb3VuZHMgb2YgcmFwaWQgcHJvdG90eXBpbmcgYW5kIHVzZXIgdGVzdGluZzwvbGk+PGxpPkdyYXBoaWMgZGVzaWduIGFuZCBpbnRlcmFjdGlvbiBkZXNpZ24gZnJhbWV3b3JrPC9saT48bGk+VXNlciB0ZXN0aW5nPC9saT48L3VsPjxwPjxzdHJvbmc+TW9udGhseXMuY29tIERlbGl2ZXJhYmxlczwvc3Ryb25nPjwvcD48dWwgY2xhc3M9XCJidWxsZXRzXCI+PGxpPklkZW50aXR5IGFuZCBhcnQgZGlyZWN0aW9uPC9saT48bGk+UHJvZHVjdCBzdHJhdGVneSBhbmQgbmV3IGNvbXBhbnkgbGF1bmNoPC9saT48bGk+T25saW5lIG1hcmtldGluZyBzdHJhdGVneSwgaW5jbHVkaW5nIHRyYW5zYWN0aW9uYWwgZW1haWwsIHByb21vdGlvbiBkZXNpZ24gYW5kIGxlYWQgZ2VuZXJhdGlvbjwvbGk+PGxpPlByb2R1Y3QgZXhwZXJpZW5jZSBkZXNpZ24gYW5kIGZyb250LWVuZDwvbGk+PGxpPkNvbnRlbnQgc3RyYXRlZ3k8L2xpPjxsaT5TY3JpcHRlZCwgc3Rvcnlib2FyZGVkIGFuZCBleGVjdXRlZCBib3RoIGFuaW1hdGVkIGFuZCBsaXZlIG1vdGlvbiBleHBsYWluZXIgdmlkZW9zPC9saT48L3VsPjxwPjxzdHJvbmc+RG91Z2guY29tIERlbGl2ZXJhYmxlczwvc3Ryb25nPjwvcD48dWwgY2xhc3M9XCJidWxsZXRzIGJ1bGxldHNcIj48bGk+Q29uc3VtZXIgam91cm5leSBtYXBwaW5nIGFuZCBldGhub2dyYXBoaWMgc3R1ZGllczwvbGk+PGxpPlJhcGlkIHByb3RvdHlwaW5nLCBjb25jZXB0dWFsIGRlc2lnbjwvbGk+PGxpPk1lc3NhZ2luZyBzdHJhdGVneSwgdXNlciB0ZXN0aW5nPC9saT48L3VsPjxwPjxzdHJvbmc+R3JvdXBvbi5jb20gRGVsaXZlcmFibGVzPC9zdHJvbmc+PC9wPjx1bCBjbGFzcz1cImJ1bGxldHNcIj48bGk+RW1lcmdpbmcgbWFya2V0cyByZXNlYXJjaDwvbGk+PGxpPlJhcGlkIGRlc2lnbiBhbmQgcHJvdG90eXBpbmc8L2xpPjxsaT5WaXN1YWwgZGVzaWduIG9uIG5ldyBjb25jZXB0czwvbGk+PGxpPkVtYWlsIHNlZ21lbnRhdGlvbiByZXNlYXJjaDwvbGk+PC91bD48L2Rpdj48L2Rpdj48YnIvPjxkaXYgY2xhc3M9XCJyb3dcIj48ZGl2IGNsYXNzPVwibGFyZ2UtMTIgY29sdW1uc1wiPjxoNj5OT1ZFTUJFUiAyMDA3IC0gQVBSSUwgMjAxMDwvaDY+PGJyLz48aDI+RGV2ZWxvcGVyICZhbXA7IENvLWZvdW5kZXIsIERpbGx5ZW8uY29tPC9oMj48YnIvPjxwPkNvLWZvdW5kZWQsIGRlc2lnbmVkIGFuZCBkZXZlbG9wZWQgYSBkYWlseSBkZWFsIGVDb21tZXJjZSB3ZWJzaXRlLjwvcD48cD48c3Ryb25nPlJvbGU8L3N0cm9uZz48YnIvPkRlc2lnbmVkLCBkZXZlbG9wZWQgYW5kIGxhdW5jaGVkIGNvbXBhbmllcyBmaXJzdCBjYXJ0IHdpdGggUEhQLiBJdGVyYXRlZCBhbmQgZ3JldyBzaXRlIHRvIG1vcmUgdGhhbiB0d28gaHVuZHJlZCBhbmQgZmlmdHkgdGhvdXNhbmQgc3Vic2NyaWJlcnMgaW4gbGVzcyB0aGFuIG9uZSB5ZWFyLiA8L3A+PHA+PHN0cm9uZz5Ob3RlYWJsZSBTdGF0czwvc3Ryb25nPjwvcD48dWwgY2xhc3M9XCJidWxsZXRzXCI+PGxpPkJ1aWx0IGEgbGlzdCBvZiAyNTAsMDAwIHN1YnNjcmliZXJzIGluIHRoZSBmaXJzdCB5ZWFyPC9saT48bGk+UGl2b3RlZCBhbmQgdHdlYWtlZCBkZXNpZ24sIGJ1c2luZXNzIGFuZCBhcHByb2FjaCB0byAxMDAwIHRyYW5zYWN0aW9ucyBwZXIgZGFpbHk8L2xpPjxsaT5Tb2xkIGJ1c2luZXNzIGluIERlY2VtYmVyIDIwMDkgdG8gSW5ub3ZhdGl2ZSBDb21tZXJjZSBTb2x1dGlvbnM8L2xpPjwvdWw+PC9kaXY+PC9kaXY+PGJyLz48ZGl2IGNsYXNzPVwicm93XCI+PGRpdiBjbGFzcz1cImxhcmdlLTEyIGNvbHVtbnNcIj48aDY+TUFSQ0ggMjAwNSAtIE9DVE9CRVIgMjAwNzwvaDY+PGJyLz48aDI+U29sdXRpb25zIEFyY2hpdGVjdCAmYW1wOyBTZW5pb3IgRGV2ZWxvcGVyLCA8YSBocmVmPVwiaHR0cDovL3d3dy5tYW5pZmVzdGRpZ2l0YWwuY29tL1wiPk1hbmlmZXN0IERpZ2l0YWw8L2E+PC9oMj48YnIvPjxwPkJ1aWx0IGFuZCBtYW5hZ2VkIG11bHRpcGxlIENhcmVlckJ1aWxkZXIuY29tIG5pY2hlIHNpdGVzIGZvciB0aGUgbGFyZ2VzdCBpbmRlcGVuZGVudCBhZ2VuY3kgaW4gdGhlIG1pZHdlc3QuPC9wPjxwPjxzdHJvbmc+Um9sZTwvc3Ryb25nPjxici8+UmVzZWFyY2ggYW5kIGV4cGxvcmUgZW1lcmdpbmcgdGVjaG5vbG9naWVzLCBpbXBsZW1lbnQgc29sdXRpb25zIGFuZCBtYW5hZ2Ugb3RoZXIgZGV2ZWxvcGVycy4gV29ya2VkIHdpdGggYXNwLm5ldCBvbiBhIGRhaWx5IGJhc2lzIGZvciBhbG1vc3QgdHdvIHllYXJzLiA8L3A+PHA+PHN0cm9uZz5Ob3RlYWJsZSBBY2NvbXBsaXNobWVudHM8L3N0cm9uZz48L3A+PHVsIGNsYXNzPVwiYnVsbGV0c1wiPjxsaT5SZWNvZ25pemVkIGZvciBsYXVuY2hpbmcgaGlnaCBxdWFsaXR5IHdlYiBhcHAgZm9yIENhcmVlciBCdWlsZGVyIGluIHJlY29yZCB0aW1lPC9saT48bGk+TWFuYWdlZCBleHRyZW1lIFNFTyBwcm9qZWN0IHdpdGggbW9yZSB0aGFuIDUwMCB0aG91c2FuZCBsaW5rcywgcGFnZXMgYW5kIG92ZXIgOCBtaWxsaW9uIFVHQyBhcnRpZmFjdHM8L2xpPjxsaT5TaGlmdGVkIGFnZW5jaWVzIGRldmVsb3BtZW50IHByYWN0aWNlcyB0byB2YXJpb3VzIG5ldyBjbGllbnQtY2VudHJpYyBBSkFYIG1ldGhvZG9sb2dpZXM8L2xpPjxsaT5NYW5hZ2VkIG11bHRpcGxlIHByb2plY3RzIGNvbmN1cnJlbnRseSwgaW5jbHVkaW5nIGNob29zZWNoaWNhZ28uY29tIGFuZCBicmllZmluZy5jb208L2xpPjwvdWw+PC9kaXY+PC9kaXY+PGJyLz48ZGl2IGNsYXNzPVwicm93XCI+PGRpdiBjbGFzcz1cImxhcmdlLTEyIGNvbHVtbnNcIj48aDY+QVBSSUwgMjAwNCAtIEpBTlVBUlkgMjAwNzwvaDY+PGJyLz48aDI+SnVuaW9yIFBMRCBEZXZlbG9wZXIsICA8YSBocmVmPVwiaHR0cDovL3d3dy5hdmVudWUtaW5jLmNvbS9cIj5BdmVudWU8L2E+PC9oMj48YnIvPjxwPkZyb250LWVuZCBkZXZlbG9wZXIgYW5kIFVYIGRlc2lnbiBpbnRlcm4gZm9yIEF2ZW51ZSBBIFJhem9yZmlzaHNcXCcgbGVnYWN5IGNvbXBhbnksIEF2ZW51ZS1pbmMuPC9wPjxwPjxzdHJvbmc+Um9sZTwvc3Ryb25nPjxici8+RGV2ZWxvcCBmcm9udC1lbmQgZm9yIG11bHRpcGxlIGNsaWVudCB3ZWJzaXRlcywgaW5jbHVkaW5nIGZsb3IuY29tLCBhY2hpZXZlbWVudC5vcmcsIGNhbnlvbnJhbmNoLmNvbSBhbmQgdHVyYm9jaGVmLjwvcD48cD48c3Ryb25nPk5vdGVhYmxlIEFjY29tcGxpc2htZW50czwvc3Ryb25nPjwvcD48dWwgY2xhc3M9XCJidWxsZXRzXCI+PGxpPkV4ZWN1dGVkIGZyb250LWVuZCBwcm9qZWN0cyBvbi10aW1lIGFuZCB1bmRlci1idWRnZXQ8L2xpPjxsaT5Bc3NpZ25lZCBVWCBpbnRlcm5zaGlwIHJvbGUsIHJlY29nbml6ZWQgYnkgZGVzaWduIHRlYW0gYXMgYSB5b3VuZyB0YWxlbnQ8L2xpPjxsaT5XaXJlZnJhbWVkIGN1c3RvbSBzaG9wcGluZyBjYXJ0IHBsYXRmb3JtIGZvciBmbG9yLmNvbTwvbGk+PGxpPkRldmVsb3BlZCBpbnRlcm5hbCBTRU8gcHJhY3RpY2U8L2xpPjwvdWw+PC9kaXY+PC9kaXY+PGJyLz48ZGl2IGNsYXNzPVwicm93XCI+PGRpdiBjbGFzcz1cImxhcmdlLTEyIGNvbHVtbnNcIj48aDY+SlVMWSAyMDAwIC0gSkFOVUFSWSAyMDA0PC9oNj48YnIvPjxoMj5lQ29tbWVyY2UgRGV2ZWxvcGVyLCBBdG92YTwvaDI+PGJyLz48cD5HZW5lcmFsIHdlYiBkZXNpZ25lciBhbmQgZGV2ZWxvcGVyIGZvciBmYW1pbHkgb3duZWQgcGFpbnQgZGlzdHJpYnV0aW9uIGJ1c2luZXNzLiA8L3A+PHA+PHN0cm9uZz5Sb2xlPC9zdHJvbmc+PGJyLz5CdWlsdCBzZXZlcmFsIHNob3BwaW5nIGNhcnRzIGluIGNsYXNzaWMgQVNQIGFuZCBQSFAuIEdyZXcgYnVzaW5lc3MgdXNpbmcgb25saW5lIG1hcmtldGluZyBzdHJhdGVnaWVzIHRvIHR3byBtaWxsaW9uIGluIHJldmVudWUuIDwvcD48cD48c3Ryb25nPk5vdGVhYmxlIEFjY29tcGxpc2htZW50czwvc3Ryb25nPjwvcD48dWwgY2xhc3M9XCJidWxsZXRzXCI+PGxpPkJlY2FtZSBmaXJzdCBjb21wYW55IHRvIHNoaXAgcGFpbnRzIGFuZCBjb2F0aW5ncyBhY3Jvc3MgdGhlIFVuaXRlZCBTdGF0ZXM8L2xpPjxsaT5GaXJzdCBlbXBsb3llZSwgZGV2ZWxvcGVkIGNvbXBhbnkgdG8gMisgbWlsbGlvbiBpbiByZXZlbnVlIHdpdGggT3ZlcnR1cmUsIEdvb2dsZSBBZHdvcmRzIGFuZCBTRU88L2xpPjxsaT5DcmVhdGVkLCBtYXJrZXRlZCBhbmQgc3Vic2NyaWJlZCB2b2NhdGlvbmFsIHNjaG9vbCBmb3Igc3BlY2lhbHR5IGNvYXRpbmdzPC9saT48bGk+V29ya2VkIHdpdGggdG9wIEl0YWxpYW4gcGFpbnQgbWFudWZhY3R1cmVycyBvdmVyc2VhcyB0byBidWlsZCBleGNsdXNpdmUgZGlzdHJpYnV0aW9uIHJpZ2h0czwvbGk+PC91bD48L2Rpdj48L2Rpdj48YnIvPjxkaXYgY2xhc3M9XCJyb3dcIj48ZGl2IGNsYXNzPVwibGFyZ2UtMTIgY29sdW1uc1wiPjxoNj5TRVBURU1CRVIgMjAwMCAtIE1BWSAyMDAyPC9oNj48YnIvPjxoMj5FZHVjYXRpb248L2gyPjxici8+PHA+U2VsZiBlZHVjYXRlZCBkZXNpZ25lci9wcm9ncmFtbWVyIHdpdGggdm9jYXRpb25hbCB0cmFpbmluZy4gPC9wPjxwPjxzdHJvbmc+Q2VydGlmaWNhdGlvbnM8L3N0cm9uZz48YnIvPmlORVQrLCBBKyBDZXJ0aWZpY2F0aW9uIDwvcD48cD48c3Ryb25nPkFwcHJlbnRpY2VzaGlwPC9zdHJvbmc+PGJyLz5ZZWFyIGxvbmcgcGVyc29uYWwgYXBwcmVudGljZXNoaXAgd2l0aCBmaXJzdCBlbmdpbmVlciBhdCBBbWF6b24uY29tPC9wPjwvZGl2PjwvZGl2PjwvZGl2PjwvZGl2Pjxici8+PGJyLz4nXG5GcmFuY2hpbm8uY29udHJvbGxlciAnSm9iVGFwY2VudGl2ZUN0cmwnLCAoJHNjb3BlKSAtPlxuRnJhbmNoaW5vLmNvbnRyb2xsZXIgJ0pvYlRhcGNlbnRpdmVUd29DdHJsJywgKCRzY29wZSkgLT5cbkZyYW5jaGluby5jb250cm9sbGVyICdKb2JDcGdpb0N0cmwnLCAoJHNjb3BlKSAtPlxuRnJhbmNoaW5vLmNvbnRyb2xsZXIgJ0pvYk1lZHljYXRpb25DdHJsJywgKCRzY29wZSkgLT5cbkZyYW5jaGluby5jb250cm9sbGVyICdKb2JDc3RDdHJsJywgKCRzY29wZSkgLT5cbkZyYW5jaGluby5jb250cm9sbGVyICdMYW5kaW5nQ3RybCcsIFtcbiAgJyRzY29wZSdcbiAgKCRzY29wZSkgLT5cbiAgICAjIFRPRE86IE1vdmUgdGhpcyBtZW51IGludG8gYSBkaXJlY3RpdmVcbiAgICBkbyAtPlxuICAgICAgYm9keUVsID0gdW5kZWZpbmVkXG4gICAgICBjbG9zZWJ0biA9IHVuZGVmaW5lZFxuICAgICAgY29udGVudCA9IHVuZGVmaW5lZFxuICAgICAgaW5pdCA9IHVuZGVmaW5lZFxuICAgICAgaW5pdEV2ZW50cyA9IHVuZGVmaW5lZFxuICAgICAgaXNPcGVuID0gdW5kZWZpbmVkXG4gICAgICBvcGVuYnRuID0gdW5kZWZpbmVkXG4gICAgICB0b2dnbGVNZW51ID0gdW5kZWZpbmVkXG4gICAgICBib2R5RWwgPSBkb2N1bWVudC5ib2R5XG4gICAgICBjb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRlbnQtd3JhcCcpXG4gICAgICBvcGVuYnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ29wZW4tYnV0dG9uJylcbiAgICAgIGNsb3NlYnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Nsb3NlLWJ1dHRvbicpXG4gICAgICBpc09wZW4gPSBmYWxzZVxuXG4gICAgICBpbml0ID0gLT5cbiAgICAgICAgaW5pdEV2ZW50cygpXG4gICAgICAgIHJldHVyblxuXG4gICAgICBpbml0RXZlbnRzID0gLT5cbiAgICAgICAgJCA9IHVuZGVmaW5lZFxuICAgICAgICBjc3NJZCA9IHVuZGVmaW5lZFxuICAgICAgICBoZWFkID0gdW5kZWZpbmVkXG4gICAgICAgIGxpbmsgPSB1bmRlZmluZWRcbiAgICAgICAgaWYgZGV2aWNlLmRlc2t0b3AoKVxuICAgICAgICAgIFxuICAgICAgICBlbHNlIGlmIGRldmljZS5tb2JpbGUoKVxuICAgICAgICAgICQgPSBkb2N1bWVudFxuICAgICAgICAgIGNzc0lkID0gJ215Q3NzJ1xuICAgICAgICAgIGlmICEkLmdldEVsZW1lbnRCeUlkKGNzc0lkKVxuICAgICAgICAgICAgaGVhZCA9ICQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXVxuICAgICAgICAgICAgbGluayA9ICQuY3JlYXRlRWxlbWVudCgnbGluaycpXG4gICAgICAgICAgICBsaW5rLmlkID0gY3NzSWRcbiAgICAgICAgICAgIGxpbmsucmVsID0gJ3N0eWxlc2hlZXQnXG4gICAgICAgICAgICBsaW5rLnR5cGUgPSAndGV4dC9jc3MnXG4gICAgICAgICAgICBsaW5rLmhyZWYgPSAnaHR0cHM6Ly9jb2RlLmlvbmljZnJhbWV3b3JrLmNvbS8xLjAuMC1iZXRhLjEzL2Nzcy9pb25pYy5taW4uY3NzJ1xuICAgICAgICAgICAgbGluay5tZWRpYSA9ICdhbGwnXG4gICAgICAgICAgICBoZWFkLmFwcGVuZENoaWxkIGxpbmtcbiAgICAgICAgaWYgZGV2aWNlLmRlc2t0b3AoKVxuICAgICAgICAgIG9wZW5idG4uYWRkRXZlbnRMaXN0ZW5lciAnY2xpY2snLCB0b2dnbGVNZW51XG4gICAgICAgICAgaWYgY2xvc2VidG5cbiAgICAgICAgICAgIGNsb3NlYnRuLmFkZEV2ZW50TGlzdGVuZXIgJ2NsaWNrJywgdG9nZ2xlTWVudVxuICAgICAgICAgIGNvbnRlbnQuYWRkRXZlbnRMaXN0ZW5lciAnY2xpY2snLCAoZXYpIC0+XG4gICAgICAgICAgICB0YXJnZXQgPSB1bmRlZmluZWRcbiAgICAgICAgICAgIHRhcmdldCA9IGV2LnRhcmdldFxuICAgICAgICAgICAgaWYgaXNPcGVuIGFuZCB0YXJnZXQgIT0gb3BlbmJ0blxuICAgICAgICAgICAgICB0b2dnbGVNZW51KClcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgIHJldHVyblxuICAgICAgICBlbHNlXG5cbiAgICAgICAgXG5cbiAgICAgIHRvZ2dsZU1lbnUgPSAtPlxuICAgICAgICBpZiBpc09wZW5cbiAgICAgICAgICBjbGFzc2llLnJlbW92ZSBib2R5RWwsICdzaG93LW1lbnUnXG4gICAgICAgIGVsc2VcbiAgICAgICAgICBjbGFzc2llLmFkZCBib2R5RWwsICdzaG93LW1lbnUnXG4gICAgICAgIGlzT3BlbiA9ICFpc09wZW5cbiAgICAgICAgcmV0dXJuXG5cbiAgICAgIGluaXQoKVxuICAgICAgcmV0dXJuXG5dXG5cbkZyYW5jaGluby5jb250cm9sbGVyICdQcm9kdWN0c0N0cmwnLCBbXG4gICckc2NvcGUnXG4gICgkc2NvcGUpIC0+XG4gICAgIyBUT0RPOiBNb3ZlIHRoaXMgbWVudSBpbnRvIGEgZGlyZWN0aXZlXG4gICAgZG8gLT5cbiAgICAgIGJvZHlFbCA9IHVuZGVmaW5lZFxuICAgICAgY2xvc2VidG4gPSB1bmRlZmluZWRcbiAgICAgIGNvbnRlbnQgPSB1bmRlZmluZWRcbiAgICAgIGluaXQgPSB1bmRlZmluZWRcbiAgICAgIGluaXRFdmVudHMgPSB1bmRlZmluZWRcbiAgICAgIGlzT3BlbiA9IHVuZGVmaW5lZFxuICAgICAgb3BlbmJ0biA9IHVuZGVmaW5lZFxuICAgICAgdG9nZ2xlTWVudSA9IHVuZGVmaW5lZFxuICAgICAgYm9keUVsID0gZG9jdW1lbnQuYm9keVxuICAgICAgY29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250ZW50LXdyYXAnKVxuICAgICAgb3BlbmJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvcGVuLWJ1dHRvbicpXG4gICAgICBjbG9zZWJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjbG9zZS1idXR0b24nKVxuICAgICAgaXNPcGVuID0gZmFsc2VcblxuICAgICAgaW5pdCA9IC0+XG4gICAgICAgIGluaXRFdmVudHMoKVxuICAgICAgICByZXR1cm5cblxuICAgICAgaW5pdEV2ZW50cyA9IC0+XG4gICAgICAgICQgPSB1bmRlZmluZWRcbiAgICAgICAgY3NzSWQgPSB1bmRlZmluZWRcbiAgICAgICAgaGVhZCA9IHVuZGVmaW5lZFxuICAgICAgICBsaW5rID0gdW5kZWZpbmVkXG4gICAgICAgIGlmIGRldmljZS5kZXNrdG9wKClcbiAgICAgICAgICBcbiAgICAgICAgZWxzZSBpZiBkZXZpY2UubW9iaWxlKClcbiAgICAgICAgICAkID0gZG9jdW1lbnRcbiAgICAgICAgICBjc3NJZCA9ICdteUNzcydcbiAgICAgICAgICBpZiAhJC5nZXRFbGVtZW50QnlJZChjc3NJZClcbiAgICAgICAgICAgIGhlYWQgPSAkLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF1cbiAgICAgICAgICAgIGxpbmsgPSAkLmNyZWF0ZUVsZW1lbnQoJ2xpbmsnKVxuICAgICAgICAgICAgbGluay5pZCA9IGNzc0lkXG4gICAgICAgICAgICBsaW5rLnJlbCA9ICdzdHlsZXNoZWV0J1xuICAgICAgICAgICAgbGluay50eXBlID0gJ3RleHQvY3NzJ1xuICAgICAgICAgICAgbGluay5ocmVmID0gJ2h0dHBzOi8vY29kZS5pb25pY2ZyYW1ld29yay5jb20vMS4wLjAtYmV0YS4xMy9jc3MvaW9uaWMubWluLmNzcydcbiAgICAgICAgICAgIGxpbmsubWVkaWEgPSAnYWxsJ1xuICAgICAgICAgICAgaGVhZC5hcHBlbmRDaGlsZCBsaW5rXG4gICAgICAgIGlmIGRldmljZS5kZXNrdG9wKClcbiAgICAgICAgICBvcGVuYnRuLmFkZEV2ZW50TGlzdGVuZXIgJ2NsaWNrJywgdG9nZ2xlTWVudVxuICAgICAgICAgIGlmIGNsb3NlYnRuXG4gICAgICAgICAgICBjbG9zZWJ0bi5hZGRFdmVudExpc3RlbmVyICdjbGljaycsIHRvZ2dsZU1lbnVcbiAgICAgICAgICBjb250ZW50LmFkZEV2ZW50TGlzdGVuZXIgJ2NsaWNrJywgKGV2KSAtPlxuICAgICAgICAgICAgdGFyZ2V0ID0gdW5kZWZpbmVkXG4gICAgICAgICAgICB0YXJnZXQgPSBldi50YXJnZXRcbiAgICAgICAgICAgIGlmIGlzT3BlbiBhbmQgdGFyZ2V0ICE9IG9wZW5idG5cbiAgICAgICAgICAgICAgdG9nZ2xlTWVudSgpXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgZWxzZVxuXG4gICAgICAgIFxuXG4gICAgICB0b2dnbGVNZW51ID0gLT5cbiAgICAgICAgaWYgaXNPcGVuXG4gICAgICAgICAgY2xhc3NpZS5yZW1vdmUgYm9keUVsLCAnc2hvdy1tZW51J1xuICAgICAgICBlbHNlXG4gICAgICAgICAgY2xhc3NpZS5hZGQgYm9keUVsLCAnc2hvdy1tZW51J1xuICAgICAgICBpc09wZW4gPSAhaXNPcGVuXG4gICAgICAgIHJldHVyblxuXG4gICAgICBpbml0KClcbiAgICAgIHJldHVyblxuXVxuXG5GcmFuY2hpbm8uY29udHJvbGxlciAnRXhwYW5zaW9ucGFja3NDdHJsJywgW1xuICAnJHNjb3BlJ1xuICAoJHNjb3BlKSAtPlxuICAgICMgVE9ETzogTW92ZSB0aGlzIG1lbnUgaW50byBhIGRpcmVjdGl2ZSBjYW4ndCBrZWVwIGFkZGluZyB0aGlzIGxpa2UgdGhpcyBldmVyeXdoZXJlXG4gICAgb25QbGF5ZXJTdGF0ZUNoYW5nZSA9IChldmVudCkgLT5cbiAgICAgICQoXCIuc3RhcnQtdmlkZW9cIikuZmFkZUluIFwibm9ybWFsXCIgIGlmIGV2ZW50LmRhdGEgaXMgWVQuUGxheWVyU3RhdGUuRU5ERURcbiAgICBkbyAtPlxuICAgICAgYm9keUVsID0gdW5kZWZpbmVkXG4gICAgICBjbG9zZWJ0biA9IHVuZGVmaW5lZFxuICAgICAgY29udGVudCA9IHVuZGVmaW5lZFxuICAgICAgaW5pdCA9IHVuZGVmaW5lZFxuICAgICAgaW5pdEV2ZW50cyA9IHVuZGVmaW5lZFxuICAgICAgaXNPcGVuID0gdW5kZWZpbmVkXG4gICAgICBvcGVuYnRuID0gdW5kZWZpbmVkXG4gICAgICB0b2dnbGVNZW51ID0gdW5kZWZpbmVkXG4gICAgICBib2R5RWwgPSBkb2N1bWVudC5ib2R5XG4gICAgICBjb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRlbnQtd3JhcCcpXG4gICAgICBvcGVuYnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ29wZW4tYnV0dG9uJylcbiAgICAgIGNsb3NlYnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Nsb3NlLWJ1dHRvbicpXG4gICAgICBpc09wZW4gPSBmYWxzZVxuXG4gICAgICBpbml0ID0gLT5cbiAgICAgICAgaW5pdEV2ZW50cygpXG4gICAgICAgIHJldHVyblxuXG4gICAgICBpbml0RXZlbnRzID0gLT5cbiAgICAgICAgJCA9IHVuZGVmaW5lZFxuICAgICAgICBjc3NJZCA9IHVuZGVmaW5lZFxuICAgICAgICBoZWFkID0gdW5kZWZpbmVkXG4gICAgICAgIGxpbmsgPSB1bmRlZmluZWRcbiAgICAgICAgaWYgZGV2aWNlLmRlc2t0b3AoKVxuICAgICAgICAgIFxuICAgICAgICBlbHNlIGlmIGRldmljZS5tb2JpbGUoKVxuICAgICAgICAgICQgPSBkb2N1bWVudFxuICAgICAgICAgIGNzc0lkID0gJ215Q3NzJ1xuICAgICAgICAgIGlmICEkLmdldEVsZW1lbnRCeUlkKGNzc0lkKVxuICAgICAgICAgICAgaGVhZCA9ICQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXVxuICAgICAgICAgICAgbGluayA9ICQuY3JlYXRlRWxlbWVudCgnbGluaycpXG4gICAgICAgICAgICBsaW5rLmlkID0gY3NzSWRcbiAgICAgICAgICAgIGxpbmsucmVsID0gJ3N0eWxlc2hlZXQnXG4gICAgICAgICAgICBsaW5rLnR5cGUgPSAndGV4dC9jc3MnXG4gICAgICAgICAgICBsaW5rLmhyZWYgPSAnaHR0cHM6Ly9jb2RlLmlvbmljZnJhbWV3b3JrLmNvbS8xLjAuMC1iZXRhLjEzL2Nzcy9pb25pYy5taW4uY3NzJ1xuICAgICAgICAgICAgbGluay5tZWRpYSA9ICdhbGwnXG4gICAgICAgICAgICBoZWFkLmFwcGVuZENoaWxkIGxpbmtcbiAgICAgICAgaWYgZGV2aWNlLmRlc2t0b3AoKVxuICAgICAgICAgIG9wZW5idG4uYWRkRXZlbnRMaXN0ZW5lciAnY2xpY2snLCB0b2dnbGVNZW51XG4gICAgICAgICAgaWYgY2xvc2VidG5cbiAgICAgICAgICAgIGNsb3NlYnRuLmFkZEV2ZW50TGlzdGVuZXIgJ2NsaWNrJywgdG9nZ2xlTWVudVxuICAgICAgICAgIGNvbnRlbnQuYWRkRXZlbnRMaXN0ZW5lciAnY2xpY2snLCAoZXYpIC0+XG4gICAgICAgICAgICB0YXJnZXQgPSB1bmRlZmluZWRcbiAgICAgICAgICAgIHRhcmdldCA9IGV2LnRhcmdldFxuICAgICAgICAgICAgaWYgaXNPcGVuIGFuZCB0YXJnZXQgIT0gb3BlbmJ0blxuICAgICAgICAgICAgICB0b2dnbGVNZW51KClcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgIHJldHVyblxuICAgICAgICBlbHNlXG5cbiAgICAgICAgXG5cbiAgICAgIHRvZ2dsZU1lbnUgPSAtPlxuICAgICAgICBpZiBpc09wZW5cbiAgICAgICAgICBjbGFzc2llLnJlbW92ZSBib2R5RWwsICdzaG93LW1lbnUnXG4gICAgICAgIGVsc2VcbiAgICAgICAgICBjbGFzc2llLmFkZCBib2R5RWwsICdzaG93LW1lbnUnXG4gICAgICAgIGlzT3BlbiA9ICFpc09wZW5cbiAgICAgICAgcmV0dXJuXG5cbiAgICAgIGluaXQoKVxuICAgICAgcmV0dXJuXG5dXG5GcmFuY2hpbm8uY29udHJvbGxlciAnSm9iS291cG5DdHJsJywgKCRzY29wZSkgLT5cbkZyYW5jaGluby5jb250cm9sbGVyICdMYW5kaW5nQ3RybCcsIFtcbiAgJyRzY29wZSdcbiAgKCRzY29wZSkgLT5cbiAgICAjIFRPRE86IE1vdmUgdGhpcyBtZW51IGludG8gYSBkaXJlY3RpdmVcbiAgICBkbyAtPlxuICAgICAgYm9keUVsID0gdW5kZWZpbmVkXG4gICAgICBjbG9zZWJ0biA9IHVuZGVmaW5lZFxuICAgICAgY29udGVudCA9IHVuZGVmaW5lZFxuICAgICAgaW5pdCA9IHVuZGVmaW5lZFxuICAgICAgaW5pdEV2ZW50cyA9IHVuZGVmaW5lZFxuICAgICAgaXNPcGVuID0gdW5kZWZpbmVkXG4gICAgICBvcGVuYnRuID0gdW5kZWZpbmVkXG4gICAgICB0b2dnbGVNZW51ID0gdW5kZWZpbmVkXG4gICAgICBib2R5RWwgPSBkb2N1bWVudC5ib2R5XG4gICAgICBjb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRlbnQtd3JhcCcpXG4gICAgICBvcGVuYnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ29wZW4tYnV0dG9uJylcbiAgICAgIGNsb3NlYnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Nsb3NlLWJ1dHRvbicpXG4gICAgICBpc09wZW4gPSBmYWxzZVxuXG4gICAgICBpbml0ID0gLT5cbiAgICAgICAgaW5pdEV2ZW50cygpXG4gICAgICAgIHJldHVyblxuXG4gICAgICBpbml0RXZlbnRzID0gLT5cbiAgICAgICAgJCA9IHVuZGVmaW5lZFxuICAgICAgICBjc3NJZCA9IHVuZGVmaW5lZFxuICAgICAgICBoZWFkID0gdW5kZWZpbmVkXG4gICAgICAgIGxpbmsgPSB1bmRlZmluZWRcbiAgICAgICAgaWYgZGV2aWNlLmRlc2t0b3AoKVxuICAgICAgICAgIFxuICAgICAgICBlbHNlIGlmIGRldmljZS5tb2JpbGUoKVxuICAgICAgICAgICQgPSBkb2N1bWVudFxuICAgICAgICAgIGNzc0lkID0gJ215Q3NzJ1xuICAgICAgICAgIGlmICEkLmdldEVsZW1lbnRCeUlkKGNzc0lkKVxuICAgICAgICAgICAgaGVhZCA9ICQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXVxuICAgICAgICAgICAgbGluayA9ICQuY3JlYXRlRWxlbWVudCgnbGluaycpXG4gICAgICAgICAgICBsaW5rLmlkID0gY3NzSWRcbiAgICAgICAgICAgIGxpbmsucmVsID0gJ3N0eWxlc2hlZXQnXG4gICAgICAgICAgICBsaW5rLnR5cGUgPSAndGV4dC9jc3MnXG4gICAgICAgICAgICBsaW5rLmhyZWYgPSAnaHR0cHM6Ly9jb2RlLmlvbmljZnJhbWV3b3JrLmNvbS8xLjAuMC1iZXRhLjEzL2Nzcy9pb25pYy5taW4uY3NzJ1xuICAgICAgICAgICAgbGluay5tZWRpYSA9ICdhbGwnXG4gICAgICAgICAgICBoZWFkLmFwcGVuZENoaWxkIGxpbmtcbiAgICAgICAgaWYgZGV2aWNlLmRlc2t0b3AoKVxuICAgICAgICAgIG9wZW5idG4uYWRkRXZlbnRMaXN0ZW5lciAnY2xpY2snLCB0b2dnbGVNZW51XG4gICAgICAgICAgaWYgY2xvc2VidG5cbiAgICAgICAgICAgIGNsb3NlYnRuLmFkZEV2ZW50TGlzdGVuZXIgJ2NsaWNrJywgdG9nZ2xlTWVudVxuICAgICAgICAgIGNvbnRlbnQuYWRkRXZlbnRMaXN0ZW5lciAnY2xpY2snLCAoZXYpIC0+XG4gICAgICAgICAgICB0YXJnZXQgPSB1bmRlZmluZWRcbiAgICAgICAgICAgIHRhcmdldCA9IGV2LnRhcmdldFxuICAgICAgICAgICAgaWYgaXNPcGVuIGFuZCB0YXJnZXQgIT0gb3BlbmJ0blxuICAgICAgICAgICAgICB0b2dnbGVNZW51KClcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgIHJldHVyblxuICAgICAgICBlbHNlXG5cbiAgICAgICAgXG5cbiAgICAgIHRvZ2dsZU1lbnUgPSAtPlxuICAgICAgICBpZiBpc09wZW5cbiAgICAgICAgICBjbGFzc2llLnJlbW92ZSBib2R5RWwsICdzaG93LW1lbnUnXG4gICAgICAgIGVsc2VcbiAgICAgICAgICBjbGFzc2llLmFkZCBib2R5RWwsICdzaG93LW1lbnUnXG4gICAgICAgIGlzT3BlbiA9ICFpc09wZW5cbiAgICAgICAgcmV0dXJuXG5cbiAgICAgIGluaXQoKVxuICAgICAgcmV0dXJuXG5dXG5cbkZyYW5jaGluby5jb250cm9sbGVyICdCb29rQ3RybCcsIFtcbiAgJyRzY29wZSdcbiAgKCRzY29wZSkgLT5cbiAgICAjIFRPRE86IE1vdmUgdGhpcyBtZW51IGludG8gYSBkaXJlY3RpdmUgY2FuJ3Qga2VlcCBhZGRpbmcgdGhpcyBsaWtlIHRoaXMgZXZlcnl3aGVyZVxuICAgIG9uUGxheWVyU3RhdGVDaGFuZ2UgPSAoZXZlbnQpIC0+XG4gICAgICAkKFwiLnN0YXJ0LXZpZGVvXCIpLmZhZGVJbiBcIm5vcm1hbFwiICBpZiBldmVudC5kYXRhIGlzIFlULlBsYXllclN0YXRlLkVOREVEXG4gICAgZG8gLT5cbiAgICAgIGJvZHlFbCA9IHVuZGVmaW5lZFxuICAgICAgY2xvc2VidG4gPSB1bmRlZmluZWRcbiAgICAgIGNvbnRlbnQgPSB1bmRlZmluZWRcbiAgICAgIGluaXQgPSB1bmRlZmluZWRcbiAgICAgIGluaXRFdmVudHMgPSB1bmRlZmluZWRcbiAgICAgIGlzT3BlbiA9IHVuZGVmaW5lZFxuICAgICAgb3BlbmJ0biA9IHVuZGVmaW5lZFxuICAgICAgdG9nZ2xlTWVudSA9IHVuZGVmaW5lZFxuICAgICAgYm9keUVsID0gZG9jdW1lbnQuYm9keVxuICAgICAgY29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250ZW50LXdyYXAnKVxuICAgICAgb3BlbmJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvcGVuLWJ1dHRvbicpXG4gICAgICBjbG9zZWJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjbG9zZS1idXR0b24nKVxuICAgICAgaXNPcGVuID0gZmFsc2VcblxuICAgICAgaW5pdCA9IC0+XG4gICAgICAgIGluaXRFdmVudHMoKVxuICAgICAgICByZXR1cm5cblxuICAgICAgaW5pdEV2ZW50cyA9IC0+XG4gICAgICAgICQgPSB1bmRlZmluZWRcbiAgICAgICAgY3NzSWQgPSB1bmRlZmluZWRcbiAgICAgICAgaGVhZCA9IHVuZGVmaW5lZFxuICAgICAgICBsaW5rID0gdW5kZWZpbmVkXG4gICAgICAgIGlmIGRldmljZS5kZXNrdG9wKClcbiAgICAgICAgICBcbiAgICAgICAgZWxzZSBpZiBkZXZpY2UubW9iaWxlKClcbiAgICAgICAgICAkID0gZG9jdW1lbnRcbiAgICAgICAgICBjc3NJZCA9ICdteUNzcydcbiAgICAgICAgICBpZiAhJC5nZXRFbGVtZW50QnlJZChjc3NJZClcbiAgICAgICAgICAgIGhlYWQgPSAkLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF1cbiAgICAgICAgICAgIGxpbmsgPSAkLmNyZWF0ZUVsZW1lbnQoJ2xpbmsnKVxuICAgICAgICAgICAgbGluay5pZCA9IGNzc0lkXG4gICAgICAgICAgICBsaW5rLnJlbCA9ICdzdHlsZXNoZWV0J1xuICAgICAgICAgICAgbGluay50eXBlID0gJ3RleHQvY3NzJ1xuICAgICAgICAgICAgbGluay5ocmVmID0gJ2h0dHBzOi8vY29kZS5pb25pY2ZyYW1ld29yay5jb20vMS4wLjAtYmV0YS4xMy9jc3MvaW9uaWMubWluLmNzcydcbiAgICAgICAgICAgIGxpbmsubWVkaWEgPSAnYWxsJ1xuICAgICAgICAgICAgaGVhZC5hcHBlbmRDaGlsZCBsaW5rXG4gICAgICAgIGlmIGRldmljZS5kZXNrdG9wKClcbiAgICAgICAgICBvcGVuYnRuLmFkZEV2ZW50TGlzdGVuZXIgJ2NsaWNrJywgdG9nZ2xlTWVudVxuICAgICAgICAgIGlmIGNsb3NlYnRuXG4gICAgICAgICAgICBjbG9zZWJ0bi5hZGRFdmVudExpc3RlbmVyICdjbGljaycsIHRvZ2dsZU1lbnVcbiAgICAgICAgICBjb250ZW50LmFkZEV2ZW50TGlzdGVuZXIgJ2NsaWNrJywgKGV2KSAtPlxuICAgICAgICAgICAgdGFyZ2V0ID0gdW5kZWZpbmVkXG4gICAgICAgICAgICB0YXJnZXQgPSBldi50YXJnZXRcbiAgICAgICAgICAgIGlmIGlzT3BlbiBhbmQgdGFyZ2V0ICE9IG9wZW5idG5cbiAgICAgICAgICAgICAgdG9nZ2xlTWVudSgpXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgZWxzZVxuXG4gICAgICAgIFxuXG4gICAgICB0b2dnbGVNZW51ID0gLT5cbiAgICAgICAgaWYgaXNPcGVuXG4gICAgICAgICAgY2xhc3NpZS5yZW1vdmUgYm9keUVsLCAnc2hvdy1tZW51J1xuICAgICAgICBlbHNlXG4gICAgICAgICAgY2xhc3NpZS5hZGQgYm9keUVsLCAnc2hvdy1tZW51J1xuICAgICAgICBpc09wZW4gPSAhaXNPcGVuXG4gICAgICAgIHJldHVyblxuXG4gICAgICBpbml0KClcbiAgICAgIHJldHVyblxuXVxuXG5GcmFuY2hpbm8uY29udHJvbGxlciAnQ2FzdEN0cmwnLCBbXG4gICckc2NvcGUnXG4gICgkc2NvcGUpIC0+XG4gICAgIyBUT0RPOiBNb3ZlIHRoaXMgbWVudSBpbnRvIGEgZGlyZWN0aXZlIGNhbid0IGtlZXAgYWRkaW5nIHRoaXMgbGlrZSB0aGlzIGV2ZXJ5d2hlcmVcbiAgICBvblBsYXllclN0YXRlQ2hhbmdlID0gKGV2ZW50KSAtPlxuICAgICAgJChcIi5zdGFydC12aWRlb1wiKS5mYWRlSW4gXCJub3JtYWxcIiAgaWYgZXZlbnQuZGF0YSBpcyBZVC5QbGF5ZXJTdGF0ZS5FTkRFRFxuICAgIGRvIC0+XG4gICAgICBib2R5RWwgPSB1bmRlZmluZWRcbiAgICAgIGNsb3NlYnRuID0gdW5kZWZpbmVkXG4gICAgICBjb250ZW50ID0gdW5kZWZpbmVkXG4gICAgICBpbml0ID0gdW5kZWZpbmVkXG4gICAgICBpbml0RXZlbnRzID0gdW5kZWZpbmVkXG4gICAgICBpc09wZW4gPSB1bmRlZmluZWRcbiAgICAgIG9wZW5idG4gPSB1bmRlZmluZWRcbiAgICAgIHRvZ2dsZU1lbnUgPSB1bmRlZmluZWRcbiAgICAgIGJvZHlFbCA9IGRvY3VtZW50LmJvZHlcbiAgICAgIGNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGVudC13cmFwJylcbiAgICAgIG9wZW5idG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb3Blbi1idXR0b24nKVxuICAgICAgY2xvc2VidG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2xvc2UtYnV0dG9uJylcbiAgICAgIGlzT3BlbiA9IGZhbHNlXG5cbiAgICAgIGluaXQgPSAtPlxuICAgICAgICBpbml0RXZlbnRzKClcbiAgICAgICAgcmV0dXJuXG5cbiAgICAgIGluaXRFdmVudHMgPSAtPlxuICAgICAgICAkID0gdW5kZWZpbmVkXG4gICAgICAgIGNzc0lkID0gdW5kZWZpbmVkXG4gICAgICAgIGhlYWQgPSB1bmRlZmluZWRcbiAgICAgICAgbGluayA9IHVuZGVmaW5lZFxuICAgICAgICBpZiBkZXZpY2UuZGVza3RvcCgpXG4gICAgICAgICAgXG4gICAgICAgIGVsc2UgaWYgZGV2aWNlLm1vYmlsZSgpXG4gICAgICAgICAgJCA9IGRvY3VtZW50XG4gICAgICAgICAgY3NzSWQgPSAnbXlDc3MnXG4gICAgICAgICAgaWYgISQuZ2V0RWxlbWVudEJ5SWQoY3NzSWQpXG4gICAgICAgICAgICBoZWFkID0gJC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdXG4gICAgICAgICAgICBsaW5rID0gJC5jcmVhdGVFbGVtZW50KCdsaW5rJylcbiAgICAgICAgICAgIGxpbmsuaWQgPSBjc3NJZFxuICAgICAgICAgICAgbGluay5yZWwgPSAnc3R5bGVzaGVldCdcbiAgICAgICAgICAgIGxpbmsudHlwZSA9ICd0ZXh0L2NzcydcbiAgICAgICAgICAgIGxpbmsuaHJlZiA9ICdodHRwczovL2NvZGUuaW9uaWNmcmFtZXdvcmsuY29tLzEuMC4wLWJldGEuMTMvY3NzL2lvbmljLm1pbi5jc3MnXG4gICAgICAgICAgICBsaW5rLm1lZGlhID0gJ2FsbCdcbiAgICAgICAgICAgIGhlYWQuYXBwZW5kQ2hpbGQgbGlua1xuICAgICAgICBpZiBkZXZpY2UuZGVza3RvcCgpXG4gICAgICAgICAgb3BlbmJ0bi5hZGRFdmVudExpc3RlbmVyICdjbGljaycsIHRvZ2dsZU1lbnVcbiAgICAgICAgICBpZiBjbG9zZWJ0blxuICAgICAgICAgICAgY2xvc2VidG4uYWRkRXZlbnRMaXN0ZW5lciAnY2xpY2snLCB0b2dnbGVNZW51XG4gICAgICAgICAgY29udGVudC5hZGRFdmVudExpc3RlbmVyICdjbGljaycsIChldikgLT5cbiAgICAgICAgICAgIHRhcmdldCA9IHVuZGVmaW5lZFxuICAgICAgICAgICAgdGFyZ2V0ID0gZXYudGFyZ2V0XG4gICAgICAgICAgICBpZiBpc09wZW4gYW5kIHRhcmdldCAhPSBvcGVuYnRuXG4gICAgICAgICAgICAgIHRvZ2dsZU1lbnUoKVxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIGVsc2VcblxuICAgICAgICBcblxuICAgICAgdG9nZ2xlTWVudSA9IC0+XG4gICAgICAgIGlmIGlzT3BlblxuICAgICAgICAgIGNsYXNzaWUucmVtb3ZlIGJvZHlFbCwgJ3Nob3ctbWVudSdcbiAgICAgICAgZWxzZVxuICAgICAgICAgIGNsYXNzaWUuYWRkIGJvZHlFbCwgJ3Nob3ctbWVudSdcbiAgICAgICAgaXNPcGVuID0gIWlzT3BlblxuICAgICAgICByZXR1cm5cblxuICAgICAgaW5pdCgpXG4gICAgICByZXR1cm5cbl1cblxuRnJhbmNoaW5vLmNvbnRyb2xsZXIgJ05vZGVDdHJsJywgW1xuICAnJHNjb3BlJ1xuICAoJHNjb3BlKSAtPlxuICAgICMgVE9ETzogTW92ZSB0aGlzIG1lbnUgaW50byBhIGRpcmVjdGl2ZSBjYW4ndCBrZWVwIGFkZGluZyB0aGlzIGxpa2UgdGhpcyBldmVyeXdoZXJlXG4gICAgb25QbGF5ZXJTdGF0ZUNoYW5nZSA9IChldmVudCkgLT5cbiAgICAgICQoXCIuc3RhcnQtdmlkZW9cIikuZmFkZUluIFwibm9ybWFsXCIgIGlmIGV2ZW50LmRhdGEgaXMgWVQuUGxheWVyU3RhdGUuRU5ERURcbiAgICBkbyAtPlxuICAgICAgYm9keUVsID0gdW5kZWZpbmVkXG4gICAgICBjbG9zZWJ0biA9IHVuZGVmaW5lZFxuICAgICAgY29udGVudCA9IHVuZGVmaW5lZFxuICAgICAgaW5pdCA9IHVuZGVmaW5lZFxuICAgICAgaW5pdEV2ZW50cyA9IHVuZGVmaW5lZFxuICAgICAgaXNPcGVuID0gdW5kZWZpbmVkXG4gICAgICBvcGVuYnRuID0gdW5kZWZpbmVkXG4gICAgICB0b2dnbGVNZW51ID0gdW5kZWZpbmVkXG4gICAgICBib2R5RWwgPSBkb2N1bWVudC5ib2R5XG4gICAgICBjb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRlbnQtd3JhcCcpXG4gICAgICBvcGVuYnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ29wZW4tYnV0dG9uJylcbiAgICAgIGNsb3NlYnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Nsb3NlLWJ1dHRvbicpXG4gICAgICBpc09wZW4gPSBmYWxzZVxuXG4gICAgICBpbml0ID0gLT5cbiAgICAgICAgaW5pdEV2ZW50cygpXG4gICAgICAgIHJldHVyblxuXG4gICAgICBpbml0RXZlbnRzID0gLT5cbiAgICAgICAgJCA9IHVuZGVmaW5lZFxuICAgICAgICBjc3NJZCA9IHVuZGVmaW5lZFxuICAgICAgICBoZWFkID0gdW5kZWZpbmVkXG4gICAgICAgIGxpbmsgPSB1bmRlZmluZWRcbiAgICAgICAgaWYgZGV2aWNlLmRlc2t0b3AoKVxuICAgICAgICAgIFxuICAgICAgICBlbHNlIGlmIGRldmljZS5tb2JpbGUoKVxuICAgICAgICAgICQgPSBkb2N1bWVudFxuICAgICAgICAgIGNzc0lkID0gJ215Q3NzJ1xuICAgICAgICAgIGlmICEkLmdldEVsZW1lbnRCeUlkKGNzc0lkKVxuICAgICAgICAgICAgaGVhZCA9ICQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXVxuICAgICAgICAgICAgbGluayA9ICQuY3JlYXRlRWxlbWVudCgnbGluaycpXG4gICAgICAgICAgICBsaW5rLmlkID0gY3NzSWRcbiAgICAgICAgICAgIGxpbmsucmVsID0gJ3N0eWxlc2hlZXQnXG4gICAgICAgICAgICBsaW5rLnR5cGUgPSAndGV4dC9jc3MnXG4gICAgICAgICAgICBsaW5rLmhyZWYgPSAnaHR0cHM6Ly9jb2RlLmlvbmljZnJhbWV3b3JrLmNvbS8xLjAuMC1iZXRhLjEzL2Nzcy9pb25pYy5taW4uY3NzJ1xuICAgICAgICAgICAgbGluay5tZWRpYSA9ICdhbGwnXG4gICAgICAgICAgICBoZWFkLmFwcGVuZENoaWxkIGxpbmtcbiAgICAgICAgaWYgZGV2aWNlLmRlc2t0b3AoKVxuICAgICAgICAgIG9wZW5idG4uYWRkRXZlbnRMaXN0ZW5lciAnY2xpY2snLCB0b2dnbGVNZW51XG4gICAgICAgICAgaWYgY2xvc2VidG5cbiAgICAgICAgICAgIGNsb3NlYnRuLmFkZEV2ZW50TGlzdGVuZXIgJ2NsaWNrJywgdG9nZ2xlTWVudVxuICAgICAgICAgIGNvbnRlbnQuYWRkRXZlbnRMaXN0ZW5lciAnY2xpY2snLCAoZXYpIC0+XG4gICAgICAgICAgICB0YXJnZXQgPSB1bmRlZmluZWRcbiAgICAgICAgICAgIHRhcmdldCA9IGV2LnRhcmdldFxuICAgICAgICAgICAgaWYgaXNPcGVuIGFuZCB0YXJnZXQgIT0gb3BlbmJ0blxuICAgICAgICAgICAgICB0b2dnbGVNZW51KClcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgIHJldHVyblxuICAgICAgICBlbHNlXG5cbiAgICAgICAgXG5cbiAgICAgIHRvZ2dsZU1lbnUgPSAtPlxuICAgICAgICBpZiBpc09wZW5cbiAgICAgICAgICBjbGFzc2llLnJlbW92ZSBib2R5RWwsICdzaG93LW1lbnUnXG4gICAgICAgIGVsc2VcbiAgICAgICAgICBjbGFzc2llLmFkZCBib2R5RWwsICdzaG93LW1lbnUnXG4gICAgICAgIGlzT3BlbiA9ICFpc09wZW5cbiAgICAgICAgcmV0dXJuXG5cbiAgICAgIGluaXQoKVxuICAgICAgcmV0dXJuXG5dXG5GcmFuY2hpbm8uY29udHJvbGxlciAnRWR1Y2F0b3JzQ3RybCcsIFtcbiAgJyRzY29wZSdcbiAgKCRzY29wZSkgLT5cblxuICAgIGRvIC0+XG4gICAgICBib2R5RWwgPSB1bmRlZmluZWRcbiAgICAgIGNsb3NlYnRuID0gdW5kZWZpbmVkXG4gICAgICBjb250ZW50ID0gdW5kZWZpbmVkXG4gICAgICBpbml0ID0gdW5kZWZpbmVkXG4gICAgICBpbml0RXZlbnRzID0gdW5kZWZpbmVkXG4gICAgICBpc09wZW4gPSB1bmRlZmluZWRcbiAgICAgIG9wZW5idG4gPSB1bmRlZmluZWRcbiAgICAgIHRvZ2dsZU1lbnUgPSB1bmRlZmluZWRcbiAgICAgIGJvZHlFbCA9IGRvY3VtZW50LmJvZHlcbiAgICAgIGNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGVudC13cmFwJylcbiAgICAgIG9wZW5idG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb3Blbi1idXR0b24nKVxuICAgICAgY2xvc2VidG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2xvc2UtYnV0dG9uJylcbiAgICAgIGlzT3BlbiA9IGZhbHNlXG5cbiAgICAgIGluaXQgPSAtPlxuICAgICAgICBpbml0RXZlbnRzKClcbiAgICAgICAgcmV0dXJuXG5cbiAgICAgIGluaXRFdmVudHMgPSAtPlxuICAgICAgICAkID0gdW5kZWZpbmVkXG4gICAgICAgIGNzc0lkID0gdW5kZWZpbmVkXG4gICAgICAgIGhlYWQgPSB1bmRlZmluZWRcbiAgICAgICAgbGluayA9IHVuZGVmaW5lZFxuICAgICAgICBpZiBkZXZpY2UuZGVza3RvcCgpXG4gICAgICAgICAgXG4gICAgICAgIGVsc2UgaWYgZGV2aWNlLm1vYmlsZSgpXG4gICAgICAgICAgJCA9IGRvY3VtZW50XG4gICAgICAgICAgY3NzSWQgPSAnbXlDc3MnXG4gICAgICAgICAgaWYgISQuZ2V0RWxlbWVudEJ5SWQoY3NzSWQpXG4gICAgICAgICAgICBoZWFkID0gJC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdXG4gICAgICAgICAgICBsaW5rID0gJC5jcmVhdGVFbGVtZW50KCdsaW5rJylcbiAgICAgICAgICAgIGxpbmsuaWQgPSBjc3NJZFxuICAgICAgICAgICAgbGluay5yZWwgPSAnc3R5bGVzaGVldCdcbiAgICAgICAgICAgIGxpbmsudHlwZSA9ICd0ZXh0L2NzcydcbiAgICAgICAgICAgIGxpbmsuaHJlZiA9ICdodHRwczovL2NvZGUuaW9uaWNmcmFtZXdvcmsuY29tLzEuMC4wLWJldGEuMTMvY3NzL2lvbmljLm1pbi5jc3MnXG4gICAgICAgICAgICBsaW5rLm1lZGlhID0gJ2FsbCdcbiAgICAgICAgICAgIGhlYWQuYXBwZW5kQ2hpbGQgbGlua1xuICAgICAgICBpZiBkZXZpY2UuZGVza3RvcCgpXG4gICAgICAgICAgb3BlbmJ0bi5hZGRFdmVudExpc3RlbmVyICdjbGljaycsIHRvZ2dsZU1lbnVcbiAgICAgICAgICBpZiBjbG9zZWJ0blxuICAgICAgICAgICAgY2xvc2VidG4uYWRkRXZlbnRMaXN0ZW5lciAnY2xpY2snLCB0b2dnbGVNZW51XG4gICAgICAgICAgY29udGVudC5hZGRFdmVudExpc3RlbmVyICdjbGljaycsIChldikgLT5cbiAgICAgICAgICAgIHRhcmdldCA9IHVuZGVmaW5lZFxuICAgICAgICAgICAgdGFyZ2V0ID0gZXYudGFyZ2V0XG4gICAgICAgICAgICBpZiBpc09wZW4gYW5kIHRhcmdldCAhPSBvcGVuYnRuXG4gICAgICAgICAgICAgIHRvZ2dsZU1lbnUoKVxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIGVsc2VcblxuICAgICAgICBcblxuICAgICAgdG9nZ2xlTWVudSA9IC0+XG4gICAgICAgIGlmIGlzT3BlblxuICAgICAgICAgIGNsYXNzaWUucmVtb3ZlIGJvZHlFbCwgJ3Nob3ctbWVudSdcbiAgICAgICAgZWxzZVxuICAgICAgICAgIGNsYXNzaWUuYWRkIGJvZHlFbCwgJ3Nob3ctbWVudSdcbiAgICAgICAgaXNPcGVuID0gIWlzT3BlblxuICAgICAgICByZXR1cm5cblxuICAgICAgaW5pdCgpXG4gICAgICByZXR1cm5cbl1cbkZyYW5jaGluby5jb250cm9sbGVyICdIb21lQ3RybCcsIFtcbiAgJyRzY29wZSdcbiAgKCRzY29wZSkgLT5cblxuICAgIGRvIC0+XG4gICAgICBib2R5RWwgPSB1bmRlZmluZWRcbiAgICAgIGNsb3NlYnRuID0gdW5kZWZpbmVkXG4gICAgICBjb250ZW50ID0gdW5kZWZpbmVkXG4gICAgICBpbml0ID0gdW5kZWZpbmVkXG4gICAgICBpbml0RXZlbnRzID0gdW5kZWZpbmVkXG4gICAgICBpc09wZW4gPSB1bmRlZmluZWRcbiAgICAgIG9wZW5idG4gPSB1bmRlZmluZWRcbiAgICAgIHRvZ2dsZU1lbnUgPSB1bmRlZmluZWRcbiAgICAgIGJvZHlFbCA9IGRvY3VtZW50LmJvZHlcbiAgICAgIGNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGVudC13cmFwJylcbiAgICAgIG9wZW5idG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb3Blbi1idXR0b24nKVxuICAgICAgY2xvc2VidG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2xvc2UtYnV0dG9uJylcbiAgICAgIGlzT3BlbiA9IGZhbHNlXG5cbiAgICAgIGluaXQgPSAtPlxuICAgICAgICBpbml0RXZlbnRzKClcbiAgICAgICAgcmV0dXJuXG5cbiAgICAgIGluaXRFdmVudHMgPSAtPlxuICAgICAgICAkID0gdW5kZWZpbmVkXG4gICAgICAgIGNzc0lkID0gdW5kZWZpbmVkXG4gICAgICAgIGhlYWQgPSB1bmRlZmluZWRcbiAgICAgICAgbGluayA9IHVuZGVmaW5lZFxuICAgICAgICBpZiBkZXZpY2UuZGVza3RvcCgpXG4gICAgICAgICAgXG4gICAgICAgIGVsc2UgaWYgZGV2aWNlLm1vYmlsZSgpXG4gICAgICAgICAgJCA9IGRvY3VtZW50XG4gICAgICAgICAgY3NzSWQgPSAnbXlDc3MnXG4gICAgICAgICAgaWYgISQuZ2V0RWxlbWVudEJ5SWQoY3NzSWQpXG4gICAgICAgICAgICBoZWFkID0gJC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdXG4gICAgICAgICAgICBsaW5rID0gJC5jcmVhdGVFbGVtZW50KCdsaW5rJylcbiAgICAgICAgICAgIGxpbmsuaWQgPSBjc3NJZFxuICAgICAgICAgICAgbGluay5yZWwgPSAnc3R5bGVzaGVldCdcbiAgICAgICAgICAgIGxpbmsudHlwZSA9ICd0ZXh0L2NzcydcbiAgICAgICAgICAgIGxpbmsuaHJlZiA9ICdodHRwczovL2NvZGUuaW9uaWNmcmFtZXdvcmsuY29tLzEuMC4wLWJldGEuMTMvY3NzL2lvbmljLm1pbi5jc3MnXG4gICAgICAgICAgICBsaW5rLm1lZGlhID0gJ2FsbCdcbiAgICAgICAgICAgIGhlYWQuYXBwZW5kQ2hpbGQgbGlua1xuICAgICAgICBpZiBkZXZpY2UuZGVza3RvcCgpXG4gICAgICAgICAgb3BlbmJ0bi5hZGRFdmVudExpc3RlbmVyICdjbGljaycsIHRvZ2dsZU1lbnVcbiAgICAgICAgICBpZiBjbG9zZWJ0blxuICAgICAgICAgICAgY2xvc2VidG4uYWRkRXZlbnRMaXN0ZW5lciAnY2xpY2snLCB0b2dnbGVNZW51XG4gICAgICAgICAgY29udGVudC5hZGRFdmVudExpc3RlbmVyICdjbGljaycsIChldikgLT5cbiAgICAgICAgICAgIHRhcmdldCA9IHVuZGVmaW5lZFxuICAgICAgICAgICAgdGFyZ2V0ID0gZXYudGFyZ2V0XG4gICAgICAgICAgICBpZiBpc09wZW4gYW5kIHRhcmdldCAhPSBvcGVuYnRuXG4gICAgICAgICAgICAgIHRvZ2dsZU1lbnUoKVxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIGVsc2VcblxuICAgICAgICBcblxuICAgICAgdG9nZ2xlTWVudSA9IC0+XG4gICAgICAgIGlmIGlzT3BlblxuICAgICAgICAgIGNsYXNzaWUucmVtb3ZlIGJvZHlFbCwgJ3Nob3ctbWVudSdcbiAgICAgICAgZWxzZVxuICAgICAgICAgIGNsYXNzaWUuYWRkIGJvZHlFbCwgJ3Nob3ctbWVudSdcbiAgICAgICAgaXNPcGVuID0gIWlzT3BlblxuICAgICAgICByZXR1cm5cblxuICAgICAgaW5pdCgpXG4gICAgICByZXR1cm5cbl1cbkZyYW5jaGluby5jb250cm9sbGVyICdKb2JNZWR5Y2F0aW9uQ3RybCcsICgkc2NvcGUpIC0+XG5GcmFuY2hpbm8uY29udHJvbGxlciAnSm9iTWVkeWNhdGlvbkN0cmwnLCAoJHNjb3BlKSAtPlxuRnJhbmNoaW5vLmNvbnRyb2xsZXIgJ0pvYlRyb3VuZEN0cmwnLCAoJHNjb3BlKSAtPlxuRnJhbmNoaW5vLmNvbnRyb2xsZXIgJ0pvYk1vbnRobHlzT25lQ3RybCcsICgkc2NvcGUpIC0+XG5GcmFuY2hpbm8uY29udHJvbGxlciAnSm9iTW9udGhseXNUd29DdHJsJywgKCRzY29wZSkgLT5cbkZyYW5jaGluby5jb250cm9sbGVyICdKb2JCZW5jaHByZXBDdHJsJywgKCRzY29wZSkgLT5cbkZyYW5jaGluby5jb250cm9sbGVyICdDb250YWN0Q3RybCcsICgkc2NvcGUpIC0+XG5GcmFuY2hpbm8uY29udHJvbGxlciAnRGV2ZWxvcGVyc0N0cmwnLCAoJHNjb3BlKSAtPlxuRnJhbmNoaW5vLmNvbnRyb2xsZXIgJ0RldmVsb3BlckNlbnRlckN0cmwnLCAoJHNjb3BlKSAtPlxuRnJhbmNoaW5vLmNvbnRyb2xsZXIgJ0RvY3NDdHJsJywgKCRzY29wZSwgRG9jcykgLT5cbiAgJHNjb3BlLiR3YXRjaCAoLT5cbiAgICBEb2NzLmxpc3RcbiAgKSwgLT5cbiAgICAkc2NvcGUuZG9jcyA9IERvY3MubGlzdFxuRnJhbmNoaW5vLmNvbnRyb2xsZXIgJ0RvY0N0cmwnLCAoJHNjb3BlLCAkc2NlLCAkc3RhdGVQYXJhbXMsICR0aW1lb3V0LCBEb2NzKSAtPlxuICAkc2NvcGUuaW5kZXggPSBpZiAkc3RhdGVQYXJhbXMuc3RlcCB0aGVuICRzdGF0ZVBhcmFtcy5zdGVwIC0gMSBlbHNlIDBcbiAgJHNjb3BlLiR3YXRjaCAoLT5cbiAgICBEb2NzLmxpc3RcbiAgKSwgLT5cbiAgICAkc2NvcGUuZG9jID0gRG9jcy5maW5kKCRzdGF0ZVBhcmFtcy5wZXJtYWxpbmspXG4gICAgaWYgJHNjb3BlLmRvY1xuICAgICAgJHNjb3BlLnN0ZXAgPSAkc2NvcGUuZG9jLnN0ZXBzWyRzY29wZS5pbmRleF1cbiAgICAgICRzY29wZS5zdGVwLnVybCA9ICRzY2UudHJ1c3RBc1Jlc291cmNlVXJsKCRzY29wZS5zdGVwLnVybClcbiAgICAgIGlmICRzY29wZS5zdGVwLnR5cGUgPT0gJ2RpYWxvZydcbiAgICAgICAgJHNjb3BlLm1lc3NhZ2VJbmRleCA9IDBcbiAgICAgICAgJHNjb3BlLm1lc3NhZ2VzID0gW11cbiAgICAgICAgcmV0dXJuICR0aW1lb3V0KCRzY29wZS5uZXh0TWVzc2FnZSwgMTAwMClcbiAgICByZXR1cm5cblxuICAkc2NvcGUuaGFzTW9yZVN0ZXBzID0gLT5cbiAgICBpZiAkc2NvcGUuc3RlcFxuICAgICAgcmV0dXJuICRzY29wZS5zdGVwLmluZGV4IDwgJHNjb3BlLmRvYy5zdGVwcy5sZW5ndGhcbiAgICByZXR1cm5cblxuRnJhbmNoaW5vLmRpcmVjdGl2ZSAnbXlTbGlkZXNob3cnLCAtPlxuICB7XG4gICAgcmVzdHJpY3Q6ICdBQydcbiAgICBsaW5rOiAoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSAtPlxuICAgICAgY29uZmlnID0gdW5kZWZpbmVkXG4gICAgICBjb25maWcgPSBhbmd1bGFyLmV4dGVuZCh7IHNsaWRlczogJy5zbGlkZScgfSwgc2NvcGUuJGV2YWwoYXR0cnMubXlTbGlkZXNob3cpKVxuICAgICAgc2V0VGltZW91dCAoLT5cbiAgICAgICAgJChlbGVtZW50KS5jeWNsZSAtPlxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGZ4OiAnZmFkZSdcbiAgICAgICAgICAgIHNwZWVkOiAnZmFzdCdcbiAgICAgICAgICAgIG5leHQ6ICcjbmV4dDInXG4gICAgICAgICAgICBwcmV2OiAnI3ByZXYyJ1xuICAgICAgICAgICAgY2FwdGlvbjogJyNhbHQtY2FwdGlvbidcbiAgICAgICAgICAgIGNhcHRpb25fdGVtcGxhdGU6ICd7e2ltYWdlcy5hbHR9fSdcbiAgICAgICAgICAgIHBhdXNlX29uX2hvdmVyOiAndHJ1ZSdcbiAgICAgICAgICB9XG4gICAgICApLCAwXG5cbiAgfVxuYW5ndWxhci5tb2R1bGUgJ3RhcC5jb250cm9sbGVycycsIFtdXG5hbmd1bGFyLm1vZHVsZSgndGFwLmRpcmVjdGl2ZXMnLCBbXSkuZGlyZWN0aXZlKCdkZXZpY2UnLCAtPlxuICB7XG4gICAgcmVzdHJpY3Q6ICdBJ1xuICAgIGxpbms6IC0+XG4gICAgICBkZXZpY2UuaW5pdCgpXG5cbiAgfVxuKS5zZXJ2aWNlICdjb3B5JywgKCRzY2UpIC0+XG4gIGNvcHkgPSB1bmRlZmluZWRcbiAgdHJ1c3RWYWx1ZXMgPSB1bmRlZmluZWRcbiAgY29weSA9XG4gICAgYWJvdXQ6XG4gICAgICBoZWFkaW5nOiAnV2VcXCdyZSA8c3Ryb25nPnRhcHBpbmc8L3N0cm9uZz4gaW50byB0aGUgZnV0dXJlJ1xuICAgICAgc3ViX2hlYWRpbmc6ICdUYXBjZW50aXZlIHdhcyBjcmVhdGVkIGJ5IGEgdGVhbSB0aGF0IGhhcyBsaXZlZCB0aGUgbW9iaWxlIGNvbW1lcmNlIHJldm9sdXRpb24gZnJvbSB0aGUgZWFybGllc3QgZGF5cyBvZiBtQ29tbWVyY2Ugd2l0aCBXQVAsIHRvIGxlYWRpbmcgdGhlIGNoYXJnZSBpbiBtb2JpbGUgcGF5bWVudHMgYW5kIHNlcnZpY2VzIHdpdGggTkZDIHdvcmxkd2lkZS4nXG4gICAgICBjb3B5OiAnPHA+Rm9yIHVzLCBtb2JpbGUgY29tbWVyY2UgaGFzIGFsd2F5cyBiZWVuIGFib3V0IG11Y2ggbW9yZSB0aGFuIHBheW1lbnQ6ICBtYXJrZXRpbmcsIHByb21vdGlvbnMsIHByb2R1Y3QgY29udGVudCwgYW5kIGxveWFsdHksIGFsbCBjb21lIHRvIGxpZmUgaW5zaWRlIGEgbW9iaWxlIHBob25lLiBNb2JpbGUgY29tbWVyY2UgcmVhbGx5IGdldHMgaW50ZXJlc3Rpbmcgd2hlbiBpdCBicmlkZ2VzIHRoZSBkaWdpdGFsIGFuZCBwaHlzaWNhbCB3b3JsZHMuPC9wPjxwPk91ciBnb2FsIGF0IFRhcGNlbnRpdmUgaXMgdG8gY3JlYXRlIGEgc3RhdGUtb2YtdGhlLWFydCBtb2JpbGUgZW5nYWdlbWVudCBwbGF0Zm9ybSB0aGF0IGVuYWJsZXMgbWFya2V0ZXJzIGFuZCBkZXZlbG9wZXJzIHRvIGNyZWF0ZSBlbnRpcmVseSBuZXcgY3VzdG9tZXIgZXhwZXJpZW5jZXMgaW4gcGh5c2ljYWwgbG9jYXRpb25zIOKAkyBhbGwgd2l0aCBhIG1pbmltdW0gYW1vdW50IG9mIHRlY2hub2xvZ3kgZGV2ZWxvcG1lbnQuPC9wPjxwPldlIHRoaW5rIHlvdeKAmWxsIGxpa2Ugd2hhdCB3ZeKAmXZlIGJ1aWx0IHNvIGZhci4gQW5kIGp1c3QgYXMgbW9iaWxlIHRlY2hub2xvZ3kgaXMgY29uc3RhbnRseSBldm9sdmluZywgc28gaXMgdGhlIFRhcGNlbnRpdmUgcGxhdGZvcm0uIEdpdmUgaXQgYSB0ZXN0IGRyaXZlIHRvZGF5LjwvcD4nXG4gICAgdGVhbTpcbiAgICAgIGhlYWRpbmc6ICcnXG4gICAgICBiaW9zOlxuICAgICAgICBkYXZlX3JvbGU6ICcnXG4gICAgICAgIGRhdmVfY29weTogJydcblxuICB0cnVzdFZhbHVlcyA9ICh2YWx1ZXMpIC0+XG4gICAgXy5lYWNoIHZhbHVlcywgKHZhbCwga2V5KSAtPlxuICAgICAgc3dpdGNoIHR5cGVvZiB2YWxcbiAgICAgICAgd2hlbiAnc3RyaW5nJ1xuICAgICAgICAgIHJldHVybiAkc2NlLnRydXN0QXNIdG1sKHZhbClcbiAgICAgICAgd2hlbiAnb2JqZWN0J1xuICAgICAgICAgIHJldHVybiB0cnVzdFZhbHVlcyh2YWwpXG4gICAgICByZXR1cm5cblxuICB0cnVzdFZhbHVlcyBjb3B5XG4gIGNvcHlcbiIsIlxuIyBub3Qgc3VyZSBpZiB0aGVzZSBhcmUgYWN0dWFsbHkgaW5qZWN0aW5nIGludG8gdGhlIGFwcCBtb2R1bGUgcHJvcGVybHlcbmFuZ3VsYXIubW9kdWxlKFwidGFwLmNvbnRyb2xsZXJzXCIsIFtdKVxuXG4jIG1vdmUgY29udHJvbGxlcnMgaGVyZVxuXG5cblxuXG4iLCJhbmd1bGFyLm1vZHVsZShcInRhcC5kaXJlY3RpdmVzXCIsIFtdKVxuICAuZGlyZWN0aXZlIFwiZGV2aWNlXCIsIC0+XG4gICAgcmVzdHJpY3Q6IFwiQVwiXG4gICAgbGluazogLT5cbiAgICAgIGRldmljZS5pbml0KClcblxuICAuc2VydmljZSAnY29weScsICgkc2NlKSAtPlxuICAgIGNvcHkgPVxuICAgICAgYWJvdXQ6XG4gICAgICAgIGhlYWRpbmc6IFwiV2UncmUgPHN0cm9uZz50YXBwaW5nPC9zdHJvbmc+IGludG8gdGhlIGZ1dHVyZVwiXG4gICAgICAgIHN1Yl9oZWFkaW5nOiBcIlRhcGNlbnRpdmUgd2FzIGNyZWF0ZWQgYnkgYSB0ZWFtIHRoYXQgaGFzIGxpdmVkIHRoZSBtb2JpbGUgY29tbWVyY2UgcmV2b2x1dGlvbiBmcm9tIHRoZSBlYXJsaWVzdCBkYXlzIG9mIG1Db21tZXJjZSB3aXRoIFdBUCwgdG8gbGVhZGluZyB0aGUgY2hhcmdlIGluIG1vYmlsZSBwYXltZW50cyBhbmQgc2VydmljZXMgd2l0aCBORkMgd29ybGR3aWRlLlwiXG4gICAgICAgIGNvcHk6IFwiPHA+Rm9yIHVzLCBtb2JpbGUgY29tbWVyY2UgaGFzIGFsd2F5cyBiZWVuIGFib3V0IG11Y2ggbW9yZSB0aGFuIHBheW1lbnQ6ICBtYXJrZXRpbmcsIHByb21vdGlvbnMsIHByb2R1Y3QgY29udGVudCwgYW5kIGxveWFsdHksIGFsbCBjb21lIHRvIGxpZmUgaW5zaWRlIGEgbW9iaWxlIHBob25lLiBNb2JpbGUgY29tbWVyY2UgcmVhbGx5IGdldHMgaW50ZXJlc3Rpbmcgd2hlbiBpdCBicmlkZ2VzIHRoZSBkaWdpdGFsIGFuZCBwaHlzaWNhbCB3b3JsZHMuPC9wPjxwPk91ciBnb2FsIGF0IFRhcGNlbnRpdmUgaXMgdG8gY3JlYXRlIGEgc3RhdGUtb2YtdGhlLWFydCBtb2JpbGUgZW5nYWdlbWVudCBwbGF0Zm9ybSB0aGF0IGVuYWJsZXMgbWFya2V0ZXJzIGFuZCBkZXZlbG9wZXJzIHRvIGNyZWF0ZSBlbnRpcmVseSBuZXcgY3VzdG9tZXIgZXhwZXJpZW5jZXMgaW4gcGh5c2ljYWwgbG9jYXRpb25zIOKAkyBhbGwgd2l0aCBhIG1pbmltdW0gYW1vdW50IG9mIHRlY2hub2xvZ3kgZGV2ZWxvcG1lbnQuPC9wPjxwPldlIHRoaW5rIHlvdeKAmWxsIGxpa2Ugd2hhdCB3ZeKAmXZlIGJ1aWx0IHNvIGZhci4gQW5kIGp1c3QgYXMgbW9iaWxlIHRlY2hub2xvZ3kgaXMgY29uc3RhbnRseSBldm9sdmluZywgc28gaXMgdGhlIFRhcGNlbnRpdmUgcGxhdGZvcm0uIEdpdmUgaXQgYSB0ZXN0IGRyaXZlIHRvZGF5LjwvcD5cIlxuICAgICAgdGVhbTpcbiAgICAgICAgaGVhZGluZzogXCJcIlxuICAgICAgICBiaW9zOlxuICAgICAgICAgIGRhdmVfcm9sZTogXCJcIlxuICAgICAgICAgIGRhdmVfY29weTogXCJcIlxuICAgIFxuXG5cbiAgICB0cnVzdFZhbHVlcyA9ICh2YWx1ZXMpIC0+XG4gICAgICBfLmVhY2ggdmFsdWVzLCAodmFsLCBrZXkpIC0+XG4gICAgICAgIHN3aXRjaCB0eXBlb2YodmFsKVxuICAgICAgICAgIHdoZW4gJ3N0cmluZydcbiAgICAgICAgICAgICRzY2UudHJ1c3RBc0h0bWwodmFsKVxuICAgICAgICAgIHdoZW4gJ29iamVjdCdcbiAgICAgICAgICAgIHRydXN0VmFsdWVzKHZhbClcblxuICAgIHRydXN0VmFsdWVzKGNvcHkpXG5cbiAgICBjb3B5XG4iLCJpZiBkZXZpY2UuZGVza3RvcCgpXG5cbmVsc2UgaWYgZGV2aWNlLm1vYmlsZSgpXG5cblx0JCA9IGRvY3VtZW50ICMgc2hvcnRjdXRcblx0Y3NzSWQgPSAnbXlDc3MnICMgeW91IGNvdWxkIGVuY29kZSB0aGUgY3NzIHBhdGggaXRzZWxmIHRvIGdlbmVyYXRlIGlkLi5cblx0aWYgISQuZ2V0RWxlbWVudEJ5SWQoY3NzSWQpXG5cdCAgICBoZWFkICA9ICQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXVxuXHQgICAgbGluayAgPSAkLmNyZWF0ZUVsZW1lbnQoJ2xpbmsnKVxuXHQgICAgbGluay5pZCAgID0gY3NzSWRcblx0ICAgIGxpbmsucmVsICA9ICdzdHlsZXNoZWV0J1xuXHQgICAgbGluay50eXBlID0gJ3RleHQvY3NzJ1xuXHQgICAgbGluay5ocmVmID0gJ2h0dHBzOi8vY29kZS5pb25pY2ZyYW1ld29yay5jb20vMS4wLjAtYmV0YS4xMy9jc3MvaW9uaWMubWluLmNzcydcblx0ICAgIGxpbmsubWVkaWEgPSAnYWxsJ1xuXHQgICAgaGVhZC5hcHBlbmRDaGlsZChsaW5rKVxuIiwiIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9