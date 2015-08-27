(function () {
  if (typeof SNAKE === "undefined") {
    window.SNAKE = {};
  }

  SNAKE.DIM_X = 100;
  SNAKE.DIM_Y = 60;

  var Snake = SNAKE.Snake = function (name, board, coord, dir, keybinds) {
    this.dir = dir;
    this.name = name;
    this.alive = true;
    this.seg = [];
    this.seg.push(new Coord(coord));
    this.keybinds = keybinds;
    this.board = board;
    this.enemy = null;
  };

  Snake.prototype.move = function () {
    if (!(this.alive && this.enemy.alive)) { return; }

    if (this.checkCollision(this.pickDir())) {
      this.alive = false;
    } else {
      this.seg.push(next);
    }
  };

  Snake.prototype.pickDir = function () {
    // if player is human:
    var next = this.seg[this.seg.length - 1].plus(this.keybinds[this.dir]);

    // if player is computer


    return next;
  };

  Snake.prototype.checkCollision = function (coord) {
    if ( coord.pos[1] > SNAKE.DIM_X ||
         coord.pos[0] > SNAKE.DIM_Y ||
         coord.pos[1] < 0 ||
         coord.pos[0] < 0
       ) { return true; }

     var enemyHead = this.enemy.seg[this.enemy.seg.length -1];
     if (coord.equals(enemyHead)) {
       this.enemy.alive = false;
       return true;
     } else if (this.enemy.segContains(coord)) {
       return true;
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

  Snake.prototype.segContains = function (other) {
    var flag = false;
    this.seg.forEach(function (coord) {
      if (coord.equals(other)) { flag = true; }
    });
    return flag;
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
    this.assignPlayers();
  };

  Board.prototype.reset = function () {
    this.player1.seg = [];
    this.player2.seg = [];
    this.assignPlayers();
  };

  Board.prototype.assignPlayers = function () {
    this.player1 = new Snake("Player 1", this, [30, 70], "37", SNAKE.DIRS1);
    this.player2 = new Snake("Player 2", this, [30, 30], "68", SNAKE.DIRS2);
    this.player1.enemy = this.player2;
    this.player2.enemy = this.player1;
  };

  Board.prototype.render = function () {
    var rows = [];
    for (var i = 0; i < SNAKE.DIM_X; i++) {
      var row = "";
      for (var j = 0; j < SNAKE.DIM_Y; j++) {
        if (checkCoords([i,j], this.player1.seg)) {
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
