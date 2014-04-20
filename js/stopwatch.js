function Stopwatch() {
  var offset, interval;
  count = 1;
  running = false;
  console.log("ready");
  
  this.start = function start() {
    if (!interval) {
      if(!offset) {
        offset   = new Date();
      }
      interval = setInterval(update, 100);
    }
    $("#stopbtn").removeClass("disabled");
    $("#lapbtn").removeClass("disabled");
    $("#startbtn").addClass("disabled");
    running = true;
  }
  
  this.stop = function stop() {
    if (interval) {
      clearInterval(interval);
      interval = null;
    }
    $("#startbtn").html("Contiue");
    $("#startbtn").removeClass("disabled");
    $("#stopbtn").addClass("disabled");
    running = false;
  }

  this.lap = function lap() {
    d = new Date(Date.now() - offset)
    var newLap = $("<tr><td>"+ count +"</td><td>"+to_timestring(d)+"</td></tr>");
    count = count +1;
    newLap.prependTo("#laps");
    var data = $("#timetable").table2CSV({delivery:'value'});
    $("#csv").attr('href','data:text/csv;charset=utf8,'+encodeURIComponent(data));
    $("#csv").removeClass("disabled");
    $("html, body").animate({scrollTop: 0}, 1000);
  }
  
  function update() {
    d = new Date(Date.now() - offset)
    $("#timer").html(to_timestring(d)); 
  }

  function to_timestring(d) {
     return pad(d.getMinutes(),2)+":"+pad(d.getSeconds(),2)+":"+Math.round(d.getMilliseconds()/100)+"0";
  }
  
  function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }

  this.toggle = function toggle() {
   running == true ? this.stop(): this.start();
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

$(document).keypress(function(e){
   switch (e.keyCode) {
    case 32:
      sw.lap();
      break;
    case 13:
      sw.toggle();
      break;
   }      
});
