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
})({"src/CST.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CST = void 0;
var CST = {
  SCENES: {
    LOAD: "LOAD",
    MENU: "MENU",
    LEVELONE: "LEVELONE",
    OPTIONS: "OPTIONS",
    LEVELTWO: "LEVELTWO"
  }
};
exports.CST = CST;
},{}],"src/scenes/LoadScene.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoadScene = void 0;

var _CST = require("../CST");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

// import { MenuScene } from "./MenuScene";
var LoadScene = /*#__PURE__*/function (_Phaser$Scene) {
  _inherits(LoadScene, _Phaser$Scene);

  var _super = _createSuper(LoadScene);

  function LoadScene() {
    _classCallCheck(this, LoadScene);

    return _super.call(this, {
      key: _CST.CST.SCENES.LOAD
    });
  }

  _createClass(LoadScene, [{
    key: "init",
    value: function init() {}
  }, {
    key: "preload",
    value: function preload() {
      var _this = this;

      // load image, spritesheet, sound
      this.load.image("mainbg", "./assets/mainbg.jpg");
      this.load.image("options_button.png", "./assets/options_button.png");
      this.load.image("play_button.png", "./assets/play_button.png");
      this.load.image("mushroom.png", "./assets/mushroom.png");
      this.load.image("ground", "assets/platform.png");
      this.load.image("grass", "assets/grass.jpeg");
      this.load.image("star", "assets/star.png");
      this.load.image("bomb", "assets/bomb.png");
      this.load.spritesheet("cat.png", "./assets/cat.png", {
        frameHeight: 100,
        frameWidth: 200
      });
      this.load.spritesheet("purple.png", "./assets/purple.png", {
        frameHeight: 50,
        frameWidth: 100
      });
      this.load.spritesheet("jasmine", "./assets/jasmine.png", {
        frameWidth: 32,
        frameHeight: 48
      });
      this.load.spritesheet("moderngirl", "./assets/moderngirl.png", {
        frameWidth: 32,
        frameHeight: 48
      });
      this.load.spritesheet("fullscreen", "./assets/fullscreen.png", {
        frameWidth: 64,
        frameHeight: 64
      });
      this.load.spritesheet("back", "./assets/back.png", {
        frameWidth: 64,
        frameHeight: 64
      });
      this.load.spritesheet("question", "./assets/question.jpeg", {
        frameWidth: 64,
        frameHeight: 64
      }); // create loading bar

      var loadingBar = this.add.graphics({
        fillStyle: {
          color: 0xff00ff //white

        }
      }); //Loader Events - complete, progress
      //simulate large load

      for (var i = 0; i < 100; i++) {
        this.load.spritesheet("cat" + i, "./assets/cat.png", {
          frameHeight: 150,
          frameWidth: 200
        });
      }

      this.load.on("progress", function (percent) {
        loadingBar.fillRect(0, _this.game.renderer.height / 2, _this.game.renderer.width * percent, 50);
        console.log(percent);
      });
      this.load.on("complete", function () {
        console.log("done");
      });
    }
  }, {
    key: "create",
    value: function create() {
      this.scene.start(_CST.CST.SCENES.MENU, "hello from LoadScene");
    }
  }]);

  return LoadScene;
}(Phaser.Scene);

exports.LoadScene = LoadScene;
},{"../CST":"src/CST.js"}],"src/scenes/MenuScene.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MenuScene = void 0;

var _CST = require("../CST");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var fullscreenMushroom;

