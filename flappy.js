// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(790, 400, Phaser.AUTO, 'game', stateActions);

var score = 0;
var labelScore;

var player;

var pipes = [];

/*
 * Loads all resources for the game and gives them names.
 */
function preload() {
    game.load.image("playerImg", "assets/horse.png");
    game.load.audio("score", "assets/point.ogg");
    game.load.image("pipe0","assets/pipe_red.png");
    game.load.image("pipe1","assets/pipe_blue.png");
    game.load.image("pipe2","assets/pipe_green.png");
    game.load.image("pipe3","assets/pipe_mint.png");
    game.load.image("pipe4","assets/pipe_orange.png");
    game.load.image("pipe5","assets/pipe_pink.png");
    game.load.image("pipe6","assets/pipe_purple.png");
    game.load.image("pipe7","assets/pipe_yellow.png");



}


/*
 * Initialises the game. This function is only called once.
 */
function create() {
    // set the background colour of the scene
    game.stage.setBackgroundColor('#339933');


    game.input
        .onDown
        .add(clickHandler);


    game.input
        .keyboard.addKey(Phaser.Keyboard.SPACEBAR)
        .onDown.add(jump);

    player = game.add.sprite(100, 200, "playerImg");

    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.enable(player);
    player.body.gravity.y = 200;

    var pipeInterval = 1.75;
    game.time.events
        .loop(pipeInterval * Phaser.Timer.SECOND,
    generatePipe);


    /*game.input.keyboard.addKey(Phaser.Keyboard.RIGHT)
        .onDown.add(moveRight);

        */
    labelScore = game.add.text(20, 20, "0");

    generatePipe();

    //alert(score);


}

function clickHandler(event) {
    game.add.sprite(event.x, event.y, "playerImg");
}
function jump() {
    game.sound.play("score");
    moveUp();
}

function changeScore() {
    score = score + 1;
    labelScore.setText(score.toString());


}
function moveUp() {
    player.body.velocity.y = -150;
}
function generatePipe() {
    var gap = game.rnd.integerInRange(1 ,5);
    for (var count = 0; count  <  8; count++) {
        if (count != gap  &&  count != gap+1) {
            addPipeBlock(750, count * 50);
        }
    }
    changeScore();

}

function addPipeBlock(x, y) {

    var blockLabel = "pipe" + game.rnd.integerInRange(0, 7);

    var pipeBlock = game.add.sprite(x,y, blockLabel);
    pipes.push(pipeBlock);
    game.physics.arcade.enable(pipeBlock);
    pipeBlock.body.velocity.x = -200;
}





/*
 * This function updates the scene. It is called for every new frame.
 */

function update() {
    for(var index=0; index < pipes.length; index++){
        game.physics.arcade
            .overlap(player,
        pipes[index],
        gameOver);
    }

    if (player.y > 790 || player.y < 0){
        gameOver();
    }

}

function gameOver() {
    location.reload();

}