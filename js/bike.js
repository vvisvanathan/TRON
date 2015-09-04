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
    var flag = this.checkCollision(next);
    if (flag > 0) {
      this.alive = false;
      if (flag === 2) { this.enemy.alive = false; }
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
    if (this.checkCollision(currentDir) === 0 && randMoveDie !== 10) {
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
    var back = new Coord([-dir.pos[0], -dir.pos[1]]);
    var left = new Coord([-dir.pos[1], -dir.pos[0]]);
    var right = new Coord([dir.pos[1], dir.pos[0]]);
    var leftCount = 0;
    var leftSweep = 0;
    var rightCount = 0;
    var rightSweep = 0;

    var leftCoord = this.seg[this.seg.length - 1].plus(left);
    while (this.checkCollision(leftCoord) === 0) {
      var leftBack = leftCoord.plus(back);
      while (this.checkCollision(leftBack) === 0) {
        leftSweep += 1;
        leftBack = leftBack.plus(back);
      }

      var leftForw = leftCoord.plus(dir);
      while (this.checkCollision(leftForw) === 0) {
        leftSweep += 1;
        leftForw = leftForw.plus(dir);
      }

      leftCoord = leftCoord.plus(left);
    }

    var rightCoord = this.seg[this.seg.length - 1].plus(right);
    while (this.checkCollision(rightCoord) === 0) {
      var rightBack = rightCoord.plus(back);
      while (this.checkCollision(rightBack) === 0) {
        rightSweep += 1;
        rightBack = rightBack.plus(back);
      }

      var rightForw = rightCoord.plus(back);
      while (this.checkCollision(rightForw) === 0) {
        rightSweep += 1;
        rightForw = rightForw.plus(dir);
      }

      rightCoord = rightCoord.plus(right);
    }

    if (leftSweep > rightSweep) { return left; } else { return right; }
  };

  Bike.prototype.checkCollision = function (coord) {
    if ( coord.pos[1] > TRON.DIM_X - 1 ||
         coord.pos[0] > TRON.DIM_Y - 1 ||
         coord.pos[1] < 0 ||
         coord.pos[0] < 0
       ) { return 1; }

     var enemyHead = this.enemy.seg[this.enemy.seg.length -1];
     if (coord.equals(enemyHead)) {
       return 2;
     } else if (this.segContains(coord)) {
       return 1;
     } else if (this.enemy.segContains(coord)) {
       return 1;
     }

    return 0;
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
