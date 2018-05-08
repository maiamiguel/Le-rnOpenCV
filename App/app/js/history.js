//history.js



$(document).ready(function(){
	$.get("/info", function(data, status){
        $(".name_identifier").html(' ' + data.firstname + ' ' + data.lastname + ' ');
    });

	$.getJSON("/getHistory", function(data, status){
		
		for (var i=0;i<data.length; i++){
			var effects_applied = '<h4><br>';
			for(var j = 1; j<data[i].script['effect'].length;j++){
				console.log("image"+i+" name: "+data[i].script['effect'][j]['name']);
				console.log(isNaN(parseInt(data[i].script['effect'][j]['arg1'])));
				console.log(isNaN(parseInt(data[i].script['effect'][j]['arg2'])));
				effects_applied += data[i].script['effect'][j]['name'];
				if(!(isNaN(parseInt(data[i].script['effect'][j]['arg1'])))){
					effects_applied += ' '+parseInt(data[i].script['effect'][j]['arg1'])+' ,';
				}
				if(!(isNaN(parseInt(data[i].script['effect'][j]['arg2'])))){
					effects_applied += ' '+parseInt(data[i].script['effect'][j]['arg2']);
				}
				effects_applied +='<br>'
			}
			effects_applied += '</h4>';
			$("#table_body").append(
				'<tr class="row">'+
				'<td class="col-xs-4"><a href="'+data[i].filelocation+'" download><img id="image'+i+'" src="'+data[i].filelocation+'" class="img-thumbnail rounded float-left" style="max-width: 80%"></a></td>'+
				'<td class="col-xs-2" id="changes'+i+'"><h4>'+effects_applied+'</h4></td>'+
				'<td class="col-xs-3" id="timestamp'+i+'"><br><h4>'+data[i].timestamp+'</h4></td>'+
				'<td class="col-xs-3" id="script_location'+i+'"><br><h4><a href="'+data[i].script_location+'" download>Download Script</a></h4></td>'+
				'</tr>'
		);	
		}
    });
});

function goBack() {
	window.history.back();
}