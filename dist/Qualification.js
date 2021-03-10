// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/rating.js":[function(require,module,exports) {
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*****
* rateyo - v2.3.5
* http://prrashi.github.io/rateyo/
* Copyright (c) 2014 Prashanth Pamidi; Licensed MIT
*****/
;

(function ($) {
  "use strict"; // The basic svg string required to generate stars

  var BASICSTAR = "<?xml version=\"1.0\" encoding=\"utf-8\"?>" + "<svg version=\"1.1\"" + "xmlns=\"http://www.w3.org/2000/svg\"" + "viewBox=\"0 12.705 512 486.59\"" + "x=\"0px\" y=\"0px\"" + "xml:space=\"preserve\">" + "<polygon " + "points=\"256.814,12.705 317.205,198.566" + " 512.631,198.566 354.529,313.435 " + "414.918,499.295 256.814,384.427 " + "98.713,499.295 159.102,313.435 " + "1,198.566 196.426,198.566 \"/>" + "</svg>"; // The Default values of different options available in the Plugin

  var DEFAULTS = {
    starWidth: "32px",
    normalFill: "gray",
    ratedFill: "#f39c12",
    numStars: 5,
    maxValue: 5,
    precision: 1,
    rating: 0,
    fullStar: false,
    halfStar: false,
    hover: true,
    readOnly: false,
    spacing: "0px",
    rtl: false,
    multiColor: null,
    onInit: null,
    onChange: null,
    onSet: null,
    starSvg: null
  }; //Default colors for multi-color rating

  var MULTICOLOR_OPTIONS = {
    startColor: "#c0392b",
    //red
    endColor: "#f1c40f" //yellow

  }; // http://stackoverflow.com/questions/11381673/detecting-a-mobile-browser

  function isMobileBrowser() {
    var check = false;
    /* jshint ignore:start */

    (function (a) {
      if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    /* jshint ignore:end */


    return check;
  }

  function checkPrecision(value, minValue, maxValue) {
    /*
     * This function removes the unnecessary precision, at Min and Max Values
     */
    // Its like comparing 0.0 with 0, which is true
    if (value === minValue) {
      value = minValue;
    } else if (value === maxValue) {
      value = maxValue;
    }

    return value;
  }

  function checkBounds(value, minValue, maxValue) {
    /*
     * Check if the value is between min and max values, if not, throw an error
     */
    var isValid = value >= minValue && value <= maxValue;

    if (!isValid) {
      throw Error("Invalid Rating, expected value between " + minValue + " and " + maxValue);
    }

    return value;
  }

  function isDefined(value) {
    // Better way to check if a variable is defined or not
    return typeof value !== "undefined";
  } // Regex to match Colors in Hex Format like #FF00FF


  var hexRegex = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i;

  var hexToRGB = function hexToRGB(hex) {
    /*
     * Extracts and returns the Red, Blue, Green Channel values,
     * in the form of decimals
     */
    if (!hexRegex.test(hex)) {
      return null;
    }

    var hexValues = hexRegex.exec(hex),
        r = parseInt(hexValues[1], 16),
        g = parseInt(hexValues[2], 16),
        b = parseInt(hexValues[3], 16);
    return {
      r: r,
      g: g,
      b: b
    };
  };

  function getChannelValue(startVal, endVal, percent) {
    /*
     * Returns a value between `startVal` and `endVal` based on the percent
     */
    var newVal = (endVal - startVal) * (percent / 100);
    newVal = Math.round(startVal + newVal).toString(16);

    if (newVal.length === 1) {
      newVal = "0" + newVal;
    }

    return newVal;
  }

  function getColor(startColor, endColor, percent) {
    /*
     * Given the percentage( `percent` ) of `endColor` to be mixed
     * with the `startColor`, returns the mixed color.
     * Colors should be only in Hex Format
     */
    if (!startColor || !endColor) {
      return null;
    }

    percent = isDefined(percent) ? percent : 0;
    startColor = hexToRGB(startColor);
    endColor = hexToRGB(endColor);
    var r = getChannelValue(startColor.r, endColor.r, percent),
        b = getChannelValue(startColor.b, endColor.b, percent),
        g = getChannelValue(startColor.g, endColor.g, percent);
    return "#" + r + g + b;
  }

  function RateYo($node, options) {
    /*
     * The Contructor, whose instances are used by plugin itself
     */
    // Storing the HTML element as a property, for future access
    this.node = $node.get(0);
    var that = this; // Remove any stuff that is present inside the container, and add the plugin class

    $node.empty().addClass("jq-ry-container");
    /*
     * Basically the plugin displays the rating using two rows of stars lying one above
     * the other, the row that is on the top represents the actual rating, and the one
     * behind acts just like a background.
     *
     * `$groupWrapper`: is an element that wraps both the rows
     * `$normalGroup`: is the container for row of stars thats behind and
     *                 acts as background
     * `$ratedGroup`: is the container for row of stars that display the actual rating.
     *
     * The rating is displayed by adjusting the width of `$ratedGroup`
     */

    var $groupWrapper = $("<div/>").addClass("jq-ry-group-wrapper").appendTo($node);
    var $normalGroup = $("<div/>").addClass("jq-ry-normal-group").addClass("jq-ry-group").appendTo($groupWrapper);
    var $ratedGroup = $("<div/>").addClass("jq-ry-rated-group").addClass("jq-ry-group").appendTo($groupWrapper);
    /*
     * Variable `step`: store the value of the rating for each star
     *                  eg: if `maxValue` is 5 and `numStars` is 5, value of each star
     *                      is 1.
     * Variable `starWidth`: stores the decimal value of width of star in units of px
     * Variable `percentOfStar`: stores the percentage of width each star takes w.r.t
     *                           the container
     * Variable `spacing`: stores the decimal value of the spacing between stars
     *                     in the units of px
     * Variable `percentOfSpacing`: stores the percentage of width of the spacing
     *                              between stars w.r.t the container
     */

    var step,
        starWidth,
        percentOfStar,
        spacing,
        percentOfSpacing,
        containerWidth,
        minValue = 0;
    /*
     * `currentRating` contains rating that is being displayed at the latest point of
     * time.
     *
     * When ever you hover over the plugin UI, the rating value changes
     * according to the place where you point the cursor, currentRating contains
     * the current value of rating that is being shown in the UI
     */

    var currentRating = options.rating; // A flag to store if the plugin is already being displayed in the UI

    var isInitialized = false;

    function showRating(ratingVal) {
      /*
       * The function is responsible for displaying the rating by changing
       * the width of `$ratedGroup`
       */
      if (!isDefined(ratingVal)) {
        ratingVal = options.rating;
      } // Storing the value that is being shown in `currentRating`.


      currentRating = ratingVal;
      var numStarsToShow = ratingVal / step; // calculating the percentage of width of $ratedGroup with respect to its parent

      var percent = numStarsToShow * percentOfStar;

      if (numStarsToShow > 1) {
        // adding the percentage of space that is taken by the gap the stars
        percent += (Math.ceil(numStarsToShow) - 1) * percentOfSpacing;
      }

      setRatedFill(options.ratedFill);
      percent = options.rtl ? 100 - percent : percent;

      if (percent < 0) {
        percent = 0;
      } else if (percent > 100) {
        percent = 100;
      }

      $ratedGroup.css("width", percent + "%");
    }

    function setContainerWidth() {
      /*
       * Set the width of the `this.node` based on the width of each star and
       * the space between them
       */
      containerWidth = starWidth * options.numStars + spacing * (options.numStars - 1);
      percentOfStar = starWidth / containerWidth * 100;
      percentOfSpacing = spacing / containerWidth * 100;
      $node.width(containerWidth);
      showRating();
    }

    function setStarWidth(newWidth) {
      /*
       * Set the width and height of each SVG star, called whenever one changes the
       * `starWidth` option
       */
      // The width and height of the star should be the same
      var starHeight = options.starWidth = newWidth;
      starWidth = window.parseFloat(options.starWidth.replace("px", ""));
      $normalGroup.find("svg").attr({
        width: options.starWidth,
        height: starHeight
      });
      $ratedGroup.find("svg").attr({
        width: options.starWidth,
        height: starHeight
      });
      setContainerWidth();
      return $node;
    }

    function setSpacing(newSpacing) {
      /*
       * Set spacing between the SVG stars, called whenever one changes
       * the `spacing` option
       */
      options.spacing = newSpacing;
      spacing = parseFloat(options.spacing.replace("px", ""));
      $normalGroup.find("svg:not(:first-child)").css({
        "margin-left": newSpacing
      });
      $ratedGroup.find("svg:not(:first-child)").css({
        "margin-left": newSpacing
      });
      setContainerWidth();
      return $node;
    }

    function setNormalFill(newFill) {
      /*
       * Set the background fill of the Stars, called whenever one changes the
       * `normalFill` option
       */
      options.normalFill = newFill;
      var $svgs = (options.rtl ? $ratedGroup : $normalGroup).find("svg");
      $svgs.attr({
        fill: options.normalFill
      });
      return $node;
    }
    /*
     * Store the recent `ratedFill` option in a variable
     * so that if multiColor is unset, we can use the perviously set `ratedFill`
     * from this variable
     */


    var ratedFill = options.ratedFill;

    function setRatedFill(newFill) {
      /*
       * Set ratedFill of the stars, called when one changes the `ratedFill` option
       */

      /*
       * If `multiColor` option is set, `newFill` variable is dynamically set
       * based on the rating, what ever set as parameter will be discarded
       */
      if (options.multiColor) {
        var ratingDiff = currentRating - minValue,
            percentCovered = ratingDiff / options.maxValue * 100;
        var colorOpts = options.multiColor || {},
            startColor = colorOpts.startColor || MULTICOLOR_OPTIONS.startColor,
            endColor = colorOpts.endColor || MULTICOLOR_OPTIONS.endColor;
        newFill = getColor(startColor, endColor, percentCovered);
      } else {
        ratedFill = newFill;
      }

      options.ratedFill = newFill;
      var $svgs = (options.rtl ? $normalGroup : $ratedGroup).find("svg");
      $svgs.attr({
        fill: options.ratedFill
      });
      return $node;
    }

    function setRtl(newValue) {
      newValue = !!newValue;
      options.rtl = newValue;
      setNormalFill(options.normalFill);
      showRating();
    }

    function setMultiColor(colorOptions) {
      /*
       * called whenever one changes the `multiColor` option
       */
      options.multiColor = colorOptions; // set the recently set `ratedFill` option, if multiColor Options are unset

      setRatedFill(colorOptions ? colorOptions : ratedFill);
    }

    function setNumStars(newValue) {
      /*
       * Set the number of stars to use to display the rating, called whenever one
       * changes the `numStars` option
       */
      options.numStars = newValue;
      step = options.maxValue / options.numStars;
      $normalGroup.empty();
      $ratedGroup.empty();

      for (var i = 0; i < options.numStars; i++) {
        $normalGroup.append($(options.starSvg || BASICSTAR));
        $ratedGroup.append($(options.starSvg || BASICSTAR));
      }

      setStarWidth(options.starWidth);
      setNormalFill(options.normalFill);
      setSpacing(options.spacing);
      showRating();
      return $node;
    }

    function setMaxValue(newValue) {
      /*
       * set the Maximum Value of rating to be allowed, called whenever
       * one changes the `maxValue` option
       */
      options.maxValue = newValue;
      step = options.maxValue / options.numStars;

      if (options.rating > newValue) {
        setRating(newValue);
      }

      showRating();
      return $node;
    }

    function setPrecision(newValue) {
      /*
       * Set the precision of the rating value, called if one changes the
       * `precision` option
       */
      options.precision = newValue;
      setRating(options.rating);
      return $node;
    }

    function setHalfStar(newValue) {
      /*
       * This function will be called if one changes the `halfStar` option
       */
      options.halfStar = newValue;
      return $node;
    }

    function setFullStar(newValue) {
      /*
       * This function will be called if one changes the `fullStar` option
       */
      options.fullStar = newValue;
      return $node;
    }

    function round(value) {
      /*
       * Rounds the value of rating if `halfStar` or `fullStar` options are chosen
       */
      var remainder = value % step,
          halfStep = step / 2,
          isHalfStar = options.halfStar,
          isFullStar = options.fullStar;

      if (!isFullStar && !isHalfStar) {
        return value;
      }

      if (isFullStar || isHalfStar && remainder > halfStep) {
        value += step - remainder;
      } else {
        value = value - remainder;

        if (remainder > 0) {
          value += halfStep;
        }
      }

      return value;
    }

    function calculateRating(e) {
      /*
       * Calculates and returns the rating based on the position of cursor w.r.t the
       * plugin container
       */
      var position = $normalGroup.offset(),
          nodeStartX = position.left,
          nodeEndX = nodeStartX + $normalGroup.width();
      var maxValue = options.maxValue; // The x-coordinate(position) of the mouse pointer w.r.t page

      var pageX = e.pageX;
      var calculatedRating = 0; // If the mouse pointer is to the left of the container

      if (pageX < nodeStartX) {
        calculatedRating = minValue;
      } else if (pageX > nodeEndX) {
        // If the mouse pointer is right of the container
        calculatedRating = maxValue;
      } else {
        // If the mouse pointer is inside the continer

        /*
         * The fraction of width covered by the pointer w.r.t to the total width
         * of the container.
         */
        var calcPrcnt = (pageX - nodeStartX) / (nodeEndX - nodeStartX);

        if (spacing > 0) {
          /*
           * If there is spacing between stars, take the percentage of width covered
           * and subtract the percentage of width covered by stars and spacing, to find
           * how many stars are covered, the number of stars covered is the rating
           *
           * TODO: I strongly feel that this logic can be improved!, Please help!
           */
          calcPrcnt *= 100;
          var remPrcnt = calcPrcnt;

          while (remPrcnt > 0) {
            if (remPrcnt > percentOfStar) {
              calculatedRating += step;
              remPrcnt -= percentOfStar + percentOfSpacing;
            } else {
              calculatedRating += remPrcnt / percentOfStar * step;
              remPrcnt = 0;
            }
          }
        } else {
          /*
           * If there is not spacing between stars, the fraction of width covered per
           * `maxValue` is the rating
           */
          calculatedRating = calcPrcnt * options.maxValue;
        } // Round the rating if `halfStar` or `fullStar` options are chosen


        calculatedRating = round(calculatedRating);
      }

      if (options.rtl) {
        calculatedRating = maxValue - calculatedRating;
      }

      return parseFloat(calculatedRating);
    }

    function setReadOnly(newValue) {
      /*
       * UnBinds mouse event handlers, called when whenever one changes the
       * `readOnly` option
       */
      options.readOnly = newValue;
      $node.attr("readonly", true);
      unbindEvents();

      if (!newValue) {
        $node.removeAttr("readonly");
        bindEvents();
      }

      return $node;
    }

    function setRating(newValue) {
      /*
       * Sets the rating of the Plugin, Called when option `rating` is changed
       * or, when `rating` method is called
       */
      var rating = newValue;
      var maxValue = options.maxValue;

      if (typeof rating === "string") {
        // If rating is given in percentage, maxValue should be 100
        if (rating[rating.length - 1] === "%") {
          rating = rating.substr(0, rating.length - 1);
          maxValue = 100;
          setMaxValue(maxValue);
        }

        rating = parseFloat(rating);
      }

      checkBounds(rating, minValue, maxValue);
      rating = parseFloat(rating.toFixed(options.precision));
      checkPrecision(parseFloat(rating), minValue, maxValue);
      options.rating = rating;
      showRating();

      if (isInitialized) {
        $node.trigger("rateyo.set", {
          rating: rating
        });
      }

      return $node;
    }

    function setOnInit(method) {
      /*
       * set what method to be called on Initialization
       */
      options.onInit = method;
      return $node;
    }

    function setOnSet(method) {
      /*
       * set what method to be called when rating is set
       */
      options.onSet = method;
      return $node;
    }

    function setOnChange(method) {
      /*
       * set what method to be called rating in the UI is changed
       */
      options.onChange = method;
      return $node;
    }

    this.rating = function (newValue) {
      /*
       * rating getter/setter
       */
      if (!isDefined(newValue)) {
        return options.rating;
      }

      setRating(newValue);
      return $node;
    };

    this.destroy = function () {
      /*
       * Removes the Rating UI by clearing the content, and removing the custom classes
       */
      if (!options.readOnly) {
        unbindEvents();
      }

      RateYo.prototype.collection = deleteInstance($node.get(0), this.collection);
      $node.removeClass("jq-ry-container").children().remove();
      return $node;
    };

    this.method = function (methodName) {
      /*
       * Method to call the methods of RateYo Instance
       */
      if (!methodName) {
        throw Error("Method name not specified!");
      }

      if (!isDefined(this[methodName])) {
        throw Error("Method " + methodName + " doesn't exist!");
      }

      var args = Array.prototype.slice.apply(arguments, []),
          params = args.slice(1),
          method = this[methodName];
      return method.apply(this, params);
    };

    this.option = function (optionName, param) {
      /*
       * Method to get/set Options
       */
      if (!isDefined(optionName)) {
        return options;
      }

      var method;

      switch (optionName) {
        case "starWidth":
          method = setStarWidth;
          break;

        case "numStars":
          method = setNumStars;
          break;

        case "normalFill":
          method = setNormalFill;
          break;

        case "ratedFill":
          method = setRatedFill;
          break;

        case "multiColor":
          method = setMultiColor;
          break;

        case "maxValue":
          method = setMaxValue;
          break;

        case "precision":
          method = setPrecision;
          break;

        case "rating":
          method = setRating;
          break;

        case "halfStar":
          method = setHalfStar;
          break;

        case "fullStar":
          method = setFullStar;
          break;

        case "readOnly":
          method = setReadOnly;
          break;

        case "spacing":
          method = setSpacing;
          break;

        case "rtl":
          method = setRtl;
          break;

        case "onInit":
          method = setOnInit;
          break;

        case "onSet":
          method = setOnSet;
          break;

        case "onChange":
          method = setOnChange;
          break;

        default:
          throw Error("No such option as " + optionName);
      }

      return isDefined(param) ? method(param) : options[optionName];
    };

    function onMouseEnter(e) {
      if (!options.hover) {
        return;
      }
      /*
       * If the Mouse Pointer is inside the container, calculate and show the rating
       * in UI
       */


      var rating = calculateRating(e).toFixed(options.precision);
      var maxValue = options.maxValue;
      rating = checkPrecision(parseFloat(rating), minValue, maxValue);
      showRating(rating);
      $node.trigger("rateyo.change", {
        rating: rating
      });
    }

    function onMouseLeave() {
      if (isMobileBrowser() || !options.hover) {
        return;
      }
      /*
       * If mouse leaves, revert the rating in UI to previously set rating,
       * when empty value is passed to showRating, it will take the previously set
       * rating
       */


      showRating();
      $node.trigger("rateyo.change", {
        rating: options.rating
      });
    }

    function onMouseClick(e) {
      /*
       * On clicking the mouse inside the container, calculate and set the rating
       */
      var resultantRating = calculateRating(e).toFixed(options.precision);
      resultantRating = parseFloat(resultantRating);
      that.rating(resultantRating);
    }

    function onInit(e, data) {
      if (options.onInit && typeof options.onInit === "function") {
        /* jshint validthis:true */
        options.onInit.apply(this, [data.rating, that]);
      }
    }

    function onChange(e, data) {
      if (options.onChange && typeof options.onChange === "function") {
        /* jshint validthis:true */
        options.onChange.apply(this, [data.rating, that]);
      }
    }

    function onSet(e, data) {
      if (options.onSet && typeof options.onSet === "function") {
        /* jshint validthis:true */
        options.onSet.apply(this, [data.rating, that]);
      }
    }

    function bindEvents() {
      $node.on("mousemove", onMouseEnter).on("mouseenter", onMouseEnter).on("mouseleave", onMouseLeave).on("click", onMouseClick).on("rateyo.init", onInit).on("rateyo.change", onChange).on("rateyo.set", onSet);
    }

    function unbindEvents() {
      $node.off("mousemove", onMouseEnter).off("mouseenter", onMouseEnter).off("mouseleave", onMouseLeave).off("click", onMouseClick).off("rateyo.init", onInit).off("rateyo.change", onChange).off("rateyo.set", onSet);
    }

    setNumStars(options.numStars);
    setReadOnly(options.readOnly);

    if (options.rtl) {
      setRtl(options.rtl);
    }

    this.collection.push(this);
    this.rating(options.rating, true);
    isInitialized = true;
    $node.trigger("rateyo.init", {
      rating: options.rating
    });
  }

  RateYo.prototype.collection = [];

  function getInstance(node, collection) {
    /*
     * Given a HTML element (node) and a collection of RateYo instances,
     * this function will search through the collection and return the matched
     * instance having the node
     */
    var instance;
    $.each(collection, function () {
      if (node === this.node) {
        instance = this;
        return false;
      }
    });
    return instance;
  }

  function deleteInstance(node, collection) {
    /*
     * Given a HTML element (node) and a collection of RateYo instances,
     * this function will search through the collection and delete the
     * instance having the node, and return the modified collection
     */
    $.each(collection, function (index) {
      if (node === this.node) {
        var firstPart = collection.slice(0, index),
            secondPart = collection.slice(index + 1, collection.length);
        collection = firstPart.concat(secondPart);
        return false;
      }
    });
    return collection;
  }

  function _rateYo(options) {
    var rateYoInstances = RateYo.prototype.collection;
    /* jshint validthis:true */

    var $nodes = $(this);

    if ($nodes.length === 0) {
      return $nodes;
    }

    var args = Array.prototype.slice.apply(arguments, []);

    if (args.length === 0) {
      //If args length is 0, Initialize the UI with default settings
      options = args[0] = {};
    } else if (args.length === 1 && _typeof(args[0]) === "object") {
      //If an Object is specified as first argument, it is considered as options
      options = args[0];
    } else if (args.length >= 1 && typeof args[0] === "string") {
      /*
       * if there is only one argument, and if its a string, it is supposed to be a
       * method name, if more than one argument is specified, the remaining arguments
       * except the first argument, will be passed as a params to the specified method
       */
      var methodName = args[0],
          params = args.slice(1);
      var result = [];
      $.each($nodes, function (i, node) {
        var existingInstance = getInstance(node, rateYoInstances);

        if (!existingInstance) {
          throw Error("Trying to set options before even initialization");
        }

        var method = existingInstance[methodName];

        if (!method) {
          throw Error("Method " + methodName + " does not exist!");
        }

        var returnVal = method.apply(existingInstance, params);
        result.push(returnVal);
      });
      /*
       * If the plugin in being called on only one jQuery Element, return only the
       * first value, to support chaining.
       */

      result = result.length === 1 ? result[0] : result;
      return result;
    } else {
      throw Error("Invalid Arguments");
    }
    /*
     * if only options are passed, extend default options, and if the plugin is not
     * initialized on a particular jQuery element, initalize RateYo on it
     */


    options = $.extend({}, DEFAULTS, options);
    return $.each($nodes, function () {
      var existingInstance = getInstance(this, rateYoInstances);

      if (existingInstance) {
        return existingInstance;
      }

      var $node = $(this),
          dataAttrs = {},
          optionsCopy = $.extend({}, options);
      $.each($node.data(), function (key, value) {
        if (key.indexOf("rateyo") !== 0) {
          return;
        }

        var optionName = key.replace(/^rateyo/, "");
        optionName = optionName[0].toLowerCase() + optionName.slice(1);
        dataAttrs[optionName] = value;
        delete optionsCopy[optionName];
      });
      return new RateYo($(this), $.extend({}, dataAttrs, optionsCopy));
    });
  }

  function rateYo() {
    /* jshint validthis:true */
    return _rateYo.apply(this, Array.prototype.slice.apply(arguments, []));
  }

  window.RateYo = RateYo;
  $.fn.rateYo = rateYo;
})(window.jQuery);
},{}],"Styles/rating.css":[function(require,module,exports) {

},{}],"../node_modules/@pnp/common/util.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCtxCallback = getCtxCallback;
exports.dateAdd = dateAdd;
exports.combine = combine;
exports.getRandomString = getRandomString;
exports.getGUID = getGUID;
exports.isFunc = isFunc;
exports.objectDefinedNotNull = objectDefinedNotNull;
exports.isArray = isArray;
exports.assign = assign;
exports.isUrlAbsolute = isUrlAbsolute;
exports.stringIsNullOrEmpty = stringIsNullOrEmpty;
exports.sanitizeGuid = sanitizeGuid;
exports.jsS = jsS;
exports.hOP = hOP;
exports.getHashCode = getHashCode;

/**
 * Gets a callback function which will maintain context across async calls.
 * Allows for the calling pattern getCtxCallback(thisobj, method, methodarg1, methodarg2, ...)
 *
 * @param context The object that will be the 'this' value in the callback
 * @param method The method to which we will apply the context and parameters
 * @param params Optional, additional arguments to supply to the wrapped method when it is invoked
 */
function getCtxCallback(context, method) {
  var params = [];

  for (var _i = 2; _i < arguments.length; _i++) {
    params[_i - 2] = arguments[_i];
  }

  return function () {
    method.apply(context, params);
  };
}
/**
 * Adds a value to a date
 *
 * @param date The date to which we will add units, done in local time
 * @param interval The name of the interval to add, one of: ['year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second']
 * @param units The amount to add to date of the given interval
 *
 * http://stackoverflow.com/questions/1197928/how-to-add-30-minutes-to-a-javascript-date-object
 */


function dateAdd(date, interval, units) {
  var ret = new Date(date.toString()); // don't change original date

  switch (interval.toLowerCase()) {
    case "year":
      ret.setFullYear(ret.getFullYear() + units);
      break;

    case "quarter":
      ret.setMonth(ret.getMonth() + 3 * units);
      break;

    case "month":
      ret.setMonth(ret.getMonth() + units);
      break;

    case "week":
      ret.setDate(ret.getDate() + 7 * units);
      break;

    case "day":
      ret.setDate(ret.getDate() + units);
      break;

    case "hour":
      ret.setTime(ret.getTime() + units * 3600000);
      break;

    case "minute":
      ret.setTime(ret.getTime() + units * 60000);
      break;

    case "second":
      ret.setTime(ret.getTime() + units * 1000);
      break;

    default:
      ret = undefined;
      break;
  }

  return ret;
}
/**
 * Combines an arbitrary set of paths ensuring and normalizes the slashes
 *
 * @param paths 0 to n path parts to combine
 */


function combine() {
  var paths = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    paths[_i] = arguments[_i];
  }

  return paths.filter(function (path) {
    return !stringIsNullOrEmpty(path);
  }).map(function (path) {
    return path.replace(/^[\\|\/]/, "").replace(/[\\|\/]$/, "");
  }).join("/").replace(/\\/g, "/");
}
/**
 * Gets a random string of chars length
 *
 * https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
 *
 * @param chars The length of the random string to generate
 */


function getRandomString(chars) {
  var text = new Array(chars);

  for (var i = 0; i < chars; i++) {
    text[i] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(Math.floor(Math.random() * 62));
  }

  return text.join("");
}
/**
 * Gets a random GUID value
 *
 * http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
 */

/* tslint:disable no-bitwise */


function getGUID() {
  var d = Date.now();
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === "x" ? r : r & 0x3 | 0x8).toString(16);
  });
}
/* tslint:enable */

/**
 * Determines if a given value is a function
 *
 * @param cf The thing to test for functionness
 */


function isFunc(f) {
  return typeof f === "function";
}
/**
 * Determines if an object is both defined and not null
 * @param obj Object to test
 */


function objectDefinedNotNull(obj) {
  return typeof obj !== "undefined" && obj !== null;
}
/**
 * @returns whether the provided parameter is a JavaScript Array or not.
*/


function isArray(array) {
  return Array.isArray ? Array.isArray(array) : array && typeof array.length === "number" && array.constructor === Array;
}
/**
 * Provides functionality to extend the given object by doing a shallow copy
 *
 * @param target The object to which properties will be copied
 * @param source The source object from which properties will be copied
 * @param noOverwrite If true existing properties on the target are not overwritten from the source
 * @param filter If provided allows additional filtering on what properties are copied (propName: string) => boolean
 *
 */


function assign(target, source, noOverwrite, filter) {
  if (noOverwrite === void 0) {
    noOverwrite = false;
  }

  if (filter === void 0) {
    filter = function () {
      return true;
    };
  }

  if (!objectDefinedNotNull(source)) {
    return target;
  } // ensure we don't overwrite things we don't want overwritten


  var check = noOverwrite ? function (o, i) {
    return !(i in o);
  } : function () {
    return true;
  }; // final filter we will use

  var f = function (v) {
    return check(target, v) && filter(v);
  };

  return Object.getOwnPropertyNames(source).filter(f).reduce(function (t, v) {
    t[v] = source[v];
    return t;
  }, target);
}
/**
 * Determines if a given url is absolute
 *
 * @param url The url to check to see if it is absolute
 */


function isUrlAbsolute(url) {
  return /^https?:\/\/|^\/\//i.test(url);
}
/**
 * Determines if a string is null or empty or undefined
 *
 * @param s The string to test
 */


function stringIsNullOrEmpty(s) {
  return s === undefined || s === null || s.length < 1;
}
/**
 * Ensures guid values are represented consistently as "ea123463-137d-4ae3-89b8-cf3fc578ca05"
 *
 * @param guid The candidate guid
 */


function sanitizeGuid(guid) {
  if (stringIsNullOrEmpty(guid)) {
    return guid;
  }

  var matches = /([0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12})/i.exec(guid);
  return matches === null ? guid : matches[1];
}
/**
 * Shorthand for JSON.stringify
 *
 * @param o Any type of object
 */


