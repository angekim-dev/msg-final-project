import { CST } from "../CST";

let platforms;
let moderngirl;
let cursors;
let stars;

let score = 0;
let scoreText;
let button;
let fullscreenText;
let playButton;

let ping;
let sound;
let cancelsound;

function reachedFifty() {
    moderngirl.setTint(0xff00ff);
    stars.setTint(0x00ff00);
}

function reachedHundred() {
    moderngirl.setTint(0xffffff);
    stars.setTint(0xffffff);
}

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

export class LevelOneSceneModern extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.LEVELONEMODERN,
        });
    }
    init() {}
    preload() {}
    create() {
        this.add.image(0, 0, "mainbg").setOrigin(0).setDepth(0);
        platforms = this.physics.add.staticGroup();
        platforms.create(200, 580, "ground").setScale(1).refreshBody();

        platforms.create(600, 420, "ground");
        platforms.create(50, 270, "ground");
        platforms.create(750, 250, "ground");

        moderngirl = this.physics.add.sprite(20, 300, "moderngirl");

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
            .sprite(750, 50, "fullscreen")
            .setDepth(1)
            .setScale(1)
            .setInteractive();

        button.on(
            "pointerup",
            () => {
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
            this.scene.start(CST.SCENES.LEVELTWOMODERN);
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

        if (score == 50) {
            reachedFifty();
        }
        if (score == 100) {
            reachedHundred();
        }
    }
}
