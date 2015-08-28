(function () {
  if (typeof TRON === "undefined") {
    window.TRON = {};
  }

  var TronView = TRON.TronView = function (board, $el) {
    this.board = board;
    this.$el = $el;
    this.setupBoard();
    this.bindEvents();

    window.setInterval ((function () {
      this.render();
      if (this.board.player1.alive && this.board.player2.alive) {
        this.board.player1.move();
        this.board.player2.move();
      }
      if (this.checkWinner() === "No one") {
        $('#tie').show();
        $('#replay').show();
      } else if (this.checkWinner() === "Player 2") {
        $('#player2wins').show();
        $('#replay').show();
      } else if (this.checkWinner() === "Computer") {
        $('#computerwins').show();
        $('#replay').show();
      } else if (this.checkWinner() === "Player 1") {
        $('#player1wins').show();
        $('#replay').show();
      }
    }).bind(this), 50);
  };

  TronView.prototype.bindEvents = function () {
    var player1 = this.board.player1;
    var player2 = this.board.player2;
    $(document).on("keydown", function (key) {
      player1.turn(key.keyCode);
      player2.turn(key.keyCode);
    });
  };

  TronView.prototype.checkWinner = function () {
    if (!this.board.player1.alive && !this.board.player2.alive) {
      return "No one";
    } else if (!this.board.player1.alive) {
      if (this.board.player2.name === "Player 2") {
        return "Player 2";
      } else {
        return "Computer";
      }
    } else if (!this.board.player2.alive) {
      return "Player 1";
    } else {
      return false;
    }
  };

  TronView.prototype.setupBoard = function () {
    for (var i = 0; i < TRON.DIM_Y; i++) {
      var $row = $("<div>").addClass("row");
      for (var j = 0; j < TRON.DIM_X; j++) {
        var $tile = $("<div>").addClass("tile").addClass("empty");
        $row.append($tile);
      }
      this.$el.append($row);
    }
  };

  TronView.prototype.render = function () {
    var $rows = $(".row");
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
