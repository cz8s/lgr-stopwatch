function Stopwatch() {
  var offset, interval;
  console.log("ready");
  
  this.start = function start() {
    if (!interval) {
      if(!offset) {
        offset   = new Date();
      }
      interval = setInterval(update, 10);
    }
  }
  
  this.stop = function stop() {
    if (interval) {
      clearInterval(interval);
      interval = null;
    }
    $("#startbtn").html("Weiter");
  }

  this.lap = function lap() {
    d = new Date(Date.now() - offset)
    console.log(to_timestring(d));
    var newLap = $("<tr><td>new</td><td>"+to_timestring(d)+"</td><td>del</td></tr>");
    newLap.prependTo("#laps");
    var data = $("#timetable").table2CSV({delivery:'value'});
    $("#csv").attr('href','data:text/csv;charset=utf8,'+encodeURIComponent(data));

$('<a></a>')
    .attr('id','downloadFile')
    .attr('href','data:text/csv;charset=utf8,' + encodeURIComponent(data))
    .attr('download','filename.csv')
    .appendTo('body');
  }
  
  function update() {
    d = new Date(Date.now() - offset)
    $("#timer").html(to_timestring(d)); 
  }

  function to_timestring(d) {
     return pad(d.getMinutes(),2)+":"+pad(d.getSeconds(),2)+":"+pad(Math.round(d.getMilliseconds()/10),2);
  }
  
  function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}
 
};

sw = new Stopwatch();

$("#startbtn").on( "click", function() {
  sw.start();
});


$("#stopbtn").on( "click", function() {
  sw.stop();
});
$("#lapbtn").on( "click", function() {
  sw.lap();
});