function jsS(o) {
  return JSON.stringify(o);
}
/**
 * Shorthand for Object.hasOwnProperty
 *
 * @param o Object to check for
 * @param p Name of the property
 */


function hOP(o, p) {
  return Object.hasOwnProperty.call(o, p);
}
/**
 * Generates a ~unique hash code
 *
 * From: https://stackoverflow.com/questions/6122571/simple-non-secure-hash-function-for-javascript
 */
// tslint:disable:no-bitwise


function getHashCode(s) {
  var hash = 0;

  if (s.length === 0) {
    return hash;
  }

  for (var i = 0; i < s.length; i++) {
    var chr = s.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }

  return hash;
} // tslint:enable:no-bitwise
},{}],"../node_modules/@pnp/common/collections.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.objectToMap = objectToMap;
exports.mergeMaps = mergeMaps;

var _util = require("./util");

/**
 * Used to calculate the object properties, with polyfill if needed
 */
var objectEntries = (0, _util.isFunc)(Object.entries) ? Object.entries : function (o) {
  return Object.keys(o).map(function (k) {
    return [k, o[k]];
  });
};
/**
 * Converts the supplied object to a map
 *
 * @param o The object to map
 */

function objectToMap(o) {
  if (o !== undefined && o !== null) {
    return new Map(objectEntries(o));
  }

  return new Map();
}
/**
 * Merges to Map instances together, overwriting values in target with matching keys, last in wins
 *
 * @param target map into which the other maps are merged
 * @param maps One or more maps to merge into the target
 */


function mergeMaps(target) {
  var maps = [];

  for (var _i = 1; _i < arguments.length; _i++) {
    maps[_i - 1] = arguments[_i];
  }

  for (var i = 0; i < maps.length; i++) {
    maps[i].forEach(function (v, k) {
      target.set(k, v);
    });
  }

  return target;
}
},{"./util":"../node_modules/@pnp/common/util.js"}],"../node_modules/@pnp/common/libconfig.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setup = setup;
exports.RuntimeConfig = exports.RuntimeConfigImpl = void 0;

var _collections = require("./collections");

function setup(config) {
  RuntimeConfig.assign(config);
} // lable mapping for known config values


var s = ["defaultCachingStore", "defaultCachingTimeoutSeconds", "globalCacheDisable", "enableCacheExpiration", "cacheExpirationIntervalMilliseconds", "spfxContext", "ie11"];

var RuntimeConfigImpl =
/** @class */
function () {
  function RuntimeConfigImpl(_v) {
    if (_v === void 0) {
      _v = new Map();
    }

    this._v = _v; // setup defaults

    this._v.set(s[0], "session");

    this._v.set(s[1], 60);

    this._v.set(s[2], false);

    this._v.set(s[3], false);

    this._v.set(s[4], 750);

    this._v.set(s[5], null);

    this._v.set(s[6], false);
  }
  /**
   *
   * @param config The set of properties to add to the globa configuration instance
   */


  RuntimeConfigImpl.prototype.assign = function (config) {
    this._v = (0, _collections.mergeMaps)(this._v, (0, _collections.objectToMap)(config));
  };

  RuntimeConfigImpl.prototype.get = function (key) {
    return this._v.get(key);
  };

  Object.defineProperty(RuntimeConfigImpl.prototype, "defaultCachingStore", {
    get: function () {
      return this.get(s[0]);
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(RuntimeConfigImpl.prototype, "defaultCachingTimeoutSeconds", {
    get: function () {
      return this.get(s[1]);
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(RuntimeConfigImpl.prototype, "globalCacheDisable", {
    get: function () {
      return this.get(s[2]);
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(RuntimeConfigImpl.prototype, "enableCacheExpiration", {
    get: function () {
      return this.get(s[3]);
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(RuntimeConfigImpl.prototype, "cacheExpirationIntervalMilliseconds", {
    get: function () {
      return this.get(s[4]);
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(RuntimeConfigImpl.prototype, "spfxContext", {
    get: function () {
      return this.get(s[5]);
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(RuntimeConfigImpl.prototype, "ie11", {
    get: function () {
      return this.get(s[6]);
    },
    enumerable: true,
    configurable: true
  });
  return RuntimeConfigImpl;
}();

exports.RuntimeConfigImpl = RuntimeConfigImpl;

var _runtimeConfig = new RuntimeConfigImpl();

var RuntimeConfig = _runtimeConfig;
exports.RuntimeConfig = RuntimeConfig;
},{"./collections":"../node_modules/@pnp/common/collections.js"}],"../node_modules/tslib/tslib.es6.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.__extends = __extends;
exports.__rest = __rest;
exports.__decorate = __decorate;
exports.__param = __param;
exports.__metadata = __metadata;
exports.__awaiter = __awaiter;
exports.__generator = __generator;
exports.__exportStar = __exportStar;
exports.__values = __values;
exports.__read = __read;
exports.__spread = __spread;
exports.__spreadArrays = __spreadArrays;
exports.__await = __await;
exports.__asyncGenerator = __asyncGenerator;
exports.__asyncDelegator = __asyncDelegator;
exports.__asyncValues = __asyncValues;
exports.__makeTemplateObject = __makeTemplateObject;
exports.__importStar = __importStar;
exports.__importDefault = __importDefault;
exports.__assign = void 0;

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

/* global Reflect, Promise */
var extendStatics = function (d, b) {
  extendStatics = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (d, b) {
    d.__proto__ = b;
  } || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
  };

  return extendStatics(d, b);
};

function __extends(d, b) {
  extendStatics(d, b);

  function __() {
    this.constructor = d;
  }

  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function () {
  exports.__assign = __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

exports.__assign = __assign;

function __rest(s, e) {
  var t = {};

  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
}

function __decorate(decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
  return function (target, key) {
    decorator(target, key, paramIndex);
  };
}

function __metadata(metadataKey, metadataValue) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : new P(function (resolve) {
        resolve(result.value);
      }).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}

function __generator(thisArg, body) {
  var _ = {
    label: 0,
    sent: function () {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) try {
      if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
      if (y = 0, t) op = [op[0] & 2, t.value];

      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;

        case 4:
          _.label++;
          return {
            value: op[1],
            done: false
          };

        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;

        case 7:
          op = _.ops.pop();

          _.trys.pop();

          continue;

        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }

          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }

          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }

          if (t && _.label < t[2]) {
            _.label = t[2];

            _.ops.push(op);

            break;
          }

          if (t[2]) _.ops.pop();

          _.trys.pop();

          continue;
      }

      op = body.call(thisArg, _);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
}

function __exportStar(m, exports) {
  for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}

function __values(o) {
  var m = typeof Symbol === "function" && o[Symbol.iterator],
      i = 0;
  if (m) return m.call(o);
  return {
    next: function () {
      if (o && i >= o.length) o = void 0;
      return {
        value: o && o[i++],
        done: !o
      };
    }
  };
}

function __read(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o),
      r,
      ar = [],
      e;

  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  } catch (error) {
    e = {
      error: error
    };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }

  return ar;
}

function __spread() {
  for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));

  return ar;
}

function __spreadArrays() {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;

  for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) r[k] = a[j];

  return r;
}

;

function __await(v) {
  return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var g = generator.apply(thisArg, _arguments || []),
      i,
      q = [];
  return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () {
    return this;
  }, i;

  function verb(n) {
    if (g[n]) i[n] = function (v) {
      return new Promise(function (a, b) {
        q.push([n, v, a, b]) > 1 || resume(n, v);
      });
    };
  }

  function resume(n, v) {
    try {
      step(g[n](v));
    } catch (e) {
      settle(q[0][3], e);
    }
  }

  function step(r) {
    r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
  }

  function fulfill(value) {
    resume("next", value);
  }

  function reject(value) {
    resume("throw", value);
  }

  function settle(f, v) {
    if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
  }
}

function __asyncDelegator(o) {
  var i, p;
  return i = {}, verb("next"), verb("throw", function (e) {
    throw e;
  }), verb("return"), i[Symbol.iterator] = function () {
    return this;
  }, i;

  function verb(n, f) {
    i[n] = o[n] ? function (v) {
      return (p = !p) ? {
        value: __await(o[n](v)),
        done: n === "return"
      } : f ? f(v) : v;
    } : f;
  }
}

function __asyncValues(o) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var m = o[Symbol.asyncIterator],
      i;
  return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () {
    return this;
  }, i);

  function verb(n) {
    i[n] = o[n] && function (v) {
      return new Promise(function (resolve, reject) {
        v = o[n](v), settle(resolve, reject, v.done, v.value);
      });
    };
  }

  function settle(resolve, reject, d, v) {
    Promise.resolve(v).then(function (v) {
      resolve({
        value: v,
        done: d
      });
    }, reject);
  }
}

function __makeTemplateObject(cooked, raw) {
  if (Object.defineProperty) {
    Object.defineProperty(cooked, "raw", {
      value: raw
    });
  } else {
    cooked.raw = raw;
  }

  return cooked;
}

;

function __importStar(mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
  result.default = mod;
  return result;
}

function __importDefault(mod) {
  return mod && mod.__esModule ? mod : {
    default: mod
  };
}
},{}],"../node_modules/@pnp/common/safe-global.js":[function(require,module,exports) {
var global = arguments[3];
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.safeGlobal = void 0;
// export either window or global
var safeGlobal = typeof global === "undefined" ? window : global;
exports.safeGlobal = safeGlobal;
},{}],"../node_modules/@pnp/common/net.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mergeHeaders = mergeHeaders;
exports.mergeOptions = mergeOptions;
exports.getADALResource = getADALResource;
exports.SPFxAdalClient = exports.BearerTokenFetchClient = exports.FetchClient = void 0;

var _tslib = require("tslib");

var _util = require("./util");

var _safeGlobal = require("./safe-global");

function mergeHeaders(target, source) {
  if ((0, _util.objectDefinedNotNull)(source)) {
    var temp = new Request("", {
      headers: source
    });
    temp.headers.forEach(function (value, name) {
      target.append(name, value);
    });
  }
}

function mergeOptions(target, source) {
  if ((0, _util.objectDefinedNotNull)(source)) {
    var headers = (0, _util.assign)(target.headers || {}, source.headers);
    target = (0, _util.assign)(target, source);
    target.headers = headers;
  }
}
/**
 * Parses out the root of the request url to use as the resource when getting the token
 *
  * @param url The url to parse
 */


function getADALResource(url) {
  var u = new URL(url);
  return u.protocol + "//" + u.hostname;
}
/**
 * Makes requests using the global/window fetch API
 */


var FetchClient =
/** @class */
function () {
  function FetchClient() {}

  FetchClient.prototype.fetch = function (url, options) {
    return _safeGlobal.safeGlobal.fetch(url, options);
  };

  return FetchClient;
}();

exports.FetchClient = FetchClient;

/**
 * Makes requests using the fetch API adding the supplied token to the Authorization header
 */
var BearerTokenFetchClient =
/** @class */
function (_super) {
  (0, _tslib.__extends)(BearerTokenFetchClient, _super);

  function BearerTokenFetchClient(_token) {
    var _this = _super.call(this) || this;

    _this._token = _token;
    return _this;
  }

  Object.defineProperty(BearerTokenFetchClient.prototype, "token", {
    get: function () {
      return this._token || "";
    },
    set: function (token) {
      this._token = token;
    },
    enumerable: true,
    configurable: true
  });

  BearerTokenFetchClient.prototype.fetch = function (url, options) {
    if (options === void 0) {
      options = {};
    }

    var headers = new Headers();
    mergeHeaders(headers, options.headers);
    headers.set("Authorization", "Bearer " + this._token);
    options.headers = headers;
    return _super.prototype.fetch.call(this, url, options);
  };

  return BearerTokenFetchClient;
}(FetchClient);

exports.BearerTokenFetchClient = BearerTokenFetchClient;

/**
 * Client wrapping the aadTokenProvider available from SPFx >= 1.6
 */
var SPFxAdalClient =
/** @class */
function (_super) {
  (0, _tslib.__extends)(SPFxAdalClient, _super);
  /**
   *
   * @param context provide the appropriate SPFx Context object
   */

  function SPFxAdalClient(context) {
    var _this = _super.call(this, null) || this;

    _this.context = context;
    return _this;
  }
  /**
   * Executes a fetch request using the supplied url and options
   *
   * @param url Absolute url of the request
   * @param options Any options
   */


  SPFxAdalClient.prototype.fetch = function (url, options) {
    return (0, _tslib.__awaiter)(this, void 0, void 0, function () {
      var token;
      return (0, _tslib.__generator)(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4
            /*yield*/
            , this.getToken(getADALResource(url))];

          case 1:
            token = _a.sent();
            this.token = token;
            return [2
            /*return*/
            , _super.prototype.fetch.call(this, url, options)];
        }
      });
    });
  };
  /**
   * Gets an AAD token for the provided resource using the SPFx AADTokenProvider
   *
   * @param resource Resource for which a token is to be requested (ex: https://graph.microsoft.com)
   */


  SPFxAdalClient.prototype.getToken = function (resource) {
    return (0, _tslib.__awaiter)(this, void 0, void 0, function () {
      var provider;
      return (0, _tslib.__generator)(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4
            /*yield*/
            , this.context.aadTokenProviderFactory.getTokenProvider()];

          case 1:
            provider = _a.sent();
            return [2
            /*return*/
            , provider.getToken(resource)];
        }
      });
    });
  };

  return SPFxAdalClient;
}(BearerTokenFetchClient);

exports.SPFxAdalClient = SPFxAdalClient;
},{"tslib":"../node_modules/tslib/tslib.es6.js","./util":"../node_modules/@pnp/common/util.js","./safe-global":"../node_modules/@pnp/common/safe-global.js"}],"../node_modules/@pnp/common/storage.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PnPClientStorage = exports.PnPClientStorageWrapper = void 0;

var _tslib = require("tslib");

var _util = require("./util");

var _libconfig = require("./libconfig");

/**
 * A wrapper class to provide a consistent interface to browser based storage
 *
 */
var PnPClientStorageWrapper =
/** @class */
function () {
  /**
   * Creates a new instance of the PnPClientStorageWrapper class
   *
   * @constructor
   */
  function PnPClientStorageWrapper(store, defaultTimeoutMinutes) {
    if (defaultTimeoutMinutes === void 0) {
      defaultTimeoutMinutes = -1;
    }

    this.store = store;
    this.defaultTimeoutMinutes = defaultTimeoutMinutes;
    this.enabled = this.test(); // if the cache timeout is enabled call the handler
    // this will clear any expired items and set the timeout function

    if (_libconfig.RuntimeConfig.enableCacheExpiration) {
      this.cacheExpirationHandler();
    }
  }

  PnPClientStorageWrapper.bind = function (store) {
    return new PnPClientStorageWrapper(typeof store === "undefined" ? new MemoryStorage() : store);
  };
  /**
   * Get a value from storage, or null if that value does not exist
   *
   * @param key The key whose value we want to retrieve
   */


  PnPClientStorageWrapper.prototype.get = function (key) {
    if (!this.enabled) {
      return null;
    }

    var o = this.store.getItem(key);

    if (!(0, _util.objectDefinedNotNull)(o)) {
      return null;
    }

    var persistable = JSON.parse(o);

    if (new Date(persistable.expiration) <= new Date()) {
      this.delete(key);
      return null;
    } else {
      return persistable.value;
    }
  };
  /**
   * Adds a value to the underlying storage
   *
   * @param key The key to use when storing the provided value
   * @param o The value to store
   * @param expire Optional, if provided the expiration of the item, otherwise the default is used
   */


  PnPClientStorageWrapper.prototype.put = function (key, o, expire) {
    if (this.enabled) {
      this.store.setItem(key, this.createPersistable(o, expire));
    }
  };
  /**
   * Deletes a value from the underlying storage
   *
   * @param key The key of the pair we want to remove from storage
   */


  PnPClientStorageWrapper.prototype.delete = function (key) {
    if (this.enabled) {
      this.store.removeItem(key);
    }
  };
  /**
   * Gets an item from the underlying storage, or adds it if it does not exist using the supplied getter function
   *
   * @param key The key to use when storing the provided value
   * @param getter A function which will upon execution provide the desired value
   * @param expire Optional, if provided the expiration of the item, otherwise the default is used
   */


  PnPClientStorageWrapper.prototype.getOrPut = function (key, getter, expire) {
    return (0, _tslib.__awaiter)(this, void 0, void 0, function () {
      var o;
      return (0, _tslib.__generator)(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (!this.enabled) {
              return [2
              /*return*/
              , getter()];
            }

            o = this.get(key);
            if (!(o === null)) return [3
            /*break*/
            , 2];
            return [4
            /*yield*/
            , getter()];

          case 1:
            o = _a.sent();
            this.put(key, o, expire);
            _a.label = 2;

          case 2:
            return [2
            /*return*/
            , o];
        }
      });
    });
  };
  /**
   * Deletes any expired items placed in the store by the pnp library, leaves other items untouched
   */


  PnPClientStorageWrapper.prototype.deleteExpired = function () {
    return (0, _tslib.__awaiter)(this, void 0, void 0, function () {
      var i, key;
      return (0, _tslib.__generator)(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (!this.enabled) {
              return [2
              /*return*/
              ];
            }

            i = 0;
            _a.label = 1;

          case 1:
            if (!(i < this.store.length)) return [3
            /*break*/
            , 4];
            key = this.store.key(i);
            if (!(key !== null)) return [3
            /*break*/
            , 3];
            if (!/["|']?pnp["|']? ?: ?1/i.test(this.store.getItem(key))) return [3
            /*break*/
            , 3]; // get those items as get will delete from cache if they are expired

            return [4
            /*yield*/
            , this.get(key)];

          case 2:
            // get those items as get will delete from cache if they are expired
            _a.sent();

            _a.label = 3;

          case 3:
            i++;
            return [3
            /*break*/
            , 1];

          case 4:
            return [2
            /*return*/
            ];
        }
      });
    });
  };
  /**
   * Used to determine if the wrapped storage is available currently
   */


  PnPClientStorageWrapper.prototype.test = function () {
    var str = "t";

    try {
      this.store.setItem(str, str);
      this.store.removeItem(str);
      return true;
    } catch (e) {
      return false;
    }
  };
  /**
   * Creates the persistable to store
   */


  PnPClientStorageWrapper.prototype.createPersistable = function (o, expire) {
    if (expire === undefined) {
      // ensure we are by default inline with the global library setting
      var defaultTimeout = _libconfig.RuntimeConfig.defaultCachingTimeoutSeconds;

      if (this.defaultTimeoutMinutes > 0) {
        defaultTimeout = this.defaultTimeoutMinutes * 60;
      }

      expire = (0, _util.dateAdd)(new Date(), "second", defaultTimeout);
    }

    return (0, _util.jsS)({
      pnp: 1,
      expiration: expire,
      value: o
    });
  };
  /**
   * Deletes expired items added by this library in this.store and sets a timeout to call itself
   */


  PnPClientStorageWrapper.prototype.cacheExpirationHandler = function () {
    var _this = this;

    if (!this.enabled) {
      return;
    }

    this.deleteExpired().then(function (_) {
      // call ourself in the future
      setTimeout((0, _util.getCtxCallback)(_this, _this.cacheExpirationHandler), _libconfig.RuntimeConfig.cacheExpirationIntervalMilliseconds);
    }).catch(console.error);
  };

  return PnPClientStorageWrapper;
}();

exports.PnPClientStorageWrapper = PnPClientStorageWrapper;

/**
 * A thin implementation of in-memory storage for use in nodejs
 */
var MemoryStorage =
/** @class */
function () {
  function MemoryStorage(_store) {
    if (_store === void 0) {
      _store = new Map();
    }

    this._store = _store;
  }

  Object.defineProperty(MemoryStorage.prototype, "length", {
    get: function () {
      return this._store.size;
    },
    enumerable: true,
    configurable: true
  });

  MemoryStorage.prototype.clear = function () {
    this._store.clear();
  };

  MemoryStorage.prototype.getItem = function (key) {
    return this._store.get(key);
  };

  MemoryStorage.prototype.key = function (index) {
    return Array.from(this._store)[index][0];
  };

  MemoryStorage.prototype.removeItem = function (key) {
    this._store.delete(key);
  };

  MemoryStorage.prototype.setItem = function (key, data) {
    this._store.set(key, data);
  };

  return MemoryStorage;
}();
/**
 * A class that will establish wrappers for both local and session storage
 */


var PnPClientStorage =
/** @class */
function () {
  /**
   * Creates a new instance of the PnPClientStorage class
   *
   * @constructor
   */
  function PnPClientStorage(_local, _session) {
    if (_local === void 0) {
      _local = null;
    }

    if (_session === void 0) {
      _session = null;
    }

    this._local = _local;
    this._session = _session;
  }

  Object.defineProperty(PnPClientStorage.prototype, "local", {
    /**
     * Provides access to the local storage of the browser
     */
    get: function () {
      if (this._local === null) {
        this._local = new PnPClientStorageWrapper(typeof localStorage === "undefined" ? new MemoryStorage() : localStorage);
      }

      return this._local;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(PnPClientStorage.prototype, "session", {
    /**
     * Provides access to the session storage of the browser
     */
    get: function () {
      if (this._session === null) {
        this._session = new PnPClientStorageWrapper(typeof sessionStorage === "undefined" ? new MemoryStorage() : sessionStorage);
      }

      return this._session;
    },
    enumerable: true,
    configurable: true
  });
  return PnPClientStorage;
}();

exports.PnPClientStorage = PnPClientStorage;
},{"tslib":"../node_modules/tslib/tslib.es6.js","./util":"../node_modules/@pnp/common/util.js","./libconfig":"../node_modules/@pnp/common/libconfig.js"}],"../node_modules/@pnp/common/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _collections = require("./collections");

Object.keys(_collections).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _collections[key];
    }
  });
});

var _libconfig = require("./libconfig");

Object.keys(_libconfig).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _libconfig[key];
    }
  });
});

var _net = require("./net");

Object.keys(_net).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _net[key];
    }
  });
});

var _storage = require("./storage");

Object.keys(_storage).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _storage[key];
    }
  });
});

var _util = require("./util");

Object.keys(_util).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _util[key];
    }
  });
});

var _safeGlobal = require("./safe-global");

Object.keys(_safeGlobal).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _safeGlobal[key];
    }
  });
});
},{"./collections":"../node_modules/@pnp/common/collections.js","./libconfig":"../node_modules/@pnp/common/libconfig.js","./net":"../node_modules/@pnp/common/net.js","./storage":"../node_modules/@pnp/common/storage.js","./util":"../node_modules/@pnp/common/util.js","./safe-global":"../node_modules/@pnp/common/safe-global.js"}],"../node_modules/@pnp/sp/splibconfig.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setup = setup;
exports.SPRuntimeConfig = exports.SPRuntimeConfigImpl = exports.emptyGuid = void 0;

var _common = require("@pnp/common");

var emptyGuid = "00000000-0000-0000-0000-000000000000";
exports.emptyGuid = emptyGuid;

function setup(config) {
  _common.RuntimeConfig.assign(config);
}

var SPRuntimeConfigImpl =
/** @class */
function () {
  function SPRuntimeConfigImpl() {}

  Object.defineProperty(SPRuntimeConfigImpl.prototype, "headers", {
    get: function () {
      var spPart = _common.RuntimeConfig.get("sp");

      if (spPart !== undefined && spPart.headers !== undefined) {
        return spPart.headers;
      }

      return {};
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(SPRuntimeConfigImpl.prototype, "baseUrl", {
    get: function () {
      var spPart = _common.RuntimeConfig.get("sp");

      if (spPart !== undefined && spPart.baseUrl !== undefined) {
        return spPart.baseUrl;
      }

      if ((0, _common.objectDefinedNotNull)(_common.RuntimeConfig.spfxContext)) {
        return _common.RuntimeConfig.spfxContext.pageContext.web.absoluteUrl;
      }

      return null;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(SPRuntimeConfigImpl.prototype, "fetchClientFactory", {
    get: function () {
      var spPart = _common.RuntimeConfig.get("sp");

      if (spPart !== undefined && spPart.fetchClientFactory !== undefined) {
        return spPart.fetchClientFactory;
      } else {
        return function () {
          return new _common.FetchClient();
        };
      }
    },
    enumerable: true,
    configurable: true
  });
  return SPRuntimeConfigImpl;
}();

exports.SPRuntimeConfigImpl = SPRuntimeConfigImpl;
var SPRuntimeConfig = new SPRuntimeConfigImpl();
exports.SPRuntimeConfig = SPRuntimeConfig;
},{"@pnp/common":"../node_modules/@pnp/common/index.js"}],"../node_modules/@pnp/sp/rest.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sp = exports.SPRest = void 0;

var _splibconfig = require("./splibconfig");

/**
 * Root of the SharePoint REST module
 */
var SPRest =
/** @class */
function () {
  /**
   * Creates a new instance of the SPRest class
   *
   * @param options Additional options
   * @param baseUrl A string that should form the base part of the url
   */
  function SPRest(_options, _baseUrl) {
    if (_options === void 0) {
      _options = {};
    }

    if (_baseUrl === void 0) {
      _baseUrl = "";
    }

    this._options = _options;
    this._baseUrl = _baseUrl;
  }
  /**
   * Configures instance with additional options and baseUrl.
   * Provided configuration used by other objects in a chain
   *
   * @param options Additional options
   * @param baseUrl A string that should form the base part of the url
   */


  SPRest.prototype.configure = function (options, baseUrl) {
    if (baseUrl === void 0) {
      baseUrl = "";
    }

    return new SPRest(options, baseUrl);
  };
  /**
   * Global SharePoint configuration options
   *
   * @param config The SharePoint configuration to apply
   */


  SPRest.prototype.setup = function (config) {
    if (config.pageContext) {
      (0, _splibconfig.setup)({
        spfxContext: config
      });
    } else {
      (0, _splibconfig.setup)(config);
    }
  };

  return SPRest;
}();

exports.SPRest = SPRest;
var sp = new SPRest();
exports.sp = sp;
},{"./splibconfig":"../node_modules/@pnp/sp/splibconfig.js"}],"../node_modules/@pnp/odata/batch.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Batch = void 0;

var _common = require("@pnp/common");

var Batch =
/** @class */
function () {
  function Batch(_batchId) {
    if (_batchId === void 0) {
      _batchId = (0, _common.getGUID)();
    }

    this._batchId = _batchId;
    this._reqs = [];
    this._deps = [];
    this._rDeps = [];
    this._index = -1;
  }

  Object.defineProperty(Batch.prototype, "batchId", {
    get: function () {
      return this._batchId;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Batch.prototype, "requests", {
    /**
     * The requests contained in this batch
     */
    get: function () {
      // we sort these each time this is accessed
      return this._reqs.sort(function (info1, info2) {
        return info1.index - info2.index;
      });
    },
    enumerable: true,
    configurable: true
  });
  /**
   * Not meant for use directly
   *
   * @param batchee The IQueryable for this batch to track in order
   */

  Batch.prototype.track = function (batchee) {
    batchee.data.batch = this; // we need to track the order requests are added to the batch to ensure we always
    // operate on them in order

    if (typeof batchee.data.batchIndex === "undefined" || batchee.data.batchIndex < 0) {
      batchee.data.batchIndex = ++this._index;
    }
  };
  /**
   * Adds the given request context to the batch for execution
   *
   * @param context Details of the request to batch
   */


  Batch.prototype.add = function (context) {
    var info = {
      id: context.requestId,
      index: context.batchIndex,
      method: context.method.toUpperCase(),
      options: context.options,
      parser: context.parser,
      reject: null,
      resolve: null,
      url: context.url
    }; // we create a new promise that will be resolved within the batch

    var p = new Promise(function (resolve, reject) {
      info.resolve = resolve;
      info.reject = reject;
    });

    this._reqs.push(info);

    return p;
  };
  /**
   * Adds a dependency insuring that some set of actions will occur before a batch is processed.
   * MUST be cleared using the returned resolve delegate to allow batches to run
   */


  Batch.prototype.addDependency = function () {
    var resolver = function () {
      return void 0;
    };

    this._deps.push(new Promise(function (resolve) {
      resolver = resolve;
    }));

    return resolver;
  };
  /**
   * The batch's execute method will not resolve util any promises added here resolve
   *
   * @param p The dependent promise
   */


  Batch.prototype.addResolveBatchDependency = function (p) {
    this._rDeps.push(p);
  };
  /**
   * Execute the current batch and resolve the associated promises
   *
   * @returns A promise which will be resolved once all of the batch's child promises have resolved
   */


  Batch.prototype.execute = function () {
    var _this = this; // we need to check the dependencies twice due to how different engines handle things.
    // We can get a second set of promises added during the first set resolving


    return Promise.all(this._deps).then(function () {
      return Promise.all(_this._deps);
    }).then(function () {
      return _this.executeImpl();
    }).then(function () {
      return Promise.all(_this._rDeps);
    }).then(function () {
      return void 0;
    });
  };

  return Batch;
}();

exports.Batch = Batch;
},{"@pnp/common":"../node_modules/@pnp/common/index.js"}],"../node_modules/@pnp/odata/caching.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CachingParserWrapper = exports.CachingOptions = void 0;

var _common = require("@pnp/common");

var CachingOptions =
/** @class */
function () {
  function CachingOptions(key, storeName, expiration) {
    if (storeName === void 0) {
      storeName = _common.RuntimeConfig.defaultCachingStore;
    }

    if (expiration === void 0) {
      expiration = (0, _common.dateAdd)(new Date(), "second", _common.RuntimeConfig.defaultCachingTimeoutSeconds);
    }

    this.key = key;
    this.storeName = storeName;
    this.expiration = expiration;
  }

  Object.defineProperty(CachingOptions.prototype, "store", {
    get: function () {
      if (this.storeName === "local") {
        return CachingOptions.storage.local;
      } else {
        return CachingOptions.storage.session;
      }
    },
    enumerable: true,
    configurable: true
  });
  CachingOptions.storage = new _common.PnPClientStorage();
  return CachingOptions;
}();

exports.CachingOptions = CachingOptions;

var CachingParserWrapper =
/** @class */
function () {
  function CachingParserWrapper(parser, cacheOptions) {
    this.parser = parser;
    this.cacheOptions = cacheOptions;
  }

  CachingParserWrapper.prototype.parse = function (response) {
    var _this = this;

    return this.parser.parse(response).then(function (r) {
      return _this.cacheData(r);
    });
  };

  CachingParserWrapper.prototype.cacheData = function (data) {
    if (this.cacheOptions.store !== null) {
      this.cacheOptions.store.put(this.cacheOptions.key, data, this.cacheOptions.expiration);
    }

    return data;
  };

  return CachingParserWrapper;
}();

exports.CachingParserWrapper = CachingParserWrapper;
},{"@pnp/common":"../node_modules/@pnp/common/index.js"}],"../node_modules/@pnp/odata/add-prop.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addProp = addProp;

