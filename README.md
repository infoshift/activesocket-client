ActiveSocket
============

A sock.js wrapper

Usage
-----

```
<html>
...
<script type="text/javascript" src="http://cdn.sockjs.org/sockjs-0.3.min.js"></script>
<script type="text/javascript" src="/static/activesocket.js"></script>

<script>
var as = ActiveSocket({endpoint: "http://localhost/<endpoint>"});

as.on('open', function() {
  // Do stuff when the connection is opened
});

as.on('myevent', function(data) {
  // Do stuff when a custom event is triggered.
  console.log(data);
});

as.on('close', function() {
  // Do stuff when the connection is closed.
});

// Notifying the server for some event.
as.emit('someevent', {data1: 'somedata', data2: 3});
</script>
```
