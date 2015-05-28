$(document).ready(function(){

	var $addContactForm = $('#add_contact_form'),
		$contactTbody = $('#contacts-table tbody'),
		deleteBtnClass = 'contact-delete-btn';

	getContactList();

	$('body').on('click', '.'+deleteBtnClass, function(e){
		var $thisButton = $(this),
			contactID = $thisButton.attr('data-id');

		$.ajax({
			url: 'delete_contact.php',
			type: 'post',
			dataType: 'json',
			data: { id:contactID },
			success: function(data) {
				console.log(data);
				loadContactsOnPage(data);
			}
		});

		return false;
	});

	$addContactForm.submit(function(e){
		var formData = $addContactForm.serializeObject(),
			valid = validateInputs(formData);

		if(valid){
			$.ajax({
				url: 'add_new_contact.php',
				type: 'post',
				dataType: 'json',
				data: formData,
				success: function(data) {
					console.log(data);
					loadContactsOnPage(data);
					$addContactForm.trigger('reset');
				}
			});
		}

		return false;
	});

	$addContactForm.on('reset',function(e){
		removeAllErrors();
	});

	function removeAllErrors(){
		$('.input-group').removeClass('has-error').find('.error-msg').remove();
	}

	function validateInputs(formData){
		var valid = true
			errors = [],
			alphanumRegex = /^[a-z0-9 ]+$/i,
			phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/, // assumes US phone number
			$errorMessage = $('<div class="error-msg col-md-12" role="alert"></div>');

		removeAllErrors();

		$.each(formData, function(key, value){
			if(!value || value == ''){
				valid = false;
				errors.push({name:key,error:"can't be blank."});
			} else if(key == 'first_name' || key == 'last_name'){
				if(alphanumRegex.test(value)) {
					if(value.length > 50){
						valid = false;
						errors.push({name:key,error:"can't exceed 50 characters."});
					}
				} else {
					valid = false;
					errors.push({name:key,error:"can't contain special characters."});
				}
			} else if(key == 'phone') {
				if(!phoneRegex.test(value)){
					valid = false;
					errors.push({name:key,error:"must be a valid phone number."});
				}
			}
		});

		$.each(errors, function(key, error){
			var $inputLabel = $('label[for="' + error['name'] + '"]'),
				$inputField = $('input[name="' + error['name'] + '"]'),
				$inputGroup = $inputField.closest('.input-group'),
				$error = $errorMessage.clone().text('Error: ' + $inputLabel.text() + ' ' + error['error']);

			$inputGroup.addClass('has-error').prepend($error);
		});

		return valid;
	}

	function getContactList(){
		$.ajax({
			url: 'get_contact_list.php',
			type: 'post',
			dataType: 'json',
			data: {},
			success: function(data) {
				console.log(data);
				loadContactsOnPage(data);
			}
		});
	}

	function loadContactsOnPage(contactArray) {
		var contactsHTML = '',
			numOfContacts = contactArray.length;
		for(var i=0; i < numOfContacts; i++){
			contactsHTML += getContactTR(
								contactArray[i]['id'],
								contactArray[i]['first_name'],
								contactArray[i]['last_name'],
								contactArray[i]['phone']
							);
		}
		$contactTbody.html(contactsHTML);
	}

	function getContactTR(id,f_name,l_name,phone){
        return '<tr><td>' +
                '<span class="contact-last-name">' + l_name + '</span>, ' +
                '<span class="contact-first-name">' + f_name + '</span>' +
            	'</td>' +
            	'<td class="contact-phone">' + formatPhone(phone) + '</td>' +
            	'<td><a href="javascript:void(0);" class="btn btn-sm ' + deleteBtnClass + '"' +
            	'data-id="' + id + '">Delete</a></td></tr>';
	}

	function formatPhone(p){
		return p.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
	}

	// http://stackoverflow.com/questions/1184624/convert-form-data-to-js-object-with-jquery
	$.fn.serializeObject = function(){
	    var o = {};
	    var a = this.serializeArray();
	    $.each(a, function() {
	        if (o[this.name] !== undefined) {
	            if (!o[this.name].push) {
	                o[this.name] = [o[this.name]];
	            }
	            o[this.name].push(this.value || '');
	        } else {
	            o[this.name] = this.value || '';
	        }
	    });
	    return o;
	};
});