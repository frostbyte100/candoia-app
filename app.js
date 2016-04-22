'use strict';
$(window).load(function() {

    var countRev = 0;


    window.getData = function(){
      api.store.put("mySecretKey", 6000);
      console.log("Getting Boa");
      let json = api.boa.run("right.boa");
      console.log("Done fetching Boa");
      return json;
    }
    window.timeConverter = function(UNIX_timestamp){
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
    window.showAnimation = function()
    {

    }
    window.convertToUnix = function(x)
    {
      var m = parseInt(x.substring(0,2));
      var y = parseInt(x.substring(3,x.length));]
      var k = new Date(y, m);
      return k.getTime()/1000;
    }

    window.showResults = function()
    {
      console.log("This is starting!");
      var star = parseInt(convertToUnix( document.getElementById("start").value ))*10000;
      var end = parseInt(convertToUnix(document.getElementById("end").value))*10000;

      console.log("Start: " +  star);
      console.log("End: " + end);
      if(star >= end){
        $("#display").html("<div>"+"ERROR: RANGE DOES NOT EXIST"+"</div>");
      }
      // if(star == end){
      //   end = timeConverter(star);
      // }
      var json = getData();

      var s = "";
      console.log("Starting appending");
      for(let time in json['names'])
      {

          countRev++;
          console.log("This is the time: " + parseInt(time));
          console.log("This is the start: " + star);
          if( star <= parseInt(time) && parseInt(time) <=end)
          {
            s += "<h2>" + timeConverter( parseInt(time) ) +"</h2>"
            for(let name in json['names'][time])
            {
              s+="<p>"+json['names'][time][name]+"</p>";
              console.log(json['names'][time][name]);
            }
            s+="<br>";

          }

          console.log(s);

      }
      console.log("Attempting to use jquery");
      $("#display").html("<div>"+s+"</div>");
    }
});