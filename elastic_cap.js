//@ sourceURL=elastic_cap.js

(function($){
    'use strict';

console.log('ready elastic_cap 1');

        // The JSON list url
    var esurl = "https://vivo.colorado.edu/es/fis/person/_search?callback=?&source=";
    var esdsl = {
      "size": 0,
      "aggs" : {
	    "researchAreas" : {
            "terms" : {"field" : "researchArea.name.exact", "size": 0}
	     }
     }
  }

    var esdslreq = "source=" + JSON.stringify(esdsl);

    function createList(rtopics) {
      // get the datalist element
        var datalist = $("#rtopiclist select");
     //   $('<select>').appendTo(datalist)
        // Fill it with the rtopics array
        for(var i=0; i < rtopics.length; i++){
            $('<option value="'+rtopics[i]+'">' +rtopics[i]+'</option>').appendTo(datalist);
        }
      //  $('</select>').appendTo(datalist)
    }


     function loadDatas( callback ){

          // Make the ajax call
          $.getJSON(esurl, esdslreq, function(list){
              // create the rtopics array
                  var rtopics =[];
		  var rbuckets=list.aggregations.researchAreas.buckets;
              for(var i=0; i < rbuckets.length; i++){
                      rtopics.push(rbuckets[i].key);
                  }
              // Call the function that will create the options
                  // But sort the array first (for better user experience)
              callback(rtopics.sort());
              });
          }

      // jQuery OnLoad ...
          $(function(){

          loadDatas( createList );
              console.log('ready elastic_cap 2');

              /*
              var availableTags = $('#rtopiclist').find('option').map(function () {
                  return this.value;
              }).get();
              $('#query').autocomplete({ source: availableTags });
*/
      });

})(jQuery);
