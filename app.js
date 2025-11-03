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

    .when("/services", {
      templateUrl: "views/services.html",
      controller: "ServicesCtrl"
    })

    // individual services
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
    .when("/iwatch-repair", {
      templateUrl: "views/iwatch-repair.html",
      controller: "ServicesCtrl"
    })
    .when("/airpods-repair", {
      templateUrl: "views/airpods-repair.html",
      controller: "ServicesCtrl"
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

app.controller('ServicesCtrl', function($scope) {

  // Web3Forms access key
  $scope.web3formsAccessKey = '0894fb58-c24e-47bc-ab53-a66e1a30887e';
  
  // Initialize the selected repair option
  $scope.selectedRepairOption = 'Screen / Display Replacement';
  $scope.formSubmitted = false;
  
  // Available iPhone models
  $scope.modelOptions = [
      'iPhone 8', 'iPhone 8 Plus', 
      
      'iPhone X', 'iPhone XR', 'iPhone XS', 'iPhone XS Max',

      'iPhone 11', 'iPhone 11 Pro', 'iPhone 11 Pro Max', 'iPhone SE (2nd generation)',

      'iPhone 12', 'iPhone 12 mini', 'iPhone 12 Pro', 'iPhone 12 Pro Max',

      'iPhone 13', 'iPhone 13 mini', 'iPhone 13 Pro', 'iPhone 13 Pro Max', 'iPhone SE (3rd generation)',

      'iPhone 14', 'iPhone 14 Plus', 'iPhone 14 Pro', 'iPhone 14 Pro Max',

      'iPhone 15', 'iPhone 15 Plus', 'iPhone 15 Pro', 'iPhone 15 Pro Max',

      'iPhone 16', 'iPhone 16 Plus', 'iPhone 16 Pro', 'iPhone 16 Pro Max',
      
      'iPhone 17', 'iPhone 17 air', 'iPhone 17 Pro', 'iPhone 17 Pro Max'
  ];
  
  // Function to handle repair option selection
  $scope.selectRepairOption = function(repairOption) {
      $scope.selectedRepairOption = repairOption;
      $scope.formData.repairOption = repairOption;
  };
  
  // Function to check if a repair option is selected
  $scope.isSelected = function(repairOption) {
      return $scope.selectedRepairOption === repairOption;
  };
  
  // Initialize form data
  $scope.formData = {
      Name: '',
      Number: '',
      Model: '',
      repairOption: 'Screen / Display Replacement'
  };
  
  // Submit function
  $scope.submitForm = function() {
      // You can add form validation here
      if ($scope.formData.Name && $scope.formData.Number && $scope.formData.Model) {
          console.log('Form submitted:', $scope.formData);
          $scope.formSubmitted = true;
          
          // Reset form after 5 seconds
          setTimeout(function() {
              $scope.$apply(function() {
                  $scope.formSubmitted = false;
                  $scope.formData = {
                      Name: '',
                      Number: '',
                      Model: '',
                      repairOption: 'Screen / Display Replacement'
                  };
                  $scope.selectedRepairOption = 'Screen / Display Replacement';
              });
          }, 5000);
      } else {
          alert('Please fill all required fields');
      }
  };
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
  
  $scope.toggleMobileMenu = function() {
    $scope.isMobileMenuOpen = !$scope.isMobileMenuOpen;
    // Also trigger jQuery menu toggle
    if (window.jQuery && $('.menu-trigger').length) {
      if (!$scope.isMobileMenuOpen) {
        $('.menu-trigger').removeClass('active');
        $('.header-area .nav').slideUp(200);
      }
    }
  };
  
  // Simple function to close everything
  $scope.closeAll = function() {
    $scope.isDropdownOpen = false;
    $scope.isMobileMenuOpen = false;
    
    // Also close jQuery mobile menu
    if (window.jQuery && $('.menu-trigger').length) {
      $('.menu-trigger').removeClass('active');
      $('.header-area .nav').slideUp(200);
    }
  };
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
