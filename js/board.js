(function () {
  if (typeof TRON === "undefined") {
    window.TRON = {};
  }
  var Bike = TRON.Bike;
  var Coord = TRON.Coord;

  var Board = TRON.Board = function (players) {
    this.player1 = new Bike("Player 1", this, [30, 70], "37", TRON.DIRS1);
    if (players === 2) {
      this.player2 = new Bike("Player 2", this, [30, 30], "68", TRON.DIRS2);
    } else {
      this.player2 = new Bike("Computer", this, [30, 30], "68", TRON.DIRS2);
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
    for (var i = 0; i < TRON.DIM_X; i++) {
      var row = "";
      for (var j = 0; j < TRON.DIM_Y; j++) {
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

})();
