(function($){
    'use strict';

        // The JSON list url
    //  var capitals = "./country-capitals.json&jsonp=?";
    var capitals = "https://vivo.colorado.edu/es/fis/person/_search?callback=?&source=";
    var data = {
      "size": 0,
      "aggs" : {
	    "researchAreas" : {
            "terms" : {"field" : "researchArea.name.exact", "size": 0}
	     }
     }
  }

    var datareq = "source=" + JSON.stringify(data);

        /**
     * Create the options from the capitals array
          * @param {Array} capitals
       */
           function createList(capitals) {
           // get the datalist element
           var datalist = $("#capitallist");

           // Fill it with the capitals array
           for(var i=0; i < capitals.length; i++){
               $('<option>'+capitals[i]+'</option>').appendTo(datalist);
               }
           }


       /**
            * Load data and call callback function
         * @param {Function} callback
      */
          function loadDatas( callback ){

          // Make the ajax call
          $.getJSON(capitals, datareq, function(list){
              // create the Capitals array
                  var capitals =[];
		  var rbuckets=list.aggregations.researchAreas.buckets;
              for(var i=0; i < rbuckets.length; i++){
                      capitals.push(rbuckets[i].key);
                  }
              // Call the function that will create the options
                  // But sort the array first (for better user experience)
              callback(capitals.sort());
              });
          }

      // jQuery OnLoad ...
          $(function(){
          loadDatas( createList );
      });

      })(jQuery);
