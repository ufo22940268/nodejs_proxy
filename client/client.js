var http = require('http');
// make a request to a tunneling proxy
var path="www.biubiubiu.me";
var options = {
  port: 1337,
  hostname: '127.0.0.1',
  method: 'CONNECT',
  path: path + ':80'
};

var req = http.request(options);
req.end();

req.on('connect', function(res, socket, head) {
  console.log('client got connected!');

  // make a request over an HTTP tunnel
  socket.write('GET / HTTP/1.1\r\n' +
               'Host: ' + path + ':80\r\n' +
               'Connection: close\r\n' +
               '\r\n');
  socket.on('data', function(chunk) {
    console.log(chunk.toString());
  });
  //socket.on('end', function() {
    ////proxy.close();
  //});
});
