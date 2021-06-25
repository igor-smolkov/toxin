import './like-button.scss'

$(".like-button__box").on('change', function(){
  $(this).next().text($(this).prop('checked') ? 
    +$(this).next().text()+1 : 
    +$(this).next().text()-1);
});