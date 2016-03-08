define([
  "interface",
  "angular",
  "leaflet",
  "d3",
  "directives/ngShowAuth",
  "directives/ngHideAuth",
  "services/amort",
  "filters/reverse"
], function (__interface__, angular, L, d3) {
  Number.prototype.round = function () {
    var self = this;
    return Math.round( self * 100 ) / 100;
  };
  __interface__.directive('loanTotalReturn', [
    function () {
      return {
        restrict: 'A',
        scope: {
          'loanData': '=loanData'
        },
        link: function ($scope, element, attr) {
          console.log($scope);
          var height = 210;
          var width = 210;
          var radius = Math.min(width, height) / 2;
          var canvas = d3.select('#wrapper')
            .append('svg')
            .attr({
              'width': width,
              'height': height
            });

          var data = $scope.loanData;

          var colors = ['#A4B9B3', '#768F61'];

          var bgArc = d3.svg.arc()
            .innerRadius(0)
            .outerRadius(90);

          var arc = d3.svg.arc()
            /*
             *.innerRadius(0)
             *.outerRadius(100);
             */
            .outerRadius(radius - 10)
            .innerRadius(radius - 40)

          var arcOver = d3.svg.arc()
            .outerRadius(radius)
            .innerRadius(radius - 60)

          var pie = d3.layout.pie()
            .value(function(d) {
              return d.value;
            });

          $scope.$watch('loanData', function (newVal, oldVal) {
            if (!newVal)
              return;
            var colorscale = d3.scale.linear().domain([0, newVal.length]).range(colors);
            var canvasContext = canvas.append('g')
               .attr('transform', 'translate(100,110)')
               .selectAll('.arc')
               .data(pie(newVal))
               .enter()
               .append('g')
               .attr('class', "arc");

            canvasContext.append('path')
              .attr('d', bgArc)
              .attr('fill', '#ffffff');

            canvasContext.append('path')
              .attr('d', arc)
              .attr('fill', function(d, i) {
                 return colorscale(i);
              })
              /*
               *.on("mouseover", function(d) {
               *   d3.select(this).transition()
               *     .duration(1000)
               *     .attr("d", arcOver);
               *})
               */
              .on("mouseout", function(d) {
                 d3.select(this).transition()
                   .duration(1000)
                   .attr("d", arc);
              });

            canvasContext.append('text')
              /*
               *.attr('transform', function(d) {
               *   var c = arc.centroid(d);
               *   console.log(c);
               *   return "translate(" + c[0] + "," + c[1] + ")";
               *})
               */
              .text(function(d) {
                 if (d.data.label === 'Principal')
                    return;
                 return d.value;
              });

          });

        }
      };
    }
  ]);

  return ['$scope', '$rootScope', 'leafletData', '$http', '$q', '$anchorScroll', '$location', '$routeParams', 'Ref', '$firebaseArray', '$timeout', 'amortizationService', function ($scope, $rootScope, leafletData, $http, $q, $anchorScroll, $location, $routeParams, Ref, $firebaseArray, $timeout, amortizationService) {
    $scope.message = 'Safe and Secure Returns';
    $scope.lenderTypes = [
      {
        "title": "I'm an individual lending my own money",
        "abbrev": "own-money"
      }
    ];

    $scope.roiForm = {};
    $scope.signups = $firebaseArray(Ref.child('signups').limitToLast(10));

    $scope.signups.$loaded().catch(alert);

    $scope.submitApplication = function (newUser) {
      if ( newUser ) {
        $timeout(function () {
          $scope.$apply();
        }, 0);

        $scope.signups.$add({
          submission: $scope.roiForm
        }).catch(alert);
      }
    };

    function alert (msg) {
      $scope.err = msg;
      $timeout(function() {
        $scope.err = null;
      }, 5000);
    }

    $scope.updateLoanProfile = function () {

      $scope.roiForm.loanRate = parseFloat($scope.roiForm.loanRate);
      $scope.roiForm.loanTerms = parseFloat($scope.roiForm.loanTerms);
      $scope.roiForm.loanAmount = parseFloat($scope.roiForm.loanAmount);
      var loanInterest = $scope.roiForm.loanRate / 100;
      var loanPayments = $scope.roiForm.loanTerms;
      var loanPrincipal = $scope.roiForm.loanAmount;
      var x = Math.pow(1 + loanInterest, loanPayments)
      var monthly = (loanPrincipal * x * loanInterest) / (x - 1)
      if (!isNaN(monthly)) {
        $scope.roiForm.loanPayment = monthly.round();
        $scope.roiForm.loanTotal = (monthly * loanPayments).round();
        $scope.roiForm.loanTotalInterest = ((monthly * loanPayments) - loanPrincipal).round()
        $scope.loanData = [
          {
            "label": "Principal",
            "value": parseInt(loanPrincipal, 10)
          },
          {
            "label": "Return",
            "value": parseInt($scope.roiForm.loanTotalInterest, 10)
          }
        ];
        console.log($scope);
      } else {
        return alert('Invalid ROI contract!');
      }

    };

    try {
      $rootScope.scrollTo($routeParams.section);
    } catch (e) {
      console.log(e);
    }

    // @usage ng-repeat [] | filter: greaterThan('NumberOfX', 0)
    $scope.greaterThan = function (prop, val) {
        return function(item){
          return item[prop] > val;
        }
    };

    Object.defineProperty($scope, "queryFilter", {
        get: function() {
            var out = {};
            out[$scope.queryBy || "$"] = $scope.query;
            return out;
        }
    });

    angular.extend($scope, {
      center: {
        lat: 29.737463,
        lng: -95.397503,
        zoom: 18
      },
      defaults: {
        tileLayer: 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
        tileLayerOptions: {
          subdomains: 'abcd',
          detectRetina: true,
          reuseTiles: true
        },
        scrollWheelZoom: true,
        attributionControl: false,
        zoomControl: false
      }
    });

    leafletData.getMap('index').then(function(map) {
      new OSMBuildings(map).load();
      //L.Control.geocoder().addTo(map)
      //map.fitBounds();
      var bookIdeas = $http.get('api/v1/book/ideas');
      bookIdeas.then(function (data) {
        bookIdeasConstruct = data.data.ItemSearchResponse.Items[0];
        $scope.bookIdeas = bookIdeasConstruct.Item;
        $scope.bookIdeasTotalPages = bookIdeasConstruct.TotalPages;
        $scope.bookIdeasTotalResults = bookIdeasConstruct.TotalResults;
        $scope.bookIdeasMoreSearchResultsUrl = bookIdeasConstruct.MoreSearchResultsUrl;
      })

      var propertyData = $http.get('api/v1/3513305');
      var propertyData1 = $http.get('api/v1/3518799');
      var propertyData2 = $http.get('api/v1/3518076');
      var propertyData3 = $http.get('api/v1/3519951');
      var propertyData4 = $http.get('api/v1/3519925');
      var propertyData5 = $http.get('api/v1/3519893');
      var propertyData6 = $http.get('api/v1/3519882');
      var propertyData7 = $http.get('api/v1/3519840');
      var allProperties = $q.all([
        propertyData,
        propertyData1,
        propertyData2,
        propertyData3,
        propertyData4,
        propertyData5,
        propertyData6,
        propertyData7
      ]);
      $scope.properties = [];

      allProperties.then(function (d) {
        for(var i = 0; i < d.length; ++i) {
          var singleFamilyResidence = d[i].data.content;
          $scope.properties.push(singleFamilyResidence);
          var streetAddress = singleFamilyResidence.streetAddress;

          //console.log($scope.properties);
          try {

            L.esri.Geocoding.geocode().address(streetAddress).city('Houston').region('Texas').run(function(err, results, response){
              console.log(results);
            });
          } catch (e) {
            console.log(e);
          }
        }

      });

    });
  }];
});
