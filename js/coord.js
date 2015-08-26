(function () {
  if (typeof SNAKE === "undefined") {
    window.SNAKE = {};
  }

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

})();
