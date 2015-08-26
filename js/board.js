(function () {
  if (typeof SNAKE === "undefined") {
    window.SNAKE = {};
  }

  var Board = SNAKE.Board = function () {
    this.snake = new Snake([30, 70], "37", SNAKE.DIRS1);
    this.player2 = new Snake([30, 10], "68", SNAKE.DIRS2);
  };

  Board.prototype.render = function () {
    var rows = [];
    for (var i = 0; i < SNAKE.DIM_X; i++) {
      var row = "";
      for (var j = 0; j < SNAKE.DIM_Y; j++) {
        if (checkCoords([i,j], this.snake.seg)) {
          row += "$";
        } else if (checkCoords([i,j], this.player2.seg)) {
          row += "$";
        } else {
          row += ".";
        }
      }
    }

    return rows;
  };


})();
