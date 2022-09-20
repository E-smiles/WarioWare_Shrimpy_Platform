var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    //Je dois rajouter de la physique à mon jeu
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 300
            },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};
//J'instancie toutes mes variables
var player;
var coffee;
var platforms;
var cursors;
var score = 0;
var gameOver = false;
var scoreText;
var timerText;
var timer;


var game = new Phaser.Game(config);

function preload() {
    //Je dois charger les images de mon jeux
    this.load.image('bg', './assets/images/bg.png');
    this.load.image('ground', './assets/images/platform.png');
    this.load.image('coffee', './assets/images/coffee.png');
    this.load.image('shrimpy', './assets/images/Shrimpy.png');

}

function create() {
    
    let bg = this.add.image(0, 0, 'bg');
    bg.setOrigin(0, 0);

    // Le groupe des plateformes contient le sol et les 2 rebords sur lesquels nous pouvons sauter.
    platforms = this.physics.add.staticGroup();
    // Nous créons ici le sol.
    // Mettez-le à l'échelle pour qu'il s'adapte à la largeur du jeu (le sprite original a une taille de 400x32).
    //scale et le refresh va agrandir ma platforme
    //Permettre à ma platform d'être considérée comme un collider.
    platforms.create(400, 584, 'ground').setScale(2).refreshBody();

    platforms.create(600, 280, 'ground');
    platforms.create(50, 400, 'ground');
    platforms.create(750, 150, 'ground');

    //Ajout de physique à mon player
    player = this.physics.add.sprite(100, 450, 'shrimpy');

    //Setbounce va faire rebondire ma crevette
    player.setBounce(0.3);
    //Quand ma crevette va être en collision avec un autre element 
    //Elle va rembondire 
    player.setCollideWorldBounds(true);

    // Événements de saisie
    cursors = this.input.keyboard.createCursorKeys();
    // Quelques café à collecter, 10 au total, régulièrement espacées de 70 pixels le long de l'axe x.
    coffee = this.physics.add.group({
        key: 'coffee',
        repeat: 10,
        setXY: { x: 12, y: 0, stepX: 70 }
    });

    //Quand mes coffees arrivent, un bouce est rajouté avec un float entre 0.4-0.8
    coffee.children.iterate(function (child) {
        //On donne un rebond différent aux cafés
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.6));
    });

    scoreText = this.add.text(16, 562, 'Score: 0', { fontSize: '32px', fill: '#FFFFFF' });
    
    //Création de mon timer 
    timerText = this.add.text(600, 562, '', { fontSize: '32px', fill: '#FFFFFF' });
    timer = this.time.addEvent({
        delay:10000,
        callback: TimesOut,
        callbackScope: this
    });

    //Ajout des collider pour la crevette et les platforms et les cafés avec les platforms
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(coffee, platforms);
    // Vérifie si le joueur chevauche l'un des cafés, si c'est le cas, appelle la fonction collectCoffee.
    this.physics.add.overlap(player, coffee, collectCoffee, null, this);

}

function update() {

    if (gameOver) {
        return;
    }
    if (cursors.left.isDown) {
        player.setVelocityX(-160);
    }
    else if (cursors.right.isDown) {
        player.setVelocityX(160);
    }
    else {
        player.setVelocityX(0);
    }

    if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-330);
    }

    timeLeft = 10 - timer.getElapsedSeconds();
    //substr pour avoir x chiffre après la virgule
    timerText.setText('Timer: '+timeLeft.toString().substr(0, 3));

}
function collectCoffee(coffee,player) 
{
    player.disableBody(true, true);
    //  Add and update the score
    score += 5;
    scoreText.setText('Score: ' + score);

    //var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

}

function TimesOut(timer) 
{
    if (timer < 0)
    {
        gameOver = true;
    }
}