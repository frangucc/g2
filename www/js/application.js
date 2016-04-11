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

Franchino.controller('JobKoupnCtrl', function($scope) {});

Franchino.controller('ExpansionpacksCtrl', function($scope) {});

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

Franchino.controller('ProductsCtrl', [
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

Franchino.controller('ParentsCtrl', function($scope) {});

Franchino.controller('EducatorsCtrl', function($scope) {});

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



//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5jb2ZmZWUiLCJjb250cm9sbGVycy5jb2ZmZWUiLCJkaXJlY3RpdmVzLmNvZmZlZSIsImluaXQuY29mZmVlIiwicm91dGVzLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFHLE1BQU0sQ0FBQyxPQUFQLENBQUEsQ0FBSDtBQUNFLEVBQUEsTUFBTSxDQUFDLFNBQVAsR0FBbUIsT0FBTyxDQUFDLE1BQVIsQ0FBZSxXQUFmLEVBQTRCLENBQzdDLFlBRDZDLEVBRTdDLFdBRjZDLEVBRzdDLGtCQUg2QyxFQUk3QyxpQkFKNkMsRUFLN0MsZ0JBTDZDLENBQTVCLENBQW5CLENBREY7Q0FBQSxNQUFBO0FBU0UsRUFBQSxNQUFNLENBQUMsU0FBUCxHQUFtQixPQUFPLENBQUMsTUFBUixDQUFlLFdBQWYsRUFBNEIsQ0FDN0MsT0FENkMsRUFFN0Msa0JBRjZDLEVBRzdDLGlCQUg2QyxFQUk3QyxnQkFKNkMsQ0FBNUIsQ0FLakIsQ0FBQyxHQUxnQixDQUtaLFNBQUMsY0FBRCxHQUFBO1dBQ0wsY0FBYyxDQUFDLEtBQWYsQ0FBcUIsU0FBQSxHQUFBO0FBQ25CLE1BQUEsSUFBRyxNQUFNLENBQUMsU0FBVjtBQUNFLGVBQU8sU0FBUyxDQUFDLFlBQVYsQ0FBQSxDQUFQLENBREY7T0FEbUI7SUFBQSxDQUFyQixFQURLO0VBQUEsQ0FMWSxDQUFuQixDQVRGO0NBQUE7O0FBQUEsU0FxQlMsQ0FBQyxNQUFWLENBQWlCLFNBQUMsY0FBRCxFQUFpQixrQkFBakIsRUFBcUMsaUJBQXJDLEVBQXdELGFBQXhELEdBQUE7QUFDZixFQUFBLGNBQWMsQ0FBQyxLQUFmLENBQXFCLEtBQXJCLEVBQ0U7QUFBQSxJQUFBLEdBQUEsRUFBSyxFQUFMO0FBQUEsSUFDQSxRQUFBLEVBQVUsSUFEVjtBQUFBLElBRUEsVUFBQSxFQUFZLFNBRlo7QUFBQSxJQUdBLFdBQUEsRUFBYSxXQUhiO0dBREYsQ0FJMkIsQ0FBQyxLQUo1QixDQUlrQyxVQUpsQyxFQUtFO0FBQUEsSUFB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QUFBO0FBQUEsSUFDQSxJQUFBLEdBQVEsQ0FBQyxDQUFDLGFBQUYsQ0FBZ0IsTUFBaEIsQ0FEUixDQUFBO0FBQUEsSUFFQSxJQUFJLENBQUMsRUFBTCxHQUFZLEtBRlosQ0FBQTtBQUFBLElBR0EsSUFBSSxDQUFDLEdBQUwsR0FBWSxZQUhaLENBQUE7QUFBQSxJQUlBLElBQUksQ0FBQyxJQUFMLEdBQVksVUFKWixDQUFBO0FBQUEsSUFLQSxJQUFJLENBQUMsSUFBTCxHQUFZLGlFQUxaLENBQUE7QUFBQSxJQU1BLElBQUksQ0FBQyxLQUFMLEdBQWEsS0FOYixDQUFBO0FBQUEsSUFPQSxJQUFJLENBQUMsV0FBTCxDQUFpQixJQUFqQixDQVBBLENBREo7R0FKSTtDQUZMOztBQ2MyQiIsImZpbGUiOiJhcHBsaWNhdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImlmIGRldmljZS5kZXNrdG9wKClcbiAgd2luZG93LkZyYW5jaGlubyA9IGFuZ3VsYXIubW9kdWxlKCdGcmFuY2hpbm8nLCBbXG4gICAgJ25nU2FuaXRpemUnXG4gICAgJ3VpLnJvdXRlcidcbiAgICAnYnRmb3JkLnNvY2tldC1pbydcbiAgICAndGFwLmNvbnRyb2xsZXJzJ1xuICAgICd0YXAuZGlyZWN0aXZlcydcbiAgXSlcbmVsc2VcbiAgd2luZG93LkZyYW5jaGlubyA9IGFuZ3VsYXIubW9kdWxlKCdGcmFuY2hpbm8nLCBbXG4gICAgJ2lvbmljJ1xuICAgICdidGZvcmQuc29ja2V0LWlvJ1xuICAgICd0YXAuY29udHJvbGxlcnMnXG4gICAgJ3RhcC5kaXJlY3RpdmVzJ1xuICBdKS5ydW4oKCRpb25pY1BsYXRmb3JtKSAtPlxuICAgICRpb25pY1BsYXRmb3JtLnJlYWR5IC0+XG4gICAgICBpZiB3aW5kb3cuU3RhdHVzQmFyXG4gICAgICAgIHJldHVybiBTdGF0dXNCYXIuc3R5bGVEZWZhdWx0KClcbiAgICAgIHJldHVyblxuICApXG5cbkZyYW5jaGluby5jb25maWcgKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIsICRsb2NhdGlvblByb3ZpZGVyLCAkaHR0cFByb3ZpZGVyKSAtPlxuICAkc3RhdGVQcm92aWRlci5zdGF0ZSgnYXBwJyxcbiAgICB1cmw6ICcnXG4gICAgYWJzdHJhY3Q6IHRydWVcbiAgICBjb250cm9sbGVyOiAnQXBwQ3RybCdcbiAgICB0ZW1wbGF0ZVVybDogJ21lbnUuaHRtbCcpLnN0YXRlKCdhcHAuaG9tZScsXG4gICAgdXJsOiAnLydcbiAgICB2aWV3czogbWVudUNvbnRlbnQ6XG4gICAgICBjb250cm9sbGVyOiAnSG9tZUN0cmwnXG4gICAgICB0ZW1wbGF0ZVVybDogJ2hvbWUuaHRtbCcpLnN0YXRlKCdibG9nJyxcbiAgICB1cmw6ICcvYmxvZ3JvbGwnXG4gICAgY29udHJvbGxlcjogJ0Jsb2dSb2xsQ3RybCdcbiAgICB0ZW1wbGF0ZVVybDogJycpLnN0YXRlKCdhcHAuZG9jcycsXG4gICAgdXJsOiAnL2RvY3MnXG4gICAgdmlld3M6IG1lbnVDb250ZW50OlxuICAgICAgY29udHJvbGxlcjogJ0RvY3NDdHJsJ1xuICAgICAgdGVtcGxhdGVVcmw6ICdkb2NzL2luZGV4Lmh0bWwnKS5zdGF0ZSgnYXBwLmFib3V0JyxcbiAgICB1cmw6ICcvbGFuZGluZydcbiAgICB2aWV3czogbWVudUNvbnRlbnQ6XG4gICAgICBjb250cm9sbGVyOiAnTGFuZGluZ0N0cmwnXG4gICAgICB0ZW1wbGF0ZVVybDogJ2xhbmRpbmcuaHRtbCcpLnN0YXRlKCdhcHAubGFuZGluZycsXG4gICAgdXJsOiAnL2Fib3V0J1xuICAgIHZpZXdzOiBtZW51Q29udGVudDpcbiAgICAgIGNvbnRyb2xsZXI6ICdBYm91dEN0cmwnXG4gICAgICB0ZW1wbGF0ZVVybDogJ2Fib3V0Lmh0bWwnKS5zdGF0ZSgnYXBwLmJsb2cnLFxuICAgIHVybDogJy9ibG9nJ1xuICAgIHZpZXdzOiBtZW51Q29udGVudDpcbiAgICAgIGNvbnRyb2xsZXI6ICdCbG9nQ3RybCdcbiAgICAgIHRlbXBsYXRlVXJsOiAnYmxvZy5odG1sJykuc3RhdGUoJ2FwcC5yZXN1bWUnLFxuICAgIHVybDogJy9jYXN0J1xuICAgIHZpZXdzOiBtZW51Q29udGVudDpcbiAgICAgIGNvbnRyb2xsZXI6ICdDYXN0Q3RybCdcbiAgICAgIHRlbXBsYXRlVXJsOiAnY2FzdC5odG1sJykuc3RhdGUoJ2FwcC5jYXN0JyxcbiAgICB1cmw6ICcvZXhwYW5zaW9ucGFja3MnXG4gICAgdmlld3M6IG1lbnVDb250ZW50OlxuICAgICAgY29udHJvbGxlcjogJ0V4cGFuc2lvbnBhY2tzQ3RybCdcbiAgICAgIHRlbXBsYXRlVXJsOiAnZXhwYW5zaW9ucGFja3MuaHRtbCcpLnN0YXRlKCdhcHAuZXhwYW5zaW9ucGFja3MnLFxuICAgIHVybDogJy9ib29rJ1xuICAgIHZpZXdzOiBtZW51Q29udGVudDpcbiAgICAgIGNvbnRyb2xsZXI6ICdCb29rQ3RybCdcbiAgICAgIHRlbXBsYXRlVXJsOiAnYm9vay5odG1sJykuc3RhdGUoJ2FwcC5ib29rJyxcbiAgICB1cmw6ICcvcHJvZHVjdHMnXG4gICAgdmlld3M6IG1lbnVDb250ZW50OlxuICAgICAgY29udHJvbGxlcjogJ1Byb2R1Y3RzQ3RybCdcbiAgICAgIHRlbXBsYXRlVXJsOiAncHJvZHVjdHMuaHRtbCcpLnN0YXRlKCdhcHAucHJvZHVjdHMnLFxuICAgIHVybDogJy9wYXJlbnRzJ1xuICAgIHZpZXdzOiBtZW51Q29udGVudDpcbiAgICAgIGNvbnRyb2xsZXI6ICdQYXJlbnRzQ3RybCdcbiAgICAgIHRlbXBsYXRlVXJsOiAncGFyZW50cy5odG1sJykuc3RhdGUoJ2FwcC5wYXJlbnRzJyxcbiAgICB1cmw6ICcvZWR1Y2F0b3JzJ1xuICAgIHZpZXdzOiBtZW51Q29udGVudDpcbiAgICAgIGNvbnRyb2xsZXI6ICdFZHVjYXRvcnNDdHJsJ1xuICAgICAgdGVtcGxhdGVVcmw6ICdlZHVjYXRvcnMuaHRtbCcpLnN0YXRlKCdhcHAuZWR1Y2F0b3JzJyxcbiAgICB1cmw6ICcvbG9naW4nXG4gICAgdmlld3M6IG1lbnVDb250ZW50OlxuICAgICAgY29udHJvbGxlcjogJ0xvZ2luQ3RybCdcbiAgICAgIHRlbXBsYXRlVXJsOiAnbG9naW4uaHRtbCcpLnN0YXRlKCdhcHAubG9naW4nLFxuICAgIHVybDogJy9jb250YWN0J1xuICAgIHZpZXdzOiBtZW51Q29udGVudDpcbiAgICAgIGNvbnRyb2xsZXI6ICdDb250YWN0Q3RybCdcbiAgICAgIHRlbXBsYXRlVXJsOiAnY29udGFjdC5odG1sJykuc3RhdGUoJ2FwcC5kb2MnLFxuICAgIHVybDogJy9qb2ItbW9udGhseXMtdHdvJ1xuICAgIHZpZXdzOiBtZW51Q29udGVudDpcbiAgICAgIGNvbnRyb2xsZXI6ICdKb2JNb250aGx5c1R3b0N0cmwnXG4gICAgICB0ZW1wbGF0ZVVybDogJ2pvYi1tb250aGx5cy10d28uaHRtbCcpXG4gICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UgJy8nXG5cbiAgJGh0dHBQcm92aWRlci5pbnRlcmNlcHRvcnMucHVzaCAtPlxuICAgICByZXF1ZXN0OiAoY29uZmlnKSAtPlxuICAgICAgIGlmIGNvbmZpZy51cmwubWF0Y2goL1xcLmh0bWwkLykgJiYgIWNvbmZpZy51cmwubWF0Y2goL15zaGFyZWRcXC8vKVxuICAgICAgICAgaWYgZGV2aWNlLnRhYmxldCgpXG4gICAgICAgICAgIHR5cGUgPSAndGFibGV0J1xuICAgICAgICAgZWxzZSBpZiBkZXZpY2UubW9iaWxlKClcbiAgICAgICAgICAgdHlwZSA9ICdtb2JpbGUnXG4gICAgICAgICBlbHNlXG4gICAgICAgICAgIHR5cGUgPSAnZGVza3RvcCdcblxuICAgICAgICAgY29uZmlnLnVybCA9IFwiLyN7dHlwZX0vI3tjb25maWcudXJsfVwiXG5cbiAgICAgICBjb25maWdcblxuRnJhbmNoaW5vLnJ1biAoJHN0YXRlKSAtPlxuICAkc3RhdGUuZ28gJ2FwcC5ob21lJ1xuXG5cbkZyYW5jaGluby5ydW4gKCRyb290U2NvcGUsIGNvcHkpIC0+XG4gICRyb290U2NvcGUuY29weSA9IGNvcHlcbiAgaWYgZGV2aWNlLmRlc2t0b3AoKVxuICAgICRyb290U2NvcGUuJG9uICckaW5jbHVkZUNvbnRlbnRMb2FkZWQnLCAoZXZlbnQpIC0+XG4gICAgICAjIyBTbmFwc2Nyb2xsIGFuZCBiZyB2aWRlb1xuICAgICAgJCgnI2Z1bGxwYWdlJykuZnVsbHBhZ2VcbiAgICAgICAgdmVydGljYWxDZW50ZXJlZDogdHJ1ZVxuICAgICAgICBzZWN0aW9uc0NvbG9yOiBbXG4gICAgICAgICAgJyMxYmJjOWInXG4gICAgICAgICAgJyMwNDBiMTUnXG4gICAgICAgICAgJyMwNDBiMTUnXG4gICAgICAgICAgJyMwNDBiMTUnXG4gICAgICAgICAgJyNjY2RkZmYnXG4gICAgICAgIF1cbiAgICAgICAgYW5jaG9yczogW1xuICAgICAgICAgICdmaXJzdFBhZ2UnXG4gICAgICAgICAgJ3NlY29uZFBhZ2UnXG4gICAgICAgICAgJzNyZFBhZ2UnXG4gICAgICAgICAgJzR0aHBhZ2UnXG4gICAgICAgICAgJ2xhc3RQYWdlJ1xuICAgICAgICBdXG4gICAgICAgIG1lbnU6ICcjbWVudSdcbiAgICAgICAgc2Nyb2xsaW5nU3BlZWQ6IDgwMFxuICAgICAgICBhZnRlclJlbmRlcjogLT5cbiAgICAgICAgICAkKCd2aWRlbycpLmdldCgwKS5wbGF5KClcbiAgICAgICAgICByZXR1cm5cbiAgICAgIHJldHVyblxuICBlbHNlXG5cblxuICAgIFxuRnJhbmNoaW5vLmZhY3RvcnkgJ1NvY2tldCcsIChzb2NrZXRGYWN0b3J5KSAtPlxuICBzb2NrZXRGYWN0b3J5KClcbkZyYW5jaGluby5mYWN0b3J5ICdEb2NzJywgKFNvY2tldCkgLT5cbiAgc2VydmljZSA9IHVuZGVmaW5lZFxuICBzZXJ2aWNlID1cbiAgICBsaXN0OiBbXVxuICAgIGZpbmQ6IChwZXJtYWxpbmspIC0+XG4gICAgICBfLmZpbmQgc2VydmljZS5saXN0LCAoZG9jKSAtPlxuICAgICAgICBkb2MucGVybWFsaW5rID09IHBlcm1hbGlua1xuICBTb2NrZXQub24gJ2RvY3MnLCAoZG9jcykgLT5cbiAgICBzZXJ2aWNlLmxpc3QgPSBkb2NzXG4gIHNlcnZpY2VcblxuXG5cblxuXG5GcmFuY2hpbm8uY29udHJvbGxlciAnSG9tZUN0cmwnLCBbXG4gICckc2NvcGUnXG4gICgkc2NvcGUpIC0+XG5cbiAgICBkbyAtPlxuICAgICAgYm9keUVsID0gdW5kZWZpbmVkXG4gICAgICBjbG9zZWJ0biA9IHVuZGVmaW5lZFxuICAgICAgY29udGVudCA9IHVuZGVmaW5lZFxuICAgICAgaW5pdCA9IHVuZGVmaW5lZFxuICAgICAgaW5pdEV2ZW50cyA9IHVuZGVmaW5lZFxuICAgICAgaXNPcGVuID0gdW5kZWZpbmVkXG4gICAgICBvcGVuYnRuID0gdW5kZWZpbmVkXG4gICAgICB0b2dnbGVNZW51ID0gdW5kZWZpbmVkXG4gICAgICBib2R5RWwgPSBkb2N1bWVudC5ib2R5XG4gICAgICBjb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRlbnQtd3JhcCcpXG4gICAgICBvcGVuYnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ29wZW4tYnV0dG9uJylcbiAgICAgIGNsb3NlYnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Nsb3NlLWJ1dHRvbicpXG4gICAgICBpc09wZW4gPSBmYWxzZVxuXG4gICAgICBpbml0ID0gLT5cbiAgICAgICAgaW5pdEV2ZW50cygpXG4gICAgICAgIHJldHVyblxuXG4gICAgICBpbml0RXZlbnRzID0gLT5cbiAgICAgICAgJCA9IHVuZGVmaW5lZFxuICAgICAgICBjc3NJZCA9IHVuZGVmaW5lZFxuICAgICAgICBoZWFkID0gdW5kZWZpbmVkXG4gICAgICAgIGxpbmsgPSB1bmRlZmluZWRcbiAgICAgICAgaWYgZGV2aWNlLmRlc2t0b3AoKVxuICAgICAgICAgIFxuICAgICAgICBlbHNlIGlmIGRldmljZS5tb2JpbGUoKVxuICAgICAgICAgICQgPSBkb2N1bWVudFxuICAgICAgICAgIGNzc0lkID0gJ215Q3NzJ1xuICAgICAgICAgIGlmICEkLmdldEVsZW1lbnRCeUlkKGNzc0lkKVxuICAgICAgICAgICAgaGVhZCA9ICQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXVxuICAgICAgICAgICAgbGluayA9ICQuY3JlYXRlRWxlbWVudCgnbGluaycpXG4gICAgICAgICAgICBsaW5rLmlkID0gY3NzSWRcbiAgICAgICAgICAgIGxpbmsucmVsID0gJ3N0eWxlc2hlZXQnXG4gICAgICAgICAgICBsaW5rLnR5cGUgPSAndGV4dC9jc3MnXG4gICAgICAgICAgICBsaW5rLmhyZWYgPSAnaHR0cHM6Ly9jb2RlLmlvbmljZnJhbWV3b3JrLmNvbS8xLjAuMC1iZXRhLjEzL2Nzcy9pb25pYy5taW4uY3NzJ1xuICAgICAgICAgICAgbGluay5tZWRpYSA9ICdhbGwnXG4gICAgICAgICAgICBoZWFkLmFwcGVuZENoaWxkIGxpbmtcbiAgICAgICAgaWYgZGV2aWNlLmRlc2t0b3AoKVxuICAgICAgICAgIG9wZW5idG4uYWRkRXZlbnRMaXN0ZW5lciAnY2xpY2snLCB0b2dnbGVNZW51XG4gICAgICAgICAgaWYgY2xvc2VidG5cbiAgICAgICAgICAgIGNsb3NlYnRuLmFkZEV2ZW50TGlzdGVuZXIgJ2NsaWNrJywgdG9nZ2xlTWVudVxuICAgICAgICAgIGNvbnRlbnQuYWRkRXZlbnRMaXN0ZW5lciAnY2xpY2snLCAoZXYpIC0+XG4gICAgICAgICAgICB0YXJnZXQgPSB1bmRlZmluZWRcbiAgICAgICAgICAgIHRhcmdldCA9IGV2LnRhcmdldFxuICAgICAgICAgICAgaWYgaXNPcGVuIGFuZCB0YXJnZXQgIT0gb3BlbmJ0blxuICAgICAgICAgICAgICB0b2dnbGVNZW51KClcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgIHJldHVyblxuICAgICAgICBlbHNlXG5cbiAgICAgICAgXG5cbiAgICAgIHRvZ2dsZU1lbnUgPSAtPlxuICAgICAgICBpZiBpc09wZW5cbiAgICAgICAgICBjbGFzc2llLnJlbW92ZSBib2R5RWwsICdzaG93LW1lbnUnXG4gICAgICAgIGVsc2VcbiAgICAgICAgICBjbGFzc2llLmFkZCBib2R5RWwsICdzaG93LW1lbnUnXG4gICAgICAgIGlzT3BlbiA9ICFpc09wZW5cbiAgICAgICAgcmV0dXJuXG5cbiAgICAgIGluaXQoKVxuICAgICAgcmV0dXJuXG5dXG5cbkZyYW5jaGluby5jb250cm9sbGVyICdDb250YWN0U2hlZXRDdHJsJywgKCRzY29wZSwgJGlvbmljQWN0aW9uU2hlZXQpIC0+XG5cbiAgJHNjb3BlLnNob3dBY3Rpb25zaGVldCA9IC0+XG4gICAgJGlvbmljQWN0aW9uU2hlZXQuc2hvd1xuICAgICAgdGl0bGVUZXh0OiAnQ29udGFjdCBGcmFuY2hpbm8nXG4gICAgICBidXR0b25zOiBbXG4gICAgICAgIHsgdGV4dDogJ0dpdGh1YiA8aSBjbGFzcz1cImljb24gaW9uLXNoYXJlXCI+PC9pPicgfVxuICAgICAgICB7IHRleHQ6ICdDb250YWN0IFVzIDxpIGNsYXNzPVwiaWNvbiBpb24tZW1haWxcIj48L2k+JyB9XG4gICAgICAgIHsgdGV4dDogJ1R3aXR0ZXIgPGkgY2xhc3M9XCJpY29uIGlvbi1zb2NpYWwtdHdpdHRlclwiPjwvaT4nIH1cbiAgICAgICAgeyB0ZXh0OiAnMjI0LTI0MS05MTg5IDxpIGNsYXNzPVwiaWNvbiBpb24taW9zLXRlbGVwaG9uZVwiPjwvaT4nIH1cbiAgICAgIF1cbiAgICAgIGNhbmNlbFRleHQ6ICdDYW5jZWwnXG4gICAgICBjYW5jZWw6IC0+XG4gICAgICAgIGNvbnNvbGUubG9nICdDQU5DRUxMRUQnXG4gICAgICAgIHJldHVyblxuICAgICAgYnV0dG9uQ2xpY2tlZDogKGluZGV4KSAtPlxuICAgICAgICBpZiBpbmRleCA9PSAyXG4gICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnMjI0LTI0MS05MTg5J1xuICAgICAgICBpZiBpbmRleCA9PSAyXG4gICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnaHR0cDovL3R3aXR0ZXIuY29tL2dhbWlmeWVkXydcbiAgICAgICAgaWYgaW5kZXggPT0gMVxuICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJ21haWx0bzpmcmFua0BmeWUyLmNvbSdcbiAgICAgICAgaWYgaW5kZXggPT0gMFxuICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJ2h0dHA6Ly9naXRodWIuY29tL2ZyYW5ndWNjJ1xuICAgICAgICB0cnVlXG5cbiAgcmV0dXJuXG5GcmFuY2hpbm8uY29udHJvbGxlciAnU2xpZGVzVGFwT25lQ3RybCcsICgkc2NvcGUpIC0+XG4gICRzY29wZS5kYXRlID0gJ05PVkVNQkVSIDIwMTQnXG4gICRzY29wZS50aXRsZSA9ICdUYXBjZW50aXZlIG1hbmFnZXIgVVggb3ZlcmhhdWwgYW5kIGZyb250LWVuZCdcbiAgJHNjb3BlLmltYWdlcyA9IFsge1xuICAgICdhbHQnOiAnVGFwY2VudGl2ZS5jb20gVVggb3ZlcmhhdWwgYW5kIFNQQSBmcm9udC1lbmQnXG4gICAgJ3VybCc6ICcvaW1nL2dpZi9yZXBvcnQuZ2lmJ1xuICAgICd0ZXh0JzogJzxwPlN0dWR5IHRoZSB1c2VyIGFuZCB0aGVpciBnb2FscyBhbmQgb3ZlcmhhdWwgdGhlIGV4cGVyaWVuY2Ugd2hpbGUgcmUtd3JpdGluZyB0aGUgZnJvbnQtZW5kIGluIEFuZ3VsYXIuPC9wPjxhIGhyZWY9XFwnaHR0cDovL3RhcGNlbnRpdmUuY29tXFwnIHRhcmdldD1cXCdfYmxhbmtcXCc+VmlzaXQgV2Vic2l0ZTwvYT4nXG4gIH0gXVxuRnJhbmNoaW5vLmNvbnRyb2xsZXIgJ1NsaWRlc1RhcFR3b0N0cmwnLCAoJHNjb3BlKSAtPlxuICAkc2NvcGUuZGF0ZSA9ICdPQ1RPQkVSIDIwMTQnXG4gICRzY29wZS50aXRsZSA9ICdEZXNrdG9wIGFuZCBtb2JpbGUgd2ViIGZyaWVuZGx5IG1hcmtldGluZyB3ZWJzaXRlJ1xuICAkc2NvcGUuaW1hZ2VzID0gWyB7XG4gICAgJ2FsdCc6ICdTb21lIGFsdCB0ZXh0J1xuICAgICd1cmwnOiAnL2ltZy9mcmFuY2hpbm8tdGFwY2VudGl2ZS15ZWxsb3cuanBnJ1xuICAgICd0ZXh0JzogJzxwPkNyZWF0ZSBhIGtub2Nrb3V0IGJyYW5kIHN0cmF0ZWd5IHdpdGggYW4gYXdlc29tZSBsb29rIGFuZCBmZWVsLiBNYWtlIGEgc29waGlzdGljYXRlZCBvZmZlcmluZyBsb29rIHNpbXBsZSBhbmQgZWFzeSB0byB1c2UuPC9wPjxhIGhyZWY9XFwnaHR0cDovL3RhcGNlbnRpdmUuY29tXFwnIHRhcmdldD1cXCdfYmxhbmtcXCc+VmlzaXQgV2Vic2l0ZTwvYT4nXG4gIH0gXVxuRnJhbmNoaW5vLmNvbnRyb2xsZXIgJ1NsaWRlc0NwZ0N0cmwnLCAoJHNjb3BlKSAtPlxuICAkc2NvcGUuZGF0ZSA9ICdKVUxZIDIwMTQnXG4gICRzY29wZS50aXRsZSA9ICdJZGVudGl0eSwgZnVsbC1zdGFjayBNVlAsIGFuZCBtYXJrZXRpbmcgd2Vic2l0ZSBmb3IgYSBuZXcgQ1BHIGVEaXN0cmlidXRpb24gY29tcGFueSdcbiAgJHNjb3BlLmltYWdlcyA9IFsge1xuICAgICdhbHQnOiAnU29tZSBhbHQgdGV4dCdcbiAgICAndXJsJzogJy9pbWcvZnJhbmNpbm9fY3BnaW8uanBnJ1xuICAgICd0ZXh0JzogJzxwPlR1cm4gYW4gb2xkIHNjaG9vbCBDUEcgYnVzaW5lc3MgaW50byBhIHNvcGhpc3RpY2F0ZWQgdGVjaG5vbG9neSBjb21wYW55LiBEZXNpZ24gc2VjdXJlLCBhdXRvbWF0ZWQgYW5kIHRyYW5zZm9ybWF0aXZlIHBsYXRmb3JtLCB0ZWNobmljYWwgYXJjaGl0ZWN0dXJlIGFuZCBleGVjdXRlIGFuIE1WUCBlbm91Z2ggdG8gYXF1aXJlIGZpcnN0IGN1c3RvbWVycy4gTWlzc2lvbiBhY2NvbXBsaXNoZWQuPC9wPjxhIGhyZWY9XFwnaHR0cDovL2NwZy5pb1xcJyB0YXJnZXQ9XFwnX2JsYW5rXFwnPlZpc2l0IFdlYnNpdGU8L2E+J1xuICB9IF1cbkZyYW5jaGluby5jb250cm9sbGVyICdTbGlkZXNNZWR5Y2F0aW9uQ3RybCcsICgkc2NvcGUpIC0+XG4gICRzY29wZS5kYXRlID0gJ0FQUklMIDIwMTQnXG4gICRzY29wZS50aXRsZSA9ICdVc2VyIGV4cGVyaWVuY2UgZGVzaWduIGFuZCByYXBpZCBwcm90b3R5cGluZyBmb3IgTWVkeWNhdGlvbiwgYSBuZXcgaGVhbHRoY2FyZSBwcmljZSBjb21wYXJpc29uIHdlYnNpdGUnXG4gICRzY29wZS5pbWFnZXMgPSBbXG4gICAge1xuICAgICAgJ2FsdCc6ICdTb21lIGFsdCB0ZXh0J1xuICAgICAgJ3VybCc6ICcvaW1nL2ZyYW5jaGluby1tZWR5Y2F0aW9uLmpwZydcbiAgICAgICd0ZXh0JzogJzxwPldhbHR6IHVwIGluIHRoZSBvbmxpbmUgaGVhbHRoY2FyZSBpbmR1c3RyeSBndW5zIGJsYXppbmcgd2l0aCBraWxsZXIgZGVzaWduIGFuZCBpbnN0aW5jdHMuIEdldCB0aGlzIG5ldyBjb21wYW55IG9mZiB0aGUgZ3JvdW5kIHdpdGggaXRcXCdzIE1WUC4gU3dpcGUgZm9yIG1vcmUgdmlld3MuPC9wPjxhIGhyZWY9XFwnaHR0cDovL21lZHljYXRpb24uY29tXFwnIHRhcmdldD1cXCdfYmxhbmtcXCc+VmlzaXQgV2Vic2l0ZTwvYT4nXG4gICAgfVxuICAgIHtcbiAgICAgICdhbHQnOiAnU29tZSBhbHQgdGV4dCdcbiAgICAgICd1cmwnOiAnL2ltZy9mcmFuY2hpbm8tbWVkeWNhdGlvbjIuanBnJ1xuICAgICAgJ3RleHQnOiAnJ1xuICAgIH1cbiAgICB7XG4gICAgICAnYWx0JzogJ1NvbWUgYWx0IHRleHQnXG4gICAgICAndXJsJzogJy9pbWcvZnJhbmNoaW5vLW1lZHljYXRpb24zLmpwZydcbiAgICB9XG4gICAge1xuICAgICAgJ2FsdCc6ICdTb21lIGFsdCB0ZXh0J1xuICAgICAgJ3VybCc6ICcvaW1nL2ZyYW5jaGluby1tZWR5Y2F0aW9uNC5qcGcnXG4gICAgfVxuICBdXG5GcmFuY2hpbm8uY29udHJvbGxlciAnU2xpZGVzQ1NUQ3RybCcsICgkc2NvcGUpIC0+XG4gICRzY29wZS5kYXRlID0gJ0FQUklMIDIwMTQnXG4gICRzY29wZS50aXRsZSA9ICdEZXNpZ25lZCBhbmQgZGV2ZWxvcGVkIGEgbmV3IHZlcnNpb24gb2YgdGhlIENoaWNhZ28gU3VuIFRpbWVzIHVzaW5nIGEgaHlicmlkIElvbmljL0FuZ3VsYXIgc3RhY2snXG4gICRzY29wZS5pbWFnZXMgPSBbXG4gICAge1xuICAgICAgJ2FsdCc6ICdTb21lIGFsdCB0ZXh0J1xuICAgICAgJ3VybCc6ICcvaW1nL2ZyYW5jaGluby1jc3QuanBnJ1xuICAgICAgJ3RleHQnOiAnPHA+SGVscCB0aGUgc3RydWdnbGluZyBtZWRpYSBnaWFudCB1cGdyYWRlIHRoZWlyIGNvbnN1bWVyIGZhY2luZyB0ZWNobm9sb2d5LiBDcmVhdGUgb25lIGNvZGUgYmFzZSBpbiBBbmd1bGFyIGNhcGFibGUgb2YgZ2VuZXJhdGluZyBraWNrLWFzcyBleHBlcmllbmNlcyBmb3IgbW9iaWxlLCB0YWJsZXQsIHdlYiBhbmQgVFYuJ1xuICAgIH1cbiAgICB7XG4gICAgICAnYWx0JzogJ1NvbWUgYWx0IHRleHQnXG4gICAgICAndXJsJzogJy9pbWcvZnJhbmNoaW5vLWNzdDIuanBnJ1xuICAgIH1cbiAgICB7XG4gICAgICAnYWx0JzogJ1NvbWUgYWx0IHRleHQnXG4gICAgICAndXJsJzogJy9pbWcvZnJhbmNoaW5vLWNzdDMuanBnJ1xuICAgIH1cbiAgXVxuRnJhbmNoaW5vLmNvbnRyb2xsZXIgJ1NsaWRlc0tvdXBuQ3RybCcsICgkc2NvcGUpIC0+XG4gICRzY29wZS5kYXRlID0gJ01BUkNIIDIwMTQnXG4gICRzY29wZS50aXRsZSA9ICdCcmFuZCByZWZyZXNoLCBtYXJrZXRpbmcgc2l0ZSBhbmQgcGxhdGZvcm0gZXhwZXJpZW5jZSBvdmVyaGF1bCdcbiAgJHNjb3BlLmltYWdlcyA9IFtcbiAgICB7XG4gICAgICAnYWx0JzogJ1NvbWUgYWx0IHRleHQnXG4gICAgICAndXJsJzogJy9pbWcvZnJhbmNoaW5vLWtvdXBuMS5qcGcnXG4gICAgfVxuICAgIHtcbiAgICAgICdhbHQnOiAnU29tZSBhbHQgdGV4dCdcbiAgICAgICd1cmwnOiAnL2ltZy9mcmFuY2hpbm8ta291cG4yLmpwZydcbiAgICB9XG4gICAge1xuICAgICAgJ2FsdCc6ICdTb21lIGFsdCB0ZXh0J1xuICAgICAgJ3VybCc6ICcvaW1nL2ZyYW5jaGluby1rb3Vwbi5qcGcnXG4gICAgfVxuICBdXG5GcmFuY2hpbm8uY29udHJvbGxlciAnU2xpZGVzVHJvdW5kQ3RybCcsICgkc2NvcGUpIC0+XG4gICRzY29wZS5kYXRlID0gJ0FVR1VTVCAyMDEzJ1xuICAkc2NvcGUudGl0bGUgPSAnU29jaWFsIHRyYXZlbCBtb2JpbGUgYXBwIGRlc2lnbiwgVVggYW5kIHJhcGlkIHByb3RvdHlwaW5nJ1xuICAkc2NvcGUuaW1hZ2VzID0gWyB7XG4gICAgJ2FsdCc6ICdTb21lIGFsdCB0ZXh0J1xuICAgICd1cmwnOiAnL2ltZy9mcmFuY2lub190cm91bmQuanBnJ1xuICAgICd0ZXh0JzogJ0Rlc2lnbiBhbiBJbnN0YWdyYW0gYmFzZWQgc29jaWFsIHRyYXZlbCBhcHAuIFdoeT8gSSBkb25cXCd0IGtub3cuJ1xuICB9IF1cbkZyYW5jaGluby5jb250cm9sbGVyICdTbGlkZXNNb250aGx5c0N0cmwnLCAoJHNjb3BlKSAtPlxuICAkc2NvcGUuZGF0ZSA9ICdGRUJSVUFSWSAyMDEzJ1xuICAkc2NvcGUudGl0bGUgPSAnQ3VzdG9tZXIgcG9ydGFsIHBsYXRmb3JtIFVYIGRlc2lnbiBhbmQgZnJvbnQtZW5kJ1xuICAkc2NvcGUuaW1hZ2VzID0gW1xuICAgIHtcbiAgICAgICdhbHQnOiAnU29tZSBhbHQgdGV4dCdcbiAgICAgICd1cmwnOiAnL2ltZy9mcmFuY2hpbm8tbW9udGhseXMtYml6Mi5qcGcnXG4gICAgfVxuICAgIHtcbiAgICAgICdhbHQnOiAnU29tZSBhbHQgdGV4dCdcbiAgICAgICd1cmwnOiAnL2ltZy9mcmFuY2hpbm9fbW9udGhseXMuanBnJ1xuICAgIH1cbiAgXVxuRnJhbmNoaW5vLmNvbnRyb2xsZXIgJ1NsaWRlc01vbnRobHlzVHdvQ3RybCcsICgkc2NvcGUpIC0+XG4gICRzY29wZS5kYXRlID0gJ01BUkNIIDIwMTInXG4gICRzY29wZS50aXRsZSA9ICdFbnRyZXByZW5ldXIgaW4gcmVzaWRlbmNlIGF0IExpZ2h0YmFuaydcbiAgJHNjb3BlLmltYWdlcyA9IFtcbiAgICB7XG4gICAgICAnYWx0JzogJ1NvbWUgYWx0IHRleHQnXG4gICAgICAndXJsJzogJy9pbWcvZnJhbmNoaW5vLW1vbnRobHlzNy5qcGcnXG4gICAgfVxuICAgIHtcbiAgICAgICdhbHQnOiAnU29tZSBhbHQgdGV4dCdcbiAgICAgICd1cmwnOiAnL2ltZy9mcmFuY2hpbm8tbW9udGhseXM1LmpwZydcbiAgICB9XG4gICAge1xuICAgICAgJ2FsdCc6ICdTb21lIGFsdCB0ZXh0J1xuICAgICAgJ3VybCc6ICcvaW1nL2ZyYW5jaGluby1tb250aGx5czIuanBnJ1xuICAgIH1cbiAgXVxuRnJhbmNoaW5vLmNvbnRyb2xsZXIgJ0Jsb2dDdHJsJywgKCRzY29wZSkgLT5cbiAgJHNjb3BlLmFydGljbGVzID0gW1xuICAgIHtcbiAgICAgICdkYXRlJzogJ1Bvc3RlZCBieSBGcmFuY2hpbm8gb24gRGVjZW1iZXIgMzEsIDIwMTQnXG4gICAgICAnaGVhZGluZyc6ICdHaXRmbG93PydcbiAgICAgICdhdXRob3JpbWcnOiAnL2ltZy9mcmFuay5wbmcnXG4gICAgICAnaW1nJzogJy9pbWcvZGVjL2dpdC1mbG93LmpwZydcbiAgICAgICdibG9iJzogJ0dvc2ggZGFybi1pdCwgdGVhbXMgZ2V0dGluZyBtb3JlIHN5bmNlZCB3aXRoIHRoZSBoZWxwIG9mIG5ldyBnaXQgbWV0aG9kb2xvZ2llcyBmb3IgdGVhbXMuIDxhIGhyZWY9XFwnaHR0cHM6Ly93d3cuYXRsYXNzaWFuLmNvbS9naXQvdHV0b3JpYWxzL2NvbXBhcmluZy13b3JrZmxvd3MvY2VudHJhbGl6ZWQtd29ya2Zsb3dcXCc+SSBjYW5cXCd0IGtlZXAgdXA8L2E+ICdcbiAgICB9XG4gICAge1xuICAgICAgJ2RhdGUnOiAnUG9zdGVkIGJ5IEZyYW5jaGlubyBvbiBEZWNlbWJlciAyMiwgMjAxNCdcbiAgICAgICdoZWFkaW5nJzogJ09oIHNoaXQsIEFuZ3VsYXIgMi4wJ1xuICAgICAgJ2F1dGhvcmltZyc6ICcvaW1nL2ZyYW5rLnBuZydcbiAgICAgICdpbWcnOiAnL2ltZy9ncmFwaF9zcGEuanBnJ1xuICAgICAgJ2Jsb2InOiAnUGFyZG9uIG15IHNjYXR0ZXJlZCBicmFpbiByaWdodCBub3cuIFNvIGFmdGVyIHdhdGNoaW5nIHRoZSA8YSBocmVmPVxcJ2h0dHBzOi8vd3d3LnlvdXR1YmUuY29tL3dhdGNoP3Y9Z05tV3liQXlCSElcXCcgdGFyZ2V0PVxcJ19ibGFua1xcJz5FdXJvIG5nLWNvbmYgdmlkZW88L2E+IHdoZXJlIHRoZSBjcmVhdG9ycyBvZiBBbmd1bGFyIDIuMCBiYXNpY2FsbHkgc2FpZCwgZXZlcnl0aGluZyBpbiBjaGFuZ2luZywgSSBkaWQgd2hhdCBtb3N0IGRldmVsb3BlcnMgd291bGQgZG8gYW5kIGNvbXBsZXRlbHkgZnJlYWtlZC4gSSBtdXN0IHNheSwgSVxcJ20gc3RpbGwsIHRob3JvdWdobHkgY29uZnVzZWQsIGV2ZW4gYWZ0ZXIgc3BlYWtpbmcgdG8gYSBkb3plbiBvciBzbyBrZXkgZmlndXJlcyBpbiB0aGUgaW5kdXN0cnkuIE15IGZpcnN0IHJlYWN0aW9uPyBUd2VldCBvdXQgaW4gYW5nZXIuIEYtVSBBbmd1bGFyIHRlYW0gSSBwcm9ub3VuY2VkLiBGLVUuIFRoZW4sIG1vcmUgcGFuaWMgYXMgSSBjb250aW51ZWQgdG8gcmVhZCBzb21lIG9mIHRoZSBwb3N0cyBieSBvdGhlcnMgZmVlbGluZyB0aGUgc2FtZSB3YXkuIEkgYXNrZWQgdGhlIEFuZ3VsYXIgdGVhbSwgaG93IHRoZXkgd2VyZSBoZWxwaW5nIHRoZSBpbmR1c3RyeSBieSB0ZWxsaW5nIHVzIGluIGEgeWVhciBhbnl0aGluZyB3ZSBoYXZlIGRldmVsb3BlZCBpbiBBbmd1bGFyIHdvdWxkIGJlIGdhcmJhZ2UuIEkgZGlkIHdoYXQgb3RoZXJzIHNlZW1lZCB0byBiZSBkb2luZyBhbmQgaW1tZWRpYXRlbHkgc3RhcnRlZCBsb29raW5nIGZvciBhbm90aGVyIGZyYW1ld29yayB0byBzdHVkeSBhbmQgaW52ZXN0IGluLiBUaGF0XFwncyB3aGVuIEkgZm91bmQgPGEgaHJlZj1cXCdodHRwOi8vd3d3LmluZGVlZC5jb20vam9idHJlbmRzP3E9ZW1iZXIuanMlMkMrYW5ndWxhci5qcyUyQytyZWFjdC5qcyUyQytiYWNrYm9uZS5qcyZsPVxcJyB0YXJnZXQ9XFwnX2JsYW5rXFwnPnRoaXMgZ3JhcGg8L2E+IHRlbGxpbmcgbWUgdGhlIG9ubHkgb3RoZXIgU1BBIGZyYW1ld29yayB0aGF0IGhhcyBhcyBtdWNoIGFjdGl2aXR5IGFzIEFuZ3VsYXIgaXMgZ29vZCBvbGQgQmFja2JvbmUuIDxiciAvPjxiciAvPkJhY2tib25lLCBteSBmaXJzdCBTUEEgbG92ZSAtIHdlXFwndmUgbWV0IGJlZm9yZS4gRXZlbiByZWNlbnRseS4gQnV0IElcXCd2ZSBiZWVuIGxvc3QuIElcXCd2ZSBiZWVuIGlubG92ZSB3aXRoIEVnZ2hlYWQuaW8gYW5kIHRoaW5ncyBsaWtlIElvbmljLCBTcHJhbmd1bGFyIGFuZCBhbGwgc29ydHMgb2YgdGhpbmdzIHRoYXQgZ2l2ZSBtZSBzdHVmZiBmb3IgZnJlZS4gQnV0IHRoZW4gSSBub3RpY2VkIHNvbWV0aGluZy4gVGhlIGJhY2tib25lIGNvbW11bml0eSBoYXMgYmVlbiBxdWlldGx5IGRvaW5nIGl0XFwncyB0aGluZyBmb3IgYSBtaW51dGUgbm93LiBCYWNrYm9uZXJhaWxzLmNvbT8gQXJlIHlvdSBraWRkaW5nLCB3aGF0IGEgcmVzb3VyY2UuIE1hcmlvbmV0dGU/IExvdmVseS4gVGhlIGxpc3QgZ29lcyBvbi4gSSBub3cgaGF2ZSBkb3plbnMgb2YgcmVhc29ucyB0byBnaXZlIEJhY2tib25lIGFub3RoZXIgbG9vay4gQW5kIHRoZW4sIGl0IGhhcHBlbmVkLiBJIGVtYWlsZWQgTWF4IEx5bmNoIG92ZXIgYXQgSW9uaWMgYW5kIHNhaWQsIEkgdGhpbmsgeW91IG5lZWQgdG8gYWRkcmVzcyB0aGUgZnJpZ2h0IG9mIEFuZ3VsYXIgMi4wIHNvbWUgb2YgdXMgYXJlIGV4cGVyaWVuY2luZy4gQW5kIHRoZW4gaGUgc2hlZCBzb21lIGxpZ2h0LiBBZnRlciBhIHJlYWxseSBhd2Vzb21lIHJlc3BvbnNlLCBoZSBzYWlkIHNvbWV0aGluZyBhdCB0aGUgZW5kIHRvIHRoZSB0dW5lIG9mLiBBbmd1bGFyIDIgaXMgYWxsIGFib3V0IG1ha2luZyBpdCBlYXNpZXIgYW5kIGZhc3RlciB0byB1c2UsIGFuZCBtb3JlIGFwcHJvcHJpYXRlIGZvciBmdXR1cmUgYnJvd3NlciBzdGFuZGFyZHMgbGlrZSBXZWIgQ29tcG9uZW50cy4gSG1tLi4uIDxiciAvPjxiciAvPldlYiBDb21wb25lbnRzLiBZb3UgbWVhbiwgdGhpcyBzdHVmZiBJXFwndmUgYmVlbiBoZWFyaW5nIGFib3V0LCB0aGluZ3MgbGlrZSBQb2x5bWVyLCBhbmQgdGhlc2UgbmV3IHNwZWNzIHRoZSBicm93c2VyIGFscmVhZHkgaGFzIGJlZ3VuIHRvIHN1cHBvcnQsIGxpa2UgU2hhZG93IERvbSwgY3VzdG9tIGVsZW1lbnRzIGFuZCBpbXBvcnRzLiBTby4gV2hlcmUgdGhlIGhlbGwgYW0gSSByaWdodCBub3c/IEZvciBub3csIEkgdGhpbmsgSVxcJ2xsIHRha2UgYSBicmVhayBmcm9tIHN0cmVzc2luZyBhYm91dCBTUEEgZnJhbWV3b3JrcyBhbmQgbG9vayBhdCA8YSBocmVmPVxcJ2h0dHBzOi8vd3d3LnBvbHltZXItcHJvamVjdC5vcmcvXFwnIHRhcmdldD1cXCdfYmxhbmtcXCc+UG9seW1lcjwvYT4sIDxhIGhyZWY9XFwnaHR0cDovL3dlYmNvbXBvbmVudHMub3JnL1xcJyB0YXJnZXQ9XFwnX2JsYW5rXFwnPldlYiBDb21wb25lbnRzPC9hPiwgRTYgYW5kIHN0dWR5IHVwIG9uIDxhIGhyZWY9XFwnaHR0cHM6Ly9tYXRlcmlhbC5hbmd1bGFyanMub3JnLyMvXFwnIHRhcmdldD1cXCdfYmxhbmtcXCc+TWF0ZXJpYWwgRGVzaWduPC9hPiBmb3IgYSBtaW51dGUuJ1xuICAgIH1cbiAgICB7XG4gICAgICAnZGF0ZSc6ICdQb3N0ZWQgYnkgRnJhbmNoaW5vIG9uIERlY2VtYmVyIDEyLCAyMDE0J1xuICAgICAgJ2hlYWRpbmcnOiAnTXkgcGF0aCB0byBsZWFybmluZyBTd2lmdCdcbiAgICAgICdhdXRob3JpbWcnOiAnL2ltZy9mcmFuay5wbmcnXG4gICAgICAnaW1nJzogJy9pbWcvZGVjL25ld3NsZXR0ZXItc3dpZnRyaXMtaGVhZGVyLmdpZidcbiAgICAgICdibG9iJzogJ0lcXCd2ZSBiZWVuIGFuIE1WQyBkZXZlbG9wZXIgaW4gZXZlcnkgbGFuZ3VhZ2UgZXhjZXB0IGZvciBpT1MuIFRoaXMgcGFzdCBPY3RvYmVyLCBJIHRvb2sgbXkgZmlyc3QgcmVhbCBkZWVwIGRpdmUgaW50byBpT1MgcHJvZ3JhbW1pbmcgYW5kIHN0YXJ0ZWQgd2l0aCBTd2lmdC4gVGhlcmUgYXJlIHR3byBncmVhdCB0dXRvcmlhbHMgb3V0IHRoZXJlLiBUaGUgZmlyc3QgaXMgZnJvbSBibG9jLmlvIGFuZCBpcyBmcmVlLiBJdFxcJ3MgYSBnYW1lLCBTd2lmdHJpcywgc28gZ2V0IHJlYWR5IGZvciBzb21lIGFjdGlvbi4gPGJyIC8+PGJyIC8+IFRoZSBzZWNvbmQgd2lsbCBoZWxwIHlvdSBidWlsZCBzb21ldGhpbmcgbW9yZSBhcHBpc2gsIGl0XFwncyBieSBBcHBjb2RhLiBHb3QgdGhlaXIgYm9vayBhbmQgd2lsbCBiZSBkb25lIHdpdGggaXQgdGhpcyB3ZWVrLiBTbyBmYXIsIGJvb2tzIG9rLCBidXQgaXQgbW92ZXMgcmVhbGx5IHNsb3cuIElcXCdsbCBwb3N0IGEgYmxvZyBpbiBhIGZldyBkYXlzIHdpdGggbGlua3MgdG8gdGhlIGFwcCB3YXMgYWJsZSB0byBidWlsZC4nXG4gICAgICAncmVzb3VyY2UxJzogJ2h0dHBzOi8vd3d3LmJsb2MuaW8vc3dpZnRyaXMtYnVpbGQteW91ci1maXJzdC1pb3MtZ2FtZS13aXRoLXN3aWZ0J1xuICAgICAgJ3Jlc291cmNlMic6ICdodHRwOi8vd3d3LmFwcGNvZGEuY29tL3N3aWZ0LydcbiAgICB9XG4gICAge1xuICAgICAgJ2RhdGUnOiAnUG9zdGVkIGJ5IEZyYW5jaGlubyBvbiBEZWNlbWJlciAxMSwgMjAxNCdcbiAgICAgICdoZWFkaW5nJzogJ1doeSBJIGdldCBnb29zZSBidW1wcyB3aGVuIHlvdSB0YWxrIGFib3V0IGF1dG9tYXRlZCBlbWFpbCBtYXJrZXRpbmcgYW5kIHNlZ21lbnRhdGlvbiBhbmQgY3VzdG9tZXIuaW8gYW5kIHRoaW5ncyBsaWtlIHRoYXQuJ1xuICAgICAgJ2F1dGhvcmltZyc6ICcvaW1nL2ZyYW5rLnBuZydcbiAgICAgICdpbWcnOiAnL2ltZy9kZWMvcHJlcGVtYWlscy5wbmcnXG4gICAgICAnYmxvYic6ICdJIGdldCB0ZWFyeSBleWVkIHdoZW4gSSB0YWxrIGFib3V0IG15IHdvcmsgYXQgQmVuY2hQcmVwLmNvbS4gSW4gc2hvcnQsIEkgd2FzIHRoZSBmaXJzdCBlbXBsb3llZSBhbmQgaGVscGVkIHRoZSBjb21wYW55IGdldCB0byB0aGVpciBzZXJpZXMgQiBuZWFyIHRoZSBlbmQgb2YgeWVhciB0d28uIEkgZ290IGEgbG90IGRvbmUgdGhlcmUsIGFuZCBvbmUgb2YgdGhlIHRoaW5ncyBJIHJlYWxseSBlbmpveWVkIHdhcyBidWlsZGluZyBvdXQgdGVjaG5vbG9neSB0byBzZWdtZW50IGxlYWRzLCBicmluZyBkaWZmZXJlbnQgdXNlcnMgZG93biBkaWZmZXJlbnQgY29tbXVuaWNhdGlvbiBwYXRocyBhbmQgaG93IEkgbWFwcGVkIG91dCB0aGUgZW50aXJlIHN5c3RlbSB1c2luZyBjb21wbGV4IGRpYWdyYW1zIGFuZCB3b3JrZmxvd3MuIDxiciAvPjxiciAvPlNvbWUgb2YgdGhlIHRvb2xzIHdlcmUgYnVpbHQgYW5kIGJhc2VkIG9uIHF1ZXMgbGlrZSBSZWRpcyBvciBSZXNxdWUsIG90aGVycyB3ZSBidWlsdCBpbnRvIEV4YWN0VGFyZ2V0IGFuZCBDdXN0b21lci5pby4gSW4gdGhlIGVuZCwgSSBiZWNhbWUgc29tZXdoYXQgb2YgYW4gZXhwZXJ0IGF0IG1vbmV0aXppbmcgZW1haWxzLiBXaXRoaW4gb3VyIGVtYWlsIG1hcmtldGluZyBjaGFubmVsLCB3ZSBleHBsb3JlZCB0YWdnaW5nIHVzZXJzIGJhc2VkIG9uIHRoZWlyIGFjdGlvbnMsIHN1Y2ggYXMgb3BlbnMgb3Igbm9uIG9wZW5zLCBvciB3aGF0IHRoZXkgY2xpY2tlZCBvbiwgd2UgdGFyZ2VkIGVtYWlsIHVzZXJzIHdobyBoYWQgYmVlbiB0b3VjaGVkIHNldmVuIHRpbWVzIHdpdGggc3BlY2lhbCBpcnJpc2l0YWJsZSBzYWxlcywgYmVjYXVzZSB3ZSBrbm93IGFmdGVyIDYgdG91Y2hlcywgd2UgY291bGQgY29udmVydC4gVGhlc2UgdHJpY2tzIHdlIGxlYXJuZWQgbGVkIHRvIDI1LTMwayBkYXlzLCBhbmQgZXZlbnR1YWxseSwgZGF5cyB3aGVyZSB3ZSBzb2xkIDEwMGsgd29ydGggb2Ygc3Vic2NyaXB0aW9ucy4gPGJyIC8+PGJyIC8+U28sIG15IHBvaW50PyBEb25cXCd0IGJlIHN1cnByaXNlZCBpZiBJIGdlZWsgb3V0IGFuZCBmYWludCB3aGVuIEkgaGVhciB5b3UgdGFsayBhYm91dCB0cmFuc2FjdGlvbmFsIGVtYWlsaW5nIGFuZCBjYWRlbmNlcyBhbmQgY29uc3VtZXIgam91cm5pZXMgYW5kIHN0dWZmIGxpa2UgdGhhdC4nXG4gICAgfVxuICAgIHtcbiAgICAgICdkYXRlJzogJ1Bvc3RlZCBieSBGcmFuY2hpbm8gb24gRGVjZW1iZXIgMTAsIDIwMTQnXG4gICAgICAnaGVhZGluZyc6ICdJZiBJIGNvdWxkIGhhdmUgb25lIHdpc2g7IEkgZ2V0IHRvIHVzZSB0aGlzIG1ldGhvZCB3aGVuIGRlc2lnbmluZyB5b3VyIGNvbnN1bWVyIGpvdXJuZXkgZnVubmVsLidcbiAgICAgICdhdXRob3JpbWcnOiAnL2ltZy9mcmFuay5wbmcnXG4gICAgICAnaW1nJzogJy9pbWcvZGVjL3V4X2JvYXJkLmpwZydcbiAgICAgICdibG9iJzogJ1NvIGFmdGVyIGEgYnVuY2ggb2YgZXRobm9ncmFwaGljIHN0dWRpZXMgZnJvbSBwZXJzb25hIG1hdGNoZXMgSSBnYXRoZXIgaW4tcGVyc29uLCBJIGdldCB0byBmaWxsIGEgd2FsbCB1cCB3aXRoIGtleSB0aGluZ3MgcGVvcGxlIHNhaWQsIGZlbHQsIGhlYXJkIC0gbW90aXZhdG9ycywgYmFycmllcnMsIHF1ZXN0aW9ucywgYXR0aXR1ZGVzIGFuZCBzdWNoLiBJIHRoZW4gZ3JvdXAgdGhlc2UgcG9zdC1pdCB0aG91Z2h0cyBpbiB2YXJpb3VzIHdheXMsIGxvb2tpbmcgZm9yIHBhdHRlcm5zLCBzZW50aW1lbnQsIG5ldyBpZGVhcy4gPGJyIC8+PGJyIC8+SSB0aGVuIHRha2UgdGhpcyByaWNoIGRhdGEgYW5kIGRldmVsb3AgYSB3aGF0IGNvdWxkIGJlIGJyYW5kaW5nLCBhIGxhbmRpbmcgcGFnZSBvciBhbiBlbWFpbCAtIHdpdGggd2hhdCBJIGNhbGwsIGFuIGludmVydGVkIHB5cmFtaWQgYXBwcm9hY2ggdG8gY29udGVudCwgd2hlcmUgYWRkcmVzc2luZyB0aGUgbW9zdCBpbXBvcnRhbnQgdGhpbmdzIGZvdW5kIGluIHRoZSB1c2VyIHJlc2VhcmNoIGdldCBhZGRyZXNzZWQgaW4gYSBoZXJpYXJjaGljYWwgb3JkZXIuIEkgY3JlYXRlIDUtNiBpdGVyYXRpb25zIG9mIHRoZSBsYW5kaW5nIHBhZ2UgYW5kIHJlLXJ1biB0aGVtIHRocm91Z2ggYSBzZWNvbmQgZ3JvdXAgb2YgcGFydGljaXBhbnRzLCBzdGFrZWhvbGRlcnMgYW5kIGZyaWVuZHMuIEkgdGhlbiB0YWtlIGV2ZW4gbW9yZSBub3RlcyBvbiBwZW9wbGVzIHNwZWFrLWFsb3VkIHJlYWN0aW9ucyB0byB0aGUgbGFuZGluZyBwYWdlcy4gQWZ0ZXIgdGhpcywgSVxcJ20gcmVhZHkgdG8gZGVzaWduIHRoZSBmaW5hbCBjb3B5IGFuZCBwYWdlcyBmb3IgeW91ciBmdW5uZWwuJ1xuICAgIH1cbiAgICB7XG4gICAgICAnZGF0ZSc6ICdQb3N0ZWQgYnkgRnJhbmNoaW5vIG9uIERlY2VtYmVyIDksIDIwMTQnXG4gICAgICAnaGVhZGluZyc6ICdXaG8gc2F5cyBJIGRvblxcJ3QgYmVsb25nIGhlcmU/J1xuICAgICAgJ2F1dGhvcmltZyc6ICcvaW1nL2ZyYW5rLnBuZydcbiAgICAgICdpbWcnOiAnL2ltZy9kZWMvdWNsYS5qcGcnXG4gICAgICAnYmxvYic6ICdUaGlzIGNvbWluZyB3ZWVrZW5kIHRoZXJlXFwncyBwcm9iYWJseSBhIGhhY2thdGhvbiBnb2luZyBvbiBpbiB5b3VyIGNpdHkuIFNvbWUgb2YgdGhlbSBhcmUgZ2V0dGluZyByZWFsbHkgYmlnLiBJIHdhc25cXCd0IHJlZ2lzdGVyZWQgZm9yIExBIEhhY2tzIHRoaXMgc3VtbWVyLiBJIGRvblxcJ3QgZXZlbiBrbm93IGhvdyBJIGVuZGVkIHVwIHRoZXJlIG9uIGEgRnJpZGF5IG5pZ2h0LCBidXQgd2hlbiBJIHNhdyB3aGF0IHdhcyBnb2luZyBvbiwgSSBncmFiYmVkIGEgY2hhaXIgYW5kIHN0YXJ0ZWQgaGFja2luZyBhd2F5LiBXb3JyaWVkIEkgaGFkIGp1c3Qgc251Y2sgaW4gdGhlIGJhY2sgZG9vciBhbmQgc3RhcnRlZCBjb21wZXRpbmcsIG15IHJpZGUgbGVmdCBhbmQgdGhlcmUgSSB3YXMsIGZvciB0aGUgbmV4dCB0d28gZGF5cy4gPGJyIC8+PGJyIC8+VGhhdFxcJ3MgcmlnaHQuIEkgc251Y2sgaW4gdGhlIGJhY2sgb2YgTEEgSGFja3MgbGFzdCBzdW1tZXIgYXQgVUNMQSBhbmQgaGFja2VkIHdpdGgga2lkcyAxMCB5ZWFycyB5b3VuZ2VyIHRoYW4gbWUuIEkgY291bGRuXFwndCBtaXNzIGl0LiBJIHdhcyBmbG9vcmVkIHdoZW4gSSBzYXcgaG93IG1hbnkgcGVvcGxlIHdlcmUgaW4gaXQuIE1lLCBiZWluZyB0aGUgbWlzY2hldmlvdXMgaGFja2VyIEkgYW0sIEkgdGhvdWdodCBpZiBJIHVzZWQgdGhlIGVuZXJneSBvZiB0aGUgZW52aXJvbm1lbnQgdG8gbXkgYWR2YW50YWdlLCBJIGNvdWxkIGJ1aWxkIHNvbWV0aGluZyBjb29sLiBMb25nIHN0b3J5IHNob3J0LCBsZXQgbWUganVzdCBzYXksIHRoYXQgaWYgeW91IGhhdmUgYmVlbiBoYXZpbmcgYSBoYXJkIHRpbWUgbGF1bmNoaW5nLCBzaWduIHVwIGZvciBhIGhhY2thdGhvbi4gSXRcXCdzIGEgZ3VhcmFudGVlZCB3YXkgdG8gb3Zlci1jb21wZW5zYXRlIGZvciB5b3VyIGNvbnN0YW50IGZhaWx1cmUgdG8gbGF1bmNoLiBNb3JlIG9uIHdoYXQgaGFwcGVuZWQgd2hlbiBJIHRvb2sgdGhlIHN0YWdlIGJ5IHN1cnByaXNlIGFuZCBnb3QgYm9vdGVkIGxhdGVyLi4uJ1xuICAgIH1cbiAgICB7XG4gICAgICAnZGF0ZSc6ICdQb3N0ZWQgYnkgRnJhbmNoaW5vIG9uIERlY2VtYmVyIDgsIDIwMTQnXG4gICAgICAnaGVhZGluZyc6ICdTdGFydGVkIGluIEVtYmVyLmpzLCBmaW5pc2hlZCBpbiBBbmd1bGFyLmpzLiBXaHkgYW5kIGhvdyBkaWQgdGhpcyBoYXBwZW4/J1xuICAgICAgJ2F1dGhvcmltZyc6ICcvaW1nL2ZyYW5rLnBuZydcbiAgICAgICdpbWcnOiAnL2ltZy9kZWMvdXgxLmpwZydcbiAgICAgICdibG9iJzogJ0kgZ290IGxvdmUgZm9yIGFsbCBTUEEgZnJhbWV3b3Jrcy4gQ29sbGVjdGl2ZWx5LCB0aGV5IGFsbCBwdXNoIHRoZSBlbnZlbG9wZS4gTXkgZmlyc3QgY2xpZW50LXNpZGUgTVZDIHByb2plY3Qgd2FzIGEgYmFja2JvbmUgcHJvamVjdCAtIGFuZCB3ZSBzdGFydGVkIHdoZW4gdGhleSB3ZXJlIGluIEJldGEuIFRoYXQgcHJvamVjdCB3YXMgQmVuY2hQcmVwLiBBdCB0aGUgdGltZSwgYXMgYSBmcm9udC1lbmQgZGV2ZWxvcGVyLCBJIHdhcyBjb25mdXNlZCBieSB0aGUgc3dlZXBpbmcgY2hhbmdlcyB0byBob3cgdGhpbmdzIG5lZWRlZCB0byBiZSBkb25lLiBGdWxsIGZsZWRnZWQgTVZDIGZyYW1ld29ya3MgaW4gSmF2YVNjcmlwdCBsZW5kZWQgYSB3aG9sZSBuZXcgc3ludGF4LCBhbmQgdG8gdG9wIGl0IG9mZiwgb3VyIGVuZ2luZWVycyBvbiB0aGUgdGVhbSB3ZXJlIHVzaW5nIENvZmZlZVNjcmlwdCwgSEFNTCwgU0FTUyBhbmQgSmFzbWluZSwgZXRjLiBNeSBmaXJzdCBTUEEgcHJvamVjdCBkaWQgbm90IGdvIHdlbGwgYW5kIGl0IHdhc25cXCd0IHVudGlsIHdlIGNvbXBsZXRlbHkgcmUtd3JvdGUgdGhlIHNvZnR3YXJlIHRoYXQgSSBzdGFydGVkIHVuZGVyc3RhbmRpbmcgZXZlcnl0aGluZyBjbGVhcmx5LiBUd28geWVhcnMgbGF0ZXIsIGEgbmV3IHRlYW0gSSB3YXMgd29ya2luZyB3aXRoIGRlY2lkZWQgdG8gYnVpbGQgPGEgaHJlZj1cXCdodHRwOi8vYWdlbnRydW4uY29tXFwnIHRhcmdldD1cXCdfYmxhbmtcXCc+QWdlbnRydW4uY29tPC9hPiBpbiBFbWJlci5qcy4gV2UgZG92ZSBpbi4gRm91ciBtb250aHMgbGF0ZXIsIHdlIHBvcnRlZCB0byBBbmd1bGFyIGFuZCBzaW5jZSwgSVxcJ3ZlIG5ldmVyIGxvb2tlZCBiYWNrLiBJXFwnbSBvbiBteSBmaWZ0aCBvciBzaXh0aCBhbmd1bGFyIHByb2plY3Qgbm93IGFuZCBJIGRvblxcJ3QgcGxhbiBvbiBjaGFuZ2luZyBmcmFtZXdvcmtzIGZvciBhIHdoaWxlIC0gYXQgbGVhc3QgcGVyc29uYWxseS4gPGJyIC8+PGJyIC8+VGhlIGFuZ3VsYXIgbW92ZW1lbnQgcmVtaW5kcyBtZSB0aGUgbW9zdCBvZiB0aGUgUm9SIG1vdmVtZW50LiBJIGRvblxcJ3QgZ2V0IHN0dWNrIHRyeWluZyB0byBkbyB0aGluZ3MgbGlrZSBJIGRvIGluIEJhY2tib25lIG9yIEVtYmVyLiBJIGNvdWxkIGdldCBpbnRvIGRpc2N1c3Npb24gYW5kIHRlY2huaWNhbCBleGFtcGxlcywgYnV0IHRoZXJlIGFyZSBiZXR0ZXIgcGxhY2VzIHRvIGNvbXBhcmUgdGhlIHR3by4gSSBjYW5cXCd0IHdhaXQgZm9yIHRoZSBjb21wbGV0ZWx5IHJldmFtcGVkIEFuZ3VsYXIgMi4wIGFuZCBhbSBsb29raW5nIGZvcndhcmQgdG8gYSA1LTcgeWVhciBmdXR1cmUgd2l0aCBBbmd1bGFyIGJlZm9yZSBzb21ldGhpbmcgbmV3IGNvbWVzIG91dCwgc29tZXRoaW5nIHRoYXQgcGVyaGFwcyBqdXN0IGJ1aWxkcyBhcHBzIGZvciB5b3UgYnkgcmVhZGluZyB5b3VyIG1pbmQuIDxiciAvPjxiciAvPk9oLCBhbmQgaWYgeW91ciB3b25kZXJpbmcgd2hvIGRlc2lnbmVkIHRoaXMgbG92ZWx5IHdlYnNpdGUsIHRoYXQgd2FzIHlvdXJzIHRydWx5LiBJIGxlZCB0aGUgVVggcmVzZWFyY2gsIFVYIHByb3RvdHlwaW5nLCB1c2VyIHJlc2VhcmNoIGFuZCBncmFwaGljIGRlc2lnbiBvZiB0aGlzIHByb2R1Y3QuJ1xuICAgIH1cbiAgICB7XG4gICAgICAnZGF0ZSc6ICdQb3N0ZWQgYnkgRnJhbmNoaW5vIG9uIERlY2VtYmVyIDcsIDIwMTQnXG4gICAgICAnaGVhZGluZyc6ICdQbGVhc2UgZG9uXFwndCBhc2sgbWUgYWJvdXQgbXkgYXJ0IGFuZCBtaXhlZCBtZWRpYSBiYWNrZ3JvdW5kLiBJIG1pZ2h0IHRvdGFsbHkgYXZvaWQgdGhlIHF1ZXN0aW9uLidcbiAgICAgICdhdXRob3JpbWcnOiAnL2ltZy9mcmFuay5wbmcnXG4gICAgICAnaW1nJzogJy9pbWcvZGVjL21peGVkLmpwZydcbiAgICAgICdibG9iJzogJ0kgaGF2ZSBhIGh1Z2UgY29tcGxleCBhYm91dCBteSBoeWJyaWQgYmFja2dyb3VuZC4gSSBjYW5cXCd0IHRlbGwgeW91IGhvdyBtYW55IHRpbWVzIElcXCd2ZSBiZWVuIG9uIGFuIGludGVydmlldyB3aGVyZSBJXFwndmUgdHJpZWQgdG8gZXhwbGFpbiB0aGUgZmFjdCB0aGF0IElcXCdtIGFuIGFydGlzdCBhbmQgYSBwcm9ncmFtbWVyLiBUaGUgbWludXRlIEkgZG8gdGhpcywgSVxcJ20gYWxtb3N0IGluc3RhbnRseSB3cml0dGVuIG9mZiBhcyBhIGphY2stb2YtYWxsIHRyYWRlcyBvciB3ZWFrIG9uIG9uZSBzaWRlLiA8YnIgLz48YnIgLz5TbywgSVxcJ20gYWJvdXQgdG8gb2ZmaWNpYWxseSBleHBsYWluIHRvIGV2ZXJ5b25lIHNvbWV0aGluZyBJXFwnbSBwcmV0dHkgc2Vuc2F0aXZlIGFib3V0LiBJXFwnbSBhIHZlcnkgdGFsZW50ZWQgY3JlYXRpdmUgZGlyZWN0b3Igd2l0aCBhIHZlcnkgc29waGlzdGljYXRlZCB0ZWNobmljYWwgYmFja2dyb3VuZC4gSSBtYWtlIGV4cGxhaW5lciB2aWRlb3MsIEkgZmlsbSwgSSBkbyB1c2VyIHJlc2VhcmNoLCBJIGRlc2lnbiBhbmQgSSBwcm9ncmFtLiBZZXMsIEkgcHJvZ3JhbSAtIEkgd2lsbCBmcm9udC1lbmQgd2l0aCB0aGUgYmVzdCBhbmQgaGF2ZSBhIGtuYWNrIGZvciBmcm9udC1lbmQgTVZDIGZyYW1ld29ya3MuIDxiciAvPjxiciAvPlllcywgdGhlcmUgYXJlIHNvbWUgdGhpbmdzIElcXCdtIG5vdCBnb29kIGF0LiBJXFwnbSBub3QgeW91ciBnZW5pdXMgcHJvZ3JhbW1lciB0aGF0IHdpbGwgbGVhZCB5b3VyIG90aGVyIHByb2dyYW1tZXJzIHRvIHRoZSBwcm9taXNlIGxhbmQsIGJ1dCBub3Qgd2VhayBsaWtlIHlvdXIgdGhpbmtpbmcgLSBJIGp1c3Qga25vdyBhIGxvdCBvZiBoYWNrZXJzIHdobyBkb25cXCd0IGNvbmNlcm4gdGhlbXNlbHZlcyB3aXRoIHRoaW5ncyB0aGF0IEkgZ2V0IGxvc3QgaW4sIGxpa2UgZGVzaWduIG9yIGNvbnRlbnQgc3RyYXRlZ3ksIG9yIHVzZXIgcmVzZWFyY2guIFNvIHdoZW4gSSBzYXkgd2VhaywgSSBtZWFuIHdlYWsgbGlrZSwgSVxcJ20gdGFsa2luZywgcG9zc2libHksIGZhdWwtdG9sZXJhbnQgZnVuY3Rpb25hbCBwcm9nYW1taW5nIGluIGxvdyBsZXZlbCBsYW5ndWFnZXMgb3IgRXJsYW5nIG9yIEVsaXhlciB3aXRoIHN1cGVydmlzZXIgT1RQIGFyY2hpdGVjdHVyZXMgYW5kIG1lc3NhZ2UgcGFzc2luZy4gSVxcJ20gdGFsaW5nIG1pZGRsZXdhcmUgZGV2ZWxvcG1lbnQuIElcXCdtIHRhbGtpbmcgVEREIGRldiBhbGwgZGF5IGV2ZXJ5IGRheSBvbiBhIGhhcmRjb3JlIHNjcnVtIHRlYW0uIFRoYXRcXCdzIG5vdCBtZS4gSVxcJ20gbm90IHlvdXIgbGVhZCBoZXJlLCBob3dldmVyIEkgd2lsbCBKci4gb24gdW5kZXJzdGFuZGluZyBob3cgZXZlcnkgbGluZSBvZiBjb2RlIHdvcmtzIGluIHlvdXIgYXBwLiBJXFwnbSB5b3VyIHByb3RvdHlwZXIsIE1WUCBndXkgb3IgZm9sbG93IHlvdXIgbGVhZCBndXkgd2hlbiBpdCBjb21lcyB0byBwcm9ncmFtbWluZy4gSSBjYW4gbWFrZSBqdXN0IGFib3V0IGFueXRoaW5nIEkgd2FudCwgYnV0IGRvblxcJ3QgZmVlbCBjb21mb3J0YWJsZSBsZWFkaW5nIHNheSwgYW4gaU9TIG9yIEphdmEgdGVhbS4gSSBqdXN0IGRvblxcJ3QgaGF2ZSBlbm91Z2ggbG93LWxldmVsIHByb2dyYW1taW5nIGV4cGVyaWVuY2UgaW4gdGhvc2UgcGFydGljdWxhcmUgZnJhbWV3b3Jrcy4gV2hlbiBpdCBjb21lcyB0byBKYXZhU2NyaXB0LCBJXFwnbSBhIDcuIFRoZXJlIGlzblxcJ3QgYW55dGhpbmcgeW91IGNhblxcJ3QgYXNrIG1lIHRvIGRvIHdpdGggSmF2YVNjcmlwdCwgZnJvbSBGYW1vLnVzIHRvIE1WQyBzdHVmZiAtIGhvd2V2ZXIsIElcXCdtIG5vdCB5b3VyIGd1eSB3aG9cXCdzIGdvaW5nIHRvIGludHJvZHVjZSB0aGUgbmV4dCBiaWcgb3Blbi1zb3VyY2UgdG9vbCBpbiBKUy4gSVxcJ20gYSBtYWNybyBKUyBkZXZlbG9wZXIgLSBtZWFuaW5nIEkgY2FuIHRha2UgZXN0YWJsaXNoZWQgcGF0dGVybnMgYW5kIGNvbXBvbmVudHMgYW5kIGNvbmNlcHRzIGFuZCBydW4gd2l0aCB0aGVtLiBJIGRvblxcJ3QgZ2l2ZSB0YWxrcyBvbiBiaWctbyBub3RhdGlvbnMgYW5kIEkgbWlnaHQgbm90IGJlIGRvd24gZm9yIGEgNDAgaG91ciBhIHdlZWsgam9iIG9mIGhhcmRjb3JlIFRERCBwcm9ncmFtbWluZyAtIGJ1dCB0aGlzIGRvZXNuXFwndCBtZWFuIHlvdSBzaG91bGQgd3JpdGUgbWUgb2ZmIGFzIGEgZ2VuZXJhbGlzdC48YnIgLz48YnIgLz5UaGUgZmFjdCBpcyB0aGF0IElcXCd2ZSBuZXZlciBiZWVuIHRoZSB0eXBlIGZvciBhIHJvbGUgd2l0aCBhbiBlYXJseSBzdGFnZSBzdGFydHVwIHdoZXJlIEkgZGlkblxcJ3Qgd2VhciBhIGJ1bmNoIG9mIGhhdHMgb3IgdHJhbnNpdGlvbiBwZXJpb2RpY2FsbHkgZnJvbSBhIGRlc2lnbiBtaW5kZWQgdGhpbmtlciB0byBhIHRlY2huaWNhbCBzY3J1bSwgcmVxdWlyZW1lbnQgd3JpdGluZywgcHJvZHVjIG1hbmFnaW5nIGFuYWwtaXN0LidcbiAgICB9XG4gIF1cbkZyYW5jaGluby5jb250cm9sbGVyICdCbG9nUm9sbEN0cmwnLCAoJHNjb3BlKSAtPlxuRnJhbmNoaW5vLmNvbnRyb2xsZXIgJ0Fib3V0Q3RybCcsICgkc2NvcGUpIC0+XG5GcmFuY2hpbm8uY29udHJvbGxlciAnQXBwQ3RybCcsICgkc2NvcGUpIC0+XG5GcmFuY2hpbm8uY29udHJvbGxlciAnUmVzdW1lQ3RybCcsICgkc2NvcGUpIC0+XG4gICRzY29wZS5ibG9iID0gJzxkaXYgY2xhc3M9XCJyb3dcIj48ZGl2IGNsYXNzPVwibGFyZ2UtMTJcIj48ZGl2IGNsYXNzPVwicm93XCI+PGRpdiBjbGFzcz1cImxhcmdlLTEyIGNvbHVtbnNcIj48aDY+Tk9WIDIwMTMgLSBQUkVTRU5UPC9oNj48YnIvPjxoMj5IeWJyaWQgRXhwZXJpZW5jZSBEZXNpZ25lci9EZXZlbG9wZXIsIEluZGVwZW5kZW50PC9oMj48YnIvPjxwPldvcmtlZCB3aXRoIG5vdGVhYmxlIGVudHJlcHJlbm91cnMgb24gc2V2ZXJhbCBuZXcgcHJvZHVjdCBhbmQgYnVzaW5lc3MgbGF1bmNoZXMuIEhlbGQgbnVtZXJvdXMgcm9sZXMsIGluY2x1ZGluZyBjb250ZW50IHN0cmF0ZWdpc3QsIHVzZXIgcmVzZWFyY2hlciwgZGVzaWduZXIgYW5kIGRldmVsb3Blci4gPC9wPjxwPjxzdHJvbmc+Q29tcGFuaWVzPC9zdHJvbmc+PC9wPjx1bCBjbGFzcz1cIm5vXCI+PGxpPjxhIGhyZWY9XCJodHRwOi8vdGFwY2VudGl2ZS5jb21cIiB0YXJnZXQ9XCJfYmxhbmtcIj5UYXBjZW50aXZlPC9hPjwvbGk+PGxpPjxhIGhyZWY9XCJodHRwOi8vY3BnLmlvXCIgdGFyZ2V0PVwiX2JsYW5rXCI+Q1BHaW88L2E+PC9saT48bGk+PGEgaHJlZj1cImh0dHA6Ly9rb3UucG4vXCIgdGFyZ2V0PVwiX2JsYW5rXCI+S291LnBuIE1lZGlhPC9hPjwvbGk+PGxpPiA8YSBocmVmPVwiaHR0cDovL21lZHljYXRpb24uY29tXCIgdGFyZ2V0PVwiX2JsYW5rXCI+TWVkeWNhdGlvbjwvYT48L2xpPjxsaT4gPGEgaHJlZj1cImh0dHA6Ly93d3cuc3VudGltZXMuY29tL1wiIHRhcmdldD1cIl9ibGFua1wiPkNoaWNhZ28gU3VuIFRpbWVzPC9hPjwvbGk+PC91bD48YnIvPjxwPjxzdHJvbmc+VGFwY2VudGl2ZSBEZWxpdmVyYWJsZXM8L3N0cm9uZz48L3A+PHVsIGNsYXNzPVwiYnVsbGV0c1wiPjxsaT5Db21wbGV0ZSBUYXBjZW50aXZlLmNvbSBtYXJrZXRpbmcgd2Vic2l0ZSBhbmQgVVggb3ZlcmhhdWwgb2YgY29yZSBwcm9kdWN0LCB0aGUgXCJUYXBjZW50aXZlIE1hbmFnZXJcIjwvbGk+PGxpPkluZHVzdHJpYWwgZGVzaWduIG9mIHRoZSBUYXBjZW50aXZlIFRvdWNocG9pbnQ8L2xpPjxsaT5Db250ZW50IHN0cmF0ZWd5IGZvciBjb3Jwb3JhdGUgbWFya2V0aW5nIHNpdGU8L2xpPjxsaT5Nb2JpbGUgZmlyc3QgbWFya2V0aW5nIHdlYnNpdGUgdXNpbmcgSW9uaWMgYW5kIEFuZ3VsYXI8L2xpPjwvdWw+PHA+PHN0cm9uZz5DUEdpbyBEZWxpdmVyYWJsZXM8L3N0cm9uZz48L3A+PHVsIGNsYXNzPVwiYnVsbGV0c1wiPjxsaT5Qcm9kdWN0IGFuZCBidXNpbmVzcyBzdHJhdGVneSwgdGVjaG5pY2FsIGFyY2hpdGVjdHVyZSBhbmQgc3BlY2lmaWNhdGlvbiBkZXNpZ248L2xpPjxsaT5PbmUgaHVuZHJlZCBwYWdlIHByb3Bvc2FsIHRlbXBsYXRlIG9uIGJ1c2luZXNzIG1vZGVsIGFuZCBjb3Jwb3JhdGUgY2FwYWJpbGl0aWVzPC9saT48bGk+TWFya2V0aW5nIHdlYnNpdGUgZGVzaWduIGFuZCBjb250ZW50IHN0cmF0ZWd5PC9saT48bGk+Q29yZSBwcm9kdWN0IGRlc2lnbiBhbmQgTVZQIGZ1bmN0aW9uYWwgcHJvdG90eXBlPC9saT48L3VsPjxwPjxzdHJvbmc+S291LnBuIERlbGl2ZXJhYmxlczwvc3Ryb25nPjwvcD48dWwgY2xhc3M9XCJidWxsZXRzXCI+PGxpPktvdS5wbiBNZWRpYSBicmFuZCByZWZyZXNoPC9saT48bGk+TWFya2V0aW5nIHNpdGUgcmVkZXNpZ248L2xpPjxsaT5Qb3J0YWwgdXNlciBleHBlcmllbmNlIG92ZXJoYXVsPC9saT48L3VsPjxwPjxzdHJvbmc+TWVkeWNhdGlvbiBEZWxpdmVyYWJsZXM8L3N0cm9uZz48L3A+PHVsIGNsYXNzPVwiYnVsbGV0c1wiPjxsaT5Db25jZXB0dWFsIGRlc2lnbiBhbmQgYXJ0IGRpcmVjdGlvbjwvbGk+PGxpPlVzZXIgcmVzZWFyY2g8L2xpPjxsaT5SYXBpZCBwcm90b3R5cGVzPC9saT48L3VsPjxwPjxzdHJvbmc+Q2hpY2FnbyBTdW4gVGltZXM8L3N0cm9uZz48L3A+PHVsIGNsYXNzPVwiYnVsbGV0c1wiPjxsaT5Db25jZXB0dWFsIGRlc2lnbiBhbmQgYXJ0IGRpcmVjdGlvbjwvbGk+PGxpPk5hdGl2ZSBpT1MgYW5kIEFuZHJvaWQgYXBwIGRlc2lnbiBhbmQganVuaW9yIGRldmVsb3BtZW50PC9saT48bGk+SHlicmlkIElvbmljL0FuZ3VsYXIgZGV2ZWxvcG1lbnQ8L2xpPjwvdWw+PC9kaXY+PC9kaXY+PGJyLz48ZGl2IGNsYXNzPVwicm93XCI+PGRpdiBjbGFzcz1cImxhcmdlLTEyIGNvbHVtbnNcIj48aDY+TUFSQ0ggMjAxMCAtIE9DVE9CRVIgMjAxMzwvaDY+PGJyLz48aDI+RGlyZWN0b3Igb2YgVXNlciBFeHBlcmllbmNlLCBMaWdodGJhbms8L2gyPjxici8+PHA+TGF1bmNoZWQgYW5kIHN1cHBvcnRlZCBtdWx0aXBsZSBuZXcgY29tcGFuaWVzIHdpdGhpbiB0aGUgTGlnaHRiYW5rIHBvcnRmb2xpby4gPC9wPjxwPjxzdHJvbmc+Q29tcGFuaWVzPC9zdHJvbmc+PC9wPjx1bCBjbGFzcz1cIm5vXCI+PGxpPiA8YSBocmVmPVwiaHR0cDovL2NoaWNhZ29pZGVhcy5jb21cIiB0YXJnZXQ9XCJfYmxhbmtcIj5DaGljYWdvSWRlYXMuY29tPC9hPjwvbGk+PGxpPiA8YSBocmVmPVwiaHR0cDovL2JlbmNocHJlcC5jb21cIiB0YXJnZXQ9XCJfYmxhbmtcIj5CZW5jaFByZXAuY29tPC9hPjwvbGk+PGxpPiA8YSBocmVmPVwiaHR0cDovL3NuYXBzaGVldGFwcC5jb21cIiB0YXJnZXQ9XCJfYmxhbmtcIj5TbmFwU2hlZXRBcHAuY29tPC9hPjwvbGk+PGxpPk1vbnRobHlzLmNvbSAoZGVmdW5jdCk8L2xpPjxsaT4gPGEgaHJlZj1cImh0dHA6Ly9kb3VnaC5jb21cIiB0YXJnZXQ9XCJfYmxhbmtcIj5Eb3VnaC5jb208L2E+PC9saT48bGk+IDxhIGhyZWY9XCJodHRwOi8vZ3JvdXBvbi5jb21cIiB0YXJnZXQ9XCJfYmxhbmtcIj5Hcm91cG9uLmNvbTwvYT48L2xpPjwvdWw+PGJyLz48cD48c3Ryb25nPkNoaWNhZ28gSWRlYXMgRGVsaXZlcmFibGVzPC9zdHJvbmc+PC9wPjx1bCBjbGFzcz1cImJ1bGxldHNcIj48bGk+V2Vic2l0ZSBkZXNpZ24gcmVmcmVzaCwgYXJ0IGRpcmVjdGlvbjwvbGk+PGxpPkN1c3RvbSB0aWNrZXQgcHVyY2hhc2luZyBwbGF0Zm9ybSBVWCByZXNlYXJjaCAmYW1wOyBkZXNpZ248L2xpPjxsaT5SdWJ5IG9uIFJhaWxzIGRldmVsb3BtZW50LCBtYWludGVuZW5jZTwvbGk+PGxpPkdyYXBoaWMgZGVzaWduIHN1cHBvcnQ8L2xpPjxsaT5Bbm51YWwgcmVwb3J0IGRlc2lnbjwvbGk+PC91bD48cD48c3Ryb25nPkJlbmNoUHJlcC5jb20gRGVsaXZlcmFibGVzPC9zdHJvbmc+PC9wPjx1bCBjbGFzcz1cImJ1bGxldHNcIj48bGk+UmUtYnJhbmRpbmcsIGNvbXBsZXRlIEJlbmNoUHJlcCBpZGVudGl0eSBwYWNrYWdlPC9saT48bGk+U3VwcG9ydGVkIGNvbXBhbnkgd2l0aCBhbGwgZGVzaWduIGFuZCB1eCBmcm9tIHplcm8gdG8gZWlnaHQgbWlsbGlvbiBpbiBmaW5hbmNpbmc8L2xpPjxsaT5MZWFkIGFydCBhbmQgVVggZGlyZWN0aW9uIGZvciB0d28geWVhcnM8L2xpPjxsaT5Gcm9udC1lbmQgdXNpbmcgQmFja2JvbmUgYW5kIEJvb3RzdHJhcDwvbGk+PGxpPlVzZXIgcmVzZWFyY2gsIGV0aG5vZ3JhcGhpYyBzdHVkaWVzLCB1c2VyIHRlc3Rpbmc8L2xpPjxsaT5FbWFpbCBtYXJrZXRpbmcgY2FkZW5jZSBzeXN0ZW0gZGVzaWduIGFuZCBleGVjdXRpb248L2xpPjxsaT5TY3JpcHRlZCwgc3Rvcnlib2FyZGVkIGFuZCBleGVjdXRlZCBib3RoIGFuaW1hdGVkIGFuZCBsaXZlIG1vdGlvbiBleHBsYWluZXIgdmlkZW9zPC9saT48L3VsPjxwPjxzdHJvbmc+U25hcFNoZWV0QXBwLmNvbSBEZWxpdmVyYWJsZXM8L3N0cm9uZz48L3A+PHVsIGNsYXNzPVwiYnVsbGV0c1wiPjxsaT5MYXJnZSBzY2FsZSBwb3J0YWwgVVggcmVzZWFyY2ggYW5kIGluZm9ybWF0aW9uIGFyY2hpdGVjdHVyZTwvbGk+PGxpPlRocmVlIHJvdW5kcyBvZiByYXBpZCBwcm90b3R5cGluZyBhbmQgdXNlciB0ZXN0aW5nPC9saT48bGk+R3JhcGhpYyBkZXNpZ24gYW5kIGludGVyYWN0aW9uIGRlc2lnbiBmcmFtZXdvcms8L2xpPjxsaT5Vc2VyIHRlc3Rpbmc8L2xpPjwvdWw+PHA+PHN0cm9uZz5Nb250aGx5cy5jb20gRGVsaXZlcmFibGVzPC9zdHJvbmc+PC9wPjx1bCBjbGFzcz1cImJ1bGxldHNcIj48bGk+SWRlbnRpdHkgYW5kIGFydCBkaXJlY3Rpb248L2xpPjxsaT5Qcm9kdWN0IHN0cmF0ZWd5IGFuZCBuZXcgY29tcGFueSBsYXVuY2g8L2xpPjxsaT5PbmxpbmUgbWFya2V0aW5nIHN0cmF0ZWd5LCBpbmNsdWRpbmcgdHJhbnNhY3Rpb25hbCBlbWFpbCwgcHJvbW90aW9uIGRlc2lnbiBhbmQgbGVhZCBnZW5lcmF0aW9uPC9saT48bGk+UHJvZHVjdCBleHBlcmllbmNlIGRlc2lnbiBhbmQgZnJvbnQtZW5kPC9saT48bGk+Q29udGVudCBzdHJhdGVneTwvbGk+PGxpPlNjcmlwdGVkLCBzdG9yeWJvYXJkZWQgYW5kIGV4ZWN1dGVkIGJvdGggYW5pbWF0ZWQgYW5kIGxpdmUgbW90aW9uIGV4cGxhaW5lciB2aWRlb3M8L2xpPjwvdWw+PHA+PHN0cm9uZz5Eb3VnaC5jb20gRGVsaXZlcmFibGVzPC9zdHJvbmc+PC9wPjx1bCBjbGFzcz1cImJ1bGxldHMgYnVsbGV0c1wiPjxsaT5Db25zdW1lciBqb3VybmV5IG1hcHBpbmcgYW5kIGV0aG5vZ3JhcGhpYyBzdHVkaWVzPC9saT48bGk+UmFwaWQgcHJvdG90eXBpbmcsIGNvbmNlcHR1YWwgZGVzaWduPC9saT48bGk+TWVzc2FnaW5nIHN0cmF0ZWd5LCB1c2VyIHRlc3Rpbmc8L2xpPjwvdWw+PHA+PHN0cm9uZz5Hcm91cG9uLmNvbSBEZWxpdmVyYWJsZXM8L3N0cm9uZz48L3A+PHVsIGNsYXNzPVwiYnVsbGV0c1wiPjxsaT5FbWVyZ2luZyBtYXJrZXRzIHJlc2VhcmNoPC9saT48bGk+UmFwaWQgZGVzaWduIGFuZCBwcm90b3R5cGluZzwvbGk+PGxpPlZpc3VhbCBkZXNpZ24gb24gbmV3IGNvbmNlcHRzPC9saT48bGk+RW1haWwgc2VnbWVudGF0aW9uIHJlc2VhcmNoPC9saT48L3VsPjwvZGl2PjwvZGl2Pjxici8+PGRpdiBjbGFzcz1cInJvd1wiPjxkaXYgY2xhc3M9XCJsYXJnZS0xMiBjb2x1bW5zXCI+PGg2Pk5PVkVNQkVSIDIwMDcgLSBBUFJJTCAyMDEwPC9oNj48YnIvPjxoMj5EZXZlbG9wZXIgJmFtcDsgQ28tZm91bmRlciwgRGlsbHllby5jb208L2gyPjxici8+PHA+Q28tZm91bmRlZCwgZGVzaWduZWQgYW5kIGRldmVsb3BlZCBhIGRhaWx5IGRlYWwgZUNvbW1lcmNlIHdlYnNpdGUuPC9wPjxwPjxzdHJvbmc+Um9sZTwvc3Ryb25nPjxici8+RGVzaWduZWQsIGRldmVsb3BlZCBhbmQgbGF1bmNoZWQgY29tcGFuaWVzIGZpcnN0IGNhcnQgd2l0aCBQSFAuIEl0ZXJhdGVkIGFuZCBncmV3IHNpdGUgdG8gbW9yZSB0aGFuIHR3byBodW5kcmVkIGFuZCBmaWZ0eSB0aG91c2FuZCBzdWJzY3JpYmVycyBpbiBsZXNzIHRoYW4gb25lIHllYXIuIDwvcD48cD48c3Ryb25nPk5vdGVhYmxlIFN0YXRzPC9zdHJvbmc+PC9wPjx1bCBjbGFzcz1cImJ1bGxldHNcIj48bGk+QnVpbHQgYSBsaXN0IG9mIDI1MCwwMDAgc3Vic2NyaWJlcnMgaW4gdGhlIGZpcnN0IHllYXI8L2xpPjxsaT5QaXZvdGVkIGFuZCB0d2Vha2VkIGRlc2lnbiwgYnVzaW5lc3MgYW5kIGFwcHJvYWNoIHRvIDEwMDAgdHJhbnNhY3Rpb25zIHBlciBkYWlseTwvbGk+PGxpPlNvbGQgYnVzaW5lc3MgaW4gRGVjZW1iZXIgMjAwOSB0byBJbm5vdmF0aXZlIENvbW1lcmNlIFNvbHV0aW9uczwvbGk+PC91bD48L2Rpdj48L2Rpdj48YnIvPjxkaXYgY2xhc3M9XCJyb3dcIj48ZGl2IGNsYXNzPVwibGFyZ2UtMTIgY29sdW1uc1wiPjxoNj5NQVJDSCAyMDA1IC0gT0NUT0JFUiAyMDA3PC9oNj48YnIvPjxoMj5Tb2x1dGlvbnMgQXJjaGl0ZWN0ICZhbXA7IFNlbmlvciBEZXZlbG9wZXIsIDxhIGhyZWY9XCJodHRwOi8vd3d3Lm1hbmlmZXN0ZGlnaXRhbC5jb20vXCI+TWFuaWZlc3QgRGlnaXRhbDwvYT48L2gyPjxici8+PHA+QnVpbHQgYW5kIG1hbmFnZWQgbXVsdGlwbGUgQ2FyZWVyQnVpbGRlci5jb20gbmljaGUgc2l0ZXMgZm9yIHRoZSBsYXJnZXN0IGluZGVwZW5kZW50IGFnZW5jeSBpbiB0aGUgbWlkd2VzdC48L3A+PHA+PHN0cm9uZz5Sb2xlPC9zdHJvbmc+PGJyLz5SZXNlYXJjaCBhbmQgZXhwbG9yZSBlbWVyZ2luZyB0ZWNobm9sb2dpZXMsIGltcGxlbWVudCBzb2x1dGlvbnMgYW5kIG1hbmFnZSBvdGhlciBkZXZlbG9wZXJzLiBXb3JrZWQgd2l0aCBhc3AubmV0IG9uIGEgZGFpbHkgYmFzaXMgZm9yIGFsbW9zdCB0d28geWVhcnMuIDwvcD48cD48c3Ryb25nPk5vdGVhYmxlIEFjY29tcGxpc2htZW50czwvc3Ryb25nPjwvcD48dWwgY2xhc3M9XCJidWxsZXRzXCI+PGxpPlJlY29nbml6ZWQgZm9yIGxhdW5jaGluZyBoaWdoIHF1YWxpdHkgd2ViIGFwcCBmb3IgQ2FyZWVyIEJ1aWxkZXIgaW4gcmVjb3JkIHRpbWU8L2xpPjxsaT5NYW5hZ2VkIGV4dHJlbWUgU0VPIHByb2plY3Qgd2l0aCBtb3JlIHRoYW4gNTAwIHRob3VzYW5kIGxpbmtzLCBwYWdlcyBhbmQgb3ZlciA4IG1pbGxpb24gVUdDIGFydGlmYWN0czwvbGk+PGxpPlNoaWZ0ZWQgYWdlbmNpZXMgZGV2ZWxvcG1lbnQgcHJhY3RpY2VzIHRvIHZhcmlvdXMgbmV3IGNsaWVudC1jZW50cmljIEFKQVggbWV0aG9kb2xvZ2llczwvbGk+PGxpPk1hbmFnZWQgbXVsdGlwbGUgcHJvamVjdHMgY29uY3VycmVudGx5LCBpbmNsdWRpbmcgY2hvb3NlY2hpY2Fnby5jb20gYW5kIGJyaWVmaW5nLmNvbTwvbGk+PC91bD48L2Rpdj48L2Rpdj48YnIvPjxkaXYgY2xhc3M9XCJyb3dcIj48ZGl2IGNsYXNzPVwibGFyZ2UtMTIgY29sdW1uc1wiPjxoNj5BUFJJTCAyMDA0IC0gSkFOVUFSWSAyMDA3PC9oNj48YnIvPjxoMj5KdW5pb3IgUExEIERldmVsb3BlciwgIDxhIGhyZWY9XCJodHRwOi8vd3d3LmF2ZW51ZS1pbmMuY29tL1wiPkF2ZW51ZTwvYT48L2gyPjxici8+PHA+RnJvbnQtZW5kIGRldmVsb3BlciBhbmQgVVggZGVzaWduIGludGVybiBmb3IgQXZlbnVlIEEgUmF6b3JmaXNoc1xcJyBsZWdhY3kgY29tcGFueSwgQXZlbnVlLWluYy48L3A+PHA+PHN0cm9uZz5Sb2xlPC9zdHJvbmc+PGJyLz5EZXZlbG9wIGZyb250LWVuZCBmb3IgbXVsdGlwbGUgY2xpZW50IHdlYnNpdGVzLCBpbmNsdWRpbmcgZmxvci5jb20sIGFjaGlldmVtZW50Lm9yZywgY2FueW9ucmFuY2guY29tIGFuZCB0dXJib2NoZWYuPC9wPjxwPjxzdHJvbmc+Tm90ZWFibGUgQWNjb21wbGlzaG1lbnRzPC9zdHJvbmc+PC9wPjx1bCBjbGFzcz1cImJ1bGxldHNcIj48bGk+RXhlY3V0ZWQgZnJvbnQtZW5kIHByb2plY3RzIG9uLXRpbWUgYW5kIHVuZGVyLWJ1ZGdldDwvbGk+PGxpPkFzc2lnbmVkIFVYIGludGVybnNoaXAgcm9sZSwgcmVjb2duaXplZCBieSBkZXNpZ24gdGVhbSBhcyBhIHlvdW5nIHRhbGVudDwvbGk+PGxpPldpcmVmcmFtZWQgY3VzdG9tIHNob3BwaW5nIGNhcnQgcGxhdGZvcm0gZm9yIGZsb3IuY29tPC9saT48bGk+RGV2ZWxvcGVkIGludGVybmFsIFNFTyBwcmFjdGljZTwvbGk+PC91bD48L2Rpdj48L2Rpdj48YnIvPjxkaXYgY2xhc3M9XCJyb3dcIj48ZGl2IGNsYXNzPVwibGFyZ2UtMTIgY29sdW1uc1wiPjxoNj5KVUxZIDIwMDAgLSBKQU5VQVJZIDIwMDQ8L2g2Pjxici8+PGgyPmVDb21tZXJjZSBEZXZlbG9wZXIsIEF0b3ZhPC9oMj48YnIvPjxwPkdlbmVyYWwgd2ViIGRlc2lnbmVyIGFuZCBkZXZlbG9wZXIgZm9yIGZhbWlseSBvd25lZCBwYWludCBkaXN0cmlidXRpb24gYnVzaW5lc3MuIDwvcD48cD48c3Ryb25nPlJvbGU8L3N0cm9uZz48YnIvPkJ1aWx0IHNldmVyYWwgc2hvcHBpbmcgY2FydHMgaW4gY2xhc3NpYyBBU1AgYW5kIFBIUC4gR3JldyBidXNpbmVzcyB1c2luZyBvbmxpbmUgbWFya2V0aW5nIHN0cmF0ZWdpZXMgdG8gdHdvIG1pbGxpb24gaW4gcmV2ZW51ZS4gPC9wPjxwPjxzdHJvbmc+Tm90ZWFibGUgQWNjb21wbGlzaG1lbnRzPC9zdHJvbmc+PC9wPjx1bCBjbGFzcz1cImJ1bGxldHNcIj48bGk+QmVjYW1lIGZpcnN0IGNvbXBhbnkgdG8gc2hpcCBwYWludHMgYW5kIGNvYXRpbmdzIGFjcm9zcyB0aGUgVW5pdGVkIFN0YXRlczwvbGk+PGxpPkZpcnN0IGVtcGxveWVlLCBkZXZlbG9wZWQgY29tcGFueSB0byAyKyBtaWxsaW9uIGluIHJldmVudWUgd2l0aCBPdmVydHVyZSwgR29vZ2xlIEFkd29yZHMgYW5kIFNFTzwvbGk+PGxpPkNyZWF0ZWQsIG1hcmtldGVkIGFuZCBzdWJzY3JpYmVkIHZvY2F0aW9uYWwgc2Nob29sIGZvciBzcGVjaWFsdHkgY29hdGluZ3M8L2xpPjxsaT5Xb3JrZWQgd2l0aCB0b3AgSXRhbGlhbiBwYWludCBtYW51ZmFjdHVyZXJzIG92ZXJzZWFzIHRvIGJ1aWxkIGV4Y2x1c2l2ZSBkaXN0cmlidXRpb24gcmlnaHRzPC9saT48L3VsPjwvZGl2PjwvZGl2Pjxici8+PGRpdiBjbGFzcz1cInJvd1wiPjxkaXYgY2xhc3M9XCJsYXJnZS0xMiBjb2x1bW5zXCI+PGg2PlNFUFRFTUJFUiAyMDAwIC0gTUFZIDIwMDI8L2g2Pjxici8+PGgyPkVkdWNhdGlvbjwvaDI+PGJyLz48cD5TZWxmIGVkdWNhdGVkIGRlc2lnbmVyL3Byb2dyYW1tZXIgd2l0aCB2b2NhdGlvbmFsIHRyYWluaW5nLiA8L3A+PHA+PHN0cm9uZz5DZXJ0aWZpY2F0aW9uczwvc3Ryb25nPjxici8+aU5FVCssIEErIENlcnRpZmljYXRpb24gPC9wPjxwPjxzdHJvbmc+QXBwcmVudGljZXNoaXA8L3N0cm9uZz48YnIvPlllYXIgbG9uZyBwZXJzb25hbCBhcHByZW50aWNlc2hpcCB3aXRoIGZpcnN0IGVuZ2luZWVyIGF0IEFtYXpvbi5jb208L3A+PC9kaXY+PC9kaXY+PC9kaXY+PC9kaXY+PGJyLz48YnIvPidcbkZyYW5jaGluby5jb250cm9sbGVyICdKb2JUYXBjZW50aXZlQ3RybCcsICgkc2NvcGUpIC0+XG5GcmFuY2hpbm8uY29udHJvbGxlciAnSm9iVGFwY2VudGl2ZVR3b0N0cmwnLCAoJHNjb3BlKSAtPlxuRnJhbmNoaW5vLmNvbnRyb2xsZXIgJ0pvYkNwZ2lvQ3RybCcsICgkc2NvcGUpIC0+XG5GcmFuY2hpbm8uY29udHJvbGxlciAnSm9iTWVkeWNhdGlvbkN0cmwnLCAoJHNjb3BlKSAtPlxuRnJhbmNoaW5vLmNvbnRyb2xsZXIgJ0pvYkNzdEN0cmwnLCAoJHNjb3BlKSAtPlxuRnJhbmNoaW5vLmNvbnRyb2xsZXIgJ0xhbmRpbmdDdHJsJywgW1xuICAnJHNjb3BlJ1xuICAoJHNjb3BlKSAtPlxuICAgICMgVE9ETzogTW92ZSB0aGlzIG1lbnUgaW50byBhIGRpcmVjdGl2ZVxuICAgIGRvIC0+XG4gICAgICBib2R5RWwgPSB1bmRlZmluZWRcbiAgICAgIGNsb3NlYnRuID0gdW5kZWZpbmVkXG4gICAgICBjb250ZW50ID0gdW5kZWZpbmVkXG4gICAgICBpbml0ID0gdW5kZWZpbmVkXG4gICAgICBpbml0RXZlbnRzID0gdW5kZWZpbmVkXG4gICAgICBpc09wZW4gPSB1bmRlZmluZWRcbiAgICAgIG9wZW5idG4gPSB1bmRlZmluZWRcbiAgICAgIHRvZ2dsZU1lbnUgPSB1bmRlZmluZWRcbiAgICAgIGJvZHlFbCA9IGRvY3VtZW50LmJvZHlcbiAgICAgIGNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udGVudC13cmFwJylcbiAgICAgIG9wZW5idG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb3Blbi1idXR0b24nKVxuICAgICAgY2xvc2VidG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2xvc2UtYnV0dG9uJylcbiAgICAgIGlzT3BlbiA9IGZhbHNlXG5cbiAgICAgIGluaXQgPSAtPlxuICAgICAgICBpbml0RXZlbnRzKClcbiAgICAgICAgcmV0dXJuXG5cbiAgICAgIGluaXRFdmVudHMgPSAtPlxuICAgICAgICAkID0gdW5kZWZpbmVkXG4gICAgICAgIGNzc0lkID0gdW5kZWZpbmVkXG4gICAgICAgIGhlYWQgPSB1bmRlZmluZWRcbiAgICAgICAgbGluayA9IHVuZGVmaW5lZFxuICAgICAgICBpZiBkZXZpY2UuZGVza3RvcCgpXG4gICAgICAgICAgXG4gICAgICAgIGVsc2UgaWYgZGV2aWNlLm1vYmlsZSgpXG4gICAgICAgICAgJCA9IGRvY3VtZW50XG4gICAgICAgICAgY3NzSWQgPSAnbXlDc3MnXG4gICAgICAgICAgaWYgISQuZ2V0RWxlbWVudEJ5SWQoY3NzSWQpXG4gICAgICAgICAgICBoZWFkID0gJC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdXG4gICAgICAgICAgICBsaW5rID0gJC5jcmVhdGVFbGVtZW50KCdsaW5rJylcbiAgICAgICAgICAgIGxpbmsuaWQgPSBjc3NJZFxuICAgICAgICAgICAgbGluay5yZWwgPSAnc3R5bGVzaGVldCdcbiAgICAgICAgICAgIGxpbmsudHlwZSA9ICd0ZXh0L2NzcydcbiAgICAgICAgICAgIGxpbmsuaHJlZiA9ICdodHRwczovL2NvZGUuaW9uaWNmcmFtZXdvcmsuY29tLzEuMC4wLWJldGEuMTMvY3NzL2lvbmljLm1pbi5jc3MnXG4gICAgICAgICAgICBsaW5rLm1lZGlhID0gJ2FsbCdcbiAgICAgICAgICAgIGhlYWQuYXBwZW5kQ2hpbGQgbGlua1xuICAgICAgICBpZiBkZXZpY2UuZGVza3RvcCgpXG4gICAgICAgICAgb3BlbmJ0bi5hZGRFdmVudExpc3RlbmVyICdjbGljaycsIHRvZ2dsZU1lbnVcbiAgICAgICAgICBpZiBjbG9zZWJ0blxuICAgICAgICAgICAgY2xvc2VidG4uYWRkRXZlbnRMaXN0ZW5lciAnY2xpY2snLCB0b2dnbGVNZW51XG4gICAgICAgICAgY29udGVudC5hZGRFdmVudExpc3RlbmVyICdjbGljaycsIChldikgLT5cbiAgICAgICAgICAgIHRhcmdldCA9IHVuZGVmaW5lZFxuICAgICAgICAgICAgdGFyZ2V0ID0gZXYudGFyZ2V0XG4gICAgICAgICAgICBpZiBpc09wZW4gYW5kIHRhcmdldCAhPSBvcGVuYnRuXG4gICAgICAgICAgICAgIHRvZ2dsZU1lbnUoKVxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIGVsc2VcblxuICAgICAgICBcblxuICAgICAgdG9nZ2xlTWVudSA9IC0+XG4gICAgICAgIGlmIGlzT3BlblxuICAgICAgICAgIGNsYXNzaWUucmVtb3ZlIGJvZHlFbCwgJ3Nob3ctbWVudSdcbiAgICAgICAgZWxzZVxuICAgICAgICAgIGNsYXNzaWUuYWRkIGJvZHlFbCwgJ3Nob3ctbWVudSdcbiAgICAgICAgaXNPcGVuID0gIWlzT3BlblxuICAgICAgICByZXR1cm5cblxuICAgICAgaW5pdCgpXG4gICAgICByZXR1cm5cbl1cblxuRnJhbmNoaW5vLmNvbnRyb2xsZXIgJ0Nhc3RDdHJsJywgW1xuICAnJHNjb3BlJ1xuICAoJHNjb3BlKSAtPlxuICAgICMgVE9ETzogTW92ZSB0aGlzIG1lbnUgaW50byBhIGRpcmVjdGl2ZSBjYW4ndCBrZWVwIGFkZGluZyB0aGlzIGxpa2UgdGhpcyBldmVyeXdoZXJlXG4gICAgb25QbGF5ZXJTdGF0ZUNoYW5nZSA9IChldmVudCkgLT5cbiAgICAgICQoXCIuc3RhcnQtdmlkZW9cIikuZmFkZUluIFwibm9ybWFsXCIgIGlmIGV2ZW50LmRhdGEgaXMgWVQuUGxheWVyU3RhdGUuRU5ERURcbiAgICBkbyAtPlxuICAgICAgYm9keUVsID0gdW5kZWZpbmVkXG4gICAgICBjbG9zZWJ0biA9IHVuZGVmaW5lZFxuICAgICAgY29udGVudCA9IHVuZGVmaW5lZFxuICAgICAgaW5pdCA9IHVuZGVmaW5lZFxuICAgICAgaW5pdEV2ZW50cyA9IHVuZGVmaW5lZFxuICAgICAgaXNPcGVuID0gdW5kZWZpbmVkXG4gICAgICBvcGVuYnRuID0gdW5kZWZpbmVkXG4gICAgICB0b2dnbGVNZW51ID0gdW5kZWZpbmVkXG4gICAgICBib2R5RWwgPSBkb2N1bWVudC5ib2R5XG4gICAgICBjb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRlbnQtd3JhcCcpXG4gICAgICBvcGVuYnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ29wZW4tYnV0dG9uJylcbiAgICAgIGNsb3NlYnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Nsb3NlLWJ1dHRvbicpXG4gICAgICBpc09wZW4gPSBmYWxzZVxuXG4gICAgICBpbml0ID0gLT5cbiAgICAgICAgaW5pdEV2ZW50cygpXG4gICAgICAgIHJldHVyblxuXG4gICAgICBpbml0RXZlbnRzID0gLT5cbiAgICAgICAgJCA9IHVuZGVmaW5lZFxuICAgICAgICBjc3NJZCA9IHVuZGVmaW5lZFxuICAgICAgICBoZWFkID0gdW5kZWZpbmVkXG4gICAgICAgIGxpbmsgPSB1bmRlZmluZWRcbiAgICAgICAgaWYgZGV2aWNlLmRlc2t0b3AoKVxuICAgICAgICAgIFxuICAgICAgICBlbHNlIGlmIGRldmljZS5tb2JpbGUoKVxuICAgICAgICAgICQgPSBkb2N1bWVudFxuICAgICAgICAgIGNzc0lkID0gJ215Q3NzJ1xuICAgICAgICAgIGlmICEkLmdldEVsZW1lbnRCeUlkKGNzc0lkKVxuICAgICAgICAgICAgaGVhZCA9ICQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXVxuICAgICAgICAgICAgbGluayA9ICQuY3JlYXRlRWxlbWVudCgnbGluaycpXG4gICAgICAgICAgICBsaW5rLmlkID0gY3NzSWRcbiAgICAgICAgICAgIGxpbmsucmVsID0gJ3N0eWxlc2hlZXQnXG4gICAgICAgICAgICBsaW5rLnR5cGUgPSAndGV4dC9jc3MnXG4gICAgICAgICAgICBsaW5rLmhyZWYgPSAnaHR0cHM6Ly9jb2RlLmlvbmljZnJhbWV3b3JrLmNvbS8xLjAuMC1iZXRhLjEzL2Nzcy9pb25pYy5taW4uY3NzJ1xuICAgICAgICAgICAgbGluay5tZWRpYSA9ICdhbGwnXG4gICAgICAgICAgICBoZWFkLmFwcGVuZENoaWxkIGxpbmtcbiAgICAgICAgaWYgZGV2aWNlLmRlc2t0b3AoKVxuICAgICAgICAgIG9wZW5idG4uYWRkRXZlbnRMaXN0ZW5lciAnY2xpY2snLCB0b2dnbGVNZW51XG4gICAgICAgICAgaWYgY2xvc2VidG5cbiAgICAgICAgICAgIGNsb3NlYnRuLmFkZEV2ZW50TGlzdGVuZXIgJ2NsaWNrJywgdG9nZ2xlTWVudVxuICAgICAgICAgIGNvbnRlbnQuYWRkRXZlbnRMaXN0ZW5lciAnY2xpY2snLCAoZXYpIC0+XG4gICAgICAgICAgICB0YXJnZXQgPSB1bmRlZmluZWRcbiAgICAgICAgICAgIHRhcmdldCA9IGV2LnRhcmdldFxuICAgICAgICAgICAgaWYgaXNPcGVuIGFuZCB0YXJnZXQgIT0gb3BlbmJ0blxuICAgICAgICAgICAgICB0b2dnbGVNZW51KClcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgIHJldHVyblxuICAgICAgICBlbHNlXG5cbiAgICAgICAgXG5cbiAgICAgIHRvZ2dsZU1lbnUgPSAtPlxuICAgICAgICBpZiBpc09wZW5cbiAgICAgICAgICBjbGFzc2llLnJlbW92ZSBib2R5RWwsICdzaG93LW1lbnUnXG4gICAgICAgIGVsc2VcbiAgICAgICAgICBjbGFzc2llLmFkZCBib2R5RWwsICdzaG93LW1lbnUnXG4gICAgICAgIGlzT3BlbiA9ICFpc09wZW5cbiAgICAgICAgcmV0dXJuXG5cbiAgICAgIGluaXQoKVxuICAgICAgcmV0dXJuXG5dXG5GcmFuY2hpbm8uY29udHJvbGxlciAnSm9iS291cG5DdHJsJywgKCRzY29wZSkgLT5cbkZyYW5jaGluby5jb250cm9sbGVyICdFeHBhbnNpb25wYWNrc0N0cmwnLCAoJHNjb3BlKSAtPlxuRnJhbmNoaW5vLmNvbnRyb2xsZXIgJ0Jvb2tDdHJsJywgW1xuICAnJHNjb3BlJ1xuICAoJHNjb3BlKSAtPlxuICAgICMgVE9ETzogTW92ZSB0aGlzIG1lbnUgaW50byBhIGRpcmVjdGl2ZSBjYW4ndCBrZWVwIGFkZGluZyB0aGlzIGxpa2UgdGhpcyBldmVyeXdoZXJlXG4gICAgb25QbGF5ZXJTdGF0ZUNoYW5nZSA9IChldmVudCkgLT5cbiAgICAgICQoXCIuc3RhcnQtdmlkZW9cIikuZmFkZUluIFwibm9ybWFsXCIgIGlmIGV2ZW50LmRhdGEgaXMgWVQuUGxheWVyU3RhdGUuRU5ERURcbiAgICBkbyAtPlxuICAgICAgYm9keUVsID0gdW5kZWZpbmVkXG4gICAgICBjbG9zZWJ0biA9IHVuZGVmaW5lZFxuICAgICAgY29udGVudCA9IHVuZGVmaW5lZFxuICAgICAgaW5pdCA9IHVuZGVmaW5lZFxuICAgICAgaW5pdEV2ZW50cyA9IHVuZGVmaW5lZFxuICAgICAgaXNPcGVuID0gdW5kZWZpbmVkXG4gICAgICBvcGVuYnRuID0gdW5kZWZpbmVkXG4gICAgICB0b2dnbGVNZW51ID0gdW5kZWZpbmVkXG4gICAgICBib2R5RWwgPSBkb2N1bWVudC5ib2R5XG4gICAgICBjb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRlbnQtd3JhcCcpXG4gICAgICBvcGVuYnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ29wZW4tYnV0dG9uJylcbiAgICAgIGNsb3NlYnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Nsb3NlLWJ1dHRvbicpXG4gICAgICBpc09wZW4gPSBmYWxzZVxuXG4gICAgICBpbml0ID0gLT5cbiAgICAgICAgaW5pdEV2ZW50cygpXG4gICAgICAgIHJldHVyblxuXG4gICAgICBpbml0RXZlbnRzID0gLT5cbiAgICAgICAgJCA9IHVuZGVmaW5lZFxuICAgICAgICBjc3NJZCA9IHVuZGVmaW5lZFxuICAgICAgICBoZWFkID0gdW5kZWZpbmVkXG4gICAgICAgIGxpbmsgPSB1bmRlZmluZWRcbiAgICAgICAgaWYgZGV2aWNlLmRlc2t0b3AoKVxuICAgICAgICAgIFxuICAgICAgICBlbHNlIGlmIGRldmljZS5tb2JpbGUoKVxuICAgICAgICAgICQgPSBkb2N1bWVudFxuICAgICAgICAgIGNzc0lkID0gJ215Q3NzJ1xuICAgICAgICAgIGlmICEkLmdldEVsZW1lbnRCeUlkKGNzc0lkKVxuICAgICAgICAgICAgaGVhZCA9ICQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXVxuICAgICAgICAgICAgbGluayA9ICQuY3JlYXRlRWxlbWVudCgnbGluaycpXG4gICAgICAgICAgICBsaW5rLmlkID0gY3NzSWRcbiAgICAgICAgICAgIGxpbmsucmVsID0gJ3N0eWxlc2hlZXQnXG4gICAgICAgICAgICBsaW5rLnR5cGUgPSAndGV4dC9jc3MnXG4gICAgICAgICAgICBsaW5rLmhyZWYgPSAnaHR0cHM6Ly9jb2RlLmlvbmljZnJhbWV3b3JrLmNvbS8xLjAuMC1iZXRhLjEzL2Nzcy9pb25pYy5taW4uY3NzJ1xuICAgICAgICAgICAgbGluay5tZWRpYSA9ICdhbGwnXG4gICAgICAgICAgICBoZWFkLmFwcGVuZENoaWxkIGxpbmtcbiAgICAgICAgaWYgZGV2aWNlLmRlc2t0b3AoKVxuICAgICAgICAgIG9wZW5idG4uYWRkRXZlbnRMaXN0ZW5lciAnY2xpY2snLCB0b2dnbGVNZW51XG4gICAgICAgICAgaWYgY2xvc2VidG5cbiAgICAgICAgICAgIGNsb3NlYnRuLmFkZEV2ZW50TGlzdGVuZXIgJ2NsaWNrJywgdG9nZ2xlTWVudVxuICAgICAgICAgIGNvbnRlbnQuYWRkRXZlbnRMaXN0ZW5lciAnY2xpY2snLCAoZXYpIC0+XG4gICAgICAgICAgICB0YXJnZXQgPSB1bmRlZmluZWRcbiAgICAgICAgICAgIHRhcmdldCA9IGV2LnRhcmdldFxuICAgICAgICAgICAgaWYgaXNPcGVuIGFuZCB0YXJnZXQgIT0gb3BlbmJ0blxuICAgICAgICAgICAgICB0b2dnbGVNZW51KClcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgIHJldHVyblxuICAgICAgICBlbHNlXG5cbiAgICAgICAgXG5cbiAgICAgIHRvZ2dsZU1lbnUgPSAtPlxuICAgICAgICBpZiBpc09wZW5cbiAgICAgICAgICBjbGFzc2llLnJlbW92ZSBib2R5RWwsICdzaG93LW1lbnUnXG4gICAgICAgIGVsc2VcbiAgICAgICAgICBjbGFzc2llLmFkZCBib2R5RWwsICdzaG93LW1lbnUnXG4gICAgICAgIGlzT3BlbiA9ICFpc09wZW5cbiAgICAgICAgcmV0dXJuXG5cbiAgICAgIGluaXQoKVxuICAgICAgcmV0dXJuXG5dXG5GcmFuY2hpbm8uY29udHJvbGxlciAnUHJvZHVjdHNDdHJsJywgW1xuICAnJHNjb3BlJ1xuICAoJHNjb3BlKSAtPlxuICAgICMgVE9ETzogTW92ZSB0aGlzIG1lbnUgaW50byBhIGRpcmVjdGl2ZSBjYW4ndCBrZWVwIGFkZGluZyB0aGlzIGxpa2UgdGhpcyBldmVyeXdoZXJlXG4gICAgb25QbGF5ZXJTdGF0ZUNoYW5nZSA9IChldmVudCkgLT5cbiAgICAgICQoXCIuc3RhcnQtdmlkZW9cIikuZmFkZUluIFwibm9ybWFsXCIgIGlmIGV2ZW50LmRhdGEgaXMgWVQuUGxheWVyU3RhdGUuRU5ERURcbiAgICBkbyAtPlxuICAgICAgYm9keUVsID0gdW5kZWZpbmVkXG4gICAgICBjbG9zZWJ0biA9IHVuZGVmaW5lZFxuICAgICAgY29udGVudCA9IHVuZGVmaW5lZFxuICAgICAgaW5pdCA9IHVuZGVmaW5lZFxuICAgICAgaW5pdEV2ZW50cyA9IHVuZGVmaW5lZFxuICAgICAgaXNPcGVuID0gdW5kZWZpbmVkXG4gICAgICBvcGVuYnRuID0gdW5kZWZpbmVkXG4gICAgICB0b2dnbGVNZW51ID0gdW5kZWZpbmVkXG4gICAgICBib2R5RWwgPSBkb2N1bWVudC5ib2R5XG4gICAgICBjb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRlbnQtd3JhcCcpXG4gICAgICBvcGVuYnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ29wZW4tYnV0dG9uJylcbiAgICAgIGNsb3NlYnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Nsb3NlLWJ1dHRvbicpXG4gICAgICBpc09wZW4gPSBmYWxzZVxuXG4gICAgICBpbml0ID0gLT5cbiAgICAgICAgaW5pdEV2ZW50cygpXG4gICAgICAgIHJldHVyblxuXG4gICAgICBpbml0RXZlbnRzID0gLT5cbiAgICAgICAgJCA9IHVuZGVmaW5lZFxuICAgICAgICBjc3NJZCA9IHVuZGVmaW5lZFxuICAgICAgICBoZWFkID0gdW5kZWZpbmVkXG4gICAgICAgIGxpbmsgPSB1bmRlZmluZWRcbiAgICAgICAgaWYgZGV2aWNlLmRlc2t0b3AoKVxuICAgICAgICAgIFxuICAgICAgICBlbHNlIGlmIGRldmljZS5tb2JpbGUoKVxuICAgICAgICAgICQgPSBkb2N1bWVudFxuICAgICAgICAgIGNzc0lkID0gJ215Q3NzJ1xuICAgICAgICAgIGlmICEkLmdldEVsZW1lbnRCeUlkKGNzc0lkKVxuICAgICAgICAgICAgaGVhZCA9ICQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXVxuICAgICAgICAgICAgbGluayA9ICQuY3JlYXRlRWxlbWVudCgnbGluaycpXG4gICAgICAgICAgICBsaW5rLmlkID0gY3NzSWRcbiAgICAgICAgICAgIGxpbmsucmVsID0gJ3N0eWxlc2hlZXQnXG4gICAgICAgICAgICBsaW5rLnR5cGUgPSAndGV4dC9jc3MnXG4gICAgICAgICAgICBsaW5rLmhyZWYgPSAnaHR0cHM6Ly9jb2RlLmlvbmljZnJhbWV3b3JrLmNvbS8xLjAuMC1iZXRhLjEzL2Nzcy9pb25pYy5taW4uY3NzJ1xuICAgICAgICAgICAgbGluay5tZWRpYSA9ICdhbGwnXG4gICAgICAgICAgICBoZWFkLmFwcGVuZENoaWxkIGxpbmtcbiAgICAgICAgaWYgZGV2aWNlLmRlc2t0b3AoKVxuICAgICAgICAgIG9wZW5idG4uYWRkRXZlbnRMaXN0ZW5lciAnY2xpY2snLCB0b2dnbGVNZW51XG4gICAgICAgICAgaWYgY2xvc2VidG5cbiAgICAgICAgICAgIGNsb3NlYnRuLmFkZEV2ZW50TGlzdGVuZXIgJ2NsaWNrJywgdG9nZ2xlTWVudVxuICAgICAgICAgIGNvbnRlbnQuYWRkRXZlbnRMaXN0ZW5lciAnY2xpY2snLCAoZXYpIC0+XG4gICAgICAgICAgICB0YXJnZXQgPSB1bmRlZmluZWRcbiAgICAgICAgICAgIHRhcmdldCA9IGV2LnRhcmdldFxuICAgICAgICAgICAgaWYgaXNPcGVuIGFuZCB0YXJnZXQgIT0gb3BlbmJ0blxuICAgICAgICAgICAgICB0b2dnbGVNZW51KClcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgIHJldHVyblxuICAgICAgICBlbHNlXG5cbiAgICAgICAgXG5cbiAgICAgIHRvZ2dsZU1lbnUgPSAtPlxuICAgICAgICBpZiBpc09wZW5cbiAgICAgICAgICBjbGFzc2llLnJlbW92ZSBib2R5RWwsICdzaG93LW1lbnUnXG4gICAgICAgIGVsc2VcbiAgICAgICAgICBjbGFzc2llLmFkZCBib2R5RWwsICdzaG93LW1lbnUnXG4gICAgICAgIGlzT3BlbiA9ICFpc09wZW5cbiAgICAgICAgcmV0dXJuXG5cbiAgICAgIGluaXQoKVxuICAgICAgcmV0dXJuXG5dXG5GcmFuY2hpbm8uY29udHJvbGxlciAnUGFyZW50c0N0cmwnLCAoJHNjb3BlKSAtPlxuRnJhbmNoaW5vLmNvbnRyb2xsZXIgJ0VkdWNhdG9yc0N0cmwnLCAoJHNjb3BlKSAtPlxuRnJhbmNoaW5vLmNvbnRyb2xsZXIgJ0pvYk1lZHljYXRpb25DdHJsJywgKCRzY29wZSkgLT5cbkZyYW5jaGluby5jb250cm9sbGVyICdKb2JNZWR5Y2F0aW9uQ3RybCcsICgkc2NvcGUpIC0+XG5GcmFuY2hpbm8uY29udHJvbGxlciAnSm9iVHJvdW5kQ3RybCcsICgkc2NvcGUpIC0+XG5GcmFuY2hpbm8uY29udHJvbGxlciAnSm9iTW9udGhseXNPbmVDdHJsJywgKCRzY29wZSkgLT5cbkZyYW5jaGluby5jb250cm9sbGVyICdKb2JNb250aGx5c1R3b0N0cmwnLCAoJHNjb3BlKSAtPlxuRnJhbmNoaW5vLmNvbnRyb2xsZXIgJ0pvYkJlbmNocHJlcEN0cmwnLCAoJHNjb3BlKSAtPlxuRnJhbmNoaW5vLmNvbnRyb2xsZXIgJ0NvbnRhY3RDdHJsJywgKCRzY29wZSkgLT5cbkZyYW5jaGluby5jb250cm9sbGVyICdEZXZlbG9wZXJzQ3RybCcsICgkc2NvcGUpIC0+XG5GcmFuY2hpbm8uY29udHJvbGxlciAnRGV2ZWxvcGVyQ2VudGVyQ3RybCcsICgkc2NvcGUpIC0+XG5GcmFuY2hpbm8uY29udHJvbGxlciAnRG9jc0N0cmwnLCAoJHNjb3BlLCBEb2NzKSAtPlxuICAkc2NvcGUuJHdhdGNoICgtPlxuICAgIERvY3MubGlzdFxuICApLCAtPlxuICAgICRzY29wZS5kb2NzID0gRG9jcy5saXN0XG5GcmFuY2hpbm8uY29udHJvbGxlciAnRG9jQ3RybCcsICgkc2NvcGUsICRzY2UsICRzdGF0ZVBhcmFtcywgJHRpbWVvdXQsIERvY3MpIC0+XG4gICRzY29wZS5pbmRleCA9IGlmICRzdGF0ZVBhcmFtcy5zdGVwIHRoZW4gJHN0YXRlUGFyYW1zLnN0ZXAgLSAxIGVsc2UgMFxuICAkc2NvcGUuJHdhdGNoICgtPlxuICAgIERvY3MubGlzdFxuICApLCAtPlxuICAgICRzY29wZS5kb2MgPSBEb2NzLmZpbmQoJHN0YXRlUGFyYW1zLnBlcm1hbGluaylcbiAgICBpZiAkc2NvcGUuZG9jXG4gICAgICAkc2NvcGUuc3RlcCA9ICRzY29wZS5kb2Muc3RlcHNbJHNjb3BlLmluZGV4XVxuICAgICAgJHNjb3BlLnN0ZXAudXJsID0gJHNjZS50cnVzdEFzUmVzb3VyY2VVcmwoJHNjb3BlLnN0ZXAudXJsKVxuICAgICAgaWYgJHNjb3BlLnN0ZXAudHlwZSA9PSAnZGlhbG9nJ1xuICAgICAgICAkc2NvcGUubWVzc2FnZUluZGV4ID0gMFxuICAgICAgICAkc2NvcGUubWVzc2FnZXMgPSBbXVxuICAgICAgICByZXR1cm4gJHRpbWVvdXQoJHNjb3BlLm5leHRNZXNzYWdlLCAxMDAwKVxuICAgIHJldHVyblxuXG4gICRzY29wZS5oYXNNb3JlU3RlcHMgPSAtPlxuICAgIGlmICRzY29wZS5zdGVwXG4gICAgICByZXR1cm4gJHNjb3BlLnN0ZXAuaW5kZXggPCAkc2NvcGUuZG9jLnN0ZXBzLmxlbmd0aFxuICAgIHJldHVyblxuXG5GcmFuY2hpbm8uZGlyZWN0aXZlICdteVNsaWRlc2hvdycsIC0+XG4gIHtcbiAgICByZXN0cmljdDogJ0FDJ1xuICAgIGxpbms6IChzY29wZSwgZWxlbWVudCwgYXR0cnMpIC0+XG4gICAgICBjb25maWcgPSB1bmRlZmluZWRcbiAgICAgIGNvbmZpZyA9IGFuZ3VsYXIuZXh0ZW5kKHsgc2xpZGVzOiAnLnNsaWRlJyB9LCBzY29wZS4kZXZhbChhdHRycy5teVNsaWRlc2hvdykpXG4gICAgICBzZXRUaW1lb3V0ICgtPlxuICAgICAgICAkKGVsZW1lbnQpLmN5Y2xlIC0+XG4gICAgICAgICAge1xuICAgICAgICAgICAgZng6ICdmYWRlJ1xuICAgICAgICAgICAgc3BlZWQ6ICdmYXN0J1xuICAgICAgICAgICAgbmV4dDogJyNuZXh0MidcbiAgICAgICAgICAgIHByZXY6ICcjcHJldjInXG4gICAgICAgICAgICBjYXB0aW9uOiAnI2FsdC1jYXB0aW9uJ1xuICAgICAgICAgICAgY2FwdGlvbl90ZW1wbGF0ZTogJ3t7aW1hZ2VzLmFsdH19J1xuICAgICAgICAgICAgcGF1c2Vfb25faG92ZXI6ICd0cnVlJ1xuICAgICAgICAgIH1cbiAgICAgICksIDBcblxuICB9XG5hbmd1bGFyLm1vZHVsZSAndGFwLmNvbnRyb2xsZXJzJywgW11cbmFuZ3VsYXIubW9kdWxlKCd0YXAuZGlyZWN0aXZlcycsIFtdKS5kaXJlY3RpdmUoJ2RldmljZScsIC0+XG4gIHtcbiAgICByZXN0cmljdDogJ0EnXG4gICAgbGluazogLT5cbiAgICAgIGRldmljZS5pbml0KClcblxuICB9XG4pLnNlcnZpY2UgJ2NvcHknLCAoJHNjZSkgLT5cbiAgY29weSA9IHVuZGVmaW5lZFxuICB0cnVzdFZhbHVlcyA9IHVuZGVmaW5lZFxuICBjb3B5ID1cbiAgICBhYm91dDpcbiAgICAgIGhlYWRpbmc6ICdXZVxcJ3JlIDxzdHJvbmc+dGFwcGluZzwvc3Ryb25nPiBpbnRvIHRoZSBmdXR1cmUnXG4gICAgICBzdWJfaGVhZGluZzogJ1RhcGNlbnRpdmUgd2FzIGNyZWF0ZWQgYnkgYSB0ZWFtIHRoYXQgaGFzIGxpdmVkIHRoZSBtb2JpbGUgY29tbWVyY2UgcmV2b2x1dGlvbiBmcm9tIHRoZSBlYXJsaWVzdCBkYXlzIG9mIG1Db21tZXJjZSB3aXRoIFdBUCwgdG8gbGVhZGluZyB0aGUgY2hhcmdlIGluIG1vYmlsZSBwYXltZW50cyBhbmQgc2VydmljZXMgd2l0aCBORkMgd29ybGR3aWRlLidcbiAgICAgIGNvcHk6ICc8cD5Gb3IgdXMsIG1vYmlsZSBjb21tZXJjZSBoYXMgYWx3YXlzIGJlZW4gYWJvdXQgbXVjaCBtb3JlIHRoYW4gcGF5bWVudDogIG1hcmtldGluZywgcHJvbW90aW9ucywgcHJvZHVjdCBjb250ZW50LCBhbmQgbG95YWx0eSwgYWxsIGNvbWUgdG8gbGlmZSBpbnNpZGUgYSBtb2JpbGUgcGhvbmUuIE1vYmlsZSBjb21tZXJjZSByZWFsbHkgZ2V0cyBpbnRlcmVzdGluZyB3aGVuIGl0IGJyaWRnZXMgdGhlIGRpZ2l0YWwgYW5kIHBoeXNpY2FsIHdvcmxkcy48L3A+PHA+T3VyIGdvYWwgYXQgVGFwY2VudGl2ZSBpcyB0byBjcmVhdGUgYSBzdGF0ZS1vZi10aGUtYXJ0IG1vYmlsZSBlbmdhZ2VtZW50IHBsYXRmb3JtIHRoYXQgZW5hYmxlcyBtYXJrZXRlcnMgYW5kIGRldmVsb3BlcnMgdG8gY3JlYXRlIGVudGlyZWx5IG5ldyBjdXN0b21lciBleHBlcmllbmNlcyBpbiBwaHlzaWNhbCBsb2NhdGlvbnMg4oCTIGFsbCB3aXRoIGEgbWluaW11bSBhbW91bnQgb2YgdGVjaG5vbG9neSBkZXZlbG9wbWVudC48L3A+PHA+V2UgdGhpbmsgeW914oCZbGwgbGlrZSB3aGF0IHdl4oCZdmUgYnVpbHQgc28gZmFyLiBBbmQganVzdCBhcyBtb2JpbGUgdGVjaG5vbG9neSBpcyBjb25zdGFudGx5IGV2b2x2aW5nLCBzbyBpcyB0aGUgVGFwY2VudGl2ZSBwbGF0Zm9ybS4gR2l2ZSBpdCBhIHRlc3QgZHJpdmUgdG9kYXkuPC9wPidcbiAgICB0ZWFtOlxuICAgICAgaGVhZGluZzogJydcbiAgICAgIGJpb3M6XG4gICAgICAgIGRhdmVfcm9sZTogJydcbiAgICAgICAgZGF2ZV9jb3B5OiAnJ1xuXG4gIHRydXN0VmFsdWVzID0gKHZhbHVlcykgLT5cbiAgICBfLmVhY2ggdmFsdWVzLCAodmFsLCBrZXkpIC0+XG4gICAgICBzd2l0Y2ggdHlwZW9mIHZhbFxuICAgICAgICB3aGVuICdzdHJpbmcnXG4gICAgICAgICAgcmV0dXJuICRzY2UudHJ1c3RBc0h0bWwodmFsKVxuICAgICAgICB3aGVuICdvYmplY3QnXG4gICAgICAgICAgcmV0dXJuIHRydXN0VmFsdWVzKHZhbClcbiAgICAgIHJldHVyblxuXG4gIHRydXN0VmFsdWVzIGNvcHlcbiAgY29weVxuIiwiXG4jIG5vdCBzdXJlIGlmIHRoZXNlIGFyZSBhY3R1YWxseSBpbmplY3RpbmcgaW50byB0aGUgYXBwIG1vZHVsZSBwcm9wZXJseVxuYW5ndWxhci5tb2R1bGUoXCJ0YXAuY29udHJvbGxlcnNcIiwgW10pXG5cbiMgbW92ZSBjb250cm9sbGVycyBoZXJlXG5cblxuXG5cbiIsImFuZ3VsYXIubW9kdWxlKFwidGFwLmRpcmVjdGl2ZXNcIiwgW10pXG4gIC5kaXJlY3RpdmUgXCJkZXZpY2VcIiwgLT5cbiAgICByZXN0cmljdDogXCJBXCJcbiAgICBsaW5rOiAtPlxuICAgICAgZGV2aWNlLmluaXQoKVxuXG4gIC5zZXJ2aWNlICdjb3B5JywgKCRzY2UpIC0+XG4gICAgY29weSA9XG4gICAgICBhYm91dDpcbiAgICAgICAgaGVhZGluZzogXCJXZSdyZSA8c3Ryb25nPnRhcHBpbmc8L3N0cm9uZz4gaW50byB0aGUgZnV0dXJlXCJcbiAgICAgICAgc3ViX2hlYWRpbmc6IFwiVGFwY2VudGl2ZSB3YXMgY3JlYXRlZCBieSBhIHRlYW0gdGhhdCBoYXMgbGl2ZWQgdGhlIG1vYmlsZSBjb21tZXJjZSByZXZvbHV0aW9uIGZyb20gdGhlIGVhcmxpZXN0IGRheXMgb2YgbUNvbW1lcmNlIHdpdGggV0FQLCB0byBsZWFkaW5nIHRoZSBjaGFyZ2UgaW4gbW9iaWxlIHBheW1lbnRzIGFuZCBzZXJ2aWNlcyB3aXRoIE5GQyB3b3JsZHdpZGUuXCJcbiAgICAgICAgY29weTogXCI8cD5Gb3IgdXMsIG1vYmlsZSBjb21tZXJjZSBoYXMgYWx3YXlzIGJlZW4gYWJvdXQgbXVjaCBtb3JlIHRoYW4gcGF5bWVudDogIG1hcmtldGluZywgcHJvbW90aW9ucywgcHJvZHVjdCBjb250ZW50LCBhbmQgbG95YWx0eSwgYWxsIGNvbWUgdG8gbGlmZSBpbnNpZGUgYSBtb2JpbGUgcGhvbmUuIE1vYmlsZSBjb21tZXJjZSByZWFsbHkgZ2V0cyBpbnRlcmVzdGluZyB3aGVuIGl0IGJyaWRnZXMgdGhlIGRpZ2l0YWwgYW5kIHBoeXNpY2FsIHdvcmxkcy48L3A+PHA+T3VyIGdvYWwgYXQgVGFwY2VudGl2ZSBpcyB0byBjcmVhdGUgYSBzdGF0ZS1vZi10aGUtYXJ0IG1vYmlsZSBlbmdhZ2VtZW50IHBsYXRmb3JtIHRoYXQgZW5hYmxlcyBtYXJrZXRlcnMgYW5kIGRldmVsb3BlcnMgdG8gY3JlYXRlIGVudGlyZWx5IG5ldyBjdXN0b21lciBleHBlcmllbmNlcyBpbiBwaHlzaWNhbCBsb2NhdGlvbnMg4oCTIGFsbCB3aXRoIGEgbWluaW11bSBhbW91bnQgb2YgdGVjaG5vbG9neSBkZXZlbG9wbWVudC48L3A+PHA+V2UgdGhpbmsgeW914oCZbGwgbGlrZSB3aGF0IHdl4oCZdmUgYnVpbHQgc28gZmFyLiBBbmQganVzdCBhcyBtb2JpbGUgdGVjaG5vbG9neSBpcyBjb25zdGFudGx5IGV2b2x2aW5nLCBzbyBpcyB0aGUgVGFwY2VudGl2ZSBwbGF0Zm9ybS4gR2l2ZSBpdCBhIHRlc3QgZHJpdmUgdG9kYXkuPC9wPlwiXG4gICAgICB0ZWFtOlxuICAgICAgICBoZWFkaW5nOiBcIlwiXG4gICAgICAgIGJpb3M6XG4gICAgICAgICAgZGF2ZV9yb2xlOiBcIlwiXG4gICAgICAgICAgZGF2ZV9jb3B5OiBcIlwiXG4gICAgXG5cblxuICAgIHRydXN0VmFsdWVzID0gKHZhbHVlcykgLT5cbiAgICAgIF8uZWFjaCB2YWx1ZXMsICh2YWwsIGtleSkgLT5cbiAgICAgICAgc3dpdGNoIHR5cGVvZih2YWwpXG4gICAgICAgICAgd2hlbiAnc3RyaW5nJ1xuICAgICAgICAgICAgJHNjZS50cnVzdEFzSHRtbCh2YWwpXG4gICAgICAgICAgd2hlbiAnb2JqZWN0J1xuICAgICAgICAgICAgdHJ1c3RWYWx1ZXModmFsKVxuXG4gICAgdHJ1c3RWYWx1ZXMoY29weSlcblxuICAgIGNvcHlcbiIsImlmIGRldmljZS5kZXNrdG9wKClcblxuZWxzZSBpZiBkZXZpY2UubW9iaWxlKClcblxuXHQkID0gZG9jdW1lbnQgIyBzaG9ydGN1dFxuXHRjc3NJZCA9ICdteUNzcycgIyB5b3UgY291bGQgZW5jb2RlIHRoZSBjc3MgcGF0aCBpdHNlbGYgdG8gZ2VuZXJhdGUgaWQuLlxuXHRpZiAhJC5nZXRFbGVtZW50QnlJZChjc3NJZClcblx0ICAgIGhlYWQgID0gJC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdXG5cdCAgICBsaW5rICA9ICQuY3JlYXRlRWxlbWVudCgnbGluaycpXG5cdCAgICBsaW5rLmlkICAgPSBjc3NJZFxuXHQgICAgbGluay5yZWwgID0gJ3N0eWxlc2hlZXQnXG5cdCAgICBsaW5rLnR5cGUgPSAndGV4dC9jc3MnXG5cdCAgICBsaW5rLmhyZWYgPSAnaHR0cHM6Ly9jb2RlLmlvbmljZnJhbWV3b3JrLmNvbS8xLjAuMC1iZXRhLjEzL2Nzcy9pb25pYy5taW4uY3NzJ1xuXHQgICAgbGluay5tZWRpYSA9ICdhbGwnXG5cdCAgICBoZWFkLmFwcGVuZENoaWxkKGxpbmspXG4iLCIiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=