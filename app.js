'use strict';
$(window).load(function() {
    console.log("True start!");

    api.store.put("mySecretKey", 6000);

    let json = api.boa.run("right.boa");


    console.log(json);

    var countRev = 0;
    var s = "";
    for(let time in json['names'])
    {
      countRev++;
      console.log(countRev);
      var d = new Date(time);
      var q = d.getTime()*1000;
      s += "<h2>" + time +"</h2>"
      for(let name in json['names'][time])
      {
        s+="<p>"+json['names'][time][name]+"</p>";
      }
      s+="<br>"
      console.log(s);
    }


    $("#display").html("<div>"+s+"</div>");

    console.log("End of everything!");
});