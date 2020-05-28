import { CST } from "../CST";

let platforms;
let moderngirl;
let cursors;
let stars;
let question1;
let question2;

let score = 120;
let scoreText;
let button;
let fullscreenText;
let playButton;

let crystal1;
let crystal2;

let ping;
let sound;
let cancelsound;

function collectStar(moderngirl, star) {
    star.disableBody(true, true);

    score += 10;
    ping.play();
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

function hitQuestion1(moderngirl, question1) {
    question1.setTint(0x000000);
    crystal1.setVisible(false);
}

function hitQuestion2(moderngirl, question2) {
    question2.setTint(0x000000);
    crystal2.setVisible(false);
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
        this.physics.add.collider(moderngirl, question1, hitQuestion1);

        this.physics.add.collider(
            moderngirl,
            question2,
            hitQuestion2,
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

        scoreText = this.add.text(280, 10, "Your score: 120", {
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

        sound = this.add
            .sprite(50, 50, "sound")
            .setDepth(1)
            .setScale(1)
            .setInteractive();

        sound.on("pointerup", () => {
            cancelsound = this.add
                .sprite(50, 50, "redline")
                .setDepth(1)
                .setScale(1)
                .setInteractive();
            this.sound.mute = true;
            if ((this.sound.mute = true)) {
                cancelsound.on("pointerup", () => {
                    this.sound.mute = false;
                    cancelsound.visible = false;
                });
            }
        });

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
            this.scene.start(CST.SCENES.LEVELTHREEMODERN);
        });

        ping = this.sound.add("ping");
        ping.allowMultiple = true;
        ping.addMarker("ping", 10, 1.0);
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
