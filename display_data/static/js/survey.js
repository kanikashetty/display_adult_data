function showDialog(cmpId, section_id, section_type) {
	//alert("selected_section_type " + selected_section_type);

	$.Dialog({
		shadow : true,
		overlay : false,
		icon : '<span class="icon-pie"></span>',
		title : 'Add/Edit Section',
		padding : 10,
		width : 800,
		height : 600,
		draggable : true,
		content : 'Loading...',
		onShow : function(_dialog) {

			$.ajax({
				url : "/txdialer/section/load/?section_type=" + section_type + '&cmpId='+ cmpId + '&section_id='+ section_id,
				dataType : "html",
				success : function(result) {
					var html = result;
					$.Dialog.content(html);					
					$.Metro.initInputs();
					
					load_question_div('');
					set_header("Add " + section_type + " section");
				}
			});
		}
	});

}

function load_question_div(selected_section_type) {
	if (selected_section_type == '') {
		selected_section_type = $("#section_type").val();
	} 
	
	console.log('load_question_div ' + selected_section_type);
	if (selected_section_type == "play") {
		document.getElementById("rating").style.display = "none";
		document.getElementById("play").style.display = "block";
		document.getElementById("record").style.display = "none";
		document.getElementById("choice").style.display = "none";
		document.getElementById("prompt").style.display = "none";
	} else if (selected_section_type == "record") {
		document.getElementById("play").style.display = 'none';
		document.getElementById("rating").style.display = "none";
		document.getElementById("record").style.display = "block";
		document.getElementById("choice").style.display = "none";
		document.getElementById("prompt").style.display = "none";
	} else if (selected_section_type == "choice") {
		document.getElementById("play").style.display = 'none';
		document.getElementById("choice").style.display = "block";
		document.getElementById("rating").style.display = "none";
		document.getElementById("record").style.display = "none";
		document.getElementById("prompt").style.display = "none";
	} else if (selected_section_type == "rating") {
		document.getElementById("rating").style.display = "block";
		document.getElementById("play").style.display = "none";
		document.getElementById("record").style.display = "none";
		document.getElementById("prompt").style.display = "none";
		document.getElementById("choice").style.display = "none";
	} else if (selected_section_type == "prompt") {
		document.getElementById("play").style.display = "none";
		document.getElementById("record").style.display = "none";
		document.getElementById("rating").style.display = "none";
		document.getElementById("prompt").style.display = "block";
		document.getElementById("choice").style.display = "none";
	}
}

function edit_section(cmpId, section_id, section_type) {
	console.log('cmpId section_id section_type :' + cmpId + ' ' + section_id + ' ' + section_type);
	
	showDialog(cmpId, section_id, section_type);
	
	$.getJSON('/txdialer/section/get/?section_id=' + section_id + '&cmpId=' + cmpId, {
	}, function(data) {
		$.each(data, function(section_headers, section_value) {

			if (section_headers == 'section_option_9') {
				document.getElementById("Press 9").value = section_value;
			}
			if (section_headers == 'section_option_8') {
				document.getElementById("Press 8").value = section_value;
			}
			if (section_headers == 'section_option_7') {
				document.getElementById("Press 7").value = section_value;
			}
			if (section_headers == 'section_option_6') {
				document.getElementById("Press 6").value = section_value;
			}
			if (section_headers == 'section_option_5') {
				document.getElementById("Press 5").value = section_value;
			}
			if (section_headers == 'section_option_4') {
				document.getElementById("Press 4").value = section_value;
			}
			if (section_headers == 'section_option_3') {
				document.getElementById("Press 3").value = section_value;
			}
			if (section_headers == 'section_option_2') {
				document.getElementById("Press 2").value = section_value;
			}
			if (section_headers == 'section_option_1') {
				document.getElementById("Press 1").value = section_value;
			}
			if (section_headers == 'section_option_0') {
				document.getElementById("Press 0").value = section_value;
			}
			if (section_headers == "section_message") {
				document.getElementById(section_type + '_s_message').innerHTML = section_value;
			}
			if (section_headers == "section_max" && section_type == "rating") {
				document.getElementById("rating_number").value = section_value;
			}
			if (section_headers == "section_max") {
				document.getElementById("max_value").value = section_value;
			}
			if (section_headers == "section_max") {
				document.getElementById("max_value").value = section_value;
			}
			if (section_headers == "section_min") {
				document.getElementById("min_value").value = section_value;
			}
			if (section_headers == "phrase_final" && section_value != '') {
				document.getElementById(section_type + '_phrase').innerHTML = section_value;
			}
			if (section_headers == "section_id") {
				document.getElementById("section_id").value = section_value;
			}
		});
		
		set_header("Edit " + section_type + " section");
		
	});
}

function add_section(cmpId, section_type) {
	showDialog(cmpId,'',section_type);
}


function phrase_ques(section) {
	selected_section_type = document.getElementById("section_type").value;
	//alert(selected_section_type);
	document.getElementById(selected_section_type + '_phrase').value = section.value;
}

