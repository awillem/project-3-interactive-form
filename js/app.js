const $name = $('#name');
const $email = $('#mail');
const $colorSelect = $('#colors-js-puns');
const $otherJobInput = $('#other');
const $totalDisplay = $('<span class="total"></span>')
const $paymentSelect = $('#payment');
const $bitcoin = $('fieldset:last div:last');
const $paypal = $('fieldset:last div:last').prev();
const $jobSelect = $('#title option');
const $submitButton = $('form button');
const $ccNum = $('#cc-num');
const $zip = $('#zip');
const $cvv = $('#cvv');
//console.log($jobSelect);

//initialing setting elements to be hidden/focused
$name.focus();
$colorSelect.hide();
$otherJobInput.hide();
$('.activities').append($totalDisplay);
$totalDisplay.hide();
$paymentSelect.children().eq(0).hide(); // hides Select Payment Method
$paymentSelect.children().eq(1).attr('selected',"");
$bitcoin.hide();
$paypal.hide();
$('form').attr('novalidate',"");  //stops HTML5 validation

//create, attach, and hide error messages
//function creates a span with class error, id and text from parameters
function $errorSpan (id, text) {
  const $errorSpan = $(`<span class="error" id="${id}">${text}</span>`);
  return $errorSpan;
}
$name.prev().after($errorSpan('blankName','Name field required'));
$('#blankName').hide();
$email.prev().after($errorSpan('blankEmail','Email field required'));
$('#blankEmail').hide();
$email.prev().after($errorSpan('invalidEmail','Valid email format required: <em>john@smithcorp.com</em>'));
$('#invalidEmail').hide();
$('.activities legend').after($errorSpan('activityReq','At least 1 activity required'));
$('#activityReq').hide();
$paymentSelect.prev().prev().after($errorSpan('methodReq','Payment method required'));
$('#methodReq').hide();
$paymentSelect.after($errorSpan('blankCC','  All CC fields required'));
$('#blankCC').hide();
$paymentSelect.after($errorSpan('numericCC','  Only numbers allowed'));
$('#numericCC').hide();
$paymentSelect.after($errorSpan('lengthCC','  Length of CC 13-16, Zip 5, and CVV 3'));
$('#lengthCC').hide();


const $blankCC = $('#blankCC');
const $numericCC = $('#numericCC');
const $lengthCC = $('#lengthCC');

//shows or hides the other job input field based on job selection
$('#title').on('change', function () {
  if ($(this).val() === 'other') {
    $otherJobInput.show();
  } else {
    $otherJobInput.hide();
  }
});

//Tshirt seleciton event listener
$('#design').on('change', function () {
  //if design is selected, show colorSelect.
  if($(this).val() === 'js puns' || $(this).val() === 'heart js') {
    $colorSelect.show();
  } else {
    $colorSelect.hide();
  }
  //hides color options based on design selected.
  //adds or removes selected attribute so color shown in dropdown is correct
  if($(this).val() === "js puns") {
    $('#color option').eq(0).show().attr('selected',"");
    $('#color option').eq(1).show();
    $('#color option').eq(2).show();
    $('#color option').eq(3).hide().attr('selected',false);
    $('#color option').eq(4).hide();
    $('#color option').eq(5).hide();

  } else if($(this).val() === "heart js") {
    $('#color option').eq(0).hide().attr('selected',false);
    $('#color option').eq(1).hide();
    $('#color option').eq(2).hide();
    $('#color option').eq(3).show().attr('selected',"");
    $('#color option').eq(4).show();
    $('#color option').eq(5).show();
  }
});

//Activies
$('.activities').on('change', function () {
    let $total = 0;
  //disables other activity held at same time
  //adds cost to $total variable
  //if nothing is checked, sets $total back to 0
  if ($("input:checked").length === 0) {
    $total = 0;
    console.log($total);
  }
  if ($("input[name='all']").is(':checked')) {
    $total += 200;
  }
  if ($("input[name='js-frameworks']").is(':checked')) {
    $("input[name='express']").attr('disabled',"");
    $total += 100;
  } else {
    $("input[name='express']").attr('disabled',false);
  }
  if ($("input[name='express']").is(':checked')) {
    $("input[name='js-frameworks']").attr('disabled',"");
    $total += 100;
  } else {
    $("input[name='js-frameworks']").attr('disabled',false);
  }
  if ($("input[name='js-libs']").is(':checked')) {
    $("input[name='node']").attr('disabled',"");
    $total += 100;
  } else {
    $("input[name='node']").attr('disabled',false);
  }
  if ($("input[name='node']").is(':checked')) {
    $("input[name='js-libs']").attr('disabled',"");
    $total += 100;
  } else {
    $("input[name='js-libs']").attr('disabled',false);
  }
  if ($("input[name='build-tools']").is(':checked')) {
    $total += 100;
  }
    if ($("input[name='npm']").is(':checked')) {
      $total += 100;
    }

//keeps the $totalDisplay span hidden unless $total is above 0.
//then it adds text and shows the span
    if ($total > 0) {
      $totalDisplay.show().html(`<strong>Total: $${$total}</strong>`);
    } else {
      $totalDisplay.hide();
    }
});

