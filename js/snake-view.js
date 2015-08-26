(function () {
  if (typeof SNAKE === "undefined") {
    window.SNAKE = {};
  }

  var SnakeView = SNAKE.SnakeView = function (board, $el) {
    this.board = board;
    this.$el = $el;
    this.setupBoard();
    this.bindEvents();

    window.setInterval ((function () {
      this.render();
      this.board.snake.move();
      this.board.snake2.move();
    }).bind(this),
    100);
  };

  SnakeView.prototype.bindEvents = function () {
    var snake = this.board.snake;
    var snake2 = this.board.snake2;
    $(document).on("keydown", function (key) {
      snake.turn(key.keyCode);
      snake2.turn(key.keyCode);
    });
  };

  SnakeView.prototype.checkIfOver = function (board, winner) {

  };

  SnakeView.prototype.setupBoard = function () {
    for (var i = 0; i < SNAKE.DIM_Y; i++) {
      var $row = $("<div>").addClass("row");
      for (var j = 0; j < SNAKE.DIM_X; j++) {
        var $tile = $("<div>").addClass("tile").addClass("empty");
        $row.append($tile);
      }
      this.$el.append($row);
    }
  };

  SnakeView.prototype.render = function () {
    var $rows = $(".row");
    $(".snake").removeClass("snake").addClass("empty");
    this.board.snake.seg.forEach(function (coord) {
      var x = coord.pos[0];
      var y = coord.pos[1];

      var $tile = $rows.eq(x).children().eq(y);
      $tile.removeClass("empty").addClass("bike1");
    });
    this.board.snake2.seg.forEach(function (coord) {
      var x = coord.pos[0];
      var y = coord.pos[1];

      var $tile = $rows.eq(x).children().eq(y);
      $tile.removeClass("empty").addClass("bike2");
    });
  };

})();
