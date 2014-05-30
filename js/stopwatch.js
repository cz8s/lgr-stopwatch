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
      interval = setInterval(update, 1000);
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
    var newLap = $("<tr><td>"+ count +"</td><td>"+to_timestring(d,0)+"</td></tr>");
    count = count +1;
    newLap.prependTo("#laps");
    var data = $("#timetable").table2CSV({delivery:'value'});
    $("#csv").attr('href','data:text/csv;charset=utf8,'+encodeURIComponent(data));
    $("#csv").removeClass("disabled");
    $("html, body").animate({scrollTop: 0}, 1000);
  }
  
  function update() {
    d = new Date(Date.now() - offset)
    $("#timer").html(to_timestring(d,1)); 
  }

  function to_timestring(d,e) {
     h = zeroFill(d.getHours()-1,2);
     m = zeroFill(d.getMinutes(),2);
     s = zeroFill(d.getSeconds(),2);
     ms = zeroFill(d.getMilliseconds(),3);
     ms = ms.substring(0,ms.length-1)
       if ( e == 0) {
         return h + ":" + m + ":" + s + ":" + ms;
       } else {
         return h + ":" + m + ":" + s;
       }

  }
 
  function zeroFill( number, width )
  {
    width -= number.toString().length;
    if ( width > 0 )
    {
      return new Array( width + (/\./.test( number ) ? 2 : 1) ).join( '0' ) + number;
    }
    return number + ""; // always return a string
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
