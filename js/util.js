(function () {
  if (typeof SNAKE === "undefined") {
    window.SNAKE = {};
  }

  SNAKE.DIM_X = 100;
  SNAKE.DIM_Y = 60;

  SNAKE.DIRS1 = {
    37 : new Coord([0,-1]),
    40 : new Coord([1,0]),
    38 : new Coord([-1,0]),
    39 : new Coord([0,1]),
  };

  SNAKE.DIRS2 = {
    65 : new Coord([0,-1]),
    83 : new Coord([1,0]),
    87 : new Coord([-1,0]),
    68 : new Coord([0,1]),
  };

  var checkCollision = SNAKE.checkCollision =  function (coord, seg, board) {
    if (coord.pos[1] > SNAKE.DIM_X) { return true; }
    if (coord.pos[0] > SNAKE.DIM_Y) { return true; }
    if (coord.pos[1] < 0) { return true; }
    if (coord.pos[0] < 0) { return true; }

    // check collisions with itself or other snakes
    for (var i = 0; i < seg.length; i++) {
      if (board[coord.pos[0]][coord.pos]) { return true; }
    }

    return false;
  };

  var checkCoords = SNAKE.checkCoords = function (pos, coord_arr) {
    var coord = new Coord(pos);
    for (var i = 0; i < coord_arr.length; i++) {
      if (coord.equals(coord_arr[i])) { return true; }
    }
    return false;
  };

})();
