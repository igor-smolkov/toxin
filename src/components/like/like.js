export default function() {
    $(function(){
        $(".like__input").on('change', function(){
            if($(this).prop('checked')) {
                $(this).next().text($(this).next().text()*1+1);
            } else {
                $(this).next().text($(this).next().text()*1-1);
            }
        });
    });    
}