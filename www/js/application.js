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

Franchino.controller('CastCtrl', function($scope) {});

Franchino.controller('ExpansionpacksCtrl', function($scope) {});

Franchino.controller('BookCtrl', function($scope) {});

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



//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5jb2ZmZWUiLCJjb250cm9sbGVycy5jb2ZmZWUiLCJkaXJlY3RpdmVzLmNvZmZlZSIsImluaXQuY29mZmVlIiwicm91dGVzLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFHLE1BQU0sQ0FBQyxPQUFQLENBQUEsQ0FBSDtBQUNFLEVBQUEsTUFBTSxDQUFDLFNBQVAsR0FBbUIsT0FBTyxDQUFDLE1BQVIsQ0FBZSxXQUFmLEVBQTRCLENBQzdDLFlBRDZDLEVBRTdDLFdBRjZDLEVBRzdDLGtCQUg2QyxFQUk3QyxpQkFKNkMsRUFLN0MsZ0JBTDZDLENBQTVCLENBQW5CLENBREY7Q0FBQSxNQUFBO0FBU0UsRUFBQSxNQUFNLENBQUMsU0FBUCxHQUFtQixPQUFPLENBQUMsTUFBUixDQUFlLFdBQWYsRUFBNEIsQ0FDN0MsT0FENkMsRUFFN0Msa0JBRjZDLEVBRzdDLGlCQUg2QyxFQUk3QyxnQkFKNkMsQ0FBNUIsQ0FLakIsQ0FBQyxHQUxnQixDQUtaLFNBQUMsY0FBRCxHQUFBO1dBQ0wsY0FBYyxDQUFDLEtBQWYsQ0FBcUIsU0FBQSxHQUFBO0FBQ25CLE1BQUEsSUFBRyxNQUFNLENBQUMsU0FBVjtBQUNFLGVBQU8sU0FBUyxDQUFDLFlBQVYsQ0FBQSxDQUFQLENBREY7T0FEbUI7SUFBQSxDQUFyQixFQURLO0VBQUEsQ0FMWSxDQUFuQixDQVRGO0NBQUE7O0FBQUEsU0FxQlMsQ0FBQyxNQUFWLENBQWlCLFNBQUMsY0FBRCxFQUFpQixrQkFBakIsRUFBcUMsaUJBQXJDLEVBQXdELGFBQXhELEdBQUE7QUFDZixFQUFBLGNBQWMsQ0FBQyxLQUFmLENBQXFCLEtBQXJCLEVBQ0U7QUFBQSxJQUFBLEdBQUEsRUFBSyxFQUFMO0FBQUEsSUFDQSxRQUFBLEVBQVUsSUFEVjtBQUFBLElBRUEsVUFBQSxFQUFZLFNBRlo7QUFBQSxJQUdBLFdBQUEsRUFBYSxXQUhiO0dBREYsQ0FJMkIsQ0FBQyxLQUo1QixDQUlrQyxVQUpsQyxFQUtFO0FBQUEsSUFBQSxHQUFBLEVBQUssR0FBTDtBQUFBLElBQ0EsS0FBQSxFQUFPO0FBQUEsTUFBQSxXQUFBLEVBQ0w7QUFBQSxRQUFBLFVBQUEsRUFBWSxVQUFaO0FBQUEsUUFDQSxXQUFBLEVBQWEsV0FEYjtPQURLO0tBRFA7R0FMRixDQVE2QixDQUFDLEtBUjlCLENBUW9DLE1BUnBDLEVBU0U7QUFBQSxJQUFBLEdBQUEsRUFBSyxXQUFMO0FBQUEsSUFDQSxVQUFBLEVBQVksY0FEWjtBQUFBLElBRUEsV0FBQSxFQUFhLEVBRmI7R0FURixDQVdrQixDQUFDLEtBWG5CLENBV3lCLFVBWHpCLEVBWUU7QUFBQSxJQUFBLEdBQUEsRUFBSyxPQUFMO0FBQUEsSUFDQSxLQUFBLEVBQU87QUFBQSxNQUFBLFdBQUEsRUFDTDtBQUFBLFFBQUEsVUFBQSxFQUFZLFVBQVo7QUFBQSxRQUNBLFdBQUEsRUFBYSxpQkFEYjtPQURLO0tBRFA7R0FaRixDQWVtQyxDQUFDLEtBZnBDLENBZTBDLFdBZjFDLEVBZ0JFO0FBQUEsSUFBQSxHQUFBLEVBQUssVUFBTDtBQUFBLElBQ0EsS0FBQSxFQUFPO0FBQUEsTUFBQSxXQUFBLEVBQ0w7QUFBQSxRQUFBLFVBQUEsRUFBWSxhQUFaO0FBQUEsUUFDQSxXQUFBLEVBQWEsY0FEYjtPQURLO0tBRFA7R0FoQkYsQ0FtQmdDLENBQUMsS0FuQmpDLENBbUJ1QyxhQW5CdkMsRUFvQkU7QUFBQSxJQUFBLEdBQUEsRUFBSyxRQUFMO0FBQUEsSUFDQSxLQUFBLEVBQU87QUFBQSxNQUFBLFdBQUEsRUFDTDtBQUFBLFFBQUEsVUFBQSxFQUFZLFdBQVo7QUFBQSxRQUNBLFdBQUEsRUFBYSxZQURiO09BREs7S0FEUDtHQXBCRixDQXVCOEIsQ0FBQyxLQXZCL0IsQ0F1QnFDLFVBdkJyQyxFQXdCRTtBQUFBLElBQUEsR0FBQSxFQUFLLE9BQUw7QUFBQSxJQUNBLEtBQUEsRUFBTztBQUFBLE1BQUEsV0FBQSxFQUNMO0FBQUEsUUFBQSxVQUFBLEVBQVksVUFBWjtBQUFBLFFBQ0EsV0FBQSxFQUFhLFdBRGI7T0FESztLQURQO0dBeEJGLENBMkI2QixDQUFDLEtBM0I5QixDQTJCb0MsWUEzQnBDLEVBNEJFO0FBQUEsSUFBQSxHQUFBLEVBQUssT0FBTDtBQUFBLElBQ0EsS0FBQSxFQUFPO0FBQUEsTUFBQSxXQUFBLEVBQ0w7QUFBQSxRQUFBLFVBQUEsRUFBWSxVQUFaO0FBQUEsUUFDQSxXQUFBLEVBQWEsV0FEYjtPQURLO0tBRFA7R0E1QkYsQ0ErQjZCLENBQUMsS0EvQjlCLENBK0JvQyxVQS9CcEMsRUFnQ0U7QUFBQSxJQUFBLEdBQUEsRUFBSyxpQkFBTDtBQUFBLElBQ0EsS0FBQSxFQUFPO0FBQUEsTUFBQSxXQUFBLEVBQ0w7QUFBQSxRQUFBLFVBQUEsRUFBWSxvQkFBWjtBQUFBLFFBQ0EsV0FBQSxFQUFhLHFCQURiO09BREs7S0FEUDtHQWhDRixDQW1DdUMsQ0FBQyxLQW5DeEMsQ0FtQzhDLG9CQW5DOUMsRUFvQ0U7QUFBQSxJQUFBLEdBQUEsRUFBSyxPQUFMO0FBQUEsSUFDQSxLQUFBLEVBQU87QUFBQSxNQUFBLFdBQUEsRUFDTDtBQUFBLFFBQUEsVUFBQSxFQUFZLFVBQVo7QUFBQSxRQUNBLFdBQUEsRUFBYSxXQURiO09BREs7S0FEUDtHQXBDRixDQXVDNkIsQ0FBQyxLQXZDOUIsQ0F1Q29DLFVBdkNwQyxFQXdDRTtBQUFBLElBQUEsR0FBQSxFQUFLLFFBQUw7QUFBQSxJQUNBLEtBQUEsRUFBTztBQUFBLE1BQUEsV0FBQSxFQUNMO0FBQUEsUUFBQSxVQUFBLEVBQVksV0FBWjtBQUFBLFFBQ0EsV0FBQSxFQUFhLFlBRGI7T0FESztLQURQO0dBeENGLENBMkM4QixDQUFDLEtBM0MvQixDQTJDcUMsV0EzQ3JDLEVBNENFO0FBQUEsSUFBQSxHQUFBLEVBQUssVUFBTDtBQUFBLElBQ0EsS0FBQSxFQUFPO0FBQUEsTUFBQSxXQUFBLEVBQ0w7QUFBQSxRQUFBLFVBQUEsRUFBWSxhQUFaO0FBQUEsUUFDQSxXQUFBLEVBQWEsY0FEYjtPQURLO0tBRFA7R0E1Q0YsQ0ErQ2dDLENBQUMsS0EvQ2pDLENBK0N1QyxTQS9DdkMsRUFnREU7QUFBQSxJQUFBLEdBQUEsRUFBSyxtQkFBTDtBQUFBLElBQ0EsS0FBQSxFQUFPO0FBQUEsTUFBQSxXQUFBLEVBQ0w7QUFBQSxRQUFBLFVBQUEsRUFBWSxvQkFBWjtBQUFBLFFBQ0EsV0FBQSxFQUFhLHVCQURiO09BREs7S0FEUDtHQWhERixDQUFBLENBQUE7QUFBQSxFQW9EQSxrQkFBa0IsQ0FBQyxTQUFuQixDQUE2QixHQUE3QixDQXBEQSxDQUFBO1NBc0RBLGFBQWEsQ0FBQyxZQUFZLENBQUMsSUFBM0IsQ0FBZ0MsU0FBQSxHQUFBO1dBQzdCO0FBQUEsTUFBQSxPQUFBLEVBQVMsU0FBQyxNQUFELEdBQUE7QUFDUCxZQUFBLElBQUE7QUFBQSxRQUFBLElBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFYLENBQWlCLFNBQWpCLENBQUEsSUFBK0IsQ0FBQSxNQUFPLENBQUMsR0FBRyxDQUFDLEtBQVgsQ0FBaUIsV0FBakIsQ0FBbkM7QUFDRSxVQUFBLElBQUcsTUFBTSxDQUFDLE1BQVAsQ0FBQSxDQUFIO0FBQ0UsWUFBQSxJQUFBLEdBQU8sUUFBUCxDQURGO1dBQUEsTUFFSyxJQUFHLE1BQU0sQ0FBQyxNQUFQLENBQUEsQ0FBSDtBQUNILFlBQUEsSUFBQSxHQUFPLFFBQVAsQ0FERztXQUFBLE1BQUE7QUFHSCxZQUFBLElBQUEsR0FBTyxTQUFQLENBSEc7V0FGTDtBQUFBLFVBT0EsTUFBTSxDQUFDLEdBQVAsR0FBYyxHQUFBLEdBQUcsSUFBSCxHQUFRLEdBQVIsR0FBVyxNQUFNLENBQUMsR0FQaEMsQ0FERjtTQUFBO2VBVUEsT0FYTztNQUFBLENBQVQ7TUFENkI7RUFBQSxDQUFoQyxFQXZEZTtBQUFBLENBQWpCLENBckJBLENBQUE7O0FBQUEsU0EwRlMsQ0FBQyxHQUFWLENBQWMsU0FBQyxNQUFELEdBQUE7U0FDWixNQUFNLENBQUMsRUFBUCxDQUFVLFVBQVYsRUFEWTtBQUFBLENBQWQsQ0ExRkEsQ0FBQTs7QUFBQSxTQThGUyxDQUFDLEdBQVYsQ0FBYyxTQUFDLFVBQUQsRUFBYSxJQUFiLEdBQUE7QUFDWixFQUFBLFVBQVUsQ0FBQyxJQUFYLEdBQWtCLElBQWxCLENBQUE7QUFDQSxFQUFBLElBQUcsTUFBTSxDQUFDLE9BQVAsQ0FBQSxDQUFIO1dBQ0UsVUFBVSxDQUFDLEdBQVgsQ0FBZSx1QkFBZixFQUF3QyxTQUFDLEtBQUQsR0FBQTtBQUV0QyxNQUFBLENBQUEsQ0FBRSxXQUFGLENBQWMsQ0FBQyxRQUFmLENBQ0U7QUFBQSxRQUFBLGdCQUFBLEVBQWtCLElBQWxCO0FBQUEsUUFDQSxhQUFBLEVBQWUsQ0FDYixTQURhLEVBRWIsU0FGYSxFQUdiLFNBSGEsRUFJYixTQUphLEVBS2IsU0FMYSxDQURmO0FBQUEsUUFRQSxPQUFBLEVBQVMsQ0FDUCxXQURPLEVBRVAsWUFGTyxFQUdQLFNBSE8sRUFJUCxTQUpPLEVBS1AsVUFMTyxDQVJUO0FBQUEsUUFlQSxJQUFBLEVBQU0sT0FmTjtBQUFBLFFBZ0JBLGNBQUEsRUFBZ0IsR0FoQmhCO0FBQUEsUUFpQkEsV0FBQSxFQUFhLFNBQUEsR0FBQTtBQUNYLFVBQUEsQ0FBQSxDQUFFLE9BQUYsQ0FBVSxDQUFDLEdBQVgsQ0FBZSxDQUFmLENBQWlCLENBQUMsSUFBbEIsQ0FBQSxDQUFBLENBRFc7UUFBQSxDQWpCYjtPQURGLENBQUEsQ0FGc0M7SUFBQSxDQUF4QyxFQURGO0dBQUEsTUFBQTtBQUFBO0dBRlk7QUFBQSxDQUFkLENBOUZBLENBQUE7O0FBQUEsU0E2SFMsQ0FBQyxPQUFWLENBQWtCLFFBQWxCLEVBQTRCLFNBQUMsYUFBRCxHQUFBO1NBQzFCLGFBQUEsQ0FBQSxFQUQwQjtBQUFBLENBQTVCLENBN0hBLENBQUE7O0FBQUEsU0ErSFMsQ0FBQyxPQUFWLENBQWtCLE1BQWxCLEVBQTBCLFNBQUMsTUFBRCxHQUFBO0FBQ3hCLE1BQUEsT0FBQTtBQUFBLEVBQUEsT0FBQSxHQUFVLE1BQVYsQ0FBQTtBQUFBLEVBQ0EsT0FBQSxHQUNFO0FBQUEsSUFBQSxJQUFBLEVBQU0sRUFBTjtBQUFBLElBQ0EsSUFBQSxFQUFNLFNBQUMsU0FBRCxHQUFBO2FBQ0osQ0FBQyxDQUFDLElBQUYsQ0FBTyxPQUFPLENBQUMsSUFBZixFQUFxQixTQUFDLEdBQUQsR0FBQTtlQUNuQixHQUFHLENBQUMsU0FBSixLQUFpQixVQURFO01BQUEsQ0FBckIsRUFESTtJQUFBLENBRE47R0FGRixDQUFBO0FBQUEsRUFNQSxNQUFNLENBQUMsRUFBUCxDQUFVLE1BQVYsRUFBa0IsU0FBQyxJQUFELEdBQUE7V0FDaEIsT0FBTyxDQUFDLElBQVIsR0FBZSxLQURDO0VBQUEsQ0FBbEIsQ0FOQSxDQUFBO1NBUUEsUUFUd0I7QUFBQSxDQUExQixDQS9IQSxDQUFBOztBQUFBLFNBOElTLENBQUMsVUFBVixDQUFxQixVQUFyQixFQUFpQztFQUMvQixRQUQrQixFQUUvQixTQUFDLE1BQUQsR0FBQTtXQUVLLENBQUEsU0FBQSxHQUFBO0FBQ0QsVUFBQSx3RUFBQTtBQUFBLE1BQUEsTUFBQSxHQUFTLE1BQVQsQ0FBQTtBQUFBLE1BQ0EsUUFBQSxHQUFXLE1BRFgsQ0FBQTtBQUFBLE1BRUEsT0FBQSxHQUFVLE1BRlYsQ0FBQTtBQUFBLE1BR0EsSUFBQSxHQUFPLE1BSFAsQ0FBQTtBQUFBLE1BSUEsVUFBQSxHQUFhLE1BSmIsQ0FBQTtBQUFBLE1BS0EsTUFBQSxHQUFTLE1BTFQsQ0FBQTtBQUFBLE1BTUEsT0FBQSxHQUFVLE1BTlYsQ0FBQTtBQUFBLE1BT0EsVUFBQSxHQUFhLE1BUGIsQ0FBQTtBQUFBLE1BUUEsTUFBQSxHQUFTLFFBQVEsQ0FBQyxJQVJsQixDQUFBO0FBQUEsTUFTQSxPQUFBLEdBQVUsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsZUFBdkIsQ0FUVixDQUFBO0FBQUEsTUFVQSxPQUFBLEdBQVUsUUFBUSxDQUFDLGNBQVQsQ0FBd0IsYUFBeEIsQ0FWVixDQUFBO0FBQUEsTUFXQSxRQUFBLEdBQVcsUUFBUSxDQUFDLGNBQVQsQ0FBd0IsY0FBeEIsQ0FYWCxDQUFBO0FBQUEsTUFZQSxNQUFBLEdBQVMsS0FaVCxDQUFBO0FBQUEsTUFjQSxJQUFBLEdBQU8sU0FBQSxHQUFBO0FBQ0wsUUFBQSxVQUFBLENBQUEsQ0FBQSxDQURLO01BQUEsQ0FkUCxDQUFBO0FBQUEsTUFrQkEsVUFBQSxHQUFhLFNBQUEsR0FBQTtBQUNYLFlBQUEsb0JBQUE7QUFBQSxRQUFBLENBQUEsR0FBSSxNQUFKLENBQUE7QUFBQSxRQUNBLEtBQUEsR0FBUSxNQURSLENBQUE7QUFBQSxRQUVBLElBQUEsR0FBTyxNQUZQLENBQUE7QUFBQSxRQUdBLElBQUEsR0FBTyxNQUhQLENBQUE7QUFJQSxRQUFBLElBQUcsTUFBTSxDQUFDLE9BQVAsQ0FBQSxDQUFIO0FBQUE7U0FBQSxNQUVLLElBQUcsTUFBTSxDQUFDLE1BQVAsQ0FBQSxDQUFIO0FBQ0gsVUFBQSxDQUFBLEdBQUksUUFBSixDQUFBO0FBQUEsVUFDQSxLQUFBLEdBQVEsT0FEUixDQUFBO0FBRUEsVUFBQSxJQUFHLENBQUEsQ0FBRSxDQUFDLGNBQUYsQ0FBaUIsS0FBakIsQ0FBSjtBQUNFLFlBQUEsSUFBQSxHQUFPLENBQUMsQ0FBQyxvQkFBRixDQUF1QixNQUF2QixDQUErQixDQUFBLENBQUEsQ0FBdEMsQ0FBQTtBQUFBLFlBQ0EsSUFBQSxHQUFPLENBQUMsQ0FBQyxhQUFGLENBQWdCLE1BQWhCLENBRFAsQ0FBQTtBQUFBLFlBRUEsSUFBSSxDQUFDLEVBQUwsR0FBVSxLQUZWLENBQUE7QUFBQSxZQUdBLElBQUksQ0FBQyxHQUFMLEdBQVcsWUFIWCxDQUFBO0FBQUEsWUFJQSxJQUFJLENBQUMsSUFBTCxHQUFZLFVBSlosQ0FBQTtBQUFBLFlBS0EsSUFBSSxDQUFDLElBQUwsR0FBWSxpRUFMWixDQUFBO0FBQUEsWUFNQSxJQUFJLENBQUMsS0FBTCxHQUFhLEtBTmIsQ0FBQTtBQUFBLFlBT0EsSUFBSSxDQUFDLFdBQUwsQ0FBaUIsSUFBakIsQ0FQQSxDQURGO1dBSEc7U0FOTDtBQWtCQSxRQUFBLElBQUcsTUFBTSxDQUFDLE9BQVAsQ0FBQSxDQUFIO0FBQ0UsVUFBQSxPQUFPLENBQUMsZ0JBQVIsQ0FBeUIsT0FBekIsRUFBa0MsVUFBbEMsQ0FBQSxDQUFBO0FBQ0EsVUFBQSxJQUFHLFFBQUg7QUFDRSxZQUFBLFFBQVEsQ0FBQyxnQkFBVCxDQUEwQixPQUExQixFQUFtQyxVQUFuQyxDQUFBLENBREY7V0FEQTtBQUFBLFVBR0EsT0FBTyxDQUFDLGdCQUFSLENBQXlCLE9BQXpCLEVBQWtDLFNBQUMsRUFBRCxHQUFBO0FBQ2hDLGdCQUFBLE1BQUE7QUFBQSxZQUFBLE1BQUEsR0FBUyxNQUFULENBQUE7QUFBQSxZQUNBLE1BQUEsR0FBUyxFQUFFLENBQUMsTUFEWixDQUFBO0FBRUEsWUFBQSxJQUFHLE1BQUEsSUFBVyxNQUFBLEtBQVUsT0FBeEI7QUFDRSxjQUFBLFVBQUEsQ0FBQSxDQUFBLENBREY7YUFIZ0M7VUFBQSxDQUFsQyxDQUhBLENBREY7U0FBQSxNQUFBO0FBQUE7U0FuQlc7TUFBQSxDQWxCYixDQUFBO0FBQUEsTUFvREEsVUFBQSxHQUFhLFNBQUEsR0FBQTtBQUNYLFFBQUEsSUFBRyxNQUFIO0FBQ0UsVUFBQSxPQUFPLENBQUMsTUFBUixDQUFlLE1BQWYsRUFBdUIsV0FBdkIsQ0FBQSxDQURGO1NBQUEsTUFBQTtBQUdFLFVBQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxNQUFaLEVBQW9CLFdBQXBCLENBQUEsQ0FIRjtTQUFBO0FBQUEsUUFJQSxNQUFBLEdBQVMsQ0FBQSxNQUpULENBRFc7TUFBQSxDQXBEYixDQUFBO0FBQUEsTUE0REEsSUFBQSxDQUFBLENBNURBLENBREM7SUFBQSxDQUFBLENBQUgsQ0FBQSxFQUZGO0VBQUEsQ0FGK0I7Q0FBakMsQ0E5SUEsQ0FBQTs7QUFBQSxTQW1OUyxDQUFDLFVBQVYsQ0FBcUIsa0JBQXJCLEVBQXlDLFNBQUMsTUFBRCxFQUFTLGlCQUFULEdBQUE7QUFFdkMsRUFBQSxNQUFNLENBQUMsZUFBUCxHQUF5QixTQUFBLEdBQUE7V0FDdkIsaUJBQWlCLENBQUMsSUFBbEIsQ0FDRTtBQUFBLE1BQUEsU0FBQSxFQUFXLG1CQUFYO0FBQUEsTUFDQSxPQUFBLEVBQVM7UUFDUDtBQUFBLFVBQUUsSUFBQSxFQUFNLHVDQUFSO1NBRE8sRUFFUDtBQUFBLFVBQUUsSUFBQSxFQUFNLHlDQUFSO1NBRk8sRUFHUDtBQUFBLFVBQUUsSUFBQSxFQUFNLGlEQUFSO1NBSE8sRUFJUDtBQUFBLFVBQUUsSUFBQSxFQUFNLHFEQUFSO1NBSk87T0FEVDtBQUFBLE1BT0EsVUFBQSxFQUFZLFFBUFo7QUFBQSxNQVFBLE1BQUEsRUFBUSxTQUFBLEdBQUE7QUFDTixRQUFBLE9BQU8sQ0FBQyxHQUFSLENBQVksV0FBWixDQUFBLENBRE07TUFBQSxDQVJSO0FBQUEsTUFXQSxhQUFBLEVBQWUsU0FBQyxLQUFELEdBQUE7QUFDYixRQUFBLElBQUcsS0FBQSxLQUFTLENBQVo7QUFDRSxVQUFBLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBaEIsR0FBdUIsY0FBdkIsQ0FERjtTQUFBO0FBRUEsUUFBQSxJQUFHLEtBQUEsS0FBUyxDQUFaO0FBQ0UsVUFBQSxNQUFNLENBQUMsUUFBUSxDQUFDLElBQWhCLEdBQXVCLGtDQUF2QixDQURGO1NBRkE7QUFJQSxRQUFBLElBQUcsS0FBQSxLQUFTLENBQVo7QUFDRSxVQUFBLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBaEIsR0FBdUIsa0NBQXZCLENBREY7U0FKQTtBQU1BLFFBQUEsSUFBRyxLQUFBLEtBQVMsQ0FBWjtBQUNFLFVBQUEsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFoQixHQUF1Qiw0QkFBdkIsQ0FERjtTQU5BO2VBUUEsS0FUYTtNQUFBLENBWGY7S0FERixFQUR1QjtFQUFBLENBQXpCLENBRnVDO0FBQUEsQ0FBekMsQ0FuTkEsQ0FBQTs7QUFBQSxTQThPUyxDQUFDLFVBQVYsQ0FBcUIsa0JBQXJCLEVBQXlDLFNBQUMsTUFBRCxHQUFBO0FBQ3ZDLEVBQUEsTUFBTSxDQUFDLElBQVAsR0FBYyxlQUFkLENBQUE7QUFBQSxFQUNBLE1BQU0sQ0FBQyxLQUFQLEdBQWUsOENBRGYsQ0FBQTtTQUVBLE1BQU0sQ0FBQyxNQUFQLEdBQWdCO0lBQUU7QUFBQSxNQUNoQixLQUFBLEVBQU8sOENBRFM7QUFBQSxNQUVoQixLQUFBLEVBQU8scUJBRlM7QUFBQSxNQUdoQixNQUFBLEVBQVEsbUxBSFE7S0FBRjtJQUh1QjtBQUFBLENBQXpDLENBOU9BLENBQUE7O0FBQUEsU0FzUFMsQ0FBQyxVQUFWLENBQXFCLGtCQUFyQixFQUF5QyxTQUFDLE1BQUQsR0FBQTtBQUN2QyxFQUFBLE1BQU0sQ0FBQyxJQUFQLEdBQWMsY0FBZCxDQUFBO0FBQUEsRUFDQSxNQUFNLENBQUMsS0FBUCxHQUFlLG1EQURmLENBQUE7U0FFQSxNQUFNLENBQUMsTUFBUCxHQUFnQjtJQUFFO0FBQUEsTUFDaEIsS0FBQSxFQUFPLGVBRFM7QUFBQSxNQUVoQixLQUFBLEVBQU8sc0NBRlM7QUFBQSxNQUdoQixNQUFBLEVBQVEsd01BSFE7S0FBRjtJQUh1QjtBQUFBLENBQXpDLENBdFBBLENBQUE7O0FBQUEsU0E4UFMsQ0FBQyxVQUFWLENBQXFCLGVBQXJCLEVBQXNDLFNBQUMsTUFBRCxHQUFBO0FBQ3BDLEVBQUEsTUFBTSxDQUFDLElBQVAsR0FBYyxXQUFkLENBQUE7QUFBQSxFQUNBLE1BQU0sQ0FBQyxLQUFQLEdBQWUscUZBRGYsQ0FBQTtTQUVBLE1BQU0sQ0FBQyxNQUFQLEdBQWdCO0lBQUU7QUFBQSxNQUNoQixLQUFBLEVBQU8sZUFEUztBQUFBLE1BRWhCLEtBQUEsRUFBTyx5QkFGUztBQUFBLE1BR2hCLE1BQUEsRUFBUSxzU0FIUTtLQUFGO0lBSG9CO0FBQUEsQ0FBdEMsQ0E5UEEsQ0FBQTs7QUFBQSxTQXNRUyxDQUFDLFVBQVYsQ0FBcUIsc0JBQXJCLEVBQTZDLFNBQUMsTUFBRCxHQUFBO0FBQzNDLEVBQUEsTUFBTSxDQUFDLElBQVAsR0FBYyxZQUFkLENBQUE7QUFBQSxFQUNBLE1BQU0sQ0FBQyxLQUFQLEdBQWUsd0dBRGYsQ0FBQTtTQUVBLE1BQU0sQ0FBQyxNQUFQLEdBQWdCO0lBQ2Q7QUFBQSxNQUNFLEtBQUEsRUFBTyxlQURUO0FBQUEsTUFFRSxLQUFBLEVBQU8sK0JBRlQ7QUFBQSxNQUdFLE1BQUEsRUFBUSxpUEFIVjtLQURjLEVBTWQ7QUFBQSxNQUNFLEtBQUEsRUFBTyxlQURUO0FBQUEsTUFFRSxLQUFBLEVBQU8sZ0NBRlQ7QUFBQSxNQUdFLE1BQUEsRUFBUSxFQUhWO0tBTmMsRUFXZDtBQUFBLE1BQ0UsS0FBQSxFQUFPLGVBRFQ7QUFBQSxNQUVFLEtBQUEsRUFBTyxnQ0FGVDtLQVhjLEVBZWQ7QUFBQSxNQUNFLEtBQUEsRUFBTyxlQURUO0FBQUEsTUFFRSxLQUFBLEVBQU8sZ0NBRlQ7S0FmYztJQUgyQjtBQUFBLENBQTdDLENBdFFBLENBQUE7O0FBQUEsU0E2UlMsQ0FBQyxVQUFWLENBQXFCLGVBQXJCLEVBQXNDLFNBQUMsTUFBRCxHQUFBO0FBQ3BDLEVBQUEsTUFBTSxDQUFDLElBQVAsR0FBYyxZQUFkLENBQUE7QUFBQSxFQUNBLE1BQU0sQ0FBQyxLQUFQLEdBQWUsa0dBRGYsQ0FBQTtTQUVBLE1BQU0sQ0FBQyxNQUFQLEdBQWdCO0lBQ2Q7QUFBQSxNQUNFLEtBQUEsRUFBTyxlQURUO0FBQUEsTUFFRSxLQUFBLEVBQU8sd0JBRlQ7QUFBQSxNQUdFLE1BQUEsRUFBUSx5TEFIVjtLQURjLEVBTWQ7QUFBQSxNQUNFLEtBQUEsRUFBTyxlQURUO0FBQUEsTUFFRSxLQUFBLEVBQU8seUJBRlQ7S0FOYyxFQVVkO0FBQUEsTUFDRSxLQUFBLEVBQU8sZUFEVDtBQUFBLE1BRUUsS0FBQSxFQUFPLHlCQUZUO0tBVmM7SUFIb0I7QUFBQSxDQUF0QyxDQTdSQSxDQUFBOztBQUFBLFNBK1NTLENBQUMsVUFBVixDQUFxQixpQkFBckIsRUFBd0MsU0FBQyxNQUFELEdBQUE7QUFDdEMsRUFBQSxNQUFNLENBQUMsSUFBUCxHQUFjLFlBQWQsQ0FBQTtBQUFBLEVBQ0EsTUFBTSxDQUFDLEtBQVAsR0FBZSxnRUFEZixDQUFBO1NBRUEsTUFBTSxDQUFDLE1BQVAsR0FBZ0I7SUFDZDtBQUFBLE1BQ0UsS0FBQSxFQUFPLGVBRFQ7QUFBQSxNQUVFLEtBQUEsRUFBTywyQkFGVDtLQURjLEVBS2Q7QUFBQSxNQUNFLEtBQUEsRUFBTyxlQURUO0FBQUEsTUFFRSxLQUFBLEVBQU8sMkJBRlQ7S0FMYyxFQVNkO0FBQUEsTUFDRSxLQUFBLEVBQU8sZUFEVDtBQUFBLE1BRUUsS0FBQSxFQUFPLDBCQUZUO0tBVGM7SUFIc0I7QUFBQSxDQUF4QyxDQS9TQSxDQUFBOztBQUFBLFNBZ1VTLENBQUMsVUFBVixDQUFxQixrQkFBckIsRUFBeUMsU0FBQyxNQUFELEdBQUE7QUFDdkMsRUFBQSxNQUFNLENBQUMsSUFBUCxHQUFjLGFBQWQsQ0FBQTtBQUFBLEVBQ0EsTUFBTSxDQUFDLEtBQVAsR0FBZSwyREFEZixDQUFBO1NBRUEsTUFBTSxDQUFDLE1BQVAsR0FBZ0I7SUFBRTtBQUFBLE1BQ2hCLEtBQUEsRUFBTyxlQURTO0FBQUEsTUFFaEIsS0FBQSxFQUFPLDBCQUZTO0FBQUEsTUFHaEIsTUFBQSxFQUFRLGtFQUhRO0tBQUY7SUFIdUI7QUFBQSxDQUF6QyxDQWhVQSxDQUFBOztBQUFBLFNBd1VTLENBQUMsVUFBVixDQUFxQixvQkFBckIsRUFBMkMsU0FBQyxNQUFELEdBQUE7QUFDekMsRUFBQSxNQUFNLENBQUMsSUFBUCxHQUFjLGVBQWQsQ0FBQTtBQUFBLEVBQ0EsTUFBTSxDQUFDLEtBQVAsR0FBZSxrREFEZixDQUFBO1NBRUEsTUFBTSxDQUFDLE1BQVAsR0FBZ0I7SUFDZDtBQUFBLE1BQ0UsS0FBQSxFQUFPLGVBRFQ7QUFBQSxNQUVFLEtBQUEsRUFBTyxrQ0FGVDtLQURjLEVBS2Q7QUFBQSxNQUNFLEtBQUEsRUFBTyxlQURUO0FBQUEsTUFFRSxLQUFBLEVBQU8sNkJBRlQ7S0FMYztJQUh5QjtBQUFBLENBQTNDLENBeFVBLENBQUE7O0FBQUEsU0FxVlMsQ0FBQyxVQUFWLENBQXFCLHVCQUFyQixFQUE4QyxTQUFDLE1BQUQsR0FBQTtBQUM1QyxFQUFBLE1BQU0sQ0FBQyxJQUFQLEdBQWMsWUFBZCxDQUFBO0FBQUEsRUFDQSxNQUFNLENBQUMsS0FBUCxHQUFlLHdDQURmLENBQUE7U0FFQSxNQUFNLENBQUMsTUFBUCxHQUFnQjtJQUNkO0FBQUEsTUFDRSxLQUFBLEVBQU8sZUFEVDtBQUFBLE1BRUUsS0FBQSxFQUFPLDhCQUZUO0tBRGMsRUFLZDtBQUFBLE1BQ0UsS0FBQSxFQUFPLGVBRFQ7QUFBQSxNQUVFLEtBQUEsRUFBTyw4QkFGVDtLQUxjLEVBU2Q7QUFBQSxNQUNFLEtBQUEsRUFBTyxlQURUO0FBQUEsTUFFRSxLQUFBLEVBQU8sOEJBRlQ7S0FUYztJQUg0QjtBQUFBLENBQTlDLENBclZBLENBQUE7O0FBQUEsU0FzV1MsQ0FBQyxVQUFWLENBQXFCLFVBQXJCLEVBQWlDLFNBQUMsTUFBRCxHQUFBO1NBQy9CLE1BQU0sQ0FBQyxRQUFQLEdBQWtCO0lBQ2hCO0FBQUEsTUFDRSxNQUFBLEVBQVEsMENBRFY7QUFBQSxNQUVFLFNBQUEsRUFBVyxVQUZiO0FBQUEsTUFHRSxXQUFBLEVBQWEsZ0JBSGY7QUFBQSxNQUlFLEtBQUEsRUFBTyx1QkFKVDtBQUFBLE1BS0UsTUFBQSxFQUFRLDhNQUxWO0tBRGdCLEVBUWhCO0FBQUEsTUFDRSxNQUFBLEVBQVEsMENBRFY7QUFBQSxNQUVFLFNBQUEsRUFBVyxzQkFGYjtBQUFBLE1BR0UsV0FBQSxFQUFhLGdCQUhmO0FBQUEsTUFJRSxLQUFBLEVBQU8sb0JBSlQ7QUFBQSxNQUtFLE1BQUEsRUFBUSx3K0VBTFY7S0FSZ0IsRUFlaEI7QUFBQSxNQUNFLE1BQUEsRUFBUSwwQ0FEVjtBQUFBLE1BRUUsU0FBQSxFQUFXLDJCQUZiO0FBQUEsTUFHRSxXQUFBLEVBQWEsZ0JBSGY7QUFBQSxNQUlFLEtBQUEsRUFBTyx5Q0FKVDtBQUFBLE1BS0UsTUFBQSxFQUFRLGlpQkFMVjtBQUFBLE1BTUUsV0FBQSxFQUFhLG1FQU5mO0FBQUEsTUFPRSxXQUFBLEVBQWEsK0JBUGY7S0FmZ0IsRUF3QmhCO0FBQUEsTUFDRSxNQUFBLEVBQVEsMENBRFY7QUFBQSxNQUVFLFNBQUEsRUFBVyw0SEFGYjtBQUFBLE1BR0UsV0FBQSxFQUFhLGdCQUhmO0FBQUEsTUFJRSxLQUFBLEVBQU8seUJBSlQ7QUFBQSxNQUtFLE1BQUEsRUFBUSxncENBTFY7S0F4QmdCLEVBK0JoQjtBQUFBLE1BQ0UsTUFBQSxFQUFRLDBDQURWO0FBQUEsTUFFRSxTQUFBLEVBQVcsaUdBRmI7QUFBQSxNQUdFLFdBQUEsRUFBYSxnQkFIZjtBQUFBLE1BSUUsS0FBQSxFQUFPLHVCQUpUO0FBQUEsTUFLRSxNQUFBLEVBQVEsMDFCQUxWO0tBL0JnQixFQXNDaEI7QUFBQSxNQUNFLE1BQUEsRUFBUSx5Q0FEVjtBQUFBLE1BRUUsU0FBQSxFQUFXLGdDQUZiO0FBQUEsTUFHRSxXQUFBLEVBQWEsZ0JBSGY7QUFBQSxNQUlFLEtBQUEsRUFBTyxtQkFKVDtBQUFBLE1BS0UsTUFBQSxFQUFRLDQvQkFMVjtLQXRDZ0IsRUE2Q2hCO0FBQUEsTUFDRSxNQUFBLEVBQVEseUNBRFY7QUFBQSxNQUVFLFNBQUEsRUFBVywyRUFGYjtBQUFBLE1BR0UsV0FBQSxFQUFhLGdCQUhmO0FBQUEsTUFJRSxLQUFBLEVBQU8sa0JBSlQ7QUFBQSxNQUtFLE1BQUEsRUFBUSxvbERBTFY7S0E3Q2dCLEVBb0RoQjtBQUFBLE1BQ0UsTUFBQSxFQUFRLHlDQURWO0FBQUEsTUFFRSxTQUFBLEVBQVcsbUdBRmI7QUFBQSxNQUdFLFdBQUEsRUFBYSxnQkFIZjtBQUFBLE1BSUUsS0FBQSxFQUFPLG9CQUpUO0FBQUEsTUFLRSxNQUFBLEVBQVEsbzRFQUxWO0tBcERnQjtJQURhO0FBQUEsQ0FBakMsQ0F0V0EsQ0FBQTs7QUFBQSxTQW1hUyxDQUFDLFVBQVYsQ0FBcUIsY0FBckIsRUFBcUMsU0FBQyxNQUFELEdBQUEsQ0FBckMsQ0FuYUEsQ0FBQTs7QUFBQSxTQW9hUyxDQUFDLFVBQVYsQ0FBcUIsV0FBckIsRUFBa0MsU0FBQyxNQUFELEdBQUEsQ0FBbEMsQ0FwYUEsQ0FBQTs7QUFBQSxTQXFhUyxDQUFDLFVBQVYsQ0FBcUIsU0FBckIsRUFBZ0MsU0FBQyxNQUFELEdBQUEsQ0FBaEMsQ0FyYUEsQ0FBQTs7QUFBQSxTQXNhUyxDQUFDLFVBQVYsQ0FBcUIsWUFBckIsRUFBbUMsU0FBQyxNQUFELEdBQUE7U0FDakMsTUFBTSxDQUFDLElBQVAsR0FBYywrclFBRG1CO0FBQUEsQ0FBbkMsQ0F0YUEsQ0FBQTs7QUFBQSxTQXdhUyxDQUFDLFVBQVYsQ0FBcUIsbUJBQXJCLEVBQTBDLFNBQUMsTUFBRCxHQUFBLENBQTFDLENBeGFBLENBQUE7O0FBQUEsU0F5YVMsQ0FBQyxVQUFWLENBQXFCLHNCQUFyQixFQUE2QyxTQUFDLE1BQUQsR0FBQSxDQUE3QyxDQXphQSxDQUFBOztBQUFBLFNBMGFTLENBQUMsVUFBVixDQUFxQixjQUFyQixFQUFxQyxTQUFDLE1BQUQsR0FBQSxDQUFyQyxDQTFhQSxDQUFBOztBQUFBLFNBMmFTLENBQUMsVUFBVixDQUFxQixtQkFBckIsRUFBMEMsU0FBQyxNQUFELEdBQUEsQ0FBMUMsQ0EzYUEsQ0FBQTs7QUFBQSxTQTRhUyxDQUFDLFVBQVYsQ0FBcUIsWUFBckIsRUFBbUMsU0FBQyxNQUFELEdBQUEsQ0FBbkMsQ0E1YUEsQ0FBQTs7QUFBQSxTQTZhUyxDQUFDLFVBQVYsQ0FBcUIsYUFBckIsRUFBb0MsU0FBQyxNQUFELEdBQUE7QUFFbEMsTUFBQSx5RUFBQTtBQUFBLEVBQUEsR0FBQSxHQUFNLFFBQVEsQ0FBQyxhQUFULENBQXVCLFFBQXZCLENBQU4sQ0FBQTtBQUFBLEVBQ0EsR0FBRyxDQUFDLEdBQUosR0FBVSw4QkFEVixDQUFBO0FBQUEsRUFFQSxjQUFBLEdBQWlCLFFBQVEsQ0FBQyxvQkFBVCxDQUE4QixRQUE5QixDQUF3QyxDQUFBLENBQUEsQ0FGekQsQ0FBQTtBQUFBLEVBR0EsY0FBYyxDQUFDLFVBQVUsQ0FBQyxZQUExQixDQUF1QyxHQUF2QyxFQUE0QyxjQUE1QyxDQUhBLENBQUE7QUFBQSxFQUlBLE1BQUEsR0FBUyxNQUpULENBQUE7QUFBQSxFQUtBLHVCQUFBLEdBQTBCLFNBQUEsR0FBQTtXQUN4QixNQUFBLEdBQWEsSUFBQSxFQUFFLENBQUMsTUFBSCxDQUFVLFFBQVYsRUFDWDtBQUFBLE1BQUEsTUFBQSxFQUFRLEtBQVI7QUFBQSxNQUNBLEtBQUEsRUFBTyxLQURQO0FBQUEsTUFFQSxPQUFBLEVBQVMsYUFGVDtBQUFBLE1BR0EsVUFBQSxFQUNFO0FBQUEsUUFBQSxRQUFBLEVBQVUsQ0FBVjtBQUFBLFFBQ0EsR0FBQSxFQUFLLENBREw7QUFBQSxRQUVBLFFBQUEsRUFBVSxDQUZWO09BSkY7QUFBQSxNQVFBLE1BQUEsRUFDRTtBQUFBLFFBQUEsYUFBQSxFQUFlLG1CQUFmO09BVEY7S0FEVyxFQURXO0VBQUEsQ0FMMUIsQ0FBQTtTQW1CQSxtQkFBQSxHQUFzQixTQUFDLEtBQUQsR0FBQTtBQUNwQixJQUFBLElBQXNDLEtBQUssQ0FBQyxJQUFOLEtBQWMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxLQUFuRTthQUFBLENBQUEsQ0FBRSxjQUFGLENBQWlCLENBQUMsTUFBbEIsQ0FBeUIsUUFBekIsRUFBQTtLQURvQjtFQUFBLEVBckJZO0FBQUEsQ0FBcEMsQ0E3YUEsQ0FBQTs7QUFBQSxTQXNjUyxDQUFDLFVBQVYsQ0FBcUIsY0FBckIsRUFBcUMsU0FBQyxNQUFELEdBQUEsQ0FBckMsQ0F0Y0EsQ0FBQTs7QUFBQSxTQXVjUyxDQUFDLFVBQVYsQ0FBcUIsVUFBckIsRUFBaUMsU0FBQyxNQUFELEdBQUEsQ0FBakMsQ0F2Y0EsQ0FBQTs7QUFBQSxTQXdjUyxDQUFDLFVBQVYsQ0FBcUIsb0JBQXJCLEVBQTJDLFNBQUMsTUFBRCxHQUFBLENBQTNDLENBeGNBLENBQUE7O0FBQUEsU0F5Y1MsQ0FBQyxVQUFWLENBQXFCLFVBQXJCLEVBQWlDLFNBQUMsTUFBRCxHQUFBLENBQWpDLENBemNBLENBQUE7O0FBQUEsU0EwY1MsQ0FBQyxVQUFWLENBQXFCLG1CQUFyQixFQUEwQyxTQUFDLE1BQUQsR0FBQSxDQUExQyxDQTFjQSxDQUFBOztBQUFBLFNBMmNTLENBQUMsVUFBVixDQUFxQixtQkFBckIsRUFBMEMsU0FBQyxNQUFELEdBQUEsQ0FBMUMsQ0EzY0EsQ0FBQTs7QUFBQSxTQTRjUyxDQUFDLFVBQVYsQ0FBcUIsZUFBckIsRUFBc0MsU0FBQyxNQUFELEdBQUEsQ0FBdEMsQ0E1Y0EsQ0FBQTs7QUFBQSxTQTZjUyxDQUFDLFVBQVYsQ0FBcUIsb0JBQXJCLEVBQTJDLFNBQUMsTUFBRCxHQUFBLENBQTNDLENBN2NBLENBQUE7O0FBQUEsU0E4Y1MsQ0FBQyxVQUFWLENBQXFCLG9CQUFyQixFQUEyQyxTQUFDLE1BQUQsR0FBQSxDQUEzQyxDQTljQSxDQUFBOztBQUFBLFNBK2NTLENBQUMsVUFBVixDQUFxQixrQkFBckIsRUFBeUMsU0FBQyxNQUFELEdBQUEsQ0FBekMsQ0EvY0EsQ0FBQTs7QUFBQSxTQWdkUyxDQUFDLFVBQVYsQ0FBcUIsYUFBckIsRUFBb0MsU0FBQyxNQUFELEdBQUEsQ0FBcEMsQ0FoZEEsQ0FBQTs7QUFBQSxTQWlkUyxDQUFDLFVBQVYsQ0FBcUIsZ0JBQXJCLEVBQXVDLFNBQUMsTUFBRCxHQUFBLENBQXZDLENBamRBLENBQUE7O0FBQUEsU0FrZFMsQ0FBQyxVQUFWLENBQXFCLHFCQUFyQixFQUE0QyxTQUFDLE1BQUQsR0FBQSxDQUE1QyxDQWxkQSxDQUFBOztBQUFBLFNBbWRTLENBQUMsVUFBVixDQUFxQixVQUFyQixFQUFpQyxTQUFDLE1BQUQsRUFBUyxJQUFULEdBQUE7U0FDL0IsTUFBTSxDQUFDLE1BQVAsQ0FBYyxDQUFDLFNBQUEsR0FBQTtXQUNiLElBQUksQ0FBQyxLQURRO0VBQUEsQ0FBRCxDQUFkLEVBRUcsU0FBQSxHQUFBO1dBQ0QsTUFBTSxDQUFDLElBQVAsR0FBYyxJQUFJLENBQUMsS0FEbEI7RUFBQSxDQUZILEVBRCtCO0FBQUEsQ0FBakMsQ0FuZEEsQ0FBQTs7QUFBQSxTQXdkUyxDQUFDLFVBQVYsQ0FBcUIsU0FBckIsRUFBZ0MsU0FBQyxNQUFELEVBQVMsSUFBVCxFQUFlLFlBQWYsRUFBNkIsUUFBN0IsRUFBdUMsSUFBdkMsR0FBQTtBQUM5QixFQUFBLE1BQU0sQ0FBQyxLQUFQLEdBQWtCLFlBQVksQ0FBQyxJQUFoQixHQUEwQixZQUFZLENBQUMsSUFBYixHQUFvQixDQUE5QyxHQUFxRCxDQUFwRSxDQUFBO0FBQUEsRUFDQSxNQUFNLENBQUMsTUFBUCxDQUFjLENBQUMsU0FBQSxHQUFBO1dBQ2IsSUFBSSxDQUFDLEtBRFE7RUFBQSxDQUFELENBQWQsRUFFRyxTQUFBLEdBQUE7QUFDRCxJQUFBLE1BQU0sQ0FBQyxHQUFQLEdBQWEsSUFBSSxDQUFDLElBQUwsQ0FBVSxZQUFZLENBQUMsU0FBdkIsQ0FBYixDQUFBO0FBQ0EsSUFBQSxJQUFHLE1BQU0sQ0FBQyxHQUFWO0FBQ0UsTUFBQSxNQUFNLENBQUMsSUFBUCxHQUFjLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBTSxDQUFBLE1BQU0sQ0FBQyxLQUFQLENBQS9CLENBQUE7QUFBQSxNQUNBLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBWixHQUFrQixJQUFJLENBQUMsa0JBQUwsQ0FBd0IsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFwQyxDQURsQixDQUFBO0FBRUEsTUFBQSxJQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBWixLQUFvQixRQUF2QjtBQUNFLFFBQUEsTUFBTSxDQUFDLFlBQVAsR0FBc0IsQ0FBdEIsQ0FBQTtBQUFBLFFBQ0EsTUFBTSxDQUFDLFFBQVAsR0FBa0IsRUFEbEIsQ0FBQTtBQUVBLGVBQU8sUUFBQSxDQUFTLE1BQU0sQ0FBQyxXQUFoQixFQUE2QixJQUE3QixDQUFQLENBSEY7T0FIRjtLQUZDO0VBQUEsQ0FGSCxDQURBLENBQUE7U0FjQSxNQUFNLENBQUMsWUFBUCxHQUFzQixTQUFBLEdBQUE7QUFDcEIsSUFBQSxJQUFHLE1BQU0sQ0FBQyxJQUFWO0FBQ0UsYUFBTyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQVosR0FBb0IsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBNUMsQ0FERjtLQURvQjtFQUFBLEVBZlE7QUFBQSxDQUFoQyxDQXhkQSxDQUFBOztBQUFBLFNBNGVTLENBQUMsU0FBVixDQUFvQixhQUFwQixFQUFtQyxTQUFBLEdBQUE7U0FDakM7QUFBQSxJQUNFLFFBQUEsRUFBVSxJQURaO0FBQUEsSUFFRSxJQUFBLEVBQU0sU0FBQyxLQUFELEVBQVEsT0FBUixFQUFpQixLQUFqQixHQUFBO0FBQ0osVUFBQSxNQUFBO0FBQUEsTUFBQSxNQUFBLEdBQVMsTUFBVCxDQUFBO0FBQUEsTUFDQSxNQUFBLEdBQVMsT0FBTyxDQUFDLE1BQVIsQ0FBZTtBQUFBLFFBQUUsTUFBQSxFQUFRLFFBQVY7T0FBZixFQUFxQyxLQUFLLENBQUMsS0FBTixDQUFZLEtBQUssQ0FBQyxXQUFsQixDQUFyQyxDQURULENBQUE7YUFFQSxVQUFBLENBQVcsQ0FBQyxTQUFBLEdBQUE7ZUFDVixDQUFBLENBQUUsT0FBRixDQUFVLENBQUMsS0FBWCxDQUFpQixTQUFBLEdBQUE7aUJBQ2Y7QUFBQSxZQUNFLEVBQUEsRUFBSSxNQUROO0FBQUEsWUFFRSxLQUFBLEVBQU8sTUFGVDtBQUFBLFlBR0UsSUFBQSxFQUFNLFFBSFI7QUFBQSxZQUlFLElBQUEsRUFBTSxRQUpSO0FBQUEsWUFLRSxPQUFBLEVBQVMsY0FMWDtBQUFBLFlBTUUsZ0JBQUEsRUFBa0IsZ0JBTnBCO0FBQUEsWUFPRSxjQUFBLEVBQWdCLE1BUGxCO1lBRGU7UUFBQSxDQUFqQixFQURVO01BQUEsQ0FBRCxDQUFYLEVBV0csQ0FYSCxFQUhJO0lBQUEsQ0FGUjtJQURpQztBQUFBLENBQW5DLENBNWVBLENBQUE7O0FBQUEsT0FnZ0JPLENBQUMsTUFBUixDQUFlLGlCQUFmLEVBQWtDLEVBQWxDLENBaGdCQSxDQUFBOztBQUFBLE9BaWdCTyxDQUFDLE1BQVIsQ0FBZSxnQkFBZixFQUFpQyxFQUFqQyxDQUFvQyxDQUFDLFNBQXJDLENBQStDLFFBQS9DLEVBQXlELFNBQUEsR0FBQTtTQUN2RDtBQUFBLElBQ0UsUUFBQSxFQUFVLEdBRFo7QUFBQSxJQUVFLElBQUEsRUFBTSxTQUFBLEdBQUE7YUFDSixNQUFNLENBQUMsSUFBUCxDQUFBLEVBREk7SUFBQSxDQUZSO0lBRHVEO0FBQUEsQ0FBekQsQ0FPQyxDQUFDLE9BUEYsQ0FPVSxNQVBWLEVBT2tCLFNBQUMsSUFBRCxHQUFBO0FBQ2hCLE1BQUEsaUJBQUE7QUFBQSxFQUFBLElBQUEsR0FBTyxNQUFQLENBQUE7QUFBQSxFQUNBLFdBQUEsR0FBYyxNQURkLENBQUE7QUFBQSxFQUVBLElBQUEsR0FDRTtBQUFBLElBQUEsS0FBQSxFQUNFO0FBQUEsTUFBQSxPQUFBLEVBQVMsaURBQVQ7QUFBQSxNQUNBLFdBQUEsRUFBYSx3TUFEYjtBQUFBLE1BRUEsSUFBQSxFQUFNLGlxQkFGTjtLQURGO0FBQUEsSUFJQSxJQUFBLEVBQ0U7QUFBQSxNQUFBLE9BQUEsRUFBUyxFQUFUO0FBQUEsTUFDQSxJQUFBLEVBQ0U7QUFBQSxRQUFBLFNBQUEsRUFBVyxFQUFYO0FBQUEsUUFDQSxTQUFBLEVBQVcsRUFEWDtPQUZGO0tBTEY7R0FIRixDQUFBO0FBQUEsRUFhQSxXQUFBLEdBQWMsU0FBQyxNQUFELEdBQUE7V0FDWixDQUFDLENBQUMsSUFBRixDQUFPLE1BQVAsRUFBZSxTQUFDLEdBQUQsRUFBTSxHQUFOLEdBQUE7QUFDYixjQUFPLE1BQUEsQ0FBQSxHQUFQO0FBQUEsYUFDTyxRQURQO0FBRUksaUJBQU8sSUFBSSxDQUFDLFdBQUwsQ0FBaUIsR0FBakIsQ0FBUCxDQUZKO0FBQUEsYUFHTyxRQUhQO0FBSUksaUJBQU8sV0FBQSxDQUFZLEdBQVosQ0FBUCxDQUpKO0FBQUEsT0FEYTtJQUFBLENBQWYsRUFEWTtFQUFBLENBYmQsQ0FBQTtBQUFBLEVBc0JBLFdBQUEsQ0FBWSxJQUFaLENBdEJBLENBQUE7U0F1QkEsS0F4QmdCO0FBQUEsQ0FQbEIsQ0FqZ0JBLENBQUE7O0FDRUEsT0FBTyxDQUFDLE1BQVIsQ0FBZSxpQkFBZixFQUFrQyxFQUFsQyxDQUFBLENBQUE7O0FDRkEsT0FBTyxDQUFDLE1BQVIsQ0FBZSxnQkFBZixFQUFpQyxFQUFqQyxDQUNFLENBQUMsU0FESCxDQUNhLFFBRGIsRUFDdUIsU0FBQSxHQUFBO1NBQ25CO0FBQUEsSUFBQSxRQUFBLEVBQVUsR0FBVjtBQUFBLElBQ0EsSUFBQSxFQUFNLFNBQUEsR0FBQTthQUNKLE1BQU0sQ0FBQyxJQUFQLENBQUEsRUFESTtJQUFBLENBRE47SUFEbUI7QUFBQSxDQUR2QixDQU1FLENBQUMsT0FOSCxDQU1XLE1BTlgsRUFNbUIsU0FBQyxJQUFELEdBQUE7QUFDZixNQUFBLGlCQUFBO0FBQUEsRUFBQSxJQUFBLEdBQ0U7QUFBQSxJQUFBLEtBQUEsRUFDRTtBQUFBLE1BQUEsT0FBQSxFQUFTLGdEQUFUO0FBQUEsTUFDQSxXQUFBLEVBQWEsd01BRGI7QUFBQSxNQUVBLElBQUEsRUFBTSxpcUJBRk47S0FERjtBQUFBLElBSUEsSUFBQSxFQUNFO0FBQUEsTUFBQSxPQUFBLEVBQVMsRUFBVDtBQUFBLE1BQ0EsSUFBQSxFQUNFO0FBQUEsUUFBQSxTQUFBLEVBQVcsRUFBWDtBQUFBLFFBQ0EsU0FBQSxFQUFXLEVBRFg7T0FGRjtLQUxGO0dBREYsQ0FBQTtBQUFBLEVBYUEsV0FBQSxHQUFjLFNBQUMsTUFBRCxHQUFBO1dBQ1osQ0FBQyxDQUFDLElBQUYsQ0FBTyxNQUFQLEVBQWUsU0FBQyxHQUFELEVBQU0sR0FBTixHQUFBO0FBQ2IsY0FBTyxNQUFBLENBQUEsR0FBUDtBQUFBLGFBQ08sUUFEUDtpQkFFSSxJQUFJLENBQUMsV0FBTCxDQUFpQixHQUFqQixFQUZKO0FBQUEsYUFHTyxRQUhQO2lCQUlJLFdBQUEsQ0FBWSxHQUFaLEVBSko7QUFBQSxPQURhO0lBQUEsQ0FBZixFQURZO0VBQUEsQ0FiZCxDQUFBO0FBQUEsRUFxQkEsV0FBQSxDQUFZLElBQVosQ0FyQkEsQ0FBQTtTQXVCQSxLQXhCZTtBQUFBLENBTm5CLENBQUEsQ0FBQTs7QUNBQSxJQUFBLG9CQUFBOztBQUFBLElBQUcsTUFBTSxDQUFDLE9BQVAsQ0FBQSxDQUFIO0FBQUE7Q0FBQSxNQUVLLElBQUcsTUFBTSxDQUFDLE1BQVAsQ0FBQSxDQUFIO0FBRUosRUFBQSxDQUFBLEdBQUksUUFBSixDQUFBO0FBQUEsRUFDQSxLQUFBLEdBQVEsT0FEUixDQUFBO0FBRUEsRUFBQSxJQUFHLENBQUEsQ0FBRSxDQUFDLGNBQUYsQ0FBaUIsS0FBakIsQ0FBSjtBQUNJLElBQUEsSUFBQSxHQUFRLENBQUMsQ0FBQyxvQkFBRixDQUF1QixNQUF2QixDQUErQixDQUFBLENBQUEsQ0FBdkMsQ0FBQTtBQUFBLElBQ0EsSUFBQSxHQUFRLENBQUMsQ0FBQyxhQUFGLENBQWdCLE1BQWhCLENBRFIsQ0FBQTtBQUFBLElBRUEsSUFBSSxDQUFDLEVBQUwsR0FBWSxLQUZaLENBQUE7QUFBQSxJQUdBLElBQUksQ0FBQyxHQUFMLEdBQVksWUFIWixDQUFBO0FBQUEsSUFJQSxJQUFJLENBQUMsSUFBTCxHQUFZLFVBSlosQ0FBQTtBQUFBLElBS0EsSUFBSSxDQUFDLElBQUwsR0FBWSxpRUFMWixDQUFBO0FBQUEsSUFNQSxJQUFJLENBQUMsS0FBTCxHQUFhLEtBTmIsQ0FBQTtBQUFBLElBT0EsSUFBSSxDQUFDLFdBQUwsQ0FBaUIsSUFBakIsQ0FQQSxDQURKO0dBSkk7Q0FGTDs7QUNjMkIiLCJmaWxlIjoiYXBwbGljYXRpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpZiBkZXZpY2UuZGVza3RvcCgpXG4gIHdpbmRvdy5GcmFuY2hpbm8gPSBhbmd1bGFyLm1vZHVsZSgnRnJhbmNoaW5vJywgW1xuICAgICduZ1Nhbml0aXplJ1xuICAgICd1aS5yb3V0ZXInXG4gICAgJ2J0Zm9yZC5zb2NrZXQtaW8nXG4gICAgJ3RhcC5jb250cm9sbGVycydcbiAgICAndGFwLmRpcmVjdGl2ZXMnXG4gIF0pXG5lbHNlXG4gIHdpbmRvdy5GcmFuY2hpbm8gPSBhbmd1bGFyLm1vZHVsZSgnRnJhbmNoaW5vJywgW1xuICAgICdpb25pYydcbiAgICAnYnRmb3JkLnNvY2tldC1pbydcbiAgICAndGFwLmNvbnRyb2xsZXJzJ1xuICAgICd0YXAuZGlyZWN0aXZlcydcbiAgXSkucnVuKCgkaW9uaWNQbGF0Zm9ybSkgLT5cbiAgICAkaW9uaWNQbGF0Zm9ybS5yZWFkeSAtPlxuICAgICAgaWYgd2luZG93LlN0YXR1c0JhclxuICAgICAgICByZXR1cm4gU3RhdHVzQmFyLnN0eWxlRGVmYXVsdCgpXG4gICAgICByZXR1cm5cbiAgKVxuXG5GcmFuY2hpbm8uY29uZmlnICgkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyLCAkbG9jYXRpb25Qcm92aWRlciwgJGh0dHBQcm92aWRlcikgLT5cbiAgJHN0YXRlUHJvdmlkZXIuc3RhdGUoJ2FwcCcsXG4gICAgdXJsOiAnJ1xuICAgIGFic3RyYWN0OiB0cnVlXG4gICAgY29udHJvbGxlcjogJ0FwcEN0cmwnXG4gICAgdGVtcGxhdGVVcmw6ICdtZW51Lmh0bWwnKS5zdGF0ZSgnYXBwLmhvbWUnLFxuICAgIHVybDogJy8nXG4gICAgdmlld3M6IG1lbnVDb250ZW50OlxuICAgICAgY29udHJvbGxlcjogJ0hvbWVDdHJsJ1xuICAgICAgdGVtcGxhdGVVcmw6ICdob21lLmh0bWwnKS5zdGF0ZSgnYmxvZycsXG4gICAgdXJsOiAnL2Jsb2dyb2xsJ1xuICAgIGNvbnRyb2xsZXI6ICdCbG9nUm9sbEN0cmwnXG4gICAgdGVtcGxhdGVVcmw6ICcnKS5zdGF0ZSgnYXBwLmRvY3MnLFxuICAgIHVybDogJy9kb2NzJ1xuICAgIHZpZXdzOiBtZW51Q29udGVudDpcbiAgICAgIGNvbnRyb2xsZXI6ICdEb2NzQ3RybCdcbiAgICAgIHRlbXBsYXRlVXJsOiAnZG9jcy9pbmRleC5odG1sJykuc3RhdGUoJ2FwcC5hYm91dCcsXG4gICAgdXJsOiAnL2xhbmRpbmcnXG4gICAgdmlld3M6IG1lbnVDb250ZW50OlxuICAgICAgY29udHJvbGxlcjogJ0xhbmRpbmdDdHJsJ1xuICAgICAgdGVtcGxhdGVVcmw6ICdsYW5kaW5nLmh0bWwnKS5zdGF0ZSgnYXBwLmxhbmRpbmcnLFxuICAgIHVybDogJy9hYm91dCdcbiAgICB2aWV3czogbWVudUNvbnRlbnQ6XG4gICAgICBjb250cm9sbGVyOiAnQWJvdXRDdHJsJ1xuICAgICAgdGVtcGxhdGVVcmw6ICdhYm91dC5odG1sJykuc3RhdGUoJ2FwcC5ibG9nJyxcbiAgICB1cmw6ICcvYmxvZydcbiAgICB2aWV3czogbWVudUNvbnRlbnQ6XG4gICAgICBjb250cm9sbGVyOiAnQmxvZ0N0cmwnXG4gICAgICB0ZW1wbGF0ZVVybDogJ2Jsb2cuaHRtbCcpLnN0YXRlKCdhcHAucmVzdW1lJyxcbiAgICB1cmw6ICcvY2FzdCdcbiAgICB2aWV3czogbWVudUNvbnRlbnQ6XG4gICAgICBjb250cm9sbGVyOiAnQ2FzdEN0cmwnXG4gICAgICB0ZW1wbGF0ZVVybDogJ2Nhc3QuaHRtbCcpLnN0YXRlKCdhcHAuY2FzdCcsXG4gICAgdXJsOiAnL2V4cGFuc2lvbnBhY2tzJ1xuICAgIHZpZXdzOiBtZW51Q29udGVudDpcbiAgICAgIGNvbnRyb2xsZXI6ICdFeHBhbnNpb25wYWNrc0N0cmwnXG4gICAgICB0ZW1wbGF0ZVVybDogJ2V4cGFuc2lvbnBhY2tzLmh0bWwnKS5zdGF0ZSgnYXBwLmV4cGFuc2lvbnBhY2tzJyxcbiAgICB1cmw6ICcvYm9vaydcbiAgICB2aWV3czogbWVudUNvbnRlbnQ6XG4gICAgICBjb250cm9sbGVyOiAnQm9va0N0cmwnXG4gICAgICB0ZW1wbGF0ZVVybDogJ2Jvb2suaHRtbCcpLnN0YXRlKCdhcHAuYm9vaycsXG4gICAgdXJsOiAnL2xvZ2luJ1xuICAgIHZpZXdzOiBtZW51Q29udGVudDpcbiAgICAgIGNvbnRyb2xsZXI6ICdMb2dpbkN0cmwnXG4gICAgICB0ZW1wbGF0ZVVybDogJ2xvZ2luLmh0bWwnKS5zdGF0ZSgnYXBwLmxvZ2luJyxcbiAgICB1cmw6ICcvY29udGFjdCdcbiAgICB2aWV3czogbWVudUNvbnRlbnQ6XG4gICAgICBjb250cm9sbGVyOiAnQ29udGFjdEN0cmwnXG4gICAgICB0ZW1wbGF0ZVVybDogJ2NvbnRhY3QuaHRtbCcpLnN0YXRlKCdhcHAuZG9jJyxcbiAgICB1cmw6ICcvam9iLW1vbnRobHlzLXR3bydcbiAgICB2aWV3czogbWVudUNvbnRlbnQ6XG4gICAgICBjb250cm9sbGVyOiAnSm9iTW9udGhseXNUd29DdHJsJ1xuICAgICAgdGVtcGxhdGVVcmw6ICdqb2ItbW9udGhseXMtdHdvLmh0bWwnKVxuICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlICcvJ1xuXG4gICRodHRwUHJvdmlkZXIuaW50ZXJjZXB0b3JzLnB1c2ggLT5cbiAgICAgcmVxdWVzdDogKGNvbmZpZykgLT5cbiAgICAgICBpZiBjb25maWcudXJsLm1hdGNoKC9cXC5odG1sJC8pICYmICFjb25maWcudXJsLm1hdGNoKC9ec2hhcmVkXFwvLylcbiAgICAgICAgIGlmIGRldmljZS50YWJsZXQoKVxuICAgICAgICAgICB0eXBlID0gJ3RhYmxldCdcbiAgICAgICAgIGVsc2UgaWYgZGV2aWNlLm1vYmlsZSgpXG4gICAgICAgICAgIHR5cGUgPSAnbW9iaWxlJ1xuICAgICAgICAgZWxzZVxuICAgICAgICAgICB0eXBlID0gJ2Rlc2t0b3AnXG5cbiAgICAgICAgIGNvbmZpZy51cmwgPSBcIi8je3R5cGV9LyN7Y29uZmlnLnVybH1cIlxuXG4gICAgICAgY29uZmlnXG5cbkZyYW5jaGluby5ydW4gKCRzdGF0ZSkgLT5cbiAgJHN0YXRlLmdvICdhcHAuaG9tZSdcblxuXG5GcmFuY2hpbm8ucnVuICgkcm9vdFNjb3BlLCBjb3B5KSAtPlxuICAkcm9vdFNjb3BlLmNvcHkgPSBjb3B5XG4gIGlmIGRldmljZS5kZXNrdG9wKClcbiAgICAkcm9vdFNjb3BlLiRvbiAnJGluY2x1ZGVDb250ZW50TG9hZGVkJywgKGV2ZW50KSAtPlxuICAgICAgIyMgU25hcHNjcm9sbCBhbmQgYmcgdmlkZW9cbiAgICAgICQoJyNmdWxscGFnZScpLmZ1bGxwYWdlXG4gICAgICAgIHZlcnRpY2FsQ2VudGVyZWQ6IHRydWVcbiAgICAgICAgc2VjdGlvbnNDb2xvcjogW1xuICAgICAgICAgICcjMWJiYzliJ1xuICAgICAgICAgICcjMDQwYjE1J1xuICAgICAgICAgICcjMDQwYjE1J1xuICAgICAgICAgICcjMDQwYjE1J1xuICAgICAgICAgICcjY2NkZGZmJ1xuICAgICAgICBdXG4gICAgICAgIGFuY2hvcnM6IFtcbiAgICAgICAgICAnZmlyc3RQYWdlJ1xuICAgICAgICAgICdzZWNvbmRQYWdlJ1xuICAgICAgICAgICczcmRQYWdlJ1xuICAgICAgICAgICc0dGhwYWdlJ1xuICAgICAgICAgICdsYXN0UGFnZSdcbiAgICAgICAgXVxuICAgICAgICBtZW51OiAnI21lbnUnXG4gICAgICAgIHNjcm9sbGluZ1NwZWVkOiA4MDBcbiAgICAgICAgYWZ0ZXJSZW5kZXI6IC0+XG4gICAgICAgICAgJCgndmlkZW8nKS5nZXQoMCkucGxheSgpXG4gICAgICAgICAgcmV0dXJuXG4gICAgICByZXR1cm5cbiAgZWxzZVxuXG5cbiAgICBcbkZyYW5jaGluby5mYWN0b3J5ICdTb2NrZXQnLCAoc29ja2V0RmFjdG9yeSkgLT5cbiAgc29ja2V0RmFjdG9yeSgpXG5GcmFuY2hpbm8uZmFjdG9yeSAnRG9jcycsIChTb2NrZXQpIC0+XG4gIHNlcnZpY2UgPSB1bmRlZmluZWRcbiAgc2VydmljZSA9XG4gICAgbGlzdDogW11cbiAgICBmaW5kOiAocGVybWFsaW5rKSAtPlxuICAgICAgXy5maW5kIHNlcnZpY2UubGlzdCwgKGRvYykgLT5cbiAgICAgICAgZG9jLnBlcm1hbGluayA9PSBwZXJtYWxpbmtcbiAgU29ja2V0Lm9uICdkb2NzJywgKGRvY3MpIC0+XG4gICAgc2VydmljZS5saXN0ID0gZG9jc1xuICBzZXJ2aWNlXG5cblxuXG5cblxuRnJhbmNoaW5vLmNvbnRyb2xsZXIgJ0hvbWVDdHJsJywgW1xuICAnJHNjb3BlJ1xuICAoJHNjb3BlKSAtPlxuXG4gICAgZG8gLT5cbiAgICAgIGJvZHlFbCA9IHVuZGVmaW5lZFxuICAgICAgY2xvc2VidG4gPSB1bmRlZmluZWRcbiAgICAgIGNvbnRlbnQgPSB1bmRlZmluZWRcbiAgICAgIGluaXQgPSB1bmRlZmluZWRcbiAgICAgIGluaXRFdmVudHMgPSB1bmRlZmluZWRcbiAgICAgIGlzT3BlbiA9IHVuZGVmaW5lZFxuICAgICAgb3BlbmJ0biA9IHVuZGVmaW5lZFxuICAgICAgdG9nZ2xlTWVudSA9IHVuZGVmaW5lZFxuICAgICAgYm9keUVsID0gZG9jdW1lbnQuYm9keVxuICAgICAgY29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250ZW50LXdyYXAnKVxuICAgICAgb3BlbmJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvcGVuLWJ1dHRvbicpXG4gICAgICBjbG9zZWJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjbG9zZS1idXR0b24nKVxuICAgICAgaXNPcGVuID0gZmFsc2VcblxuICAgICAgaW5pdCA9IC0+XG4gICAgICAgIGluaXRFdmVudHMoKVxuICAgICAgICByZXR1cm5cblxuICAgICAgaW5pdEV2ZW50cyA9IC0+XG4gICAgICAgICQgPSB1bmRlZmluZWRcbiAgICAgICAgY3NzSWQgPSB1bmRlZmluZWRcbiAgICAgICAgaGVhZCA9IHVuZGVmaW5lZFxuICAgICAgICBsaW5rID0gdW5kZWZpbmVkXG4gICAgICAgIGlmIGRldmljZS5kZXNrdG9wKClcbiAgICAgICAgICBcbiAgICAgICAgZWxzZSBpZiBkZXZpY2UubW9iaWxlKClcbiAgICAgICAgICAkID0gZG9jdW1lbnRcbiAgICAgICAgICBjc3NJZCA9ICdteUNzcydcbiAgICAgICAgICBpZiAhJC5nZXRFbGVtZW50QnlJZChjc3NJZClcbiAgICAgICAgICAgIGhlYWQgPSAkLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF1cbiAgICAgICAgICAgIGxpbmsgPSAkLmNyZWF0ZUVsZW1lbnQoJ2xpbmsnKVxuICAgICAgICAgICAgbGluay5pZCA9IGNzc0lkXG4gICAgICAgICAgICBsaW5rLnJlbCA9ICdzdHlsZXNoZWV0J1xuICAgICAgICAgICAgbGluay50eXBlID0gJ3RleHQvY3NzJ1xuICAgICAgICAgICAgbGluay5ocmVmID0gJ2h0dHBzOi8vY29kZS5pb25pY2ZyYW1ld29yay5jb20vMS4wLjAtYmV0YS4xMy9jc3MvaW9uaWMubWluLmNzcydcbiAgICAgICAgICAgIGxpbmsubWVkaWEgPSAnYWxsJ1xuICAgICAgICAgICAgaGVhZC5hcHBlbmRDaGlsZCBsaW5rXG4gICAgICAgIGlmIGRldmljZS5kZXNrdG9wKClcbiAgICAgICAgICBvcGVuYnRuLmFkZEV2ZW50TGlzdGVuZXIgJ2NsaWNrJywgdG9nZ2xlTWVudVxuICAgICAgICAgIGlmIGNsb3NlYnRuXG4gICAgICAgICAgICBjbG9zZWJ0bi5hZGRFdmVudExpc3RlbmVyICdjbGljaycsIHRvZ2dsZU1lbnVcbiAgICAgICAgICBjb250ZW50LmFkZEV2ZW50TGlzdGVuZXIgJ2NsaWNrJywgKGV2KSAtPlxuICAgICAgICAgICAgdGFyZ2V0ID0gdW5kZWZpbmVkXG4gICAgICAgICAgICB0YXJnZXQgPSBldi50YXJnZXRcbiAgICAgICAgICAgIGlmIGlzT3BlbiBhbmQgdGFyZ2V0ICE9IG9wZW5idG5cbiAgICAgICAgICAgICAgdG9nZ2xlTWVudSgpXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgZWxzZVxuXG4gICAgICAgIFxuXG4gICAgICB0b2dnbGVNZW51ID0gLT5cbiAgICAgICAgaWYgaXNPcGVuXG4gICAgICAgICAgY2xhc3NpZS5yZW1vdmUgYm9keUVsLCAnc2hvdy1tZW51J1xuICAgICAgICBlbHNlXG4gICAgICAgICAgY2xhc3NpZS5hZGQgYm9keUVsLCAnc2hvdy1tZW51J1xuICAgICAgICBpc09wZW4gPSAhaXNPcGVuXG4gICAgICAgIHJldHVyblxuXG4gICAgICBpbml0KClcbiAgICAgIHJldHVyblxuXVxuXG5GcmFuY2hpbm8uY29udHJvbGxlciAnQ29udGFjdFNoZWV0Q3RybCcsICgkc2NvcGUsICRpb25pY0FjdGlvblNoZWV0KSAtPlxuXG4gICRzY29wZS5zaG93QWN0aW9uc2hlZXQgPSAtPlxuICAgICRpb25pY0FjdGlvblNoZWV0LnNob3dcbiAgICAgIHRpdGxlVGV4dDogJ0NvbnRhY3QgRnJhbmNoaW5vJ1xuICAgICAgYnV0dG9uczogW1xuICAgICAgICB7IHRleHQ6ICdHaXRodWIgPGkgY2xhc3M9XCJpY29uIGlvbi1zaGFyZVwiPjwvaT4nIH1cbiAgICAgICAgeyB0ZXh0OiAnRW1haWwgTWUgPGkgY2xhc3M9XCJpY29uIGlvbi1lbWFpbFwiPjwvaT4nIH1cbiAgICAgICAgeyB0ZXh0OiAnVHdpdHRlciA8aSBjbGFzcz1cImljb24gaW9uLXNvY2lhbC10d2l0dGVyXCI+PC9pPicgfVxuICAgICAgICB7IHRleHQ6ICcyMjQtMjQxLTkxODkgPGkgY2xhc3M9XCJpY29uIGlvbi1pb3MtdGVsZXBob25lXCI+PC9pPicgfVxuICAgICAgXVxuICAgICAgY2FuY2VsVGV4dDogJ0NhbmNlbCdcbiAgICAgIGNhbmNlbDogLT5cbiAgICAgICAgY29uc29sZS5sb2cgJ0NBTkNFTExFRCdcbiAgICAgICAgcmV0dXJuXG4gICAgICBidXR0b25DbGlja2VkOiAoaW5kZXgpIC0+XG4gICAgICAgIGlmIGluZGV4ID09IDJcbiAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcyMjQtMjQxLTkxODknXG4gICAgICAgIGlmIGluZGV4ID09IDJcbiAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICdodHRwOi8vdHdpdHRlci5jb20vZnJhbmNoaW5vX2NoZSdcbiAgICAgICAgaWYgaW5kZXggPT0gMVxuICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJ21haWx0bzpmcmFuY2hpbm8ubm9uY2VAZ21haWwuY29tJ1xuICAgICAgICBpZiBpbmRleCA9PSAwXG4gICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnaHR0cDovL2dpdGh1Yi5jb20vZnJhbmd1Y2MnXG4gICAgICAgIHRydWVcblxuICByZXR1cm5cbkZyYW5jaGluby5jb250cm9sbGVyICdTbGlkZXNUYXBPbmVDdHJsJywgKCRzY29wZSkgLT5cbiAgJHNjb3BlLmRhdGUgPSAnTk9WRU1CRVIgMjAxNCdcbiAgJHNjb3BlLnRpdGxlID0gJ1RhcGNlbnRpdmUgbWFuYWdlciBVWCBvdmVyaGF1bCBhbmQgZnJvbnQtZW5kJ1xuICAkc2NvcGUuaW1hZ2VzID0gWyB7XG4gICAgJ2FsdCc6ICdUYXBjZW50aXZlLmNvbSBVWCBvdmVyaGF1bCBhbmQgU1BBIGZyb250LWVuZCdcbiAgICAndXJsJzogJy9pbWcvZ2lmL3JlcG9ydC5naWYnXG4gICAgJ3RleHQnOiAnPHA+U3R1ZHkgdGhlIHVzZXIgYW5kIHRoZWlyIGdvYWxzIGFuZCBvdmVyaGF1bCB0aGUgZXhwZXJpZW5jZSB3aGlsZSByZS13cml0aW5nIHRoZSBmcm9udC1lbmQgaW4gQW5ndWxhci48L3A+PGEgaHJlZj1cXCdodHRwOi8vdGFwY2VudGl2ZS5jb21cXCcgdGFyZ2V0PVxcJ19ibGFua1xcJz5WaXNpdCBXZWJzaXRlPC9hPidcbiAgfSBdXG5GcmFuY2hpbm8uY29udHJvbGxlciAnU2xpZGVzVGFwVHdvQ3RybCcsICgkc2NvcGUpIC0+XG4gICRzY29wZS5kYXRlID0gJ09DVE9CRVIgMjAxNCdcbiAgJHNjb3BlLnRpdGxlID0gJ0Rlc2t0b3AgYW5kIG1vYmlsZSB3ZWIgZnJpZW5kbHkgbWFya2V0aW5nIHdlYnNpdGUnXG4gICRzY29wZS5pbWFnZXMgPSBbIHtcbiAgICAnYWx0JzogJ1NvbWUgYWx0IHRleHQnXG4gICAgJ3VybCc6ICcvaW1nL2ZyYW5jaGluby10YXBjZW50aXZlLXllbGxvdy5qcGcnXG4gICAgJ3RleHQnOiAnPHA+Q3JlYXRlIGEga25vY2tvdXQgYnJhbmQgc3RyYXRlZ3kgd2l0aCBhbiBhd2Vzb21lIGxvb2sgYW5kIGZlZWwuIE1ha2UgYSBzb3BoaXN0aWNhdGVkIG9mZmVyaW5nIGxvb2sgc2ltcGxlIGFuZCBlYXN5IHRvIHVzZS48L3A+PGEgaHJlZj1cXCdodHRwOi8vdGFwY2VudGl2ZS5jb21cXCcgdGFyZ2V0PVxcJ19ibGFua1xcJz5WaXNpdCBXZWJzaXRlPC9hPidcbiAgfSBdXG5GcmFuY2hpbm8uY29udHJvbGxlciAnU2xpZGVzQ3BnQ3RybCcsICgkc2NvcGUpIC0+XG4gICRzY29wZS5kYXRlID0gJ0pVTFkgMjAxNCdcbiAgJHNjb3BlLnRpdGxlID0gJ0lkZW50aXR5LCBmdWxsLXN0YWNrIE1WUCwgYW5kIG1hcmtldGluZyB3ZWJzaXRlIGZvciBhIG5ldyBDUEcgZURpc3RyaWJ1dGlvbiBjb21wYW55J1xuICAkc2NvcGUuaW1hZ2VzID0gWyB7XG4gICAgJ2FsdCc6ICdTb21lIGFsdCB0ZXh0J1xuICAgICd1cmwnOiAnL2ltZy9mcmFuY2lub19jcGdpby5qcGcnXG4gICAgJ3RleHQnOiAnPHA+VHVybiBhbiBvbGQgc2Nob29sIENQRyBidXNpbmVzcyBpbnRvIGEgc29waGlzdGljYXRlZCB0ZWNobm9sb2d5IGNvbXBhbnkuIERlc2lnbiBzZWN1cmUsIGF1dG9tYXRlZCBhbmQgdHJhbnNmb3JtYXRpdmUgcGxhdGZvcm0sIHRlY2huaWNhbCBhcmNoaXRlY3R1cmUgYW5kIGV4ZWN1dGUgYW4gTVZQIGVub3VnaCB0byBhcXVpcmUgZmlyc3QgY3VzdG9tZXJzLiBNaXNzaW9uIGFjY29tcGxpc2hlZC48L3A+PGEgaHJlZj1cXCdodHRwOi8vY3BnLmlvXFwnIHRhcmdldD1cXCdfYmxhbmtcXCc+VmlzaXQgV2Vic2l0ZTwvYT4nXG4gIH0gXVxuRnJhbmNoaW5vLmNvbnRyb2xsZXIgJ1NsaWRlc01lZHljYXRpb25DdHJsJywgKCRzY29wZSkgLT5cbiAgJHNjb3BlLmRhdGUgPSAnQVBSSUwgMjAxNCdcbiAgJHNjb3BlLnRpdGxlID0gJ1VzZXIgZXhwZXJpZW5jZSBkZXNpZ24gYW5kIHJhcGlkIHByb3RvdHlwaW5nIGZvciBNZWR5Y2F0aW9uLCBhIG5ldyBoZWFsdGhjYXJlIHByaWNlIGNvbXBhcmlzb24gd2Vic2l0ZSdcbiAgJHNjb3BlLmltYWdlcyA9IFtcbiAgICB7XG4gICAgICAnYWx0JzogJ1NvbWUgYWx0IHRleHQnXG4gICAgICAndXJsJzogJy9pbWcvZnJhbmNoaW5vLW1lZHljYXRpb24uanBnJ1xuICAgICAgJ3RleHQnOiAnPHA+V2FsdHogdXAgaW4gdGhlIG9ubGluZSBoZWFsdGhjYXJlIGluZHVzdHJ5IGd1bnMgYmxhemluZyB3aXRoIGtpbGxlciBkZXNpZ24gYW5kIGluc3RpbmN0cy4gR2V0IHRoaXMgbmV3IGNvbXBhbnkgb2ZmIHRoZSBncm91bmQgd2l0aCBpdFxcJ3MgTVZQLiBTd2lwZSBmb3IgbW9yZSB2aWV3cy48L3A+PGEgaHJlZj1cXCdodHRwOi8vbWVkeWNhdGlvbi5jb21cXCcgdGFyZ2V0PVxcJ19ibGFua1xcJz5WaXNpdCBXZWJzaXRlPC9hPidcbiAgICB9XG4gICAge1xuICAgICAgJ2FsdCc6ICdTb21lIGFsdCB0ZXh0J1xuICAgICAgJ3VybCc6ICcvaW1nL2ZyYW5jaGluby1tZWR5Y2F0aW9uMi5qcGcnXG4gICAgICAndGV4dCc6ICcnXG4gICAgfVxuICAgIHtcbiAgICAgICdhbHQnOiAnU29tZSBhbHQgdGV4dCdcbiAgICAgICd1cmwnOiAnL2ltZy9mcmFuY2hpbm8tbWVkeWNhdGlvbjMuanBnJ1xuICAgIH1cbiAgICB7XG4gICAgICAnYWx0JzogJ1NvbWUgYWx0IHRleHQnXG4gICAgICAndXJsJzogJy9pbWcvZnJhbmNoaW5vLW1lZHljYXRpb240LmpwZydcbiAgICB9XG4gIF1cbkZyYW5jaGluby5jb250cm9sbGVyICdTbGlkZXNDU1RDdHJsJywgKCRzY29wZSkgLT5cbiAgJHNjb3BlLmRhdGUgPSAnQVBSSUwgMjAxNCdcbiAgJHNjb3BlLnRpdGxlID0gJ0Rlc2lnbmVkIGFuZCBkZXZlbG9wZWQgYSBuZXcgdmVyc2lvbiBvZiB0aGUgQ2hpY2FnbyBTdW4gVGltZXMgdXNpbmcgYSBoeWJyaWQgSW9uaWMvQW5ndWxhciBzdGFjaydcbiAgJHNjb3BlLmltYWdlcyA9IFtcbiAgICB7XG4gICAgICAnYWx0JzogJ1NvbWUgYWx0IHRleHQnXG4gICAgICAndXJsJzogJy9pbWcvZnJhbmNoaW5vLWNzdC5qcGcnXG4gICAgICAndGV4dCc6ICc8cD5IZWxwIHRoZSBzdHJ1Z2dsaW5nIG1lZGlhIGdpYW50IHVwZ3JhZGUgdGhlaXIgY29uc3VtZXIgZmFjaW5nIHRlY2hub2xvZ3kuIENyZWF0ZSBvbmUgY29kZSBiYXNlIGluIEFuZ3VsYXIgY2FwYWJsZSBvZiBnZW5lcmF0aW5nIGtpY2stYXNzIGV4cGVyaWVuY2VzIGZvciBtb2JpbGUsIHRhYmxldCwgd2ViIGFuZCBUVi4nXG4gICAgfVxuICAgIHtcbiAgICAgICdhbHQnOiAnU29tZSBhbHQgdGV4dCdcbiAgICAgICd1cmwnOiAnL2ltZy9mcmFuY2hpbm8tY3N0Mi5qcGcnXG4gICAgfVxuICAgIHtcbiAgICAgICdhbHQnOiAnU29tZSBhbHQgdGV4dCdcbiAgICAgICd1cmwnOiAnL2ltZy9mcmFuY2hpbm8tY3N0My5qcGcnXG4gICAgfVxuICBdXG5GcmFuY2hpbm8uY29udHJvbGxlciAnU2xpZGVzS291cG5DdHJsJywgKCRzY29wZSkgLT5cbiAgJHNjb3BlLmRhdGUgPSAnTUFSQ0ggMjAxNCdcbiAgJHNjb3BlLnRpdGxlID0gJ0JyYW5kIHJlZnJlc2gsIG1hcmtldGluZyBzaXRlIGFuZCBwbGF0Zm9ybSBleHBlcmllbmNlIG92ZXJoYXVsJ1xuICAkc2NvcGUuaW1hZ2VzID0gW1xuICAgIHtcbiAgICAgICdhbHQnOiAnU29tZSBhbHQgdGV4dCdcbiAgICAgICd1cmwnOiAnL2ltZy9mcmFuY2hpbm8ta291cG4xLmpwZydcbiAgICB9XG4gICAge1xuICAgICAgJ2FsdCc6ICdTb21lIGFsdCB0ZXh0J1xuICAgICAgJ3VybCc6ICcvaW1nL2ZyYW5jaGluby1rb3VwbjIuanBnJ1xuICAgIH1cbiAgICB7XG4gICAgICAnYWx0JzogJ1NvbWUgYWx0IHRleHQnXG4gICAgICAndXJsJzogJy9pbWcvZnJhbmNoaW5vLWtvdXBuLmpwZydcbiAgICB9XG4gIF1cbkZyYW5jaGluby5jb250cm9sbGVyICdTbGlkZXNUcm91bmRDdHJsJywgKCRzY29wZSkgLT5cbiAgJHNjb3BlLmRhdGUgPSAnQVVHVVNUIDIwMTMnXG4gICRzY29wZS50aXRsZSA9ICdTb2NpYWwgdHJhdmVsIG1vYmlsZSBhcHAgZGVzaWduLCBVWCBhbmQgcmFwaWQgcHJvdG90eXBpbmcnXG4gICRzY29wZS5pbWFnZXMgPSBbIHtcbiAgICAnYWx0JzogJ1NvbWUgYWx0IHRleHQnXG4gICAgJ3VybCc6ICcvaW1nL2ZyYW5jaW5vX3Ryb3VuZC5qcGcnXG4gICAgJ3RleHQnOiAnRGVzaWduIGFuIEluc3RhZ3JhbSBiYXNlZCBzb2NpYWwgdHJhdmVsIGFwcC4gV2h5PyBJIGRvblxcJ3Qga25vdy4nXG4gIH0gXVxuRnJhbmNoaW5vLmNvbnRyb2xsZXIgJ1NsaWRlc01vbnRobHlzQ3RybCcsICgkc2NvcGUpIC0+XG4gICRzY29wZS5kYXRlID0gJ0ZFQlJVQVJZIDIwMTMnXG4gICRzY29wZS50aXRsZSA9ICdDdXN0b21lciBwb3J0YWwgcGxhdGZvcm0gVVggZGVzaWduIGFuZCBmcm9udC1lbmQnXG4gICRzY29wZS5pbWFnZXMgPSBbXG4gICAge1xuICAgICAgJ2FsdCc6ICdTb21lIGFsdCB0ZXh0J1xuICAgICAgJ3VybCc6ICcvaW1nL2ZyYW5jaGluby1tb250aGx5cy1iaXoyLmpwZydcbiAgICB9XG4gICAge1xuICAgICAgJ2FsdCc6ICdTb21lIGFsdCB0ZXh0J1xuICAgICAgJ3VybCc6ICcvaW1nL2ZyYW5jaGlub19tb250aGx5cy5qcGcnXG4gICAgfVxuICBdXG5GcmFuY2hpbm8uY29udHJvbGxlciAnU2xpZGVzTW9udGhseXNUd29DdHJsJywgKCRzY29wZSkgLT5cbiAgJHNjb3BlLmRhdGUgPSAnTUFSQ0ggMjAxMidcbiAgJHNjb3BlLnRpdGxlID0gJ0VudHJlcHJlbmV1ciBpbiByZXNpZGVuY2UgYXQgTGlnaHRiYW5rJ1xuICAkc2NvcGUuaW1hZ2VzID0gW1xuICAgIHtcbiAgICAgICdhbHQnOiAnU29tZSBhbHQgdGV4dCdcbiAgICAgICd1cmwnOiAnL2ltZy9mcmFuY2hpbm8tbW9udGhseXM3LmpwZydcbiAgICB9XG4gICAge1xuICAgICAgJ2FsdCc6ICdTb21lIGFsdCB0ZXh0J1xuICAgICAgJ3VybCc6ICcvaW1nL2ZyYW5jaGluby1tb250aGx5czUuanBnJ1xuICAgIH1cbiAgICB7XG4gICAgICAnYWx0JzogJ1NvbWUgYWx0IHRleHQnXG4gICAgICAndXJsJzogJy9pbWcvZnJhbmNoaW5vLW1vbnRobHlzMi5qcGcnXG4gICAgfVxuICBdXG5GcmFuY2hpbm8uY29udHJvbGxlciAnQmxvZ0N0cmwnLCAoJHNjb3BlKSAtPlxuICAkc2NvcGUuYXJ0aWNsZXMgPSBbXG4gICAge1xuICAgICAgJ2RhdGUnOiAnUG9zdGVkIGJ5IEZyYW5jaGlubyBvbiBEZWNlbWJlciAzMSwgMjAxNCdcbiAgICAgICdoZWFkaW5nJzogJ0dpdGZsb3c/J1xuICAgICAgJ2F1dGhvcmltZyc6ICcvaW1nL2ZyYW5rLnBuZydcbiAgICAgICdpbWcnOiAnL2ltZy9kZWMvZ2l0LWZsb3cuanBnJ1xuICAgICAgJ2Jsb2InOiAnR29zaCBkYXJuLWl0LCB0ZWFtcyBnZXR0aW5nIG1vcmUgc3luY2VkIHdpdGggdGhlIGhlbHAgb2YgbmV3IGdpdCBtZXRob2RvbG9naWVzIGZvciB0ZWFtcy4gPGEgaHJlZj1cXCdodHRwczovL3d3dy5hdGxhc3NpYW4uY29tL2dpdC90dXRvcmlhbHMvY29tcGFyaW5nLXdvcmtmbG93cy9jZW50cmFsaXplZC13b3JrZmxvd1xcJz5JIGNhblxcJ3Qga2VlcCB1cDwvYT4gJ1xuICAgIH1cbiAgICB7XG4gICAgICAnZGF0ZSc6ICdQb3N0ZWQgYnkgRnJhbmNoaW5vIG9uIERlY2VtYmVyIDIyLCAyMDE0J1xuICAgICAgJ2hlYWRpbmcnOiAnT2ggc2hpdCwgQW5ndWxhciAyLjAnXG4gICAgICAnYXV0aG9yaW1nJzogJy9pbWcvZnJhbmsucG5nJ1xuICAgICAgJ2ltZyc6ICcvaW1nL2dyYXBoX3NwYS5qcGcnXG4gICAgICAnYmxvYic6ICdQYXJkb24gbXkgc2NhdHRlcmVkIGJyYWluIHJpZ2h0IG5vdy4gU28gYWZ0ZXIgd2F0Y2hpbmcgdGhlIDxhIGhyZWY9XFwnaHR0cHM6Ly93d3cueW91dHViZS5jb20vd2F0Y2g/dj1nTm1XeWJBeUJISVxcJyB0YXJnZXQ9XFwnX2JsYW5rXFwnPkV1cm8gbmctY29uZiB2aWRlbzwvYT4gd2hlcmUgdGhlIGNyZWF0b3JzIG9mIEFuZ3VsYXIgMi4wIGJhc2ljYWxseSBzYWlkLCBldmVyeXRoaW5nIGluIGNoYW5naW5nLCBJIGRpZCB3aGF0IG1vc3QgZGV2ZWxvcGVycyB3b3VsZCBkbyBhbmQgY29tcGxldGVseSBmcmVha2VkLiBJIG11c3Qgc2F5LCBJXFwnbSBzdGlsbCwgdGhvcm91Z2hseSBjb25mdXNlZCwgZXZlbiBhZnRlciBzcGVha2luZyB0byBhIGRvemVuIG9yIHNvIGtleSBmaWd1cmVzIGluIHRoZSBpbmR1c3RyeS4gTXkgZmlyc3QgcmVhY3Rpb24/IFR3ZWV0IG91dCBpbiBhbmdlci4gRi1VIEFuZ3VsYXIgdGVhbSBJIHByb25vdW5jZWQuIEYtVS4gVGhlbiwgbW9yZSBwYW5pYyBhcyBJIGNvbnRpbnVlZCB0byByZWFkIHNvbWUgb2YgdGhlIHBvc3RzIGJ5IG90aGVycyBmZWVsaW5nIHRoZSBzYW1lIHdheS4gSSBhc2tlZCB0aGUgQW5ndWxhciB0ZWFtLCBob3cgdGhleSB3ZXJlIGhlbHBpbmcgdGhlIGluZHVzdHJ5IGJ5IHRlbGxpbmcgdXMgaW4gYSB5ZWFyIGFueXRoaW5nIHdlIGhhdmUgZGV2ZWxvcGVkIGluIEFuZ3VsYXIgd291bGQgYmUgZ2FyYmFnZS4gSSBkaWQgd2hhdCBvdGhlcnMgc2VlbWVkIHRvIGJlIGRvaW5nIGFuZCBpbW1lZGlhdGVseSBzdGFydGVkIGxvb2tpbmcgZm9yIGFub3RoZXIgZnJhbWV3b3JrIHRvIHN0dWR5IGFuZCBpbnZlc3QgaW4uIFRoYXRcXCdzIHdoZW4gSSBmb3VuZCA8YSBocmVmPVxcJ2h0dHA6Ly93d3cuaW5kZWVkLmNvbS9qb2J0cmVuZHM/cT1lbWJlci5qcyUyQythbmd1bGFyLmpzJTJDK3JlYWN0LmpzJTJDK2JhY2tib25lLmpzJmw9XFwnIHRhcmdldD1cXCdfYmxhbmtcXCc+dGhpcyBncmFwaDwvYT4gdGVsbGluZyBtZSB0aGUgb25seSBvdGhlciBTUEEgZnJhbWV3b3JrIHRoYXQgaGFzIGFzIG11Y2ggYWN0aXZpdHkgYXMgQW5ndWxhciBpcyBnb29kIG9sZCBCYWNrYm9uZS4gPGJyIC8+PGJyIC8+QmFja2JvbmUsIG15IGZpcnN0IFNQQSBsb3ZlIC0gd2VcXCd2ZSBtZXQgYmVmb3JlLiBFdmVuIHJlY2VudGx5LiBCdXQgSVxcJ3ZlIGJlZW4gbG9zdC4gSVxcJ3ZlIGJlZW4gaW5sb3ZlIHdpdGggRWdnaGVhZC5pbyBhbmQgdGhpbmdzIGxpa2UgSW9uaWMsIFNwcmFuZ3VsYXIgYW5kIGFsbCBzb3J0cyBvZiB0aGluZ3MgdGhhdCBnaXZlIG1lIHN0dWZmIGZvciBmcmVlLiBCdXQgdGhlbiBJIG5vdGljZWQgc29tZXRoaW5nLiBUaGUgYmFja2JvbmUgY29tbXVuaXR5IGhhcyBiZWVuIHF1aWV0bHkgZG9pbmcgaXRcXCdzIHRoaW5nIGZvciBhIG1pbnV0ZSBub3cuIEJhY2tib25lcmFpbHMuY29tPyBBcmUgeW91IGtpZGRpbmcsIHdoYXQgYSByZXNvdXJjZS4gTWFyaW9uZXR0ZT8gTG92ZWx5LiBUaGUgbGlzdCBnb2VzIG9uLiBJIG5vdyBoYXZlIGRvemVucyBvZiByZWFzb25zIHRvIGdpdmUgQmFja2JvbmUgYW5vdGhlciBsb29rLiBBbmQgdGhlbiwgaXQgaGFwcGVuZWQuIEkgZW1haWxlZCBNYXggTHluY2ggb3ZlciBhdCBJb25pYyBhbmQgc2FpZCwgSSB0aGluayB5b3UgbmVlZCB0byBhZGRyZXNzIHRoZSBmcmlnaHQgb2YgQW5ndWxhciAyLjAgc29tZSBvZiB1cyBhcmUgZXhwZXJpZW5jaW5nLiBBbmQgdGhlbiBoZSBzaGVkIHNvbWUgbGlnaHQuIEFmdGVyIGEgcmVhbGx5IGF3ZXNvbWUgcmVzcG9uc2UsIGhlIHNhaWQgc29tZXRoaW5nIGF0IHRoZSBlbmQgdG8gdGhlIHR1bmUgb2YuIEFuZ3VsYXIgMiBpcyBhbGwgYWJvdXQgbWFraW5nIGl0IGVhc2llciBhbmQgZmFzdGVyIHRvIHVzZSwgYW5kIG1vcmUgYXBwcm9wcmlhdGUgZm9yIGZ1dHVyZSBicm93c2VyIHN0YW5kYXJkcyBsaWtlIFdlYiBDb21wb25lbnRzLiBIbW0uLi4gPGJyIC8+PGJyIC8+V2ViIENvbXBvbmVudHMuIFlvdSBtZWFuLCB0aGlzIHN0dWZmIElcXCd2ZSBiZWVuIGhlYXJpbmcgYWJvdXQsIHRoaW5ncyBsaWtlIFBvbHltZXIsIGFuZCB0aGVzZSBuZXcgc3BlY3MgdGhlIGJyb3dzZXIgYWxyZWFkeSBoYXMgYmVndW4gdG8gc3VwcG9ydCwgbGlrZSBTaGFkb3cgRG9tLCBjdXN0b20gZWxlbWVudHMgYW5kIGltcG9ydHMuIFNvLiBXaGVyZSB0aGUgaGVsbCBhbSBJIHJpZ2h0IG5vdz8gRm9yIG5vdywgSSB0aGluayBJXFwnbGwgdGFrZSBhIGJyZWFrIGZyb20gc3RyZXNzaW5nIGFib3V0IFNQQSBmcmFtZXdvcmtzIGFuZCBsb29rIGF0IDxhIGhyZWY9XFwnaHR0cHM6Ly93d3cucG9seW1lci1wcm9qZWN0Lm9yZy9cXCcgdGFyZ2V0PVxcJ19ibGFua1xcJz5Qb2x5bWVyPC9hPiwgPGEgaHJlZj1cXCdodHRwOi8vd2ViY29tcG9uZW50cy5vcmcvXFwnIHRhcmdldD1cXCdfYmxhbmtcXCc+V2ViIENvbXBvbmVudHM8L2E+LCBFNiBhbmQgc3R1ZHkgdXAgb24gPGEgaHJlZj1cXCdodHRwczovL21hdGVyaWFsLmFuZ3VsYXJqcy5vcmcvIy9cXCcgdGFyZ2V0PVxcJ19ibGFua1xcJz5NYXRlcmlhbCBEZXNpZ248L2E+IGZvciBhIG1pbnV0ZS4nXG4gICAgfVxuICAgIHtcbiAgICAgICdkYXRlJzogJ1Bvc3RlZCBieSBGcmFuY2hpbm8gb24gRGVjZW1iZXIgMTIsIDIwMTQnXG4gICAgICAnaGVhZGluZyc6ICdNeSBwYXRoIHRvIGxlYXJuaW5nIFN3aWZ0J1xuICAgICAgJ2F1dGhvcmltZyc6ICcvaW1nL2ZyYW5rLnBuZydcbiAgICAgICdpbWcnOiAnL2ltZy9kZWMvbmV3c2xldHRlci1zd2lmdHJpcy1oZWFkZXIuZ2lmJ1xuICAgICAgJ2Jsb2InOiAnSVxcJ3ZlIGJlZW4gYW4gTVZDIGRldmVsb3BlciBpbiBldmVyeSBsYW5ndWFnZSBleGNlcHQgZm9yIGlPUy4gVGhpcyBwYXN0IE9jdG9iZXIsIEkgdG9vayBteSBmaXJzdCByZWFsIGRlZXAgZGl2ZSBpbnRvIGlPUyBwcm9ncmFtbWluZyBhbmQgc3RhcnRlZCB3aXRoIFN3aWZ0LiBUaGVyZSBhcmUgdHdvIGdyZWF0IHR1dG9yaWFscyBvdXQgdGhlcmUuIFRoZSBmaXJzdCBpcyBmcm9tIGJsb2MuaW8gYW5kIGlzIGZyZWUuIEl0XFwncyBhIGdhbWUsIFN3aWZ0cmlzLCBzbyBnZXQgcmVhZHkgZm9yIHNvbWUgYWN0aW9uLiA8YnIgLz48YnIgLz4gVGhlIHNlY29uZCB3aWxsIGhlbHAgeW91IGJ1aWxkIHNvbWV0aGluZyBtb3JlIGFwcGlzaCwgaXRcXCdzIGJ5IEFwcGNvZGEuIEdvdCB0aGVpciBib29rIGFuZCB3aWxsIGJlIGRvbmUgd2l0aCBpdCB0aGlzIHdlZWsuIFNvIGZhciwgYm9va3Mgb2ssIGJ1dCBpdCBtb3ZlcyByZWFsbHkgc2xvdy4gSVxcJ2xsIHBvc3QgYSBibG9nIGluIGEgZmV3IGRheXMgd2l0aCBsaW5rcyB0byB0aGUgYXBwIHdhcyBhYmxlIHRvIGJ1aWxkLidcbiAgICAgICdyZXNvdXJjZTEnOiAnaHR0cHM6Ly93d3cuYmxvYy5pby9zd2lmdHJpcy1idWlsZC15b3VyLWZpcnN0LWlvcy1nYW1lLXdpdGgtc3dpZnQnXG4gICAgICAncmVzb3VyY2UyJzogJ2h0dHA6Ly93d3cuYXBwY29kYS5jb20vc3dpZnQvJ1xuICAgIH1cbiAgICB7XG4gICAgICAnZGF0ZSc6ICdQb3N0ZWQgYnkgRnJhbmNoaW5vIG9uIERlY2VtYmVyIDExLCAyMDE0J1xuICAgICAgJ2hlYWRpbmcnOiAnV2h5IEkgZ2V0IGdvb3NlIGJ1bXBzIHdoZW4geW91IHRhbGsgYWJvdXQgYXV0b21hdGVkIGVtYWlsIG1hcmtldGluZyBhbmQgc2VnbWVudGF0aW9uIGFuZCBjdXN0b21lci5pbyBhbmQgdGhpbmdzIGxpa2UgdGhhdC4nXG4gICAgICAnYXV0aG9yaW1nJzogJy9pbWcvZnJhbmsucG5nJ1xuICAgICAgJ2ltZyc6ICcvaW1nL2RlYy9wcmVwZW1haWxzLnBuZydcbiAgICAgICdibG9iJzogJ0kgZ2V0IHRlYXJ5IGV5ZWQgd2hlbiBJIHRhbGsgYWJvdXQgbXkgd29yayBhdCBCZW5jaFByZXAuY29tLiBJbiBzaG9ydCwgSSB3YXMgdGhlIGZpcnN0IGVtcGxveWVlIGFuZCBoZWxwZWQgdGhlIGNvbXBhbnkgZ2V0IHRvIHRoZWlyIHNlcmllcyBCIG5lYXIgdGhlIGVuZCBvZiB5ZWFyIHR3by4gSSBnb3QgYSBsb3QgZG9uZSB0aGVyZSwgYW5kIG9uZSBvZiB0aGUgdGhpbmdzIEkgcmVhbGx5IGVuam95ZWQgd2FzIGJ1aWxkaW5nIG91dCB0ZWNobm9sb2d5IHRvIHNlZ21lbnQgbGVhZHMsIGJyaW5nIGRpZmZlcmVudCB1c2VycyBkb3duIGRpZmZlcmVudCBjb21tdW5pY2F0aW9uIHBhdGhzIGFuZCBob3cgSSBtYXBwZWQgb3V0IHRoZSBlbnRpcmUgc3lzdGVtIHVzaW5nIGNvbXBsZXggZGlhZ3JhbXMgYW5kIHdvcmtmbG93cy4gPGJyIC8+PGJyIC8+U29tZSBvZiB0aGUgdG9vbHMgd2VyZSBidWlsdCBhbmQgYmFzZWQgb24gcXVlcyBsaWtlIFJlZGlzIG9yIFJlc3F1ZSwgb3RoZXJzIHdlIGJ1aWx0IGludG8gRXhhY3RUYXJnZXQgYW5kIEN1c3RvbWVyLmlvLiBJbiB0aGUgZW5kLCBJIGJlY2FtZSBzb21ld2hhdCBvZiBhbiBleHBlcnQgYXQgbW9uZXRpemluZyBlbWFpbHMuIFdpdGhpbiBvdXIgZW1haWwgbWFya2V0aW5nIGNoYW5uZWwsIHdlIGV4cGxvcmVkIHRhZ2dpbmcgdXNlcnMgYmFzZWQgb24gdGhlaXIgYWN0aW9ucywgc3VjaCBhcyBvcGVucyBvciBub24gb3BlbnMsIG9yIHdoYXQgdGhleSBjbGlja2VkIG9uLCB3ZSB0YXJnZWQgZW1haWwgdXNlcnMgd2hvIGhhZCBiZWVuIHRvdWNoZWQgc2V2ZW4gdGltZXMgd2l0aCBzcGVjaWFsIGlycmlzaXRhYmxlIHNhbGVzLCBiZWNhdXNlIHdlIGtub3cgYWZ0ZXIgNiB0b3VjaGVzLCB3ZSBjb3VsZCBjb252ZXJ0LiBUaGVzZSB0cmlja3Mgd2UgbGVhcm5lZCBsZWQgdG8gMjUtMzBrIGRheXMsIGFuZCBldmVudHVhbGx5LCBkYXlzIHdoZXJlIHdlIHNvbGQgMTAwayB3b3J0aCBvZiBzdWJzY3JpcHRpb25zLiA8YnIgLz48YnIgLz5TbywgbXkgcG9pbnQ/IERvblxcJ3QgYmUgc3VycHJpc2VkIGlmIEkgZ2VlayBvdXQgYW5kIGZhaW50IHdoZW4gSSBoZWFyIHlvdSB0YWxrIGFib3V0IHRyYW5zYWN0aW9uYWwgZW1haWxpbmcgYW5kIGNhZGVuY2VzIGFuZCBjb25zdW1lciBqb3VybmllcyBhbmQgc3R1ZmYgbGlrZSB0aGF0LidcbiAgICB9XG4gICAge1xuICAgICAgJ2RhdGUnOiAnUG9zdGVkIGJ5IEZyYW5jaGlubyBvbiBEZWNlbWJlciAxMCwgMjAxNCdcbiAgICAgICdoZWFkaW5nJzogJ0lmIEkgY291bGQgaGF2ZSBvbmUgd2lzaDsgSSBnZXQgdG8gdXNlIHRoaXMgbWV0aG9kIHdoZW4gZGVzaWduaW5nIHlvdXIgY29uc3VtZXIgam91cm5leSBmdW5uZWwuJ1xuICAgICAgJ2F1dGhvcmltZyc6ICcvaW1nL2ZyYW5rLnBuZydcbiAgICAgICdpbWcnOiAnL2ltZy9kZWMvdXhfYm9hcmQuanBnJ1xuICAgICAgJ2Jsb2InOiAnU28gYWZ0ZXIgYSBidW5jaCBvZiBldGhub2dyYXBoaWMgc3R1ZGllcyBmcm9tIHBlcnNvbmEgbWF0Y2hlcyBJIGdhdGhlciBpbi1wZXJzb24sIEkgZ2V0IHRvIGZpbGwgYSB3YWxsIHVwIHdpdGgga2V5IHRoaW5ncyBwZW9wbGUgc2FpZCwgZmVsdCwgaGVhcmQgLSBtb3RpdmF0b3JzLCBiYXJyaWVycywgcXVlc3Rpb25zLCBhdHRpdHVkZXMgYW5kIHN1Y2guIEkgdGhlbiBncm91cCB0aGVzZSBwb3N0LWl0IHRob3VnaHRzIGluIHZhcmlvdXMgd2F5cywgbG9va2luZyBmb3IgcGF0dGVybnMsIHNlbnRpbWVudCwgbmV3IGlkZWFzLiA8YnIgLz48YnIgLz5JIHRoZW4gdGFrZSB0aGlzIHJpY2ggZGF0YSBhbmQgZGV2ZWxvcCBhIHdoYXQgY291bGQgYmUgYnJhbmRpbmcsIGEgbGFuZGluZyBwYWdlIG9yIGFuIGVtYWlsIC0gd2l0aCB3aGF0IEkgY2FsbCwgYW4gaW52ZXJ0ZWQgcHlyYW1pZCBhcHByb2FjaCB0byBjb250ZW50LCB3aGVyZSBhZGRyZXNzaW5nIHRoZSBtb3N0IGltcG9ydGFudCB0aGluZ3MgZm91bmQgaW4gdGhlIHVzZXIgcmVzZWFyY2ggZ2V0IGFkZHJlc3NlZCBpbiBhIGhlcmlhcmNoaWNhbCBvcmRlci4gSSBjcmVhdGUgNS02IGl0ZXJhdGlvbnMgb2YgdGhlIGxhbmRpbmcgcGFnZSBhbmQgcmUtcnVuIHRoZW0gdGhyb3VnaCBhIHNlY29uZCBncm91cCBvZiBwYXJ0aWNpcGFudHMsIHN0YWtlaG9sZGVycyBhbmQgZnJpZW5kcy4gSSB0aGVuIHRha2UgZXZlbiBtb3JlIG5vdGVzIG9uIHBlb3BsZXMgc3BlYWstYWxvdWQgcmVhY3Rpb25zIHRvIHRoZSBsYW5kaW5nIHBhZ2VzLiBBZnRlciB0aGlzLCBJXFwnbSByZWFkeSB0byBkZXNpZ24gdGhlIGZpbmFsIGNvcHkgYW5kIHBhZ2VzIGZvciB5b3VyIGZ1bm5lbC4nXG4gICAgfVxuICAgIHtcbiAgICAgICdkYXRlJzogJ1Bvc3RlZCBieSBGcmFuY2hpbm8gb24gRGVjZW1iZXIgOSwgMjAxNCdcbiAgICAgICdoZWFkaW5nJzogJ1dobyBzYXlzIEkgZG9uXFwndCBiZWxvbmcgaGVyZT8nXG4gICAgICAnYXV0aG9yaW1nJzogJy9pbWcvZnJhbmsucG5nJ1xuICAgICAgJ2ltZyc6ICcvaW1nL2RlYy91Y2xhLmpwZydcbiAgICAgICdibG9iJzogJ1RoaXMgY29taW5nIHdlZWtlbmQgdGhlcmVcXCdzIHByb2JhYmx5IGEgaGFja2F0aG9uIGdvaW5nIG9uIGluIHlvdXIgY2l0eS4gU29tZSBvZiB0aGVtIGFyZSBnZXR0aW5nIHJlYWxseSBiaWcuIEkgd2FzblxcJ3QgcmVnaXN0ZXJlZCBmb3IgTEEgSGFja3MgdGhpcyBzdW1tZXIuIEkgZG9uXFwndCBldmVuIGtub3cgaG93IEkgZW5kZWQgdXAgdGhlcmUgb24gYSBGcmlkYXkgbmlnaHQsIGJ1dCB3aGVuIEkgc2F3IHdoYXQgd2FzIGdvaW5nIG9uLCBJIGdyYWJiZWQgYSBjaGFpciBhbmQgc3RhcnRlZCBoYWNraW5nIGF3YXkuIFdvcnJpZWQgSSBoYWQganVzdCBzbnVjayBpbiB0aGUgYmFjayBkb29yIGFuZCBzdGFydGVkIGNvbXBldGluZywgbXkgcmlkZSBsZWZ0IGFuZCB0aGVyZSBJIHdhcywgZm9yIHRoZSBuZXh0IHR3byBkYXlzLiA8YnIgLz48YnIgLz5UaGF0XFwncyByaWdodC4gSSBzbnVjayBpbiB0aGUgYmFjayBvZiBMQSBIYWNrcyBsYXN0IHN1bW1lciBhdCBVQ0xBIGFuZCBoYWNrZWQgd2l0aCBraWRzIDEwIHllYXJzIHlvdW5nZXIgdGhhbiBtZS4gSSBjb3VsZG5cXCd0IG1pc3MgaXQuIEkgd2FzIGZsb29yZWQgd2hlbiBJIHNhdyBob3cgbWFueSBwZW9wbGUgd2VyZSBpbiBpdC4gTWUsIGJlaW5nIHRoZSBtaXNjaGV2aW91cyBoYWNrZXIgSSBhbSwgSSB0aG91Z2h0IGlmIEkgdXNlZCB0aGUgZW5lcmd5IG9mIHRoZSBlbnZpcm9ubWVudCB0byBteSBhZHZhbnRhZ2UsIEkgY291bGQgYnVpbGQgc29tZXRoaW5nIGNvb2wuIExvbmcgc3Rvcnkgc2hvcnQsIGxldCBtZSBqdXN0IHNheSwgdGhhdCBpZiB5b3UgaGF2ZSBiZWVuIGhhdmluZyBhIGhhcmQgdGltZSBsYXVuY2hpbmcsIHNpZ24gdXAgZm9yIGEgaGFja2F0aG9uLiBJdFxcJ3MgYSBndWFyYW50ZWVkIHdheSB0byBvdmVyLWNvbXBlbnNhdGUgZm9yIHlvdXIgY29uc3RhbnQgZmFpbHVyZSB0byBsYXVuY2guIE1vcmUgb24gd2hhdCBoYXBwZW5lZCB3aGVuIEkgdG9vayB0aGUgc3RhZ2UgYnkgc3VycHJpc2UgYW5kIGdvdCBib290ZWQgbGF0ZXIuLi4nXG4gICAgfVxuICAgIHtcbiAgICAgICdkYXRlJzogJ1Bvc3RlZCBieSBGcmFuY2hpbm8gb24gRGVjZW1iZXIgOCwgMjAxNCdcbiAgICAgICdoZWFkaW5nJzogJ1N0YXJ0ZWQgaW4gRW1iZXIuanMsIGZpbmlzaGVkIGluIEFuZ3VsYXIuanMuIFdoeSBhbmQgaG93IGRpZCB0aGlzIGhhcHBlbj8nXG4gICAgICAnYXV0aG9yaW1nJzogJy9pbWcvZnJhbmsucG5nJ1xuICAgICAgJ2ltZyc6ICcvaW1nL2RlYy91eDEuanBnJ1xuICAgICAgJ2Jsb2InOiAnSSBnb3QgbG92ZSBmb3IgYWxsIFNQQSBmcmFtZXdvcmtzLiBDb2xsZWN0aXZlbHksIHRoZXkgYWxsIHB1c2ggdGhlIGVudmVsb3BlLiBNeSBmaXJzdCBjbGllbnQtc2lkZSBNVkMgcHJvamVjdCB3YXMgYSBiYWNrYm9uZSBwcm9qZWN0IC0gYW5kIHdlIHN0YXJ0ZWQgd2hlbiB0aGV5IHdlcmUgaW4gQmV0YS4gVGhhdCBwcm9qZWN0IHdhcyBCZW5jaFByZXAuIEF0IHRoZSB0aW1lLCBhcyBhIGZyb250LWVuZCBkZXZlbG9wZXIsIEkgd2FzIGNvbmZ1c2VkIGJ5IHRoZSBzd2VlcGluZyBjaGFuZ2VzIHRvIGhvdyB0aGluZ3MgbmVlZGVkIHRvIGJlIGRvbmUuIEZ1bGwgZmxlZGdlZCBNVkMgZnJhbWV3b3JrcyBpbiBKYXZhU2NyaXB0IGxlbmRlZCBhIHdob2xlIG5ldyBzeW50YXgsIGFuZCB0byB0b3AgaXQgb2ZmLCBvdXIgZW5naW5lZXJzIG9uIHRoZSB0ZWFtIHdlcmUgdXNpbmcgQ29mZmVlU2NyaXB0LCBIQU1MLCBTQVNTIGFuZCBKYXNtaW5lLCBldGMuIE15IGZpcnN0IFNQQSBwcm9qZWN0IGRpZCBub3QgZ28gd2VsbCBhbmQgaXQgd2FzblxcJ3QgdW50aWwgd2UgY29tcGxldGVseSByZS13cm90ZSB0aGUgc29mdHdhcmUgdGhhdCBJIHN0YXJ0ZWQgdW5kZXJzdGFuZGluZyBldmVyeXRoaW5nIGNsZWFybHkuIFR3byB5ZWFycyBsYXRlciwgYSBuZXcgdGVhbSBJIHdhcyB3b3JraW5nIHdpdGggZGVjaWRlZCB0byBidWlsZCA8YSBocmVmPVxcJ2h0dHA6Ly9hZ2VudHJ1bi5jb21cXCcgdGFyZ2V0PVxcJ19ibGFua1xcJz5BZ2VudHJ1bi5jb208L2E+IGluIEVtYmVyLmpzLiBXZSBkb3ZlIGluLiBGb3VyIG1vbnRocyBsYXRlciwgd2UgcG9ydGVkIHRvIEFuZ3VsYXIgYW5kIHNpbmNlLCBJXFwndmUgbmV2ZXIgbG9va2VkIGJhY2suIElcXCdtIG9uIG15IGZpZnRoIG9yIHNpeHRoIGFuZ3VsYXIgcHJvamVjdCBub3cgYW5kIEkgZG9uXFwndCBwbGFuIG9uIGNoYW5naW5nIGZyYW1ld29ya3MgZm9yIGEgd2hpbGUgLSBhdCBsZWFzdCBwZXJzb25hbGx5LiA8YnIgLz48YnIgLz5UaGUgYW5ndWxhciBtb3ZlbWVudCByZW1pbmRzIG1lIHRoZSBtb3N0IG9mIHRoZSBSb1IgbW92ZW1lbnQuIEkgZG9uXFwndCBnZXQgc3R1Y2sgdHJ5aW5nIHRvIGRvIHRoaW5ncyBsaWtlIEkgZG8gaW4gQmFja2JvbmUgb3IgRW1iZXIuIEkgY291bGQgZ2V0IGludG8gZGlzY3Vzc2lvbiBhbmQgdGVjaG5pY2FsIGV4YW1wbGVzLCBidXQgdGhlcmUgYXJlIGJldHRlciBwbGFjZXMgdG8gY29tcGFyZSB0aGUgdHdvLiBJIGNhblxcJ3Qgd2FpdCBmb3IgdGhlIGNvbXBsZXRlbHkgcmV2YW1wZWQgQW5ndWxhciAyLjAgYW5kIGFtIGxvb2tpbmcgZm9yd2FyZCB0byBhIDUtNyB5ZWFyIGZ1dHVyZSB3aXRoIEFuZ3VsYXIgYmVmb3JlIHNvbWV0aGluZyBuZXcgY29tZXMgb3V0LCBzb21ldGhpbmcgdGhhdCBwZXJoYXBzIGp1c3QgYnVpbGRzIGFwcHMgZm9yIHlvdSBieSByZWFkaW5nIHlvdXIgbWluZC4gPGJyIC8+PGJyIC8+T2gsIGFuZCBpZiB5b3VyIHdvbmRlcmluZyB3aG8gZGVzaWduZWQgdGhpcyBsb3ZlbHkgd2Vic2l0ZSwgdGhhdCB3YXMgeW91cnMgdHJ1bHkuIEkgbGVkIHRoZSBVWCByZXNlYXJjaCwgVVggcHJvdG90eXBpbmcsIHVzZXIgcmVzZWFyY2ggYW5kIGdyYXBoaWMgZGVzaWduIG9mIHRoaXMgcHJvZHVjdC4nXG4gICAgfVxuICAgIHtcbiAgICAgICdkYXRlJzogJ1Bvc3RlZCBieSBGcmFuY2hpbm8gb24gRGVjZW1iZXIgNywgMjAxNCdcbiAgICAgICdoZWFkaW5nJzogJ1BsZWFzZSBkb25cXCd0IGFzayBtZSBhYm91dCBteSBhcnQgYW5kIG1peGVkIG1lZGlhIGJhY2tncm91bmQuIEkgbWlnaHQgdG90YWxseSBhdm9pZCB0aGUgcXVlc3Rpb24uJ1xuICAgICAgJ2F1dGhvcmltZyc6ICcvaW1nL2ZyYW5rLnBuZydcbiAgICAgICdpbWcnOiAnL2ltZy9kZWMvbWl4ZWQuanBnJ1xuICAgICAgJ2Jsb2InOiAnSSBoYXZlIGEgaHVnZSBjb21wbGV4IGFib3V0IG15IGh5YnJpZCBiYWNrZ3JvdW5kLiBJIGNhblxcJ3QgdGVsbCB5b3UgaG93IG1hbnkgdGltZXMgSVxcJ3ZlIGJlZW4gb24gYW4gaW50ZXJ2aWV3IHdoZXJlIElcXCd2ZSB0cmllZCB0byBleHBsYWluIHRoZSBmYWN0IHRoYXQgSVxcJ20gYW4gYXJ0aXN0IGFuZCBhIHByb2dyYW1tZXIuIFRoZSBtaW51dGUgSSBkbyB0aGlzLCBJXFwnbSBhbG1vc3QgaW5zdGFudGx5IHdyaXR0ZW4gb2ZmIGFzIGEgamFjay1vZi1hbGwgdHJhZGVzIG9yIHdlYWsgb24gb25lIHNpZGUuIDxiciAvPjxiciAvPlNvLCBJXFwnbSBhYm91dCB0byBvZmZpY2lhbGx5IGV4cGxhaW4gdG8gZXZlcnlvbmUgc29tZXRoaW5nIElcXCdtIHByZXR0eSBzZW5zYXRpdmUgYWJvdXQuIElcXCdtIGEgdmVyeSB0YWxlbnRlZCBjcmVhdGl2ZSBkaXJlY3RvciB3aXRoIGEgdmVyeSBzb3BoaXN0aWNhdGVkIHRlY2huaWNhbCBiYWNrZ3JvdW5kLiBJIG1ha2UgZXhwbGFpbmVyIHZpZGVvcywgSSBmaWxtLCBJIGRvIHVzZXIgcmVzZWFyY2gsIEkgZGVzaWduIGFuZCBJIHByb2dyYW0uIFllcywgSSBwcm9ncmFtIC0gSSB3aWxsIGZyb250LWVuZCB3aXRoIHRoZSBiZXN0IGFuZCBoYXZlIGEga25hY2sgZm9yIGZyb250LWVuZCBNVkMgZnJhbWV3b3Jrcy4gPGJyIC8+PGJyIC8+WWVzLCB0aGVyZSBhcmUgc29tZSB0aGluZ3MgSVxcJ20gbm90IGdvb2QgYXQuIElcXCdtIG5vdCB5b3VyIGdlbml1cyBwcm9ncmFtbWVyIHRoYXQgd2lsbCBsZWFkIHlvdXIgb3RoZXIgcHJvZ3JhbW1lcnMgdG8gdGhlIHByb21pc2UgbGFuZCwgYnV0IG5vdCB3ZWFrIGxpa2UgeW91ciB0aGlua2luZyAtIEkganVzdCBrbm93IGEgbG90IG9mIGhhY2tlcnMgd2hvIGRvblxcJ3QgY29uY2VybiB0aGVtc2VsdmVzIHdpdGggdGhpbmdzIHRoYXQgSSBnZXQgbG9zdCBpbiwgbGlrZSBkZXNpZ24gb3IgY29udGVudCBzdHJhdGVneSwgb3IgdXNlciByZXNlYXJjaC4gU28gd2hlbiBJIHNheSB3ZWFrLCBJIG1lYW4gd2VhayBsaWtlLCBJXFwnbSB0YWxraW5nLCBwb3NzaWJseSwgZmF1bC10b2xlcmFudCBmdW5jdGlvbmFsIHByb2dhbW1pbmcgaW4gbG93IGxldmVsIGxhbmd1YWdlcyBvciBFcmxhbmcgb3IgRWxpeGVyIHdpdGggc3VwZXJ2aXNlciBPVFAgYXJjaGl0ZWN0dXJlcyBhbmQgbWVzc2FnZSBwYXNzaW5nLiBJXFwnbSB0YWxpbmcgbWlkZGxld2FyZSBkZXZlbG9wbWVudC4gSVxcJ20gdGFsa2luZyBUREQgZGV2IGFsbCBkYXkgZXZlcnkgZGF5IG9uIGEgaGFyZGNvcmUgc2NydW0gdGVhbS4gVGhhdFxcJ3Mgbm90IG1lLiBJXFwnbSBub3QgeW91ciBsZWFkIGhlcmUsIGhvd2V2ZXIgSSB3aWxsIEpyLiBvbiB1bmRlcnN0YW5kaW5nIGhvdyBldmVyeSBsaW5lIG9mIGNvZGUgd29ya3MgaW4geW91ciBhcHAuIElcXCdtIHlvdXIgcHJvdG90eXBlciwgTVZQIGd1eSBvciBmb2xsb3cgeW91ciBsZWFkIGd1eSB3aGVuIGl0IGNvbWVzIHRvIHByb2dyYW1taW5nLiBJIGNhbiBtYWtlIGp1c3QgYWJvdXQgYW55dGhpbmcgSSB3YW50LCBidXQgZG9uXFwndCBmZWVsIGNvbWZvcnRhYmxlIGxlYWRpbmcgc2F5LCBhbiBpT1Mgb3IgSmF2YSB0ZWFtLiBJIGp1c3QgZG9uXFwndCBoYXZlIGVub3VnaCBsb3ctbGV2ZWwgcHJvZ3JhbW1pbmcgZXhwZXJpZW5jZSBpbiB0aG9zZSBwYXJ0aWN1bGFyZSBmcmFtZXdvcmtzLiBXaGVuIGl0IGNvbWVzIHRvIEphdmFTY3JpcHQsIElcXCdtIGEgNy4gVGhlcmUgaXNuXFwndCBhbnl0aGluZyB5b3UgY2FuXFwndCBhc2sgbWUgdG8gZG8gd2l0aCBKYXZhU2NyaXB0LCBmcm9tIEZhbW8udXMgdG8gTVZDIHN0dWZmIC0gaG93ZXZlciwgSVxcJ20gbm90IHlvdXIgZ3V5IHdob1xcJ3MgZ29pbmcgdG8gaW50cm9kdWNlIHRoZSBuZXh0IGJpZyBvcGVuLXNvdXJjZSB0b29sIGluIEpTLiBJXFwnbSBhIG1hY3JvIEpTIGRldmVsb3BlciAtIG1lYW5pbmcgSSBjYW4gdGFrZSBlc3RhYmxpc2hlZCBwYXR0ZXJucyBhbmQgY29tcG9uZW50cyBhbmQgY29uY2VwdHMgYW5kIHJ1biB3aXRoIHRoZW0uIEkgZG9uXFwndCBnaXZlIHRhbGtzIG9uIGJpZy1vIG5vdGF0aW9ucyBhbmQgSSBtaWdodCBub3QgYmUgZG93biBmb3IgYSA0MCBob3VyIGEgd2VlayBqb2Igb2YgaGFyZGNvcmUgVEREIHByb2dyYW1taW5nIC0gYnV0IHRoaXMgZG9lc25cXCd0IG1lYW4geW91IHNob3VsZCB3cml0ZSBtZSBvZmYgYXMgYSBnZW5lcmFsaXN0LjxiciAvPjxiciAvPlRoZSBmYWN0IGlzIHRoYXQgSVxcJ3ZlIG5ldmVyIGJlZW4gdGhlIHR5cGUgZm9yIGEgcm9sZSB3aXRoIGFuIGVhcmx5IHN0YWdlIHN0YXJ0dXAgd2hlcmUgSSBkaWRuXFwndCB3ZWFyIGEgYnVuY2ggb2YgaGF0cyBvciB0cmFuc2l0aW9uIHBlcmlvZGljYWxseSBmcm9tIGEgZGVzaWduIG1pbmRlZCB0aGlua2VyIHRvIGEgdGVjaG5pY2FsIHNjcnVtLCByZXF1aXJlbWVudCB3cml0aW5nLCBwcm9kdWMgbWFuYWdpbmcgYW5hbC1pc3QuJ1xuICAgIH1cbiAgXVxuRnJhbmNoaW5vLmNvbnRyb2xsZXIgJ0Jsb2dSb2xsQ3RybCcsICgkc2NvcGUpIC0+XG5GcmFuY2hpbm8uY29udHJvbGxlciAnQWJvdXRDdHJsJywgKCRzY29wZSkgLT5cbkZyYW5jaGluby5jb250cm9sbGVyICdBcHBDdHJsJywgKCRzY29wZSkgLT5cbkZyYW5jaGluby5jb250cm9sbGVyICdSZXN1bWVDdHJsJywgKCRzY29wZSkgLT5cbiAgJHNjb3BlLmJsb2IgPSAnPGRpdiBjbGFzcz1cInJvd1wiPjxkaXYgY2xhc3M9XCJsYXJnZS0xMlwiPjxkaXYgY2xhc3M9XCJyb3dcIj48ZGl2IGNsYXNzPVwibGFyZ2UtMTIgY29sdW1uc1wiPjxoNj5OT1YgMjAxMyAtIFBSRVNFTlQ8L2g2Pjxici8+PGgyPkh5YnJpZCBFeHBlcmllbmNlIERlc2lnbmVyL0RldmVsb3BlciwgSW5kZXBlbmRlbnQ8L2gyPjxici8+PHA+V29ya2VkIHdpdGggbm90ZWFibGUgZW50cmVwcmVub3VycyBvbiBzZXZlcmFsIG5ldyBwcm9kdWN0IGFuZCBidXNpbmVzcyBsYXVuY2hlcy4gSGVsZCBudW1lcm91cyByb2xlcywgaW5jbHVkaW5nIGNvbnRlbnQgc3RyYXRlZ2lzdCwgdXNlciByZXNlYXJjaGVyLCBkZXNpZ25lciBhbmQgZGV2ZWxvcGVyLiA8L3A+PHA+PHN0cm9uZz5Db21wYW5pZXM8L3N0cm9uZz48L3A+PHVsIGNsYXNzPVwibm9cIj48bGk+PGEgaHJlZj1cImh0dHA6Ly90YXBjZW50aXZlLmNvbVwiIHRhcmdldD1cIl9ibGFua1wiPlRhcGNlbnRpdmU8L2E+PC9saT48bGk+PGEgaHJlZj1cImh0dHA6Ly9jcGcuaW9cIiB0YXJnZXQ9XCJfYmxhbmtcIj5DUEdpbzwvYT48L2xpPjxsaT48YSBocmVmPVwiaHR0cDovL2tvdS5wbi9cIiB0YXJnZXQ9XCJfYmxhbmtcIj5Lb3UucG4gTWVkaWE8L2E+PC9saT48bGk+IDxhIGhyZWY9XCJodHRwOi8vbWVkeWNhdGlvbi5jb21cIiB0YXJnZXQ9XCJfYmxhbmtcIj5NZWR5Y2F0aW9uPC9hPjwvbGk+PGxpPiA8YSBocmVmPVwiaHR0cDovL3d3dy5zdW50aW1lcy5jb20vXCIgdGFyZ2V0PVwiX2JsYW5rXCI+Q2hpY2FnbyBTdW4gVGltZXM8L2E+PC9saT48L3VsPjxici8+PHA+PHN0cm9uZz5UYXBjZW50aXZlIERlbGl2ZXJhYmxlczwvc3Ryb25nPjwvcD48dWwgY2xhc3M9XCJidWxsZXRzXCI+PGxpPkNvbXBsZXRlIFRhcGNlbnRpdmUuY29tIG1hcmtldGluZyB3ZWJzaXRlIGFuZCBVWCBvdmVyaGF1bCBvZiBjb3JlIHByb2R1Y3QsIHRoZSBcIlRhcGNlbnRpdmUgTWFuYWdlclwiPC9saT48bGk+SW5kdXN0cmlhbCBkZXNpZ24gb2YgdGhlIFRhcGNlbnRpdmUgVG91Y2hwb2ludDwvbGk+PGxpPkNvbnRlbnQgc3RyYXRlZ3kgZm9yIGNvcnBvcmF0ZSBtYXJrZXRpbmcgc2l0ZTwvbGk+PGxpPk1vYmlsZSBmaXJzdCBtYXJrZXRpbmcgd2Vic2l0ZSB1c2luZyBJb25pYyBhbmQgQW5ndWxhcjwvbGk+PC91bD48cD48c3Ryb25nPkNQR2lvIERlbGl2ZXJhYmxlczwvc3Ryb25nPjwvcD48dWwgY2xhc3M9XCJidWxsZXRzXCI+PGxpPlByb2R1Y3QgYW5kIGJ1c2luZXNzIHN0cmF0ZWd5LCB0ZWNobmljYWwgYXJjaGl0ZWN0dXJlIGFuZCBzcGVjaWZpY2F0aW9uIGRlc2lnbjwvbGk+PGxpPk9uZSBodW5kcmVkIHBhZ2UgcHJvcG9zYWwgdGVtcGxhdGUgb24gYnVzaW5lc3MgbW9kZWwgYW5kIGNvcnBvcmF0ZSBjYXBhYmlsaXRpZXM8L2xpPjxsaT5NYXJrZXRpbmcgd2Vic2l0ZSBkZXNpZ24gYW5kIGNvbnRlbnQgc3RyYXRlZ3k8L2xpPjxsaT5Db3JlIHByb2R1Y3QgZGVzaWduIGFuZCBNVlAgZnVuY3Rpb25hbCBwcm90b3R5cGU8L2xpPjwvdWw+PHA+PHN0cm9uZz5Lb3UucG4gRGVsaXZlcmFibGVzPC9zdHJvbmc+PC9wPjx1bCBjbGFzcz1cImJ1bGxldHNcIj48bGk+S291LnBuIE1lZGlhIGJyYW5kIHJlZnJlc2g8L2xpPjxsaT5NYXJrZXRpbmcgc2l0ZSByZWRlc2lnbjwvbGk+PGxpPlBvcnRhbCB1c2VyIGV4cGVyaWVuY2Ugb3ZlcmhhdWw8L2xpPjwvdWw+PHA+PHN0cm9uZz5NZWR5Y2F0aW9uIERlbGl2ZXJhYmxlczwvc3Ryb25nPjwvcD48dWwgY2xhc3M9XCJidWxsZXRzXCI+PGxpPkNvbmNlcHR1YWwgZGVzaWduIGFuZCBhcnQgZGlyZWN0aW9uPC9saT48bGk+VXNlciByZXNlYXJjaDwvbGk+PGxpPlJhcGlkIHByb3RvdHlwZXM8L2xpPjwvdWw+PHA+PHN0cm9uZz5DaGljYWdvIFN1biBUaW1lczwvc3Ryb25nPjwvcD48dWwgY2xhc3M9XCJidWxsZXRzXCI+PGxpPkNvbmNlcHR1YWwgZGVzaWduIGFuZCBhcnQgZGlyZWN0aW9uPC9saT48bGk+TmF0aXZlIGlPUyBhbmQgQW5kcm9pZCBhcHAgZGVzaWduIGFuZCBqdW5pb3IgZGV2ZWxvcG1lbnQ8L2xpPjxsaT5IeWJyaWQgSW9uaWMvQW5ndWxhciBkZXZlbG9wbWVudDwvbGk+PC91bD48L2Rpdj48L2Rpdj48YnIvPjxkaXYgY2xhc3M9XCJyb3dcIj48ZGl2IGNsYXNzPVwibGFyZ2UtMTIgY29sdW1uc1wiPjxoNj5NQVJDSCAyMDEwIC0gT0NUT0JFUiAyMDEzPC9oNj48YnIvPjxoMj5EaXJlY3RvciBvZiBVc2VyIEV4cGVyaWVuY2UsIExpZ2h0YmFuazwvaDI+PGJyLz48cD5MYXVuY2hlZCBhbmQgc3VwcG9ydGVkIG11bHRpcGxlIG5ldyBjb21wYW5pZXMgd2l0aGluIHRoZSBMaWdodGJhbmsgcG9ydGZvbGlvLiA8L3A+PHA+PHN0cm9uZz5Db21wYW5pZXM8L3N0cm9uZz48L3A+PHVsIGNsYXNzPVwibm9cIj48bGk+IDxhIGhyZWY9XCJodHRwOi8vY2hpY2Fnb2lkZWFzLmNvbVwiIHRhcmdldD1cIl9ibGFua1wiPkNoaWNhZ29JZGVhcy5jb208L2E+PC9saT48bGk+IDxhIGhyZWY9XCJodHRwOi8vYmVuY2hwcmVwLmNvbVwiIHRhcmdldD1cIl9ibGFua1wiPkJlbmNoUHJlcC5jb208L2E+PC9saT48bGk+IDxhIGhyZWY9XCJodHRwOi8vc25hcHNoZWV0YXBwLmNvbVwiIHRhcmdldD1cIl9ibGFua1wiPlNuYXBTaGVldEFwcC5jb208L2E+PC9saT48bGk+TW9udGhseXMuY29tIChkZWZ1bmN0KTwvbGk+PGxpPiA8YSBocmVmPVwiaHR0cDovL2RvdWdoLmNvbVwiIHRhcmdldD1cIl9ibGFua1wiPkRvdWdoLmNvbTwvYT48L2xpPjxsaT4gPGEgaHJlZj1cImh0dHA6Ly9ncm91cG9uLmNvbVwiIHRhcmdldD1cIl9ibGFua1wiPkdyb3Vwb24uY29tPC9hPjwvbGk+PC91bD48YnIvPjxwPjxzdHJvbmc+Q2hpY2FnbyBJZGVhcyBEZWxpdmVyYWJsZXM8L3N0cm9uZz48L3A+PHVsIGNsYXNzPVwiYnVsbGV0c1wiPjxsaT5XZWJzaXRlIGRlc2lnbiByZWZyZXNoLCBhcnQgZGlyZWN0aW9uPC9saT48bGk+Q3VzdG9tIHRpY2tldCBwdXJjaGFzaW5nIHBsYXRmb3JtIFVYIHJlc2VhcmNoICZhbXA7IGRlc2lnbjwvbGk+PGxpPlJ1Ynkgb24gUmFpbHMgZGV2ZWxvcG1lbnQsIG1haW50ZW5lbmNlPC9saT48bGk+R3JhcGhpYyBkZXNpZ24gc3VwcG9ydDwvbGk+PGxpPkFubnVhbCByZXBvcnQgZGVzaWduPC9saT48L3VsPjxwPjxzdHJvbmc+QmVuY2hQcmVwLmNvbSBEZWxpdmVyYWJsZXM8L3N0cm9uZz48L3A+PHVsIGNsYXNzPVwiYnVsbGV0c1wiPjxsaT5SZS1icmFuZGluZywgY29tcGxldGUgQmVuY2hQcmVwIGlkZW50aXR5IHBhY2thZ2U8L2xpPjxsaT5TdXBwb3J0ZWQgY29tcGFueSB3aXRoIGFsbCBkZXNpZ24gYW5kIHV4IGZyb20gemVybyB0byBlaWdodCBtaWxsaW9uIGluIGZpbmFuY2luZzwvbGk+PGxpPkxlYWQgYXJ0IGFuZCBVWCBkaXJlY3Rpb24gZm9yIHR3byB5ZWFyczwvbGk+PGxpPkZyb250LWVuZCB1c2luZyBCYWNrYm9uZSBhbmQgQm9vdHN0cmFwPC9saT48bGk+VXNlciByZXNlYXJjaCwgZXRobm9ncmFwaGljIHN0dWRpZXMsIHVzZXIgdGVzdGluZzwvbGk+PGxpPkVtYWlsIG1hcmtldGluZyBjYWRlbmNlIHN5c3RlbSBkZXNpZ24gYW5kIGV4ZWN1dGlvbjwvbGk+PGxpPlNjcmlwdGVkLCBzdG9yeWJvYXJkZWQgYW5kIGV4ZWN1dGVkIGJvdGggYW5pbWF0ZWQgYW5kIGxpdmUgbW90aW9uIGV4cGxhaW5lciB2aWRlb3M8L2xpPjwvdWw+PHA+PHN0cm9uZz5TbmFwU2hlZXRBcHAuY29tIERlbGl2ZXJhYmxlczwvc3Ryb25nPjwvcD48dWwgY2xhc3M9XCJidWxsZXRzXCI+PGxpPkxhcmdlIHNjYWxlIHBvcnRhbCBVWCByZXNlYXJjaCBhbmQgaW5mb3JtYXRpb24gYXJjaGl0ZWN0dXJlPC9saT48bGk+VGhyZWUgcm91bmRzIG9mIHJhcGlkIHByb3RvdHlwaW5nIGFuZCB1c2VyIHRlc3Rpbmc8L2xpPjxsaT5HcmFwaGljIGRlc2lnbiBhbmQgaW50ZXJhY3Rpb24gZGVzaWduIGZyYW1ld29yazwvbGk+PGxpPlVzZXIgdGVzdGluZzwvbGk+PC91bD48cD48c3Ryb25nPk1vbnRobHlzLmNvbSBEZWxpdmVyYWJsZXM8L3N0cm9uZz48L3A+PHVsIGNsYXNzPVwiYnVsbGV0c1wiPjxsaT5JZGVudGl0eSBhbmQgYXJ0IGRpcmVjdGlvbjwvbGk+PGxpPlByb2R1Y3Qgc3RyYXRlZ3kgYW5kIG5ldyBjb21wYW55IGxhdW5jaDwvbGk+PGxpPk9ubGluZSBtYXJrZXRpbmcgc3RyYXRlZ3ksIGluY2x1ZGluZyB0cmFuc2FjdGlvbmFsIGVtYWlsLCBwcm9tb3Rpb24gZGVzaWduIGFuZCBsZWFkIGdlbmVyYXRpb248L2xpPjxsaT5Qcm9kdWN0IGV4cGVyaWVuY2UgZGVzaWduIGFuZCBmcm9udC1lbmQ8L2xpPjxsaT5Db250ZW50IHN0cmF0ZWd5PC9saT48bGk+U2NyaXB0ZWQsIHN0b3J5Ym9hcmRlZCBhbmQgZXhlY3V0ZWQgYm90aCBhbmltYXRlZCBhbmQgbGl2ZSBtb3Rpb24gZXhwbGFpbmVyIHZpZGVvczwvbGk+PC91bD48cD48c3Ryb25nPkRvdWdoLmNvbSBEZWxpdmVyYWJsZXM8L3N0cm9uZz48L3A+PHVsIGNsYXNzPVwiYnVsbGV0cyBidWxsZXRzXCI+PGxpPkNvbnN1bWVyIGpvdXJuZXkgbWFwcGluZyBhbmQgZXRobm9ncmFwaGljIHN0dWRpZXM8L2xpPjxsaT5SYXBpZCBwcm90b3R5cGluZywgY29uY2VwdHVhbCBkZXNpZ248L2xpPjxsaT5NZXNzYWdpbmcgc3RyYXRlZ3ksIHVzZXIgdGVzdGluZzwvbGk+PC91bD48cD48c3Ryb25nPkdyb3Vwb24uY29tIERlbGl2ZXJhYmxlczwvc3Ryb25nPjwvcD48dWwgY2xhc3M9XCJidWxsZXRzXCI+PGxpPkVtZXJnaW5nIG1hcmtldHMgcmVzZWFyY2g8L2xpPjxsaT5SYXBpZCBkZXNpZ24gYW5kIHByb3RvdHlwaW5nPC9saT48bGk+VmlzdWFsIGRlc2lnbiBvbiBuZXcgY29uY2VwdHM8L2xpPjxsaT5FbWFpbCBzZWdtZW50YXRpb24gcmVzZWFyY2g8L2xpPjwvdWw+PC9kaXY+PC9kaXY+PGJyLz48ZGl2IGNsYXNzPVwicm93XCI+PGRpdiBjbGFzcz1cImxhcmdlLTEyIGNvbHVtbnNcIj48aDY+Tk9WRU1CRVIgMjAwNyAtIEFQUklMIDIwMTA8L2g2Pjxici8+PGgyPkRldmVsb3BlciAmYW1wOyBDby1mb3VuZGVyLCBEaWxseWVvLmNvbTwvaDI+PGJyLz48cD5Dby1mb3VuZGVkLCBkZXNpZ25lZCBhbmQgZGV2ZWxvcGVkIGEgZGFpbHkgZGVhbCBlQ29tbWVyY2Ugd2Vic2l0ZS48L3A+PHA+PHN0cm9uZz5Sb2xlPC9zdHJvbmc+PGJyLz5EZXNpZ25lZCwgZGV2ZWxvcGVkIGFuZCBsYXVuY2hlZCBjb21wYW5pZXMgZmlyc3QgY2FydCB3aXRoIFBIUC4gSXRlcmF0ZWQgYW5kIGdyZXcgc2l0ZSB0byBtb3JlIHRoYW4gdHdvIGh1bmRyZWQgYW5kIGZpZnR5IHRob3VzYW5kIHN1YnNjcmliZXJzIGluIGxlc3MgdGhhbiBvbmUgeWVhci4gPC9wPjxwPjxzdHJvbmc+Tm90ZWFibGUgU3RhdHM8L3N0cm9uZz48L3A+PHVsIGNsYXNzPVwiYnVsbGV0c1wiPjxsaT5CdWlsdCBhIGxpc3Qgb2YgMjUwLDAwMCBzdWJzY3JpYmVycyBpbiB0aGUgZmlyc3QgeWVhcjwvbGk+PGxpPlBpdm90ZWQgYW5kIHR3ZWFrZWQgZGVzaWduLCBidXNpbmVzcyBhbmQgYXBwcm9hY2ggdG8gMTAwMCB0cmFuc2FjdGlvbnMgcGVyIGRhaWx5PC9saT48bGk+U29sZCBidXNpbmVzcyBpbiBEZWNlbWJlciAyMDA5IHRvIElubm92YXRpdmUgQ29tbWVyY2UgU29sdXRpb25zPC9saT48L3VsPjwvZGl2PjwvZGl2Pjxici8+PGRpdiBjbGFzcz1cInJvd1wiPjxkaXYgY2xhc3M9XCJsYXJnZS0xMiBjb2x1bW5zXCI+PGg2Pk1BUkNIIDIwMDUgLSBPQ1RPQkVSIDIwMDc8L2g2Pjxici8+PGgyPlNvbHV0aW9ucyBBcmNoaXRlY3QgJmFtcDsgU2VuaW9yIERldmVsb3BlciwgPGEgaHJlZj1cImh0dHA6Ly93d3cubWFuaWZlc3RkaWdpdGFsLmNvbS9cIj5NYW5pZmVzdCBEaWdpdGFsPC9hPjwvaDI+PGJyLz48cD5CdWlsdCBhbmQgbWFuYWdlZCBtdWx0aXBsZSBDYXJlZXJCdWlsZGVyLmNvbSBuaWNoZSBzaXRlcyBmb3IgdGhlIGxhcmdlc3QgaW5kZXBlbmRlbnQgYWdlbmN5IGluIHRoZSBtaWR3ZXN0LjwvcD48cD48c3Ryb25nPlJvbGU8L3N0cm9uZz48YnIvPlJlc2VhcmNoIGFuZCBleHBsb3JlIGVtZXJnaW5nIHRlY2hub2xvZ2llcywgaW1wbGVtZW50IHNvbHV0aW9ucyBhbmQgbWFuYWdlIG90aGVyIGRldmVsb3BlcnMuIFdvcmtlZCB3aXRoIGFzcC5uZXQgb24gYSBkYWlseSBiYXNpcyBmb3IgYWxtb3N0IHR3byB5ZWFycy4gPC9wPjxwPjxzdHJvbmc+Tm90ZWFibGUgQWNjb21wbGlzaG1lbnRzPC9zdHJvbmc+PC9wPjx1bCBjbGFzcz1cImJ1bGxldHNcIj48bGk+UmVjb2duaXplZCBmb3IgbGF1bmNoaW5nIGhpZ2ggcXVhbGl0eSB3ZWIgYXBwIGZvciBDYXJlZXIgQnVpbGRlciBpbiByZWNvcmQgdGltZTwvbGk+PGxpPk1hbmFnZWQgZXh0cmVtZSBTRU8gcHJvamVjdCB3aXRoIG1vcmUgdGhhbiA1MDAgdGhvdXNhbmQgbGlua3MsIHBhZ2VzIGFuZCBvdmVyIDggbWlsbGlvbiBVR0MgYXJ0aWZhY3RzPC9saT48bGk+U2hpZnRlZCBhZ2VuY2llcyBkZXZlbG9wbWVudCBwcmFjdGljZXMgdG8gdmFyaW91cyBuZXcgY2xpZW50LWNlbnRyaWMgQUpBWCBtZXRob2RvbG9naWVzPC9saT48bGk+TWFuYWdlZCBtdWx0aXBsZSBwcm9qZWN0cyBjb25jdXJyZW50bHksIGluY2x1ZGluZyBjaG9vc2VjaGljYWdvLmNvbSBhbmQgYnJpZWZpbmcuY29tPC9saT48L3VsPjwvZGl2PjwvZGl2Pjxici8+PGRpdiBjbGFzcz1cInJvd1wiPjxkaXYgY2xhc3M9XCJsYXJnZS0xMiBjb2x1bW5zXCI+PGg2PkFQUklMIDIwMDQgLSBKQU5VQVJZIDIwMDc8L2g2Pjxici8+PGgyPkp1bmlvciBQTEQgRGV2ZWxvcGVyLCAgPGEgaHJlZj1cImh0dHA6Ly93d3cuYXZlbnVlLWluYy5jb20vXCI+QXZlbnVlPC9hPjwvaDI+PGJyLz48cD5Gcm9udC1lbmQgZGV2ZWxvcGVyIGFuZCBVWCBkZXNpZ24gaW50ZXJuIGZvciBBdmVudWUgQSBSYXpvcmZpc2hzXFwnIGxlZ2FjeSBjb21wYW55LCBBdmVudWUtaW5jLjwvcD48cD48c3Ryb25nPlJvbGU8L3N0cm9uZz48YnIvPkRldmVsb3AgZnJvbnQtZW5kIGZvciBtdWx0aXBsZSBjbGllbnQgd2Vic2l0ZXMsIGluY2x1ZGluZyBmbG9yLmNvbSwgYWNoaWV2ZW1lbnQub3JnLCBjYW55b25yYW5jaC5jb20gYW5kIHR1cmJvY2hlZi48L3A+PHA+PHN0cm9uZz5Ob3RlYWJsZSBBY2NvbXBsaXNobWVudHM8L3N0cm9uZz48L3A+PHVsIGNsYXNzPVwiYnVsbGV0c1wiPjxsaT5FeGVjdXRlZCBmcm9udC1lbmQgcHJvamVjdHMgb24tdGltZSBhbmQgdW5kZXItYnVkZ2V0PC9saT48bGk+QXNzaWduZWQgVVggaW50ZXJuc2hpcCByb2xlLCByZWNvZ25pemVkIGJ5IGRlc2lnbiB0ZWFtIGFzIGEgeW91bmcgdGFsZW50PC9saT48bGk+V2lyZWZyYW1lZCBjdXN0b20gc2hvcHBpbmcgY2FydCBwbGF0Zm9ybSBmb3IgZmxvci5jb208L2xpPjxsaT5EZXZlbG9wZWQgaW50ZXJuYWwgU0VPIHByYWN0aWNlPC9saT48L3VsPjwvZGl2PjwvZGl2Pjxici8+PGRpdiBjbGFzcz1cInJvd1wiPjxkaXYgY2xhc3M9XCJsYXJnZS0xMiBjb2x1bW5zXCI+PGg2PkpVTFkgMjAwMCAtIEpBTlVBUlkgMjAwNDwvaDY+PGJyLz48aDI+ZUNvbW1lcmNlIERldmVsb3BlciwgQXRvdmE8L2gyPjxici8+PHA+R2VuZXJhbCB3ZWIgZGVzaWduZXIgYW5kIGRldmVsb3BlciBmb3IgZmFtaWx5IG93bmVkIHBhaW50IGRpc3RyaWJ1dGlvbiBidXNpbmVzcy4gPC9wPjxwPjxzdHJvbmc+Um9sZTwvc3Ryb25nPjxici8+QnVpbHQgc2V2ZXJhbCBzaG9wcGluZyBjYXJ0cyBpbiBjbGFzc2ljIEFTUCBhbmQgUEhQLiBHcmV3IGJ1c2luZXNzIHVzaW5nIG9ubGluZSBtYXJrZXRpbmcgc3RyYXRlZ2llcyB0byB0d28gbWlsbGlvbiBpbiByZXZlbnVlLiA8L3A+PHA+PHN0cm9uZz5Ob3RlYWJsZSBBY2NvbXBsaXNobWVudHM8L3N0cm9uZz48L3A+PHVsIGNsYXNzPVwiYnVsbGV0c1wiPjxsaT5CZWNhbWUgZmlyc3QgY29tcGFueSB0byBzaGlwIHBhaW50cyBhbmQgY29hdGluZ3MgYWNyb3NzIHRoZSBVbml0ZWQgU3RhdGVzPC9saT48bGk+Rmlyc3QgZW1wbG95ZWUsIGRldmVsb3BlZCBjb21wYW55IHRvIDIrIG1pbGxpb24gaW4gcmV2ZW51ZSB3aXRoIE92ZXJ0dXJlLCBHb29nbGUgQWR3b3JkcyBhbmQgU0VPPC9saT48bGk+Q3JlYXRlZCwgbWFya2V0ZWQgYW5kIHN1YnNjcmliZWQgdm9jYXRpb25hbCBzY2hvb2wgZm9yIHNwZWNpYWx0eSBjb2F0aW5nczwvbGk+PGxpPldvcmtlZCB3aXRoIHRvcCBJdGFsaWFuIHBhaW50IG1hbnVmYWN0dXJlcnMgb3ZlcnNlYXMgdG8gYnVpbGQgZXhjbHVzaXZlIGRpc3RyaWJ1dGlvbiByaWdodHM8L2xpPjwvdWw+PC9kaXY+PC9kaXY+PGJyLz48ZGl2IGNsYXNzPVwicm93XCI+PGRpdiBjbGFzcz1cImxhcmdlLTEyIGNvbHVtbnNcIj48aDY+U0VQVEVNQkVSIDIwMDAgLSBNQVkgMjAwMjwvaDY+PGJyLz48aDI+RWR1Y2F0aW9uPC9oMj48YnIvPjxwPlNlbGYgZWR1Y2F0ZWQgZGVzaWduZXIvcHJvZ3JhbW1lciB3aXRoIHZvY2F0aW9uYWwgdHJhaW5pbmcuIDwvcD48cD48c3Ryb25nPkNlcnRpZmljYXRpb25zPC9zdHJvbmc+PGJyLz5pTkVUKywgQSsgQ2VydGlmaWNhdGlvbiA8L3A+PHA+PHN0cm9uZz5BcHByZW50aWNlc2hpcDwvc3Ryb25nPjxici8+WWVhciBsb25nIHBlcnNvbmFsIGFwcHJlbnRpY2VzaGlwIHdpdGggZmlyc3QgZW5naW5lZXIgYXQgQW1hem9uLmNvbTwvcD48L2Rpdj48L2Rpdj48L2Rpdj48L2Rpdj48YnIvPjxici8+J1xuRnJhbmNoaW5vLmNvbnRyb2xsZXIgJ0pvYlRhcGNlbnRpdmVDdHJsJywgKCRzY29wZSkgLT5cbkZyYW5jaGluby5jb250cm9sbGVyICdKb2JUYXBjZW50aXZlVHdvQ3RybCcsICgkc2NvcGUpIC0+XG5GcmFuY2hpbm8uY29udHJvbGxlciAnSm9iQ3BnaW9DdHJsJywgKCRzY29wZSkgLT5cbkZyYW5jaGluby5jb250cm9sbGVyICdKb2JNZWR5Y2F0aW9uQ3RybCcsICgkc2NvcGUpIC0+XG5GcmFuY2hpbm8uY29udHJvbGxlciAnSm9iQ3N0Q3RybCcsICgkc2NvcGUpIC0+XG5GcmFuY2hpbm8uY29udHJvbGxlciAnTGFuZGluZ0N0cmwnLCAoJHNjb3BlKSAtPlxuICAjeW91dHViZSBzY3JpcHRcbiAgdGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKVxuICB0YWcuc3JjID0gXCIvL3d3dy55b3V0dWJlLmNvbS9pZnJhbWVfYXBpXCJcbiAgZmlyc3RTY3JpcHRUYWcgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKVswXVxuICBmaXJzdFNjcmlwdFRhZy5wYXJlbnROb2RlLmluc2VydEJlZm9yZSB0YWcsIGZpcnN0U2NyaXB0VGFnXG4gIHBsYXllciA9IHVuZGVmaW5lZFxuICBvbllvdVR1YmVJZnJhbWVBUElSZWFkeSA9IC0+XG4gICAgcGxheWVyID0gbmV3IFlULlBsYXllcihcInBsYXllclwiLFxuICAgICAgaGVpZ2h0OiBcIjI0NFwiXG4gICAgICB3aWR0aDogXCI0MzRcIlxuICAgICAgdmlkZW9JZDogXCJBa3lRZ3BxUnlCWVwiICMgeW91dHViZSB2aWRlbyBpZFxuICAgICAgcGxheWVyVmFyczpcbiAgICAgICAgYXV0b3BsYXk6IDBcbiAgICAgICAgcmVsOiAwXG4gICAgICAgIHNob3dpbmZvOiAwXG5cbiAgICAgIGV2ZW50czpcbiAgICAgICAgb25TdGF0ZUNoYW5nZTogb25QbGF5ZXJTdGF0ZUNoYW5nZVxuICAgIClcblxuICBvblBsYXllclN0YXRlQ2hhbmdlID0gKGV2ZW50KSAtPlxuICAgICQoXCIuc3RhcnQtdmlkZW9cIikuZmFkZUluIFwibm9ybWFsXCIgIGlmIGV2ZW50LmRhdGEgaXMgWVQuUGxheWVyU3RhdGUuRU5ERURcblxuXG5GcmFuY2hpbm8uY29udHJvbGxlciAnSm9iS291cG5DdHJsJywgKCRzY29wZSkgLT5cbkZyYW5jaGluby5jb250cm9sbGVyICdDYXN0Q3RybCcsICgkc2NvcGUpIC0+XG5GcmFuY2hpbm8uY29udHJvbGxlciAnRXhwYW5zaW9ucGFja3NDdHJsJywgKCRzY29wZSkgLT5cbkZyYW5jaGluby5jb250cm9sbGVyICdCb29rQ3RybCcsICgkc2NvcGUpIC0+XG5GcmFuY2hpbm8uY29udHJvbGxlciAnSm9iTWVkeWNhdGlvbkN0cmwnLCAoJHNjb3BlKSAtPlxuRnJhbmNoaW5vLmNvbnRyb2xsZXIgJ0pvYk1lZHljYXRpb25DdHJsJywgKCRzY29wZSkgLT5cbkZyYW5jaGluby5jb250cm9sbGVyICdKb2JUcm91bmRDdHJsJywgKCRzY29wZSkgLT5cbkZyYW5jaGluby5jb250cm9sbGVyICdKb2JNb250aGx5c09uZUN0cmwnLCAoJHNjb3BlKSAtPlxuRnJhbmNoaW5vLmNvbnRyb2xsZXIgJ0pvYk1vbnRobHlzVHdvQ3RybCcsICgkc2NvcGUpIC0+XG5GcmFuY2hpbm8uY29udHJvbGxlciAnSm9iQmVuY2hwcmVwQ3RybCcsICgkc2NvcGUpIC0+XG5GcmFuY2hpbm8uY29udHJvbGxlciAnQ29udGFjdEN0cmwnLCAoJHNjb3BlKSAtPlxuRnJhbmNoaW5vLmNvbnRyb2xsZXIgJ0RldmVsb3BlcnNDdHJsJywgKCRzY29wZSkgLT5cbkZyYW5jaGluby5jb250cm9sbGVyICdEZXZlbG9wZXJDZW50ZXJDdHJsJywgKCRzY29wZSkgLT5cbkZyYW5jaGluby5jb250cm9sbGVyICdEb2NzQ3RybCcsICgkc2NvcGUsIERvY3MpIC0+XG4gICRzY29wZS4kd2F0Y2ggKC0+XG4gICAgRG9jcy5saXN0XG4gICksIC0+XG4gICAgJHNjb3BlLmRvY3MgPSBEb2NzLmxpc3RcbkZyYW5jaGluby5jb250cm9sbGVyICdEb2NDdHJsJywgKCRzY29wZSwgJHNjZSwgJHN0YXRlUGFyYW1zLCAkdGltZW91dCwgRG9jcykgLT5cbiAgJHNjb3BlLmluZGV4ID0gaWYgJHN0YXRlUGFyYW1zLnN0ZXAgdGhlbiAkc3RhdGVQYXJhbXMuc3RlcCAtIDEgZWxzZSAwXG4gICRzY29wZS4kd2F0Y2ggKC0+XG4gICAgRG9jcy5saXN0XG4gICksIC0+XG4gICAgJHNjb3BlLmRvYyA9IERvY3MuZmluZCgkc3RhdGVQYXJhbXMucGVybWFsaW5rKVxuICAgIGlmICRzY29wZS5kb2NcbiAgICAgICRzY29wZS5zdGVwID0gJHNjb3BlLmRvYy5zdGVwc1skc2NvcGUuaW5kZXhdXG4gICAgICAkc2NvcGUuc3RlcC51cmwgPSAkc2NlLnRydXN0QXNSZXNvdXJjZVVybCgkc2NvcGUuc3RlcC51cmwpXG4gICAgICBpZiAkc2NvcGUuc3RlcC50eXBlID09ICdkaWFsb2cnXG4gICAgICAgICRzY29wZS5tZXNzYWdlSW5kZXggPSAwXG4gICAgICAgICRzY29wZS5tZXNzYWdlcyA9IFtdXG4gICAgICAgIHJldHVybiAkdGltZW91dCgkc2NvcGUubmV4dE1lc3NhZ2UsIDEwMDApXG4gICAgcmV0dXJuXG5cbiAgJHNjb3BlLmhhc01vcmVTdGVwcyA9IC0+XG4gICAgaWYgJHNjb3BlLnN0ZXBcbiAgICAgIHJldHVybiAkc2NvcGUuc3RlcC5pbmRleCA8ICRzY29wZS5kb2Muc3RlcHMubGVuZ3RoXG4gICAgcmV0dXJuXG5cbkZyYW5jaGluby5kaXJlY3RpdmUgJ215U2xpZGVzaG93JywgLT5cbiAge1xuICAgIHJlc3RyaWN0OiAnQUMnXG4gICAgbGluazogKHNjb3BlLCBlbGVtZW50LCBhdHRycykgLT5cbiAgICAgIGNvbmZpZyA9IHVuZGVmaW5lZFxuICAgICAgY29uZmlnID0gYW5ndWxhci5leHRlbmQoeyBzbGlkZXM6ICcuc2xpZGUnIH0sIHNjb3BlLiRldmFsKGF0dHJzLm15U2xpZGVzaG93KSlcbiAgICAgIHNldFRpbWVvdXQgKC0+XG4gICAgICAgICQoZWxlbWVudCkuY3ljbGUgLT5cbiAgICAgICAgICB7XG4gICAgICAgICAgICBmeDogJ2ZhZGUnXG4gICAgICAgICAgICBzcGVlZDogJ2Zhc3QnXG4gICAgICAgICAgICBuZXh0OiAnI25leHQyJ1xuICAgICAgICAgICAgcHJldjogJyNwcmV2MidcbiAgICAgICAgICAgIGNhcHRpb246ICcjYWx0LWNhcHRpb24nXG4gICAgICAgICAgICBjYXB0aW9uX3RlbXBsYXRlOiAne3tpbWFnZXMuYWx0fX0nXG4gICAgICAgICAgICBwYXVzZV9vbl9ob3ZlcjogJ3RydWUnXG4gICAgICAgICAgfVxuICAgICAgKSwgMFxuXG4gIH1cbmFuZ3VsYXIubW9kdWxlICd0YXAuY29udHJvbGxlcnMnLCBbXVxuYW5ndWxhci5tb2R1bGUoJ3RhcC5kaXJlY3RpdmVzJywgW10pLmRpcmVjdGl2ZSgnZGV2aWNlJywgLT5cbiAge1xuICAgIHJlc3RyaWN0OiAnQSdcbiAgICBsaW5rOiAtPlxuICAgICAgZGV2aWNlLmluaXQoKVxuXG4gIH1cbikuc2VydmljZSAnY29weScsICgkc2NlKSAtPlxuICBjb3B5ID0gdW5kZWZpbmVkXG4gIHRydXN0VmFsdWVzID0gdW5kZWZpbmVkXG4gIGNvcHkgPVxuICAgIGFib3V0OlxuICAgICAgaGVhZGluZzogJ1dlXFwncmUgPHN0cm9uZz50YXBwaW5nPC9zdHJvbmc+IGludG8gdGhlIGZ1dHVyZSdcbiAgICAgIHN1Yl9oZWFkaW5nOiAnVGFwY2VudGl2ZSB3YXMgY3JlYXRlZCBieSBhIHRlYW0gdGhhdCBoYXMgbGl2ZWQgdGhlIG1vYmlsZSBjb21tZXJjZSByZXZvbHV0aW9uIGZyb20gdGhlIGVhcmxpZXN0IGRheXMgb2YgbUNvbW1lcmNlIHdpdGggV0FQLCB0byBsZWFkaW5nIHRoZSBjaGFyZ2UgaW4gbW9iaWxlIHBheW1lbnRzIGFuZCBzZXJ2aWNlcyB3aXRoIE5GQyB3b3JsZHdpZGUuJ1xuICAgICAgY29weTogJzxwPkZvciB1cywgbW9iaWxlIGNvbW1lcmNlIGhhcyBhbHdheXMgYmVlbiBhYm91dCBtdWNoIG1vcmUgdGhhbiBwYXltZW50OiAgbWFya2V0aW5nLCBwcm9tb3Rpb25zLCBwcm9kdWN0IGNvbnRlbnQsIGFuZCBsb3lhbHR5LCBhbGwgY29tZSB0byBsaWZlIGluc2lkZSBhIG1vYmlsZSBwaG9uZS4gTW9iaWxlIGNvbW1lcmNlIHJlYWxseSBnZXRzIGludGVyZXN0aW5nIHdoZW4gaXQgYnJpZGdlcyB0aGUgZGlnaXRhbCBhbmQgcGh5c2ljYWwgd29ybGRzLjwvcD48cD5PdXIgZ29hbCBhdCBUYXBjZW50aXZlIGlzIHRvIGNyZWF0ZSBhIHN0YXRlLW9mLXRoZS1hcnQgbW9iaWxlIGVuZ2FnZW1lbnQgcGxhdGZvcm0gdGhhdCBlbmFibGVzIG1hcmtldGVycyBhbmQgZGV2ZWxvcGVycyB0byBjcmVhdGUgZW50aXJlbHkgbmV3IGN1c3RvbWVyIGV4cGVyaWVuY2VzIGluIHBoeXNpY2FsIGxvY2F0aW9ucyDigJMgYWxsIHdpdGggYSBtaW5pbXVtIGFtb3VudCBvZiB0ZWNobm9sb2d5IGRldmVsb3BtZW50LjwvcD48cD5XZSB0aGluayB5b3XigJlsbCBsaWtlIHdoYXQgd2XigJl2ZSBidWlsdCBzbyBmYXIuIEFuZCBqdXN0IGFzIG1vYmlsZSB0ZWNobm9sb2d5IGlzIGNvbnN0YW50bHkgZXZvbHZpbmcsIHNvIGlzIHRoZSBUYXBjZW50aXZlIHBsYXRmb3JtLiBHaXZlIGl0IGEgdGVzdCBkcml2ZSB0b2RheS48L3A+J1xuICAgIHRlYW06XG4gICAgICBoZWFkaW5nOiAnJ1xuICAgICAgYmlvczpcbiAgICAgICAgZGF2ZV9yb2xlOiAnJ1xuICAgICAgICBkYXZlX2NvcHk6ICcnXG5cbiAgdHJ1c3RWYWx1ZXMgPSAodmFsdWVzKSAtPlxuICAgIF8uZWFjaCB2YWx1ZXMsICh2YWwsIGtleSkgLT5cbiAgICAgIHN3aXRjaCB0eXBlb2YgdmFsXG4gICAgICAgIHdoZW4gJ3N0cmluZydcbiAgICAgICAgICByZXR1cm4gJHNjZS50cnVzdEFzSHRtbCh2YWwpXG4gICAgICAgIHdoZW4gJ29iamVjdCdcbiAgICAgICAgICByZXR1cm4gdHJ1c3RWYWx1ZXModmFsKVxuICAgICAgcmV0dXJuXG5cbiAgdHJ1c3RWYWx1ZXMgY29weVxuICBjb3B5XG4iLCJcbiMgbm90IHN1cmUgaWYgdGhlc2UgYXJlIGFjdHVhbGx5IGluamVjdGluZyBpbnRvIHRoZSBhcHAgbW9kdWxlIHByb3Blcmx5XG5hbmd1bGFyLm1vZHVsZShcInRhcC5jb250cm9sbGVyc1wiLCBbXSlcblxuIyBtb3ZlIGNvbnRyb2xsZXJzIGhlcmVcblxuXG5cblxuIiwiYW5ndWxhci5tb2R1bGUoXCJ0YXAuZGlyZWN0aXZlc1wiLCBbXSlcbiAgLmRpcmVjdGl2ZSBcImRldmljZVwiLCAtPlxuICAgIHJlc3RyaWN0OiBcIkFcIlxuICAgIGxpbms6IC0+XG4gICAgICBkZXZpY2UuaW5pdCgpXG5cbiAgLnNlcnZpY2UgJ2NvcHknLCAoJHNjZSkgLT5cbiAgICBjb3B5ID1cbiAgICAgIGFib3V0OlxuICAgICAgICBoZWFkaW5nOiBcIldlJ3JlIDxzdHJvbmc+dGFwcGluZzwvc3Ryb25nPiBpbnRvIHRoZSBmdXR1cmVcIlxuICAgICAgICBzdWJfaGVhZGluZzogXCJUYXBjZW50aXZlIHdhcyBjcmVhdGVkIGJ5IGEgdGVhbSB0aGF0IGhhcyBsaXZlZCB0aGUgbW9iaWxlIGNvbW1lcmNlIHJldm9sdXRpb24gZnJvbSB0aGUgZWFybGllc3QgZGF5cyBvZiBtQ29tbWVyY2Ugd2l0aCBXQVAsIHRvIGxlYWRpbmcgdGhlIGNoYXJnZSBpbiBtb2JpbGUgcGF5bWVudHMgYW5kIHNlcnZpY2VzIHdpdGggTkZDIHdvcmxkd2lkZS5cIlxuICAgICAgICBjb3B5OiBcIjxwPkZvciB1cywgbW9iaWxlIGNvbW1lcmNlIGhhcyBhbHdheXMgYmVlbiBhYm91dCBtdWNoIG1vcmUgdGhhbiBwYXltZW50OiAgbWFya2V0aW5nLCBwcm9tb3Rpb25zLCBwcm9kdWN0IGNvbnRlbnQsIGFuZCBsb3lhbHR5LCBhbGwgY29tZSB0byBsaWZlIGluc2lkZSBhIG1vYmlsZSBwaG9uZS4gTW9iaWxlIGNvbW1lcmNlIHJlYWxseSBnZXRzIGludGVyZXN0aW5nIHdoZW4gaXQgYnJpZGdlcyB0aGUgZGlnaXRhbCBhbmQgcGh5c2ljYWwgd29ybGRzLjwvcD48cD5PdXIgZ29hbCBhdCBUYXBjZW50aXZlIGlzIHRvIGNyZWF0ZSBhIHN0YXRlLW9mLXRoZS1hcnQgbW9iaWxlIGVuZ2FnZW1lbnQgcGxhdGZvcm0gdGhhdCBlbmFibGVzIG1hcmtldGVycyBhbmQgZGV2ZWxvcGVycyB0byBjcmVhdGUgZW50aXJlbHkgbmV3IGN1c3RvbWVyIGV4cGVyaWVuY2VzIGluIHBoeXNpY2FsIGxvY2F0aW9ucyDigJMgYWxsIHdpdGggYSBtaW5pbXVtIGFtb3VudCBvZiB0ZWNobm9sb2d5IGRldmVsb3BtZW50LjwvcD48cD5XZSB0aGluayB5b3XigJlsbCBsaWtlIHdoYXQgd2XigJl2ZSBidWlsdCBzbyBmYXIuIEFuZCBqdXN0IGFzIG1vYmlsZSB0ZWNobm9sb2d5IGlzIGNvbnN0YW50bHkgZXZvbHZpbmcsIHNvIGlzIHRoZSBUYXBjZW50aXZlIHBsYXRmb3JtLiBHaXZlIGl0IGEgdGVzdCBkcml2ZSB0b2RheS48L3A+XCJcbiAgICAgIHRlYW06XG4gICAgICAgIGhlYWRpbmc6IFwiXCJcbiAgICAgICAgYmlvczpcbiAgICAgICAgICBkYXZlX3JvbGU6IFwiXCJcbiAgICAgICAgICBkYXZlX2NvcHk6IFwiXCJcbiAgICBcblxuXG4gICAgdHJ1c3RWYWx1ZXMgPSAodmFsdWVzKSAtPlxuICAgICAgXy5lYWNoIHZhbHVlcywgKHZhbCwga2V5KSAtPlxuICAgICAgICBzd2l0Y2ggdHlwZW9mKHZhbClcbiAgICAgICAgICB3aGVuICdzdHJpbmcnXG4gICAgICAgICAgICAkc2NlLnRydXN0QXNIdG1sKHZhbClcbiAgICAgICAgICB3aGVuICdvYmplY3QnXG4gICAgICAgICAgICB0cnVzdFZhbHVlcyh2YWwpXG5cbiAgICB0cnVzdFZhbHVlcyhjb3B5KVxuXG4gICAgY29weVxuIiwiaWYgZGV2aWNlLmRlc2t0b3AoKVxuXG5lbHNlIGlmIGRldmljZS5tb2JpbGUoKVxuXG5cdCQgPSBkb2N1bWVudCAjIHNob3J0Y3V0XG5cdGNzc0lkID0gJ215Q3NzJyAjIHlvdSBjb3VsZCBlbmNvZGUgdGhlIGNzcyBwYXRoIGl0c2VsZiB0byBnZW5lcmF0ZSBpZC4uXG5cdGlmICEkLmdldEVsZW1lbnRCeUlkKGNzc0lkKVxuXHQgICAgaGVhZCAgPSAkLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF1cblx0ICAgIGxpbmsgID0gJC5jcmVhdGVFbGVtZW50KCdsaW5rJylcblx0ICAgIGxpbmsuaWQgICA9IGNzc0lkXG5cdCAgICBsaW5rLnJlbCAgPSAnc3R5bGVzaGVldCdcblx0ICAgIGxpbmsudHlwZSA9ICd0ZXh0L2Nzcydcblx0ICAgIGxpbmsuaHJlZiA9ICdodHRwczovL2NvZGUuaW9uaWNmcmFtZXdvcmsuY29tLzEuMC4wLWJldGEuMTMvY3NzL2lvbmljLm1pbi5jc3MnXG5cdCAgICBsaW5rLm1lZGlhID0gJ2FsbCdcblx0ICAgIGhlYWQuYXBwZW5kQ2hpbGQobGluaylcbiIsIiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==