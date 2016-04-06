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
    url: '/resume',
    views: {
      menuContent: {
        controller: 'ResumeCtrl',
        templateUrl: 'resume.html'
      }
    }
  }).state('app.contact', {
    url: '/contact',
    views: {
      menuContent: {
        controller: 'ContactCtrl',
        templateUrl: 'contact.html'
      }
    }
  }).state('app.doc', {
    url: '/docs/:permalink',
    views: {
      menuContent: {
        controller: 'DocCtrl',
        templateUrl: 'docs/show.html'
      }
    }
  }).state('app.step', {
    url: '/docs/:permalink/:step',
    views: {
      menuContent: {
        controller: 'DocCtrl',
        templateUrl: 'docs/show.html'
      }
    }
  }).state('app.job-tapcentive', {
    url: '/job-tapcentive',
    views: {
      menuContent: {
        controller: 'JobTapcentiveCtrl',
        templateUrl: 'job-tapcentive.html'
      }
    }
  }).state('app.job-tapcentive-two', {
    url: '/job-tapcentive-two',
    views: {
      menuContent: {
        controller: 'JobTapcentiveTwoCtrl',
        templateUrl: 'job-tapcentive-two.html'
      }
    }
  }).state('app.job-cpgio', {
    url: '/job-cpgio',
    views: {
      menuContent: {
        controller: 'JobCpgioCtrl',
        templateUrl: 'job-cpgio.html'
      }
    }
  }).state('app.job-medycation', {
    url: '/job-medycation',
    views: {
      menuContent: {
        controller: 'JobMedycationCtrl',
        templateUrl: 'job-medycation.html'
      }
    }
  }).state('app.job-cst', {
    url: '/job-cst',
    views: {
      menuContent: {
        controller: 'JobCstCtrl',
        templateUrl: 'job-cst.html'
      }
    }
  }).state('app.job-koupn', {
    url: '/job-koupn',
    views: {
      menuContent: {
        controller: 'JobKoupnCtrl',
        templateUrl: 'job-koupn.html'
      }
    }
  }).state('app.job-tround', {
    url: '/job-tround',
    views: {
      menuContent: {
        controller: 'JobTroundCtrl',
        templateUrl: 'job-tround.html'
      }
    }
  }).state('app.job-monthlys', {
    url: '/job-monthlys',
    views: {
      menuContent: {
        controller: 'JobMonthlysCtrl',
        templateUrl: 'job-monthlys.html'
      }
    }
  }).state('app.job-monthlys-two', {
    url: '/job-monthlys-two',
    views: {
      menuContent: {
        controller: 'JobMonthlysTwoCtrl',
        templateUrl: 'job-monthlys-two.html'
      }
    }
  }).state('app.job-benchprep', {
    url: '/job-benchprep',
    views: {
      menuContent: {
        controller: 'JobBenchprepCtrl',
        templateUrl: 'job-benchprep.html'
      }
    }
  });
  $urlRouterProvider.otherwise('/');
  return $httpProvider.interceptors.push(function() {
    return {
      request: function(config) {
        var type;
        type = void 0;
        if (config.url.match(/\.html$/) && !config.url.match(/^shared\//)) {
          if (device.tablet()) {
            Franchino.config('cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
              return cfpLoadingBarProvider.latencyThreshold = 1500;
            });
          } else if (device.mobile()) {
            type = 'mobile';
          } else {
            type = 'desktop';
          }
          config.url = '/' + type + '/' + config.url;
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
        sectionsColor: ['#1bbc9b', '#040b15', '#040b15', 'whitesmoke', '#ccddff'],
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

Franchino.controller('ContactSheetCtrl', function($scope, $ionicActionSheet) {
  $scope.showActionsheet = function() {
    return $ionicActionSheet.show({
      titleText: 'Contact Franchino',
      buttons: [
        {
          text: 'Github <i class="icon ion-share"></i>'
        }, {
          text: 'Email Me <i class="icon ion-email"></i>'
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
          window.location.href = 'http://twitter.com/franchino_che';
        }
        if (index === 1) {
          window.location.href = 'mailto:franchino.nonce@gmail.com';
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

Franchino.controller('LandingCtrl', function($scope) {
  var firstScriptTag, onPlayerStateChange, onYouTubeIframeAPIReady, player, tag;
  tag = document.createElement("script");
  tag.src = "//www.youtube.com/iframe_api";
  firstScriptTag = document.getElementsByTagName("script")[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  player = void 0;
  onYouTubeIframeAPIReady = function() {
    return player = new YT.Player("player", {
      height: "244",
      width: "434",
      videoId: "AkyQgpqRyBY",
      playerVars: {
        autoplay: 0,
        rel: 0,
        showinfo: 0
      },
      events: {
        onStateChange: onPlayerStateChange
      }
    });
  };
  return onPlayerStateChange = function(event) {
    if (event.data === YT.PlayerState.ENDED) {
      return $(".start-video").fadeIn("normal");
    }
  };
});

Franchino.controller('JobKoupnCtrl', function($scope) {});

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

angular.module("Franchino").controller("LoginCtrl", function($scope, auth) {
  alert('yo');
  return $scope.auth = auth;
});

var HomeController;

angular.module("Franchino.portal", ["auth0"]).controller("HomeCtrl", HomeController = function($scope, auth, $http, $location, store) {
  $scope.auth = auth;
  $scope.callApi = function() {
    return $http({
      url: "http://localhost:3001/secured/ping",
      method: "GET"
    }).then((function() {
      return alert("We got the secured data successfully");
    }), function(response) {
      if (response.status === -1) {
        return alert("Please download the API seed so that you can call it.");
      } else {
        return alert(response.data);
      }
    });
  };
  return $scope.logout = function() {
    auth.signout();
    store.remove("profile");
    store.remove("token");
    return $location.path("/login");
  };
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5jb2ZmZWUiLCJjb250cm9sbGVycy5jb2ZmZWUiLCJkaXJlY3RpdmVzLmNvZmZlZSIsImluaXQuY29mZmVlIiwibG9naW4uY29mZmVlIiwicG9ydGFsLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFHLE1BQU0sQ0FBQyxPQUFQLENBQUEsQ0FBSDtBQUNFLEVBQUEsTUFBTSxDQUFDLFNBQVAsR0FBbUIsT0FBTyxDQUFDLE1BQVIsQ0FBZSxXQUFmLEVBQTRCLENBQzdDLFlBRDZDLEVBRTdDLFdBRjZDLEVBRzdDLGtCQUg2QyxFQUk3QyxpQkFKNkMsRUFLN0MsZ0JBTDZDLENBQTVCLENBQW5CLENBREY7Q0FBQSxNQUFBO0FBU0UsRUFBQSxNQUFNLENBQUMsU0FBUCxHQUFtQixPQUFPLENBQUMsTUFBUixDQUFlLFdBQWYsRUFBNEIsQ0FDN0MsT0FENkMsRUFFN0Msa0JBRjZDLEVBRzdDLGlCQUg2QyxFQUk3QyxnQkFKNkMsQ0FBNUIsQ0FLakIsQ0FBQyxHQUxnQixDQUtaLFNBQUMsY0FBRCxHQUFBO1dBQ0wsY0FBYyxDQUFDLEtBQWYsQ0FBcUIsU0FBQSxHQUFBO0FBQ25CLE1BQUEsSUFBRyxNQUFNLENBQUMsU0FBVjtBQUNFLGVBQU8sU0FBUyxDQUFDLFlBQVYsQ0FBQSxDQUFQLENBREY7T0FEbUI7SUFBQSxDQUFyQixFQURLO0VBQUEsQ0FMWSxDQUFuQixDQVRGO0NBQUE7O0FBQUEsU0FvQlMsQ0FBQyxNQUFWLENBQWlCLFNBQUMsY0FBRCxFQUFpQixrQkFBakIsRUFBcUMsaUJBQXJDLEVBQXdELGFBQXhELEdBQUE7QUFDZixFQUFBLGNBQWMsQ0FBQyxLQUFmLENBQXFCLEtBQXJCLEVBQ0U7QUFBQSxJQUFBLEdBQUEsRUFBSyxFQUFMO0FBQUEsSUFDQSxRQUFBLEVBQVUsSUFEVjtBQUFBLElBRUEsVUFBQSxFQUFZLFNBRlo7QUFBQSxJQUdBLFdBQUEsRUFBYSxXQUhiO0dBREYsQ0FJMkIsQ0FBQyxLQUo1QixDQUlrQyxVQUps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Q0FBbkMsQ0FBK0MsQ0FBQyxVQUFoRCxDQUEyRCxVQUEzRCxFQUF1RSxjQUFBLEdBQWlCLFNBQUMsTUFBRCxFQUFTLElBQVQsRUFBZSxLQUFmLEVBQXNCLFNBQXRCLEVBQWlDLEtBQWpDLEdBQUE7QUFDdEYsRUFBQSxNQUFNLENBQUMsSUFBUCxHQUFjLElBQWQsQ0FBQTtBQUFBLEVBRUEsTUFBTSxDQUFDLE9BQVAsR0FBaUIsU0FBQSxHQUFBO1dBR2YsS0FBQSxDQUNFO0FBQUEsTUFBQSxHQUFBLEVBQUssb0NBQUw7QUFBQSxNQUNBLE1BQUEsRUFBUSxLQURSO0tBREYsQ0FHQyxDQUFDLElBSEYsQ0FHTyxDQUFDLFNBQUEsR0FBQTthQUNOLEtBQUEsQ0FBTSxzQ0FBTixFQURNO0lBQUEsQ0FBRCxDQUhQLEVBS0csU0FBQyxRQUFELEdBQUE7QUFDRCxNQUFBLElBQUcsUUFBUSxDQUFDLE1BQVQsS0FBbUIsQ0FBQSxDQUF0QjtlQUNFLEtBQUEsQ0FBTSx1REFBTixFQURGO09BQUEsTUFBQTtlQUdFLEtBQUEsQ0FBTSxRQUFRLENBQUMsSUFBZixFQUhGO09BREM7SUFBQSxDQUxILEVBSGU7RUFBQSxDQUZqQixDQUFBO1NBaUJBLE1BQU0sQ0FBQyxNQUFQLEdBQWdCLFNBQUEsR0FBQTtBQUNkLElBQUEsSUFBSSxDQUFDLE9BQUwsQ0FBQSxDQUFBLENBQUE7QUFBQSxJQUNBLEtBQUssQ0FBQyxNQUFOLENBQWEsU0FBYixDQURBLENBQUE7QUFBQSxJQUVBLEtBQUssQ0FBQyxNQUFOLENBQWEsT0FBYixDQUZBLENBQUE7V0FHQSxTQUFTLENBQUMsSUFBVixDQUFlLFFBQWYsRUFKYztFQUFBLEVBbEJzRTtBQUFBLENBQXhGLENBQUEsQ0FBQSIsImZpbGUiOiJhcHBsaWNhdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImlmIGRldmljZS5kZXNrdG9wKClcbiAgd2luZG93LkZyYW5jaGlubyA9IGFuZ3VsYXIubW9kdWxlKCdGcmFuY2hpbm8nLCBbXG4gICAgJ25nU2FuaXRpemUnXG4gICAgJ3VpLnJvdXRlcidcbiAgICAnYnRmb3JkLnNvY2tldC1pbydcbiAgICAndGFwLmNvbnRyb2xsZXJzJ1xuICAgICd0YXAuZGlyZWN0aXZlcydcbiAgXSlcbmVsc2VcbiAgd2luZG93LkZyYW5jaGlubyA9IGFuZ3VsYXIubW9kdWxlKCdGcmFuY2hpbm8nLCBbXG4gICAgJ2lvbmljJ1xuICAgICdidGZvcmQuc29ja2V0LWlvJ1xuICAgICd0YXAuY29udHJvbGxlcnMnXG4gICAgJ3RhcC5kaXJlY3RpdmVzJ1xuICBdKS5ydW4oKCRpb25pY1BsYXRmb3JtKSAtPlxuICAgICRpb25pY1BsYXRmb3JtLnJlYWR5IC0+XG4gICAgICBpZiB3aW5kb3cuU3RhdHVzQmFyXG4gICAgICAgIHJldHVybiBTdGF0dXNCYXIuc3R5bGVEZWZhdWx0KClcbiAgICAgIHJldHVyblxuICApXG5GcmFuY2hpbm8uY29uZmlnICgkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyLCAkbG9jYXRpb25Qcm92aWRlciwgJGh0dHBQcm92aWRlcikgLT5cbiAgJHN0YXRlUHJvdmlkZXIuc3RhdGUoJ2FwcCcsXG4gICAgdXJsOiAnJ1xuICAgIGFic3RyYWN0OiB0cnVlXG4gICAgY29udHJvbGxlcjogJ0FwcEN0cmwnXG4gICAgdGVtcGxhdGVVcmw6ICdtZW51Lmh0bWwnKS5zdGF0ZSgnYXBwLmhvbWUnLFxuICAgIHVybDogJy8nXG4gICAgdmlld3M6IG1lbnVDb250ZW50OlxuICAgICAgY29udHJvbGxlcjogJ0hvbWVDdHJsJ1xuICAgICAgdGVtcGxhdGVVcmw6ICdob21lLmh0bWwnKS5zdGF0ZSgnYmxvZycsXG4gICAgdXJsOiAnL2Jsb2dyb2xsJ1xuICAgIGNvbnRyb2xsZXI6ICdCbG9nUm9sbEN0cmwnXG4gICAgdGVtcGxhdGVVcmw6ICcnKS5zdGF0ZSgnYXBwLmRvY3MnLFxuICAgIHVybDogJy9kb2NzJ1xuICAgIHZpZXdzOiBtZW51Q29udGVudDpcbiAgICAgIGNvbnRyb2xsZXI6ICdEb2NzQ3RybCdcbiAgICAgIHRlbXBsYXRlVXJsOiAnZG9jcy9pbmRleC5odG1sJykuc3RhdGUoJ2FwcC5hYm91dCcsXG4gICAgdXJsOiAnL2xhbmRpbmcnXG4gICAgdmlld3M6IG1lbnVDb250ZW50OlxuICAgICAgY29udHJvbGxlcjogJ0xhbmRpbmdDdHJsJ1xuICAgICAgdGVtcGxhdGVVcmw6ICdsYW5kaW5nLmh0bWwnKS5zdGF0ZSgnYXBwLmxhbmRpbmcnLFxuICAgIHVybDogJy9hYm91dCdcbiAgICB2aWV3czogbWVudUNvbnRlbnQ6XG4gICAgICBjb250cm9sbGVyOiAnQWJvdXRDdHJsJ1xuICAgICAgdGVtcGxhdGVVcmw6ICdhYm91dC5odG1sJykuc3RhdGUoJ2FwcC5ibG9nJyxcbiAgICB1cmw6ICcvYmxvZydcbiAgICB2aWV3czogbWVudUNvbnRlbnQ6XG4gICAgICBjb250cm9sbGVyOiAnQmxvZ0N0cmwnXG4gICAgICB0ZW1wbGF0ZVVybDogJ2Jsb2cuaHRtbCcpLnN0YXRlKCdhcHAucmVzdW1lJyxcbiAgICB1cmw6ICcvcmVzdW1lJ1xuICAgIHZpZXdzOiBtZW51Q29udGVudDpcbiAgICAgIGNvbnRyb2xsZXI6ICdSZXN1bWVDdHJsJ1xuICAgICAgdGVtcGxhdGVVcmw6ICdyZXN1bWUuaHRtbCcpLnN0YXRlKCdhcHAuY29udGFjdCcsXG4gICAgdXJsOiAnL2NvbnRhY3QnXG4gICAgdmlld3M6IG1lbnVDb250ZW50OlxuICAgICAgY29udHJvbGxlcjogJ0NvbnRhY3RDdHJsJ1xuICAgICAgdGVtcGxhdGVVcmw6ICdjb250YWN0Lmh0bWwnKS5zdGF0ZSgnYXBwLmRvYycsXG4gICAgdXJsOiAnL2RvY3MvOnBlcm1hbGluaydcbiAgICB2aWV3czogbWVudUNvbnRlbnQ6XG4gICAgICBjb250cm9sbGVyOiAnRG9jQ3RybCdcbiAgICAgIHRlbXBsYXRlVXJsOiAnZG9jcy9zaG93Lmh0bWwnKS5zdGF0ZSgnYXBwLnN0ZXAnLFxuICAgIHVybDogJy9kb2NzLzpwZXJtYWxpbmsvOnN0ZXAnXG4gICAgdmlld3M6IG1lbnVDb250ZW50OlxuICAgICAgY29udHJvbGxlcjogJ0RvY0N0cmwnXG4gICAgICB0ZW1wbGF0ZVVybDogJ2RvY3Mvc2hvdy5odG1sJykuc3RhdGUoJ2FwcC5qb2ItdGFwY2VudGl2ZScsXG4gICAgdXJsOiAnL2pvYi10YXBjZW50aXZlJ1xuICAgIHZpZXdzOiBtZW51Q29udGVudDpcbiAgICAgIGNvbnRyb2xsZXI6ICdKb2JUYXBjZW50aXZlQ3RybCdcbiAgICAgIHRlbXBsYXRlVXJsOiAnam9iLXRhcGNlbnRpdmUuaHRtbCcpLnN0YXRlKCdhcHAuam9iLXRhcGNlbnRpdmUtdHdvJyxcbiAgICB1cmw6ICcvam9iLXRhcGNlbnRpdmUtdHdvJ1xuICAgIHZpZXdzOiBtZW51Q29udGVudDpcbiAgICAgIGNvbnRyb2xsZXI6ICdKb2JUYXBjZW50aXZlVHdvQ3RybCdcbiAgICAgIHRlbXBsYXRlVXJsOiAnam9iLXRhcGNlbnRpdmUtdHdvLmh0bWwnKS5zdGF0ZSgnYXBwLmpvYi1jcGdpbycsXG4gICAgdXJsOiAnL2pvYi1jcGdpbydcbiAgICB2aWV3czogbWVudUNvbnRlbnQ6XG4gICAgICBjb250cm9sbGVyOiAnSm9iQ3BnaW9DdHJsJ1xuICAgICAgdGVtcGxhdGVVcmw6ICdqb2ItY3BnaW8uaHRtbCcpLnN0YXRlKCdhcHAuam9iLW1lZHljYXRpb24nLFxuICAgIHVybDogJy9qb2ItbWVkeWNhdGlvbidcbiAgICB2aWV3czogbWVudUNvbnRlbnQ6XG4gICAgICBjb250cm9sbGVyOiAnSm9iTWVkeWNhdGlvbkN0cmwnXG4gICAgICB0ZW1wbGF0ZVVybDogJ2pvYi1tZWR5Y2F0aW9uLmh0bWwnKS5zdGF0ZSgnYXBwLmpvYi1jc3QnLFxuICAgIHVybDogJy9qb2ItY3N0J1xuICAgIHZpZXdzOiBtZW51Q29udGVudDpcbiAgICAgIGNvbnRyb2xsZXI6ICdKb2JDc3RDdHJsJ1xuICAgICAgdGVtcGxhdGVVcmw6ICdqb2ItY3N0Lmh0bWwnKS5zdGF0ZSgnYXBwLmpvYi1rb3VwbicsXG4gICAgdXJsOiAnL2pvYi1rb3VwbidcbiAgICB2aWV3czogbWVudUNvbnRlbnQ6XG4gICAgICBjb250cm9sbGVyOiAnSm9iS291cG5DdHJsJ1xuICAgICAgdGVtcGxhdGVVcmw6ICdqb2Ita291cG4uaHRtbCcpLnN0YXRlKCdhcHAuam9iLXRyb3VuZCcsXG4gICAgdXJsOiAnL2pvYi10cm91bmQnXG4gICAgdmlld3M6IG1lbnVDb250ZW50OlxuICAgICAgY29udHJvbGxlcjogJ0pvYlRyb3VuZEN0cmwnXG4gICAgICB0ZW1wbGF0ZVVybDogJ2pvYi10cm91bmQuaHRtbCcpLnN0YXRlKCdhcHAuam9iLW1vbnRobHlzJyxcbiAgICB1cmw6ICcvam9iLW1vbnRobHlzJ1xuICAgIHZpZXdzOiBtZW51Q29udGVudDpcbiAgICAgIGNvbnRyb2xsZXI6ICdKb2JNb250aGx5c0N0cmwnXG4gICAgICB0ZW1wbGF0ZVVybDogJ2pvYi1tb250aGx5cy5odG1sJykuc3RhdGUoJ2FwcC5qb2ItbW9udGhseXMtdHdvJyxcbiAgICB1cmw6ICcvam9iLW1vbnRobHlzLXR3bydcbiAgICB2aWV3czogbWVudUNvbnRlbnQ6XG4gICAgICBjb250cm9sbGVyOiAnSm9iTW9udGhseXNUd29DdHJsJ1xuICAgICAgdGVtcGxhdGVVcmw6ICdqb2ItbW9udGhseXMtdHdvLmh0bWwnKS5zdGF0ZSAnYXBwLmpvYi1iZW5jaHByZXAnLFxuICAgIHVybDogJy9qb2ItYmVuY2hwcmVwJ1xuICAgIHZpZXdzOiBtZW51Q29udGVudDpcbiAgICAgIGNvbnRyb2xsZXI6ICdKb2JCZW5jaHByZXBDdHJsJ1xuICAgICAgdGVtcGxhdGVVcmw6ICdqb2ItYmVuY2hwcmVwLmh0bWwnXG4gICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UgJy8nXG4gICRodHRwUHJvdmlkZXIuaW50ZXJjZXB0b3JzLnB1c2ggLT5cbiAgICB7IHJlcXVlc3Q6IChjb25maWcpIC0+XG4gICAgICB0eXBlID0gdW5kZWZpbmVkXG4gICAgICBpZiBjb25maWcudXJsLm1hdGNoKC9cXC5odG1sJC8pIGFuZCAhY29uZmlnLnVybC5tYXRjaCgvXnNoYXJlZFxcLy8pXG4gICAgICAgIGlmIGRldmljZS50YWJsZXQoKVxuICAgICAgICAgIEZyYW5jaGluby5jb25maWcgJ2NmcExvYWRpbmdCYXJQcm92aWRlcicsIChjZnBMb2FkaW5nQmFyUHJvdmlkZXIpIC0+XG4gICAgICAgICAgICBjZnBMb2FkaW5nQmFyUHJvdmlkZXIubGF0ZW5jeVRocmVzaG9sZCA9IDE1MDBcblxuICAgICAgICBlbHNlIGlmIGRldmljZS5tb2JpbGUoKVxuICAgICAgICAgIHR5cGUgPSAnbW9iaWxlJ1xuICAgICAgICBlbHNlXG4gICAgICAgICAgdHlwZSA9ICdkZXNrdG9wJ1xuICAgICAgICBjb25maWcudXJsID0gJy8nICsgdHlwZSArICcvJyArIGNvbmZpZy51cmxcbiAgICAgIGNvbmZpZ1xuIH1cbkZyYW5jaGluby5ydW4gKCRzdGF0ZSkgLT5cbiAgJHN0YXRlLmdvICdhcHAuaG9tZSdcbiAgXG5cbkZyYW5jaGluby5ydW4gKCRyb290U2NvcGUsIGNvcHkpIC0+XG4gICRyb290U2NvcGUuY29weSA9IGNvcHlcbiAgaWYgZGV2aWNlLmRlc2t0b3AoKVxuICAgICRyb290U2NvcGUuJG9uICckaW5jbHVkZUNvbnRlbnRMb2FkZWQnLCAoZXZlbnQpIC0+XG4gICAgICAkKCcjZnVsbHBhZ2UnKS5mdWxscGFnZVxuICAgICAgICB2ZXJ0aWNhbENlbnRlcmVkOiB0cnVlXG4gICAgICAgIHNlY3Rpb25zQ29sb3I6IFtcbiAgICAgICAgICAnIzFiYmM5YidcbiAgICAgICAgICAnIzA0MGIxNSdcbiAgICAgICAgICAnIzA0MGIxNSdcbiAgICAgICAgICAnd2hpdGVzbW9rZSdcbiAgICAgICAgICAnI2NjZGRmZidcbiAgICAgICAgXVxuICAgICAgICBhbmNob3JzOiBbXG4gICAgICAgICAgJ2ZpcnN0UGFnZSdcbiAgICAgICAgICAnc2Vjb25kUGFnZSdcbiAgICAgICAgICAnM3JkUGFnZSdcbiAgICAgICAgICAnNHRocGFnZSdcbiAgICAgICAgICAnbGFzdFBhZ2UnXG4gICAgICAgIF1cbiAgICAgICAgbWVudTogJyNtZW51J1xuICAgICAgICBzY3JvbGxpbmdTcGVlZDogODAwXG4gICAgICAgIGFmdGVyUmVuZGVyOiAtPlxuICAgICAgICAgICQoJ3ZpZGVvJykuZ2V0KDApLnBsYXkoKVxuICAgICAgICAgIHJldHVyblxuICAgICAgcmV0dXJuXG4gIGVsc2VcblxuXG4gICAgXG5GcmFuY2hpbm8uZmFjdG9yeSAnU29ja2V0JywgKHNvY2tldEZhY3RvcnkpIC0+XG4gIHNvY2tldEZhY3RvcnkoKVxuRnJhbmNoaW5vLmZhY3RvcnkgJ0RvY3MnLCAoU29ja2V0KSAtPlxuICBzZXJ2aWNlID0gdW5kZWZpbmVkXG4gIHNlcnZpY2UgPVxuICAgIGxpc3Q6IFtdXG4gICAgZmluZDogKHBlcm1hbGluaykgLT5cbiAgICAgIF8uZmluZCBzZXJ2aWNlLmxpc3QsIChkb2MpIC0+XG4gICAgICAgIGRvYy5wZXJtYWxpbmsgPT0gcGVybWFsaW5rXG4gIFNvY2tldC5vbiAnZG9jcycsIChkb2NzKSAtPlxuICAgIHNlcnZpY2UubGlzdCA9IGRvY3NcbiAgc2VydmljZVxuXG5cbkZyYW5jaGluby5jb250cm9sbGVyICdIb21lQ3RybCcsIFtcbiAgJyRzY29wZSdcbiAgKCRzY29wZSkgLT5cblxuICAgIGRvIC0+XG4gICAgICBib2R5RWwgPSB1bmRlZmluZWRcbiAgICAgIGNsb3NlYnRuID0gdW5kZWZpbmVkXG4gICAgICBjb250ZW50ID0gdW5kZWZpbmVkXG4gICAgICBpbml0ID0gdW5kZWZpbmVkXG4gICAgICBpbml0RXZlbnRzID0gdW5kZWZpbmVkXG4gICAgICBpc09wZW4gPSB1bmRlZmluZWRcbiAgICAgIG9wZW5idG4gPSB1bmRlZmluZWRcbiAgICAgIHRvZ2dsZU1lbnUgPSB1bmRlZmluZWRcbiAgICAgIGJvZHlFbCA9IGRvY3VtZW50LmJvZHlcbiAgICAgIGNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGVudC13cmFwJylcbiAgICAgIG9wZW5idG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb3Blbi1idXR0b24nKVxuICAgICAgY2xvc2VidG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2xvc2UtYnV0dG9uJylcbiAgICAgIGlzT3BlbiA9IGZhbHNlXG5cbiAgICAgIGluaXQgPSAtPlxuICAgICAgICBpbml0RXZlbnRzKClcbiAgICAgICAgcmV0dXJuXG5cbiAgICAgIGluaXRFdmVudHMgPSAtPlxuXG4gICAgICAgICQgPSB1bmRlZmluZWRcbiAgICAgICAgY3NzSWQgPSB1bmRlZmluZWRcbiAgICAgICAgaGVhZCA9IHVuZGVmaW5lZFxuICAgICAgICBsaW5rID0gdW5kZWZpbmVkXG4gICAgICAgIGlmIGRldmljZS5kZXNrdG9wKClcbiAgICAgICAgICBcbiAgICAgICAgZWxzZSBpZiBkZXZpY2UubW9iaWxlKClcbiAgICAgICAgICAkID0gZG9jdW1lbnRcbiAgICAgICAgICBjc3NJZCA9ICdteUNzcydcbiAgICAgICAgICBpZiAhJC5nZXRFbGVtZW50QnlJZChjc3NJZClcbiAgICAgICAgICAgIGhlYWQgPSAkLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF1cbiAgICAgICAgICAgIGxpbmsgPSAkLmNyZWF0ZUVsZW1lbnQoJ2xpbmsnKVxuICAgICAgICAgICAgbGluay5pZCA9IGNzc0lkXG4gICAgICAgICAgICBsaW5rLnJlbCA9ICdzdHlsZXNoZWV0J1xuICAgICAgICAgICAgbGluay50eXBlID0gJ3RleHQvY3NzJ1xuICAgICAgICAgICAgbGluay5ocmVmID0gJ2h0dHBzOi8vY29kZS5pb25pY2ZyYW1ld29yay5jb20vMS4wLjAtYmV0YS4xMy9jc3MvaW9uaWMubWluLmNzcydcbiAgICAgICAgICAgIGxpbmsubWVkaWEgPSAnYWxsJ1xuICAgICAgICAgICAgaGVhZC5hcHBlbmRDaGlsZCBsaW5rXG4gICAgICAgIGlmIGRldmljZS5kZXNrdG9wKClcbiAgICAgICAgICBvcGVuYnRuLmFkZEV2ZW50TGlzdGVuZXIgJ2NsaWNrJywgdG9nZ2xlTWVudVxuICAgICAgICAgIGlmIGNsb3NlYnRuXG4gICAgICAgICAgICBjbG9zZWJ0bi5hZGRFdmVudExpc3RlbmVyICdjbGljaycsIHRvZ2dsZU1lbnVcbiAgICAgICAgICBjb250ZW50LmFkZEV2ZW50TGlzdGVuZXIgJ2NsaWNrJywgKGV2KSAtPlxuICAgICAgICAgICAgdGFyZ2V0ID0gdW5kZWZpbmVkXG4gICAgICAgICAgICB0YXJnZXQgPSBldi50YXJnZXRcbiAgICAgICAgICAgIGlmIGlzT3BlbiBhbmQgdGFyZ2V0ICE9IG9wZW5idG5cbiAgICAgICAgICAgICAgdG9nZ2xlTWVudSgpXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgZWxzZVxuXG4gICAgICAgIFxuXG4gICAgICB0b2dnbGVNZW51ID0gLT5cbiAgICAgICAgaWYgaXNPcGVuXG4gICAgICAgICAgY2xhc3NpZS5yZW1vdmUgYm9keUVsLCAnc2hvdy1tZW51J1xuICAgICAgICBlbHNlXG4gICAgICAgICAgY2xhc3NpZS5hZGQgYm9keUVsLCAnc2hvdy1tZW51J1xuICAgICAgICBpc09wZW4gPSAhaXNPcGVuXG4gICAgICAgIHJldHVyblxuXG4gICAgICBpbml0KClcbiAgICAgIHJldHVyblxuXVxuRnJhbmNoaW5vLmNvbnRyb2xsZXIgJ0NvbnRhY3RTaGVldEN0cmwnLCAoJHNjb3BlLCAkaW9uaWNBY3Rpb25TaGVldCkgLT5cblxuICAkc2NvcGUuc2hvd0FjdGlvbnNoZWV0ID0gLT5cbiAgICAkaW9uaWNBY3Rpb25TaGVldC5zaG93XG4gICAgICB0aXRsZVRleHQ6ICdDb250YWN0IEZyYW5jaGlubydcbiAgICAgIGJ1dHRvbnM6IFtcbiAgICAgICAgeyB0ZXh0OiAnR2l0aHViIDxpIGNsYXNzPVwiaWNvbiBpb24tc2hhcmVcIj48L2k+JyB9XG4gICAgICAgIHsgdGV4dDogJ0VtYWlsIE1lIDxpIGNsYXNzPVwiaWNvbiBpb24tZW1haWxcIj48L2k+JyB9XG4gICAgICAgIHsgdGV4dDogJ1R3aXR0ZXIgPGkgY2xhc3M9XCJpY29uIGlvbi1zb2NpYWwtdHdpdHRlclwiPjwvaT4nIH1cbiAgICAgICAgeyB0ZXh0OiAnMjI0LTI0MS05MTg5IDxpIGNsYXNzPVwiaWNvbiBpb24taW9zLXRlbGVwaG9uZVwiPjwvaT4nIH1cbiAgICAgIF1cbiAgICAgIGNhbmNlbFRleHQ6ICdDYW5jZWwnXG4gICAgICBjYW5jZWw6IC0+XG4gICAgICAgIGNvbnNvbGUubG9nICdDQU5DRUxMRUQnXG4gICAgICAgIHJldHVyblxuICAgICAgYnV0dG9uQ2xpY2tlZDogKGluZGV4KSAtPlxuICAgICAgICBpZiBpbmRleCA9PSAyXG4gICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnMjI0LTI0MS05MTg5J1xuICAgICAgICBpZiBpbmRleCA9PSAyXG4gICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnaHR0cDovL3R3aXR0ZXIuY29tL2ZyYW5jaGlub19jaGUnXG4gICAgICAgIGlmIGluZGV4ID09IDFcbiAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICdtYWlsdG86ZnJhbmNoaW5vLm5vbmNlQGdtYWlsLmNvbSdcbiAgICAgICAgaWYgaW5kZXggPT0gMFxuICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJ2h0dHA6Ly9naXRodWIuY29tL2ZyYW5ndWNjJ1xuICAgICAgICB0cnVlXG5cbiAgcmV0dXJuXG5GcmFuY2hpbm8uY29udHJvbGxlciAnU2xpZGVzVGFwT25lQ3RybCcsICgkc2NvcGUpIC0+XG4gICRzY29wZS5kYXRlID0gJ05PVkVNQkVSIDIwMTQnXG4gICRzY29wZS50aXRsZSA9ICdUYXBjZW50aXZlIG1hbmFnZXIgVVggb3ZlcmhhdWwgYW5kIGZyb250LWVuZCdcbiAgJHNjb3BlLmltYWdlcyA9IFsge1xuICAgICdhbHQnOiAnVGFwY2VudGl2ZS5jb20gVVggb3ZlcmhhdWwgYW5kIFNQQSBmcm9udC1lbmQnXG4gICAgJ3VybCc6ICcvaW1nL2dpZi9yZXBvcnQuZ2lmJ1xuICAgICd0ZXh0JzogJzxwPlN0dWR5IHRoZSB1c2VyIGFuZCB0aGVpciBnb2FscyBhbmQgb3ZlcmhhdWwgdGhlIGV4cGVyaWVuY2Ugd2hpbGUgcmUtd3JpdGluZyB0aGUgZnJvbnQtZW5kIGluIEFuZ3VsYXIuPC9wPjxhIGhyZWY9XFwnaHR0cDovL3RhcGNlbnRpdmUuY29tXFwnIHRhcmdldD1cXCdfYmxhbmtcXCc+VmlzaXQgV2Vic2l0ZTwvYT4nXG4gIH0gXVxuRnJhbmNoaW5vLmNvbnRyb2xsZXIgJ1NsaWRlc1RhcFR3b0N0cmwnLCAoJHNjb3BlKSAtPlxuICAkc2NvcGUuZGF0ZSA9ICdPQ1RPQkVSIDIwMTQnXG4gICRzY29wZS50aXRsZSA9ICdEZXNrdG9wIGFuZCBtb2JpbGUgd2ViIGZyaWVuZGx5IG1hcmtldGluZyB3ZWJzaXRlJ1xuICAkc2NvcGUuaW1hZ2VzID0gWyB7XG4gICAgJ2FsdCc6ICdTb21lIGFsdCB0ZXh0J1xuICAgICd1cmwnOiAnL2ltZy9mcmFuY2hpbm8tdGFwY2VudGl2ZS15ZWxsb3cuanBnJ1xuICAgICd0ZXh0JzogJzxwPkNyZWF0ZSBhIGtub2Nrb3V0IGJyYW5kIHN0cmF0ZWd5IHdpdGggYW4gYXdlc29tZSBsb29rIGFuZCBmZWVsLiBNYWtlIGEgc29waGlzdGljYXRlZCBvZmZlcmluZyBsb29rIHNpbXBsZSBhbmQgZWFzeSB0byB1c2UuPC9wPjxhIGhyZWY9XFwnaHR0cDovL3RhcGNlbnRpdmUuY29tXFwnIHRhcmdldD1cXCdfYmxhbmtcXCc+VmlzaXQgV2Vic2l0ZTwvYT4nXG4gIH0gXVxuRnJhbmNoaW5vLmNvbnRyb2xsZXIgJ1NsaWRlc0NwZ0N0cmwnLCAoJHNjb3BlKSAtPlxuICAkc2NvcGUuZGF0ZSA9ICdKVUxZIDIwMTQnXG4gICRzY29wZS50aXRsZSA9ICdJZGVudGl0eSwgZnVsbC1zdGFjayBNVlAsIGFuZCBtYXJrZXRpbmcgd2Vic2l0ZSBmb3IgYSBuZXcgQ1BHIGVEaXN0cmlidXRpb24gY29tcGFueSdcbiAgJHNjb3BlLmltYWdlcyA9IFsge1xuICAgICdhbHQnOiAnU29tZSBhbHQgdGV4dCdcbiAgICAndXJsJzogJy9pbWcvZnJhbmNpbm9fY3BnaW8uanBnJ1xuICAgICd0ZXh0JzogJzxwPlR1cm4gYW4gb2xkIHNjaG9vbCBDUEcgYnVzaW5lc3MgaW50byBhIHNvcGhpc3RpY2F0ZWQgdGVjaG5vbG9neSBjb21wYW55LiBEZXNpZ24gc2VjdXJlLCBhdXRvbWF0ZWQgYW5kIHRyYW5zZm9ybWF0aXZlIHBsYXRmb3JtLCB0ZWNobmljYWwgYXJjaGl0ZWN0dXJlIGFuZCBleGVjdXRlIGFuIE1WUCBlbm91Z2ggdG8gYXF1aXJlIGZpcnN0IGN1c3RvbWVycy4gTWlzc2lvbiBhY2NvbXBsaXNoZWQuPC9wPjxhIGhyZWY9XFwnaHR0cDovL2NwZy5pb1xcJyB0YXJnZXQ9XFwnX2JsYW5rXFwnPlZpc2l0IFdlYnNpdGU8L2E+J1xuICB9IF1cbkZyYW5jaGluby5jb250cm9sbGVyICdTbGlkZXNNZWR5Y2F0aW9uQ3RybCcsICgkc2NvcGUpIC0+XG4gICRzY29wZS5kYXRlID0gJ0FQUklMIDIwMTQnXG4gICRzY29wZS50aXRsZSA9ICdVc2VyIGV4cGVyaWVuY2UgZGVzaWduIGFuZCByYXBpZCBwcm90b3R5cGluZyBmb3IgTWVkeWNhdGlvbiwgYSBuZXcgaGVhbHRoY2FyZSBwcmljZSBjb21wYXJpc29uIHdlYnNpdGUnXG4gICRzY29wZS5pbWFnZXMgPSBbXG4gICAge1xuICAgICAgJ2FsdCc6ICdTb21lIGFsdCB0ZXh0J1xuICAgICAgJ3VybCc6ICcvaW1nL2ZyYW5jaGluby1tZWR5Y2F0aW9uLmpwZydcbiAgICAgICd0ZXh0JzogJzxwPldhbHR6IHVwIGluIHRoZSBvbmxpbmUgaGVhbHRoY2FyZSBpbmR1c3RyeSBndW5zIGJsYXppbmcgd2l0aCBraWxsZXIgZGVzaWduIGFuZCBpbnN0aW5jdHMuIEdldCB0aGlzIG5ldyBjb21wYW55IG9mZiB0aGUgZ3JvdW5kIHdpdGggaXRcXCdzIE1WUC4gU3dpcGUgZm9yIG1vcmUgdmlld3MuPC9wPjxhIGhyZWY9XFwnaHR0cDovL21lZHljYXRpb24uY29tXFwnIHRhcmdldD1cXCdfYmxhbmtcXCc+VmlzaXQgV2Vic2l0ZTwvYT4nXG4gICAgfVxuICAgIHtcbiAgICAgICdhbHQnOiAnU29tZSBhbHQgdGV4dCdcbiAgICAgICd1cmwnOiAnL2ltZy9mcmFuY2hpbm8tbWVkeWNhdGlvbjIuanBnJ1xuICAgICAgJ3RleHQnOiAnJ1xuICAgIH1cbiAgICB7XG4gICAgICAnYWx0JzogJ1NvbWUgYWx0IHRleHQnXG4gICAgICAndXJsJzogJy9pbWcvZnJhbmNoaW5vLW1lZHljYXRpb24zLmpwZydcbiAgICB9XG4gICAge1xuICAgICAgJ2FsdCc6ICdTb21lIGFsdCB0ZXh0J1xuICAgICAgJ3VybCc6ICcvaW1nL2ZyYW5jaGluby1tZWR5Y2F0aW9uNC5qcGcnXG4gICAgfVxuICBdXG5GcmFuY2hpbm8uY29udHJvbGxlciAnU2xpZGVzQ1NUQ3RybCcsICgkc2NvcGUpIC0+XG4gICRzY29wZS5kYXRlID0gJ0FQUklMIDIwMTQnXG4gICRzY29wZS50aXRsZSA9ICdEZXNpZ25lZCBhbmQgZGV2ZWxvcGVkIGEgbmV3IHZlcnNpb24gb2YgdGhlIENoaWNhZ28gU3VuIFRpbWVzIHVzaW5nIGEgaHlicmlkIElvbmljL0FuZ3VsYXIgc3RhY2snXG4gICRzY29wZS5pbWFnZXMgPSBbXG4gICAge1xuICAgICAgJ2FsdCc6ICdTb21lIGFsdCB0ZXh0J1xuICAgICAgJ3VybCc6ICcvaW1nL2ZyYW5jaGluby1jc3QuanBnJ1xuICAgICAgJ3RleHQnOiAnPHA+SGVscCB0aGUgc3RydWdnbGluZyBtZWRpYSBnaWFudCB1cGdyYWRlIHRoZWlyIGNvbnN1bWVyIGZhY2luZyB0ZWNobm9sb2d5LiBDcmVhdGUgb25lIGNvZGUgYmFzZSBpbiBBbmd1bGFyIGNhcGFibGUgb2YgZ2VuZXJhdGluZyBraWNrLWFzcyBleHBlcmllbmNlcyBmb3IgbW9iaWxlLCB0YWJsZXQsIHdlYiBhbmQgVFYuJ1xuICAgIH1cbiAgICB7XG4gICAgICAnYWx0JzogJ1NvbWUgYWx0IHRleHQnXG4gICAgICAndXJsJzogJy9pbWcvZnJhbmNoaW5vLWNzdDIuanBnJ1xuICAgIH1cbiAgICB7XG4gICAgICAnYWx0JzogJ1NvbWUgYWx0IHRleHQnXG4gICAgICAndXJsJzogJy9pbWcvZnJhbmNoaW5vLWNzdDMuanBnJ1xuICAgIH1cbiAgXVxuRnJhbmNoaW5vLmNvbnRyb2xsZXIgJ1NsaWRlc0tvdXBuQ3RybCcsICgkc2NvcGUpIC0+XG4gICRzY29wZS5kYXRlID0gJ01BUkNIIDIwMTQnXG4gICRzY29wZS50aXRsZSA9ICdCcmFuZCByZWZyZXNoLCBtYXJrZXRpbmcgc2l0ZSBhbmQgcGxhdGZvcm0gZXhwZXJpZW5jZSBvdmVyaGF1bCdcbiAgJHNjb3BlLmltYWdlcyA9IFtcbiAgICB7XG4gICAgICAnYWx0JzogJ1NvbWUgYWx0IHRleHQnXG4gICAgICAndXJsJzogJy9pbWcvZnJhbmNoaW5vLWtvdXBuMS5qcGcnXG4gICAgfVxuICAgIHtcbiAgICAgICdhbHQnOiAnU29tZSBhbHQgdGV4dCdcbiAgICAgICd1cmwnOiAnL2ltZy9mcmFuY2hpbm8ta291cG4yLmpwZydcbiAgICB9XG4gICAge1xuICAgICAgJ2FsdCc6ICdTb21lIGFsdCB0ZXh0J1xuICAgICAgJ3VybCc6ICcvaW1nL2ZyYW5jaGluby1rb3Vwbi5qcGcnXG4gICAgfVxuICBdXG5GcmFuY2hpbm8uY29udHJvbGxlciAnU2xpZGVzVHJvdW5kQ3RybCcsICgkc2NvcGUpIC0+XG4gICRzY29wZS5kYXRlID0gJ0FVR1VTVCAyMDEzJ1xuICAkc2NvcGUudGl0bGUgPSAnU29jaWFsIHRyYXZlbCBtb2JpbGUgYXBwIGRlc2lnbiwgVVggYW5kIHJhcGlkIHByb3RvdHlwaW5nJ1xuICAkc2NvcGUuaW1hZ2VzID0gWyB7XG4gICAgJ2FsdCc6ICdTb21lIGFsdCB0ZXh0J1xuICAgICd1cmwnOiAnL2ltZy9mcmFuY2lub190cm91bmQuanBnJ1xuICAgICd0ZXh0JzogJ0Rlc2lnbiBhbiBJbnN0YWdyYW0gYmFzZWQgc29jaWFsIHRyYXZlbCBhcHAuIFdoeT8gSSBkb25cXCd0IGtub3cuJ1xuICB9IF1cbkZyYW5jaGluby5jb250cm9sbGVyICdTbGlkZXNNb250aGx5c0N0cmwnLCAoJHNjb3BlKSAtPlxuICAkc2NvcGUuZGF0ZSA9ICdGRUJSVUFSWSAyMDEzJ1xuICAkc2NvcGUudGl0bGUgPSAnQ3VzdG9tZXIgcG9ydGFsIHBsYXRmb3JtIFVYIGRlc2lnbiBhbmQgZnJvbnQtZW5kJ1xuICAkc2NvcGUuaW1hZ2VzID0gW1xuICAgIHtcbiAgICAgICdhbHQnOiAnU29tZSBhbHQgdGV4dCdcbiAgICAgICd1cmwnOiAnL2ltZy9mcmFuY2hpbm8tbW9udGhseXMtYml6Mi5qcGcnXG4gICAgfVxuICAgIHtcbiAgICAgICdhbHQnOiAnU29tZSBhbHQgdGV4dCdcbiAgICAgICd1cmwnOiAnL2ltZy9mcmFuY2hpbm9fbW9udGhseXMuanBnJ1xuICAgIH1cbiAgXVxuRnJhbmNoaW5vLmNvbnRyb2xsZXIgJ1NsaWRlc01vbnRobHlzVHdvQ3RybCcsICgkc2NvcGUpIC0+XG4gICRzY29wZS5kYXRlID0gJ01BUkNIIDIwMTInXG4gICRzY29wZS50aXRsZSA9ICdFbnRyZXByZW5ldXIgaW4gcmVzaWRlbmNlIGF0IExpZ2h0YmFuaydcbiAgJHNjb3BlLmltYWdlcyA9IFtcbiAgICB7XG4gICAgICAnYWx0JzogJ1NvbWUgYWx0IHRleHQnXG4gICAgICAndXJsJzogJy9pbWcvZnJhbmNoaW5vLW1vbnRobHlzNy5qcGcnXG4gICAgfVxuICAgIHtcbiAgICAgICdhbHQnOiAnU29tZSBhbHQgdGV4dCdcbiAgICAgICd1cmwnOiAnL2ltZy9mcmFuY2hpbm8tbW9udGhseXM1LmpwZydcbiAgICB9XG4gICAge1xuICAgICAgJ2FsdCc6ICdTb21lIGFsdCB0ZXh0J1xuICAgICAgJ3VybCc6ICcvaW1nL2ZyYW5jaGluby1tb250aGx5czIuanBnJ1xuICAgIH1cbiAgXVxuRnJhbmNoaW5vLmNvbnRyb2xsZXIgJ0Jsb2dDdHJsJywgKCRzY29wZSkgLT5cbiAgJHNjb3BlLmFydGljbGVzID0gW1xuICAgIHtcbiAgICAgICdkYXRlJzogJ1Bvc3RlZCBieSBGcmFuY2hpbm8gb24gRGVjZW1iZXIgMzEsIDIwMTQnXG4gICAgICAnaGVhZGluZyc6ICdHaXRmbG93PydcbiAgICAgICdhdXRob3JpbWcnOiAnL2ltZy9mcmFuay5wbmcnXG4gICAgICAnaW1nJzogJy9pbWcvZGVjL2dpdC1mbG93LmpwZydcbiAgICAgICdibG9iJzogJ0dvc2ggZGFybi1pdCwgdGVhbXMgZ2V0dGluZyBtb3JlIHN5bmNlZCB3aXRoIHRoZSBoZWxwIG9mIG5ldyBnaXQgbWV0aG9kb2xvZ2llcyBmb3IgdGVhbXMuIDxhIGhyZWY9XFwnaHR0cHM6Ly93d3cuYXRsYXNzaWFuLmNvbS9naXQvdHV0b3JpYWxzL2NvbXBhcmluZy13b3JrZmxvd3MvY2VudHJhbGl6ZWQtd29ya2Zsb3dcXCc+SSBjYW5cXCd0IGtlZXAgdXA8L2E+ICdcbiAgICB9XG4gICAge1xuICAgICAgJ2RhdGUnOiAnUG9zdGVkIGJ5IEZyYW5jaGlubyBvbiBEZWNlbWJlciAyMiwgMjAxNCdcbiAgICAgICdoZWFkaW5nJzogJ09oIHNoaXQsIEFuZ3VsYXIgMi4wJ1xuICAgICAgJ2F1dGhvcmltZyc6ICcvaW1nL2ZyYW5rLnBuZydcbiAgICAgICdpbWcnOiAnL2ltZy9ncmFwaF9zcGEuanBnJ1xuICAgICAgJ2Jsb2InOiAnUGFyZG9uIG15IHNjYXR0ZXJlZCBicmFpbiByaWdodCBub3cuIFNvIGFmdGVyIHdhdGNoaW5nIHRoZSA8YSBocmVmPVxcJ2h0dHBzOi8vd3d3LnlvdXR1YmUuY29tL3dhdGNoP3Y9Z05tV3liQXlCSElcXCcgdGFyZ2V0PVxcJ19ibGFua1xcJz5FdXJvIG5nLWNvbmYgdmlkZW88L2E+IHdoZXJlIHRoZSBjcmVhdG9ycyBvZiBBbmd1bGFyIDIuMCBiYXNpY2FsbHkgc2FpZCwgZXZlcnl0aGluZyBpbiBjaGFuZ2luZywgSSBkaWQgd2hhdCBtb3N0IGRldmVsb3BlcnMgd291bGQgZG8gYW5kIGNvbXBsZXRlbHkgZnJlYWtlZC4gSSBtdXN0IHNheSwgSVxcJ20gc3RpbGwsIHRob3JvdWdobHkgY29uZnVzZWQsIGV2ZW4gYWZ0ZXIgc3BlYWtpbmcgdG8gYSBkb3plbiBvciBzbyBrZXkgZmlndXJlcyBpbiB0aGUgaW5kdXN0cnkuIE15IGZpcnN0IHJlYWN0aW9uPyBUd2VldCBvdXQgaW4gYW5nZXIuIEYtVSBBbmd1bGFyIHRlYW0gSSBwcm9ub3VuY2VkLiBGLVUuIFRoZW4sIG1vcmUgcGFuaWMgYXMgSSBjb250aW51ZWQgdG8gcmVhZCBzb21lIG9mIHRoZSBwb3N0cyBieSBvdGhlcnMgZmVlbGluZyB0aGUgc2FtZSB3YXkuIEkgYXNrZWQgdGhlIEFuZ3VsYXIgdGVhbSwgaG93IHRoZXkgd2VyZSBoZWxwaW5nIHRoZSBpbmR1c3RyeSBieSB0ZWxsaW5nIHVzIGluIGEgeWVhciBhbnl0aGluZyB3ZSBoYXZlIGRldmVsb3BlZCBpbiBBbmd1bGFyIHdvdWxkIGJlIGdhcmJhZ2UuIEkgZGlkIHdoYXQgb3RoZXJzIHNlZW1lZCB0byBiZSBkb2luZyBhbmQgaW1tZWRpYXRlbHkgc3RhcnRlZCBsb29raW5nIGZvciBhbm90aGVyIGZyYW1ld29yayB0byBzdHVkeSBhbmQgaW52ZXN0IGluLiBUaGF0XFwncyB3aGVuIEkgZm91bmQgPGEgaHJlZj1cXCdodHRwOi8vd3d3LmluZGVlZC5jb20vam9idHJlbmRzP3E9ZW1iZXIuanMlMkMrYW5ndWxhci5qcyUyQytyZWFjdC5qcyUyQytiYWNrYm9uZS5qcyZsPVxcJyB0YXJnZXQ9XFwnX2JsYW5rXFwnPnRoaXMgZ3JhcGg8L2E+IHRlbGxpbmcgbWUgdGhlIG9ubHkgb3RoZXIgU1BBIGZyYW1ld29yayB0aGF0IGhhcyBhcyBtdWNoIGFjdGl2aXR5IGFzIEFuZ3VsYXIgaXMgZ29vZCBvbGQgQmFja2JvbmUuIDxiciAvPjxiciAvPkJhY2tib25lLCBteSBmaXJzdCBTUEEgbG92ZSAtIHdlXFwndmUgbWV0IGJlZm9yZS4gRXZlbiByZWNlbnRseS4gQnV0IElcXCd2ZSBiZWVuIGxvc3QuIElcXCd2ZSBiZWVuIGlubG92ZSB3aXRoIEVnZ2hlYWQuaW8gYW5kIHRoaW5ncyBsaWtlIElvbmljLCBTcHJhbmd1bGFyIGFuZCBhbGwgc29ydHMgb2YgdGhpbmdzIHRoYXQgZ2l2ZSBtZSBzdHVmZiBmb3IgZnJlZS4gQnV0IHRoZW4gSSBub3RpY2VkIHNvbWV0aGluZy4gVGhlIGJhY2tib25lIGNvbW11bml0eSBoYXMgYmVlbiBxdWlldGx5IGRvaW5nIGl0XFwncyB0aGluZyBmb3IgYSBtaW51dGUgbm93LiBCYWNrYm9uZXJhaWxzLmNvbT8gQXJlIHlvdSBraWRkaW5nLCB3aGF0IGEgcmVzb3VyY2UuIE1hcmlvbmV0dGU/IExvdmVseS4gVGhlIGxpc3QgZ29lcyBvbi4gSSBub3cgaGF2ZSBkb3plbnMgb2YgcmVhc29ucyB0byBnaXZlIEJhY2tib25lIGFub3RoZXIgbG9vay4gQW5kIHRoZW4sIGl0IGhhcHBlbmVkLiBJIGVtYWlsZWQgTWF4IEx5bmNoIG92ZXIgYXQgSW9uaWMgYW5kIHNhaWQsIEkgdGhpbmsgeW91IG5lZWQgdG8gYWRkcmVzcyB0aGUgZnJpZ2h0IG9mIEFuZ3VsYXIgMi4wIHNvbWUgb2YgdXMgYXJlIGV4cGVyaWVuY2luZy4gQW5kIHRoZW4gaGUgc2hlZCBzb21lIGxpZ2h0LiBBZnRlciBhIHJlYWxseSBhd2Vzb21lIHJlc3BvbnNlLCBoZSBzYWlkIHNvbWV0aGluZyBhdCB0aGUgZW5kIHRvIHRoZSB0dW5lIG9mLiBBbmd1bGFyIDIgaXMgYWxsIGFib3V0IG1ha2luZyBpdCBlYXNpZXIgYW5kIGZhc3RlciB0byB1c2UsIGFuZCBtb3JlIGFwcHJvcHJpYXRlIGZvciBmdXR1cmUgYnJvd3NlciBzdGFuZGFyZHMgbGlrZSBXZWIgQ29tcG9uZW50cy4gSG1tLi4uIDxiciAvPjxiciAvPldlYiBDb21wb25lbnRzLiBZb3UgbWVhbiwgdGhpcyBzdHVmZiBJXFwndmUgYmVlbiBoZWFyaW5nIGFib3V0LCB0aGluZ3MgbGlrZSBQb2x5bWVyLCBhbmQgdGhlc2UgbmV3IHNwZWNzIHRoZSBicm93c2VyIGFscmVhZHkgaGFzIGJlZ3VuIHRvIHN1cHBvcnQsIGxpa2UgU2hhZG93IERvbSwgY3VzdG9tIGVsZW1lbnRzIGFuZCBpbXBvcnRzLiBTby4gV2hlcmUgdGhlIGhlbGwgYW0gSSByaWdodCBub3c/IEZvciBub3csIEkgdGhpbmsgSVxcJ2xsIHRha2UgYSBicmVhayBmcm9tIHN0cmVzc2luZyBhYm91dCBTUEEgZnJhbWV3b3JrcyBhbmQgbG9vayBhdCA8YSBocmVmPVxcJ2h0dHBzOi8vd3d3LnBvbHltZXItcHJvamVjdC5vcmcvXFwnIHRhcmdldD1cXCdfYmxhbmtcXCc+UG9seW1lcjwvYT4sIDxhIGhyZWY9XFwnaHR0cDovL3dlYmNvbXBvbmVudHMub3JnL1xcJyB0YXJnZXQ9XFwnX2JsYW5rXFwnPldlYiBDb21wb25lbnRzPC9hPiwgRTYgYW5kIHN0dWR5IHVwIG9uIDxhIGhyZWY9XFwnaHR0cHM6Ly9tYXRlcmlhbC5hbmd1bGFyanMub3JnLyMvXFwnIHRhcmdldD1cXCdfYmxhbmtcXCc+TWF0ZXJpYWwgRGVzaWduPC9hPiBmb3IgYSBtaW51dGUuJ1xuICAgIH1cbiAgICB7XG4gICAgICAnZGF0ZSc6ICdQb3N0ZWQgYnkgRnJhbmNoaW5vIG9uIERlY2VtYmVyIDEyLCAyMDE0J1xuICAgICAgJ2hlYWRpbmcnOiAnTXkgcGF0aCB0byBsZWFybmluZyBTd2lmdCdcbiAgICAgICdhdXRob3JpbWcnOiAnL2ltZy9mcmFuay5wbmcnXG4gICAgICAnaW1nJzogJy9pbWcvZGVjL25ld3NsZXR0ZXItc3dpZnRyaXMtaGVhZGVyLmdpZidcbiAgICAgICdibG9iJzogJ0lcXCd2ZSBiZWVuIGFuIE1WQyBkZXZlbG9wZXIgaW4gZXZlcnkgbGFuZ3VhZ2UgZXhjZXB0IGZvciBpT1MuIFRoaXMgcGFzdCBPY3RvYmVyLCBJIHRvb2sgbXkgZmlyc3QgcmVhbCBkZWVwIGRpdmUgaW50byBpT1MgcHJvZ3JhbW1pbmcgYW5kIHN0YXJ0ZWQgd2l0aCBTd2lmdC4gVGhlcmUgYXJlIHR3byBncmVhdCB0dXRvcmlhbHMgb3V0IHRoZXJlLiBUaGUgZmlyc3QgaXMgZnJvbSBibG9jLmlvIGFuZCBpcyBmcmVlLiBJdFxcJ3MgYSBnYW1lLCBTd2lmdHJpcywgc28gZ2V0IHJlYWR5IGZvciBzb21lIGFjdGlvbi4gPGJyIC8+PGJyIC8+IFRoZSBzZWNvbmQgd2lsbCBoZWxwIHlvdSBidWlsZCBzb21ldGhpbmcgbW9yZSBhcHBpc2gsIGl0XFwncyBieSBBcHBjb2RhLiBHb3QgdGhlaXIgYm9vayBhbmQgd2lsbCBiZSBkb25lIHdpdGggaXQgdGhpcyB3ZWVrLiBTbyBmYXIsIGJvb2tzIG9rLCBidXQgaXQgbW92ZXMgcmVhbGx5IHNsb3cuIElcXCdsbCBwb3N0IGEgYmxvZyBpbiBhIGZldyBkYXlzIHdpdGggbGlua3MgdG8gdGhlIGFwcCB3YXMgYWJsZSB0byBidWlsZC4nXG4gICAgICAncmVzb3VyY2UxJzogJ2h0dHBzOi8vd3d3LmJsb2MuaW8vc3dpZnRyaXMtYnVpbGQteW91ci1maXJzdC1pb3MtZ2FtZS13aXRoLXN3aWZ0J1xuICAgICAgJ3Jlc291cmNlMic6ICdodHRwOi8vd3d3LmFwcGNvZGEuY29tL3N3aWZ0LydcbiAgICB9XG4gICAge1xuICAgICAgJ2RhdGUnOiAnUG9zdGVkIGJ5IEZyYW5jaGlubyBvbiBEZWNlbWJlciAxMSwgMjAxNCdcbiAgICAgICdoZWFkaW5nJzogJ1doeSBJIGdldCBnb29zZSBidW1wcyB3aGVuIHlvdSB0YWxrIGFib3V0IGF1dG9tYXRlZCBlbWFpbCBtYXJrZXRpbmcgYW5kIHNlZ21lbnRhdGlvbiBhbmQgY3VzdG9tZXIuaW8gYW5kIHRoaW5ncyBsaWtlIHRoYXQuJ1xuICAgICAgJ2F1dGhvcmltZyc6ICcvaW1nL2ZyYW5rLnBuZydcbiAgICAgICdpbWcnOiAnL2ltZy9kZWMvcHJlcGVtYWlscy5wbmcnXG4gICAgICAnYmxvYic6ICdJIGdldCB0ZWFyeSBleWVkIHdoZW4gSSB0YWxrIGFib3V0IG15IHdvcmsgYXQgQmVuY2hQcmVwLmNvbS4gSW4gc2hvcnQsIEkgd2FzIHRoZSBmaXJzdCBlbXBsb3llZSBhbmQgaGVscGVkIHRoZSBjb21wYW55IGdldCB0byB0aGVpciBzZXJpZXMgQiBuZWFyIHRoZSBlbmQgb2YgeWVhciB0d28uIEkgZ290IGEgbG90IGRvbmUgdGhlcmUsIGFuZCBvbmUgb2YgdGhlIHRoaW5ncyBJIHJlYWxseSBlbmpveWVkIHdhcyBidWlsZGluZyBvdXQgdGVjaG5vbG9neSB0byBzZWdtZW50IGxlYWRzLCBicmluZyBkaWZmZXJlbnQgdXNlcnMgZG93biBkaWZmZXJlbnQgY29tbXVuaWNhdGlvbiBwYXRocyBhbmQgaG93IEkgbWFwcGVkIG91dCB0aGUgZW50aXJlIHN5c3RlbSB1c2luZyBjb21wbGV4IGRpYWdyYW1zIGFuZCB3b3JrZmxvd3MuIDxiciAvPjxiciAvPlNvbWUgb2YgdGhlIHRvb2xzIHdlcmUgYnVpbHQgYW5kIGJhc2VkIG9uIHF1ZXMgbGlrZSBSZWRpcyBvciBSZXNxdWUsIG90aGVycyB3ZSBidWlsdCBpbnRvIEV4YWN0VGFyZ2V0IGFuZCBDdXN0b21lci5pby4gSW4gdGhlIGVuZCwgSSBiZWNhbWUgc29tZXdoYXQgb2YgYW4gZXhwZXJ0IGF0IG1vbmV0aXppbmcgZW1haWxzLiBXaXRoaW4gb3VyIGVtYWlsIG1hcmtldGluZyBjaGFubmVsLCB3ZSBleHBsb3JlZCB0YWdnaW5nIHVzZXJzIGJhc2VkIG9uIHRoZWlyIGFjdGlvbnMsIHN1Y2ggYXMgb3BlbnMgb3Igbm9uIG9wZW5zLCBvciB3aGF0IHRoZXkgY2xpY2tlZCBvbiwgd2UgdGFyZ2VkIGVtYWlsIHVzZXJzIHdobyBoYWQgYmVlbiB0b3VjaGVkIHNldmVuIHRpbWVzIHdpdGggc3BlY2lhbCBpcnJpc2l0YWJsZSBzYWxlcywgYmVjYXVzZSB3ZSBrbm93IGFmdGVyIDYgdG91Y2hlcywgd2UgY291bGQgY29udmVydC4gVGhlc2UgdHJpY2tzIHdlIGxlYXJuZWQgbGVkIHRvIDI1LTMwayBkYXlzLCBhbmQgZXZlbnR1YWxseSwgZGF5cyB3aGVyZSB3ZSBzb2xkIDEwMGsgd29ydGggb2Ygc3Vic2NyaXB0aW9ucy4gPGJyIC8+PGJyIC8+U28sIG15IHBvaW50PyBEb25cXCd0IGJlIHN1cnByaXNlZCBpZiBJIGdlZWsgb3V0IGFuZCBmYWludCB3aGVuIEkgaGVhciB5b3UgdGFsayBhYm91dCB0cmFuc2FjdGlvbmFsIGVtYWlsaW5nIGFuZCBjYWRlbmNlcyBhbmQgY29uc3VtZXIgam91cm5pZXMgYW5kIHN0dWZmIGxpa2UgdGhhdC4nXG4gICAgfVxuICAgIHtcbiAgICAgICdkYXRlJzogJ1Bvc3RlZCBieSBGcmFuY2hpbm8gb24gRGVjZW1iZXIgMTAsIDIwMTQnXG4gICAgICAnaGVhZGluZyc6ICdJZiBJIGNvdWxkIGhhdmUgb25lIHdpc2g7IEkgZ2V0IHRvIHVzZSB0aGlzIG1ldGhvZCB3aGVuIGRlc2lnbmluZyB5b3VyIGNvbnN1bWVyIGpvdXJuZXkgZnVubmVsLidcbiAgICAgICdhdXRob3JpbWcnOiAnL2ltZy9mcmFuay5wbmcnXG4gICAgICAnaW1nJzogJy9pbWcvZGVjL3V4X2JvYXJkLmpwZydcbiAgICAgICdibG9iJzogJ1NvIGFmdGVyIGEgYnVuY2ggb2YgZXRobm9ncmFwaGljIHN0dWRpZXMgZnJvbSBwZXJzb25hIG1hdGNoZXMgSSBnYXRoZXIgaW4tcGVyc29uLCBJIGdldCB0byBmaWxsIGEgd2FsbCB1cCB3aXRoIGtleSB0aGluZ3MgcGVvcGxlIHNhaWQsIGZlbHQsIGhlYXJkIC0gbW90aXZhdG9ycywgYmFycmllcnMsIHF1ZXN0aW9ucywgYXR0aXR1ZGVzIGFuZCBzdWNoLiBJIHRoZW4gZ3JvdXAgdGhlc2UgcG9zdC1pdCB0aG91Z2h0cyBpbiB2YXJpb3VzIHdheXMsIGxvb2tpbmcgZm9yIHBhdHRlcm5zLCBzZW50aW1lbnQsIG5ldyBpZGVhcy4gPGJyIC8+PGJyIC8+SSB0aGVuIHRha2UgdGhpcyByaWNoIGRhdGEgYW5kIGRldmVsb3AgYSB3aGF0IGNvdWxkIGJlIGJyYW5kaW5nLCBhIGxhbmRpbmcgcGFnZSBvciBhbiBlbWFpbCAtIHdpdGggd2hhdCBJIGNhbGwsIGFuIGludmVydGVkIHB5cmFtaWQgYXBwcm9hY2ggdG8gY29udGVudCwgd2hlcmUgYWRkcmVzc2luZyB0aGUgbW9zdCBpbXBvcnRhbnQgdGhpbmdzIGZvdW5kIGluIHRoZSB1c2VyIHJlc2VhcmNoIGdldCBhZGRyZXNzZWQgaW4gYSBoZXJpYXJjaGljYWwgb3JkZXIuIEkgY3JlYXRlIDUtNiBpdGVyYXRpb25zIG9mIHRoZSBsYW5kaW5nIHBhZ2UgYW5kIHJlLXJ1biB0aGVtIHRocm91Z2ggYSBzZWNvbmQgZ3JvdXAgb2YgcGFydGljaXBhbnRzLCBzdGFrZWhvbGRlcnMgYW5kIGZyaWVuZHMuIEkgdGhlbiB0YWtlIGV2ZW4gbW9yZSBub3RlcyBvbiBwZW9wbGVzIHNwZWFrLWFsb3VkIHJlYWN0aW9ucyB0byB0aGUgbGFuZGluZyBwYWdlcy4gQWZ0ZXIgdGhpcywgSVxcJ20gcmVhZHkgdG8gZGVzaWduIHRoZSBmaW5hbCBjb3B5IGFuZCBwYWdlcyBmb3IgeW91ciBmdW5uZWwuJ1xuICAgIH1cbiAgICB7XG4gICAgICAnZGF0ZSc6ICdQb3N0ZWQgYnkgRnJhbmNoaW5vIG9uIERlY2VtYmVyIDksIDIwMTQnXG4gICAgICAnaGVhZGluZyc6ICdXaG8gc2F5cyBJIGRvblxcJ3QgYmVsb25nIGhlcmU/J1xuICAgICAgJ2F1dGhvcmltZyc6ICcvaW1nL2ZyYW5rLnBuZydcbiAgICAgICdpbWcnOiAnL2ltZy9kZWMvdWNsYS5qcGcnXG4gICAgICAnYmxvYic6ICdUaGlzIGNvbWluZyB3ZWVrZW5kIHRoZXJlXFwncyBwcm9iYWJseSBhIGhhY2thdGhvbiBnb2luZyBvbiBpbiB5b3VyIGNpdHkuIFNvbWUgb2YgdGhlbSBhcmUgZ2V0dGluZyByZWFsbHkgYmlnLiBJIHdhc25cXCd0IHJlZ2lzdGVyZWQgZm9yIExBIEhhY2tzIHRoaXMgc3VtbWVyLiBJIGRvblxcJ3QgZXZlbiBrbm93IGhvdyBJIGVuZGVkIHVwIHRoZXJlIG9uIGEgRnJpZGF5IG5pZ2h0LCBidXQgd2hlbiBJIHNhdyB3aGF0IHdhcyBnb2luZyBvbiwgSSBncmFiYmVkIGEgY2hhaXIgYW5kIHN0YXJ0ZWQgaGFja2luZyBhd2F5LiBXb3JyaWVkIEkgaGFkIGp1c3Qgc251Y2sgaW4gdGhlIGJhY2sgZG9vciBhbmQgc3RhcnRlZCBjb21wZXRpbmcsIG15IHJpZGUgbGVmdCBhbmQgdGhlcmUgSSB3YXMsIGZvciB0aGUgbmV4dCB0d28gZGF5cy4gPGJyIC8+PGJyIC8+VGhhdFxcJ3MgcmlnaHQuIEkgc251Y2sgaW4gdGhlIGJhY2sgb2YgTEEgSGFja3MgbGFzdCBzdW1tZXIgYXQgVUNMQSBhbmQgaGFja2VkIHdpdGgga2lkcyAxMCB5ZWFycyB5b3VuZ2VyIHRoYW4gbWUuIEkgY291bGRuXFwndCBtaXNzIGl0LiBJIHdhcyBmbG9vcmVkIHdoZW4gSSBzYXcgaG93IG1hbnkgcGVvcGxlIHdlcmUgaW4gaXQuIE1lLCBiZWluZyB0aGUgbWlzY2hldmlvdXMgaGFja2VyIEkgYW0sIEkgdGhvdWdodCBpZiBJIHVzZWQgdGhlIGVuZXJneSBvZiB0aGUgZW52aXJvbm1lbnQgdG8gbXkgYWR2YW50YWdlLCBJIGNvdWxkIGJ1aWxkIHNvbWV0aGluZyBjb29sLiBMb25nIHN0b3J5IHNob3J0LCBsZXQgbWUganVzdCBzYXksIHRoYXQgaWYgeW91IGhhdmUgYmVlbiBoYXZpbmcgYSBoYXJkIHRpbWUgbGF1bmNoaW5nLCBzaWduIHVwIGZvciBhIGhhY2thdGhvbi4gSXRcXCdzIGEgZ3VhcmFudGVlZCB3YXkgdG8gb3Zlci1jb21wZW5zYXRlIGZvciB5b3VyIGNvbnN0YW50IGZhaWx1cmUgdG8gbGF1bmNoLiBNb3JlIG9uIHdoYXQgaGFwcGVuZWQgd2hlbiBJIHRvb2sgdGhlIHN0YWdlIGJ5IHN1cnByaXNlIGFuZCBnb3QgYm9vdGVkIGxhdGVyLi4uJ1xuICAgIH1cbiAgICB7XG4gICAgICAnZGF0ZSc6ICdQb3N0ZWQgYnkgRnJhbmNoaW5vIG9uIERlY2VtYmVyIDgsIDIwMTQnXG4gICAgICAnaGVhZGluZyc6ICdTdGFydGVkIGluIEVtYmVyLmpzLCBmaW5pc2hlZCBpbiBBbmd1bGFyLmpzLiBXaHkgYW5kIGhvdyBkaWQgdGhpcyBoYXBwZW4/J1xuICAgICAgJ2F1dGhvcmltZyc6ICcvaW1nL2ZyYW5rLnBuZydcbiAgICAgICdpbWcnOiAnL2ltZy9kZWMvdXgxLmpwZydcbiAgICAgICdibG9iJzogJ0kgZ290IGxvdmUgZm9yIGFsbCBTUEEgZnJhbWV3b3Jrcy4gQ29sbGVjdGl2ZWx5LCB0aGV5IGFsbCBwdXNoIHRoZSBlbnZlbG9wZS4gTXkgZmlyc3QgY2xpZW50LXNpZGUgTVZDIHByb2plY3Qgd2FzIGEgYmFja2JvbmUgcHJvamVjdCAtIGFuZCB3ZSBzdGFydGVkIHdoZW4gdGhleSB3ZXJlIGluIEJldGEuIFRoYXQgcHJvamVjdCB3YXMgQmVuY2hQcmVwLiBBdCB0aGUgdGltZSwgYXMgYSBmcm9udC1lbmQgZGV2ZWxvcGVyLCBJIHdhcyBjb25mdXNlZCBieSB0aGUgc3dlZXBpbmcgY2hhbmdlcyB0byBob3cgdGhpbmdzIG5lZWRlZCB0byBiZSBkb25lLiBGdWxsIGZsZWRnZWQgTVZDIGZyYW1ld29ya3MgaW4gSmF2YVNjcmlwdCBsZW5kZWQgYSB3aG9sZSBuZXcgc3ludGF4LCBhbmQgdG8gdG9wIGl0IG9mZiwgb3VyIGVuZ2luZWVycyBvbiB0aGUgdGVhbSB3ZXJlIHVzaW5nIENvZmZlZVNjcmlwdCwgSEFNTCwgU0FTUyBhbmQgSmFzbWluZSwgZXRjLiBNeSBmaXJzdCBTUEEgcHJvamVjdCBkaWQgbm90IGdvIHdlbGwgYW5kIGl0IHdhc25cXCd0IHVudGlsIHdlIGNvbXBsZXRlbHkgcmUtd3JvdGUgdGhlIHNvZnR3YXJlIHRoYXQgSSBzdGFydGVkIHVuZGVyc3RhbmRpbmcgZXZlcnl0aGluZyBjbGVhcmx5LiBUd28geWVhcnMgbGF0ZXIsIGEgbmV3IHRlYW0gSSB3YXMgd29ya2luZyB3aXRoIGRlY2lkZWQgdG8gYnVpbGQgPGEgaHJlZj1cXCdodHRwOi8vYWdlbnRydW4uY29tXFwnIHRhcmdldD1cXCdfYmxhbmtcXCc+QWdlbnRydW4uY29tPC9hPiBpbiBFbWJlci5qcy4gV2UgZG92ZSBpbi4gRm91ciBtb250aHMgbGF0ZXIsIHdlIHBvcnRlZCB0byBBbmd1bGFyIGFuZCBzaW5jZSwgSVxcJ3ZlIG5ldmVyIGxvb2tlZCBiYWNrLiBJXFwnbSBvbiBteSBmaWZ0aCBvciBzaXh0aCBhbmd1bGFyIHByb2plY3Qgbm93IGFuZCBJIGRvblxcJ3QgcGxhbiBvbiBjaGFuZ2luZyBmcmFtZXdvcmtzIGZvciBhIHdoaWxlIC0gYXQgbGVhc3QgcGVyc29uYWxseS4gPGJyIC8+PGJyIC8+VGhlIGFuZ3VsYXIgbW92ZW1lbnQgcmVtaW5kcyBtZSB0aGUgbW9zdCBvZiB0aGUgUm9SIG1vdmVtZW50LiBJIGRvblxcJ3QgZ2V0IHN0dWNrIHRyeWluZyB0byBkbyB0aGluZ3MgbGlrZSBJIGRvIGluIEJhY2tib25lIG9yIEVtYmVyLiBJIGNvdWxkIGdldCBpbnRvIGRpc2N1c3Npb24gYW5kIHRlY2huaWNhbCBleGFtcGxlcywgYnV0IHRoZXJlIGFyZSBiZXR0ZXIgcGxhY2VzIHRvIGNvbXBhcmUgdGhlIHR3by4gSSBjYW5cXCd0IHdhaXQgZm9yIHRoZSBjb21wbGV0ZWx5IHJldmFtcGVkIEFuZ3VsYXIgMi4wIGFuZCBhbSBsb29raW5nIGZvcndhcmQgdG8gYSA1LTcgeWVhciBmdXR1cmUgd2l0aCBBbmd1bGFyIGJlZm9yZSBzb21ldGhpbmcgbmV3IGNvbWVzIG91dCwgc29tZXRoaW5nIHRoYXQgcGVyaGFwcyBqdXN0IGJ1aWxkcyBhcHBzIGZvciB5b3UgYnkgcmVhZGluZyB5b3VyIG1pbmQuIDxiciAvPjxiciAvPk9oLCBhbmQgaWYgeW91ciB3b25kZXJpbmcgd2hvIGRlc2lnbmVkIHRoaXMgbG92ZWx5IHdlYnNpdGUsIHRoYXQgd2FzIHlvdXJzIHRydWx5LiBJIGxlZCB0aGUgVVggcmVzZWFyY2gsIFVYIHByb3RvdHlwaW5nLCB1c2VyIHJlc2VhcmNoIGFuZCBncmFwaGljIGRlc2lnbiBvZiB0aGlzIHByb2R1Y3QuJ1xuICAgIH1cbiAgICB7XG4gICAgICAnZGF0ZSc6ICdQb3N0ZWQgYnkgRnJhbmNoaW5vIG9uIERlY2VtYmVyIDcsIDIwMTQnXG4gICAgICAnaGVhZGluZyc6ICdQbGVhc2UgZG9uXFwndCBhc2sgbWUgYWJvdXQgbXkgYXJ0IGFuZCBtaXhlZCBtZWRpYSBiYWNrZ3JvdW5kLiBJIG1pZ2h0IHRvdGFsbHkgYXZvaWQgdGhlIHF1ZXN0aW9uLidcbiAgICAgICdhdXRob3JpbWcnOiAnL2ltZy9mcmFuay5wbmcnXG4gICAgICAnaW1nJzogJy9pbWcvZGVjL21peGVkLmpwZydcbiAgICAgICdibG9iJzogJ0kgaGF2ZSBhIGh1Z2UgY29tcGxleCBhYm91dCBteSBoeWJyaWQgYmFja2dyb3VuZC4gSSBjYW5cXCd0IHRlbGwgeW91IGhvdyBtYW55IHRpbWVzIElcXCd2ZSBiZWVuIG9uIGFuIGludGVydmlldyB3aGVyZSBJXFwndmUgdHJpZWQgdG8gZXhwbGFpbiB0aGUgZmFjdCB0aGF0IElcXCdtIGFuIGFydGlzdCBhbmQgYSBwcm9ncmFtbWVyLiBUaGUgbWludXRlIEkgZG8gdGhpcywgSVxcJ20gYWxtb3N0IGluc3RhbnRseSB3cml0dGVuIG9mZiBhcyBhIGphY2stb2YtYWxsIHRyYWRlcyBvciB3ZWFrIG9uIG9uZSBzaWRlLiA8YnIgLz48YnIgLz5TbywgSVxcJ20gYWJvdXQgdG8gb2ZmaWNpYWxseSBleHBsYWluIHRvIGV2ZXJ5b25lIHNvbWV0aGluZyBJXFwnbSBwcmV0dHkgc2Vuc2F0aXZlIGFib3V0LiBJXFwnbSBhIHZlcnkgdGFsZW50ZWQgY3JlYXRpdmUgZGlyZWN0b3Igd2l0aCBhIHZlcnkgc29waGlzdGljYXRlZCB0ZWNobmljYWwgYmFja2dyb3VuZC4gSSBtYWtlIGV4cGxhaW5lciB2aWRlb3MsIEkgZmlsbSwgSSBkbyB1c2VyIHJlc2VhcmNoLCBJIGRlc2lnbiBhbmQgSSBwcm9ncmFtLiBZZXMsIEkgcHJvZ3JhbSAtIEkgd2lsbCBmcm9udC1lbmQgd2l0aCB0aGUgYmVzdCBhbmQgaGF2ZSBhIGtuYWNrIGZvciBmcm9udC1lbmQgTVZDIGZyYW1ld29ya3MuIDxiciAvPjxiciAvPlllcywgdGhlcmUgYXJlIHNvbWUgdGhpbmdzIElcXCdtIG5vdCBnb29kIGF0LiBJXFwnbSBub3QgeW91ciBnZW5pdXMgcHJvZ3JhbW1lciB0aGF0IHdpbGwgbGVhZCB5b3VyIG90aGVyIHByb2dyYW1tZXJzIHRvIHRoZSBwcm9taXNlIGxhbmQsIGJ1dCBub3Qgd2VhayBsaWtlIHlvdXIgdGhpbmtpbmcgLSBJIGp1c3Qga25vdyBhIGxvdCBvZiBoYWNrZXJzIHdobyBkb25cXCd0IGNvbmNlcm4gdGhlbXNlbHZlcyB3aXRoIHRoaW5ncyB0aGF0IEkgZ2V0IGxvc3QgaW4sIGxpa2UgZGVzaWduIG9yIGNvbnRlbnQgc3RyYXRlZ3ksIG9yIHVzZXIgcmVzZWFyY2guIFNvIHdoZW4gSSBzYXkgd2VhaywgSSBtZWFuIHdlYWsgbGlrZSwgSVxcJ20gdGFsa2luZywgcG9zc2libHksIGZhdWwtdG9sZXJhbnQgZnVuY3Rpb25hbCBwcm9nYW1taW5nIGluIGxvdyBsZXZlbCBsYW5ndWFnZXMgb3IgRXJsYW5nIG9yIEVsaXhlciB3aXRoIHN1cGVydmlzZXIgT1RQIGFyY2hpdGVjdHVyZXMgYW5kIG1lc3NhZ2UgcGFzc2luZy4gSVxcJ20gdGFsaW5nIG1pZGRsZXdhcmUgZGV2ZWxvcG1lbnQuIElcXCdtIHRhbGtpbmcgVEREIGRldiBhbGwgZGF5IGV2ZXJ5IGRheSBvbiBhIGhhcmRjb3JlIHNjcnVtIHRlYW0uIFRoYXRcXCdzIG5vdCBtZS4gSVxcJ20gbm90IHlvdXIgbGVhZCBoZXJlLCBob3dldmVyIEkgd2lsbCBKci4gb24gdW5kZXJzdGFuZGluZyBob3cgZXZlcnkgbGluZSBvZiBjb2RlIHdvcmtzIGluIHlvdXIgYXBwLiBJXFwnbSB5b3VyIHByb3RvdHlwZXIsIE1WUCBndXkgb3IgZm9sbG93IHlvdXIgbGVhZCBndXkgd2hlbiBpdCBjb21lcyB0byBwcm9ncmFtbWluZy4gSSBjYW4gbWFrZSBqdXN0IGFib3V0IGFueXRoaW5nIEkgd2FudCwgYnV0IGRvblxcJ3QgZmVlbCBjb21mb3J0YWJsZSBsZWFkaW5nIHNheSwgYW4gaU9TIG9yIEphdmEgdGVhbS4gSSBqdXN0IGRvblxcJ3QgaGF2ZSBlbm91Z2ggbG93LWxldmVsIHByb2dyYW1taW5nIGV4cGVyaWVuY2UgaW4gdGhvc2UgcGFydGljdWxhcmUgZnJhbWV3b3Jrcy4gV2hlbiBpdCBjb21lcyB0byBKYXZhU2NyaXB0LCBJXFwnbSBhIDcuIFRoZXJlIGlzblxcJ3QgYW55dGhpbmcgeW91IGNhblxcJ3QgYXNrIG1lIHRvIGRvIHdpdGggSmF2YVNjcmlwdCwgZnJvbSBGYW1vLnVzIHRvIE1WQyBzdHVmZiAtIGhvd2V2ZXIsIElcXCdtIG5vdCB5b3VyIGd1eSB3aG9cXCdzIGdvaW5nIHRvIGludHJvZHVjZSB0aGUgbmV4dCBiaWcgb3Blbi1zb3VyY2UgdG9vbCBpbiBKUy4gSVxcJ20gYSBtYWNybyBKUyBkZXZlbG9wZXIgLSBtZWFuaW5nIEkgY2FuIHRha2UgZXN0YWJsaXNoZWQgcGF0dGVybnMgYW5kIGNvbXBvbmVudHMgYW5kIGNvbmNlcHRzIGFuZCBydW4gd2l0aCB0aGVtLiBJIGRvblxcJ3QgZ2l2ZSB0YWxrcyBvbiBiaWctbyBub3RhdGlvbnMgYW5kIEkgbWlnaHQgbm90IGJlIGRvd24gZm9yIGEgNDAgaG91ciBhIHdlZWsgam9iIG9mIGhhcmRjb3JlIFRERCBwcm9ncmFtbWluZyAtIGJ1dCB0aGlzIGRvZXNuXFwndCBtZWFuIHlvdSBzaG91bGQgd3JpdGUgbWUgb2ZmIGFzIGEgZ2VuZXJhbGlzdC48YnIgLz48YnIgLz5UaGUgZmFjdCBpcyB0aGF0IElcXCd2ZSBuZXZlciBiZWVuIHRoZSB0eXBlIGZvciBhIHJvbGUgd2l0aCBhbiBlYXJseSBzdGFnZSBzdGFydHVwIHdoZXJlIEkgZGlkblxcJ3Qgd2VhciBhIGJ1bmNoIG9mIGhhdHMgb3IgdHJhbnNpdGlvbiBwZXJpb2RpY2FsbHkgZnJvbSBhIGRlc2lnbiBtaW5kZWQgdGhpbmtlciB0byBhIHRlY2huaWNhbCBzY3J1bSwgcmVxdWlyZW1lbnQgd3JpdGluZywgcHJvZHVjIG1hbmFnaW5nIGFuYWwtaXN0LidcbiAgICB9XG4gIF1cbkZyYW5jaGluby5jb250cm9sbGVyICdCbG9nUm9sbEN0cmwnLCAoJHNjb3BlKSAtPlxuRnJhbmNoaW5vLmNvbnRyb2xsZXIgJ0Fib3V0Q3RybCcsICgkc2NvcGUpIC0+XG5GcmFuY2hpbm8uY29udHJvbGxlciAnQXBwQ3RybCcsICgkc2NvcGUpIC0+XG5GcmFuY2hpbm8uY29udHJvbGxlciAnUmVzdW1lQ3RybCcsICgkc2NvcGUpIC0+XG4gICRzY29wZS5ibG9iID0gJzxkaXYgY2xhc3M9XCJyb3dcIj48ZGl2IGNsYXNzPVwibGFyZ2UtMTJcIj48ZGl2IGNsYXNzPVwicm93XCI+PGRpdiBjbGFzcz1cImxhcmdlLTEyIGNvbHVtbnNcIj48aDY+Tk9WIDIwMTMgLSBQUkVTRU5UPC9oNj48YnIvPjxoMj5IeWJyaWQgRXhwZXJpZW5jZSBEZXNpZ25lci9EZXZlbG9wZXIsIEluZGVwZW5kZW50PC9oMj48YnIvPjxwPldvcmtlZCB3aXRoIG5vdGVhYmxlIGVudHJlcHJlbm91cnMgb24gc2V2ZXJhbCBuZXcgcHJvZHVjdCBhbmQgYnVzaW5lc3MgbGF1bmNoZXMuIEhlbGQgbnVtZXJvdXMgcm9sZXMsIGluY2x1ZGluZyBjb250ZW50IHN0cmF0ZWdpc3QsIHVzZXIgcmVzZWFyY2hlciwgZGVzaWduZXIgYW5kIGRldmVsb3Blci4gPC9wPjxwPjxzdHJvbmc+Q29tcGFuaWVzPC9zdHJvbmc+PC9wPjx1bCBjbGFzcz1cIm5vXCI+PGxpPjxhIGhyZWY9XCJodHRwOi8vdGFwY2VudGl2ZS5jb21cIiB0YXJnZXQ9XCJfYmxhbmtcIj5UYXBjZW50aXZlPC9hPjwvbGk+PGxpPjxhIGhyZWY9XCJodHRwOi8vY3BnLmlvXCIgdGFyZ2V0PVwiX2JsYW5rXCI+Q1BHaW88L2E+PC9saT48bGk+PGEgaHJlZj1cImh0dHA6Ly9rb3UucG4vXCIgdGFyZ2V0PVwiX2JsYW5rXCI+S291LnBuIE1lZGlhPC9hPjwvbGk+PGxpPiA8YSBocmVmPVwiaHR0cDovL21lZHljYXRpb24uY29tXCIgdGFyZ2V0PVwiX2JsYW5rXCI+TWVkeWNhdGlvbjwvYT48L2xpPjxsaT4gPGEgaHJlZj1cImh0dHA6Ly93d3cuc3VudGltZXMuY29tL1wiIHRhcmdldD1cIl9ibGFua1wiPkNoaWNhZ28gU3VuIFRpbWVzPC9hPjwvbGk+PC91bD48YnIvPjxwPjxzdHJvbmc+VGFwY2VudGl2ZSBEZWxpdmVyYWJsZXM8L3N0cm9uZz48L3A+PHVsIGNsYXNzPVwiYnVsbGV0c1wiPjxsaT5Db21wbGV0ZSBUYXBjZW50aXZlLmNvbSBtYXJrZXRpbmcgd2Vic2l0ZSBhbmQgVVggb3ZlcmhhdWwgb2YgY29yZSBwcm9kdWN0LCB0aGUgXCJUYXBjZW50aXZlIE1hbmFnZXJcIjwvbGk+PGxpPkluZHVzdHJpYWwgZGVzaWduIG9mIHRoZSBUYXBjZW50aXZlIFRvdWNocG9pbnQ8L2xpPjxsaT5Db250ZW50IHN0cmF0ZWd5IGZvciBjb3Jwb3JhdGUgbWFya2V0aW5nIHNpdGU8L2xpPjxsaT5Nb2JpbGUgZmlyc3QgbWFya2V0aW5nIHdlYnNpdGUgdXNpbmcgSW9uaWMgYW5kIEFuZ3VsYXI8L2xpPjwvdWw+PHA+PHN0cm9uZz5DUEdpbyBEZWxpdmVyYWJsZXM8L3N0cm9uZz48L3A+PHVsIGNsYXNzPVwiYnVsbGV0c1wiPjxsaT5Qcm9kdWN0IGFuZCBidXNpbmVzcyBzdHJhdGVneSwgdGVjaG5pY2FsIGFyY2hpdGVjdHVyZSBhbmQgc3BlY2lmaWNhdGlvbiBkZXNpZ248L2xpPjxsaT5PbmUgaHVuZHJlZCBwYWdlIHByb3Bvc2FsIHRlbXBsYXRlIG9uIGJ1c2luZXNzIG1vZGVsIGFuZCBjb3Jwb3JhdGUgY2FwYWJpbGl0aWVzPC9saT48bGk+TWFya2V0aW5nIHdlYnNpdGUgZGVzaWduIGFuZCBjb250ZW50IHN0cmF0ZWd5PC9saT48bGk+Q29yZSBwcm9kdWN0IGRlc2lnbiBhbmQgTVZQIGZ1bmN0aW9uYWwgcHJvdG90eXBlPC9saT48L3VsPjxwPjxzdHJvbmc+S291LnBuIERlbGl2ZXJhYmxlczwvc3Ryb25nPjwvcD48dWwgY2xhc3M9XCJidWxsZXRzXCI+PGxpPktvdS5wbiBNZWRpYSBicmFuZCByZWZyZXNoPC9saT48bGk+TWFya2V0aW5nIHNpdGUgcmVkZXNpZ248L2xpPjxsaT5Qb3J0YWwgdXNlciBleHBlcmllbmNlIG92ZXJoYXVsPC9saT48L3VsPjxwPjxzdHJvbmc+TWVkeWNhdGlvbiBEZWxpdmVyYWJsZXM8L3N0cm9uZz48L3A+PHVsIGNsYXNzPVwiYnVsbGV0c1wiPjxsaT5Db25jZXB0dWFsIGRlc2lnbiBhbmQgYXJ0IGRpcmVjdGlvbjwvbGk+PGxpPlVzZXIgcmVzZWFyY2g8L2xpPjxsaT5SYXBpZCBwcm90b3R5cGVzPC9saT48L3VsPjxwPjxzdHJvbmc+Q2hpY2FnbyBTdW4gVGltZXM8L3N0cm9uZz48L3A+PHVsIGNsYXNzPVwiYnVsbGV0c1wiPjxsaT5Db25jZXB0dWFsIGRlc2lnbiBhbmQgYXJ0IGRpcmVjdGlvbjwvbGk+PGxpPk5hdGl2ZSBpT1MgYW5kIEFuZHJvaWQgYXBwIGRlc2lnbiBhbmQganVuaW9yIGRldmVsb3BtZW50PC9saT48bGk+SHlicmlkIElvbmljL0FuZ3VsYXIgZGV2ZWxvcG1lbnQ8L2xpPjwvdWw+PC9kaXY+PC9kaXY+PGJyLz48ZGl2IGNsYXNzPVwicm93XCI+PGRpdiBjbGFzcz1cImxhcmdlLTEyIGNvbHVtbnNcIj48aDY+TUFSQ0ggMjAxMCAtIE9DVE9CRVIgMjAxMzwvaDY+PGJyLz48aDI+RGlyZWN0b3Igb2YgVXNlciBFeHBlcmllbmNlLCBMaWdodGJhbms8L2gyPjxici8+PHA+TGF1bmNoZWQgYW5kIHN1cHBvcnRlZCBtdWx0aXBsZSBuZXcgY29tcGFuaWVzIHdpdGhpbiB0aGUgTGlnaHRiYW5rIHBvcnRmb2xpby4gPC9wPjxwPjxzdHJvbmc+Q29tcGFuaWVzPC9zdHJvbmc+PC9wPjx1bCBjbGFzcz1cIm5vXCI+PGxpPiA8YSBocmVmPVwiaHR0cDovL2NoaWNhZ29pZGVhcy5jb21cIiB0YXJnZXQ9XCJfYmxhbmtcIj5DaGljYWdvSWRlYXMuY29tPC9hPjwvbGk+PGxpPiA8YSBocmVmPVwiaHR0cDovL2JlbmNocHJlcC5jb21cIiB0YXJnZXQ9XCJfYmxhbmtcIj5CZW5jaFByZXAuY29tPC9hPjwvbGk+PGxpPiA8YSBocmVmPVwiaHR0cDovL3NuYXBzaGVldGFwcC5jb21cIiB0YXJnZXQ9XCJfYmxhbmtcIj5TbmFwU2hlZXRBcHAuY29tPC9hPjwvbGk+PGxpPk1vbnRobHlzLmNvbSAoZGVmdW5jdCk8L2xpPjxsaT4gPGEgaHJlZj1cImh0dHA6Ly9kb3VnaC5jb21cIiB0YXJnZXQ9XCJfYmxhbmtcIj5Eb3VnaC5jb208L2E+PC9saT48bGk+IDxhIGhyZWY9XCJodHRwOi8vZ3JvdXBvbi5jb21cIiB0YXJnZXQ9XCJfYmxhbmtcIj5Hcm91cG9uLmNvbTwvYT48L2xpPjwvdWw+PGJyLz48cD48c3Ryb25nPkNoaWNhZ28gSWRlYXMgRGVsaXZlcmFibGVzPC9zdHJvbmc+PC9wPjx1bCBjbGFzcz1cImJ1bGxldHNcIj48bGk+V2Vic2l0ZSBkZXNpZ24gcmVmcmVzaCwgYXJ0IGRpcmVjdGlvbjwvbGk+PGxpPkN1c3RvbSB0aWNrZXQgcHVyY2hhc2luZyBwbGF0Zm9ybSBVWCByZXNlYXJjaCAmYW1wOyBkZXNpZ248L2xpPjxsaT5SdWJ5IG9uIFJhaWxzIGRldmVsb3BtZW50LCBtYWludGVuZW5jZTwvbGk+PGxpPkdyYXBoaWMgZGVzaWduIHN1cHBvcnQ8L2xpPjxsaT5Bbm51YWwgcmVwb3J0IGRlc2lnbjwvbGk+PC91bD48cD48c3Ryb25nPkJlbmNoUHJlcC5jb20gRGVsaXZlcmFibGVzPC9zdHJvbmc+PC9wPjx1bCBjbGFzcz1cImJ1bGxldHNcIj48bGk+UmUtYnJhbmRpbmcsIGNvbXBsZXRlIEJlbmNoUHJlcCBpZGVudGl0eSBwYWNrYWdlPC9saT48bGk+U3VwcG9ydGVkIGNvbXBhbnkgd2l0aCBhbGwgZGVzaWduIGFuZCB1eCBmcm9tIHplcm8gdG8gZWlnaHQgbWlsbGlvbiBpbiBmaW5hbmNpbmc8L2xpPjxsaT5MZWFkIGFydCBhbmQgVVggZGlyZWN0aW9uIGZvciB0d28geWVhcnM8L2xpPjxsaT5Gcm9udC1lbmQgdXNpbmcgQmFja2JvbmUgYW5kIEJvb3RzdHJhcDwvbGk+PGxpPlVzZXIgcmVzZWFyY2gsIGV0aG5vZ3JhcGhpYyBzdHVkaWVzLCB1c2VyIHRlc3Rpbmc8L2xpPjxsaT5FbWFpbCBtYXJrZXRpbmcgY2FkZW5jZSBzeXN0ZW0gZGVzaWduIGFuZCBleGVjdXRpb248L2xpPjxsaT5TY3JpcHRlZCwgc3Rvcnlib2FyZGVkIGFuZCBleGVjdXRlZCBib3RoIGFuaW1hdGVkIGFuZCBsaXZlIG1vdGlvbiBleHBsYWluZXIgdmlkZW9zPC9saT48L3VsPjxwPjxzdHJvbmc+U25hcFNoZWV0QXBwLmNvbSBEZWxpdmVyYWJsZXM8L3N0cm9uZz48L3A+PHVsIGNsYXNzPVwiYnVsbGV0c1wiPjxsaT5MYXJnZSBzY2FsZSBwb3J0YWwgVVggcmVzZWFyY2ggYW5kIGluZm9ybWF0aW9uIGFyY2hpdGVjdHVyZTwvbGk+PGxpPlRocmVlIHJvdW5kcyBvZiByYXBpZCBwcm90b3R5cGluZyBhbmQgdXNlciB0ZXN0aW5nPC9saT48bGk+R3JhcGhpYyBkZXNpZ24gYW5kIGludGVyYWN0aW9uIGRlc2lnbiBmcmFtZXdvcms8L2xpPjxsaT5Vc2VyIHRlc3Rpbmc8L2xpPjwvdWw+PHA+PHN0cm9uZz5Nb250aGx5cy5jb20gRGVsaXZlcmFibGVzPC9zdHJvbmc+PC9wPjx1bCBjbGFzcz1cImJ1bGxldHNcIj48bGk+SWRlbnRpdHkgYW5kIGFydCBkaXJlY3Rpb248L2xpPjxsaT5Qcm9kdWN0IHN0cmF0ZWd5IGFuZCBuZXcgY29tcGFueSBsYXVuY2g8L2xpPjxsaT5PbmxpbmUgbWFya2V0aW5nIHN0cmF0ZWd5LCBpbmNsdWRpbmcgdHJhbnNhY3Rpb25hbCBlbWFpbCwgcHJvbW90aW9uIGRlc2lnbiBhbmQgbGVhZCBnZW5lcmF0aW9uPC9saT48bGk+UHJvZHVjdCBleHBlcmllbmNlIGRlc2lnbiBhbmQgZnJvbnQtZW5kPC9saT48bGk+Q29udGVudCBzdHJhdGVneTwvbGk+PGxpPlNjcmlwdGVkLCBzdG9yeWJvYXJkZWQgYW5kIGV4ZWN1dGVkIGJvdGggYW5pbWF0ZWQgYW5kIGxpdmUgbW90aW9uIGV4cGxhaW5lciB2aWRlb3M8L2xpPjwvdWw+PHA+PHN0cm9uZz5Eb3VnaC5jb20gRGVsaXZlcmFibGVzPC9zdHJvbmc+PC9wPjx1bCBjbGFzcz1cImJ1bGxldHMgYnVsbGV0c1wiPjxsaT5Db25zdW1lciBqb3VybmV5IG1hcHBpbmcgYW5kIGV0aG5vZ3JhcGhpYyBzdHVkaWVzPC9saT48bGk+UmFwaWQgcHJvdG90eXBpbmcsIGNvbmNlcHR1YWwgZGVzaWduPC9saT48bGk+TWVzc2FnaW5nIHN0cmF0ZWd5LCB1c2VyIHRlc3Rpbmc8L2xpPjwvdWw+PHA+PHN0cm9uZz5Hcm91cG9uLmNvbSBEZWxpdmVyYWJsZXM8L3N0cm9uZz48L3A+PHVsIGNsYXNzPVwiYnVsbGV0c1wiPjxsaT5FbWVyZ2luZyBtYXJrZXRzIHJlc2VhcmNoPC9saT48bGk+UmFwaWQgZGVzaWduIGFuZCBwcm90b3R5cGluZzwvbGk+PGxpPlZpc3VhbCBkZXNpZ24gb24gbmV3IGNvbmNlcHRzPC9saT48bGk+RW1haWwgc2VnbWVudGF0aW9uIHJlc2VhcmNoPC9saT48L3VsPjwvZGl2PjwvZGl2Pjxici8+PGRpdiBjbGFzcz1cInJvd1wiPjxkaXYgY2xhc3M9XCJsYXJnZS0xMiBjb2x1bW5zXCI+PGg2Pk5PVkVNQkVSIDIwMDcgLSBBUFJJTCAyMDEwPC9oNj48YnIvPjxoMj5EZXZlbG9wZXIgJmFtcDsgQ28tZm91bmRlciwgRGlsbHllby5jb208L2gyPjxici8+PHA+Q28tZm91bmRlZCwgZGVzaWduZWQgYW5kIGRldmVsb3BlZCBhIGRhaWx5IGRlYWwgZUNvbW1lcmNlIHdlYnNpdGUuPC9wPjxwPjxzdHJvbmc+Um9sZTwvc3Ryb25nPjxici8+RGVzaWduZWQsIGRldmVsb3BlZCBhbmQgbGF1bmNoZWQgY29tcGFuaWVzIGZpcnN0IGNhcnQgd2l0aCBQSFAuIEl0ZXJhdGVkIGFuZCBncmV3IHNpdGUgdG8gbW9yZSB0aGFuIHR3byBodW5kcmVkIGFuZCBmaWZ0eSB0aG91c2FuZCBzdWJzY3JpYmVycyBpbiBsZXNzIHRoYW4gb25lIHllYXIuIDwvcD48cD48c3Ryb25nPk5vdGVhYmxlIFN0YXRzPC9zdHJvbmc+PC9wPjx1bCBjbGFzcz1cImJ1bGxldHNcIj48bGk+QnVpbHQgYSBsaXN0IG9mIDI1MCwwMDAgc3Vic2NyaWJlcnMgaW4gdGhlIGZpcnN0IHllYXI8L2xpPjxsaT5QaXZvdGVkIGFuZCB0d2Vha2VkIGRlc2lnbiwgYnVzaW5lc3MgYW5kIGFwcHJvYWNoIHRvIDEwMDAgdHJhbnNhY3Rpb25zIHBlciBkYWlseTwvbGk+PGxpPlNvbGQgYnVzaW5lc3MgaW4gRGVjZW1iZXIgMjAwOSB0byBJbm5vdmF0aXZlIENvbW1lcmNlIFNvbHV0aW9uczwvbGk+PC91bD48L2Rpdj48L2Rpdj48YnIvPjxkaXYgY2xhc3M9XCJyb3dcIj48ZGl2IGNsYXNzPVwibGFyZ2UtMTIgY29sdW1uc1wiPjxoNj5NQVJDSCAyMDA1IC0gT0NUT0JFUiAyMDA3PC9oNj48YnIvPjxoMj5Tb2x1dGlvbnMgQXJjaGl0ZWN0ICZhbXA7IFNlbmlvciBEZXZlbG9wZXIsIDxhIGhyZWY9XCJodHRwOi8vd3d3Lm1hbmlmZXN0ZGlnaXRhbC5jb20vXCI+TWFuaWZlc3QgRGlnaXRhbDwvYT48L2gyPjxici8+PHA+QnVpbHQgYW5kIG1hbmFnZWQgbXVsdGlwbGUgQ2FyZWVyQnVpbGRlci5jb20gbmljaGUgc2l0ZXMgZm9yIHRoZSBsYXJnZXN0IGluZGVwZW5kZW50IGFnZW5jeSBpbiB0aGUgbWlkd2VzdC48L3A+PHA+PHN0cm9uZz5Sb2xlPC9zdHJvbmc+PGJyLz5SZXNlYXJjaCBhbmQgZXhwbG9yZSBlbWVyZ2luZyB0ZWNobm9sb2dpZXMsIGltcGxlbWVudCBzb2x1dGlvbnMgYW5kIG1hbmFnZSBvdGhlciBkZXZlbG9wZXJzLiBXb3JrZWQgd2l0aCBhc3AubmV0IG9uIGEgZGFpbHkgYmFzaXMgZm9yIGFsbW9zdCB0d28geWVhcnMuIDwvcD48cD48c3Ryb25nPk5vdGVhYmxlIEFjY29tcGxpc2htZW50czwvc3Ryb25nPjwvcD48dWwgY2xhc3M9XCJidWxsZXRzXCI+PGxpPlJlY29nbml6ZWQgZm9yIGxhdW5jaGluZyBoaWdoIHF1YWxpdHkgd2ViIGFwcCBmb3IgQ2FyZWVyIEJ1aWxkZXIgaW4gcmVjb3JkIHRpbWU8L2xpPjxsaT5NYW5hZ2VkIGV4dHJlbWUgU0VPIHByb2plY3Qgd2l0aCBtb3JlIHRoYW4gNTAwIHRob3VzYW5kIGxpbmtzLCBwYWdlcyBhbmQgb3ZlciA4IG1pbGxpb24gVUdDIGFydGlmYWN0czwvbGk+PGxpPlNoaWZ0ZWQgYWdlbmNpZXMgZGV2ZWxvcG1lbnQgcHJhY3RpY2VzIHRvIHZhcmlvdXMgbmV3IGNsaWVudC1jZW50cmljIEFKQVggbWV0aG9kb2xvZ2llczwvbGk+PGxpPk1hbmFnZWQgbXVsdGlwbGUgcHJvamVjdHMgY29uY3VycmVudGx5LCBpbmNsdWRpbmcgY2hvb3NlY2hpY2Fnby5jb20gYW5kIGJyaWVmaW5nLmNvbTwvbGk+PC91bD48L2Rpdj48L2Rpdj48YnIvPjxkaXYgY2xhc3M9XCJyb3dcIj48ZGl2IGNsYXNzPVwibGFyZ2UtMTIgY29sdW1uc1wiPjxoNj5BUFJJTCAyMDA0IC0gSkFOVUFSWSAyMDA3PC9oNj48YnIvPjxoMj5KdW5pb3IgUExEIERldmVsb3BlciwgIDxhIGhyZWY9XCJodHRwOi8vd3d3LmF2ZW51ZS1pbmMuY29tL1wiPkF2ZW51ZTwvYT48L2gyPjxici8+PHA+RnJvbnQtZW5kIGRldmVsb3BlciBhbmQgVVggZGVzaWduIGludGVybiBmb3IgQXZlbnVlIEEgUmF6b3JmaXNoc1xcJyBsZWdhY3kgY29tcGFueSwgQXZlbnVlLWluYy48L3A+PHA+PHN0cm9uZz5Sb2xlPC9zdHJvbmc+PGJyLz5EZXZlbG9wIGZyb250LWVuZCBmb3IgbXVsdGlwbGUgY2xpZW50IHdlYnNpdGVzLCBpbmNsdWRpbmcgZmxvci5jb20sIGFjaGlldmVtZW50Lm9yZywgY2FueW9ucmFuY2guY29tIGFuZCB0dXJib2NoZWYuPC9wPjxwPjxzdHJvbmc+Tm90ZWFibGUgQWNjb21wbGlzaG1lbnRzPC9zdHJvbmc+PC9wPjx1bCBjbGFzcz1cImJ1bGxldHNcIj48bGk+RXhlY3V0ZWQgZnJvbnQtZW5kIHByb2plY3RzIG9uLXRpbWUgYW5kIHVuZGVyLWJ1ZGdldDwvbGk+PGxpPkFzc2lnbmVkIFVYIGludGVybnNoaXAgcm9sZSwgcmVjb2duaXplZCBieSBkZXNpZ24gdGVhbSBhcyBhIHlvdW5nIHRhbGVudDwvbGk+PGxpPldpcmVmcmFtZWQgY3VzdG9tIHNob3BwaW5nIGNhcnQgcGxhdGZvcm0gZm9yIGZsb3IuY29tPC9saT48bGk+RGV2ZWxvcGVkIGludGVybmFsIFNFTyBwcmFjdGljZTwvbGk+PC91bD48L2Rpdj48L2Rpdj48YnIvPjxkaXYgY2xhc3M9XCJyb3dcIj48ZGl2IGNsYXNzPVwibGFyZ2UtMTIgY29sdW1uc1wiPjxoNj5KVUxZIDIwMDAgLSBKQU5VQVJZIDIwMDQ8L2g2Pjxici8+PGgyPmVDb21tZXJjZSBEZXZlbG9wZXIsIEF0b3ZhPC9oMj48YnIvPjxwPkdlbmVyYWwgd2ViIGRlc2lnbmVyIGFuZCBkZXZlbG9wZXIgZm9yIGZhbWlseSBvd25lZCBwYWludCBkaXN0cmlidXRpb24gYnVzaW5lc3MuIDwvcD48cD48c3Ryb25nPlJvbGU8L3N0cm9uZz48YnIvPkJ1aWx0IHNldmVyYWwgc2hvcHBpbmcgY2FydHMgaW4gY2xhc3NpYyBBU1AgYW5kIFBIUC4gR3JldyBidXNpbmVzcyB1c2luZyBvbmxpbmUgbWFya2V0aW5nIHN0cmF0ZWdpZXMgdG8gdHdvIG1pbGxpb24gaW4gcmV2ZW51ZS4gPC9wPjxwPjxzdHJvbmc+Tm90ZWFibGUgQWNjb21wbGlzaG1lbnRzPC9zdHJvbmc+PC9wPjx1bCBjbGFzcz1cImJ1bGxldHNcIj48bGk+QmVjYW1lIGZpcnN0IGNvbXBhbnkgdG8gc2hpcCBwYWludHMgYW5kIGNvYXRpbmdzIGFjcm9zcyB0aGUgVW5pdGVkIFN0YXRlczwvbGk+PGxpPkZpcnN0IGVtcGxveWVlLCBkZXZlbG9wZWQgY29tcGFueSB0byAyKyBtaWxsaW9uIGluIHJldmVudWUgd2l0aCBPdmVydHVyZSwgR29vZ2xlIEFkd29yZHMgYW5kIFNFTzwvbGk+PGxpPkNyZWF0ZWQsIG1hcmtldGVkIGFuZCBzdWJzY3JpYmVkIHZvY2F0aW9uYWwgc2Nob29sIGZvciBzcGVjaWFsdHkgY29hdGluZ3M8L2xpPjxsaT5Xb3JrZWQgd2l0aCB0b3AgSXRhbGlhbiBwYWludCBtYW51ZmFjdHVyZXJzIG92ZXJzZWFzIHRvIGJ1aWxkIGV4Y2x1c2l2ZSBkaXN0cmlidXRpb24gcmlnaHRzPC9saT48L3VsPjwvZGl2PjwvZGl2Pjxici8+PGRpdiBjbGFzcz1cInJvd1wiPjxkaXYgY2xhc3M9XCJsYXJnZS0xMiBjb2x1bW5zXCI+PGg2PlNFUFRFTUJFUiAyMDAwIC0gTUFZIDIwMDI8L2g2Pjxici8+PGgyPkVkdWNhdGlvbjwvaDI+PGJyLz48cD5TZWxmIGVkdWNhdGVkIGRlc2lnbmVyL3Byb2dyYW1tZXIgd2l0aCB2b2NhdGlvbmFsIHRyYWluaW5nLiA8L3A+PHA+PHN0cm9uZz5DZXJ0aWZpY2F0aW9uczwvc3Ryb25nPjxici8+aU5FVCssIEErIENlcnRpZmljYXRpb24gPC9wPjxwPjxzdHJvbmc+QXBwcmVudGljZXNoaXA8L3N0cm9uZz48YnIvPlllYXIgbG9uZyBwZXJzb25hbCBhcHByZW50aWNlc2hpcCB3aXRoIGZpcnN0IGVuZ2luZWVyIGF0IEFtYXpvbi5jb208L3A+PC9kaXY+PC9kaXY+PC9kaXY+PC9kaXY+PGJyLz48YnIvPidcbkZyYW5jaGluby5jb250cm9sbGVyICdKb2JUYXBjZW50aXZlQ3RybCcsICgkc2NvcGUpIC0+XG5GcmFuY2hpbm8uY29udHJvbGxlciAnSm9iVGFwY2VudGl2ZVR3b0N0cmwnLCAoJHNjb3BlKSAtPlxuRnJhbmNoaW5vLmNvbnRyb2xsZXIgJ0pvYkNwZ2lvQ3RybCcsICgkc2NvcGUpIC0+XG5GcmFuY2hpbm8uY29udHJvbGxlciAnSm9iTWVkeWNhdGlvbkN0cmwnLCAoJHNjb3BlKSAtPlxuRnJhbmNoaW5vLmNvbnRyb2xsZXIgJ0pvYkNzdEN0cmwnLCAoJHNjb3BlKSAtPlxuRnJhbmNoaW5vLmNvbnRyb2xsZXIgJ0xhbmRpbmdDdHJsJywgKCRzY29wZSkgLT5cbiAgI3lvdXR1YmUgc2NyaXB0XG4gIHRhZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIilcbiAgdGFnLnNyYyA9IFwiLy93d3cueW91dHViZS5jb20vaWZyYW1lX2FwaVwiXG4gIGZpcnN0U2NyaXB0VGFnID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIilbMF1cbiAgZmlyc3RTY3JpcHRUYWcucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUgdGFnLCBmaXJzdFNjcmlwdFRhZ1xuICBwbGF5ZXIgPSB1bmRlZmluZWRcbiAgb25Zb3VUdWJlSWZyYW1lQVBJUmVhZHkgPSAtPlxuICAgIHBsYXllciA9IG5ldyBZVC5QbGF5ZXIoXCJwbGF5ZXJcIixcbiAgICAgIGhlaWdodDogXCIyNDRcIlxuICAgICAgd2lkdGg6IFwiNDM0XCJcbiAgICAgIHZpZGVvSWQ6IFwiQWt5UWdwcVJ5QllcIiAjIHlvdXR1YmUgdmlkZW8gaWRcbiAgICAgIHBsYXllclZhcnM6XG4gICAgICAgIGF1dG9wbGF5OiAwXG4gICAgICAgIHJlbDogMFxuICAgICAgICBzaG93aW5mbzogMFxuXG4gICAgICBldmVudHM6XG4gICAgICAgIG9uU3RhdGVDaGFuZ2U6IG9uUGxheWVyU3RhdGVDaGFuZ2VcbiAgICApXG5cbiAgb25QbGF5ZXJTdGF0ZUNoYW5nZSA9IChldmVudCkgLT5cbiAgICAkKFwiLnN0YXJ0LXZpZGVvXCIpLmZhZGVJbiBcIm5vcm1hbFwiICBpZiBldmVudC5kYXRhIGlzIFlULlBsYXllclN0YXRlLkVOREVEXG5cblxuRnJhbmNoaW5vLmNvbnRyb2xsZXIgJ0pvYktvdXBuQ3RybCcsICgkc2NvcGUpIC0+XG5GcmFuY2hpbm8uY29udHJvbGxlciAnSm9iTWVkeWNhdGlvbkN0cmwnLCAoJHNjb3BlKSAtPlxuRnJhbmNoaW5vLmNvbnRyb2xsZXIgJ0pvYk1lZHljYXRpb25DdHJsJywgKCRzY29wZSkgLT5cbkZyYW5jaGluby5jb250cm9sbGVyICdKb2JUcm91bmRDdHJsJywgKCRzY29wZSkgLT5cbkZyYW5jaGluby5jb250cm9sbGVyICdKb2JNb250aGx5c09uZUN0cmwnLCAoJHNjb3BlKSAtPlxuRnJhbmNoaW5vLmNvbnRyb2xsZXIgJ0pvYk1vbnRobHlzVHdvQ3RybCcsICgkc2NvcGUpIC0+XG5GcmFuY2hpbm8uY29udHJvbGxlciAnSm9iQmVuY2hwcmVwQ3RybCcsICgkc2NvcGUpIC0+XG5GcmFuY2hpbm8uY29udHJvbGxlciAnQ29udGFjdEN0cmwnLCAoJHNjb3BlKSAtPlxuRnJhbmNoaW5vLmNvbnRyb2xsZXIgJ0RldmVsb3BlcnNDdHJsJywgKCRzY29wZSkgLT5cbkZyYW5jaGluby5jb250cm9sbGVyICdEZXZlbG9wZXJDZW50ZXJDdHJsJywgKCRzY29wZSkgLT5cbkZyYW5jaGluby5jb250cm9sbGVyICdEb2NzQ3RybCcsICgkc2NvcGUsIERvY3MpIC0+XG4gICRzY29wZS4kd2F0Y2ggKC0+XG4gICAgRG9jcy5saXN0XG4gICksIC0+XG4gICAgJHNjb3BlLmRvY3MgPSBEb2NzLmxpc3RcbkZyYW5jaGluby5jb250cm9sbGVyICdEb2NDdHJsJywgKCRzY29wZSwgJHNjZSwgJHN0YXRlUGFyYW1zLCAkdGltZW91dCwgRG9jcykgLT5cbiAgJHNjb3BlLmluZGV4ID0gaWYgJHN0YXRlUGFyYW1zLnN0ZXAgdGhlbiAkc3RhdGVQYXJhbXMuc3RlcCAtIDEgZWxzZSAwXG4gICRzY29wZS4kd2F0Y2ggKC0+XG4gICAgRG9jcy5saXN0XG4gICksIC0+XG4gICAgJHNjb3BlLmRvYyA9IERvY3MuZmluZCgkc3RhdGVQYXJhbXMucGVybWFsaW5rKVxuICAgIGlmICRzY29wZS5kb2NcbiAgICAgICRzY29wZS5zdGVwID0gJHNjb3BlLmRvYy5zdGVwc1skc2NvcGUuaW5kZXhdXG4gICAgICAkc2NvcGUuc3RlcC51cmwgPSAkc2NlLnRydXN0QXNSZXNvdXJjZVVybCgkc2NvcGUuc3RlcC51cmwpXG4gICAgICBpZiAkc2NvcGUuc3RlcC50eXBlID09ICdkaWFsb2cnXG4gICAgICAgICRzY29wZS5tZXNzYWdlSW5kZXggPSAwXG4gICAgICAgICRzY29wZS5tZXNzYWdlcyA9IFtdXG4gICAgICAgIHJldHVybiAkdGltZW91dCgkc2NvcGUubmV4dE1lc3NhZ2UsIDEwMDApXG4gICAgcmV0dXJuXG5cbiAgJHNjb3BlLmhhc01vcmVTdGVwcyA9IC0+XG4gICAgaWYgJHNjb3BlLnN0ZXBcbiAgICAgIHJldHVybiAkc2NvcGUuc3RlcC5pbmRleCA8ICRzY29wZS5kb2Muc3RlcHMubGVuZ3RoXG4gICAgcmV0dXJuXG5cbkZyYW5jaGluby5kaXJlY3RpdmUgJ215U2xpZGVzaG93JywgLT5cbiAge1xuICAgIHJlc3RyaWN0OiAnQUMnXG4gICAgbGluazogKHNjb3BlLCBlbGVtZW50LCBhdHRycykgLT5cbiAgICAgIGNvbmZpZyA9IHVuZGVmaW5lZFxuICAgICAgY29uZmlnID0gYW5ndWxhci5leHRlbmQoeyBzbGlkZXM6ICcuc2xpZGUnIH0sIHNjb3BlLiRldmFsKGF0dHJzLm15U2xpZGVzaG93KSlcbiAgICAgIHNldFRpbWVvdXQgKC0+XG4gICAgICAgICQoZWxlbWVudCkuY3ljbGUgLT5cbiAgICAgICAgICB7XG4gICAgICAgICAgICBmeDogJ2ZhZGUnXG4gICAgICAgICAgICBzcGVlZDogJ2Zhc3QnXG4gICAgICAgICAgICBuZXh0OiAnI25leHQyJ1xuICAgICAgICAgICAgcHJldjogJyNwcmV2MidcbiAgICAgICAgICAgIGNhcHRpb246ICcjYWx0LWNhcHRpb24nXG4gICAgICAgICAgICBjYXB0aW9uX3RlbXBsYXRlOiAne3tpbWFnZXMuYWx0fX0nXG4gICAgICAgICAgICBwYXVzZV9vbl9ob3ZlcjogJ3RydWUnXG4gICAgICAgICAgfVxuICAgICAgKSwgMFxuXG4gIH1cbmFuZ3VsYXIubW9kdWxlICd0YXAuY29udHJvbGxlcnMnLCBbXVxuYW5ndWxhci5tb2R1bGUoJ3RhcC5kaXJlY3RpdmVzJywgW10pLmRpcmVjdGl2ZSgnZGV2aWNlJywgLT5cbiAge1xuICAgIHJlc3RyaWN0OiAnQSdcbiAgICBsaW5rOiAtPlxuICAgICAgZGV2aWNlLmluaXQoKVxuXG4gIH1cbikuc2VydmljZSAnY29weScsICgkc2NlKSAtPlxuICBjb3B5ID0gdW5kZWZpbmVkXG4gIHRydXN0VmFsdWVzID0gdW5kZWZpbmVkXG4gIGNvcHkgPVxuICAgIGFib3V0OlxuICAgICAgaGVhZGluZzogJ1dlXFwncmUgPHN0cm9uZz50YXBwaW5nPC9zdHJvbmc+IGludG8gdGhlIGZ1dHVyZSdcbiAgICAgIHN1Yl9oZWFkaW5nOiAnVGFwY2VudGl2ZSB3YXMgY3JlYXRlZCBieSBhIHRlYW0gdGhhdCBoYXMgbGl2ZWQgdGhlIG1vYmlsZSBjb21tZXJjZSByZXZvbHV0aW9uIGZyb20gdGhlIGVhcmxpZXN0IGRheXMgb2YgbUNvbW1lcmNlIHdpdGggV0FQLCB0byBsZWFkaW5nIHRoZSBjaGFyZ2UgaW4gbW9iaWxlIHBheW1lbnRzIGFuZCBzZXJ2aWNlcyB3aXRoIE5GQyB3b3JsZHdpZGUuJ1xuICAgICAgY29weTogJzxwPkZvciB1cywgbW9iaWxlIGNvbW1lcmNlIGhhcyBhbHdheXMgYmVlbiBhYm91dCBtdWNoIG1vcmUgdGhhbiBwYXltZW50OiAgbWFya2V0aW5nLCBwcm9tb3Rpb25zLCBwcm9kdWN0IGNvbnRlbnQsIGFuZCBsb3lhbHR5LCBhbGwgY29tZSB0byBsaWZlIGluc2lkZSBhIG1vYmlsZSBwaG9uZS4gTW9iaWxlIGNvbW1lcmNlIHJlYWxseSBnZXRzIGludGVyZXN0aW5nIHdoZW4gaXQgYnJpZGdlcyB0aGUgZGlnaXRhbCBhbmQgcGh5c2ljYWwgd29ybGRzLjwvcD48cD5PdXIgZ29hbCBhdCBUYXBjZW50aXZlIGlzIHRvIGNyZWF0ZSBhIHN0YXRlLW9mLXRoZS1hcnQgbW9iaWxlIGVuZ2FnZW1lbnQgcGxhdGZvcm0gdGhhdCBlbmFibGVzIG1hcmtldGVycyBhbmQgZGV2ZWxvcGVycyB0byBjcmVhdGUgZW50aXJlbHkgbmV3IGN1c3RvbWVyIGV4cGVyaWVuY2VzIGluIHBoeXNpY2FsIGxvY2F0aW9ucyDigJMgYWxsIHdpdGggYSBtaW5pbXVtIGFtb3VudCBvZiB0ZWNobm9sb2d5IGRldmVsb3BtZW50LjwvcD48cD5XZSB0aGluayB5b3XigJlsbCBsaWtlIHdoYXQgd2XigJl2ZSBidWlsdCBzbyBmYXIuIEFuZCBqdXN0IGFzIG1vYmlsZSB0ZWNobm9sb2d5IGlzIGNvbnN0YW50bHkgZXZvbHZpbmcsIHNvIGlzIHRoZSBUYXBjZW50aXZlIHBsYXRmb3JtLiBHaXZlIGl0IGEgdGVzdCBkcml2ZSB0b2RheS48L3A+J1xuICAgIHRlYW06XG4gICAgICBoZWFkaW5nOiAnJ1xuICAgICAgYmlvczpcbiAgICAgICAgZGF2ZV9yb2xlOiAnJ1xuICAgICAgICBkYXZlX2NvcHk6ICcnXG5cbiAgdHJ1c3RWYWx1ZXMgPSAodmFsdWVzKSAtPlxuICAgIF8uZWFjaCB2YWx1ZXMsICh2YWwsIGtleSkgLT5cbiAgICAgIHN3aXRjaCB0eXBlb2YgdmFsXG4gICAgICAgIHdoZW4gJ3N0cmluZydcbiAgICAgICAgICByZXR1cm4gJHNjZS50cnVzdEFzSHRtbCh2YWwpXG4gICAgICAgIHdoZW4gJ29iamVjdCdcbiAgICAgICAgICByZXR1cm4gdHJ1c3RWYWx1ZXModmFsKVxuICAgICAgcmV0dXJuXG5cbiAgdHJ1c3RWYWx1ZXMgY29weVxuICBjb3B5XG4iLCJcbiMgbm90IHN1cmUgaWYgdGhlc2UgYXJlIGFjdHVhbGx5IGluamVjdGluZyBpbnRvIHRoZSBhcHAgbW9kdWxlIHByb3Blcmx5XG5hbmd1bGFyLm1vZHVsZShcInRhcC5jb250cm9sbGVyc1wiLCBbXSlcblxuIyBtb3ZlIGNvbnRyb2xsZXJzIGhlcmVcblxuXG5cblxuIiwiYW5ndWxhci5tb2R1bGUoXCJ0YXAuZGlyZWN0aXZlc1wiLCBbXSlcbiAgLmRpcmVjdGl2ZSBcImRldmljZVwiLCAtPlxuICAgIHJlc3RyaWN0OiBcIkFcIlxuICAgIGxpbms6IC0+XG4gICAgICBkZXZpY2UuaW5pdCgpXG5cbiAgLnNlcnZpY2UgJ2NvcHknLCAoJHNjZSkgLT5cbiAgICBjb3B5ID1cbiAgICAgIGFib3V0OlxuICAgICAgICBoZWFkaW5nOiBcIldlJ3JlIDxzdHJvbmc+dGFwcGluZzwvc3Ryb25nPiBpbnRvIHRoZSBmdXR1cmVcIlxuICAgICAgICBzdWJfaGVhZGluZzogXCJUYXBjZW50aXZlIHdhcyBjcmVhdGVkIGJ5IGEgdGVhbSB0aGF0IGhhcyBsaXZlZCB0aGUgbW9iaWxlIGNvbW1lcmNlIHJldm9sdXRpb24gZnJvbSB0aGUgZWFybGllc3QgZGF5cyBvZiBtQ29tbWVyY2Ugd2l0aCBXQVAsIHRvIGxlYWRpbmcgdGhlIGNoYXJnZSBpbiBtb2JpbGUgcGF5bWVudHMgYW5kIHNlcnZpY2VzIHdpdGggTkZDIHdvcmxkd2lkZS5cIlxuICAgICAgICBjb3B5OiBcIjxwPkZvciB1cywgbW9iaWxlIGNvbW1lcmNlIGhhcyBhbHdheXMgYmVlbiBhYm91dCBtdWNoIG1vcmUgdGhhbiBwYXltZW50OiAgbWFya2V0aW5nLCBwcm9tb3Rpb25zLCBwcm9kdWN0IGNvbnRlbnQsIGFuZCBsb3lhbHR5LCBhbGwgY29tZSB0byBsaWZlIGluc2lkZSBhIG1vYmlsZSBwaG9uZS4gTW9iaWxlIGNvbW1lcmNlIHJlYWxseSBnZXRzIGludGVyZXN0aW5nIHdoZW4gaXQgYnJpZGdlcyB0aGUgZGlnaXRhbCBhbmQgcGh5c2ljYWwgd29ybGRzLjwvcD48cD5PdXIgZ29hbCBhdCBUYXBjZW50aXZlIGlzIHRvIGNyZWF0ZSBhIHN0YXRlLW9mLXRoZS1hcnQgbW9iaWxlIGVuZ2FnZW1lbnQgcGxhdGZvcm0gdGhhdCBlbmFibGVzIG1hcmtldGVycyBhbmQgZGV2ZWxvcGVycyB0byBjcmVhdGUgZW50aXJlbHkgbmV3IGN1c3RvbWVyIGV4cGVyaWVuY2VzIGluIHBoeXNpY2FsIGxvY2F0aW9ucyDigJMgYWxsIHdpdGggYSBtaW5pbXVtIGFtb3VudCBvZiB0ZWNobm9sb2d5IGRldmVsb3BtZW50LjwvcD48cD5XZSB0aGluayB5b3XigJlsbCBsaWtlIHdoYXQgd2XigJl2ZSBidWlsdCBzbyBmYXIuIEFuZCBqdXN0IGFzIG1vYmlsZSB0ZWNobm9sb2d5IGlzIGNvbnN0YW50bHkgZXZvbHZpbmcsIHNvIGlzIHRoZSBUYXBjZW50aXZlIHBsYXRmb3JtLiBHaXZlIGl0IGEgdGVzdCBkcml2ZSB0b2RheS48L3A+XCJcbiAgICAgIHRlYW06XG4gICAgICAgIGhlYWRpbmc6IFwiXCJcbiAgICAgICAgYmlvczpcbiAgICAgICAgICBkYXZlX3JvbGU6IFwiXCJcbiAgICAgICAgICBkYXZlX2NvcHk6IFwiXCJcbiAgICBcblxuXG4gICAgdHJ1c3RWYWx1ZXMgPSAodmFsdWVzKSAtPlxuICAgICAgXy5lYWNoIHZhbHVlcywgKHZhbCwga2V5KSAtPlxuICAgICAgICBzd2l0Y2ggdHlwZW9mKHZhbClcbiAgICAgICAgICB3aGVuICdzdHJpbmcnXG4gICAgICAgICAgICAkc2NlLnRydXN0QXNIdG1sKHZhbClcbiAgICAgICAgICB3aGVuICdvYmplY3QnXG4gICAgICAgICAgICB0cnVzdFZhbHVlcyh2YWwpXG5cbiAgICB0cnVzdFZhbHVlcyhjb3B5KVxuXG4gICAgY29weVxuIiwiaWYgZGV2aWNlLmRlc2t0b3AoKVxuXG5lbHNlIGlmIGRldmljZS5tb2JpbGUoKVxuXG5cdCQgPSBkb2N1bWVudCAjIHNob3J0Y3V0XG5cdGNzc0lkID0gJ215Q3NzJyAjIHlvdSBjb3VsZCBlbmNvZGUgdGhlIGNzcyBwYXRoIGl0c2VsZiB0byBnZW5lcmF0ZSBpZC4uXG5cdGlmICEkLmdldEVsZW1lbnRCeUlkKGNzc0lkKVxuXHQgICAgaGVhZCAgPSAkLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF1cblx0ICAgIGxpbmsgID0gJC5jcmVhdGVFbGVtZW50KCdsaW5rJylcblx0ICAgIGxpbmsuaWQgICA9IGNzc0lkXG5cdCAgICBsaW5rLnJlbCAgPSAnc3R5bGVzaGVldCdcblx0ICAgIGxpbmsudHlwZSA9ICd0ZXh0L2Nzcydcblx0ICAgIGxpbmsuaHJlZiA9ICdodHRwczovL2NvZGUuaW9uaWNmcmFtZXdvcmsuY29tLzEuMC4wLWJldGEuMTMvY3NzL2lvbmljLm1pbi5jc3MnXG5cdCAgICBsaW5rLm1lZGlhID0gJ2FsbCdcblx0ICAgIGhlYWQuYXBwZW5kQ2hpbGQobGluaylcbiIsImFuZ3VsYXIubW9kdWxlKFwiRnJhbmNoaW5vXCIpLmNvbnRyb2xsZXIgXCJMb2dpbkN0cmxcIiwgKCRzY29wZSwgYXV0aCkgLT5cbiAgYWxlcnQgJ3lvJ1xuICAkc2NvcGUuYXV0aCA9IGF1dGgiLCJhbmd1bGFyLm1vZHVsZShcIkZyYW5jaGluby5wb3J0YWxcIiwgWyBcImF1dGgwXCIgXSkuY29udHJvbGxlciBcIkhvbWVDdHJsXCIsIEhvbWVDb250cm9sbGVyID0gKCRzY29wZSwgYXV0aCwgJGh0dHAsICRsb2NhdGlvbiwgc3RvcmUpIC0+XG4gICRzY29wZS5hdXRoID0gYXV0aFxuICBcbiAgJHNjb3BlLmNhbGxBcGkgPSAtPlxuICAgIFxuICAgICMgSnVzdCBjYWxsIHRoZSBBUEkgYXMgeW91J2QgZG8gdXNpbmcgJGh0dHBcbiAgICAkaHR0cChcbiAgICAgIHVybDogXCJodHRwOi8vbG9jYWxob3N0OjMwMDEvc2VjdXJlZC9waW5nXCJcbiAgICAgIG1ldGhvZDogXCJHRVRcIlxuICAgICkudGhlbiAoLT5cbiAgICAgIGFsZXJ0IFwiV2UgZ290IHRoZSBzZWN1cmVkIGRhdGEgc3VjY2Vzc2Z1bGx5XCJcbiAgICApLCAocmVzcG9uc2UpIC0+XG4gICAgICBpZiByZXNwb25zZS5zdGF0dXMgaXMgLTFcbiAgICAgICAgYWxlcnQgXCJQbGVhc2UgZG93bmxvYWQgdGhlIEFQSSBzZWVkIHNvIHRoYXQgeW91IGNhbiBjYWxsIGl0LlwiXG4gICAgICBlbHNlXG4gICAgICAgIGFsZXJ0IHJlc3BvbnNlLmRhdGFcblxuXG4gICRzY29wZS5sb2dvdXQgPSAtPlxuICAgIGF1dGguc2lnbm91dCgpXG4gICAgc3RvcmUucmVtb3ZlIFwicHJvZmlsZVwiXG4gICAgc3RvcmUucmVtb3ZlIFwidG9rZW5cIlxuICAgICRsb2NhdGlvbi5wYXRoIFwiL2xvZ2luXCJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==