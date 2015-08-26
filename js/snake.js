(function () {
  if (typeof SNAKE === "undefined") {
    window.SNAKE = {};
  }

  SNAKE.DIM_X = 100;
  SNAKE.DIM_Y = 60;

  var Snake = SNAKE.Snake = function () {
    this.dir = "X";
    this.seg = [];

    for (var i = 5; i < 25; i++) {
      this.seg.push(new Coord([5,i]))
    }
  };

  Snake.prototype.move = function () {
    if (this.dir !== "X") {
      var next = this.seg[this.seg.length - 1].plus(SNAKE.DIRS[this.dir]);
      next = wrap(next);
      this.seg.push(next);
      this.seg.splice(0, 1);
    }
  };

  var wrap = function (coord) {
    if (coord.pos[1] > SNAKE.DIM_X) { coord.pos[1] = 0 }
    if (coord.pos[0] > SNAKE.DIM_Y) { coord.pos[0] = 0 }
    if (coord.pos[1] < 0) { coord.pos[1] = SNAKE.DIM_X }
    if (coord.pos[0] < 0) { coord.pos[0] = SNAKE.DIM_Y }

    return coord;
  }

  Snake.prototype.turn = function (direction) {
    if (this.seg.length > 1) {
      if (SNAKE.DIRS[this.dir].isOpposite(SNAKE.DIRS[direction])) {
        throw Error("You can't go backwards")
      }
    }

    this.dir = direction;
  };

  var Coord = SNAKE.Coord = function (position) {
    this.pos = position;
  };

  Coord.prototype.plus = function (other_coord) {
    return new Coord([this.pos[0] + other_coord.pos[0], this.pos[1] + other_coord.pos[1]])
  };

  Coord.prototype.equals = function (other) {
    return this.pos[0] === other.pos[0] && this.pos[1] === other.pos[1];
  };

  Coord.prototype.isOpposite = function (other) {
    var negative = new Coord([-this.pos[0], -this.pos[1]]);
    return negative.equals(other);
  };

  var Board = SNAKE.Board = function () {
    this.snake = new Snake();
    this.apples = [];
  }

  Board.prototype.render = function () {
    var rows = [];
    for (var i = 0; i < SNAKE.DIM_X; i++) {
      var row = "";
      for (var j = 0; j < SNAKE.DIM_Y; j++) {
        if (checkCoords([i,j], this.snake.seg)) {
          row += "$";
        } else if (checkCoords([i,j], this.apples)) {
          row += "@";
        } else {
          row += ".";
        }
      }
    }

    return rows
  };

  SNAKE.checkCoords = function (pos, coord_arr) {
    var coord = new Coord(pos);
    for (var i = 0; i < coord_arr.length; i++) {
      if (coord.equals(coord_arr[i])) { return true; }
    }
    return false
  }

  SNAKE.DIRS = {
    37 : new Coord([0,-1]),
    40 : new Coord([1,0]),
    38 : new Coord([-1,0]),
    39 : new Coord([0,1]),
    X : new Coord([0,0])
  }

})();
