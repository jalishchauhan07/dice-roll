import dice_1 from '../assets/images/dice/dice-1.png';
import dice_2 from '../assets/images/dice/dice-2.png';
import dice_3 from '../assets/images/dice/dice-3.png';
import dice_4 from '../assets/images/dice/dice-4.png';
import dice_5 from '../assets/images/dice/dice-5.png';
import dice_6 from '../assets/images/dice/dice-6.png';
import diceRoll from '../assets/images/dice/diceRoll.png';

export default class Preload extends Phaser.Scene {
    constructor() {
        super("Preload");
    }
    editorPreload() {
        this.load.image('dice_1', dice_1);
        this.load.image('dice_2', dice_2);
        this.load.image('dice_3', dice_3);
        this.load.image('dice_4', dice_4);
        this.load.image('dice_5', dice_5);
        this.load.image('dice_6', dice_6);
        this.load.spritesheet('diceRoll', diceRoll, { frameWidth: 250, frameHeight: 231 });
    }
    editorCreate() {
        this.txt_progress = this.add.text(this.game.config.width / 2, this.game.config.height / 2, "0%", { fontSize: '48px' });
        this.txt_progress.setOrigin(0.5, 0.5);
    }
    preload() {

        this.editorCreate();
        this.editorPreload();

        this.load.on(Phaser.Loader.Events.PROGRESS, (progress) => {
            this.txt_progress.setText(`${Math.round(progress * 100)}%`)
        });
        let oGameStates = {
            isNewGame: true,
            isHomeScreen: true,
        }
        this.load.on(Phaser.Loader.Events.COMPLETE, () => this.scene.start("Level", oGameStates));

    }

}