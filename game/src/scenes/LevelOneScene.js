import { CST } from "../CST";

let platforms;
let jasmine;
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

function collectStar(jasmine, star) {
    star.disableBody(true, true);

    score += 10;
    ping.play();
    scoreText.setText("Your score: " + score);
    fullscreenText.setText("press f for fullscreen modus");

    if (stars.countActive(true) === 0) {
        playButton.visible = true;
    }

    let x =
        jasmine.x < 400
            ? Phaser.Math.Between(400, 800)
            : Phaser.Math.Between(0, 400);
}

function reachedFifty() {
    jasmine.setTint(0xff00ff);
    stars.setTint(0x00ff00);
}

function reachedHundred() {
    jasmine.setTint(0xffffff);
    stars.setTint(0xffffff);
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
        platforms.create(200, 580, "ground").setScale(1).refreshBody();

        platforms.create(600, 420, "ground");
        platforms.create(50, 270, "ground");
        platforms.create(750, 250, "ground");

        jasmine = this.physics.add.sprite(20, 300, "jasmine");

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

        stars = this.physics.add.group({
            key: "star",
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70 },
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
                sound.on("pointerup", () => {
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
            this.scene.start(CST.SCENES.LEVELTWO);
        });

        ping = this.sound.add("ping");
        ping.allowMultiple = true;
        ping.addMarker("ping", 10, 1.0);
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

        if (score == 50) {
            reachedFifty();
        }
        if (score == 100) {
            reachedHundred();
        }
    }
}
