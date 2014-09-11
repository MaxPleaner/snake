(function () {
  if (typeof SnakeGame === "undefined") {
    window.SnakeGame = {};
  }
  
  var Snake = SnakeGame.Snake = function (board) {
    this.dirOptions = ["N", "E", "S", "W"];
    this.dir = "N";
    this.segments = [new Coord([5, 5])];
    this.board = board;
  };
  
  Snake.DIRECTIONS = {
    "N": [-1, 0],
    "S": [1, 0],
    "E": [0, 1],
    "W": [0, -1]
  };
  
  Snake.prototype.move = function () {
    var snakeHead = this.segments[this.segments.length - 1];
    var nextSpot = snakeHead.plus(this.dir);
    if (this.board.spaces[nextSpot.position[0]][nextSpot.position[1]] !== "$") {
      this.segments.splice(0, 1);
    } else {
      this.board.setApple();
    }
    this.segments.push(nextSpot);
  };
  
  Snake.prototype.turn = function(dir) {
    this.dir = dir;
  };
  
  var Coord = SnakeGame.Coord = function (position) {
    this.position = position;
  };
  
  Coord.prototype.plus = function (direction) {
    var delta = Snake.DIRECTIONS[direction];
    var nextCoord = [
      this.position[0] + delta[0],
      this.position[1] + delta[1]
    ];
    
    return new Coord(nextCoord);
  };
  
  var Board = SnakeGame.Board = function () {
    this.snake = new Snake(this);
    this.spaces = []
    for (var i = 0; i < 10; i++) {
      this.spaces.push(new Array(10));
    };
    this.setApple();
  };
  
  Board.prototype.storeState = function () {
    this.spaces.forEach(function(row){
      for (var i = 0; i < row.length; i++) {
        if (row[i] !== "$") {
          row[i] = undefined;
        }
      };
    })
    for (var i = 0; i < this.snake.segments.length; i++) {
      var segmentPos = this.snake.segments[i].position;
      var segmentX = segmentPos[1];
      var segmentY = segmentPos[0];
      this.spaces[segmentY][segmentX] = "*"; 
    }
  }
  
  Board.prototype.render = function () {
    var output = '';
    this.spaces.forEach( function (row) {
      for (var i = 0; i < row.length; i++){
        if (row[i] === undefined) {
          output += ".";
        } else {
          output += row[i];
        }
      }
      output += '\n';
    })
    return output;
  };
  
  Board.prototype.setApple = function () {
    while (true) {
      var i = Math.floor(Math.random() * 10);
      var j = Math.floor(Math.random() * 10);
      if (this.spaces[i][j] === undefined) {
        this.spaces[i][j] = "$";
        return false;
      }
    };
  };
  
})();