/**
 * Adds a property to a target instance
 *
 * @param target The object to whose prototype we will add a property
 * @param name Property name
 * @param factory Factory method used to produce the property value
 * @param path Any additional path required to produce the value
 */
function addProp(target, name, factory, path) {
  Reflect.defineProperty(target.prototype, name, {
    configurable: true,
    enumerable: true,
    get: function () {
      return factory(this, path);
    }
  });
}
},{}],"../node_modules/@pnp/odata/invokable-extensions.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extensionOrDefault = extensionOrDefault;
exports.applyFactoryExtensions = exports.enableExtensions = exports.disableExtensions = exports.clearGlobalExtensions = exports.extendFactory = exports.extendObj = exports.extendGlobal = void 0;

var _tslib = require("tslib");

var _common = require("@pnp/common");

var _enableExtensions = false;
var globaExtensions = [];
var ObjExtensionsSym = Symbol("__extensions");
/**
 * Creates global extensions across all invokable objects
 *
 * @param e The global extensions to apply
 */

var extendGlobal = function (e) {
  _enableExtensions = true;
  extendCol(globaExtensions, e);
};
/**
 * Applies the supplied extensions to a single instance
 *
 * @param target Object to which extensions are applied
 * @param extensions Extensions to apply
 */


exports.extendGlobal = extendGlobal;

var extendObj = function (target, extensions) {
  _enableExtensions = true;

  if (!Reflect.has(target, ObjExtensionsSym)) {
    Reflect.set(target, ObjExtensionsSym, []);
  }

  extendCol(Reflect.get(target, ObjExtensionsSym), extensions);
  return target;
};
/**
 * Allows applying extensions to all instances created from the supplied factory
 *
 * @param factory The Invokable Factory method to extend
 * @param extensions Extensions to apply
 */


exports.extendObj = extendObj;

var extendFactory = function (factory, extensions) {
  _enableExtensions = true;

  if (factory.__proto__[ObjExtensionsSym] === undefined) {
    factory.__proto__[ObjExtensionsSym] = [];
  }

  extendCol(factory.__proto__[ObjExtensionsSym], extensions);
};

exports.extendFactory = extendFactory;

function extendCol(a, e) {
  if ((0, _common.isArray)(e)) {
    // @ts-ignore
    a.push.apply(a, (0, _tslib.__spread)(e));
  } else {
    // @ts-ignore
    a.push(e);
  }
}
/**
 * Clears all global extensions
 */


var clearGlobalExtensions = function () {
  globaExtensions.length = 0;
};
/**
 * Disables all extensions
 */


exports.clearGlobalExtensions = clearGlobalExtensions;

var disableExtensions = function () {
  _enableExtensions = false;
};
/**
 * Enables all extensions
 */


exports.disableExtensions = disableExtensions;

var enableExtensions = function () {
  _enableExtensions = true;
};
/**
 * Applies a set of extension previously applied to a factory using extendFactory to an object created from that factory
 *
 * @param factory
 * @param args
 */


exports.enableExtensions = enableExtensions;

var applyFactoryExtensions = function (factory, args) {
  var o = factory(args);

  if (factory.__proto__[ObjExtensionsSym]) {
    o = extendObj(o, factory.__proto__[ObjExtensionsSym]);
  }

  return o;
};

exports.applyFactoryExtensions = applyFactoryExtensions;

function extensionOrDefault(op, or, target) {
  var rest = [];

  for (var _i = 3; _i < arguments.length; _i++) {
    rest[_i - 3] = arguments[_i];
  }

  if (_enableExtensions) {
    var extensions = []; // we need to first invoke extensions tied to only this object

    if (Reflect.has(target, ObjExtensionsSym)) {
      extensions.push.apply(extensions, (0, _tslib.__spread)(Reflect.get(target, ObjExtensionsSym)));
    } // second we need to process any global extensions


    extensions.push.apply(extensions, (0, _tslib.__spread)(globaExtensions));

    for (var i = 0; i < extensions.length; i++) {
      var extension = extensions[i];
      var result = undefined;

      if ((0, _common.isFunc)(extension)) {
        // this extension is a function which we call
        result = extension.apply(void 0, (0, _tslib.__spread)([op, target], rest));
      } else if (op === "get" && Reflect.has(extension, rest[0])) {
        // this extension is a named extension meaning we are overriding a specific method/property
        result = Reflect.get(extension, rest[0], target);
      } else if (Reflect.has(extension, op)) {
        // this extension is a ProxyHandler that has a handler defined for {op} so we pass control and see if we get a result
        result = Reflect.get(extension, op).apply(void 0, (0, _tslib.__spread)([target], rest));
      }

      if (typeof result !== "undefined") {
        // if a extension returned a result, we return that
        // this means that this extension overrides any other extensions and no more are executed
        // first extension in the list to return "wins"
        return result;
      }
    }
  }

  return or.apply(void 0, (0, _tslib.__spread)([target], rest));
}
},{"tslib":"../node_modules/tslib/tslib.es6.js","@pnp/common":"../node_modules/@pnp/common/index.js"}],"../node_modules/@pnp/odata/invokable-binder.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.invokableFactory = void 0;

var _tslib = require("tslib");

var _common = require("@pnp/common");

var _invokableExtensions = require("./invokable-extensions");

var invokableBinder = function (invoker) {
  return function (constructor) {
    return function () {
      var args = [];

      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }

      var factory = function (as) {
        var r = Object.assign(function () {
          var ags = [];

          for (var _i = 0; _i < arguments.length; _i++) {
            ags[_i] = arguments[_i];
          }

          return invoker.apply(r, ags);
        }, new (constructor.bind.apply(constructor, (0, _tslib.__spread)([void 0], as)))());
        Reflect.setPrototypeOf(r, constructor.prototype);
        return r;
      };

      if (_common.RuntimeConfig.ie11) {
        return factory(args);
      } else {
        return new Proxy((0, _invokableExtensions.applyFactoryExtensions)(factory, args), {
          apply: function (target, _thisArg, argArray) {
            return (0, _invokableExtensions.extensionOrDefault)("apply", function () {
              var a = [];

              for (var _i = 0; _i < arguments.length; _i++) {
                a[_i] = arguments[_i];
              }

              return Reflect.apply(a[0], a[1], a[2]);
            }, target, _thisArg, argArray);
          },
          get: function (target, p, receiver) {
            return (0, _invokableExtensions.extensionOrDefault)("get", function () {
              var a = [];

              for (var _i = 0; _i < arguments.length; _i++) {
                a[_i] = arguments[_i];
              }

              return Reflect.get(a[0], a[1], a[2]);
            }, target, p, receiver);
          },
          has: function (target, p) {
            return (0, _invokableExtensions.extensionOrDefault)("has", function () {
              var a = [];

              for (var _i = 0; _i < arguments.length; _i++) {
                a[_i] = arguments[_i];
              }

              return Reflect.has(a[0], a[1]);
            }, target, p);
          },
          set: function (target, p, value, receiver) {
            return (0, _invokableExtensions.extensionOrDefault)("set", function () {
              var a = [];

              for (var _i = 0; _i < arguments.length; _i++) {
                a[_i] = arguments[_i];
              }

              return Reflect.set(a[0], a[1], a[2], a[3]);
            }, target, p, value, receiver);
          }
        });
      }
    };
  };
};

var invokableFactory = invokableBinder(function (options) {
  return this.defaultAction(options);
});
exports.invokableFactory = invokableFactory;
},{"tslib":"../node_modules/tslib/tslib.es6.js","@pnp/common":"../node_modules/@pnp/common/index.js","./invokable-extensions":"../node_modules/@pnp/odata/invokable-extensions.js"}],"../node_modules/@pnp/odata/parsers.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HttpRequestError = exports.LambdaParser = exports.BufferParser = exports.JSONParser = exports.BlobParser = exports.TextParser = exports.ODataParser = void 0;

var _tslib = require("tslib");

var _common = require("@pnp/common");

var ODataParser =
/** @class */
function () {
  function ODataParser() {}

  ODataParser.prototype.parse = function (r) {
    var _this = this;

    return new Promise(function (resolve, reject) {
      if (_this.handleError(r, reject)) {
        _this.parseImpl(r, resolve, reject);
      }
    });
  };

  ODataParser.prototype.parseImpl = function (r, resolve, reject) {
    var _this = this;

    if (r.headers.has("Content-Length") && parseFloat(r.headers.get("Content-Length")) === 0 || r.status === 204) {
      resolve({});
    } else {
      // patch to handle cases of 200 response with no or whitespace only bodies (#487 & #545)
      r.text().then(function (txt) {
        return txt.replace(/\s/ig, "").length > 0 ? JSON.parse(txt) : {};
      }).then(function (json) {
        return resolve(_this.parseODataJSON(json));
      }).catch(function (e) {
        return reject(e);
      });
    }
  };
  /**
   * Handles a response with ok === false by parsing the body and creating a ProcessHttpClientResponseException
   * which is passed to the reject delegate. This method returns true if there is no error, otherwise false
   *
   * @param r Current response object
   * @param reject reject delegate for the surrounding promise
   */


  ODataParser.prototype.handleError = function (r, reject) {
    if (!r.ok) {
      HttpRequestError.init(r).then(reject);
    }

    return r.ok;
  };
  /**
   * Normalizes the json response by removing the various nested levels
   *
   * @param json json object to parse
   */


  ODataParser.prototype.parseODataJSON = function (json) {
    var result = json;

    if ((0, _common.hOP)(json, "d")) {
      if ((0, _common.hOP)(json.d, "results")) {
        result = json.d.results;
      } else {
        result = json.d;
      }
    } else if ((0, _common.hOP)(json, "value")) {
      result = json.value;
    }

    return result;
  };

  return ODataParser;
}();

exports.ODataParser = ODataParser;

var TextParser =
/** @class */
function (_super) {
  (0, _tslib.__extends)(TextParser, _super);

  function TextParser() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  TextParser.prototype.parseImpl = function (r, resolve) {
    r.text().then(resolve);
  };

  return TextParser;
}(ODataParser);

exports.TextParser = TextParser;

var BlobParser =
/** @class */
function (_super) {
  (0, _tslib.__extends)(BlobParser, _super);

  function BlobParser() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  BlobParser.prototype.parseImpl = function (r, resolve) {
    r.blob().then(resolve);
  };

  return BlobParser;
}(ODataParser);

exports.BlobParser = BlobParser;

var JSONParser =
/** @class */
function (_super) {
  (0, _tslib.__extends)(JSONParser, _super);

  function JSONParser() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  JSONParser.prototype.parseImpl = function (r, resolve) {
    r.json().then(resolve);
  };

  return JSONParser;
}(ODataParser);

exports.JSONParser = JSONParser;

var BufferParser =
/** @class */
function (_super) {
  (0, _tslib.__extends)(BufferParser, _super);

  function BufferParser() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  BufferParser.prototype.parseImpl = function (r, resolve) {
    if ((0, _common.isFunc)(r.arrayBuffer)) {
      r.arrayBuffer().then(resolve);
    } else {
      r.buffer().then(resolve);
    }
  };

  return BufferParser;
}(ODataParser);

exports.BufferParser = BufferParser;

var LambdaParser =
/** @class */
function (_super) {
  (0, _tslib.__extends)(LambdaParser, _super);

  function LambdaParser(parser) {
    var _this = _super.call(this) || this;

    _this.parser = parser;
    return _this;
  }

  LambdaParser.prototype.parseImpl = function (r, resolve) {
    this.parser(r).then(resolve);
  };

  return LambdaParser;
}(ODataParser);

exports.LambdaParser = LambdaParser;

var HttpRequestError =
/** @class */
function (_super) {
  (0, _tslib.__extends)(HttpRequestError, _super);

  function HttpRequestError(message, response, status, statusText) {
    if (status === void 0) {
      status = response.status;
    }

    if (statusText === void 0) {
      statusText = response.statusText;
    }

    var _this = _super.call(this, message) || this;

    _this.response = response;
    _this.status = status;
    _this.statusText = statusText;
    _this.isHttpRequestError = true;
    return _this;
  }

  HttpRequestError.init = function (r) {
    return (0, _tslib.__awaiter)(this, void 0, void 0, function () {
      var t;
      return (0, _tslib.__generator)(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4
            /*yield*/
            , r.clone().text()];

          case 1:
            t = _a.sent();
            return [2
            /*return*/
            , new HttpRequestError("Error making HttpClient request in queryable [" + r.status + "] " + r.statusText + " ::> " + t, r.clone())];
        }
      });
    });
  };

  return HttpRequestError;
}(Error);

exports.HttpRequestError = HttpRequestError;
},{"tslib":"../node_modules/tslib/tslib.es6.js","@pnp/common":"../node_modules/@pnp/common/index.js"}],"../node_modules/@pnp/odata/queryable.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cloneQueryableData = cloneQueryableData;
exports.Queryable = void 0;

var _tslib = require("tslib");

var _common = require("@pnp/common");

var _parsers = require("./parsers");

function cloneQueryableData(source) {
  var s = JSON.stringify(source, function (key, value) {
    switch (key) {
      case "query":
        return JSON.stringify((0, _tslib.__spread)(value));

      case "batch":
        return "-";

      case "batchDependency":
        return "-";

      case "cachingOptions":
        return "-";

      case "clientFactory":
        return "-";

      case "parser":
        return "-";

      default:
        return value;
    }
  }, 0);
  var parsed = JSON.parse(s, function (key, value) {
    switch (key) {
      case "query":
        return new Map(JSON.parse(value));

      case "batch":
        return source.batch;

      case "batchDependency":
        return source.batchDependency;

      case "cachingOptions":
        return source.cachingOptions;

      case "clientFactory":
        return source.clientFactory;

      case "parser":
        return source.parser;

      default:
        return value;
    }
  }); // this handles bodies that cannot be JSON encoded (Blob, etc)

  if (source.options && source.options.body) {
    parsed.options.body = source.options.body;
  }

  return parsed;
}

var Queryable =
/** @class */
function () {
  function Queryable(dataSeed) {
    if (dataSeed === void 0) {
      dataSeed = {};
    }

    this._data = Object.assign({}, {
      cloneParentWasCaching: false,
      options: {},
      parentUrl: "",
      parser: new _parsers.ODataParser(),
      query: new Map(),
      url: "",
      useCaching: false
    }, cloneQueryableData(dataSeed));
  }

  Object.defineProperty(Queryable.prototype, "data", {
    get: function () {
      return this._data;
    },
    set: function (value) {
      this._data = Object.assign({}, cloneQueryableData(this.data), cloneQueryableData(value));
    },
    enumerable: true,
    configurable: true
  });
  /**
  * Gets the currentl url
  *
  */

  Queryable.prototype.toUrl = function () {
    return this.data.url;
  };
  /**
   * Directly concatenates the supplied string to the current url, not normalizing "/" chars
   *
   * @param pathPart The string to concatenate to the url
   */


  Queryable.prototype.concat = function (pathPart) {
    this.data.url += pathPart;
    return this;
  };

  Object.defineProperty(Queryable.prototype, "query", {
    /**
     * Provides access to the query builder for this url
     *
     */
    get: function () {
      return this.data.query;
    },
    enumerable: true,
    configurable: true
  });
  /**
   * Sets custom options for current object and all derived objects accessible via chaining
   *
   * @param options custom options
   */

  Queryable.prototype.configure = function (options) {
    (0, _common.mergeOptions)(this.data.options, options);
    return this;
  };
  /**
   * Configures this instance from the configure options of the supplied instance
   *
   * @param o Instance from which options should be taken
   */


  Queryable.prototype.configureFrom = function (o) {
    (0, _common.mergeOptions)(this.data.options, o.data.options);
    return this;
  };
  /**
   * Enables caching for this request
   *
   * @param options Defines the options used when caching this request
   */


  Queryable.prototype.usingCaching = function (options) {
    if (!_common.RuntimeConfig.globalCacheDisable) {
      this.data.useCaching = true;

      if (options !== undefined) {
        this.data.cachingOptions = options;
      }
    }

    return this;
  };

  Queryable.prototype.usingParser = function (parser) {
    this.data.parser = parser;
    return this;
  };
  /**
   * Allows you to set a request specific processing pipeline
   *
   * @param pipeline The set of methods, in order, to execute a given request
   */


  Queryable.prototype.withPipeline = function (pipeline) {
    this.data.pipes = pipeline.slice(0);
    return this;
  };
  /**
   * Appends the given string and normalizes "/" chars
   *
   * @param pathPart The string to append
   */


  Queryable.prototype.append = function (pathPart) {
    this.data.url = (0, _common.combine)(this.data.url, pathPart);
  };
  /**
   * Adds this query to the supplied batch
   *
   * @example
   * ```
   *
   * let b = pnp.sp.createBatch();
   * pnp.sp.web.inBatch(b).get().then(...);
   * b.execute().then(...)
   * ```
   */


  Queryable.prototype.inBatch = function (batch) {
    if (this.hasBatch) {
      throw Error("This query is already part of a batch.");
    }

    if ((0, _common.objectDefinedNotNull)(batch)) {
      batch.track(this);
    }

    return this;
  };
  /**
   * Blocks a batch call from occuring, MUST be cleared by calling the returned function
  */


  Queryable.prototype.addBatchDependency = function () {
    if ((0, _common.objectDefinedNotNull)(this.data.batch)) {
      return this.data.batch.addDependency();
    }

    return function () {
      return null;
    };
  };

  Object.defineProperty(Queryable.prototype, "hasBatch", {
    /**
     * Indicates if the current query has a batch associated
     *
     */
    get: function () {
      return (0, _common.objectDefinedNotNull)(this.data.batch);
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Queryable.prototype, "batch", {
    /**
     * The batch currently associated with this query or null
     *
     */
    get: function () {
      return this.hasBatch ? this.data.batch : null;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Queryable.prototype, "parentUrl", {
    /**
     * Gets the parent url used when creating this instance
     *
     */
    get: function () {
      return this.data.parentUrl;
    },
    enumerable: true,
    configurable: true
  });
  /**
   * Clones this instance's data to target
   *
   * @param target Instance to which data is written
   * @param settings [Optional] Settings controlling how clone is applied
   */

  Queryable.prototype.cloneTo = function (target, settings) {
    if (settings === void 0) {
      settings = {
        includeBatch: true
      };
    }

    target.data = Object.assign({}, cloneQueryableData(this.data), {
      batch: null,
      cloneParentCacheOptions: null,
      cloneParentWasCaching: false
    }, cloneQueryableData(target.data));
    target.configureFrom(this);

    if (settings.includeBatch) {
      target.inBatch(this.batch);
    }

    if (this.data.useCaching) {
      target.data.cloneParentWasCaching = true;
      target.data.cloneParentCacheOptions = this.data.cachingOptions;
    }

    return target;
  };

  return Queryable;
}();

exports.Queryable = Queryable;
},{"tslib":"../node_modules/tslib/tslib.es6.js","@pnp/common":"../node_modules/@pnp/common/index.js","./parsers":"../node_modules/@pnp/odata/parsers.js"}],"../node_modules/@pnp/logging/logger.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LogLevel = exports.Logger = void 0;

/**
 * Class used to subscribe ILogListener and log messages throughout an application
 *
 */
var Logger =
/** @class */
function () {
  function Logger() {}

  Object.defineProperty(Logger, "activeLogLevel", {
    /**
     * Gets or sets the active log level to apply for log filtering
     */
    get: function () {
      return Logger.instance.activeLogLevel;
    },
    set: function (value) {
      Logger.instance.activeLogLevel = value;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(Logger, "instance", {
    get: function () {
      if (Logger._instance === undefined || Logger._instance === null) {
        Logger._instance = new LoggerImpl();
      }

      return Logger._instance;
    },
    enumerable: true,
    configurable: true
  });
  /**
   * Adds ILogListener instances to the set of subscribed listeners
   *
   * @param listeners One or more listeners to subscribe to this log
   */

  Logger.subscribe = function () {
    var listeners = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      listeners[_i] = arguments[_i];
    }

    listeners.forEach(function (listener) {
      return Logger.instance.subscribe(listener);
    });
  };
  /**
   * Clears the subscribers collection, returning the collection before modification
   */


  Logger.clearSubscribers = function () {
    return Logger.instance.clearSubscribers();
  };

  Object.defineProperty(Logger, "count", {
    /**
     * Gets the current subscriber count
     */
    get: function () {
      return Logger.instance.count;
    },
    enumerable: true,
    configurable: true
  });
  /**
   * Writes the supplied string to the subscribed listeners
   *
   * @param message The message to write
   * @param level [Optional] if supplied will be used as the level of the entry (Default: LogLevel.Info)
   */

  Logger.write = function (message, level) {
    if (level === void 0) {
      level = 1
      /* Info */
      ;
    }

    Logger.instance.log({
      level: level,
      message: message
    });
  };
  /**
   * Writes the supplied string to the subscribed listeners
   *
   * @param json The json object to stringify and write
   * @param level [Optional] if supplied will be used as the level of the entry (Default: LogLevel.Info)
   */


  Logger.writeJSON = function (json, level) {
    if (level === void 0) {
      level = 1
      /* Info */
      ;
    }

    this.write(JSON.stringify(json), level);
  };
  /**
   * Logs the supplied entry to the subscribed listeners
   *
   * @param entry The message to log
   */


  Logger.log = function (entry) {
    Logger.instance.log(entry);
  };
  /**
   * Logs an error object to the subscribed listeners
   *
   * @param err The error object
   */


  Logger.error = function (err) {
    Logger.instance.log({
      data: err,
      level: 3
      /* Error */
      ,
      message: err.message
    });
  };

  return Logger;
}();

exports.Logger = Logger;

var LoggerImpl =
/** @class */
function () {
  function LoggerImpl(activeLogLevel, subscribers) {
    if (activeLogLevel === void 0) {
      activeLogLevel = 2
      /* Warning */
      ;
    }

    if (subscribers === void 0) {
      subscribers = [];
    }

    this.activeLogLevel = activeLogLevel;
    this.subscribers = subscribers;
  }

  LoggerImpl.prototype.subscribe = function (listener) {
    this.subscribers.push(listener);
  };

  LoggerImpl.prototype.clearSubscribers = function () {
    var s = this.subscribers.slice(0);
    this.subscribers.length = 0;
    return s;
  };

  Object.defineProperty(LoggerImpl.prototype, "count", {
    get: function () {
      return this.subscribers.length;
    },
    enumerable: true,
    configurable: true
  });

  LoggerImpl.prototype.write = function (message, level) {
    if (level === void 0) {
      level = 1
      /* Info */
      ;
    }

    this.log({
      level: level,
      message: message
    });
  };

  LoggerImpl.prototype.log = function (entry) {
    if (entry !== undefined && this.activeLogLevel <= entry.level) {
      this.subscribers.map(function (subscriber) {
        return subscriber.log(entry);
      });
    }
  };

  return LoggerImpl;
}();
/**
 * A set of logging levels
 */


var LogLevel;
exports.LogLevel = LogLevel;

(function (LogLevel) {
  LogLevel[LogLevel["Verbose"] = 0] = "Verbose";
  LogLevel[LogLevel["Info"] = 1] = "Info";
  LogLevel[LogLevel["Warning"] = 2] = "Warning";
  LogLevel[LogLevel["Error"] = 3] = "Error";
  LogLevel[LogLevel["Off"] = 99] = "Off";
})(LogLevel || (exports.LogLevel = LogLevel = {}));
},{}],"../node_modules/@pnp/logging/listeners.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FunctionListener = exports.ConsoleListener = void 0;

/**
 * Implementation of LogListener which logs to the console
 *
 */
var ConsoleListener =
/** @class */
function () {
  function ConsoleListener() {}
  /**
   * Any associated data that a given logging listener may choose to log or ignore
   *
   * @param entry The information to be logged
   */


  ConsoleListener.prototype.log = function (entry) {
    var msg = this.format(entry);

    switch (entry.level) {
      case 0
      /* Verbose */
      :
      case 1
      /* Info */
      :
        console.log(msg);
        break;

      case 2
      /* Warning */
      :
        console.warn(msg);
        break;

      case 3
      /* Error */
      :
        console.error(msg);
        break;
    }
  };
  /**
   * Formats the message
   *
   * @param entry The information to format into a string
   */


  ConsoleListener.prototype.format = function (entry) {
    var msg = [];
    msg.push("Message: " + entry.message);

    if (entry.data !== undefined) {
      try {
        msg.push(" Data: " + JSON.stringify(entry.data));
      } catch (e) {
        msg.push(" Data: Error in stringify of supplied data " + e);
      }
    }

    return msg.join("");
  };

  return ConsoleListener;
}();

exports.ConsoleListener = ConsoleListener;

/**
 * Implementation of LogListener which logs to the supplied function
 *
 */
var FunctionListener =
/** @class */
function () {
  /**
   * Creates a new instance of the FunctionListener class
   *
   * @constructor
   * @param  method The method to which any logging data will be passed
   */
  function FunctionListener(method) {
    this.method = method;
  }
  /**
   * Any associated data that a given logging listener may choose to log or ignore
   *
   * @param entry The information to be logged
   */


  FunctionListener.prototype.log = function (entry) {
    this.method(entry);
  };

  return FunctionListener;
}();

exports.FunctionListener = FunctionListener;
},{}],"../node_modules/@pnp/logging/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _logger = require("./logger");

Object.keys(_logger).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _logger[key];
    }
  });
});

var _listeners = require("./listeners");

Object.keys(_listeners).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _listeners[key];
    }
  });
});
},{"./logger":"../node_modules/@pnp/logging/logger.js","./listeners":"../node_modules/@pnp/logging/listeners.js"}],"../node_modules/@pnp/odata/pipeline.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setResult = setResult;
exports.pipe = pipe;
exports.requestPipelineMethod = requestPipelineMethod;
exports.getDefaultPipeline = getDefaultPipeline;
exports.PipelineMethods = void 0;

var _tslib = require("tslib");

var _common = require("@pnp/common");

var _logging = require("@pnp/logging");

var _caching = require("./caching");

/**
 * Resolves the context's result value
 *
 * @param context The current context
 */
function returnResult(context) {
  _logging.Logger.log({
    data: _logging.Logger.activeLogLevel === 0
    /* Verbose */
    ? context.result : {},
    level: 1
    /* Info */
    ,
    message: "[" + context.requestId + "] (" + new Date().getTime() + ") Returning result from pipeline. Set logging to verbose to see data."
  });

  return Promise.resolve(context.result);
}
/**
 * Sets the result on the context
 */


function setResult(context, value) {
  return new Promise(function (resolve) {
    context.result = value;
    context.hasResult = true;
    resolve(context);
  });
}
/**
 * Invokes the next method in the provided context's pipeline
 *
 * @param c The current request context
 */


function next(c) {
  return c.pipes.length > 0 ? c.pipes.shift()(c) : Promise.resolve(c);
}
/**
 * Executes the current request context's pipeline
 *
 * @param context Current context
 */


function pipe(context) {
  if (context.pipes.length < 1) {
    _logging.Logger.write("[" + context.requestId + "] (" + new Date().getTime() + ") Request pipeline contains no methods!", 3
    /* Error */
    );

    throw Error("Request pipeline contains no methods!");
  }

  var promise = next(context).then(function (ctx) {
    return returnResult(ctx);
  }).catch(function (e) {
    _logging.Logger.error(e);

    throw e;
  });

  if (context.isBatched) {
    // this will block the batch's execute method from returning until the child requets have been resolved
    context.batch.addResolveBatchDependency(promise);
  }

  return promise;
}
/**
 * decorator factory applied to methods in the pipeline to control behavior
 */


function requestPipelineMethod(alwaysRun) {
  if (alwaysRun === void 0) {
    alwaysRun = false;
  }

  return function (target, propertyKey, descriptor) {
    var method = descriptor.value;

    descriptor.value = function () {
      var args = [];

      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      } // if we have a result already in the pipeline, pass it along and don't call the tagged method


      if (!alwaysRun && args.length > 0 && (0, _common.hOP)(args[0], "hasResult") && args[0].hasResult) {
        _logging.Logger.write("[" + args[0].requestId + "] (" + new Date().getTime() + ") Skipping request pipeline method " + propertyKey + ", existing result in pipeline.", 0
        /* Verbose */
        );

        return Promise.resolve(args[0]);
      } // apply the tagged method


      _logging.Logger.write("[" + args[0].requestId + "] (" + new Date().getTime() + ") Calling request pipeline method " + propertyKey + ".", 0
      /* Verbose */
      ); // then chain the next method in the context's pipeline - allows for dynamic pipeline


      return method.apply(target, args).then(function (ctx) {
        return next(ctx);
      });
    };
  };
}
/**
 * Contains the methods used within the request pipeline
 */


