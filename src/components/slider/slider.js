require("jquery-ui/ui/widgets/slider");

export default function() {
    $(function(){
        $(".slider__slot").slider({
            range: true,
            min: 0,
            max: 100,
            values: [ 31.75, 63.5 ]
        });
    });    
}