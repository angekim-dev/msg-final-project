import { CST } from "../CST";

let platforms;
let jasmine;
let cursors;
let stars;
let question1;
let question2;

let score = 120;
let scoreText;
let button;
let fullscreenText;

let crystal1;
let crystal2;

function collectStar(jasmine, star) {
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
        jasmine.x < 400
            ? Phaser.Math.Between(400, 800)
            : Phaser.Math.Between(0, 400);
}

function hitQuestion1(jasmine, question1) {
    question1.setTint(0x000000);
    crystal1.setVisible(false);
}

function hitQuestion2(jasmine, question2) {
    question2.setTint(0x000000);
    crystal2.setVisible(false);
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

        platforms.create(400, 600, "grass").setScale(2).refreshBody();
        platforms.create(-100, 200, "grass");
        platforms.create(350, 400, "grass");
        platforms.create(700, 150, "grass");

        question1 = this.physics.add.staticGroup();
        question1.create(220, 270, "question");
        question2 = this.physics.add.staticGroup();
        question2.create(355, 200, "question");

        crystal1 = this.add.sprite(220, 215, "crystal", 0).setInteractive();
        crystal2 = this.add.sprite(355, 145, "crystal", 0).setInteractive();

        this.anims.create({
            key: "circle",
            repeat: -1,
            frameRate: 5,
            frames: this.anims.generateFrameNames("crystal", {
                start: 0,
                end: 7,
            }),
        });
        crystal1.play("circle");
        crystal2.play("circle");

        jasmine = this.physics.add.sprite(20, 300, "jasmine", 0);

        jasmine.setBounce(0.5);
        jasmine.setCollideWorldBounds(true);

        this.anims.create({
            key: "left",
            frames: this.anims.generateFrameNames("jasmine", {
                start: 4,
                end: 7,
            }),
            frameRate: 10,
            repeat: -1,
        });

        this.anims.create({
            key: "turn",
            frames: [{ key: "jasmine", frame: 0 }],
            frameRate: 20,
        });

        this.anims.create({
            key: "right",
            frames: this.anims.generateFrameNames("jasmine", {
                start: 8,
                end: 11,
            }),
            frameRate: 10,
            repeat: -1,
        });

        cursors = this.input.keyboard.createCursorKeys();

        this.physics.add.collider(jasmine, platforms);
        this.physics.add.collider(jasmine, question1, hitQuestion1);

        this.physics.add.collider(jasmine, question2, hitQuestion2, null, this);

        stars = this.physics.add.group({
            key: "star",
            repeat: 8,
            setXY: { x: 12, y: 0, stepX: 90 },
        });

        stars.children.iterate((child) => {
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.5));
        });

        this.physics.add.collider(stars, platforms);
        this.physics.add.overlap(jasmine, stars, collectStar, null, this);

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
            jasmine.setVelocityX(-160);

            jasmine.anims.play("left", true);
        } else if (cursors.right.isDown) {
            jasmine.setVelocityX(160);

            jasmine.anims.play("right", true);
        } else {
            jasmine.setVelocityX(0);

            jasmine.anims.play("turn");
        }

        if (cursors.up.isDown && jasmine.body.touching.down) {
            jasmine.setVelocityY(-330);
        }
    }
}
