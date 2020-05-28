import { CST } from "../CST";

let moderngirl;
let cursors;
let stars;

let score = 210;
let scoreText;
let button;
let fullscreenText;

function collectStar(moderngirl, star) {
    star.disableBody(true, true);

    score += 10;
    scoreText.setText("Your score: " + score);
    fullscreenText.setText("press f for fullscreen modus");

    let x =
        moderngirl.x < 400
            ? Phaser.Math.Between(400, 800)
            : Phaser.Math.Between(0, 400);
}

export class LevelThreeSceneModern extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.LEVELTHREEMODERN,
        });
    }
    init() {}
    preload() {}
    create() {
        this.add.image(0, 0, "mainbg").setOrigin(0).setDepth(0);
        moderngirl = this.physics.add.sprite(20, 300, "moderngirl", 0);
        moderngirl.setBounce(0.5);
        moderngirl.setCollideWorldBounds(true);

        this.anims.create({
            key: "left",
            frames: this.anims.generateFrameNames("moderngirl", {
                start: 4,
                end: 7,
            }),
            frameRate: 10,
            repeat: -1,
        });

        this.anims.create({
            key: "turn",
            frames: [{ key: "moderngirl", frame: 0 }],
            frameRate: 20,
        });

        this.anims.create({
            key: "right",
            frames: this.anims.generateFrameNames("moderngirl", {
                start: 8,
                end: 11,
            }),
            frameRate: 10,
            repeat: -1,
        });

        cursors = this.input.keyboard.createCursorKeys();

        stars = this.physics.add.group({
            key: "star",
            repeat: 8,
            setXY: { x: 12, y: 0, stepX: 90 },
        });

        stars.children.iterate((child) => {
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.5));
        });

        scoreText = this.add.text(280, 10, "Your score: 210", {
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

            moderngirl.anims.play("left", true);
        } else if (cursors.right.isDown) {
            moderngirl.setVelocityX(160);

            moderngirl.anims.play("right", true);
        } else {
            moderngirl.setVelocityX(0);

            moderngirl.anims.play("turn");
        }

        if (cursors.up.isDown && moderngirl.body.touching.down) {
            moderngirl.setVelocityY(-330);
        }
    }
}
