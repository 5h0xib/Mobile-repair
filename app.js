var app = angular.module('myApp', ['ngRoute', 'ngAnimate']);

app.run(function($rootScope) {
  $rootScope.$on('$viewContentLoaded', function() {
    AOS.refresh(); // simple refresh after each view load
  });
});



app.config(function($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "views/home.html",
      controller: "HomeCtrl"
    })
    .when("/Services", {
      templateUrl: "views/services.html",
      controller: "ServicesCtrl"
    })
    .when("/iphone-repair", {
      templateUrl: "views/iphone-repair.html",
      controller: "ServicesCtrl"
    })
    .when("/ipad-repair", {
      templateUrl: "views/ipad-repair.html",
      controller: "ServicesCtrl"
    })
    .when("/macbook-repair", {
      templateUrl: "views/macbook-repair.html",
      controller: "ServicesCtrl"
    })
    .when("/imac-repair", {
      templateUrl: "views/imac-repair.html",
      controller: "ServicesCtrl"
    })
    .when("/airpods-repair", {
      templateUrl: "views/airpods-repair.html",
      controller: "ServicesCtrl"
    })
    .when("/contact", {
      templateUrl: "views/contact.html",
    })
    .otherwise({
      redirectTo: "/"
    });
});

// --- Controllers ---
// Home Controller
        app.controller("HomeCtrl", function($scope) {
            // You can add any controller logic here if needed
            $scope.pageTitle = "Our Success Metrics";
        });
        
        // Custom directive for animated counter
        app.directive('acCounter', ['$window', function($window) {
            return {
                restrict: 'A',
                scope: {
                    target: '@',
                    duration: '@',
                    decimals: '@'
                },
                link: function(scope, element, attrs) {
                    var hasAnimated = false;
                    
                    // Function to check if element is in viewport
                    function isInViewport(el) {
                        var rect = el.getBoundingClientRect();
                        return (
                            rect.top >= 0 &&
                            rect.left >= 0 &&
                            rect.bottom <= ($window.innerHeight || document.documentElement.clientHeight) &&
                            rect.right <= ($window.innerWidth || document.documentElement.clientWidth)
                        );
                    }
                    
                    // Function to animate the counter
                    function animateCounter() {
                        if (hasAnimated) return;
                        
                        var target = parseFloat(scope.target);
                        var duration = parseInt(scope.duration) || 2000;
                        var decimals = parseInt(scope.decimals) || 0;
                        var step = target / (duration / 16);
                        var current = 0;
                        
                        var timer = setInterval(function() {
                            current += step;
                            if (current >= target) {
                                current = target;
                                clearInterval(timer);
                                hasAnimated = true;
                            }
                            
                            // Format the number based on decimals
                            if (decimals > 0) {
                                element.text(current.toFixed(decimals));
                            } else {
                                element.text(Math.floor(current).toLocaleString());
                            }
                        }, 16);
                    }
                    
                    // Function to handle scroll events
                    function handleScroll() {
                        if (isInViewport(element[0])) {
                            animateCounter();
                        }
                    }
                    
                    // Initial check in case counters are already in view
                    handleScroll();
                    
                    // Add scroll event listener
                    angular.element($window).on('scroll', handleScroll);
                    
                    // Clean up when directive is destroyed
                    scope.$on('$destroy', function() {
                        angular.element($window).off('scroll', handleScroll);
                    });
                }
            };
        }]);

app.controller("ServicesCtrl", function($scope) {
  $scope.title = "Services";
  $scope.message = "This is the service page content.";
});

// --- To access current path in ng-class ---
app.run(function($rootScope, $location) {
  $rootScope.location = $location;
});

// --- Reinitialize jQuery UI after every view load ---
app.run(function($rootScope) {
  $rootScope.$on('$viewContentLoaded', function() {
    initMenu(); // call menu initializer each time a new view loads
  });
});

app.controller('HeaderController', function($scope) {
  $scope.isDropdownOpen = false;
  $scope.isMobileMenuOpen = false;
  
  $scope.toggleDropdown = function() {
    $scope.isDropdownOpen = !$scope.isDropdownOpen;
  };
  
  $scope.closeDropdown = function() {
    $scope.isDropdownOpen = false;
  };
  
  $scope.toggleMobileMenu = function() {
    $scope.isMobileMenuOpen = !$scope.isMobileMenuOpen;
    // Close dropdown when mobile menu closes
    if (!$scope.isMobileMenuOpen) {
      $scope.isDropdownOpen = false;
    }
  };
  
  // Close dropdown when clicking outside (optional enhancement)
  angular.element(document).on('click', function(event) {
    if (!event.target.closest('.dropdown')) {
      $scope.$apply(function() {
        $scope.isDropdownOpen = false;
      });
    }
  });
});

// --- jQuery-based UI logic wrapped inside a function ---
function initMenu() {
  (function ($) {
    "use strict";

    // Responsive submenu
    function mobileNav() {
      var width = $(window).width();
      $('.submenu').off('click').on('click', function() {
        if (width < 992) {
          $('.submenu ul').removeClass('active');
          $(this).find('ul').toggleClass('active');
        }
      });
    }

    // Initialize mobile nav
    mobileNav();
    $(window).off('resize').on('resize', mobileNav);

    // Menu trigger
    if ($('.menu-trigger').length) {
      $(".menu-trigger").off('click').on('click', function() {
        $(this).toggleClass('active');
        $('.header-area .nav').slideToggle(200);
      });
    }

    // Smooth scroll for same-page anchors
    $('a[href*="#"]:not([href="#"])').off('click').on('click', function(e) {
      var target = $(this.hash);
      if (target.length) {
        e.preventDefault();
        var width = $(window).width();
        if (width < 991) {
          $('.menu-trigger').removeClass('active');
          $('.header-area .nav').slideUp(200);
        }
        $('html,body').animate({
          scrollTop: (target.offset().top) - 130
        }, 700);
      }
    });

    // Active link highlight on scroll
    function onScroll() {
      var scrollPos = $(document).scrollTop();
      $('.nav a').each(function() {
        var currLink = $(this);
        var refElement = $(currLink.attr("href"));
        if (refElement.length && refElement.position()) {
          if (refElement.position().top <= scrollPos &&
              refElement.position().top + refElement.height() > scrollPos) {
            $('.nav ul li a').removeClass("active");
            currLink.addClass("active");
          } else {
            currLink.removeClass("active");
          }
        }
      });
    }
    $(document).off("scroll").on("scroll", onScroll);

    // ScrollReveal animation (if available)
    if (typeof scrollReveal !== 'undefined') {
      window.sr = new scrollReveal();
    }

    // Counter animation (if plugin exists)
    if ($('.count-item').length && $.fn.counterUp) {
      $('.count-item strong').counterUp({
        delay: 10,
        time: 1000
      });
    }

    // Page loader fadeout
    $(window).on('load', function() {
      if ($('.cover').length && $.fn.parallax) {
        $('.cover').parallax({
          imageSrc: $('.cover').data('image'),
          zIndex: '1'
        });
      }

      $("#preloader").animate({ 'opacity': '0' }, 600, function() {
        setTimeout(function() {
          $("#preloader").css("visibility", "hidden").fadeOut();
        }, 300);
      });
    });

  })(window.jQuery);
}