var PipelineMethods =
/** @class */
function () {
  function PipelineMethods() {}
  /**
   * Logs the start of the request
   */


  PipelineMethods.logStart = function (context) {
    return new Promise(function (resolve) {
      _logging.Logger.log({
        data: _logging.Logger.activeLogLevel === 1
        /* Info */
        ? {} : context,
        level: 1
        /* Info */
        ,
        message: "[" + context.requestId + "] (" + new Date().getTime() + ") Beginning " + context.method + " request (" + context.url + ")"
      });

      resolve(context);
    });
  };
  /**
   * Handles caching of the request
   */


  PipelineMethods.caching = function (context) {
    return new Promise(function (resolve) {
      // handle caching, if applicable
      if (context.useCaching) {
        _logging.Logger.write("[" + context.requestId + "] (" + new Date().getTime() + ") Caching is enabled for request, checking cache...", 1
        /* Info */
        );

        var cacheOptions = new _caching.CachingOptions(context.url.toLowerCase());

        if (context.cachingOptions !== undefined) {
          cacheOptions = (0, _common.assign)(cacheOptions, context.cachingOptions);
        } // we may not have a valid store


        if (cacheOptions.store !== null) {
          // check if we have the data in cache and if so resolve the promise and return
          var data = cacheOptions.store.get(cacheOptions.key);

          if (data !== null) {
            _logging.Logger.log({
              data: _logging.Logger.activeLogLevel === 1
              /* Info */
              ? {} : data,
              level: 1
              /* Info */
              ,
              message: "[" + context.requestId + "] (" + new Date().getTime() + ") Value returned from cache."
            }); // ensure we clear any held batch dependency we are resolving from the cache


            if ((0, _common.isFunc)(context.batchDependency)) {
              context.batchDependency();
            } // handle the case where a parser needs to take special actions with a cached result


            if ((0, _common.hOP)(context.parser, "hydrate")) {
              data = context.parser.hydrate(data);
            }

            return setResult(context, data).then(function (ctx) {
              return resolve(ctx);
            });
          }
        }

        _logging.Logger.write("[" + context.requestId + "] (" + new Date().getTime() + ") Value not found in cache.", 1
        /* Info */
        ); // if we don't then wrap the supplied parser in the caching parser wrapper
        // and send things on their way


        context.parser = new _caching.CachingParserWrapper(context.parser, cacheOptions);
      }

      return resolve(context);
    });
  };
  /**
   * Sends the request
   */


  PipelineMethods.send = function (context) {
    return new Promise(function (resolve, reject) {
      // send or batch the request
      if (context.isBatched) {
        var p = context.batch.add(context); // we release the dependency here to ensure the batch does not execute until the request is added to the batch

        if ((0, _common.isFunc)(context.batchDependency)) {
          context.batchDependency();
        }

        _logging.Logger.write("[" + context.requestId + "] (" + new Date().getTime() + ") Batching request in batch " + context.batch.batchId + ".", 1
        /* Info */
        ); // we set the result as the promise which will be resolved by the batch's execution


        resolve(setResult(context, p));
      } else {
        _logging.Logger.write("[" + context.requestId + "] (" + new Date().getTime() + ") Sending request.", 1
        /* Info */
        ); // we are not part of a batch, so proceed as normal


        var client = context.clientFactory();
        var opts = (0, _common.assign)(context.options || {}, {
          method: context.method
        });
        client.fetch(context.url, opts).then(function (response) {
          return context.parser.parse(response);
        }).then(function (result) {
          return setResult(context, result);
        }).then(function (ctx) {
          return resolve(ctx);
        }).catch(function (e) {
          return reject(e);
        });
      }
    });
  };
  /**
   * Logs the end of the request
   */


  PipelineMethods.logEnd = function (context) {
    return new Promise(function (resolve) {
      if (context.isBatched) {
        _logging.Logger.log({
          data: _logging.Logger.activeLogLevel === 1
          /* Info */
          ? {} : context,
          level: 1
          /* Info */
          ,
          message: "[" + context.requestId + "] (" + new Date().getTime() + ") " + context.method + " request will complete in batch " + context.batch.batchId + "."
        });
      } else {
        _logging.Logger.log({
          data: _logging.Logger.activeLogLevel === 1
          /* Info */
          ? {} : context,
          level: 1
          /* Info */
          ,
          message: "[" + context.requestId + "] (" + new Date().getTime() + ") Completing " + context.method + " request."
        });
      }

      resolve(context);
    });
  };

  (0, _tslib.__decorate)([requestPipelineMethod(true)], PipelineMethods, "logStart", null);
  (0, _tslib.__decorate)([requestPipelineMethod()], PipelineMethods, "caching", null);
  (0, _tslib.__decorate)([requestPipelineMethod()], PipelineMethods, "send", null);
  (0, _tslib.__decorate)([requestPipelineMethod(true)], PipelineMethods, "logEnd", null);
  return PipelineMethods;
}();

exports.PipelineMethods = PipelineMethods;

function getDefaultPipeline() {
  return [PipelineMethods.logStart, PipelineMethods.caching, PipelineMethods.send, PipelineMethods.logEnd].slice(0);
}
},{"tslib":"../node_modules/tslib/tslib.es6.js","@pnp/common":"../node_modules/@pnp/common/index.js","@pnp/logging":"../node_modules/@pnp/logging/index.js","./caching":"../node_modules/@pnp/odata/caching.js"}],"../node_modules/@pnp/odata/pipeline-binder.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pipelineBinder = pipelineBinder;
exports.defaultPipelineBinder = void 0;

var _parsers = require("./parsers");

var _common = require("@pnp/common");

var _queryable = require("./queryable");

var _pipeline = require("./pipeline");

// first we bind the pipeline we will use for all requests within this closure
function pipelineBinder(pipes) {
  // then we bind the client factory we'll use (typically done in an implementing library such as sp)
  return function (clientFactory) {
    // then we create a binder we can apply for each type of method (GET, POST, etc.)
    return function (method) {
      // finally we get a function back to which we can pass an IQueryableData instance and execute the request it defines
      return function (o) {
        // send the IQueryableData down the pipeline
        return (0, _pipeline.pipe)(Object.assign({}, {
          batch: null,
          batchDependency: null,
          batchIndex: -1,
          cachingOptions: null,
          clientFactory: clientFactory,
          cloneParentCacheOptions: null,
          cloneParentWasCaching: false,
          hasResult: false,
          isBatched: (0, _common.objectDefinedNotNull)(o.batch),
          method: method,
          options: null,
          parentUrl: "",
          parser: new _parsers.ODataParser(),
          pipes: pipes.slice(0),
          query: new Map(),
          requestId: (0, _common.getGUID)(),
          url: "",
          useCaching: /^get$/i.test(o.method) && o.useCaching
        }, (0, _queryable.cloneQueryableData)(o)));
      };
    };
  };
}

var defaultPipelineBinder = pipelineBinder((0, _pipeline.getDefaultPipeline)());
exports.defaultPipelineBinder = defaultPipelineBinder;
},{"./parsers":"../node_modules/@pnp/odata/parsers.js","@pnp/common":"../node_modules/@pnp/common/index.js","./queryable":"../node_modules/@pnp/odata/queryable.js","./pipeline":"../node_modules/@pnp/odata/pipeline.js"}],"../node_modules/@pnp/odata/request-builders.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.body = body;
exports.headers = headers;

var _common = require("@pnp/common");

function body(o, previous) {
  return Object.assign({
    body: (0, _common.jsS)(o)
  }, previous);
}

function headers(o, previous) {
  return Object.assign({
    headers: o
  }, previous);
}
},{"@pnp/common":"../node_modules/@pnp/common/index.js"}],"../node_modules/@pnp/odata/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  extendGlobal: true,
  extendObj: true,
  extendFactory: true,
  clearGlobalExtensions: true,
  enableExtensions: true,
  disableExtensions: true
};
Object.defineProperty(exports, "extendGlobal", {
  enumerable: true,
  get: function () {
    return _invokableExtensions.extendGlobal;
  }
});
Object.defineProperty(exports, "extendObj", {
  enumerable: true,
  get: function () {
    return _invokableExtensions.extendObj;
  }
});
Object.defineProperty(exports, "extendFactory", {
  enumerable: true,
  get: function () {
    return _invokableExtensions.extendFactory;
  }
});
Object.defineProperty(exports, "clearGlobalExtensions", {
  enumerable: true,
  get: function () {
    return _invokableExtensions.clearGlobalExtensions;
  }
});
Object.defineProperty(exports, "enableExtensions", {
  enumerable: true,
  get: function () {
    return _invokableExtensions.enableExtensions;
  }
});
Object.defineProperty(exports, "disableExtensions", {
  enumerable: true,
  get: function () {
    return _invokableExtensions.disableExtensions;
  }
});

var _batch = require("./batch");

Object.keys(_batch).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _batch[key];
    }
  });
});

var _caching = require("./caching");

Object.keys(_caching).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _caching[key];
    }
  });
});

var _addProp = require("./add-prop");

Object.keys(_addProp).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _addProp[key];
    }
  });
});

var _invokableBinder = require("./invokable-binder");

Object.keys(_invokableBinder).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _invokableBinder[key];
    }
  });
});

var _pipelineBinder = require("./pipeline-binder");

Object.keys(_pipelineBinder).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _pipelineBinder[key];
    }
  });
});

var _parsers = require("./parsers");

Object.keys(_parsers).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _parsers[key];
    }
  });
});

var _pipeline = require("./pipeline");

Object.keys(_pipeline).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _pipeline[key];
    }
  });
});

var _queryable = require("./queryable");

Object.keys(_queryable).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _queryable[key];
    }
  });
});

var _requestBuilders = require("./request-builders");

Object.keys(_requestBuilders).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _requestBuilders[key];
    }
  });
});

var _invokableExtensions = require("./invokable-extensions");
},{"./batch":"../node_modules/@pnp/odata/batch.js","./caching":"../node_modules/@pnp/odata/caching.js","./add-prop":"../node_modules/@pnp/odata/add-prop.js","./invokable-binder":"../node_modules/@pnp/odata/invokable-binder.js","./pipeline-binder":"../node_modules/@pnp/odata/pipeline-binder.js","./parsers":"../node_modules/@pnp/odata/parsers.js","./pipeline":"../node_modules/@pnp/odata/pipeline.js","./queryable":"../node_modules/@pnp/odata/queryable.js","./request-builders":"../node_modules/@pnp/odata/request-builders.js","./invokable-extensions":"../node_modules/@pnp/odata/invokable-extensions.js"}],"../node_modules/@pnp/sp/utils/metadata.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.metadata = metadata;

function metadata(type) {
  return {
    "__metadata": {
      "type": type
    }
  };
}
},{}],"../node_modules/@pnp/sp/utils/extractweburl.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extractWebUrl = extractWebUrl;

var _common = require("@pnp/common");

function extractWebUrl(candidateUrl) {
  if ((0, _common.stringIsNullOrEmpty)(candidateUrl)) {
    return "";
  }

  var index = candidateUrl.indexOf("_api/");

  if (index < 0) {
    index = candidateUrl.indexOf("_vti_bin/");
  }

  if (index > -1) {
    return candidateUrl.substr(0, index);
  } // if all else fails just give them what they gave us back


  return candidateUrl;
}
},{"@pnp/common":"../node_modules/@pnp/common/index.js"}],"../node_modules/@pnp/sp/telemetry.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tag = tag;

var _tslib = require("tslib");

var _common = require("@pnp/common");

var _odata = require("@pnp/odata");

/**
 * Includes this method name in the X-ClientService-ClientTag used to record pnpjs usage
 *
 * @param name Method name, displayed in the
 */
function tag(name) {
  return function (target, key, descriptor) {
    if (descriptor === undefined) {
      descriptor = Object.getOwnPropertyDescriptor(target, key);
    }

    var originalMethod = descriptor.value;

    descriptor.value = function () {
      var args = [];

      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }

      return (0, _tslib.__awaiter)(this, void 0, void 0, function () {
        return (0, _tslib.__generator)(this, function (_a) {
          this.configure((0, _odata.headers)({
            "X-PnPjs-Tracking": name
          }));
          return [2
          /*return*/
          , originalMethod.apply(this, args)];
        });
      });
    };

    return descriptor;
  };
}

tag.getClientTag = function (h, deleteFromCollection) {
  if (deleteFromCollection === void 0) {
    deleteFromCollection = true;
  }

  if (h.has("X-PnPjs-Tracking")) {
    var methodName = h.get("X-PnPjs-Tracking");

    if (deleteFromCollection) {
      h.delete("X-PnPjs-Tracking");
    }

    if (!(0, _common.stringIsNullOrEmpty)(methodName)) {
      return methodName;
    }
  }

  return "";
};

tag.configure = function (o, name) {
  return o.configure((0, _odata.headers)({
    "X-PnPjs-Tracking": name
  }));
};

tag.isTagged = function (o) {
  return o.data.options.headers && o.data.options.headers["X-PnPjs-Tracking"];
};
},{"tslib":"../node_modules/tslib/tslib.es6.js","@pnp/common":"../node_modules/@pnp/common/index.js","@pnp/odata":"../node_modules/@pnp/odata/index.js"}],"../node_modules/@pnp/sp/sphttpclient.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SPHttpClient = void 0;

var _tslib = require("tslib");

var _common = require("@pnp/common");

var _splibconfig = require("./splibconfig");

var _extractweburl = require("./utils/extractweburl");

var _telemetry = require("./telemetry");

var _odata = require("@pnp/odata");

var SPHttpClient =
/** @class */
function () {
  function SPHttpClient(_impl) {
    if (_impl === void 0) {
      _impl = _splibconfig.SPRuntimeConfig.fetchClientFactory();
    }

    this._impl = _impl;
    this._digestCache = getDigestFactory(this);
  }

  SPHttpClient.prototype.fetch = function (url, options) {
    if (options === void 0) {
      options = {};
    }

    return (0, _tslib.__awaiter)(this, void 0, void 0, function () {
      var opts, headers, methodName, clientTag, digest;
      return (0, _tslib.__generator)(this, function (_a) {
        switch (_a.label) {
          case 0:
            opts = (0, _common.assign)(options, {
              cache: "no-cache",
              credentials: "same-origin"
            }, true);
            headers = new Headers(); // first we add the global headers so they can be overwritten by any passed in locally to this call

            (0, _common.mergeHeaders)(headers, _splibconfig.SPRuntimeConfig.headers); // second we add the local options so we can overwrite the globals

            (0, _common.mergeHeaders)(headers, options.headers); // lastly we apply any default headers we need that may not exist

            if (!headers.has("Accept")) {
              headers.append("Accept", "application/json");
            }

            if (!headers.has("Content-Type")) {
              headers.append("Content-Type", "application/json;odata=verbose;charset=utf-8");
            }

            if (!headers.has("X-ClientService-ClientTag")) {
              methodName = _telemetry.tag.getClientTag(headers);
              clientTag = "PnPCoreJS:2.0.5:" + methodName;

              if (clientTag.length > 32) {
                clientTag = clientTag.substr(0, 32);
              }

              headers.append("X-ClientService-ClientTag", clientTag);
            }

            opts = (0, _common.assign)(opts, {
              headers: headers
            });
            if (!(opts.method && opts.method.toUpperCase() !== "GET" && !headers.has("X-RequestDigest") && !headers.has("Authorization"))) return [3
            /*break*/
            , 2];
            return [4
            /*yield*/
            , this._digestCache((0, _extractweburl.extractWebUrl)(url))];

          case 1:
            digest = _a.sent();
            headers.append("X-RequestDigest", digest);
            _a.label = 2;

          case 2:
            return [2
            /*return*/
            , this.fetchRaw(url, opts)];
        }
      });
    });
  };

  SPHttpClient.prototype.fetchRaw = function (url, options) {
    var _this = this;

    if (options === void 0) {
      options = {};
    } // here we need to normalize the headers


    var rawHeaders = new Headers();
    (0, _common.mergeHeaders)(rawHeaders, options.headers);
    options = (0, _common.assign)(options, {
      headers: rawHeaders
    });

    var retry = function (ctx) {
      // handles setting the proper timeout for a retry
      var setRetry = function (response) {
        var delay;

        if (response.headers.has("Retry-After")) {
          // if we have gotten a header, use that value as the delay value in seconds
          delay = parseInt(response.headers.get("Retry-After"), 10) * 1000;
        } else {
          // grab our current delay
          delay = ctx.delay; // Increment our counters.

          ctx.delay *= 2;
        }

        ctx.attempts++; // If we have exceeded the retry count, reject.

        if (ctx.retryCount <= ctx.attempts) {
          ctx.reject(Error("Retry count exceeded (" + ctx.retryCount + ") for request. Response status: [" + response.status + "] " + response.statusText));
        } else {
          // Set our retry timeout for {delay} milliseconds.
          setTimeout((0, _common.getCtxCallback)(_this, retry, ctx), delay);
        }
      }; // send the actual request


      _this._impl.fetch(url, options).then(function (response) {
        if (response.status === 429) {
          // we have been throttled
          setRetry(response);
        } else {
          ctx.resolve(response);
        }
      }).catch(function (response) {
        if (response.status === 503 || response.status === 504) {
          // http status code 503 or 504, we can retry this
          setRetry(response);
        } else {
          ctx.reject(response);
        }
      });
    };

    return new Promise(function (resolve, reject) {
      retry.call(_this, {
        attempts: 0,
        delay: 100,
        reject: reject,
        resolve: resolve,
        retryCount: 7
      });
    });
  };

  SPHttpClient.prototype.get = function (url, options) {
    if (options === void 0) {
      options = {};
    }

    var opts = (0, _common.assign)(options, {
      method: "GET"
    });
    return this.fetch(url, opts);
  };

  SPHttpClient.prototype.post = function (url, options) {
    if (options === void 0) {
      options = {};
    }

    var opts = (0, _common.assign)(options, {
      method: "POST"
    });
    return this.fetch(url, opts);
  };

  SPHttpClient.prototype.patch = function (url, options) {
    if (options === void 0) {
      options = {};
    }

    var opts = (0, _common.assign)(options, {
      method: "PATCH"
    });
    return this.fetch(url, opts);
  };

  SPHttpClient.prototype.delete = function (url, options) {
    if (options === void 0) {
      options = {};
    }

    var opts = (0, _common.assign)(options, {
      method: "DELETE"
    });
    return this.fetch(url, opts);
  };

  return SPHttpClient;
}();

exports.SPHttpClient = SPHttpClient;
// allows for the caching of digests across all HttpClient's which each have their own DigestCache wrapper.
var digests = new Map();

function getDigestFactory(client) {
  var _this = this;

  return function (webUrl) {
    return (0, _tslib.__awaiter)(_this, void 0, void 0, function () {
      var cachedDigest, now, url, headers, resp, parsed, newCachedDigest;
      return (0, _tslib.__generator)(this, function (_a) {
        switch (_a.label) {
          case 0:
            cachedDigest = digests.get(webUrl);

            if (cachedDigest !== undefined) {
              now = new Date();

              if (now < cachedDigest.expiration) {
                return [2
                /*return*/
                , cachedDigest.value];
              }
            }

            url = (0, _common.combine)(webUrl, "/_api/contextinfo");
            headers = {
              "Accept": "application/json;odata=verbose",
              "Content-Type": "application/json;odata=verbose;charset=utf-8"
            };
            return [4
            /*yield*/
            , client.fetchRaw(url, {
              cache: "no-cache",
              credentials: "same-origin",
              headers: (0, _common.assign)(headers, _splibconfig.SPRuntimeConfig.headers, true),
              method: "POST"
            })];

          case 1:
            resp = _a.sent();
            return [4
            /*yield*/
            , new _odata.ODataParser().parse(resp).then(function (r) {
              return r.GetContextWebInformation;
            })];

          case 2:
            parsed = _a.sent();
            newCachedDigest = {
              expiration: (0, _common.dateAdd)(new Date(), "second", parsed.FormDigestTimeoutSeconds),
              value: parsed.FormDigestValue
            };
            digests.set(webUrl, newCachedDigest);
            return [2
            /*return*/
            , newCachedDigest.value];
        }
      });
    });
  };
}
},{"tslib":"../node_modules/tslib/tslib.es6.js","@pnp/common":"../node_modules/@pnp/common/index.js","./splibconfig":"../node_modules/@pnp/sp/splibconfig.js","./utils/extractweburl":"../node_modules/@pnp/sp/utils/extractweburl.js","./telemetry":"../node_modules/@pnp/sp/telemetry.js","@pnp/odata":"../node_modules/@pnp/odata/index.js"}],"../node_modules/@pnp/sp/utils/toabsoluteurl.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toAbsoluteUrl = toAbsoluteUrl;

var _common = require("@pnp/common");

var _splibconfig = require("../splibconfig");

/**
 * Ensures that a given url is absolute for the current web based on context
 *
 * @param candidateUrl The url to make absolute
 *
 */
function toAbsoluteUrl(candidateUrl) {
  return new Promise(function (resolve) {
    if ((0, _common.isUrlAbsolute)(candidateUrl)) {
      // if we are already absolute, then just return the url
      return resolve(candidateUrl);
    }

    if (_splibconfig.SPRuntimeConfig.baseUrl !== null) {
      // base url specified either with baseUrl of spfxContext config property
      return resolve((0, _common.combine)(_splibconfig.SPRuntimeConfig.baseUrl, candidateUrl));
    }

    if (_common.safeGlobal._spPageContextInfo !== undefined) {
      // operating in classic pages
      if ((0, _common.hOP)(_common.safeGlobal._spPageContextInfo, "webAbsoluteUrl")) {
        return resolve((0, _common.combine)(_common.safeGlobal._spPageContextInfo.webAbsoluteUrl, candidateUrl));
      } else if ((0, _common.hOP)(_common.safeGlobal._spPageContextInfo, "webServerRelativeUrl")) {
        return resolve((0, _common.combine)(_common.safeGlobal._spPageContextInfo.webServerRelativeUrl, candidateUrl));
      }
    } // does window.location exist and have a certain path part in it?


    if (_common.safeGlobal.location !== undefined) {
      var baseUrl_1 = _common.safeGlobal.location.toString().toLowerCase();

      ["/_layouts/", "/siteassets/"].forEach(function (s) {
        var index = baseUrl_1.indexOf(s);

        if (index > 0) {
          return resolve((0, _common.combine)(baseUrl_1.substr(0, index), candidateUrl));
        }
      });
    }

    return resolve(candidateUrl);
  });
}
},{"@pnp/common":"../node_modules/@pnp/common/index.js","../splibconfig":"../node_modules/@pnp/sp/splibconfig.js"}],"../node_modules/@pnp/sp/operations.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.spPostDeleteETag = exports.spPostDelete = exports.spPatch = exports.spDelete = exports.spPost = exports.spGet = void 0;

var _tslib = require("tslib");

var _odata = require("@pnp/odata");

var _sphttpclient = require("./sphttpclient");

var _common = require("@pnp/common");

var _toabsoluteurl = require("./utils/toabsoluteurl");

var spClientBinder = (0, _odata.defaultPipelineBinder)(function () {
  return new _sphttpclient.SPHttpClient();
});

var send = function (method) {
  var operation = spClientBinder(method);
  return function (o, options) {
    return (0, _tslib.__awaiter)(this, void 0, void 0, function () {
      var data, batchDependency, url;
      return (0, _tslib.__generator)(this, function (_a) {
        switch (_a.label) {
          case 0:
            data = (0, _odata.cloneQueryableData)(o.data);
            batchDependency = (0, _common.objectDefinedNotNull)(data.batch) ? data.batch.addDependency() : function () {
              return;
            };
            return [4
            /*yield*/
            , (0, _toabsoluteurl.toAbsoluteUrl)(o.toUrlAndQuery())];

          case 1:
            url = _a.sent();
            (0, _common.mergeOptions)(data.options, options);
            return [2
            /*return*/
            , operation(Object.assign({}, data, {
              batchDependency: batchDependency,
              url: url
            }))];
        }
      });
    });
  };
};

var spGet = function (o, options) {
  // Fix for #304 - when we clone objects we in some cases then execute a get request
  // in these cases the caching settings were getting dropped from the request
  // this tracks if the object from which this was cloned was caching and applies that to an immediate get request
  // does not affect objects cloned from this as we are using different fields to track the settings so it won't
  // be triggered
  if (o.data.cloneParentWasCaching) {
    o.usingCaching(o.data.cloneParentCacheOptions);
  } // if we are forcing caching set that in the data here


  if (o._forceCaching) {
    o.data.useCaching = true;
  }

  return send("GET")(o, options);
};

exports.spGet = spGet;
var spPost = send("POST");
exports.spPost = spPost;
var spDelete = send("DELETE");
exports.spDelete = spDelete;
var spPatch = send("PATCH");
exports.spPatch = spPatch;

var spPostDelete = function (o, options) {
  var opts = Object.assign((0, _odata.headers)({
    "X-HTTP-Method": "DELETE"
  }), options);
  return spPost(o, opts);
};

exports.spPostDelete = spPostDelete;

var spPostDeleteETag = function (o, options, eTag) {
  if (eTag === void 0) {
    eTag = "*";
  }

  var opts = Object.assign((0, _odata.headers)({
    "X-HTTP-Method": "DELETE",
    "IF-Match": eTag
  }), options);
  return spPost(o, opts);
};

exports.spPostDeleteETag = spPostDeleteETag;
},{"tslib":"../node_modules/tslib/tslib.es6.js","@pnp/odata":"../node_modules/@pnp/odata/index.js","./sphttpclient":"../node_modules/@pnp/sp/sphttpclient.js","@pnp/common":"../node_modules/@pnp/common/index.js","./utils/toabsoluteurl":"../node_modules/@pnp/sp/utils/toabsoluteurl.js"}],"../node_modules/@pnp/sp/sharepointqueryable.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteable = deleteable;
exports.deleteableWithETag = deleteableWithETag;
exports.SharePointQueryableInstance = exports._SharePointQueryableInstance = exports.SharePointQueryableCollection = exports._SharePointQueryableCollection = exports.SharePointQueryable = exports._SharePointQueryable = exports.spInvokableFactory = void 0;

var _tslib = require("tslib");

var _common = require("@pnp/common");

var _odata = require("@pnp/odata");

var _logging = require("@pnp/logging");

var _metadata = require("./utils/metadata");

var _operations = require("./operations");

var _telemetry = require("./telemetry");

var spInvokableFactory = function (f) {
  return (0, _odata.invokableFactory)(f);
};
/**
 * SharePointQueryable Base Class
 *
 */


exports.spInvokableFactory = spInvokableFactory;

var _SharePointQueryable =
/** @class */
function (_super) {
  (0, _tslib.__extends)(_SharePointQueryable, _super);
  /**
   * Creates a new instance of the SharePointQueryable class
   *
   * @constructor
   * @param baseUrl A string or SharePointQueryable that should form the base part of the url
   *
   */

  function _SharePointQueryable(baseUrl, path) {
    var _this = this;

    var url = "";
    var parentUrl = "";
    var query = new Map();

    if (typeof baseUrl === "string") {
      // we need to do some extra parsing to get the parent url correct if we are
      // being created from just a string.
      if ((0, _common.isUrlAbsolute)(baseUrl) || baseUrl.lastIndexOf("/") < 0) {
        parentUrl = baseUrl;
        url = (0, _common.combine)(baseUrl, path);
      } else if (baseUrl.lastIndexOf("/") > baseUrl.lastIndexOf("(")) {
        // .../items(19)/fields
        var index = baseUrl.lastIndexOf("/");
        parentUrl = baseUrl.slice(0, index);
        path = (0, _common.combine)(baseUrl.slice(index), path);
        url = (0, _common.combine)(parentUrl, path);
      } else {
        // .../items(19)
        var index = baseUrl.lastIndexOf("(");
        parentUrl = baseUrl.slice(0, index);
        url = (0, _common.combine)(baseUrl, path);
      }
    } else {
      parentUrl = baseUrl.toUrl();
      url = (0, _common.combine)(parentUrl, path || "");
      var target = baseUrl.query.get("@target");

      if (target !== undefined) {
        query.set("@target", target);
      }
    } // init base with correct values for data seed


    _this = _super.call(this, {
      parentUrl: parentUrl,
      query: query,
      url: url
    }) || this; // post init actions

    if (typeof baseUrl !== "string") {
      _this.configureFrom(baseUrl);
    }

    _this._forceCaching = false;
    return _this;
  }
  /**
   * Gets the full url with query information
   */


  _SharePointQueryable.prototype.toUrlAndQuery = function () {
    var aliasedParams = new Map(this.query);
    var url = this.toUrl().replace(/'!(@.*?)::(.*?)'/ig, function (match, labelName, value) {
      _logging.Logger.write("Rewriting aliased parameter from match " + match + " to label: " + labelName + " value: " + value, 0
      /* Verbose */
      );

      aliasedParams.set(labelName, "'" + value + "'");
      return labelName;
    });

    if (aliasedParams.size > 0) {
      var char = url.indexOf("?") > -1 ? "&" : "?";
      url += "" + char + Array.from(aliasedParams).map(function (v) {
        return v[0] + "=" + v[1];
      }).join("&");
    }

    return url;
  };
  /**
   * Choose which fields to return
   *
   * @param selects One or more fields to return
   */


  _SharePointQueryable.prototype.select = function () {
    var selects = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      selects[_i] = arguments[_i];
    }

    if (selects.length > 0) {
      this.query.set("$select", selects.join(","));
    }

    return this;
  };

  _SharePointQueryable.prototype.get = function (options) {
    return (0, _operations.spGet)(this, options);
  };
  /**
   * Expands fields such as lookups to get additional data
   *
   * @param expands The Fields for which to expand the values
   */


  _SharePointQueryable.prototype.expand = function () {
    var expands = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      expands[_i] = arguments[_i];
    }

    if (expands.length > 0) {
      this.query.set("$expand", expands.join(","));
    }

    return this;
  };
  /**
   * Clones this SharePointQueryable into a new SharePointQueryable instance of T
   * @param factory Constructor used to create the new instance
   * @param additionalPath Any additional path to include in the clone
   * @param includeBatch If true this instance's batch will be added to the cloned instance
   */


  _SharePointQueryable.prototype.clone = function (factory, additionalPath, includeBatch) {
    if (includeBatch === void 0) {
      includeBatch = true;
    }

    var clone = _super.prototype.cloneTo.call(this, factory(this, additionalPath), {
      includeBatch: includeBatch
    }); // handle sp specific clone actions


    var t = "@target";

    if (this.query.has(t)) {
      clone.query.set(t, this.query.get(t));
    }

    return clone;
  };
  /**
   * The default action for this object (unless overridden spGet)
   *
   * @param options optional request options
   */


  _SharePointQueryable.prototype.defaultAction = function (options) {
    return (0, _operations.spGet)(this, options);
  };
  /**
   * Gets a parent for this instance as specified
   *
   * @param factory The contructor for the class to create
   */


  _SharePointQueryable.prototype.getParent = function (factory, baseUrl, path, batch) {
    if (baseUrl === void 0) {
      baseUrl = this.parentUrl;
    }

    var parent = factory(baseUrl, path).configureFrom(this);
    var t = "@target";

    if (this.query.has(t)) {
      parent.query.set(t, this.query.get(t));
    }

    if (batch !== undefined) {
      parent = parent.inBatch(batch);
    }

    return parent;
  };

  return _SharePointQueryable;
}(_odata.Queryable);

