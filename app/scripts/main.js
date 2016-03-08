require.config({
  "baseUrl": "./scripts",
  "paths": {

    "interface": "app",

    "controller/main_ctrl"             : "controllers/main",
    "controller/chat_ctrl"             : "controllers/chat",
    "controller/login_ctrl"            : "controllers/login",
    "controller/account_ctrl"          : "controllers/account",
    "controller/home_ctrl"             : "controllers/home_ctrl",

    "services/geocoder" : "services/geocoder",
    "services/amort"    : "services/amort",

    "directives/ngShowAuth" : "directives/ngShowAuth",
    "directives/ngHideAuth" : "directives/ngHideAuth",
    "filters/reverse"       : "filters/reverse",
    "routes"                : "routes",

    "angular"          : "ext/angular",
    "angular-waypoints": "ext/angular-waypoints.min",
    "angular-material" : "ext/angular-material",
    "angular-route"    : "ext/angular-route",
    "angularAMD"       : "ext/angularAMD",
    "ngload"           : "ext/ngload",
    "angular-animate"  : "ext/angular-animate",
    "angular-cookies"  : "ext/angular-cookies",
    "angular-resource" : "ext/angular-resource",
    "angular-sanitize" : "ext/angular-sanitize",
    "angular-touch"    : "ext/angular-touch",
    "angular-aria"    : "ext/angular-aria",
    "angular-messages"    : "ext/angular-messages",
    "angular-storage"  : "ext/ngStorage",
    "angularfire"      : "ext/angularfire.min",
    "firebase"         : "ext/firebase",
    "lodash" : "ext/lodash",

    "leaflet": "ext/leaflet",
    "osm": "ext/OSMBuildings-Leaflet",
    "angular-leaflet-directive": "ext/angular-leaflet-directive",
    "esri-leaflet-geocoder": "ext/esri-leaflet-geocoder",
    "esri-leaflet": "ext/esri-leaflet",
    "d3": "ext/d3"
  },

  "shim": {
    "esri-leaflet": ['angular-leaflet-directive'],
    "esri-leaflet-geocoder": ["esri-leaflet"],
    "lodash": {
      "exports": "_"
    },
    "angular": {
      "exports": "angular"
    },
    "angular-waypoints": [
      "angular"
    ],
    "angular-material": [
      'angular'
    ],
    "angular-route": [
      "angular"
    ],
    "angularAMD": [
      "angular"
    ],
    "ngload": [
      "angularAMD"
    ],
    "angular-aria": [
      "angular"
    ],
    "angular-messages": [
      "angular"
    ],
    "angular-animate": [
      "angular"
    ],
    "angular-cookies": [
      "angular"
    ],
    "angular-resource": [
      "angular"
    ],
    "angular-sanitize": [
      "angular"
    ],
    "angular-touch": [
      "angular"
    ],
    "angularfire": [
      "angular",
      "firebase"
    ],
    "leaflet": {
      "deps": ["angular"],
      "exports": "L"
    },
    "osm": ['angular-leaflet-directive'],
    "angular-leaflet-directive": ['angular', 'leaflet']

  },

  "deps": ['interface']
});
