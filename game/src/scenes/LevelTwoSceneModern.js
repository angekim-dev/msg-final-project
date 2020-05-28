import { CST } from "../CST";

let platforms;
let moderngirl;
let cursors;
let stars;
let question;

let score = 120;
let scoreText;
let button;
let fullscreenText;

function collectStar(moderngirl, star) {
    star.disableBody(true, true);

    score += 10;
    scoreText.setText("Your score: " + score);
    fullscreenText.setText("press f for fullscreen modus");

    if (stars.countActive(true) === 0) {
        stars.children.iterate(function (child) {
            child.enableBody(true, child.x, 0, true, true);
        });
    }

    let x =
        moderngirl.x < 400
            ? Phaser.Math.Between(400, 800)
            : Phaser.Math.Between(0, 400);
}

function hitQuestion(moderngirl, question) {
    question.setTint(0x000000);
}

export class LevelTwoSceneModern extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.LEVELTWOMODERN,
        });
    }
    init() {}
    preload() {}
    create() {
        this.add.image(0, 0, "mainbg").setOrigin(0).setDepth(0);

        platforms = this.physics.add.staticGroup();

        platforms.create(400, 600, "grass").setScale(2).refreshBody();
        platforms.create(-100, 200, "grass");
        platforms.create(350, 400, "grass");
        platforms.create(700, 150, "grass");

        question = this.physics.add.staticGroup();
        question.create(220, 270, "question");
        question.create(355, 200, "question");

        moderngirl = this.physics.add.sprite(20, 300, "moderngirl", 0);

        moderngirl.setBounce(0.5);
        moderngirl.setCollideWorldBounds(true);

        this.anims.create({
            key: "turnleft",
            frames: this.anims.generateFrameNames("moderngirl", {
                start: 4,
                end: 7,
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
                start: 8,
                end: 11,
            }),
            frameRate: 10,
            repeat: -1,
        });

        cursors = this.input.keyboard.createCursorKeys();

        this.physics.add.collider(moderngirl, platforms);
        this.physics.add.collider(
            moderngirl,
            question,
            hitQuestion,
            null,
            this
        );

        stars = this.physics.add.group({
            key: "star",
            repeat: 8,
            setXY: { x: 12, y: 0, stepX: 90 },
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
