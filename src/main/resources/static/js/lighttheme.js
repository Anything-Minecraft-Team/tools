(function(){
    if(localStorage.getItem("theme") === "dark"){
        $( "body" ).addClass( "dark" );
        $( "ul" ).addClass( "dark-list" );
    }
})();

$( ".inner-switch" ).on("click", function() {
    if( $( "body" ).hasClass( "dark" )) {
        $( "body" ).removeClass( "dark" );
        $( "ul" ).removeClass( "dark-list" );
        localStorage.setItem("theme", "light");
    } else {
        $( "body" ).addClass( "dark" );
        $( "ul" ).addClass( "dark-list" );
        localStorage.setItem("theme", "dark");
    }
});
