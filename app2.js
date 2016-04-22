'use strict';
$(window).load(function() {
    var countRev = 0;
    $('#loading').hide();
    $('#pause').hide();
    var tables = [];
    var index = 0;
    var s = "";

    window.getData = function()
    {
      api.store.put("mySecretKey", 6000);
      console.log("Running Boa");
      let json = api.boa.run("right.boa");
      console.log("Done fetching JSON");
      return json;
    }

    window.timeConverter = function(UNIX_timestamp)
    {
      var a = new Date(UNIX_timestamp/1000);
      var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      var year = a.getFullYear();
      var month = months[a.getMonth()];
      var date = a.getDate();
      var hour = a.getHours();
      var min = a.getMinutes();
      var sec = a.getSeconds();
      var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
      return time;
    }
    window.convertToUnix = function(x)
    {
      var k = new Date(x);
      return k.getTime()/1000;
    }

    // window.showResults = function()
    // {
      var start = parseInt(convertToUnix( document.getElementById("start").value )) *1000000;
      var end = parseInt(convertToUnix(document.getElementById("end").value))       *1000000;

      if(start >= end)
      {
        $("#display").html("ERROR: RANGE DOES NOT EXIST");
      }
      if(document.getElementById("all").checked)
      {
        start = 0;
        end = parseInt(convertToUnix(new Date()))*1000000;
      }

      $('#loading').show();
      var json = getData();


      var tab = "";
      for(let time in json['names'])
      {
          var last = "";
          countRev++;
          if( start <= parseInt(time) && parseInt(time) <= end)
          {
            // s += "<h2>" + timeConverter( parseInt(time) ) +"</h2>"
            tab += "<center><table id='" + countRev + "'>";
            tab += "<thead>" +timeConverter( parseInt(time) ) + "</thead>";
            for(let name in json['names'][time])
            {
              // s+="<p>"+json['names'][time][name]+"</p>";
              tab += "<tr><td>"+json['names'][time][name] + "</td></tr>";
            }
            // s+="<br>";
            tab += "</table></center>";
            // sleep(2000);
            // $('#pause').show();
            console.log("Attempting to use jquery");
            console.log(tab);
            last = tab;
            showTable(tab);

            tab = "";
          }


      }

    }
    window.fillTables = function()
    {
      var start = parseInt(convertToUnix( document.getElementById("start").value )) *1000000;
      var end = parseInt(convertToUnix(document.getElementById("end").value))       *1000000;

      if(start >= end)
      {
        $("#display").html("<h2>ERROR: RANGE DOES NOT EXIST</h2>");
      }
      if(document.getElementById("all").checked)
      {
        start = 0;
        end = parseInt(convertToUnix(new Date()))*1000000;
      }
      $('#loading').show();
      var json = getData();
      $('#loading').hide();
      var tab = "";
      for(let time in json['names'])
      {
          countRev++;
          if( start <= parseInt(time) && parseInt(time) <= end)
          {
            tab += "<center><table id='" + countRev + "'>";
            tab += "<thead>" +timeConverter( parseInt(time) ) + "</thead>";
            for(let name in json['names'][time])
            {
              tab += "<tr><td>"+json['names'][time][name] + "</td></tr>";
            }
            tab += "</table></center>";
            tables.push(tab);
            tab = "";
          }
      }
    }
    window.procedd = function()
    {
      for(var x in tables)
      {
        showTable(x);
      }
      $("#display").html(tables[tables.length-1]);
    }

    window.nextOne = function(x)
    {
      if( parseInt(x)==1 && parseInt(x)+index >= tables.length)
      {
        $("#display").html("<h2>OUT OF RANGE!</h2>");
      }
      else if ( parseInt(x)==-1 && index+parseInt(x) < 0)
      {
        $("#display").html("<h2>OUT OF RANGE!</h2>");
      }
      else
      {
        index+=parseInt(x);
        $("#display").html(tables[index]);
      }
    }
    window.showTable = function(x, id)
    {
      // sleep(1000);
      $("#display").toggle(function(){
        $("#display").html(x);
        sleep(4000);
      });
      // sleep(1000);

      // document.getElementById("display").innerHTML = x;
    }
    window.sleep = function(miliseconds)
    {
     var currentTime = new Date().getTime();
     while (currentTime + miliseconds >= new Date().getTime())
     {
     }
    }

    window.pause = function()
    {
      sleep(5000);
    }

});