exports._SharePointQueryable = _SharePointQueryable;
var SharePointQueryable = spInvokableFactory(_SharePointQueryable);
/**
 * Represents a REST collection which can be filtered, paged, and selected
 *
 */

exports.SharePointQueryable = SharePointQueryable;

var _SharePointQueryableCollection =
/** @class */
function (_super) {
  (0, _tslib.__extends)(_SharePointQueryableCollection, _super);

  function _SharePointQueryableCollection() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  /**
   * Filters the returned collection (https://msdn.microsoft.com/en-us/library/office/fp142385.aspx#bk_supported)
   *
   * @param filter The string representing the filter query
   */


  _SharePointQueryableCollection.prototype.filter = function (filter) {
    this.query.set("$filter", filter);
    return this;
  };
  /**
   * Orders based on the supplied fields
   *
   * @param orderby The name of the field on which to sort
   * @param ascending If false DESC is appended, otherwise ASC (default)
   */


  _SharePointQueryableCollection.prototype.orderBy = function (orderBy, ascending) {
    if (ascending === void 0) {
      ascending = true;
    }

    var o = "$orderby";
    var query = this.query.has(o) ? this.query.get(o).split(",") : [];
    query.push(orderBy + " " + (ascending ? "asc" : "desc"));
    this.query.set(o, query.join(","));
    return this;
  };
  /**
   * Skips the specified number of items
   *
   * @param skip The number of items to skip
   */


  _SharePointQueryableCollection.prototype.skip = function (skip) {
    this.query.set("$skip", skip.toString());
    return this;
  };
  /**
   * Limits the query to only return the specified number of items
   *
   * @param top The query row limit
   */


  _SharePointQueryableCollection.prototype.top = function (top) {
    this.query.set("$top", top.toString());
    return this;
  };

  return _SharePointQueryableCollection;
}(_SharePointQueryable);

exports._SharePointQueryableCollection = _SharePointQueryableCollection;
var SharePointQueryableCollection = spInvokableFactory(_SharePointQueryableCollection);
/**
 * Represents an instance that can be selected
 *
 */

exports.SharePointQueryableCollection = SharePointQueryableCollection;

var _SharePointQueryableInstance =
/** @class */
function (_super) {
  (0, _tslib.__extends)(_SharePointQueryableInstance, _super);

  function _SharePointQueryableInstance() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  /**
   * Curries the update function into the common pieces
   *
   * @param type
   * @param mapper
   */


  _SharePointQueryableInstance.prototype._update = function (type, mapper) {
    var _this = this;

    return function (props) {
      return (0, _operations.spPost)(_telemetry.tag.configure(_this, type + ".Update"), {
        body: (0, _common.jsS)((0, _common.assign)((0, _metadata.metadata)(type), props)),
        headers: {
          "X-HTTP-Method": "MERGE"
        }
      }).then(function (d) {
        return mapper(d, props);
      });
    };
  };

  return _SharePointQueryableInstance;
}(_SharePointQueryable);

exports._SharePointQueryableInstance = _SharePointQueryableInstance;
var SharePointQueryableInstance = spInvokableFactory(_SharePointQueryableInstance);
/**
 * Adds the a delete method to the tagged class taking no parameters and calling spPostDelete
 */

exports.SharePointQueryableInstance = SharePointQueryableInstance;

function deleteable(t) {
  return function () {
    return (0, _operations.spPostDelete)(_telemetry.tag.configure(this, t + ".delete"));
  };
}

function deleteableWithETag(t) {
  return function (eTag) {
    if (eTag === void 0) {
      eTag = "*";
    }

    return (0, _operations.spPostDeleteETag)(_telemetry.tag.configure(this, t + ".delete"), {}, eTag);
  };
}
},{"tslib":"../node_modules/tslib/tslib.es6.js","@pnp/common":"../node_modules/@pnp/common/index.js","@pnp/odata":"../node_modules/@pnp/odata/index.js","@pnp/logging":"../node_modules/@pnp/logging/index.js","./utils/metadata":"../node_modules/@pnp/sp/utils/metadata.js","./operations":"../node_modules/@pnp/sp/operations.js","./telemetry":"../node_modules/@pnp/sp/telemetry.js"}],"../node_modules/@pnp/sp/odata.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.odataUrlFrom = odataUrlFrom;
exports.spODataEntity = spODataEntity;
exports.spODataEntityArray = spODataEntityArray;

var _tslib = require("tslib");

var _common = require("@pnp/common");

var _logging = require("@pnp/logging");

var _odata = require("@pnp/odata");

var _extractweburl = require("./utils/extractweburl");

function odataUrlFrom(candidate) {
  var parts = [];
  var s = ["odata.type", "odata.editLink", "__metadata", "odata.metadata", "odata.id"];

  if ((0, _common.hOP)(candidate, s[0]) && candidate[s[0]] === "SP.Web") {
    // webs return an absolute url in the id
    if ((0, _common.hOP)(candidate, s[4])) {
      parts.push(candidate[s[4]]);
    } else if ((0, _common.hOP)(candidate, s[2])) {
      // we are dealing with verbose, which has an absolute uri
      parts.push(candidate.__metadata.uri);
    }
  } else {
    if ((0, _common.hOP)(candidate, s[3]) && (0, _common.hOP)(candidate, s[1])) {
      // we are dealign with minimal metadata (default)
      // some entities return an abosolute url in the editlink while for others it is relative
      // without the _api. This code is meant to handle both situations
      var editLink = (0, _common.isUrlAbsolute)(candidate[s[1]]) ? candidate[s[1]].split("_api")[1] : candidate[s[1]];
      parts.push((0, _extractweburl.extractWebUrl)(candidate[s[3]]), "_api", editLink);
    } else if ((0, _common.hOP)(candidate, s[1])) {
      parts.push("_api", candidate[s[1]]);
    } else if ((0, _common.hOP)(candidate, s[2])) {
      // we are dealing with verbose, which has an absolute uri
      parts.push(candidate.__metadata.uri);
    }
  }

  if (parts.length < 1) {
    _logging.Logger.write("No uri information found in ODataEntity parsing, chaining will fail for this object.", 2
    /* Warning */
    );

    return "";
  }

  return _common.combine.apply(void 0, (0, _tslib.__spread)(parts));
}

var SPODataEntityParserImpl =
/** @class */
function (_super) {
  (0, _tslib.__extends)(SPODataEntityParserImpl, _super);

  function SPODataEntityParserImpl(factory) {
    var _this = _super.call(this) || this;

    _this.factory = factory;

    _this.hydrate = function (d) {
      var o = _this.factory(odataUrlFrom(d), null);

      return (0, _common.assign)(o, d);
    };

    return _this;
  }

  SPODataEntityParserImpl.prototype.parse = function (r) {
    var _this = this;

    return _super.prototype.parse.call(this, r).then(function (d) {
      var o = _this.factory(odataUrlFrom(d), null);

      return (0, _common.assign)(o, d);
    });
  };

  return SPODataEntityParserImpl;
}(_odata.ODataParser);

var SPODataEntityArrayParserImpl =
/** @class */
function (_super) {
  (0, _tslib.__extends)(SPODataEntityArrayParserImpl, _super);

  function SPODataEntityArrayParserImpl(factory) {
    var _this = _super.call(this) || this;

    _this.factory = factory;

    _this.hydrate = function (d) {
      return d.map(function (v) {
        var o = _this.factory(odataUrlFrom(v), null);

        return (0, _common.assign)(o, v);
      });
    };

    return _this;
  }

  SPODataEntityArrayParserImpl.prototype.parse = function (r) {
    var _this = this;

    return _super.prototype.parse.call(this, r).then(function (d) {
      return d.map(function (v) {
        var o = _this.factory(odataUrlFrom(v), null);

        return (0, _common.assign)(o, v);
      });
    });
  };

  return SPODataEntityArrayParserImpl;
}(_odata.ODataParser);

function spODataEntity(factory) {
  return new SPODataEntityParserImpl(factory);
}

function spODataEntityArray(factory) {
  return new SPODataEntityArrayParserImpl(factory);
}
},{"tslib":"../node_modules/tslib/tslib.es6.js","@pnp/common":"../node_modules/@pnp/common/index.js","@pnp/logging":"../node_modules/@pnp/logging/index.js","@pnp/odata":"../node_modules/@pnp/odata/index.js","./utils/extractweburl":"../node_modules/@pnp/sp/utils/extractweburl.js"}],"../node_modules/@pnp/sp/decorators.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultPath = defaultPath;

var _tslib = require("tslib");

/**
 * Class Decorators
 */

/**
 * Decorator used to specify the default path for SharePointQueryable objects
 *
 * @param path
 */
function defaultPath(path) {
  return function (target) {
    return (
      /** @class */
      function (_super) {
        (0, _tslib.__extends)(class_1, _super);

        function class_1() {
          var args = [];

          for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
          }

          return _super.call(this, args[0], args.length > 1 && args[1] !== undefined ? args[1] : path) || this;
        }

        return class_1;
      }(target)
    );
  };
} // TODO::?
// performance tracking method decorator
// redirect to graph api
},{"tslib":"../node_modules/tslib/tslib.es6.js"}],"../node_modules/@pnp/sp/utils/escapeQueryStrValue.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.escapeQueryStrValue = escapeQueryStrValue;

var _common = require("@pnp/common");

var _logging = require("@pnp/logging");

function escapeQueryStrValue(value) {
  if ((0, _common.stringIsNullOrEmpty)(value)) {
    return "";
  } // replace all instance of ' with ''


  if (/!(@.*?)::(.*?)/ig.test(value)) {
    // to ensure our param aliasing still works we need to treat these special or we'll hear about it
    // so we encode JUST the part that will end up in the url
    return value.replace(/!(@.*?)::(.*)$/ig, function (match, labelName, v) {
      _logging.Logger.write("Rewriting aliased parameter from match " + match + " to label: " + labelName + " value: " + v, 0
      /* Verbose */
      );

      return "!" + labelName + "::" + encodeURIComponent(v.replace(/\'/ig, "''"));
    });
  } else {
    return encodeURIComponent(value.replace(/\'/ig, "''"));
  }
}
},{"@pnp/common":"../node_modules/@pnp/common/index.js","@pnp/logging":"../node_modules/@pnp/logging/index.js"}],"../node_modules/@pnp/sp/utils/toResourcePath.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toResourcePath = toResourcePath;

function toResourcePath(url) {
  return {
    DecodedUrl: url,
    __metadata: {
      type: "SP.ResourcePath"
    }
  };
}
},{}],"../node_modules/@pnp/sp/lists/types.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ControlMode = exports.RenderListDataOptions = exports.List = exports._List = exports.Lists = exports._Lists = void 0;

var _tslib = require("tslib");

var _common = require("@pnp/common");

var _odata = require("@pnp/odata");

var _sharepointqueryable = require("../sharepointqueryable");

var _odata2 = require("../odata");

var _metadata = require("../utils/metadata");

var _decorators = require("../decorators");

var _operations = require("../operations");

var _escapeQueryStrValue = require("../utils/escapeQueryStrValue");

var _telemetry = require("../telemetry");

var _toResourcePath = require("../utils/toResourcePath");

var _Lists =
/** @class */
function (_super) {
  (0, _tslib.__extends)(_Lists, _super);

  function _Lists() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  /**
   * Gets a list from the collection by guid id
   *
   * @param id The Id of the list (GUID)
   */


  _Lists.prototype.getById = function (id) {
    return _telemetry.tag.configure(List(this).concat("('" + id + "')"), "ls.getById");
  };
  /**
   * Gets a list from the collection by title
   *
   * @param title The title of the list
   */


  _Lists.prototype.getByTitle = function (title) {
    return _telemetry.tag.configure(List(this, "getByTitle('" + (0, _escapeQueryStrValue.escapeQueryStrValue)(title) + "')"), "ls.getByTitle");
  };
  /**
   * Adds a new list to the collection
   *
   * @param title The new list's title
   * @param description The new list's description
   * @param template The list template value
   * @param enableContentTypes If true content types will be allowed and enabled, otherwise they will be disallowed and not enabled
   * @param additionalSettings Will be passed as part of the list creation body
   */


  _Lists.prototype.add = function (title, desc, template, enableContentTypes, additionalSettings) {
    if (desc === void 0) {
      desc = "";
    }

    if (template === void 0) {
      template = 100;
    }

    if (enableContentTypes === void 0) {
      enableContentTypes = false;
    }

    if (additionalSettings === void 0) {
      additionalSettings = {};
    }

    return (0, _tslib.__awaiter)(this, void 0, void 0, function () {
      var addSettings, data;
      return (0, _tslib.__generator)(this, function (_a) {
        switch (_a.label) {
          case 0:
            addSettings = Object.assign({
              "AllowContentTypes": enableContentTypes,
              "BaseTemplate": template,
              "ContentTypesEnabled": enableContentTypes,
              "Description": desc,
              "Title": title
            }, (0, _metadata.metadata)("SP.List"), additionalSettings);
            return [4
            /*yield*/
            , (0, _operations.spPost)(this, (0, _odata.body)(addSettings))];

          case 1:
            data = _a.sent();
            return [2
            /*return*/
            , {
              data: data,
              list: this.getByTitle(addSettings.Title)
            }];
        }
      });
    });
  };
  /**
   * Ensures that the specified list exists in the collection (note: this method not supported for batching)
   *
   * @param title The new list's title
   * @param desc The new list's description
   * @param template The list template value
   * @param enableContentTypes If true content types will be allowed and enabled, otherwise they will be disallowed and not enabled
   * @param additionalSettings Will be passed as part of the list creation body or used to update an existing list
   */


  _Lists.prototype.ensure = function (title, desc, template, enableContentTypes, additionalSettings) {
    if (desc === void 0) {
      desc = "";
    }

    if (template === void 0) {
      template = 100;
    }

    if (enableContentTypes === void 0) {
      enableContentTypes = false;
    }

    if (additionalSettings === void 0) {
      additionalSettings = {};
    }

    return (0, _tslib.__awaiter)(this, void 0, void 0, function () {
      var addOrUpdateSettings, list, data, e_1, data;
      return (0, _tslib.__generator)(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (this.hasBatch) {
              throw Error("The ensure list method is not supported for use in a batch.");
            }

            addOrUpdateSettings = (0, _common.assign)(additionalSettings, {
              Title: title,
              Description: desc,
              ContentTypesEnabled: enableContentTypes
            }, true);
            list = this.getByTitle(addOrUpdateSettings.Title);
            _a.label = 1;

          case 1:
            _a.trys.push([1, 4,, 6]); // this will throw if the list doesn't exist


            return [4
            /*yield*/
            , list.select("Title")()];

          case 2:
            // this will throw if the list doesn't exist
            _a.sent();

            return [4
            /*yield*/
            , list.update(addOrUpdateSettings).then(function (r) {
              return r.data;
            })];

          case 3:
            data = _a.sent();
            return [2
            /*return*/
            , {
              created: false,
              data: data,
              list: this.getByTitle(addOrUpdateSettings.Title)
            }];

          case 4:
            e_1 = _a.sent();
            return [4
            /*yield*/
            , this.add(title, desc, template, enableContentTypes, addOrUpdateSettings).then(function (r) {
              return r.data;
            })];

          case 5:
            data = _a.sent();
            return [2
            /*return*/
            , {
              created: true,
              data: data,
              list: this.getByTitle(addOrUpdateSettings.Title)
            }];

          case 6:
            return [2
            /*return*/
            ];
        }
      });
    });
  };
  /**
   * Gets a list that is the default asset location for images or other files, which the users upload to their wiki pages.
   */


  _Lists.prototype.ensureSiteAssetsLibrary = function () {
    return (0, _tslib.__awaiter)(this, void 0, void 0, function () {
      var json;
      return (0, _tslib.__generator)(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4
            /*yield*/
            , (0, _operations.spPost)(this.clone(Lists, "ensuresiteassetslibrary"))];

          case 1:
            json = _a.sent();
            return [2
            /*return*/
            , List((0, _odata2.odataUrlFrom)(json))];
        }
      });
    });
  };
  /**
   * Gets a list that is the default location for wiki pages.
   */


  _Lists.prototype.ensureSitePagesLibrary = function () {
    return (0, _tslib.__awaiter)(this, void 0, void 0, function () {
      var json;
      return (0, _tslib.__generator)(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4
            /*yield*/
            , (0, _operations.spPost)(this.clone(Lists, "ensuresitepageslibrary"))];

          case 1:
            json = _a.sent();
            return [2
            /*return*/
            , List((0, _odata2.odataUrlFrom)(json))];
        }
      });
    });
  };

  (0, _tslib.__decorate)([(0, _telemetry.tag)("ls.add")], _Lists.prototype, "add", null);
  (0, _tslib.__decorate)([(0, _telemetry.tag)("ls.ensure")], _Lists.prototype, "ensure", null);
  (0, _tslib.__decorate)([(0, _telemetry.tag)("ls.ensureSiteAssetsLibrary")], _Lists.prototype, "ensureSiteAssetsLibrary", null);
  (0, _tslib.__decorate)([(0, _telemetry.tag)("ls.ensureSitePagesLibrary")], _Lists.prototype, "ensureSitePagesLibrary", null);
  _Lists = (0, _tslib.__decorate)([(0, _decorators.defaultPath)("lists")], _Lists);
  return _Lists;
}(_sharepointqueryable._SharePointQueryableCollection);

exports._Lists = _Lists;
var Lists = (0, _sharepointqueryable.spInvokableFactory)(_Lists);
exports.Lists = Lists;

var _List =
/** @class */
function (_super) {
  (0, _tslib.__extends)(_List, _super);

  function _List() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.delete = (0, _sharepointqueryable.deleteableWithETag)("l");
    return _this;
  }

  Object.defineProperty(_List.prototype, "effectiveBasePermissions", {
    /**
     * Gets the effective base permissions of this list
     *
     */
    get: function () {
      return _telemetry.tag.configure((0, _sharepointqueryable.SharePointQueryable)(this, "EffectiveBasePermissions"), "l.effectiveBasePermissions");
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(_List.prototype, "eventReceivers", {
    /**
     * Gets the event receivers attached to this list
     *
     */
    get: function () {
      return _telemetry.tag.configure((0, _sharepointqueryable.SharePointQueryableCollection)(this, "EventReceivers"), "l.eventReceivers");
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(_List.prototype, "relatedFields", {
    /**
     * Gets the related fields of this list
     *
     */
    get: function () {
      return _telemetry.tag.configure((0, _sharepointqueryable.SharePointQueryable)(this, "getRelatedFields"), "l.relatedFields");
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(_List.prototype, "informationRightsManagementSettings", {
    /**
     * Gets the IRM settings for this list
     *
     */
    get: function () {
      return _telemetry.tag.configure((0, _sharepointqueryable.SharePointQueryable)(this, "InformationRightsManagementSettings"), "l.informationRightsManagementSettings");
    },
    enumerable: true,
    configurable: true
  });
  /**
   * Updates this list intance with the supplied properties
   *
   * @param properties A plain object hash of values to update for the list
   * @param eTag Value used in the IF-Match header, by default "*"
   */

  _List.prototype.update = function (properties, eTag) {
    if (eTag === void 0) {
      eTag = "*";
    }

    return (0, _tslib.__awaiter)(this, void 0, void 0, function () {
      var postBody, data, list;
      return (0, _tslib.__generator)(this, function (_a) {
        switch (_a.label) {
          case 0:
            postBody = (0, _odata.body)((0, _common.assign)((0, _metadata.metadata)("SP.List"), properties), (0, _odata.headers)({
              "IF-Match": eTag,
              "X-HTTP-Method": "MERGE"
            }));
            return [4
            /*yield*/
            , (0, _operations.spPost)(this, postBody)];

          case 1:
            data = _a.sent();
            list = this;

            if ((0, _common.hOP)(properties, "Title")) {
              list = this.getParent(List, this.parentUrl, "getByTitle('" + properties.Title + "')");
            }

            return [2
            /*return*/
            , {
              data: data,
              list: list
            }];
        }
      });
    });
  };
  /**
   * Returns the collection of changes from the change log that have occurred within the list, based on the specified query.
   * @param query A query that is performed against the change log.
   */


  _List.prototype.getChanges = function (query) {
    return (0, _operations.spPost)(this.clone(List, "getchanges"), (0, _odata.body)({
      query: (0, _common.assign)((0, _metadata.metadata)("SP.ChangeQuery"), query)
    }));
  };
  /**
   * Returns the collection of items in the list based on the provided CamlQuery
   * @param query A query that is performed against the list
   * @param expands An expanded array of n items that contains fields to expand in the CamlQuery
   */


  _List.prototype.getItemsByCAMLQuery = function (query) {
    var expands = [];

    for (var _i = 1; _i < arguments.length; _i++) {
      expands[_i - 1] = arguments[_i];
    }

    var q = this.clone(List, "getitems");
    return (0, _operations.spPost)(q.expand.apply(q, expands), (0, _odata.body)({
      query: (0, _common.assign)((0, _metadata.metadata)("SP.CamlQuery"), query)
    }));
  };
  /**
   * See: https://msdn.microsoft.com/en-us/library/office/dn292554.aspx
   * @param query An object that defines the change log item query
   */


  _List.prototype.getListItemChangesSinceToken = function (query) {
    var o = this.clone(List, "getlistitemchangessincetoken").usingParser({
      parse: function (r) {
        return r.text();
      }
    });
    return (0, _operations.spPost)(o, (0, _odata.body)({
      "query": (0, _common.assign)((0, _metadata.metadata)("SP.ChangeLogItemQuery"), query)
    }));
  };
  /**
   * Moves the list to the Recycle Bin and returns the identifier of the new Recycle Bin item.
   */


  _List.prototype.recycle = function () {
    return (0, _tslib.__awaiter)(this, void 0, void 0, function () {
      var data;
      return (0, _tslib.__generator)(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4
            /*yield*/
            , (0, _operations.spPost)(this.clone(List, "recycle"))];

          case 1:
            data = _a.sent();
            return [2
            /*return*/
            , (0, _common.hOP)(data, "Recycle") ? data.Recycle : data];
        }
      });
    });
  };
  /**
   * Renders list data based on the view xml provided
   * @param viewXml A string object representing a view xml
   */


  _List.prototype.renderListData = function (viewXml) {
    return (0, _tslib.__awaiter)(this, void 0, void 0, function () {
      var q, data;
      return (0, _tslib.__generator)(this, function (_a) {
        switch (_a.label) {
          case 0:
            q = this.clone(List, "renderlistdata(@viewXml)");
            q.query.set("@viewXml", "'" + viewXml + "'");
            return [4
            /*yield*/
            , (0, _operations.spPost)(q)];

          case 1:
            data = _a.sent(); // data will be a string, so we parse it again

            return [2
            /*return*/
            , JSON.parse((0, _common.hOP)(data, "RenderListData") ? data.RenderListData : data)];
        }
      });
    });
  };
  /**
   * Returns the data for the specified query view
   *
   * @param parameters The parameters to be used to render list data as JSON string.
   * @param overrideParameters The parameters that are used to override and extend the regular SPRenderListDataParameters.
   * @param queryParams Allows setting of query parameters
   */


  _List.prototype.renderListDataAsStream = function (parameters, overrideParameters, queryParams) {
    if (overrideParameters === void 0) {
      overrideParameters = null;
    }

    if (queryParams === void 0) {
      queryParams = new Map();
    }

    if ((0, _common.hOP)(parameters, "RenderOptions") && (0, _common.isArray)(parameters.RenderOptions)) {
      parameters.RenderOptions = parameters.RenderOptions.reduce(function (v, c) {
        return v + c;
      });
    }

    var postBody = (0, _odata.body)({
      overrideParameters: (0, _common.assign)((0, _metadata.metadata)("SP.RenderListDataOverrideParameters"), overrideParameters),
      parameters: (0, _common.assign)((0, _metadata.metadata)("SP.RenderListDataParameters"), parameters)
    });
    var clone = this.clone(List, "RenderListDataAsStream", true);

    if (queryParams && queryParams.size > 0) {
      queryParams.forEach(function (v, k) {
        return clone.query.set(k, v);
      });
    }

    return (0, _operations.spPost)(clone, postBody);
  };
  /**
   * Gets the field values and field schema attributes for a list item.
   * @param itemId Item id of the item to render form data for
   * @param formId The id of the form
   * @param mode Enum representing the control mode of the form (Display, Edit, New)
   */


  _List.prototype.renderListFormData = function (itemId, formId, mode) {
    return (0, _tslib.__awaiter)(this, void 0, void 0, function () {
      var data;
      return (0, _tslib.__generator)(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4
            /*yield*/
            , (0, _operations.spPost)(this.clone(List, "renderlistformdata(itemid=" + itemId + ", formid='" + formId + "', mode='" + mode + "')"))];

          case 1:
            data = _a.sent(); // data will be a string, so we parse it again

            return [2
            /*return*/
            , JSON.parse((0, _common.hOP)(data, "RenderListFormData") ? data.RenderListFormData : data)];
        }
      });
    });
  };
  /**
   * Reserves a list item ID for idempotent list item creation.
   */


  _List.prototype.reserveListItemId = function () {
    return (0, _tslib.__awaiter)(this, void 0, void 0, function () {
      var data;
      return (0, _tslib.__generator)(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4
            /*yield*/
            , (0, _operations.spPost)(this.clone(List, "reservelistitemid"))];

          case 1:
            data = _a.sent();
            return [2
            /*return*/
            , (0, _common.hOP)(data, "ReserveListItemId") ? data.ReserveListItemId : data];
        }
      });
    });
  };
  /**
   * Returns the ListItemEntityTypeFullName for this list, used when adding/updating list items. Does not support batching.
   */


  _List.prototype.getListItemEntityTypeFullName = function () {
    return this.clone(List, null, false).select("ListItemEntityTypeFullName").get().then(function (o) {
      return o.ListItemEntityTypeFullName;
    });
  };
  /**
   * Creates an item using path (in a folder), validates and sets its field values.
   *
   * @param formValues The fields to change and their new values.
   * @param decodedUrl Path decoded url; folder's server relative path.
   * @param bNewDocumentUpdate true if the list item is a document being updated after upload; otherwise false.
   * @param checkInComment Optional check in comment.
   * @param additionalProps Optional set of additional properties LeafName new document file name,
   */


  _List.prototype.addValidateUpdateItemUsingPath = function (formValues, decodedUrl, bNewDocumentUpdate, checkInComment, additionalProps) {
    if (bNewDocumentUpdate === void 0) {
      bNewDocumentUpdate = false;
    }

    return (0, _tslib.__awaiter)(this, void 0, void 0, function () {
      var addProps, res;
      return (0, _tslib.__generator)(this, function (_a) {
        switch (_a.label) {
          case 0:
            addProps = {
              FolderPath: (0, _toResourcePath.toResourcePath)(decodedUrl)
            };

            if ((0, _common.objectDefinedNotNull)(additionalProps)) {
              if (additionalProps.leafName) {
                addProps.LeafName = (0, _toResourcePath.toResourcePath)(additionalProps.leafName);
              }

              if (additionalProps.objectType) {
                addProps.UnderlyingObjectType = additionalProps.objectType;
              }
            }

            return [4
            /*yield*/
            , (0, _operations.spPost)(this.clone(List, "AddValidateUpdateItemUsingPath()"), (0, _odata.body)({
              bNewDocumentUpdate: bNewDocumentUpdate,
              checkInComment: checkInComment,
              formValues: formValues,
              listItemCreateInfo: (0, _common.assign)((0, _metadata.metadata)("SP.ListItemCreationInformationUsingPath"), addProps)
            }))];

          case 1:
            res = _a.sent();
            return [2
            /*return*/
            , (0, _common.hOP)(res, "AddValidateUpdateItemUsingPath") ? res.AddValidateUpdateItemUsingPath : res];
        }
      });
    });
  };

  (0, _tslib.__decorate)([(0, _telemetry.tag)("l.update")], _List.prototype, "update", null);
  (0, _tslib.__decorate)([(0, _telemetry.tag)("l.getChanges")], _List.prototype, "getChanges", null);
  (0, _tslib.__decorate)([(0, _telemetry.tag)("l.CAMLQuery")], _List.prototype, "getItemsByCAMLQuery", null);
  (0, _tslib.__decorate)([(0, _telemetry.tag)("l.ChangesSinceToken")], _List.prototype, "getListItemChangesSinceToken", null);
  (0, _tslib.__decorate)([(0, _telemetry.tag)("l.recycle")], _List.prototype, "recycle", null);
  (0, _tslib.__decorate)([(0, _telemetry.tag)("l.renderListData")], _List.prototype, "renderListData", null);
  (0, _tslib.__decorate)([(0, _telemetry.tag)("l.AsStream")], _List.prototype, "renderListDataAsStream", null);
  (0, _tslib.__decorate)([(0, _telemetry.tag)("l.renderListFormData")], _List.prototype, "renderListFormData", null);
  (0, _tslib.__decorate)([(0, _telemetry.tag)("l.reserveListItemId")], _List.prototype, "reserveListItemId", null);
  (0, _tslib.__decorate)([(0, _telemetry.tag)("l.getListItemEntityTypeFullName")], _List.prototype, "getListItemEntityTypeFullName", null);
  (0, _tslib.__decorate)([(0, _telemetry.tag)("l.addValidateUpdateItemUsingPath")], _List.prototype, "addValidateUpdateItemUsingPath", null);
  return _List;
}(_sharepointqueryable._SharePointQueryableInstance);

