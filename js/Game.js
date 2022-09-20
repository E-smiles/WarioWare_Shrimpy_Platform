var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    //Je dois rajouter de la physique à mon jeu
    physics:{
        default:'arcade',
        arcade:{
            gravity:{
                y:300},
                debug:false
            }
        },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};
//J'instancie une variable platforms dans laquelle je vais mettre mes asset de platform
//Leur ajouter de la physic et quels soient static
var platforms;
//J'instancie mon player
var player;

var game = new Phaser.Game(config);

function preload ()
{
    //Je dois charger les images de mon jeux
    this.load.image('bg','./assets/images/bg.png');
    this.load.image('ground','./assets/images/platform.png');
    this.load.image('coffee','./assets/images/coffee.png');
    this.load.image('shrimpy','./assets/images/Shrimpy.png');
}

function create ()
{
    let bg = this.add.image(0,0,'bg');
    bg.setOrigin(0,0);


    platforms=this.physics.add.staticGroup();
    //scale et le refresh va agrandir ma platforme et la scale
    platforms.create(400,584,'ground').setScale(2);
    
    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');

    player = this.physics.add.sprite(100,450,'shrimpy');

    //Setbouce va faire rebondire ma crevette
    player.setBounce(0.8);
    //Quand ma crevette va être en collision avec un autre element 
    //Elle va rembondire 
    player.setCollideWorldBounds(true);

    this.anims.create({
        key:'left',
        frames:this.anims.generateFrameNumbers('shrimpy', {start:0,end:3}),
        frameRate:10,
        repeat:-1
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    this.physics.add.collider(player,platforms);

}

function update ()
{
    
}