var MenuScene = /*#__PURE__*/function (_Phaser$Scene) {
  _inherits(MenuScene, _Phaser$Scene);

  var _super = _createSuper(MenuScene);

  function MenuScene() {
    _classCallCheck(this, MenuScene);

    return _super.call(this, {
      key: _CST.CST.SCENES.MENU
    });
  }

  _createClass(MenuScene, [{
    key: "init",
    value: function init(data) {
      console.log("This is DATA", data);
    }
  }, {
    key: "preload",
    value: function preload() {}
  }, {
    key: "create",
    value: function create() {
      var _this = this;

      //create images (z order)
      this.add.image(0, 0, "mainbg").setOrigin(0).setDepth(0);
      fullscreenMushroom = this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.2, "mushroom.png").setDepth(1).setScale(0.5).setInteractive();
      fullscreenMushroom.on("pointerup", function () {
        if (_this.scale.isFullscreen) {
          fullscreenMushroom.setFrame(0);

          _this.scale.stopFullscreen();
        } else {
          fullscreenMushroom.setFrame(1);

          _this.scale.startFullscreen();
        }
      }, this);
      var playButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, "play_button.png").setDepth(1);
      var optionsButton = this.add.image(this.game.renderer.width / 2 + 300, this.game.renderer.height / 2 + 180, "options_button.png").setDepth(1); // create sprites (if using pixel art, remove sharpen)

      var hoverSprite = this.add.sprite(100, 100, "cat.png");
      hoverSprite.setScale(1);
      hoverSprite.setVisible(false);
      var purpleHover = this.add.sprite(-100, -100, "purple.png");
      hoverSprite.setScale(1);
      hoverSprite.setVisible(false); //create animation

      this.anims.create({
        key: "jump",
        frameRate: 4,
        repeat: -1,
        //repeat forever
        frames: this.anims.generateFrameNumbers("cat.png", {
          frames: [0, 1, 2, 3]
        })
      }); // PointerEvents pointerover, pointerout, pointerup, pointerdown

      playButton.setInteractive();
      playButton.on("pointerover", function () {
        console.log("hover");
        hoverSprite.setVisible(true);
        hoverSprite.play("jump");
        hoverSprite.x = playButton.x - (playButton.width - 440);
        hoverSprite.y = playButton.y + playButton.height * 3.3;
      });
      playButton.on("pointerout", function () {
        console.log("out");
        hoverSprite.setVisible(false);
      });
      playButton.on("pointerup", function () {
        console.log("up");

        _this.scene.start(_CST.CST.SCENES.LEVELTWO);
      });
      optionsButton.setInteractive();
      optionsButton.on("pointerover", function () {
        console.log("hover");
        purpleHover.setVisible(true);
      });
      optionsButton.on("pointerout", function () {
        console.log("no-hover");
        purpleHover.setVisible(false);
        purpleHover.x = optionsButton.x;
        purpleHover.y = optionsButton.y;
      });
      optionsButton.on("pointerup", function () {
        _this.scene.start(_CST.CST.SCENES.OPTIONS);
      });
    }
  }]);

  return MenuScene;
}(Phaser.Scene);

exports.MenuScene = MenuScene;
},{"../CST":"src/CST.js"}],"src/scenes/LevelOneScene.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelOneScene = void 0;

var _CST = require("../CST");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var platforms;
var player;
var cursors;
var stars;
var score = 0;
var scoreText;
var button;
var fullscreenText;
var playButton;

function collectStar(player, star) {
  star.disableBody(true, true);
  score += 10;
  scoreText.setText("Your score: " + score);
  fullscreenText.setText("press f for fullscreen modus");

  if (stars.countActive(true) === 0) {
    playButton.visible = true;
  }

  var x = player.x < 400 ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
}

function reachedFifty() {
  player.setTint(0xff00ff);
  stars.setTint(0x00ff00);
}

function reachedHundred() {
  player.setTint(0);
  stars.setTint(0xffff00);
}

