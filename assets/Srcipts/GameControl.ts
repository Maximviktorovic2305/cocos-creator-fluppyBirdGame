import { _decorator, CCInteger, Component, EventKeyboard, Input, input, Node } from 'cc'
import { Ground } from './Ground'
import { Results } from './Results'
const { ccclass, property } = _decorator

@ccclass('GameControl')
export class GameControl extends Component {
	@property({ type: Ground }) public ground: Ground
	@property({ type: CCInteger }) public speed: number = 300
	@property({ type: CCInteger }) public pipeSpeed: number = 200

	@property({ type: Results }) public results: Results

	onLoad() {}

	initListener() {
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this)
    }

    onKeyDown(event: EventKeyboard) {
        
    }

	startGame() {}
}
