(function () {
  if (typeof SnakeGame === "undefined") {
    window.SnakeGame = {};
  }
  
  var View = SnakeGame.View = function ($el) {
    this.$el = $el;
  };
  
  View.prototype.bindEvents = function () {
    this.$el.on("keydown", handleKeyEvent.bind(this));
  };
  
  View.prototype.render = function () {
    // var $holder = $('<pre></pre>');
    // $holder.append(this.board.render());
    $('.display').text(this.board.render());
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