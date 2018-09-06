const $name = $('#name');
const $colorSelect = $('#colors-js-puns');
const $otherJob = $('#other');
const $bitcoin = $('fieldset:last div:last');
const $paypal = $('fieldset:last div:last').prev();

$name.focus();
$colorSelect.hide();
$otherJob.hide();
$bitcoin.hide();
$paypal.hide();

$('#design').on('change', function () {
  if($(this).val() === 'js puns' || $(this).val() === 'heart js') {
    $colorSelect.show();
  } else {
    $colorSelect.hide();
  }
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
