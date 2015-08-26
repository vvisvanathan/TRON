(function () {
  if (typeof SNAKE === "undefined") {
    window.SNAKE = {};
  }

  SNAKE.DIM_X = 100;
  SNAKE.DIM_Y = 60;

  var Snake = SNAKE.Snake = function () {
    this.dir = "39";
    this.seg = [];
    this.alive = true;
    this.seg.push(new Coord([30,10]));
  };

  var Player2 = SNAKE.Snake = function () {
    this.dir = "37";
    this.seg = [];
    this.alive = true;
    this.seg.push(new Coord([70,10]));
  };

  Snake.prototype.move = function () {

    var next = this.seg[this.seg.length - 1].plus(SNAKE.DIRS[this.dir]);
    if (checkCollision(next)) {
      alert('you fucking lost');
    }
    this.seg.push(next);
  };

  var checkCollision = function (coord) {
    if (coord.pos[1] > SNAKE.DIM_X) { return true; }
    if (coord.pos[0] > SNAKE.DIM_Y) { return true; }
    if (coord.pos[1] < 0) { return true; }
    if (coord.pos[0] < 0) { return true; }

    // check collisions with itself or other snakes

    return false;
  };

  Snake.prototype.turn = function (direction) {
    if (!SNAKE.DIRS[this.dir].isOpposite(SNAKE.DIRS[direction])) {
      this.dir = direction;
    }
  };

  var Coord = SNAKE.Coord = function (position) {
    this.pos = position;
  };

  Coord.prototype.plus = function (other_coord) {
    return new Coord([this.pos[0] + other_coord.pos[0], this.pos[1] + other_coord.pos[1]]);
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
  };

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

    return rows;
  };

  SNAKE.checkCoords = function (pos, coord_arr) {
    var coord = new Coord(pos);
    for (var i = 0; i < coord_arr.length; i++) {
      if (coord.equals(coord_arr[i])) { return true; }
    }
    return false;
  };

  SNAKE.DIRS = {
    37 : new Coord([0,-1]),
    40 : new Coord([1,0]),
    38 : new Coord([-1,0]),
    39 : new Coord([0,1]),
  };

})();
