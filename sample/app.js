(function() {
  'use strict';

  angular.module('app', ['botfac.simpleChat']);
  angular.module('app').controller('Shell', Shell);

  function Shell() {

    var vm = this;

    vm.messages = [
      {
        'username': 'Bot',
        'content': 'Hi! I am here to help you'
      }
    ];

    vm.username = 'You';

    vm.syncPost = function(message){
      var JSONObj = {};
      JSONObj.question = message;
      var url = "http://localhost:5000/answer";
      var method = "POST";
      var postData  = JSON.stringify(JSONObj);
      var reply = "Error";
      var async = false;
      var request = new XMLHttpRequest();

      console.log(JSONObj);
      request.onload = function () {
        var status = request.status;
        var data = request.responseText;
        console.log(status);
        reply = JSON.parse(data).reply;
      };
      request.open(method, url, async);
      request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      request.send(postData);
      return reply;
    };

    vm.echoReversed = function (message) {
      return message.split('').reverse().join('');
    };

    vm.sendMessage = function(message, username) {
      if(message && message !== '' && username) {
        vm.messages.push({
          'username': username,
          'content': message
        });
         vm.messages.push({
           'username': "Bot",
           'content': vm.echoReversed(message)
        });

      }
    };

  }

})();