exports._List = _List;
var List = (0, _sharepointqueryable.spInvokableFactory)(_List);
/**
 * Enum representing the options of the RenderOptions property on IRenderListDataParameters interface
 */

exports.List = List;
var RenderListDataOptions;
exports.RenderListDataOptions = RenderListDataOptions;

(function (RenderListDataOptions) {
  RenderListDataOptions[RenderListDataOptions["None"] = 0] = "None";
  RenderListDataOptions[RenderListDataOptions["ContextInfo"] = 1] = "ContextInfo";
  RenderListDataOptions[RenderListDataOptions["ListData"] = 2] = "ListData";
  RenderListDataOptions[RenderListDataOptions["ListSchema"] = 4] = "ListSchema";
  RenderListDataOptions[RenderListDataOptions["MenuView"] = 8] = "MenuView";
  RenderListDataOptions[RenderListDataOptions["ListContentType"] = 16] = "ListContentType";
  RenderListDataOptions[RenderListDataOptions["FileSystemItemId"] = 32] = "FileSystemItemId";
  RenderListDataOptions[RenderListDataOptions["ClientFormSchema"] = 64] = "ClientFormSchema";
  RenderListDataOptions[RenderListDataOptions["QuickLaunch"] = 128] = "QuickLaunch";
  RenderListDataOptions[RenderListDataOptions["Spotlight"] = 256] = "Spotlight";
  RenderListDataOptions[RenderListDataOptions["Visualization"] = 512] = "Visualization";
  RenderListDataOptions[RenderListDataOptions["ViewMetadata"] = 1024] = "ViewMetadata";
  RenderListDataOptions[RenderListDataOptions["DisableAutoHyperlink"] = 2048] = "DisableAutoHyperlink";
  RenderListDataOptions[RenderListDataOptions["EnableMediaTAUrls"] = 4096] = "EnableMediaTAUrls";
  RenderListDataOptions[RenderListDataOptions["ParentInfo"] = 8192] = "ParentInfo";
  RenderListDataOptions[RenderListDataOptions["PageContextInfo"] = 16384] = "PageContextInfo";
  RenderListDataOptions[RenderListDataOptions["ClientSideComponentManifest"] = 32768] = "ClientSideComponentManifest";
})(RenderListDataOptions || (exports.RenderListDataOptions = RenderListDataOptions = {}));
/**
 * Determines the display mode of the given control or view
 */


var ControlMode;
exports.ControlMode = ControlMode;

(function (ControlMode) {
  ControlMode[ControlMode["Display"] = 1] = "Display";
  ControlMode[ControlMode["Edit"] = 2] = "Edit";
  ControlMode[ControlMode["New"] = 3] = "New";
})(ControlMode || (exports.ControlMode = ControlMode = {}));
},{"tslib":"../node_modules/tslib/tslib.es6.js","@pnp/common":"../node_modules/@pnp/common/index.js","@pnp/odata":"../node_modules/@pnp/odata/index.js","../sharepointqueryable":"../node_modules/@pnp/sp/sharepointqueryable.js","../odata":"../node_modules/@pnp/sp/odata.js","../utils/metadata":"../node_modules/@pnp/sp/utils/metadata.js","../decorators":"../node_modules/@pnp/sp/decorators.js","../operations":"../node_modules/@pnp/sp/operations.js","../utils/escapeQueryStrValue":"../node_modules/@pnp/sp/utils/escapeQueryStrValue.js","../telemetry":"../node_modules/@pnp/sp/telemetry.js","../utils/toResourcePath":"../node_modules/@pnp/sp/utils/toResourcePath.js"}],"../node_modules/@pnp/sp/items/types.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PagedItemCollection = exports.ItemVersion = exports._ItemVersion = exports.ItemVersions = exports._ItemVersions = exports.Item = exports._Item = exports.Items = exports._Items = void 0;

var _tslib = require("tslib");

var _sharepointqueryable = require("../sharepointqueryable");

var _common = require("@pnp/common");

var _types = require("../lists/types");

var _odata = require("@pnp/odata");

var _logging = require("@pnp/logging");

var _metadata = require("../utils/metadata");

var _decorators = require("../decorators");

var _operations = require("../operations");

var _telemetry = require("../telemetry");

/**
 * Describes a collection of Item objects
 *
 */
var _Items =
/** @class */
function (_super) {
  (0, _tslib.__extends)(_Items, _super);

  function _Items() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  /**
  * Gets an Item by id
  *
  * @param id The integer id of the item to retrieve
  */


  _Items.prototype.getById = function (id) {
    return _telemetry.tag.configure(Item(this).concat("(" + id + ")"), "is.getById");
  };
  /**
   * Gets BCS Item by string id
   *
   * @param stringId The string id of the BCS item to retrieve
   */


  _Items.prototype.getItemByStringId = function (stringId) {
    // creates an item with the parent list path and append out method call
    return _telemetry.tag.configure(Item(this.parentUrl, "getItemByStringId('" + stringId + "')"), "is.getItemByStringId");
  };
  /**
   * Skips the specified number of items (https://msdn.microsoft.com/en-us/library/office/fp142385.aspx#sectionSection6)
   *
   * @param skip The starting id where the page should start, use with top to specify pages
   * @param reverse It true the PagedPrev=true parameter is added allowing backwards navigation in the collection
   */


  _Items.prototype.skip = function (skip, reverse) {
    if (reverse === void 0) {
      reverse = false;
    }

    if (reverse) {
      this.query.set("$skiptoken", encodeURIComponent("Paged=TRUE&PagedPrev=TRUE&p_ID=" + skip));
    } else {
      this.query.set("$skiptoken", encodeURIComponent("Paged=TRUE&p_ID=" + skip));
    }

    return this;
  };
  /**
   * Gets a collection designed to aid in paging through data
   *
   */


  _Items.prototype.getPaged = function () {
    return this.usingParser(new PagedItemCollectionParser(this))();
  };
  /**
   * Gets all the items in a list, regardless of count. Does not support batching or caching
   *
   *  @param requestSize Number of items to return in each request (Default: 2000)
   *  @param acceptHeader Allows for setting the value of the Accept header for SP 2013 support
   */


  _Items.prototype.getAll = function (requestSize, acceptHeader) {
    if (requestSize === void 0) {
      requestSize = 2000;
    }

    if (acceptHeader === void 0) {
      acceptHeader = "application/json;odata=nometadata";
    }

    _logging.Logger.write("Calling items.getAll should be done sparingly. Ensure this is the correct choice. If you are unsure, it is not.", 2
    /* Warning */
    ); // this will be used for the actual query
    // and we set no metadata here to try and reduce traffic


    var items = Items(this, "").top(requestSize).configure({
      headers: {
        "Accept": acceptHeader
      }
    }); // let's copy over the odata query params that can be applied
    // $top - allow setting the page size this way (override what we did above)
    // $select - allow picking the return fields (good behavior)
    // $filter - allow setting a filter, though this may fail due for large lists

    this.query.forEach(function (v, k) {
      if (/^\$select|filter|top|expand$/i.test(k)) {
        items.query.set(k, v);
      }
    }); // give back the promise

    return new Promise(function (resolve, reject) {
      // this will eventually hold the items we return
      var itemsCollector = []; // action that will gather up our results recursively

      var gatherer = function (last) {
        // collect that set of results
        [].push.apply(itemsCollector, last.results); // if we have more, repeat - otherwise resolve with the collected items

        if (last.hasNext) {
          last.getNext().then(gatherer).catch(reject);
        } else {
          resolve(itemsCollector);
        }
      }; // start the cycle


      items.getPaged().then(gatherer).catch(reject);
    });
  };
  /**
   * Adds a new item to the collection
   *
   * @param properties The new items's properties
   * @param listItemEntityTypeFullName The type name of the list's entities
   */


  _Items.prototype.add = function (properties, listItemEntityTypeFullName) {
    if (properties === void 0) {
      properties = {};
    }

    if (listItemEntityTypeFullName === void 0) {
      listItemEntityTypeFullName = null;
    }

    return (0, _tslib.__awaiter)(this, void 0, void 0, function () {
      var removeDependency, listItemEntityType, postBody, promise;

      var _this = this;

      return (0, _tslib.__generator)(this, function (_a) {
        switch (_a.label) {
          case 0:
            removeDependency = this.addBatchDependency();
            return [4
            /*yield*/
            , this.ensureListItemEntityTypeName(listItemEntityTypeFullName)];

          case 1:
            listItemEntityType = _a.sent();
            postBody = (0, _odata.body)((0, _common.assign)((0, _metadata.metadata)(listItemEntityType), properties));
            promise = (0, _operations.spPost)(this.clone(Items, ""), postBody).then(function (data) {
              return {
                data: data,
                item: _this.getById(data.Id)
              };
            });
            removeDependency();
            return [2
            /*return*/
            , promise];
        }
      });
    });
  };
  /**
   * Ensures we have the proper list item entity type name, either from the value provided or from the list
   *
   * @param candidatelistItemEntityTypeFullName The potential type name
   */


  _Items.prototype.ensureListItemEntityTypeName = function (candidatelistItemEntityTypeFullName) {
    return candidatelistItemEntityTypeFullName ? Promise.resolve(candidatelistItemEntityTypeFullName) : this.getParent(_types.List).getListItemEntityTypeFullName();
  };

  (0, _tslib.__decorate)([(0, _telemetry.tag)("is.getPaged")], _Items.prototype, "getPaged", null);
  (0, _tslib.__decorate)([(0, _telemetry.tag)("is.getAll")], _Items.prototype, "getAll", null);
  (0, _tslib.__decorate)([(0, _telemetry.tag)("is.add")], _Items.prototype, "add", null);
  _Items = (0, _tslib.__decorate)([(0, _decorators.defaultPath)("items")], _Items);
  return _Items;
}(_sharepointqueryable._SharePointQueryableCollection);

exports._Items = _Items;
var Items = (0, _sharepointqueryable.spInvokableFactory)(_Items);
/**
 * Descrines a single Item instance
 *
 */

exports.Items = Items;

var _Item =
/** @class */
function (_super) {
  (0, _tslib.__extends)(_Item, _super);

  function _Item() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.delete = (0, _sharepointqueryable.deleteableWithETag)("i");
    return _this;
  }

  Object.defineProperty(_Item.prototype, "effectiveBasePermissions", {
    /**
     * Gets the effective base permissions for the item
     *
     */
    get: function () {
      return _telemetry.tag.configure((0, _sharepointqueryable.SharePointQueryable)(this, "EffectiveBasePermissions"), "i.effectiveBasePermissions");
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(_Item.prototype, "effectiveBasePermissionsForUI", {
    /**
     * Gets the effective base permissions for the item in a UI context
     *
     */
    get: function () {
      return _telemetry.tag.configure((0, _sharepointqueryable.SharePointQueryable)(this, "EffectiveBasePermissionsForUI"), "i.effectiveBasePermissionsForUI");
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(_Item.prototype, "fieldValuesAsHTML", {
    /**
     * Gets the field values for this list item in their HTML representation
     *
     */
    get: function () {
      return _telemetry.tag.configure((0, _sharepointqueryable.SharePointQueryableInstance)(this, "FieldValuesAsHTML"), "i.fvHTML");
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(_Item.prototype, "fieldValuesAsText", {
    /**
     * Gets the field values for this list item in their text representation
     *
     */
    get: function () {
      return _telemetry.tag.configure((0, _sharepointqueryable.SharePointQueryableInstance)(this, "FieldValuesAsText"), "i.fvText");
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(_Item.prototype, "fieldValuesForEdit", {
    /**
     * Gets the field values for this list item for use in editing controls
     *
     */
    get: function () {
      return _telemetry.tag.configure((0, _sharepointqueryable.SharePointQueryableInstance)(this, "FieldValuesForEdit"), "i.fvEdit");
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(_Item.prototype, "versions", {
    /**
     * Gets the collection of versions associated with this item
     */
    get: function () {
      return _telemetry.tag.configure(ItemVersions(this), "i.versions");
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(_Item.prototype, "list", {
    get: function () {
      return this.getParent(_types.List, this.parentUrl.substr(0, this.parentUrl.lastIndexOf("/")));
    },
    enumerable: true,
    configurable: true
  });
  /**
   * Updates this list intance with the supplied properties
   *
   * @param properties A plain object hash of values to update for the list
   * @param eTag Value used in the IF-Match header, by default "*"
   * @param listItemEntityTypeFullName The type name of the list's entities
   */

  _Item.prototype.update = function (properties, eTag, listItemEntityTypeFullName) {
    if (eTag === void 0) {
      eTag = "*";
    }

    if (listItemEntityTypeFullName === void 0) {
      listItemEntityTypeFullName = null;
    }

    return (0, _tslib.__awaiter)(this, void 0, void 0, function () {
      var removeDependency, listItemEntityType, postBody, poster, data;
      return (0, _tslib.__generator)(this, function (_a) {
        switch (_a.label) {
          case 0:
            removeDependency = this.addBatchDependency();
            return [4
            /*yield*/
            , this.ensureListItemEntityTypeName(listItemEntityTypeFullName)];

          case 1:
            listItemEntityType = _a.sent();
            postBody = (0, _odata.body)((0, _common.assign)((0, _metadata.metadata)(listItemEntityType), properties), (0, _odata.headers)({
              "IF-Match": eTag,
              "X-HTTP-Method": "MERGE"
            }));
            removeDependency();
            poster = _telemetry.tag.configure(this.clone(Item).usingParser(new ItemUpdatedParser()), "i.update");
            return [4
            /*yield*/
            , (0, _operations.spPost)(poster, postBody)];

          case 2:
            data = _a.sent();
            return [2
            /*return*/
            , {
              data: data,
              item: this
            }];
        }
      });
    });
  };
  /**
   * Moves the list item to the Recycle Bin and returns the identifier of the new Recycle Bin item.
   */


  _Item.prototype.recycle = function () {
    return (0, _operations.spPost)(this.clone(Item, "recycle"));
  };
  /**
   * Gets a string representation of the full URL to the WOPI frame.
   * If there is no associated WOPI application, or no associated action, an empty string is returned.
   *
   * @param action Display mode: 0: view, 1: edit, 2: mobileView, 3: interactivePreview
   */


  _Item.prototype.getWopiFrameUrl = function (action) {
    if (action === void 0) {
      action = 0;
    }

    return (0, _tslib.__awaiter)(this, void 0, void 0, function () {
      var i, data;
      return (0, _tslib.__generator)(this, function (_a) {
        switch (_a.label) {
          case 0:
            i = this.clone(Item, "getWOPIFrameUrl(@action)");
            i.query.set("@action", action);
            return [4
            /*yield*/
            , (0, _operations.spPost)(i)];

          case 1:
            data = _a.sent(); // handle verbose mode

            if ((0, _common.hOP)(data, "GetWOPIFrameUrl")) {
              return [2
              /*return*/
              , data.GetWOPIFrameUrl];
            }

            return [2
            /*return*/
            , data];
        }
      });
    });
  };
  /**
   * Validates and sets the values of the specified collection of fields for the list item.
   *
   * @param formValues The fields to change and their new values.
   * @param bNewDocumentUpdate true if the list item is a document being updated after upload; otherwise false.
   */


  _Item.prototype.validateUpdateListItem = function (formValues, bNewDocumentUpdate) {
    if (bNewDocumentUpdate === void 0) {
      bNewDocumentUpdate = false;
    }

    return (0, _operations.spPost)(this.clone(Item, "validateupdatelistitem"), (0, _odata.body)({
      formValues: formValues,
      bNewDocumentUpdate: bNewDocumentUpdate
    }));
  };
  /**
   * Ensures we have the proper list item entity type name, either from the value provided or from the list
   *
   * @param candidatelistItemEntityTypeFullName The potential type name
   */


  _Item.prototype.ensureListItemEntityTypeName = function (candidatelistItemEntityTypeFullName) {
    return candidatelistItemEntityTypeFullName ? Promise.resolve(candidatelistItemEntityTypeFullName) : this.list.getListItemEntityTypeFullName();
  };

  (0, _tslib.__decorate)([(0, _telemetry.tag)("i.recycle")], _Item.prototype, "recycle", null);
  (0, _tslib.__decorate)([(0, _telemetry.tag)("i.getWopiFrameUrl")], _Item.prototype, "getWopiFrameUrl", null);
  (0, _tslib.__decorate)([(0, _telemetry.tag)("i.validateUpdateListItem")], _Item.prototype, "validateUpdateListItem", null);
  return _Item;
}(_sharepointqueryable._SharePointQueryableInstance);

exports._Item = _Item;
var Item = (0, _sharepointqueryable.spInvokableFactory)(_Item);
/**
 * Describes a collection of Version objects
 *
 */

exports.Item = Item;

var _ItemVersions =
/** @class */
function (_super) {
  (0, _tslib.__extends)(_ItemVersions, _super);

  function _ItemVersions() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  /**
   * Gets a version by id
   *
   * @param versionId The id of the version to retrieve
   */


  _ItemVersions.prototype.getById = function (versionId) {
    return _telemetry.tag.configure(ItemVersion(this).concat("(" + versionId + ")"), "iv.getById");
  };

  _ItemVersions = (0, _tslib.__decorate)([(0, _decorators.defaultPath)("versions")], _ItemVersions);
  return _ItemVersions;
}(_sharepointqueryable._SharePointQueryableCollection);

exports._ItemVersions = _ItemVersions;
var ItemVersions = (0, _sharepointqueryable.spInvokableFactory)(_ItemVersions);
/**
 * Describes a single Version instance
 *
 */

exports.ItemVersions = ItemVersions;

var _ItemVersion =
/** @class */
function (_super) {
  (0, _tslib.__extends)(_ItemVersion, _super);

  function _ItemVersion() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.delete = (0, _sharepointqueryable.deleteableWithETag)("iv");
    return _this;
  }

  return _ItemVersion;
}(_sharepointqueryable._SharePointQueryableInstance);

exports._ItemVersion = _ItemVersion;
var ItemVersion = (0, _sharepointqueryable.spInvokableFactory)(_ItemVersion);
/**
 * Provides paging functionality for list items
 */

exports.ItemVersion = ItemVersion;

var PagedItemCollection =
/** @class */
function () {
  function PagedItemCollection(parent, nextUrl, results) {
    this.parent = parent;
    this.nextUrl = nextUrl;
    this.results = results;
  }

  Object.defineProperty(PagedItemCollection.prototype, "hasNext", {
    /**
     * If true there are more results available in the set, otherwise there are not
     */
    get: function () {
      return typeof this.nextUrl === "string" && this.nextUrl.length > 0;
    },
    enumerable: true,
    configurable: true
  });
  /**
   * Gets the next set of results, or resolves to null if no results are available
   */

  PagedItemCollection.prototype.getNext = function () {
    if (this.hasNext) {
      var items = _telemetry.tag.configure(Items(this.nextUrl, null).configureFrom(this.parent), "ip.getNext");

      return items.getPaged();
    }

    return new Promise(function (r) {
      return r(null);
    });
  };

  return PagedItemCollection;
}();

exports.PagedItemCollection = PagedItemCollection;

var PagedItemCollectionParser =
/** @class */
function (_super) {
  (0, _tslib.__extends)(PagedItemCollectionParser, _super);

  function PagedItemCollectionParser(_parent) {
    var _this = _super.call(this) || this;

    _this._parent = _parent;
    return _this;
  }

  PagedItemCollectionParser.prototype.parse = function (r) {
    var _this = this;

    return new Promise(function (resolve, reject) {
      if (_this.handleError(r, reject)) {
        r.json().then(function (json) {
          var nextUrl = (0, _common.hOP)(json, "d") && (0, _common.hOP)(json.d, "__next") ? json.d.__next : json["odata.nextLink"];
          resolve(new PagedItemCollection(_this._parent, nextUrl, _this.parseODataJSON(json)));
        });
      }
    });
  };

  return PagedItemCollectionParser;
}(_odata.ODataParser);

var ItemUpdatedParser =
/** @class */
function (_super) {
  (0, _tslib.__extends)(ItemUpdatedParser, _super);

  function ItemUpdatedParser() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  ItemUpdatedParser.prototype.parse = function (r) {
    var _this = this;

    return new Promise(function (resolve, reject) {
      if (_this.handleError(r, reject)) {
        resolve({
          "odata.etag": r.headers.get("etag")
        });
      }
    });
  };

  return ItemUpdatedParser;
}(_odata.ODataParser);
},{"tslib":"../node_modules/tslib/tslib.es6.js","../sharepointqueryable":"../node_modules/@pnp/sp/sharepointqueryable.js","@pnp/common":"../node_modules/@pnp/common/index.js","../lists/types":"../node_modules/@pnp/sp/lists/types.js","@pnp/odata":"../node_modules/@pnp/odata/index.js","@pnp/logging":"../node_modules/@pnp/logging/index.js","../utils/metadata":"../node_modules/@pnp/sp/utils/metadata.js","../decorators":"../node_modules/@pnp/sp/decorators.js","../operations":"../node_modules/@pnp/sp/operations.js","../telemetry":"../node_modules/@pnp/sp/telemetry.js"}],"../node_modules/@pnp/sp/items/list.js":[function(require,module,exports) {
"use strict";

var _odata = require("@pnp/odata");

var _types = require("../lists/types");

var _types2 = require("./types");

(0, _odata.addProp)(_types._List, "items", _types2.Items);
},{"@pnp/odata":"../node_modules/@pnp/odata/index.js","../lists/types":"../node_modules/@pnp/sp/lists/types.js","./types":"../node_modules/@pnp/sp/items/types.js"}],"../node_modules/@pnp/sp/items/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Item", {
  enumerable: true,
  get: function () {
    return _types.Item;
  }
});
Object.defineProperty(exports, "Items", {
  enumerable: true,
  get: function () {
    return _types.Items;
  }
});
Object.defineProperty(exports, "ItemVersion", {
  enumerable: true,
  get: function () {
    return _types.ItemVersion;
  }
});
Object.defineProperty(exports, "ItemVersions", {
  enumerable: true,
  get: function () {
    return _types.ItemVersions;
  }
});
Object.defineProperty(exports, "PagedItemCollection", {
  enumerable: true,
  get: function () {
    return _types.PagedItemCollection;
  }
});

require("./list");

var _types = require("./types");
},{"./list":"../node_modules/@pnp/sp/items/list.js","./types":"../node_modules/@pnp/sp/items/types.js"}],"../node_modules/@pnp/sp/batch.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SPBatch = void 0;

var _tslib = require("tslib");

var _odata = require("@pnp/odata");

var _common = require("@pnp/common");

var _logging = require("@pnp/logging");

var _sphttpclient = require("./sphttpclient");

var _splibconfig = require("./splibconfig");

var _toabsoluteurl = require("./utils/toabsoluteurl");

/**
 * Manages a batch of OData operations
 */
var SPBatch =
/** @class */
function (_super) {
  (0, _tslib.__extends)(SPBatch, _super);

  function SPBatch(baseUrl) {
    var _this = _super.call(this) || this;

    _this.baseUrl = baseUrl;
    return _this;
  }
  /**
   * Parses the response from a batch request into an array of Response instances
   *
   * @param body Text body of the response from the batch request
   */


  SPBatch.ParseResponse = function (body) {
    var responses = [];
    var header = "--batchresponse_"; // Ex. "HTTP/1.1 500 Internal Server Error"

    var statusRegExp = new RegExp("^HTTP/[0-9.]+ +([0-9]+) +(.*)", "i");
    var lines = body.split("\n");
    var state = "batch";
    var status;
    var statusText;

    for (var i = 0; i < lines.length; ++i) {
      var line = lines[i];

      switch (state) {
        case "batch":
          if (line.substr(0, header.length) === header) {
            state = "batchHeaders";
          } else {
            if (line.trim() !== "") {
              throw Error("Invalid response, line " + i);
            }
          }

          break;

        case "batchHeaders":
          if (line.trim() === "") {
            state = "status";
          }

          break;

        case "status":
          var parts = statusRegExp.exec(line);

          if (parts.length !== 3) {
            throw Error("Invalid status, line " + i);
          }

          status = parseInt(parts[1], 10);
          statusText = parts[2];
          state = "statusHeaders";
          break;

        case "statusHeaders":
          if (line.trim() === "") {
            state = "body";
          }

          break;

        case "body":
          responses.push(status === 204 ? new Response() : new Response(line, {
            status: status,
            statusText: statusText
          }));
          state = "batch";
          break;
      }
    }

    if (state !== "status") {
      throw Error("Unexpected end of input");
    }

    return responses;
  };

  SPBatch.prototype.executeImpl = function () {
    return (0, _tslib.__awaiter)(this, void 0, void 0, function () {
      var client, absoluteRequestUrl, batchBody, currentChangeSetId, i, reqInfo, headers, url, method, castHeaders, batchOptions, fetchResponse, text, responses;

      var _this = this;

      return (0, _tslib.__generator)(this, function (_a) {
        switch (_a.label) {
          case 0:
            _logging.Logger.write("[" + this.batchId + "] (" + new Date().getTime() + ") Executing batch with " + this.requests.length + " requests.", 1
            /* Info */
            ); // if we don't have any requests, don't bother sending anything
            // this could be due to caching further upstream, or just an empty batch


            if (this.requests.length < 1) {
              _logging.Logger.write("Resolving empty batch.", 1
              /* Info */
              );

              return [2
              /*return*/
              ];
            }

            client = new _sphttpclient.SPHttpClient();
            return [4
            /*yield*/
            , (0, _toabsoluteurl.toAbsoluteUrl)(this.baseUrl)];

          case 1:
            absoluteRequestUrl = _a.sent();
            batchBody = [];
            currentChangeSetId = "";

            for (i = 0; i < this.requests.length; i++) {
              reqInfo = this.requests[i];

              if (reqInfo.method === "GET") {
                if (currentChangeSetId.length > 0) {
                  // end an existing change set
                  batchBody.push("--changeset_" + currentChangeSetId + "--\n\n");
                  currentChangeSetId = "";
                }

                batchBody.push("--batch_" + this.batchId + "\n");
              } else {
                if (currentChangeSetId.length < 1) {
                  // start new change set
                  currentChangeSetId = (0, _common.getGUID)();
                  batchBody.push("--batch_" + this.batchId + "\n");
                  batchBody.push("Content-Type: multipart/mixed; boundary=\"changeset_" + currentChangeSetId + "\"\n\n");
                }

                batchBody.push("--changeset_" + currentChangeSetId + "\n");
              } // common batch part prefix


              batchBody.push("Content-Type: application/http\n");
              batchBody.push("Content-Transfer-Encoding: binary\n\n");
              headers = new Headers();
              url = (0, _common.isUrlAbsolute)(reqInfo.url) ? reqInfo.url : (0, _common.combine)(absoluteRequestUrl, reqInfo.url);

              _logging.Logger.write("[" + this.batchId + "] (" + new Date().getTime() + ") Adding request " + reqInfo.method + " " + url + " to batch.", 0
              /* Verbose */
              );

              if (reqInfo.method !== "GET") {
                method = reqInfo.method;
                castHeaders = reqInfo.options.headers;

                if ((0, _common.hOP)(reqInfo, "options") && (0, _common.hOP)(reqInfo.options, "headers") && castHeaders["X-HTTP-Method"] !== undefined) {
                  method = castHeaders["X-HTTP-Method"];
                  delete castHeaders["X-HTTP-Method"];
                }

                batchBody.push(method + " " + url + " HTTP/1.1\n");
                headers.set("Content-Type", "application/json;odata=verbose;charset=utf-8");
              } else {
                batchBody.push(reqInfo.method + " " + url + " HTTP/1.1\n");
              } // merge global config headers


              (0, _common.mergeHeaders)(headers, _splibconfig.SPRuntimeConfig.headers); // merge per-request headers

              if (reqInfo.options) {
                (0, _common.mergeHeaders)(headers, reqInfo.options.headers);
              } // lastly we apply any default headers we need that may not exist


              if (!headers.has("Accept")) {
                headers.append("Accept", "application/json");
              }

              if (!headers.has("Content-Type")) {
                headers.append("Content-Type", "application/json;odata=verbose;charset=utf-8");
              }

              if (!headers.has("X-ClientService-ClientTag")) {
                headers.append("X-ClientService-ClientTag", "PnPCoreJS:@pnp-2.0.5:batch");
              } // write headers into batch body


              headers.forEach(function (value, name) {
                batchBody.push(name + ": " + value + "\n");
              });
              batchBody.push("\n");

              if (reqInfo.options.body) {
                batchBody.push(reqInfo.options.body + "\n\n");
              }
            }

            if (currentChangeSetId.length > 0) {
              // Close the changeset
              batchBody.push("--changeset_" + currentChangeSetId + "--\n\n");
              currentChangeSetId = "";
            }

            batchBody.push("--batch_" + this.batchId + "--\n");
            batchOptions = {
              "body": batchBody.join(""),
              "headers": {
                "Content-Type": "multipart/mixed; boundary=batch_" + this.batchId
              },
              "method": "POST"
            };

            _logging.Logger.write("[" + this.batchId + "] (" + new Date().getTime() + ") Sending batch request.", 1
            /* Info */
            );

            return [4
            /*yield*/
            , client.fetch((0, _common.combine)(absoluteRequestUrl, "/_api/$batch"), batchOptions)];

          case 2:
            fetchResponse = _a.sent();
            return [4
            /*yield*/
            , fetchResponse.text()];

          case 3:
            text = _a.sent();
            responses = SPBatch.ParseResponse(text);

            if (responses.length !== this.requests.length) {
              throw Error("Could not properly parse responses to match requests in batch.");
            }

            _logging.Logger.write("[" + this.batchId + "] (" + new Date().getTime() + ") Resolving batched requests.", 1
            /* Info */
            ); // this structure ensures that we resolve the batched requests in the order we expect
            // using async this is not guaranteed depending on the requests


            return [2
            /*return*/
            , responses.reduce(function (p, response, index) {
              return p.then(function (_) {
                return (0, _tslib.__awaiter)(_this, void 0, void 0, function () {
                  var request, _a, _b, e_1;

                  return (0, _tslib.__generator)(this, function (_c) {
                    switch (_c.label) {
                      case 0:
                        request = this.requests[index];

                        _logging.Logger.write("[" + request.id + "] (" + new Date().getTime() + ") Resolving request in batch " + this.batchId + ".", 1
                        /* Info */
                        );

                        _c.label = 1;

                      case 1:
                        _c.trys.push([1, 3,, 4]);

                        _b = (_a = request).resolve;
                        return [4
                        /*yield*/
                        , request.parser.parse(response)];

                      case 2:
                        _b.apply(_a, [_c.sent()]);

                        return [3
                        /*break*/
                        , 4];

                      case 3:
                        e_1 = _c.sent();
                        request.reject(e_1);
                        return [3
                        /*break*/
                        , 4];

                      case 4:
                        return [2
                        /*return*/
                        ];
                    }
                  });
                });
              });
            }, Promise.resolve(void 0))];
        }
      });
    });
  };

  return SPBatch;
}(_odata.Batch);

exports.SPBatch = SPBatch;
},{"tslib":"../node_modules/tslib/tslib.es6.js","@pnp/odata":"../node_modules/@pnp/odata/index.js","@pnp/common":"../node_modules/@pnp/common/index.js","@pnp/logging":"../node_modules/@pnp/logging/index.js","./sphttpclient":"../node_modules/@pnp/sp/sphttpclient.js","./splibconfig":"../node_modules/@pnp/sp/splibconfig.js","./utils/toabsoluteurl":"../node_modules/@pnp/sp/utils/toabsoluteurl.js"}],"../node_modules/@pnp/sp/sites/types.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Site = exports._Site = void 0;

var _tslib = require("tslib");

var _sharepointqueryable = require("../sharepointqueryable");

var _decorators = require("../decorators");

var _types = require("../webs/types");

var _common = require("@pnp/common");

var _odata = require("@pnp/odata");

var _odata2 = require("../odata");

var _operations = require("../operations");

var _batch = require("../batch");

var _escapeQueryStrValue = require("../utils/escapeQueryStrValue");

var _telemetry = require("../telemetry");

var _metadata = require("../utils/metadata");

var _extractweburl = require("../utils/extractweburl");

var _splibconfig = require("../splibconfig");

var _Site =
/** @class */
function (_super) {
  (0, _tslib.__extends)(_Site, _super);

  function _Site() {
    return _super !== null && _super.apply(this, arguments) || this;
  }

  Object.defineProperty(_Site.prototype, "rootWeb", {
    /**
    * Gets the root web of the site collection
    *
    */
    get: function () {
      return _telemetry.tag.configure((0, _types.Web)(this, "rootweb"), "si.rootWeb");
    },
    enumerable: true,
    configurable: true
  });
  /**
   * Gets a Web instance representing the root web of the site collection
   * correctly setup for chaining within the library
   */

  _Site.prototype.getRootWeb = function () {
    return (0, _tslib.__awaiter)(this, void 0, void 0, function () {
      var web;
      return (0, _tslib.__generator)(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4
            /*yield*/
            , this.rootWeb.select("Url")()];

          case 1:
            web = _a.sent();
            return [2
            /*return*/
            , _telemetry.tag.configure((0, _types.Web)(web.Url), "si.getRootWeb")];
        }
      });
    });
  };
  /**
  * Gets the context information for this site collection
  */


  _Site.prototype.getContextInfo = function () {
    return (0, _tslib.__awaiter)(this, void 0, void 0, function () {
      var q, data, info;
      return (0, _tslib.__generator)(this, function (_a) {
        switch (_a.label) {
          case 0:
            q = _telemetry.tag.configure(Site(this.parentUrl, "_api/contextinfo"), "si.getContextInfo");
            return [4
            /*yield*/
            , (0, _operations.spPost)(q)];

          case 1:
            data = _a.sent();

            if ((0, _common.hOP)(data, "GetContextWebInformation")) {
              info = data.GetContextWebInformation;
              info.SupportedSchemaVersions = info.SupportedSchemaVersions.results;
              return [2
              /*return*/
              , info];
            } else {
              return [2
              /*return*/
              , data];
            }

            return [2
            /*return*/
            ];
        }
      });
    });
  };

  _Site.prototype.createBatch = function () {
    return new _batch.SPBatch(this.parentUrl);
  };
  /**
  * Deletes the current site
  *
  */


  _Site.prototype.delete = function () {
    return (0, _tslib.__awaiter)(this, void 0, void 0, function () {
      var site, q;
      return (0, _tslib.__generator)(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4
            /*yield*/
            , this.clone(Site, "").select("Id")()];

          case 1:
            site = _a.sent();
            q = _telemetry.tag.configure(Site(this.parentUrl, "_api/SPSiteManager/Delete"), "si.delete");
            return [4
            /*yield*/
            , (0, _operations.spPost)(q, (0, _odata.body)({
              siteId: site.Id
            }))];

          case 2:
            _a.sent();

            return [2
            /*return*/
            ];
        }
      });
    });
  };
  /**
   * Gets the document libraries on a site. Static method. (SharePoint Online only)
   *
   * @param absoluteWebUrl The absolute url of the web whose document libraries should be returned
   */


  _Site.prototype.getDocumentLibraries = function (absoluteWebUrl) {
    return (0, _tslib.__awaiter)(this, void 0, void 0, function () {
      var q, data;
      return (0, _tslib.__generator)(this, function (_a) {
        switch (_a.label) {
          case 0:
            q = _telemetry.tag.configure((0, _sharepointqueryable.SharePointQueryable)("", "_api/sp.web.getdocumentlibraries(@v)"), "si.getDocumentLibraries");
            q.query.set("@v", "'" + (0, _escapeQueryStrValue.escapeQueryStrValue)(absoluteWebUrl) + "'");
            return [4
            /*yield*/
            , q()];

          case 1:
            data = _a.sent();
            return [2
            /*return*/
            , (0, _common.hOP)(data, "GetDocumentLibraries") ? data.GetDocumentLibraries : data];
        }
      });
    });
  };
  /**
   * Gets the site url from a page url
   *
   * @param absolutePageUrl The absolute url of the page
   */


  _Site.prototype.getWebUrlFromPageUrl = function (absolutePageUrl) {
    return (0, _tslib.__awaiter)(this, void 0, void 0, function () {
      var q, data;
      return (0, _tslib.__generator)(this, function (_a) {
        switch (_a.label) {
          case 0:
            q = _telemetry.tag.configure((0, _sharepointqueryable.SharePointQueryable)("", "_api/sp.web.getweburlfrompageurl(@v)"), "si.getWebUrlFromPageUrl");
            q.query.set("@v", "'" + (0, _escapeQueryStrValue.escapeQueryStrValue)(absolutePageUrl) + "'");
            return [4
            /*yield*/
            , q()];

          case 1:
            data = _a.sent();
            return [2
            /*return*/
            , (0, _common.hOP)(data, "GetWebUrlFromPageUrl") ? data.GetWebUrlFromPageUrl : data];
        }
      });
    });
  };
  /**
   * Returns the collection of changes from the change log that have occurred within the list, based on the specified query
   *
   * @param query The change query
   */


  _Site.prototype.getChanges = function (query) {
    var postBody = (0, _odata.body)({
      "query": (0, _common.assign)((0, _metadata.metadata)("SP.ChangeQuery"), query)
    });
    return (0, _operations.spPost)(this.clone(_types.Web, "getchanges"), postBody);
  };
  /**
  * Opens a web by id (using POST)
  *
  * @param webId The GUID id of the web to open
  */


  _Site.prototype.openWebById = function (webId) {
    return (0, _tslib.__awaiter)(this, void 0, void 0, function () {
      var data;
      return (0, _tslib.__generator)(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4
            /*yield*/
            , (0, _operations.spPost)(this.clone(Site, "openWebById('" + webId + "')"))];

          case 1:
            data = _a.sent();
            return [2
            /*return*/
            , {
              data: data,
              web: (0, _types.Web)((0, _extractweburl.extractWebUrl)((0, _odata2.odataUrlFrom)(data)))
            }];
        }
      });
    });
  };
  /**
   * Creates a Modern communication site.
   *
   * @param title The title of the site to create
   * @param lcid The language to use for the site. If not specified will default to 1033 (English).
   * @param shareByEmailEnabled If set to true, it will enable sharing files via Email. By default it is set to false
   * @param url The fully qualified URL (e.g. https://yourtenant.sharepoint.com/sites/mysitecollection) of the site.
   * @param description The description of the communication site.
   * @param classification The Site classification to use. For instance 'Contoso Classified'. See https://www.youtube.com/watch?v=E-8Z2ggHcS0 for more information
   * @param siteDesignId The Guid of the site design to be used.
   *                     You can use the below default OOTB GUIDs:
   *                     Topic: 00000000-0000-0000-0000-000000000000
   *                     Showcase: 6142d2a0-63a5-4ba0-aede-d9fefca2c767
   *                     Blank: f6cc5403-0d63-442e-96c0-285923709ffc
   * @param hubSiteId The id of the hub site to which the new site should be associated
   * @param owner Optional owner value, required if executing the method in app only mode
   */


  _Site.prototype.createCommunicationSite = function (title, lcid, shareByEmailEnabled, url, description, classification, siteDesignId, hubSiteId, owner) {
    if (lcid === void 0) {
      lcid = 1033;
    }

    if (shareByEmailEnabled === void 0) {
      shareByEmailEnabled = false;
    }

    return (0, _tslib.__awaiter)(this, void 0, void 0, function () {
      return (0, _tslib.__generator)(this, function (_a) {
        return [2
        /*return*/
        , this.createCommunicationSiteFromProps({
          Classification: classification,
          Description: description,
          HubSiteId: hubSiteId,
          Lcid: lcid,
          Owner: owner,
          ShareByEmailEnabled: shareByEmailEnabled,
          SiteDesignId: siteDesignId,
          Title: title,
          Url: url
        })];
      });
    });
  };

  _Site.prototype.createCommunicationSiteFromProps = function (props) {
    return (0, _tslib.__awaiter)(this, void 0, void 0, function () {
      var p, postBody;
      return (0, _tslib.__generator)(this, function (_a) {
        p = Object.assign({}, {
          Classification: "",
          Description: "",
          HubSiteId: _splibconfig.emptyGuid,
          Lcid: 1033,
          ShareByEmailEnabled: false,
          SiteDesignId: _splibconfig.emptyGuid,
          WebTemplate: "SITEPAGEPUBLISHING#0",
          WebTemplateExtensionId: _splibconfig.emptyGuid
        }, props);
        postBody = (0, _odata.body)({
          "request": (0, _common.assign)((0, _metadata.metadata)("Microsoft.SharePoint.Portal.SPSiteCreationRequest"), p)
        });
        return [2
        /*return*/
        , (0, _operations.spPost)(Site((0, _extractweburl.extractWebUrl)(this.toUrl()), "/_api/SPSiteManager/Create"), postBody)];
      });
    });
  };
  /**
   *
   * @param url Site Url that you want to check if exists
   */


  _Site.prototype.exists = function (url) {
    return (0, _tslib.__awaiter)(this, void 0, void 0, function () {
      var postBody, value;
      return (0, _tslib.__generator)(this, function (_a) {
        switch (_a.label) {
          case 0:
            postBody = (0, _odata.body)({
              url: url
            });
            return [4
            /*yield*/
            , (0, _operations.spPost)(Site((0, _extractweburl.extractWebUrl)(this.toUrl()), "/_api/SP.Site.Exists"), postBody)];

          case 1:
            value = _a.sent();
            return [2
            /*return*/
            , value];
        }
      });
    });
  };
  /**
  * Creates a Modern team site backed by Office 365 group. For use in SP Online only. This will not work with App-only tokens
  *
  * @param displayName The title or display name of the Modern team site to be created
  * @param alias Alias of the underlying Office 365 Group
  * @param isPublic Defines whether the Office 365 Group will be public (default), or private.
  * @param lcid The language to use for the site. If not specified will default to English (1033).
  * @param description The description of the site to be created.
  * @param classification The Site classification to use. For instance 'Contoso Classified'. See https://www.youtube.com/watch?v=E-8Z2ggHcS0 for more information
  * @param owners The Owners of the site to be created
  */


  _Site.prototype.createModernTeamSite = function (displayName, alias, isPublic, lcid, description, classification, owners, hubSiteId, siteDesignId) {
    return (0, _tslib.__awaiter)(this, void 0, void 0, function () {
      return (0, _tslib.__generator)(this, function (_a) {
        return [2
        /*return*/
        , this.createModernTeamSiteFromProps({
          alias: alias,
          classification: classification,
          description: description,
          displayName: displayName,
          hubSiteId: hubSiteId,
          isPublic: isPublic,
          lcid: lcid,
          owners: owners,
          siteDesignId: siteDesignId
        })];
      });
    });
  };

  _Site.prototype.createModernTeamSiteFromProps = function (props) {
    return (0, _tslib.__awaiter)(this, void 0, void 0, function () {
      var p, postBody;
      return (0, _tslib.__generator)(this, function (_a) {
        p = Object.assign({}, {
          classification: "",
          description: "",
          hubSiteId: _splibconfig.emptyGuid,
          isPublic: true,
          lcid: 1033,
          owners: []
        }, props);
        postBody = {
          alias: p.alias,
          displayName: p.displayName,
          isPublic: p.isPublic,
          optionalParams: {
            Classification: p.classification,
            CreationOptions: {
              "results": ["SPSiteLanguage:" + p.lcid, "HubSiteId:" + p.hubSiteId]
            },
            Description: p.description,
            Owners: {
              "results": p.owners
            }
          }
        };

        if (p.siteDesignId) {
          postBody.optionalParams.CreationOptions.results.push("implicit_formula_292aa8a00786498a87a5ca52d9f4214a_" + p.siteDesignId);
        }

        return [2
        /*return*/
        , (0, _operations.spPost)(Site((0, _extractweburl.extractWebUrl)(this.toUrl()), "/_api/GroupSiteManager/CreateGroupEx"), (0, _odata.body)(postBody))];
      });
    });
  };

  (0, _tslib.__decorate)([(0, _telemetry.tag)("si.getChanges")], _Site.prototype, "getChanges", null);
  (0, _tslib.__decorate)([(0, _telemetry.tag)("si.openWebById")], _Site.prototype, "openWebById", null);
  _Site = (0, _tslib.__decorate)([(0, _decorators.defaultPath)("_api/site")], _Site);
  return _Site;
}(_sharepointqueryable._SharePointQueryableInstance);

