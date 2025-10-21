import {
	_decorator,
	CCInteger,
	Component,
	director,
	EventKeyboard,
	Input,
	input,
	KeyCode,
	Node,
} from 'cc'
import { Ground } from './Ground'
import { Results } from './Results'
import { Bird } from './Bird'
import { PipePool } from './PipePool'
const { ccclass, property } = _decorator

@ccclass('GameControl')
export class GameControl extends Component {
	@property({ type: Ground }) public ground: Ground
	@property({ type: Results }) public results: Results
	@property({ type: Bird }) public bird: Bird
	@property({ type: PipePool }) public pipeQueue: PipePool
	@property({ type: CCInteger }) public speed: number = 300
	@property({ type: CCInteger }) public pipeSpeed: number = 200

	onLoad() {
		this.initListener()
		this.results.resetScore()
		director.pause()
	}

	initListener() {
		input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this)
		this.node.on(Node.EventType.TOUCH_START, () => {
			this.bird.fly()
		})
	}

	// TODO DELETE
	onKeyDown(event: EventKeyboard) {
		switch (event.keyCode) {
			case KeyCode.KEY_A:
				this.gameOver()
				break
			case KeyCode.KEY_P:
				this.results.addScore()
				break
			case KeyCode.KEY_Q:
				this.resetGame()
				this.bird.resetBird()
		}
	}

	startGame() {
		this.results.hideResults()
		director.resume()
	}

	gameOver() {
		this.results.showResults()
		director.pause()
	}

	resetGame() {
		this.results.resetScore()
		this.pipeQueue.resetPool()
		this.startGame()
	}   

	passPipe() {
		this.results.addScore()
	}         

	createPipe() {
		this.pipeQueue.addPool()
	}
}