var LevelOneScene = /*#__PURE__*/function (_Phaser$Scene) {
  _inherits(LevelOneScene, _Phaser$Scene);

  var _super = _createSuper(LevelOneScene);

  function LevelOneScene() {
    _classCallCheck(this, LevelOneScene);

    return _super.call(this, {
      key: _CST.CST.SCENES.LEVELONE
    });
  }

  _createClass(LevelOneScene, [{
    key: "init",
    value: function init() {}
  }, {
    key: "preload",
    value: function preload() {}
  }, {
    key: "create",
    value: function create() {
      var _this = this;

      this.add.image(0, 0, "mainbg").setOrigin(0).setDepth(0);
      platforms = this.physics.add.staticGroup();
      platforms.create(400, 580, "ground").setScale(2).refreshBody();
      platforms.create(600, 420, "ground");
      platforms.create(50, 270, "ground");
      platforms.create(750, 250, "ground");
      player = this.physics.add.sprite(20, 300, "jasmine");
      player.setBounce(0.5);
      player.setCollideWorldBounds(true);
      this.anims.create({
        key: "left",
        frames: this.anims.generateFrameNames("jasmine", {
          start: 4,
          end: 7
        }),
        frameRate: 10,
        repeat: -1
      });
      this.anims.create({
        key: "turn",
        frames: [{
          key: "jasmine",
          frame: 0
        }],
        frameRate: 20
      });
      this.anims.create({
        key: "right",
        frames: this.anims.generateFrameNames("jasmine", {
          start: 8,
          end: 11
        }),
        frameRate: 10,
        repeat: -1
      });
      cursors = this.input.keyboard.createCursorKeys();
      this.physics.add.collider(player, platforms);
      stars = this.physics.add.group({
        key: "star",
        repeat: 11,
        setXY: {
          x: 12,
          y: 0,
          stepX: 70
        }
      });
      stars.children.iterate(function (child) {
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.5));
      });
      this.physics.add.collider(stars, platforms);
      this.physics.add.overlap(player, stars, collectStar, null, this);
      scoreText = this.add.text(280, 10, "Your score: 0", {
        fontSize: "32px",
        fill: "#000"
      });
      fullscreenText = this.add.text(420, 570, "press f for fullscreen modus", {
        fontSize: "22px",
        fill: "#000"
      });
      button = this.add.sprite(750, 50, "fullscreen").setDepth(1).setScale(1).setInteractive();
      button.on("pointerup", function () {
        if (_this.scale.isFullscreen) {
          button.setFrame(0);

          _this.scale.stopFullscreen();
        } else {
          button.setFrame(1);

          _this.scale.startFullscreen();
        }
      }, this);
      var fKey = this.input.keyboard.addKey("F");
      fKey.on("down", function () {
        if (this.scale.isFullscreen) {
          button.setFrame(0);
          this.scale.stopFullscreen();
        } else {
          button.setFrame(1);
          this.scale.startFullscreen();
        }
      }, this);
      playButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, "play_button.png").setDepth(1);
      playButton.visible = false;
      playButton.setInteractive();
      playButton.on("pointerup", function () {
        _this.scene.start(_CST.CST.SCENES.LEVELTWO);
      });
    }
  }, {
    key: "update",
    value: function update() {
      if (cursors.left.isDown) {
        player.setVelocityX(-160);
        player.anims.play("left", true);
      } else if (cursors.right.isDown) {
        player.setVelocityX(160);
        player.anims.play("right", true);
      } else {
        player.setVelocityX(0);
        player.anims.play("turn");
      }

      if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-330);
      }

      if (score == 50) {
        reachedFifty();
      }

      if (score == 100) {
        reachedHundred();
      }
    }
  }]);

  return LevelOneScene;
}(Phaser.Scene);

exports.LevelOneScene = LevelOneScene;
},{"../CST":"src/CST.js"}],"src/scenes/OptionsScene.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OptionsScene = void 0;

var _CST = require("../CST");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var changePlayer;
var moderngirl;
var back;
var button;
var player;

