import assets from "../scripts/assets";

export default class Level extends Phaser.Scene {
  constructor() {
    super("Level");
    this.selectedNumber = null;
    this.dropdownOpen = false;
  }

  preload() {
    this.load.spritesheet("diceRoll", assets.diceRoll, {
      frameWidth: 128,
      frameHeight: 128,
    });

    for (let i = 1; i <= 6; i++) {
      this.load.image(`dice_${i}`, assets[`dice_${i}`]);
    }
  }

  create() {
    this.dice = this.add.sprite(this.scale.width / 2, 960, "diceRoll");
    this.dice.setScale(1);

    this.add
      .text(540, 200, "Select a number", {
        fontFamily: "Arial",
        fontSize: "42px",
        fontStyle: "bold",
        color: "#fff",
      })
      .setOrigin(0.5, 0.5);

    const anim = this.anims.create({
      key: "diceRollAnimation",
      frames: this.anims.generateFrameNumbers("diceRoll", { start: 0, end: 5 }),
      frameRate: 18,
      repeat: 0,
      skipMissedFrames: true,
    });

    const dropdownButton = this.add
      .rectangle(540, 280, 280, 80, 0x0000ff, 0.5)
      .setOrigin(0.5);
    const txt_dropdown = this.add
      .text(540, 280, "Select Number", {
        fontFamily: "Arial",
        fontSize: "32px",
        fontStyle: "bold",
        color: "#fff",
      })
      .setOrigin(0.5, 0.5);
    dropdownButton.setInteractive();

    const dropdownOptions = [];
    for (let i = 1; i <= 6; i++) {
      const option = this.add.rectangle(
        540,
        360 + (i - 1) * 75,
        280,
        80,
        0x999999,
        0.5
      );
      option.setInteractive();
      option.visible = false;

      const txt_option = this.add
        .text(540, 370 + (i - 1) * 74, i, {
          fontFamily: "Arial",
          fontSize: "32px",
          fontStyle: "bold",
          color: "#fff",
        })
        .setOrigin(0.5, 0.5);
      txt_option.visible = false;

      option.on("pointerdown", () => {
        this.selectedNumber = i;
        txt_dropdown.setText(`Selected: ${i}`);
        this.dropdownOpen = false;
        this.toggleDropdown(dropdownOptions, false);
        this.btnRoll.setAlpha(1);
      });

      dropdownOptions.push({ option, txt_option });
    }

    dropdownButton.on("pointerdown", () => {
      this.dropdownOpen = !this.dropdownOpen;
      this.toggleDropdown(dropdownOptions, this.dropdownOpen);
    });

    this.btnRoll = this.add
      .rectangle(540, 1500, 250, 100, 0x00ff00, 0.5)
      .setAlpha(0.5);
    const txt_Roll = this.add
      .text(540, 1500, "Roll", {
        fontFamily: "Arial",
        fontSize: "42px",
        fontStyle: "bold",
        color: "#fff",
      })
      .setOrigin(0.5, 0.5);
    this.btnRoll.setInteractive();

    this.btnRoll.on("pointerdown", () => {
      if (this.selectedNumber !== null) {
        this.dice.play("diceRollAnimation");
        this.dice.once("animationcomplete", () => {
          this.btnRoll.setAlpha(0.5);
          this.dice.stop();
          const randomDice = Phaser.Math.Between(1, 6);
          this.dice.setTexture(`dice_${randomDice}`);
          setTimeout(() => {
            if (randomDice == this.selectedNumber) {
              alert(
                `🎉 Congratulations! You win! 🎲 The dice rolled a ${randomDice}, which matches your selected number: ${this.selectedNumber}.`
              );
            } else {
              alert(
                `😢 Sorry, you lose! 🎲 The dice rolled a ${randomDice}, but your selected number was ${this.selectedNumber}. Better luck next time!`
              );
              this.selectedNumber = null;
            }
          }, 100);
          txt_dropdown.setText(`Select Number`);
        });
      }
    });
  }

  toggleDropdown(dropdownOptions, visible) {
    dropdownOptions.forEach((opt) => {
      opt.option.visible = visible;
      opt.txt_option.visible = visible;
    });
  }
}
