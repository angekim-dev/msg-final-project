import { CST } from "../CST";

let platforms;
let player;
let cursors;
let stars;

let score = 0;
let scoreText;
let button;
let fullscreenText;
let playButton;

function collectStar(player, star) {
    star.disableBody(true, true);

    score += 10;
    scoreText.setText("Your score: " + score);
    fullscreenText.setText("press f for fullscreen modus");

    if (stars.countActive(true) === 0) {
        playButton.visible = true;
    }

    let x =
        player.x < 400
            ? Phaser.Math.Between(400, 800)
            : Phaser.Math.Between(0, 400);
}

function reachedFifty() {
    player.setTint(0xff00ff);
    stars.setTint(0x00ff00);
}

function reachedHundred() {
    player.setTint(0);
    stars.setTint(0xffff00);
}

export class LevelOneScene extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.LEVELONE,
        });
    }
    init() {}
    preload() {}
    create() {
        this.add.image(0, 0, "mainbg").setOrigin(0).setDepth(0);
        platforms = this.physics.add.staticGroup();
        platforms.create(400, 580, "ground").setScale(2).refreshBody();

        platforms.create(600, 420, "ground");
        platforms.create(50, 270, "ground");
        platforms.create(750, 250, "ground");

        player = this.physics.add.sprite(20, 300, "dude");

        player.setBounce(0.5);
        player.setCollideWorldBounds(true);

        this.anims.create({
            key: "left",
            frames: this.anims.generateFrameNumbers("dude", {
                start: 0,
                end: 3,
            }),
            frameRate: 10,
            repeat: -1,
        });

        this.anims.create({
            key: "turn",
            frames: [{ key: "dude", frame: 4 }],
            frameRate: 20,
        });

        this.anims.create({
            key: "right",
            frames: this.anims.generateFrameNumbers("dude", {
                start: 5,
                end: 8,
            }),
            frameRate: 10,
            repeat: -1,
        });

        cursors = this.input.keyboard.createCursorKeys();

        this.physics.add.collider(player, platforms);

        stars = this.physics.add.group({
            key: "star",
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70 },
        });

        stars.children.iterate((child) => {
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.5));
        });

        this.physics.add.collider(stars, platforms);
        this.physics.add.overlap(player, stars, collectStar, null, this);

        scoreText = this.add.text(280, 10, "Your score: 0", {
            fontSize: "32px",
            fill: "#000",
        });

        fullscreenText = this.add.text(
            420,
            570,
            "press f for fullscreen modus",
            {
                fontSize: "22px",
                fill: "#000",
            }
        );

        button = this.add
            .image(800 - 16, 16, "fullscreen", 0)
            .setOrigin(1, 0)
            .setInteractive();

        button.on(
            "pointerup",
            function () {
                if (this.scale.isFullscreen) {
                    button.setFrame(0);

                    this.scale.stopFullscreen();
                } else {
                    button.setFrame(1);

                    this.scale.startFullscreen();
                }
            },
            this
        );
        let fKey = this.input.keyboard.addKey("F");

        fKey.on(
            "down",
            function () {
                if (this.scale.isFullscreen) {
                    button.setFrame(0);
                    this.scale.stopFullscreen();
                } else {
                    button.setFrame(1);
                    this.scale.startFullscreen();
                }
            },
            this
        );
        playButton = this.add
            .image(
                this.game.renderer.width / 2,
                this.game.renderer.height / 2,
                "play_button.png"
            )
            .setDepth(1);
        playButton.visible = false;
        playButton.setInteractive();
        playButton.on("pointerup", () => {
            this.scene.start(CST.SCENES.LEVELTWO);
        });
    }
    update() {
        if (cursors.left.isDown) {
            player.setVelocityX(-160);

            player.anims.play("left", true);
        } else if (cursors.right.isDown) {
            player.setVelocityX(160);

            player.anims.play("right", true);
        } else {
            player.setVelocityX(0);

            player.anims.play("turn");
        }

        if (cursors.up.isDown && player.body.touching.down) {
            player.setVelocityY(-330);
        }

        if (score == 50) {
            reachedFifty();
        }
        if (score == 100) {
            reachedHundred();
        }
    }
}
