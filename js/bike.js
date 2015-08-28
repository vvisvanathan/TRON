(function () {
  if (typeof TRON === "undefined") {
    window.TRON = {};
  }
  var Coord = TRON.Coord;

  var Bike = TRON.Bike = function (name, board, coord, dir, keybinds) {
    this.dir = dir;
    this.name = name;
    this.alive = true;
    this.seg = [new Coord(coord)];
    this.keybinds = keybinds;
    this.board = board;
    this.enemy = null;
  };

  Bike.prototype.move = function () {
    if (!(this.alive && this.enemy.alive)) { return; }

    this.dir = this.pickDir();

    var next = this.seg[this.seg.length - 1].plus(this.keybinds[this.dir]);
    if (this.checkCollision(next)) {
      this.alive = false;
    } else {
      this.seg.push(next);
    }
  };

  Bike.prototype.pickDir = function () {
    if (this.name === "Computer") {
      return this.computerPickMove();
    } else {
      return this.dir;
    }
  };

  Bike.prototype.computerPickMove = function () {
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

  Bike.prototype.makeToughChoices = function () {
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

  Bike.prototype.checkCollision = function (coord) {
    if ( coord.pos[1] > TRON.DIM_X - 1 ||
         coord.pos[0] > TRON.DIM_Y - 1 ||
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

  Bike.prototype.turn = function (direction) {
    if (this.keybinds[direction] !== undefined && !this.keybinds[this.dir].isOpposite(this.keybinds[direction])) {
      this.dir = direction;
    }
  };

  Bike.prototype.segContains = function (other) {
    var flag = false;
    this.seg.forEach(function (coord) {
      if (coord.equals(other)) { flag = true; }
    });
    return flag;
  };

})();
