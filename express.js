const http = require('http');

function express(){

    function listen(){
        http.createServer();
    }

    return {
        listen
    };

}