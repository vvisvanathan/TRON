(function () {
  if (typeof SNAKE === "undefined") {
    window.SNAKE = {};
  }

  SNAKE.DIM_X = 100;
  SNAKE.DIM_Y = 60;

  var Snake = SNAKE.Snake = function (board, coord, dir, keybinds) {
    this.dir = dir;
    this.seg = [];
    this.alive = true;
    this.seg.push(new Coord(coord));
    this.keybinds = keybinds;
    this.board = board;
  };

  Snake.prototype.move = function () {
    var next = this.seg[this.seg.length - 1].plus(this.keybinds[this.dir]);
    if (checkCollision(next, this.seg, this.board)) {
      alert('you fucking lost');
      return;
    } else {
      this.seg.push(next);
    }
  };

  var checkCollision = function (coord, seg, board) {
    if (coord.pos[1] > SNAKE.DIM_X) { return true; }
    if (coord.pos[0] > SNAKE.DIM_Y) { return true; }
    if (coord.pos[1] < 0) { return true; }
    if (coord.pos[0] < 0) { return true; }

    // check collisions with itself or other snakes
    for (var i = 0; i < seg.length; i++) {
      if (board.checkCollisions()) { return true; }
    }

    return false;
  };

  Snake.prototype.turn = function (direction) {
    if (this.keybinds[direction] !== undefined && !this.keybinds[this.dir].isOpposite(this.keybinds[direction])) {
      this.dir = direction;
    }
  };

  var Coord = SNAKE.Coord = function (position) {
    this.pos = position;
  };

  Snake.prototype.inSeg = function (other) {
    this.seg.forEach(function (coord) {
      if (coord.equals(other)) { return true; }
    }.bind(this));
    return false;
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
    this.snake = new Snake(this, [30, 70], "37", SNAKE.DIRS1);
    this.snake2 = new Snake(this, [30, 10], "68", SNAKE.DIRS2);
  };

  Board.prototype.render = function () {
    var rows = [];
    for (var i = 0; i < SNAKE.DIM_X; i++) {
      var row = "";
      for (var j = 0; j < SNAKE.DIM_Y; j++) {
        if (checkCoords([i,j], this.snake.seg)) {
          row += "$";
        } else if (checkCoords([i,j], this.snake2.seg)) {
          row += "$";
        } else {
          row += ".";
        }
      }
    }

    return rows;
  };

  Board.prototype.checkCollisions = function () {
    var seg1Last = this.snake.seg[this.snake.seg.length - 1];
    var seg2Last = this.snake2.seg[this.snake2.seg.length -1];

    if (seg1Last.equals(seg2Last)) {
      // head-on collision, tie
      return true;
    } else if (this.snake.inSeg(seg2Last)) {
      // player 2 loses
      return true;
    } else if (this.snake2.inSeg(seg1Last)) {
      // player 1 loses
      return true;
    } else {
      return false;
    }
  };

  SNAKE.checkCoords = function (pos, coord_arr) {
    var coord = new Coord(pos);
    for (var i = 0; i < coord_arr.length; i++) {
      if (coord.equals(coord_arr[i])) { return true; }
    }
    return false;
  };

  SNAKE.DIRS1 = {
    37 : new Coord([0,-1]),
    40 : new Coord([1,0]),
    38 : new Coord([-1,0]),
    39 : new Coord([0,1])
  };

  SNAKE.DIRS2 = {
    65 : new Coord([0,-1]),
    83 : new Coord([1,0]),
    87 : new Coord([-1,0]),
    68 : new Coord([0,1])
  };

})();
