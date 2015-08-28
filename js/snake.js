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
    this.seg = [new Coord(coord)];
    this.keybinds = keybinds;
    this.board = board;
    this.enemy = null;
  };

  Snake.prototype.move = function () {
    if (!(this.alive && this.enemy.alive)) { return; }

    this.dir = this.pickDir();

    var next = this.seg[this.seg.length - 1].plus(this.keybinds[this.dir]);
    if (this.checkCollision(next)) {
      this.alive = false;
    } else {
      this.seg.push(next);
    }
  };

  Snake.prototype.pickDir = function () {
    if (this.name === "Computer") {
      return this.computerPickMove();
    } else {
      return this.dir;
    }
  };

  Snake.prototype.computerPickMove = function () {
    var randMoveDie = Math.floor((Math.random() * 20) + 1);

    var currentDir = this.seg[this.seg.length - 1].plus(this.keybinds[this.dir]);
    if (!this.checkCollision(currentDir) && randMoveDie !== 5) {
      return this.dir;
    }

    var newDir = this.makeToughChoices();
    
    var output = "83";
    [65, 68, 83, 87].forEach(function (key) {
      if (this.keybinds[key].equals(newDir)) { output = key.toString(); }
    }.bind(this));

    this.dir = newDir;
    return output;
  };

  Snake.prototype.makeToughChoices = function () {
    var dir = this.keybinds[this.dir];
    var left = new Coord([dir.pos[1], dir.pos[0]]);
    var right = new Coord([-dir.pos[1], -dir.pos[0]]);
    var leftCount = 0;
    var rightCount = 0;

    var leftCoord = this.seg[this.seg.length - 1].plus(left);
    while (!this.checkCollision(leftCoord)) {
      leftCount += 1;
      leftCoord = leftCoord.plus(left);
    }

    var rightCoord = this.seg[this.seg.length - 1].plus(right);
    while (!this.checkCollision(rightCoord)) {
      rightCount += 1;
      rightCoord = rightCoord.plus(right);
    }

    if (leftCount > rightCount) { return left; } else { return right; }
  };

  Snake.prototype.checkCollision = function (coord) {
    if ( coord.pos[1] > SNAKE.DIM_X - 1 ||
         coord.pos[0] > SNAKE.DIM_Y - 1 ||
         coord.pos[1] < 0 ||
         coord.pos[0] < 0
       ) { return true; }

     var enemyHead = this.enemy.seg[this.enemy.seg.length -1];
     if (coord.equals(enemyHead)) {
       this.enemy.alive = false;
       return true;
     } else if (this.segContains(coord)) {
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

  var Board = SNAKE.Board = function (players) {
    this.player1 = new Snake("Player 1", this, [30, 70], "37", SNAKE.DIRS1);
    if (players === 2) {
      this.player2 = new Snake("Player 2", this, [30, 30], "68", SNAKE.DIRS2);
    } else {
      this.player2 = new Snake("Computer", this, [30, 30], "68", SNAKE.DIRS2);
    }
    this.player1.enemy = this.player2;
    this.player2.enemy = this.player1;
  };

  Board.prototype.reset = function () {
    this.player1.dir = "37";
    this.player1.alive = true;
    this.player1.seg = [new Coord([30, 70])];

    this.player2.dir = "68";
    this.player2.alive = true;
    this.player2.seg = [new Coord([30, 30])];
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
