function ChatCtrl ($scope) {
  var socket;

  $scope.entries = [];

  $scope.user = {
    name: '',
    connected: false,
    connect: function () {
      if (!this.name) return;
      socket = io.connect();
      socket.on('message', handle_message);
      socket.emit('setUser', this.name);
      this.connected = true;
    }
  };

  $scope.message = {
    text: '',
    send: function () {
      if (!this.text) return;
      socket.emit('message', this.text);
      addMessage('Me', this.text);
      this.text = '';
    }
  };

  function addMessage(user, text) {
    $scope.entries.push({user: user, message: text});
  }

  function handle_message(message) {
    $scope.$apply(function () {
      addMessage(message['user'], message['text']);
    });
  }
}