var OptionsScene = /*#__PURE__*/function (_Phaser$Scene) {
  _inherits(OptionsScene, _Phaser$Scene);

  var _super = _createSuper(OptionsScene);

  function OptionsScene() {
    _classCallCheck(this, OptionsScene);

    return _super.call(this, {
      key: _CST.CST.SCENES.OPTIONS
    });
  }

  _createClass(OptionsScene, [{
    key: "init",
    value: function init() {}
  }, {
    key: "preload",
    value: function preload() {}
  }, {
    key: "create",
    value: function create() {
      var _this = this;

      this.add.image(0, 0, "mainbg").setOrigin(0).setDepth(0);
      changePlayer = this.add.text(50, 100, "Choose your player:", {
        fontSize: "32px",
        fill: "#000"
      });
      moderngirl = this.add.sprite(500, 100, "moderngirl", 0);
      this.anims.create({
        key: "walk",
        repeat: -1,
        frameRate: 10,
        frames: this.anims.generateFrameNames("moderngirl", {
          start: 1,
          end: 3
        })
      });
      moderngirl.play("walk");
      player = this.add.sprite(600, 100, "jasmine");
      this.anims.create({
        key: "playerWalk",
        repeat: -1,
        frameRate: 10,
        frames: this.anims.generateFrameNames("jasmine", {
          start: 1,
          end: 3
        })
      });
      player.play("playerWalk");
      back = this.add.sprite(50, 550, "back").setDepth(1).setScale(1).setInteractive();
      back.on("pointerup", function () {
        _this.scene.start(_CST.CST.SCENES.MENU);
      });
      button = this.add.sprite(750, 50, "fullscreen").setDepth(1).setScale(1).setInteractive();
      button.on("pointerup", function () {
        if (_this.scale.isFullscreen) {
          button.setFrame(0);

          _this.scale.stopFullscreen();
        } else {
          button.setFrame(1);

          _this.scale.startFullscreen();
        }
      }, this);
      var fKey = this.input.keyboard.addKey("F");
      fKey.on("down", function () {
        if (this.scale.isFullscreen) {
          button.setFrame(0);
          this.scale.stopFullscreen();
        } else {
          button.setFrame(1);
          this.scale.startFullscreen();
        }
      }, this);
    }
  }]);

  return OptionsScene;
}(Phaser.Scene);

exports.OptionsScene = OptionsScene;
},{"../CST":"src/CST.js"}],"src/scenes/LevelTwoScene.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelTwoScene = void 0;

