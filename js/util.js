(function () {
  if (typeof TRON === "undefined") {
    window.TRON = {};
  }

  var Coord = TRON.Coord = function (position) {
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

  TRON.checkCoords = function (pos, coord_arr) {
    var coord = new Coord(pos);
    for (var i = 0; i < coord_arr.length; i++) {
      if (coord.equals(coord_arr[i])) { return true; }
    }
    return false;
  };

  TRON.DIM_X = 100;
  TRON.DIM_Y = 60;

  TRON.DIRS1 = {
    37 : new Coord([0,-1]),
    40 : new Coord([1,0]),
    38 : new Coord([-1,0]),
    39 : new Coord([0,1])
  };

  TRON.DIRS2 = {
    65 : new Coord([0,-1]),
    83 : new Coord([1,0]),
    87 : new Coord([-1,0]),
    68 : new Coord([0,1])
  };

})();
