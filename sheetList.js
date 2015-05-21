define( ["jquery", "text!./style.css","js/qlik", "./jqueryui/jquery-ui"], function ( $, cssContent,qlik) {
	'use strict';
	$( "<style>" ).html( cssContent ).appendTo( "head" );
	return {
		initialProperties: {
			version: 1.0,
			qListObjectDef: {
				qShowAlternatives: true,
				qFrequencyMode: "V",
				qInitialDataFetch: [{
					qWidth: 2,
					qHeight: 50
				}]
			}
		},
		definition: {
			type: "items",
			component: "accordion",
			items: {
				settings: {
					uses: "settings"
				}
			}
		},
		snapshot: {
			canTakeSnapshot: true
		},
		paint: function ( $element ) {
          	
          	var html = "";
          	var cnt = 0;
          	var app=qlik.currApp(this);
          	var currUrl = window.location.href;
          	var appName = encodeURIComponent(app.id);
          	var http = location.protocol;
          	var slashes = http.concat("//");
          	var hostname = window.location.hostname; //$element[0].ownerDocument.URL;
          	var urlPath = "";
          	if(hostname==="localhost")
            {
              urlPath = slashes + hostname + ":4848/sense/app/" + appName + "/sheet/";
            }
          	else
            {
              urlPath = slashes + hostname + "/sense/app/" + appName + "/sheet/";
            }
        	
          	html += '<div class="dropdown">';
          	html += '<form action="#">';
          	html += '<fieldset>';
          	html += '<select name="sheetList" id="sheetList">';
          	html += '<option>Navigate to Sheet</option>';
          
          	app.getAppObjectList("sheet",function(reply) 
            {
            	console.log(reply);
                var str = "";
                $.each(reply.qAppObjectList.qItems, function(key, value)
                {
                	str += value.qData.title + ' ';
                	if(currUrl.search("analysis") >-1)
                	{
                	   	html += '<option value="' + urlPath + value.qInfo.qId + '/state/analysis">' + value.qData.title + '</option>';
                	}
                	else
                	{
                	  	html += '<option>' + value.qData.title + '</option>';
                	}
            		cnt+=1;
             	});
            	html+= "</select></fieldset></form></div>";
              	$element.html( html );
              
              $(function(){
                $('.dropdown').click(function(){
                  $('#sheetList').change(function(){
                    var value = $(this).val();
                    window.location.href = value;                  
                  })
                })
              })

              	
          	});
        }
	};
} );
