(function () {
  if (typeof SnakeGame === "undefined") {
    window.SnakeGame = {};
  }
  
  var View = SnakeGame.View = function ($el) {
    this.$el = $el;
  };
  
  View.prototype.bindEvents = function () {
    $(document).on("keydown", handleKeyEvent.bind(this));
  };
  
  View.prototype.render = function () {
    var $display = $('.display');
    $display.html('');
    for (var i = 0; i < this.board.spaces.length; i++) {
      var $row = $('<div class="row"></div>');
      for (var j = 0; j < this.board.spaces[i].length; j++) {
        var class2 = "empty"
        if (this.board.spaces[i][j] === '*') {
          class2 = "snake";
        } else if (this.board.spaces[i][j] === "$") {
          class2 = "apple";
        }
        $row.append($('<div class="cell ' + class2 + '"></div>'));
      }
      $display.append($row);
    }
  };
  
  View.prototype.start = function () {
    this.board = new SnakeGame.Board();
    this.bindEvents();
    setInterval(this.step.bind(this), 500);
  };
  
  View.prototype.step = function () {
    this.board.snake.move();
    this.board.storeState();
    this.render();
  };
  
  var KEYMAP = {
    65: "W",
    87: "N",
    68: "E",
    83: "S"
  }

  var handleKeyEvent = function (event) {
    if (KEYMAP[event.keyCode] !== "undefined") {
      this.board.snake.turn(KEYMAP[event.keyCode]);
    }
  };
  
})();