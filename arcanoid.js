canvas = document.getElementById("arcanoidCanvas")
ctx  = canvas.getContext("2d");

var ball_rad = 8;

var ball_x = 30;
var ball_y = 30;

var ball_speed_x = 3;
var ball_speed_y = -3;

var bat_x = 20;
var bat_height = 10;
var bat_y = canvas.height - bat_height;
var bat_width = 75;

var count = 0;
var lives = 3;

var right_pressed = addEventListener("keydown",keysDown,false);
var left_pressed =  addEventListener("keyup",keysUp,false);
//var game_go_controller = true;

/*var bricks = [];

var brick_x = 20;
var brick_y = 40;

for(var c = 0;c ++;c<=2){
    bricks[c] = [];
    for (var r = 0;c++;c <= 4){
        bricks[c][r] = [brick_x,brick_y];
        brick_x += 20;
    }
    brick_y += 20;
}
alert(bricks);*/

function restart(){ // restore variables
    ball_rad = 8;

    ball_x = 30;
    ball_y = 30;

    ball_speed_x = 1.5;
    ball_speed_y = -1.5;

    bat_x = 20;
    //bat_height = 10;
    bat_y = canvas.height - bat_height;
    //bat_width = 75;

    count = 0;
    lives = 3;
}

function draw_ball(){ // ball drawing
    ctx.beginPath();
    ctx.arc(ball_x,ball_y,ball_rad,0,Math.PI*2);

    ctx.fillStyle = "blue";
    ctx.fill();

    ctx.closePath();}

function draw_bat(){ // bat drawing
    ctx.beginPath();
    ctx.rect(bat_x,bat_y,bat_width,bat_height);

    ctx.fillStyle = "green";
    ctx.fill();

    ctx.beginPath();
}

function draw_text(){ // draw text on the canvas
    ctx.beginPath();

    ctx.font = "12px Trebushet";
    ctx.fillStyle = "red";

    var text = "Lives: " + lives;
    if (lives > 5){
        text = "Lives: full"
    }
    ctx.fillText(text,20,10);

    ctx.font = "12px Trebushet";
    ctx.fillStyle = "blue";

    var text = "Count: " + count;
    ctx.fillText(text,70,10);

    ctx.closePath();
}

/*function draw_bricks(){

    for(var c = 0;c<=2;c++){
        for (var r = 0;r <= 4;r++){
            ctx.beginPath();
            ctx.rect(bricks[c][r][0],bricks[c][r][1],20,20);

            //alert("any");

            ctx.fillStyle = "red";
            ctx.fill();
            ctx.closePath();
        }}
}*/

function update_ball(){ // ball move and collide
    ball_x += ball_speed_x;
    ball_y += ball_speed_y;

    if (ball_x - ball_rad < 0 || ball_x + ball_rad> canvas.width){// left and right
        ball_speed_x = -ball_speed_x;}

    if (ball_y - ball_rad < 0){// up
        ball_speed_y = -ball_speed_y;}

    if (ball_y + ball_rad > bat_y && ball_x > bat_x && ball_x < bat_x + bat_width){// bat
        ball_y = bat_y - ball_rad;
        ball_speed_y = -ball_speed_y;

        count++ // count plus
        if(count>0 && count % 10 == 0 && lives <= 5){ // lives bonus
            lives ++;
        }

        if (count > 69){ // win
            alert("You win!");
            restart();
        }
    }

    if (ball_y + ball_rad > canvas.height){// over
        if (lives > 1){// lives minus
        ball_speed_y = -ball_speed_y;
        lives --;

        count -= 10; // count minus
        if(count < 0){
            count = 0;
        }
    }

        else{ // game over
            alert("GAME OVER!");
            restart();
        }
    }
}

function update_bat(){ // bat move
    if (right_pressed == true){
        if(bat_x + bat_width < canvas.width){
            bat_x += 5;}
    }

    if (left_pressed == true){
        if(bat_x > 0){
            bat_x -= 5;}
    }
}

function update_screen(){ // delete all on the canvas
    ctx.beginPath();
    ctx.rect(0,0,canvas.width,canvas.height);

    ctx.fillStyle = "white";
    ctx.fill();

    ctx.beginPath();}

function keysDown(e){
    if (e.keyCode == 37) {
        left_pressed = true;}

    if (e.keyCode == 39) {
        right_pressed = true;
    }
    }

function keysUp(e){
    if (e.keyCode == 37) {
        left_pressed = false;}

    if (e.keyCode == 39) {
        right_pressed = false;}

    }

function main(){ // main update
    update_screen();
    draw_text();
    //draw_bricks();

    update_ball();
    draw_ball();

    update_bat();
    draw_bat();

    //if (game_go_controller == true){
    requestAnimationFrame(main);}
    //}

//interval = 10;
//setInterval(main,interval); // infinity
//alert(bricks);
main();