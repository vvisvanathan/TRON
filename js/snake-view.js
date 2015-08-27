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
<<<<<<< HEAD
      this.board.player1.move();
      this.board.player2.move();
      if (this.checkWinner() === "No one") {
        $('#tie').show();
        $('#replay').show();
      } else if (this.checkWinner() === "Player 2") {
        $('#player2wins').show();
        $('#replay').show();
      } else if (this.checkWinner() === "Player 1") {
        $('#player1wins').show();
        $('#replay').show();
=======
      if (this.board.player1.alive && this.board.player2.alive) {
        this.board.player1.move();
        this.board.player2.move();
>>>>>>> master
      }
    }).bind(this),
    50);
  };

  SnakeView.prototype.bindEvents = function () {
    var player1 = this.board.player1;
    var player2 = this.board.player2;
    $(document).on("keydown", function (key) {
      player1.turn(key.keyCode);
      player2.turn(key.keyCode);
    });
  };

  SnakeView.prototype.checkWinner = function () {
    if (!this.board.player1.alive && !this.board.player2.alive) {
      return "No one";
    } else if (!this.board.player1.alive) {
      return "Player 2";
    } else if (!this.board.player2.alive) {
      return "Player 1";
    } else {
      return false;
    }
  };

  SnakeView.prototype.resetBoard = function () {
    
  }

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
    this.board.player1.seg.forEach(function (coord) {
      var x = coord.pos[0];
      var y = coord.pos[1];

      var $tile = $rows.eq(x).children().eq(y);
      $tile.removeClass("empty").addClass("bike1");
    });
    this.board.player2.seg.forEach(function (coord) {
      var x = coord.pos[0];
      var y = coord.pos[1];

      var $tile = $rows.eq(x).children().eq(y);
      $tile.removeClass("empty").addClass("bike2");
    });
  };

})();
