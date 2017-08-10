(function() {
	/**
	 * Back key event handler
	 */
	window.addEventListener('tizenhwkey', function(ev) {
		if (ev.keyName === "back") {
			var activePopup = document.querySelector('.ui-popup-active'),
				page = document.getElementsByClassName('ui-page-active')[0],
				pageid = page ? page.id : "";

			if (pageid === "main" && !activePopup) {
				try {
					tizen.application.getCurrentApplication().exit();
				} catch (ignore) {
				}
			} else {
				window.history.back();
			}
		}
	});
	
    
    function init() {
//    	$.getJSON("./js/datas.json", function(json) {
//    		datas=json;
    		var len=datas.length, str_list="";
    		for(var i=0;i<len;++i){
    			str_list+='<li id="'+i+'" data-filtertext="'+datas[i].name+'" class="ui-li-static">'+datas[i].name+'</li>';
    		}
    		
    		$("#searchList").html(str_list);
//    	});

        $('.ui-li-static').on('click', function () {
            var dataid = $(this).attr('id');
            var current_data = datas[dataid];
            // console.log(dataid);
            // console.log(JSON.stringify(current_data))
            var pop_header1 = $("#pop-header1");
            var pop_header2 = $("#pop-header2");
            var pop_body = $("#pop-body");
            
            pop_header1.html(current_data.name);
            pop_header2.html(current_data.web_page);
            pop_body.html("Country: "+current_data.country+", domain: "+current_data.domain);
            
            tau.openPopup("#btn_popup");
        });
        
        $('#btn-close').on('click', function(ev)
        {
            tau.closePopup();
        });
    }

    window.onload = init;
}());