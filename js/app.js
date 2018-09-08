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
//console.log($jobSelect);

//initialing setting elements to be hidden/focused
$name.focus();
$colorSelect.hide();
$otherJobInput.hide();
$('.activities').append($totalDisplay);
$totalDisplay.hide();
$paymentSelect.children().eq(1).attr('selected',"");
$bitcoin.hide();
$paypal.hide();
$('form').attr('novalidate',"");

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
  //adds or removes selected attribute so color show in drop is correct
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
  if ($(this).val() === 'select_method') {
    $('#credit-card').hide();
    $('#credit-card').next().hide();
    $('#credit-card').next().next().hide();
  }
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

//checks to see that @ is neither first or last
//and that there is a period after the @, which is also  not last
function $validEmail (email) {
  const at = email.indexOf('@');
  const period = email.indexOf('.',at);
  if (at > 2 && at < email.length && period < email.length && (period - at) > 2) {
  return 'valid';
} /*else {
    console.log(false);
  }*/
}

//Validation Functions - used in Submit button listener and change listeners
function  $nameValid () {
  if ($name.val() === "") {
    $('#blankName').show();
    $name.addClass('error');
    return true;
  } else {
    $('#blankName').hide();
    $name.removeClass('error');
  }
}

function $emailValid  () {
  if ($email.val() === "") { //checks if email blank
    $('#blankEmail').show();
    $email.addClass('error');
    return true;
  } else if ($validEmail($email.val()) !== 'valid') { //checks if basic syntax of email is valid
    $('#blankEmail').hide();
    $('#invalidEmail').show();
    return true;
  } else {
    $('#validEmail').hide();
    $email.removeClass('error');
  }
}

function $activitiesValid () {
  if ($('input:checked').length === 0) {
    $('#activityReq').show();
    return true;
  } else {
    $('#activityReq').hide();
  }
}

function $paymentValid () {
    const $ccNum = $('#cc-num');
  const $zip = $('#zip');
  const $cvv = $('#cvv');

  //checks to see if no payment method is selected

  if ($paymentSelect.val() !== 'credit card') {
    $('#blankCC').hide();
    $ccNum.removeClass('error');
    $zip.removeClass('error');
    $cvv.removeClass('error');
  }


  if ($paymentSelect.val() === 'select_method') {
    $('#methodReq').show();
    $('#payment').addClass('error');
    $('#blankCC').hide();
    $ccNum.removeClass('error');
    $zip.removeClass('error');
    $cvv.removeClass('error');
    return true;
  } else {
    console.log("stuff");
    $('#methodReq').hide();
    $('#payment').removeClass('error');

  }
  if ($('#payment').val() === 'credit card') {
    if ($ccNum.val() === "" || $zip.val() === "" || $cvv.val() === "") {
      $ccNum.addClass('error');
      $zip.addClass('error');
      $cvv.addClass('error');
      $('#blankCC').show();
      return true;
    } else if (isNaN($ccNum.val())|| isNaN($zip.val()) || isNaN($cvv.val())) {
      $('#blankCC').hide();
      $('#numericCC').show();
      return true;
    } else if ($ccNum.val().length < 13 || $ccNum.val().length > 16) {
      $('#numericCC').hide();
      $('#lengthCC').show();
      return true;
    } else if ($zip.val().length < 5 || $zip.val().length > 5) {
      return true;
    }
    else if ($cvv.val().length < 3 || $cvv.val().length > 3) {
      return true;
    } else {
      $('#lengthCC').hide();

      $ccNum.removeClass('error');
      $zip.removeClass('error');
      $cvv.removeClass('error');
    }
  }
// if ($paymentSelect.val() !== 'credit card') {
//   $('#blankCC').hide();
//   $ccNum.removeClass('error');
//   $zip.removeClass('error');
//   $cvv.removeClass('error');
// }



}

function $ccValidation () {
  const $ccNum = $('#cc-num');
  const $zip = $('#zip');
  const $cvv = $('#cvv');
  // $('#lengthCC').hide();
  //
  // $('#numericCC').hide();
  // $('#blankCC').hide();
  // $ccNum.removeClass('error');
  // $zip.removeClass('error');
  // $cvv.removeClass('error');
  //if cc is selected, checks to see if any field is blank
  //if  not, then checks for NaN
  //if all numeric, finally checks length
  // if ($('#payment').val() === 'credit card') {
  //   if ($ccNum.val() === "" || $zip.val() === "" || $cvv.val() === "") {
  //     $ccNum.addClass('error');
  //     $zip.addClass('error');
  //     $cvv.addClass('error');
  //     $('#blankCC').show();
  //     return true;
  //   } else if (isNaN($ccNum.val())|| isNaN($zip.val()) || isNaN($cvv.val())) {
  //     $('#blankCC').hide();
  //     $('#numericCC').show();
  //     return true;
  //   } else if ($ccNum.val().length < 13 || $ccNum.val().length > 16) {
  //     $('#numericCC').hide();
  //     $('#lengthCC').show();
  //     return true;
  //   } else if ($zip.val().length < 5 || $zip.val().length > 5) {
  //     return true;
  //   }
  //   else if ($cvv.val().length < 3 || $cvv.val().length > 3) {
  //     return true;
  //   } else {
  //     $('#lengthCC').hide();
  //
  //     $ccNum.removeClass('error');
  //     $zip.removeClass('error');
  //     $cvv.removeClass('error');
  //   }
  // }
  // if ($paymentSelect.val() === 'paypal' ||  $paymentSelect.val() === 'bitcoin' || $paymentSelect.val() === 'select_method') {
  //
  //   $('#lengthCC').hide();
  //
  //   $('#numericCC').hide();
  //   $('#blankCC').hide();
  //   $ccNum.removeClass('error');
  //   $zip.removeClass('error');
  //   $cvv.removeClass('error');
  // }
}


//Submit and Validation
$submitButton.on('click', function (event) {
   let $error = false;
    // $error = $nameValid();
  //  $error = $emailValid();
  //  $error = $activitiesValid();
   $error = $paymentValid();
  // $error = $ccValidation();

  if ($error) {
    event.preventDefault();
  }
});

//After Submit w/ errors, event listners to check if errors fixed
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

$paymentSelect.on('change', function () {
  if ($('#methodReq').css('display') === 'inline') {
  $paymentValid();
} else if($('#blankCC').css('display') === 'inline' || $('#numericCC').css('display') === 'inline' || $('#lengthCC').css('display') === 'inline') {
  $paymentValid();
}
});






























//
