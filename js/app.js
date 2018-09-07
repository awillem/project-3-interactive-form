const $name = $('#name');
const $colorSelect = $('#colors-js-puns');
const $otherJobInput = $('#other');
const $totalDisplay = $('<span class="total"></span>')
const $paymentSelect = $('#payment');
const $bitcoin = $('fieldset:last div:last');
const $paypal = $('fieldset:last div:last').prev();
const $jobSelect = $('#title option');
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




























//