exports._Site = _Site;
var Site = (0, _sharepointqueryable.spInvokableFactory)(_Site);
exports.Site = Site;
},{"tslib":"../node_modules/tslib/tslib.es6.js","../sharepointqueryable":"../node_modules/@pnp/sp/sharepointqueryable.js","../decorators":"../node_modules/@pnp/sp/decorators.js","../webs/types":"../node_modules/@pnp/sp/webs/types.js","@pnp/common":"../node_modules/@pnp/common/index.js","@pnp/odata":"../node_modules/@pnp/odata/index.js","../odata":"../node_modules/@pnp/sp/odata.js","../operations":"../node_modules/@pnp/sp/operations.js","../batch":"../node_modules/@pnp/sp/batch.js","../utils/escapeQueryStrValue":"../node_modules/@pnp/sp/utils/escapeQueryStrValue.js","../telemetry":"../node_modules/@pnp/sp/telemetry.js","../utils/metadata":"../node_modules/@pnp/sp/utils/metadata.js","../utils/extractweburl":"../node_modules/@pnp/sp/utils/extractweburl.js","../splibconfig":"../node_modules/@pnp/sp/splibconfig.js"}],"../node_modules/@pnp/sp/sites/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Site", {
  enumerable: true,
  get: function () {
    return _types.Site;
  }
});

var _rest = require("../rest");

var _types = require("./types");

Reflect.defineProperty(_rest.SPRest.prototype, "site", {
  configurable: true,
  enumerable: true,
  get: function () {
    return (0, _types.Site)(this._baseUrl).configure(this._options);
  }
});
},{"../rest":"../node_modules/@pnp/sp/rest.js","./types":"../node_modules/@pnp/sp/sites/types.js"}],"../node_modules/@pnp/sp/webs/types.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Web = exports._Web = exports.Webs = exports._Webs = void 0;

var _tslib = require("tslib");

var _common = require("@pnp/common");

var _odata = require("@pnp/odata");

var _sharepointqueryable = require("../sharepointqueryable");

var _decorators = require("../decorators");

var _odata2 = require("../odata");

var _batch = require("../batch");

var _metadata = require("../utils/metadata");

var _sites = require("../sites");

var _operations = require("../operations");

var _escapeQueryStrValue = require("../utils/escapeQueryStrValue");

var _telemetry = require("../telemetry");

var _Webs =
/** @class */
function (_super) {
  (0, _tslib.__extends)(_Webs, _super);

  function _Webs() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  /**
   * Adds a new web to the collection
   *
   * @param title The new web's title
   * @param url The new web's relative url
   * @param description The new web's description
   * @param template The new web's template internal name (default = STS)
   * @param language The locale id that specifies the new web's language (default = 1033 [English, US])
   * @param inheritPermissions When true, permissions will be inherited from the new web's parent (default = true)
   */


  _Webs.prototype.add = function (title, url, description, template, language, inheritPermissions) {
    if (description === void 0) {
      description = "";
    }

    if (template === void 0) {
      template = "STS";
    }

    if (language === void 0) {
      language = 1033;
    }

    if (inheritPermissions === void 0) {
      inheritPermissions = true;
    }

    return (0, _tslib.__awaiter)(this, void 0, void 0, function () {
      var postBody, data;
      return (0, _tslib.__generator)(this, function (_a) {
        switch (_a.label) {
          case 0:
            postBody = (0, _odata.body)({
              "parameters": (0, _common.assign)((0, _metadata.metadata)("SP.WebCreationInformation"), {
                Description: description,
                Language: language,
                Title: title,
                Url: url,
                UseSamePermissionsAsParentSite: inheritPermissions,
                WebTemplate: template
              })
            });
            return [4
            /*yield*/
            , (0, _operations.spPost)(this.clone(Webs, "add"), postBody)];

          case 1:
            data = _a.sent();
            return [2
            /*return*/
            , {
              data: data,
              web: Web((0, _odata2.odataUrlFrom)(data).replace(/_api\/web\/?/i, ""))
            }];
        }
      });
    });
  };

  (0, _tslib.__decorate)([(0, _telemetry.tag)("ws.add")], _Webs.prototype, "add", null);
  _Webs = (0, _tslib.__decorate)([(0, _decorators.defaultPath)("webs")], _Webs);
  return _Webs;
}(_sharepointqueryable._SharePointQueryableCollection);

exports._Webs = _Webs;
var Webs = (0, _sharepointqueryable.spInvokableFactory)(_Webs);
/**
 * Describes a web
 *
 */

exports.Webs = Webs;

var _Web =
/** @class */
function (_super) {
  (0, _tslib.__extends)(_Web, _super);

  function _Web() {
    var _this = _super !== null && _super.apply(this, arguments) || this;

    _this.delete = (0, _sharepointqueryable.deleteable)("w");
    return _this;
  }

  Object.defineProperty(_Web.prototype, "webs", {
    /**
     * Gets this web's subwebs
     *
     */
    get: function () {
      return Webs(this);
    },
    enumerable: true,
    configurable: true
  });
  /**
   * Gets this web's parent web and data
   *
   */

  _Web.prototype.getParentWeb = function () {
    return (0, _tslib.__awaiter)(this, void 0, void 0, function () {
      var ParentWeb;
      return (0, _tslib.__generator)(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4
            /*yield*/
            , (0, _operations.spGet)(this.select("ParentWeb/Id").expand("ParentWeb"))];

          case 1:
            ParentWeb = _a.sent().ParentWeb;
            return [2
            /*return*/
            , ParentWeb ? (0, _sites.Site)(this.parentUrl).openWebById(ParentWeb.Id) : null];
        }
      });
    });
  };
  /**
  * Returns a collection of objects that contain metadata about subsites of the current site in which the current user is a member.
  *
  * @param nWebTemplateFilter Specifies the site definition (default = -1)
  * @param nConfigurationFilter A 16-bit integer that specifies the identifier of a configuration (default = -1)
  */


  _Web.prototype.getSubwebsFilteredForCurrentUser = function (nWebTemplateFilter, nConfigurationFilter) {
    if (nWebTemplateFilter === void 0) {
      nWebTemplateFilter = -1;
    }

    if (nConfigurationFilter === void 0) {
      nConfigurationFilter = -1;
    }

    var o = this.clone(Webs, "getSubwebsFilteredForCurrentUser(nWebTemplateFilter=" + nWebTemplateFilter + ",nConfigurationFilter=" + nConfigurationFilter + ")");
    return _telemetry.tag.configure(o, "w.getSubwebsFilteredForCurrentUser");
  };

  Object.defineProperty(_Web.prototype, "allProperties", {
    /**
     * Allows access to the web's all properties collection
     */
    get: function () {
      return _telemetry.tag.configure(this.clone(_sharepointqueryable.SharePointQueryableInstance, "allproperties"), "w.allprops");
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(_Web.prototype, "webinfos", {
    /**
     * Gets a collection of WebInfos for this web's subwebs
     *
     */
    get: function () {
      return _telemetry.tag.configure((0, _sharepointqueryable.SharePointQueryableCollection)(this, "webinfos"), "w.webinfos");
    },
    enumerable: true,
    configurable: true
  });
  /**
   * Creates a new batch for requests within the context of this web
   *
   */

  _Web.prototype.createBatch = function () {
    return new _batch.SPBatch(this.parentUrl);
  };
  /**
   * Updates this web instance with the supplied properties
   *
   * @param properties A plain object hash of values to update for the web
   */


  _Web.prototype.update = function (properties) {
    return (0, _tslib.__awaiter)(this, void 0, void 0, function () {
      var postBody, data;
      return (0, _tslib.__generator)(this, function (_a) {
        switch (_a.label) {
          case 0:
            postBody = (0, _odata.body)((0, _common.assign)((0, _metadata.metadata)("SP.Web"), properties), (0, _odata.headers)({
              "X-HTTP-Method": "MERGE"
            }));
            return [4
            /*yield*/
            , (0, _operations.spPost)(this, postBody)];

          case 1:
            data = _a.sent();
            return [2
            /*return*/
            , {
              data: data,
              web: this
            }];
        }
      });
    });
  };
  /**
   * Applies the theme specified by the contents of each of the files specified in the arguments to the site
   *
   * @param colorPaletteUrl The server-relative URL of the color palette file
   * @param fontSchemeUrl The server-relative URL of the font scheme
   * @param backgroundImageUrl The server-relative URL of the background image
   * @param shareGenerated When true, the generated theme files are stored in the root site. When false, they are stored in this web
   */


  _Web.prototype.applyTheme = function (colorPaletteUrl, fontSchemeUrl, backgroundImageUrl, shareGenerated) {
    var postBody = (0, _odata.body)({
      backgroundImageUrl: backgroundImageUrl,
      colorPaletteUrl: colorPaletteUrl,
      fontSchemeUrl: fontSchemeUrl,
      shareGenerated: shareGenerated
    });
    return (0, _operations.spPost)(this.clone(Web, "applytheme"), postBody);
  };
  /**
   * Applies the specified site definition or site template to the Web site that has no template applied to it
   *
   * @param template Name of the site definition or the name of the site template
   */


  _Web.prototype.applyWebTemplate = function (template) {
    var q = this.clone(Web, "applywebtemplate");
    q.concat("(webTemplate='" + (0, _escapeQueryStrValue.escapeQueryStrValue)(template) + "')");
    return (0, _operations.spPost)(q);
  };
  /**
   * Returns a collection of site templates available for the site
   *
   * @param language The locale id of the site templates to retrieve (default = 1033 [English, US])
   * @param includeCrossLanguage When true, includes language-neutral site templates; otherwise false (default = true)
   */


  _Web.prototype.availableWebTemplates = function (language, includeCrossLanugage) {
    if (language === void 0) {
      language = 1033;
    }

    if (includeCrossLanugage === void 0) {
      includeCrossLanugage = true;
    }

    var path = "getavailablewebtemplates(lcid=" + language + ", doincludecrosslanguage=" + includeCrossLanugage + ")";
    return _telemetry.tag.configure((0, _sharepointqueryable.SharePointQueryableCollection)(this, path), "w.availableWebTemplates");
  };
  /**
   * Returns the collection of changes from the change log that have occurred within the list, based on the specified query
   *
   * @param query The change query
   */


  _Web.prototype.getChanges = function (query) {
    var postBody = (0, _odata.body)({
      "query": (0, _common.assign)((0, _metadata.metadata)("SP.ChangeQuery"), query)
    });
    return (0, _operations.spPost)(this.clone(Web, "getchanges"), postBody);
  };
  /**
   * Returns the name of the image file for the icon that is used to represent the specified file
   *
   * @param filename The file name. If this parameter is empty, the server returns an empty string
   * @param size The size of the icon: 16x16 pixels = 0, 32x32 pixels = 1 (default = 0)
   * @param progId The ProgID of the application that was used to create the file, in the form OLEServerName.ObjectName
   */


  _Web.prototype.mapToIcon = function (filename, size, progId) {
    if (size === void 0) {
      size = 0;
    }

    if (progId === void 0) {
      progId = "";
    }

    return (0, _operations.spGet)(this.clone(Web, "maptoicon(filename='" + (0, _escapeQueryStrValue.escapeQueryStrValue)(filename) + "', progid='" + (0, _escapeQueryStrValue.escapeQueryStrValue)(progId) + "', size=" + size + ")"));
  };
  /**
   * Returns the tenant property corresponding to the specified key in the app catalog site
   *
   * @param key Id of storage entity to be set
   */


  _Web.prototype.getStorageEntity = function (key) {
    return (0, _operations.spGet)(this.clone(Web, "getStorageEntity('" + (0, _escapeQueryStrValue.escapeQueryStrValue)(key) + "')"));
  };
  /**
   * This will set the storage entity identified by the given key (MUST be called in the context of the app catalog)
   *
   * @param key Id of storage entity to be set
   * @param value Value of storage entity to be set
   * @param description Description of storage entity to be set
   * @param comments Comments of storage entity to be set
   */


  _Web.prototype.setStorageEntity = function (key, value, description, comments) {
    if (description === void 0) {
      description = "";
    }

    if (comments === void 0) {
      comments = "";
    }

    return (0, _operations.spPost)(this.clone(Web, "setStorageEntity"), (0, _odata.body)({
      comments: comments,
      description: description,
      key: key,
      value: value
    }));
  };
  /**
   * This will remove the storage entity identified by the given key
   *
   * @param key Id of storage entity to be removed
   */


  _Web.prototype.removeStorageEntity = function (key) {
    return (0, _operations.spPost)(this.clone(Web, "removeStorageEntity('" + (0, _escapeQueryStrValue.escapeQueryStrValue)(key) + "')"));
  };

  (0, _tslib.__decorate)([(0, _telemetry.tag)("w.getParentWeb")], _Web.prototype, "getParentWeb", null);
  (0, _tslib.__decorate)([(0, _telemetry.tag)("w.update")], _Web.prototype, "update", null);
  (0, _tslib.__decorate)([(0, _telemetry.tag)("w.applyTheme")], _Web.prototype, "applyTheme", null);
  (0, _tslib.__decorate)([(0, _telemetry.tag)("w.applyWebTemplate")], _Web.prototype, "applyWebTemplate", null);
  (0, _tslib.__decorate)([(0, _telemetry.tag)("w.getChanges")], _Web.prototype, "getChanges", null);
  (0, _tslib.__decorate)([(0, _telemetry.tag)("w.mapToIcon")], _Web.prototype, "mapToIcon", null);
  (0, _tslib.__decorate)([(0, _telemetry.tag)("w.getStorageEntity")], _Web.prototype, "getStorageEntity", null);
  (0, _tslib.__decorate)([(0, _telemetry.tag)("w.setStorageEntity")], _Web.prototype, "setStorageEntity", null);
  (0, _tslib.__decorate)([(0, _telemetry.tag)("w.removeStorageEntity")], _Web.prototype, "removeStorageEntity", null);
  _Web = (0, _tslib.__decorate)([(0, _decorators.defaultPath)("_api/web")], _Web);
  return _Web;
}(_sharepointqueryable._SharePointQueryableInstance);

exports._Web = _Web;
var Web = (0, _sharepointqueryable.spInvokableFactory)(_Web);
exports.Web = Web;
},{"tslib":"../node_modules/tslib/tslib.es6.js","@pnp/common":"../node_modules/@pnp/common/index.js","@pnp/odata":"../node_modules/@pnp/odata/index.js","../sharepointqueryable":"../node_modules/@pnp/sp/sharepointqueryable.js","../decorators":"../node_modules/@pnp/sp/decorators.js","../odata":"../node_modules/@pnp/sp/odata.js","../batch":"../node_modules/@pnp/sp/batch.js","../utils/metadata":"../node_modules/@pnp/sp/utils/metadata.js","../sites":"../node_modules/@pnp/sp/sites/index.js","../operations":"../node_modules/@pnp/sp/operations.js","../utils/escapeQueryStrValue":"../node_modules/@pnp/sp/utils/escapeQueryStrValue.js","../telemetry":"../node_modules/@pnp/sp/telemetry.js"}],"../node_modules/@pnp/sp/lists/web.js":[function(require,module,exports) {
"use strict";

var _tslib = require("tslib");

var _odata = require("@pnp/odata");

var _types = require("../webs/types");

var _types2 = require("./types");

var _odata2 = require("../odata");

var _sharepointqueryable = require("../sharepointqueryable");

var _escapeQueryStrValue = require("../utils/escapeQueryStrValue");

(0, _odata.addProp)(_types._Web, "lists", _types2.Lists);
(0, _odata.addProp)(_types._Web, "siteUserInfoList", _types2.List, "siteuserinfolist");
(0, _odata.addProp)(_types._Web, "defaultDocumentLibrary", _types2.List, "DefaultDocumentLibrary");
(0, _odata.addProp)(_types._Web, "customListTemplates", _sharepointqueryable.SharePointQueryableCollection, "getcustomlisttemplates");

_types._Web.prototype.getList = function (listRelativeUrl) {
  return (0, _types2.List)(this, "getList('" + (0, _escapeQueryStrValue.escapeQueryStrValue)(listRelativeUrl) + "')");
};

_types._Web.prototype.getCatalog = function (type) {
  return (0, _tslib.__awaiter)(this, void 0, void 0, function () {
    var data;
    return (0, _tslib.__generator)(this, function (_a) {
      switch (_a.label) {
        case 0:
          return [4
          /*yield*/
          , this.clone(_types.Web, "getcatalog(" + type + ")").select("Id").get()];

        case 1:
          data = _a.sent();
          return [2
          /*return*/
          , (0, _types2.List)((0, _odata2.odataUrlFrom)(data))];
      }
    });
  });
};
},{"tslib":"../node_modules/tslib/tslib.es6.js","@pnp/odata":"../node_modules/@pnp/odata/index.js","../webs/types":"../node_modules/@pnp/sp/webs/types.js","./types":"../node_modules/@pnp/sp/lists/types.js","../odata":"../node_modules/@pnp/sp/odata.js","../sharepointqueryable":"../node_modules/@pnp/sp/sharepointqueryable.js","../utils/escapeQueryStrValue":"../node_modules/@pnp/sp/utils/escapeQueryStrValue.js"}],"../node_modules/@pnp/sp/lists/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "List", {
  enumerable: true,
  get: function () {
    return _types.List;
  }
});
Object.defineProperty(exports, "Lists", {
  enumerable: true,
  get: function () {
    return _types.Lists;
  }
});
Object.defineProperty(exports, "ControlMode", {
  enumerable: true,
  get: function () {
    return _types.ControlMode;
  }
});
Object.defineProperty(exports, "RenderListDataOptions", {
  enumerable: true,
  get: function () {
    return _types.RenderListDataOptions;
  }
});

