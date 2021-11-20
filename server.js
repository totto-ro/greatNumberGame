const express = require( 'express' );
const app = express();
const session = require('express-session');

app.set('views', __dirname + '/views'); 
app.set('view engine', 'ejs');
app.use( express.static(__dirname + '/static') );
app.use(session({secret: 'verySecret'}));

app.use( express.urlencoded({ extended: true }) );

//render index
app.get("/", function( request, response ){
    if( request.session.num === undefined ){
        let min = Math.ceil(1);
        let max = Math.floor(100);
        request.session.num = Math.floor(Math.random() * (max - min) + min);
    }
    console.log(request.session.num);
    response.render( 'index', {'num' : number});
});

let number = ' ';
//get number guessed to compare with session
app.post("/", function( request, response ){
    let numGuess = Number( request.body.numGuess );
    let numSession = request.session.num;  
    console.log(numSession);
    console.log(numGuess);

    if( numGuess < numSession ){
        number = 'low';
        console.log(number);
    }
    else if( numGuess > numSession ){
        number = 'high';
        console.log(number);
    }
    else if( numGuess == numSession ){
        number = 'right';
        console.log(number);
    }

    response.redirect( '/' );
});

app.post('/reset', function(request, response){
    request.session.destroy();
    console.log(number);
    number=undefined;
    console.log(number);
    response.redirect('/');
});

app.listen(7077, function() {
    console.log("running on port 7077");
});