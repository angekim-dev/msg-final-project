import { CST } from "../CST";

let platforms;
let moderngirl;
let cursors;
let stars;

let score = 0;
let scoreText;
let button;
let fullscreenText;

let mushroom;

function collectStar(moderngirl, star) {
    star.disableBody(true, true);

    score += 10;
    scoreText.setText("Your score: " + score);
    fullscreenText.setText("press f for fullscreen modus");

    if (stars.countActive(true) === 0) {
        playButton.visible = true;
    }

    let x =
        moderngirl.x < 400
            ? Phaser.Math.Between(400, 800)
            : Phaser.Math.Between(0, 400);
}

export class LevelTwoScene extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.LEVELTWO,
        });
    }
    init() {}
    preload() {}
    create() {
        this.add.image(0, 0, "mainbg").setOrigin(0).setDepth(0);
        platforms = this.physics.add.staticGroup();
        platforms.create(400, 580, "brick").setScale(0.9).refreshBody();
        moderngirl = this.physics.add.sprite(20, 300, "moderngirl", 0);

        moderngirl.setBounce(0.5);
        moderngirl.setCollideWorldBounds(true);

        this.anims.create({
            key: "turnleft",
            frames: this.anims.generateFrameNames("moderngirl", {
                start: 0,
                end: 3,
            }),
            frameRate: 10,
            repeat: -1,
        });

        this.anims.create({
            key: "turnstraight",
            frames: [{ key: "moderngirl", frame: 0 }],
            frameRate: 20,
        });

        this.anims.create({
            key: "turnright",
            frames: this.anims.generateFrameNames("moderngirl", {
                start: 4,
                end: 7,
            }),
            frameRate: 10,
            repeat: -1,
        });

        cursors = this.input.keyboard.createCursorKeys();

        this.physics.add.collider(moderngirl, platforms);

        stars = this.physics.add.group({
            key: "star",
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70 },
        });

        stars.children.iterate((child) => {
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.5));
        });

        this.physics.add.collider(stars, platforms);
        this.physics.add.overlap(moderngirl, stars, collectStar, null, this);

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
    }
    update() {
        if (cursors.left.isDown) {
            moderngirl.setVelocityX(-160);

            moderngirl.anims.play("turnleft", true);
        } else if (cursors.right.isDown) {
            moderngirl.setVelocityX(160);

            moderngirl.anims.play("turnright", true);
        } else {
            moderngirl.setVelocityX(0);

            moderngirl.anims.play("turnstraight");
        }

        if (cursors.up.isDown && moderngirl.body.touching.down) {
            moderngirl.setVelocityY(-330);
        }
    }
}