require("./web");

var _types = require("./types");
},{"./web":"../node_modules/@pnp/sp/lists/web.js","./types":"../node_modules/@pnp/sp/lists/types.js"}],"../node_modules/@pnp/sp/webs/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Web", {
  enumerable: true,
  get: function () {
    return _types.Web;
  }
});
Object.defineProperty(exports, "Webs", {
  enumerable: true,
  get: function () {
    return _types.Webs;
  }
});

var _types = require("./types");

var _rest = require("../rest");

Reflect.defineProperty(_rest.SPRest.prototype, "web", {
  configurable: true,
  enumerable: true,
  get: function () {
    return (0, _types.Web)(this._baseUrl).configure(this._options);
  }
});

_rest.SPRest.prototype.createBatch = function () {
  return this.web.createBatch();
};
},{"./types":"../node_modules/@pnp/sp/webs/types.js","../rest":"../node_modules/@pnp/sp/rest.js"}],"../node_modules/@pnp/sp/types.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PageType = exports.PrincipalSource = exports.PrincipalType = void 0;
// reference: https://msdn.microsoft.com/en-us/library/office/dn600183.aspx

/**
 * Specifies the type of a principal.
 */

/* tslint:disable:no-bitwise */
var PrincipalType;
exports.PrincipalType = PrincipalType;

(function (PrincipalType) {
  /**
   * Enumeration whose value specifies no principal type.
   */
  PrincipalType[PrincipalType["None"] = 0] = "None";
  /**
   * Enumeration whose value specifies a user as the principal type.
   */

  PrincipalType[PrincipalType["User"] = 1] = "User";
  /**
   * Enumeration whose value specifies a distribution list as the principal type.
   */

  PrincipalType[PrincipalType["DistributionList"] = 2] = "DistributionList";
  /**
   * Enumeration whose value specifies a security group as the principal type.
   */

  PrincipalType[PrincipalType["SecurityGroup"] = 4] = "SecurityGroup";
  /**
   * Enumeration whose value specifies a group as the principal type.
   */

  PrincipalType[PrincipalType["SharePointGroup"] = 8] = "SharePointGroup";
  /**
   * Enumeration whose value specifies all principal types.
   */

  PrincipalType[PrincipalType["All"] = 15] = "All";
})(PrincipalType || (exports.PrincipalType = PrincipalType = {}));
/* tslint:enable:no-bitwise */

/**
 * Specifies the source of a principal.
 */

/* tslint:disable:no-bitwise */


var PrincipalSource;
exports.PrincipalSource = PrincipalSource;

(function (PrincipalSource) {
  /**
   * Enumeration whose value specifies no principal source.
   */
  PrincipalSource[PrincipalSource["None"] = 0] = "None";
  /**
   * Enumeration whose value specifies user information list as the principal source.
   */

  PrincipalSource[PrincipalSource["UserInfoList"] = 1] = "UserInfoList";
  /**
   * Enumeration whose value specifies Active Directory as the principal source.
   */

  PrincipalSource[PrincipalSource["Windows"] = 2] = "Windows";
  /**
   * Enumeration whose value specifies the current membership provider as the principal source.
   */

  PrincipalSource[PrincipalSource["MembershipProvider"] = 4] = "MembershipProvider";
  /**
   * Enumeration whose value specifies the current role provider as the principal source.
   */

  PrincipalSource[PrincipalSource["RoleProvider"] = 8] = "RoleProvider";
  /**
   * Enumeration whose value specifies all principal sources.
   */

  PrincipalSource[PrincipalSource["All"] = 15] = "All";
})(PrincipalSource || (exports.PrincipalSource = PrincipalSource = {}));

var PageType;
exports.PageType = PageType;

(function (PageType) {
  PageType[PageType["Invalid"] = -1] = "Invalid";
  PageType[PageType["DefaultView"] = 0] = "DefaultView";
  PageType[PageType["NormalView"] = 1] = "NormalView";
  PageType[PageType["DialogView"] = 2] = "DialogView";
  PageType[PageType["View"] = 3] = "View";
  PageType[PageType["DisplayForm"] = 4] = "DisplayForm";
  PageType[PageType["DisplayFormDialog"] = 5] = "DisplayFormDialog";
  PageType[PageType["EditForm"] = 6] = "EditForm";
  PageType[PageType["EditFormDialog"] = 7] = "EditFormDialog";
  PageType[PageType["NewForm"] = 8] = "NewForm";
  PageType[PageType["NewFormDialog"] = 9] = "NewFormDialog";
  PageType[PageType["SolutionForm"] = 10] = "SolutionForm";
  PageType[PageType["PAGE_MAXITEMS"] = 11] = "PAGE_MAXITEMS";
})(PageType || (exports.PageType = PageType = {}));
},{}],"../node_modules/@pnp/sp/utils/objectToSPKeyValueCollection.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.objectToSPKeyValueCollection = objectToSPKeyValueCollection;

var _metadata = require("./metadata");

var _common = require("@pnp/common");

/**
 * Creates an object representing a SharePoint Collection(SP.KeyValue)
 *
 * @param obj The plain object defining the properties
 */
function objectToSPKeyValueCollection(obj) {
  return (0, _common.assign)((0, _metadata.metadata)("Collection(SP.KeyValue)"), {
    results: Object.keys(obj).map(function (key) {
      return (0, _common.assign)((0, _metadata.metadata)("SP.KeyValue"), {
        Key: key,
        Value: Reflect.get(obj, key),
        ValueType: "Edm.String"
      });
    })
  });
}
},{"./metadata":"../node_modules/@pnp/sp/utils/metadata.js","@pnp/common":"../node_modules/@pnp/common/index.js"}],"../node_modules/@pnp/sp/utils/file-names.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.containsInvalidFileFolderChars = containsInvalidFileFolderChars;
exports.stripInvalidFileFolderChars = stripInvalidFileFolderChars;
var InvalidFileFolderNameCharsOnlineRegex = /["*:<>?/\\|\x00-\x1f\x7f-\x9f]/g;
var InvalidFileFolderNameCharsOnPremiseRegex = /["#%*:<>?/\\|\x00-\x1f\x7f-\x9f]/g;
/**
 * Checks if file or folder name contains invalid characters
 *
 * @param input File or folder name to check
 * @param onPremise Set to true for SharePoint On-Premise
 * @returns True if contains invalid chars, false otherwise
 */

function containsInvalidFileFolderChars(input, onPremise) {
  if (onPremise === void 0) {
    onPremise = false;
  }

  if (onPremise) {
    return InvalidFileFolderNameCharsOnPremiseRegex.test(input);
  } else {
    return InvalidFileFolderNameCharsOnlineRegex.test(input);
  }
}
/**
 * Removes invalid characters from file or folder name
 *
 * @param input File or folder name
 * @param replacer Value that will replace invalid characters
 * @param onPremise Set to true for SharePoint On-Premise
 * @returns File or folder name with replaced invalid characters
 */


function stripInvalidFileFolderChars(input, replacer, onPremise) {
  if (replacer === void 0) {
    replacer = "";
  }

  if (onPremise === void 0) {
    onPremise = false;
  }

  if (onPremise) {
    return input.replace(InvalidFileFolderNameCharsOnPremiseRegex, replacer);
  } else {
    return input.replace(InvalidFileFolderNameCharsOnlineRegex, replacer);
  }
}
},{}],"../node_modules/@pnp/sp/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  SharePointQueryableInstance: true,
  SharePointQueryableCollection: true,
  SharePointQueryable: true,
  spInvokableFactory: true,
  SPBatch: true,
  SPHttpClient: true,
  SPRest: true,
  sp: true,
  toAbsoluteUrl: true,
  extractWebUrl: true,
  objectToSPKeyValueCollection: true,
  stripInvalidFileFolderChars: true,
  containsInvalidFileFolderChars: true
};
Object.defineProperty(exports, "SharePointQueryableInstance", {
  enumerable: true,
  get: function () {
    return _sharepointqueryable.SharePointQueryableInstance;
  }
});
Object.defineProperty(exports, "SharePointQueryableCollection", {
  enumerable: true,
  get: function () {
    return _sharepointqueryable.SharePointQueryableCollection;
  }
});
Object.defineProperty(exports, "SharePointQueryable", {
  enumerable: true,
  get: function () {
    return _sharepointqueryable.SharePointQueryable;
  }
});
Object.defineProperty(exports, "spInvokableFactory", {
  enumerable: true,
  get: function () {
    return _sharepointqueryable.spInvokableFactory;
  }
});
Object.defineProperty(exports, "SPBatch", {
  enumerable: true,
  get: function () {
    return _batch.SPBatch;
  }
});
Object.defineProperty(exports, "SPHttpClient", {
  enumerable: true,
  get: function () {
    return _sphttpclient.SPHttpClient;
  }
});
Object.defineProperty(exports, "SPRest", {
  enumerable: true,
  get: function () {
    return _rest.SPRest;
  }
});
Object.defineProperty(exports, "sp", {
  enumerable: true,
  get: function () {
    return _rest.sp;
  }
});
Object.defineProperty(exports, "toAbsoluteUrl", {
  enumerable: true,
  get: function () {
    return _toabsoluteurl.toAbsoluteUrl;
  }
});
Object.defineProperty(exports, "extractWebUrl", {
  enumerable: true,
  get: function () {
    return _extractweburl.extractWebUrl;
  }
});
Object.defineProperty(exports, "objectToSPKeyValueCollection", {
  enumerable: true,
  get: function () {
    return _objectToSPKeyValueCollection.objectToSPKeyValueCollection;
  }
});
Object.defineProperty(exports, "stripInvalidFileFolderChars", {
  enumerable: true,
  get: function () {
    return _fileNames.stripInvalidFileFolderChars;
  }
});
Object.defineProperty(exports, "containsInvalidFileFolderChars", {
  enumerable: true,
  get: function () {
    return _fileNames.containsInvalidFileFolderChars;
  }
});

var _sharepointqueryable = require("./sharepointqueryable");

var _batch = require("./batch");

var _decorators = require("./decorators");

Object.keys(_decorators).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _decorators[key];
    }
  });
});

var _operations = require("./operations");

Object.keys(_operations).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _operations[key];
    }
  });
});

var _sphttpclient = require("./sphttpclient");

var _rest = require("./rest");

var _types = require("./types");

Object.keys(_types).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _types[key];
    }
  });
});

var _toabsoluteurl = require("./utils/toabsoluteurl");

var _extractweburl = require("./utils/extractweburl");

var _objectToSPKeyValueCollection = require("./utils/objectToSPKeyValueCollection");

var _fileNames = require("./utils/file-names");
},{"./sharepointqueryable":"../node_modules/@pnp/sp/sharepointqueryable.js","./batch":"../node_modules/@pnp/sp/batch.js","./decorators":"../node_modules/@pnp/sp/decorators.js","./operations":"../node_modules/@pnp/sp/operations.js","./sphttpclient":"../node_modules/@pnp/sp/sphttpclient.js","./rest":"../node_modules/@pnp/sp/rest.js","./types":"../node_modules/@pnp/sp/types.js","./utils/toabsoluteurl":"../node_modules/@pnp/sp/utils/toabsoluteurl.js","./utils/extractweburl":"../node_modules/@pnp/sp/utils/extractweburl.js","./utils/objectToSPKeyValueCollection":"../node_modules/@pnp/sp/utils/objectToSPKeyValueCollection.js","./utils/file-names":"../node_modules/@pnp/sp/utils/file-names.js"}],"../node_modules/@pnp/sp/presets/core.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  sp: true
};
exports.sp = void 0;

var _rest = require("../rest");

var _items = require("../items");

Object.keys(_items).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _items[key];
    }
  });
});

var _lists = require("../lists");

Object.keys(_lists).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _lists[key];
    }
  });
});

var _sites = require("../sites");

Object.keys(_sites).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _sites[key];
    }
  });
});

var _webs = require("../webs");

Object.keys(_webs).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _webs[key];
    }
  });
});

var _index = require("../index");

Object.keys(_index).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _index[key];
    }
  });
});
var sp = new _rest.SPRest();
exports.sp = sp;
},{"../rest":"../node_modules/@pnp/sp/rest.js","../items":"../node_modules/@pnp/sp/items/index.js","../lists":"../node_modules/@pnp/sp/lists/index.js","../sites":"../node_modules/@pnp/sp/sites/index.js","../webs":"../node_modules/@pnp/sp/webs/index.js","../index":"../node_modules/@pnp/sp/index.js"}],"Utilities/Utils.ts":[function(require,module,exports) {
"use strict";

var _a;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ui = exports.lists = void 0;

var core_1 = require("@pnp/sp/presets/core");

var config = {
  headers: (_a = {}, _a["accept"] = "application/json;odata=nometadata", _a)
};
var lists;

(function (lists) {
  lists.MDExperience = core_1.sp.web.lists.getById("6d8123a0-f96c-4fc7-862a-10e31b47e169");
  lists.MDExperience.configure(config);
})(lists = exports.lists || (exports.lists = {}));

var ui;

(function (ui) {
  function renderFieldDetail(parameters) {
    var title = parameters.title,
        value = parameters.value,
        type = parameters.type,
        id = parameters.id,
        className = parameters.className,
        required = parameters.required,
        name = parameters.name,
        others = parameters.others,
        classTitle = parameters.classTitle;
    return "\n          <label>" + title + "</label>\n          <div class=\"control\">\n            <" + type + " id=\"" + (id || "") + "\" name=\"" + name + "\" class=\"" + (className || "") + "\" data-bind=\"value: " + value + "\" " + (required ? "required" : "") + " " + (others ? others : "") + "></" + type + ">\n          </div>\n      ";
  }

  ui.renderFieldDetail = renderFieldDetail;
})(ui = exports.ui || (exports.ui = {}));
},{"@pnp/sp/presets/core":"../node_modules/@pnp/sp/presets/core.js"}],"Controller/QualificationController.ts":[function(require,module,exports) {
"use strict";

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = this && this.__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DataController = void 0;

var Utils_1 = require("../Utilities/Utils");

var DataController;

(function (DataController) {
  function readData() {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4
            /*yield*/
            , Utils_1.lists.MDExperience.items.orderBy("Created", false).get()];

          case 1:
            return [2
            /*return*/
            , _a.sent()];
        }
      });
    });
  }

  DataController.readData = readData;

  function updateData(data) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4
            /*yield*/
            , Utils_1.lists.MDExperience.items.getById(data.Id).update(data)];

          case 1:
            return [2
            /*return*/
            , _a.sent()];
        }
      });
    });
  }

  DataController.updateData = updateData;
})(DataController = exports.DataController || (exports.DataController = {}));
},{"../Utilities/Utils":"Utilities/Utils.ts"}],"BuinessLogic/QualificationBL.ts":[function(require,module,exports) {
"use strict";

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = this && this.__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EditData = exports.DataBL = void 0;

require("../js/rating.js");

require("../Styles/rating.css");

var QualificationController_1 = require("../Controller/QualificationController");

var DataBL;

(function (DataBL) {
  function readData() {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4
            /*yield*/
            , QualificationController_1.DataController.readData()];

          case 1:
            return [2
            /*return*/
            , _a.sent()];
        }
      });
    });
  }

  DataBL.readData = readData;

  function updateData(data) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (!(DataBL.classification && data.Comments != "")) return [3
            /*break*/
            , 2];
            data.Satisfaction = DataBL.classification.toString();
            data.Evaluated = true;
            return [4
            /*yield*/
            , QualificationController_1.DataController.updateData(data)];

          case 1:
            return [2
            /*return*/
            , _a.sent()];

          case 2:
            return [2
            /*return*/
            ];
        }
      });
    });
  }

  DataBL.updateData = updateData;
})(DataBL = exports.DataBL || (exports.DataBL = {}));

var EditData;

(function (EditData) {
  function edit(ev) {
    return __awaiter(this, void 0, void 0, function () {
      var calificated;

      var _this = this;

      return __generator(this, function (_a) {
        if (!ev.model.isNew()) {
          calificated = parseInt(ev.model["Satisfaction"]);
          console.log(calificated);
          $("#calification").val(calificated);
          $("#calification").attr("disabled", "disabled");
          console.log(ev.model["Evaluated"]);

          if (ev.model["Evaluated"] == true) {
            $(".k-grid-update").attr("disabled", "disabled");
            $("#Comments").attr("disabled", "disabled");
            $("#Satisfaction").attr("disabled", "disabled");
          }
        }

        $(".k-grid-update").html("<span class='k-icon k-i-check'></span>SAVE");
        $("#Satisfaction").rateYo({
          numStars: 10,
          fullStar: true,
          rating: calificated / 2,
          onSet: function onSet(rating, rateYoInstance) {
            var classification = rating * 2;
            DataBL.classification = classification;
            $("#star").val(classification);
            $("#calification").val(rating * 2);
          },
          multiColor: {
            "startColor": "#FF0000",
            "endColor": "#31C41D"
          }
        });
        $(".k-grid-update").click(function () {
          return __awaiter(this, void 0, void 0, function () {
            var comment;
            return __generator(this, function (_a) {
              switch (_a.label) {
                case 0:
                  console.log(DataBL.classification);
                  comment = $("#Comments").val();
                  console.log(comment);
                  if (!(DataBL.classification && comment != "")) return [3
                  /*break*/
                  , 3];
                  return [4
                  /*yield*/
                  , showNotificationWindow()];

                case 1:
                  _a.sent();

                  return [4
                  /*yield*/
                  , setTimeout(function () {
                    location.href = "https://millicom.sharepoint.com/sites/SharedServiceCenter";
                  }, 2000)];

                case 2:
                  _a.sent();

                  _a.label = 3;

                case 3:
                  return [2
                  /*return*/
                  ];
              }
            });
          });
        });
        $(".k-grid-cancel, .k-i-close").click(function (e) {
          return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
              location.href = "https://millicom.sharepoint.com/sites/SharedServiceCenter";
              return [2
              /*return*/
              ];
            });
          });
        });
        validateFields();
        return [2
        /*return*/
        ];
      });
    });
  }

  EditData.edit = edit;

  function validateFields() {
    return __awaiter(this, void 0, void 0, function () {
      var validator;
      return __generator(this, function (_a) {
        validator = $("#tabstrip").kendoValidator().data("kendoValidator");
        $(".k-grid-update").click(function () {
          if (!validator.validateInput($("textarea[name=Comments]"))) {
            NotificationError("The field Comment is required");
          }

          if (!validator.validateInput($("input[name=star]"))) {
            NotificationError("You must choose a rating");
          }
        });
        return [2
        /*return*/
        ];
      });
    });
  }

  EditData.validateFields = validateFields; // Show popip notification when the result is success 

  function NotificationSuccess(msg) {
    var popupNotification = $("#popupNotification").kendoNotification({
      position: {
        top: 20
      },
      hideOnClick: true
    }).data("kendoNotification");
    popupNotification.show(kendo.toString(msg), "success");
  }

  EditData.NotificationSuccess = NotificationSuccess; //Show popup notification when the result is wrong

  function NotificationError(msg) {
    var popupNotification = $("#popupNotification").kendoNotification({
      position: {
        top: 20
      },
      autoHideAfter: 10000,
      hideOnClick: true
    }).data("kendoNotification");
    popupNotification.show(kendo.toString(msg), "error");
  }

  EditData.NotificationError = NotificationError;

  function showNotificationWindow() {
    // data iene de la funcion VValidateFields, es un array
    var div = document.createElement("div.notificaciones");
    var windowConfir = $(div).kendoWindow({
      width: "430px",
      height: "auto",
      title: "Notification",
      visible: false,
      content: {
        template: "\n            <div>\n            <br />\n              <h1 style=\"text-align: center; font-size: 22px;\">Thanks for your rating</h1><br/>\n              <center><span class=\"material-icons icon-check\">check_circle_outline</span></center>\n            </div>\n          "
      }
    }).data("kendoWindow").center().open();
  }
})(EditData = exports.EditData || (exports.EditData = {}));
},{"../js/rating.js":"js/rating.js","../Styles/rating.css":"Styles/rating.css","../Controller/QualificationController":"Controller/QualificationController.ts"}],"Template/QualificationTemplate.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTemplate = void 0;

var Utils_1 = require("../Utilities/Utils");

var renderFieldDetail = Utils_1.ui.renderFieldDetail;
var Rating = renderFieldDetail({
  id: "Satisfaction",
  className: "input k-textbox",
  title: "What level of satisfaction would you rate the current requirement?",
  type: "div",
  name: "Satisfaction",
  others: "validationMessage='This field is required'",
  value: "Satisfaction",
  required: true
});
var Comments = renderFieldDetail({
  id: "Comments",
  className: "textarea k-textbox",
  title: "Comments",
  type: "textarea",
  name: "Comments",
  others: "validationMessage='This field is required'",
  value: "Comments",
  required: true
});

function getTemplate() {
  return "\n    <div id=\"tabstrip\">\n        <ul>\n            <li style=\"display: none;\" class=\"k-state-active\">Initiative</li>\n        </ul>\n\n\n        <div class=\"edit-container\">\n            <span id=\"popupNotification\"></span>\n\n            <span id=\"popupNotification\"></span>\n\n            <div class=\"columns\">\n\n                <div class=\"column is-12\">\n                    <div class=\"column is-12\">\n                        <span class=\"required-icon\">*</span> \n                        " + Rating + "\n                        <input type=\"text\" id=\"calification\" class=\"input\" style=\"text-align: center; font-size: 20px;\" >\n                        <span class=\"k-invalid-msg\" data-for=\"dIniciativeCreation\"></span>\n                        <input type=\"hidden\" id=\"star\" name=\"star\" required validationMessage=\"This field is required\" />\n                    </div>\n\n                    <div class=\"column is-12\">\n                        <span class=\"required-icon\">*</span> \n                        " + Comments + " \n                        <span class=\"k-invalid-msg\" data-for=\"dIniciativeCreation\"></span>\n                    </div>\n                    <br>\n                </div>\n\n            </div>\n\n        </div>\n\n    </div>   \n    <div id =\"load\"></div> \n    ";
}

exports.getTemplate = getTemplate;
},{"../Utilities/Utils":"Utilities/Utils.ts"}],"Qualification.ts":[function(require,module,exports) {
"use strict";

var __createBinding = this && this.__createBinding || (Object.create ? function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  Object.defineProperty(o, k2, {
    enumerable: true,
    get: function get() {
      return m[k];
    }
  });
} : function (o, m, k, k2) {
  if (k2 === undefined) k2 = k;
  o[k2] = m[k];
});

var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function (o, v) {
  Object.defineProperty(o, "default", {
    enumerable: true,
    value: v
  });
} : function (o, v) {
  o["default"] = v;
});

var __importStar = this && this.__importStar || function (mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) {
    if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
  }

  __setModuleDefault(result, mod);

  return result;
};

var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = this && this.__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var QualificationBL_1 = require("./BuinessLogic/QualificationBL");

var QualificationTemplate = __importStar(require("./Template/QualificationTemplate"));

require("./Styles/Styles.css");

var dataSource = new kendo.data.DataSource({
  pageSize: 100,
  transport: {
    read: function read(ev) {
      return __awaiter(void 0, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [4
              /*yield*/
              , QualificationBL_1.DataBL.readData()];

            case 1:
              result = _a.sent();
              ev.success(result);
              return [2
              /*return*/
              ];
          }
        });
      });
    },
    update: function update(ev) {
      return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              return [4
              /*yield*/
              , QualificationBL_1.DataBL.updateData(ev.data)];

            case 1:
              _a.sent();

              return [2
              /*return*/
              ];
          }
        });
      });
    }
  },
  schema: {
    model: {
      id: "Id",
      fields: {
        Title: {
          type: "string"
        }
      }
    }
  }
});
var grid = $("#gridQualification").kendoGrid({
  columns: [{
    field: "Id",
    title: "Id"
  }],
  editable: {
    mode: "popup",
    template: QualificationTemplate.getTemplate(),
    window: {
      title: "Rating"
    }
  },
  edit: QualificationBL_1.EditData.edit,
  toolbar: [{
    name: "create",
    text: "ADD NEW"
  }],
  dataSource: dataSource,
  dataBound: function dataBound() {
    console.log(window.location.href);
    var Url = window.location.href.split("=");

    if (Url.length > 1) {
      var num = parseInt(Url[1]);
      console.log(num);
      var grid = $("#gridQualification").data("kendoGrid");
      var item = grid.dataSource.get(num);
      var tr = $("[data-uid='" + item.uid + "']", grid.tbody);
      grid.editRow($(tr));
    }
  }
}).data("kendoGrid");
$("#gridQualification").css("opacity", "0");
},{"./BuinessLogic/QualificationBL":"BuinessLogic/QualificationBL.ts","./Template/QualificationTemplate":"Template/QualificationTemplate.ts","./Styles/Styles.css":"Styles/rating.css"}]},{},["Qualification.ts"], null)
//# sourceMappingURL=/Qualification.js.map