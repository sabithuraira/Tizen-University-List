(function() {
	var page = document.getElementById("searchInputPage"),
	search =  document.getElementById("demo-page-search-input"),
	list, listItems, listItemsArray,
	searchHandlerBound, searchClearBound;

	/**
	 * Shows items that match the entered value
	 * keyup event handler
	 */
	function searchHandler() {
		list = document.getElementById("searchList");
		listItems = list.querySelectorAll("[data-filtertext]");
		listItemsArray = [].slice.call(listItems);
	
		listItemsArray.forEach(function(item){
			var itemText = item.getAttribute("data-filtertext");
			if ( itemText.toString().toLowerCase().indexOf(search.value.toLowerCase()) === -1 ) {
				item.classList.add("li-search-hidden");
			} else {
				item.classList.remove("li-search-hidden");
			}
		});
	}
	
	/**
	 * Initializes search result
	 */
	function searchClear() {
		if(search.value === "") {
			listItemsArray.forEach(function(item) {
				item.classList.remove("li-search-hidden");
			});
		}
	}

	
	
    function init() {
		window.addEventListener('tizenhwkey', function(ev) {
			if (ev.keyName === "back") {
				try {
                    tizen.application.getCurrentApplication().exit();
                } catch (error) {
                    console.error("getCurrentApplication(): " + error.message);
                }
			}
		});

		search.addEventListener("keyup", searchHandler);
		search.addEventListener("search", searchClear);
		console.log("masuk init");

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