//Payments
//checks the value of the selection and shows that div, while hiding the other two
$('#payment').on('change', function () {
  // if ($(this).val() === 'select_method') {
  //   $('#credit-card').hide();
  //   $('#credit-card').next().hide();
  //   $('#credit-card').next().next().hide();
  // }
  if ($(this).val() === 'credit card') {
    $('#credit-card').show();
    $('#credit-card').next().hide();
    $('#credit-card').next().next().hide();
  }
  if ($(this).val() === 'paypal') {
    $('#credit-card').hide();
    $('#credit-card').next().show();
    $('#credit-card').next().next().hide();
  }
  if ($(this).val() === 'bitcoin') {
    $('#credit-card').hide();
    $('#credit-card').next().hide();
    $('#credit-card').next().next().show();
  }
});

//looks for basic email format
//cheks to see that @ is neither first or last
//and that there is a period after the @, which is also  not last
function $validEmail (email) {
  const at = email.indexOf('@');
  const period = email.indexOf('.',at);
  if (at > 2 && at < email.length && period < (email.length -2) && (period - at) > 2) {
    return 'valid';
  }
}

//Validation Functions - used in Submit button listener and change listeners
function  $nameValid () {
  //if name is blank, show error message and add error class, else, remove error class and hide error message
  if ($name.val() === "") {
    $('#blankName').show();
    $name.addClass('error');
    return true; //stops form from submitting when function called in submit event
  } else {
    $('#blankName').hide();
    $name.removeClass('error');
  }
}

function $emailValid  () {
  //adds error class, which is removed only if not blank and email is valid format
  $email.addClass('error');
  // if email is blank, add error class, show blank error message, and hide invalid error message
  if ($email.val() === "") { //checks if email blank
    $('#blankEmail').show();
    $('#invalidEmail').hide();
    return true;//stops form from submitting when function called in submit event
  } else if ($validEmail($email.val()) !== 'valid') { //checks if basic syntax of email is valid
    // if email is not valid, shows invalid email message, and hides blank message
    $('#blankEmail').hide();
    $('#invalidEmail').show();
    return true;//stops form from submitting when function called in submit event
  } else { // email is not blank, removes error class and messages
    $('#invalidEmail').hide();
    $('#blankEmail').hide();
    $email.removeClass('error');
  }
}

function $activitiesValid () {
  //looks to see if any boxes are checked.  if not, addes activity error message & error class
  if ($('input:checked').length === 0) {
    $('#activityReq').show();
    $('fieldset.activities legend').addClass('error');
    return true;//stops form from submitting when function called in submit event
  } else {
    $('#activityReq').hide();
    $('fieldset.activities legend').removeClass('error');
  }
}



function $ccValidation () {
  if ($paymentSelect.val() !== 'credit card') {
    //if payment method is not credit card, removes error class and hides error messages
    $blankCC.hide();
    $numericCC.hide();
    $lengthCC.hide();
    $ccNum.removeClass('error');
    $zip.removeClass('error');
    $cvv.removeClass('error');
  } else if ($paymentSelect.val() === 'credit card') {
    // looks to see if payment method is credit card
    //addes error classes which will be removed if it passes validation.
    $ccNum.addClass('error');
    $zip.addClass('error');
    $cvv.addClass('error');
    if ( $ccNum.val() === '' || $zip.val() === '' || $cvv.val() === ''  ) {
      //if any field is blank, shows blank error message, hides other messages
      $blankCC.show();
      $numericCC.hide();
      $lengthCC.hide();
      return true;//stops form from submitting when function called in submit event
    } else if ( isNaN($ccNum.val()) || isNaN($zip.val()) || isNaN($cvv.val()) ) {
      //if any field is not a number, shows numeric error message, hides other messages
      $blankCC.hide();
      $numericCC.show();
      $lengthCC.hide();
      return true;//stops form from submitting when function called in submit event
    } else if ( $ccNum.val().length < 13 || $ccNum.val().length > 16 || ($zip.val().length !== 5) || ($cvv.val().length !== 3)) {
        //if any field is not correct length, shows length error message, hides other messages
      $blankCC.hide();
      $numericCC.hide();
      $lengthCC.show();
      return true;//stops form from submitting when function called in submit event
    } else {
      // cc info valid, removes error and messages
      $blankCC.hide();
      $numericCC.hide();
      $lengthCC.hide();
      $ccNum.removeClass('error');
      $zip.removeClass('error');
      $cvv.removeClass('error');

    }
  }
}

//Submit and Validation
$submitButton.on('click', function (event) {
   let $error = false; //if this is true, it will stop submit action
    $error = $nameValid();
   $error = $emailValid();
   $error = $activitiesValid();
  $error = $ccValidation();

  if ($error) {
    event.preventDefault();
  }
});

//After Submit w/ errors, event listners check to see if an inputs error message is shown
//if shown, runs validation function again.
$name.on('change', function () {
  if($('#blankName').css('display') === 'inline'){
  $nameValid();
}
});

$('.activities').on('click change', function () {
  if($('#activityReq').css('display')=== 'inline'){
  $activitiesValid();
}
});

$paymentSelect.parent().on('onchange input',  function () {
  if($blankCC.css('display') === 'inline' || $numericCC.css('display') === 'inline' || $lengthCC.css('display') === 'inline'){
    $ccValidation();
}
});

//email checks for validation as email is typed in
//does not check if error message is shown, as this validation will happen even before form is submitted.
$email.on('change keyup', function () {
      $emailValid();
});






























//