var _CST = require("../CST");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function () { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var platforms;
var moderngirl;
var cursors;
var stars;
var score = 0;
var scoreText;
var button;
var fullscreenText;

function collectStar(moderngirl, star) {
  star.disableBody(true, true);
  score += 10;
  scoreText.setText("Your score: " + score);
  fullscreenText.setText("press f for fullscreen modus");

  if (stars.countActive(true) === 0) {
    playButton.visible = true;
  }

  var x = moderngirl.x < 400 ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
}

var LevelTwoScene = /*#__PURE__*/function (_Phaser$Scene) {
  _inherits(LevelTwoScene, _Phaser$Scene);

  var _super = _createSuper(LevelTwoScene);

  function LevelTwoScene() {
    _classCallCheck(this, LevelTwoScene);

    return _super.call(this, {
      key: _CST.CST.SCENES.LEVELTWO
    });
  }

  _createClass(LevelTwoScene, [{
    key: "init",
    value: function init() {}
  }, {
    key: "preload",
    value: function preload() {}
  }, {
    key: "create",
    value: function create() {
      this.add.image(0, 0, "mainbg").setOrigin(0).setDepth(0);
      platforms = this.physics.add.staticGroup();
      platforms.create(400, 600, "grass").setScale(2).refreshBody();
      platforms.create(-100, 200, "grass");
      platforms.create(350, 400, "grass");
      platforms.create(700, 150, "grass");
      platforms.create(220, 270, "question");
      platforms.create(355, 200, "question");
      moderngirl = this.physics.add.sprite(20, 300, "moderngirl", 0);
      moderngirl.setBounce(0.5);
      moderngirl.setCollideWorldBounds(true);
      this.anims.create({
        key: "turnleft",
        frames: this.anims.generateFrameNames("moderngirl", {
          start: 4,
          end: 7
        }),
        frameRate: 10,
        repeat: -1
      });
      this.anims.create({
        key: "turnstraight",
        frames: [{
          key: "moderngirl",
          frame: 0
        }],
        frameRate: 20
      });
      this.anims.create({
        key: "turnright",
        frames: this.anims.generateFrameNames("moderngirl", {
          start: 8,
          end: 11
        }),
        frameRate: 10,
        repeat: -1
      });
      cursors = this.input.keyboard.createCursorKeys();
      this.physics.add.collider(moderngirl, platforms);
      stars = this.physics.add.group({
        key: "star",
        repeat: 11,
        setXY: {
          x: 12,
          y: 0,
          stepX: 70
        }
      });
      stars.children.iterate(function (child) {
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.5));
      });
      this.physics.add.collider(stars, platforms);
      this.physics.add.overlap(moderngirl, stars, collectStar, null, this);
      scoreText = this.add.text(280, 10, "Your score: 0", {
        fontSize: "32px",
        fill: "#000"
      });
      fullscreenText = this.add.text(420, 570, "press f for fullscreen modus", {
        fontSize: "22px",
        fill: "#000"
      });
      button = this.add.image(800 - 16, 16, "fullscreen", 0).setOrigin(1, 0).setInteractive();
      button.on("pointerup", function () {
        if (this.scale.isFullscreen) {
          button.setFrame(0);
          this.scale.stopFullscreen();
        } else {
          button.setFrame(1);
          this.scale.startFullscreen();
        }
      }, this);
      var fKey = this.input.keyboard.addKey("F");
      fKey.on("down", function () {
        if (this.scale.isFullscreen) {
          button.setFrame(0);
          this.scale.stopFullscreen();
        } else {
          button.setFrame(1);
          this.scale.startFullscreen();
        }
      }, this);
    }
  }, {
    key: "update",
    value: function update() {
      if (cursors.left.isDown) {
        moderngirl.setVelocityX(-160);
        moderngirl.anims.play("turnleft", true);
      } else if (cursors.right.isDown) {
        moderngirl.setVelocityX(160);
        moderngirl.anims.play("turnright", true);
      } else {
        moderngirl.setVelocityX(0);
        moderngirl.anims.play("turnstraight");
      }

      if (cursors.up.isDown && moderngirl.body.touching.down) {
        moderngirl.setVelocityY(-330);
      }
    }
  }]);

  return LevelTwoScene;
}(Phaser.Scene);

exports.LevelTwoScene = LevelTwoScene;
},{"../CST":"src/CST.js"}],"src/main.js":[function(require,module,exports) {
"use strict";

var _LoadScene = require("./scenes/LoadScene");

var _MenuScene = require("./scenes/MenuScene");

var _LevelOneScene = require("./scenes/LevelOneScene");

var _OptionsScene = require("./scenes/OptionsScene");

var _LevelTwoScene = require("./scenes/LevelTwoScene");

console.log("connected!");
var config = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 800,
    height: 600
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: {
        y: 300
      },
      debug: false
    }
  },
  scene: [_LoadScene.LoadScene, _MenuScene.MenuScene, _LevelOneScene.LevelOneScene, _OptionsScene.OptionsScene, _LevelTwoScene.LevelTwoScene],
  render: {
    pixelArt: true
  }
};
var game = new Phaser.Game(config);
},{"./scenes/LoadScene":"src/scenes/LoadScene.js","./scenes/MenuScene":"src/scenes/MenuScene.js","./scenes/LevelOneScene":"src/scenes/LevelOneScene.js","./scenes/OptionsScene":"src/scenes/OptionsScene.js","./scenes/LevelTwoScene":"src/scenes/LevelTwoScene.js"}],"../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "59983" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/main.js"], null)
//# sourceMappingURL=/main.1e43358e.js.map