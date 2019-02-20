$(function(){
    var id = location.search.substr(4);
    $.ajax({
        url: 'http://localhost:9090/api/getmoneyctrlproduct',
        data: {
            productid: id
        },
        success: function(data){
            console.log(data);
            var html = template('tplContent',data);
            $('#main').html(html);
        }
    })
})