function phrase_fun(section) {

	selected_section_type = document.getElementById("section_type").value;
	console.log(selected_section_type);

	//alert(div.id);
	iidd = selected_section_type + '_s_message';
	q = document.getElementById(iidd);
	console.log(q);
	question = $('#' + iidd).val();
	console.log(iidd + " : " + question);

    var phrase = '';
	if (selected_section_type == 'rating') {
		rating_number = document.getElementById('rating_number').value;
		if (rating_number != '') {
			phrase = question + '' + 'Please rate on a scale of 1 to ' + rating_number + '. Where 1 is the least.';
		} else {
			phrase = question;
		}
	} else if (selected_section_type == 'choice') {
		var options_ele = document.getElementsByClassName('options');
		phrase = '';
		for (var i = 0; i < options_ele.length; ++i) {
			if (options_ele[i].value != '') {
				phrase += options_ele[i].id + ' for ' + options_ele[i].value + '.';
			}
		}
		document.getElementById("option_phrase").value = phrase;
		phrase = question + '' + phrase;
	} else if (selected_section_type == 'prompt') {
		phrase = '';
		min_value = document.getElementById('min_value').value;
		max_value = document.getElementById('max_value').value;
		if (min_value != '') {
			phrase = question + 'Enter a number between ' + min_value + ' and ' + max_value;
		} else {
			phrase = question;
		}
		console.log(phrase);
	} else if (selected_section_type == 'record') {
		phrase = question;
		start_record = document.getElementById('start_record');
		end_record = document.getElementById('end_record');
		if (start_record.checked) {
			phrase = phrase + ' ' + start_record.value;
		} 
		if (end_record.checked) {
			phrase = phrase + ' ' + end_record.value;
		}		
		console.log(phrase);
	}

	document.getElementById(selected_section_type + '_phrase').value = phrase;

}

function save_survey() {

	selected_section_type = document.getElementById("section_type").value;
	console.log('save_survey ' + selected_section_type);
	

	play_phrase = document.getElementById(selected_section_type + '_s_message').value;
	rating_number = document.getElementById('rating_number').value;
	max_value = document.getElementById('max_value').value;
	min_value = document.getElementById('min_value').value;

	
	if (selected_section_type == "choice") {
		if (document.getElementById('choice_s_message').value == "") {
			document.getElementById('error').innerHTML = "Please fill the required fieds";
			return false;
		}

		var options_ele = document.getElementsByClassName('options');

		for (var i = 0; i <= options_ele.length; ) {
			if (options_ele[i].value == '' && i == options_ele.length - 1) {
				alert("Please fill atleast one choice");
				return false;
			} else if (options_ele[i].value == '' && i != options_ele.length - 1) {
				i++;
			} else {
				break;
			}
		}
	}
	else if (selected_section_type == "prompt") 
	{

		if (document.getElementById('prompt_s_message').value == "" || document.getElementById('max_value').value == "" || document.getElementById('min_value').value == "") {
			document.getElementById('error').innerHTML = "Please fill the required fieds";
			return false;
		}

		if ((max_value != -1 || min_value != -1)) {
			if (max_value != parseInt(max_value) || min_value != parseInt(min_value)) {
				alert("Please enter an integer");
				return false;
			}

			if (parseInt(max_value) <= parseInt(min_value)) {
				document.getElementById('error').innerHTML = "";
				alert("Please make sure that the Minimim value is lesser than the Maximum value.");
				return false;
			}

			if (max_value != '') {
				if (max_value > 9) {
					document.getElementById('error').innerHTML = "";
					alert("Maximum value cannot exceed 9");
					return false;
				}
			}

			if (min_value != '') {
				if (min_value < 0) {
					alert("Please make sure that the Minimum value is greater than 1");
					return false;
				}
			}
		}
	}
	else if (selected_section_type == "rating") 
	{
		if (rating_number != parseInt(rating_number)) {
			alert("Please enter an integer");
			return false;
		}

		if (document.getElementById('rating_s_message').value == "") {
			document.getElementById('error').innerHTML = "Please fill the required fieds";
			return false;
		}

		if (rating_number != '')// on edit it takes 0 from db
		{
			if (rating_number < 1 || rating_number > 5) {
				alert("Please enter the value between 1 and 5");
				return false;
			}
		}
	}
	
	
	if ((selected_section_type == "rating" && rating_number == '') || (play_phrase == '') || (selected_section_type == "prompt_s" && min_value == '') || (selected_section_type == "prompt_s" && max_value == '')) {
		document.getElementById("error").innerHTML = "Please fill the required fields";
		return false;
	} else {

		document.getElementById("save_question_form").submit();
		return true;
	}
	

}

function create_survey() {
	survey_name = document.getElementById("survey_name").value;
	if (survey_name == '') {
		document.getElementById("error").innerHTML = "Please enter the Survey Name";
	} else {
		document.getElementById("survey_form").submit();
	}
}

function reset() {
	document.getElementById("play").style.display = "block";
	document.getElementById("rating").style.display = "none";
	document.getElementById("choice").style.display = "none";
	document.getElementById("prompt").style.display = "none";
	document.getElementById("record").style.display = "none";
}

function check_options() {
	selected_option = $("#survey_existing option:selected").val();
	if (selected_option == "") {
		alert("Please select a survey");
		return false;
	} else {
		return true;
	}
}

function test_check() {
	selected_section_type = document.getElementById("section_type").value;
	//alert(selected_section_type);
	console.log(selected_section_type + ' ' + document.getElementById(selected_section_type) );
}

function set_header(header) {	
	document.getElementById("section_header").innerHTML = "<i class='icon-pie fg-darker smaller'></i> " + header ;
}

