function ChatCtrl($scope) {
  var socket;

  $scope.messages = [];

  $scope.user = {
    name: '',
    connected: false,
    connect: function () {
      if (!this.name) return;
      socket = io.connect();
      socket.on('message', function (message) {
        $scope.$apply(function () { $scope.messages.push(message); });
      });
      socket.emit('sign-in', this.name);
      this.connected = true;
    }
  };

  $scope.message = {
    text: '',
    send: function () {
      if (!this.text) return;
      socket.emit('message', this.text);
      $scope.messages.push({user: 'Me', text: this.text});
      this.text = '';
    }
  };
}
