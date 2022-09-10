$(document).ready(function(){

    if (sessionStorage.getItem('splash') !== 'true') {
        $('.splash_section').show();
        sessionStorage.setItem('splash','true');
    }
    else {
        $('.home-page').fadeIn();
    }    
});