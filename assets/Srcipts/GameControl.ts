import {
	_decorator,
	CCInteger,
	Collider2D,
	Component,
	Contact2DType,
	director,
	EventKeyboard,
	Input,
	input,
	IPhysics2DContact,
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
	public isOver: boolean

	onLoad() {
		this.initListener()
		this.results.resetScore()
		this.isOver = true
		director.pause()
		this.contactGroundPipe()
	}

	initListener() {
		// input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this)
		this.node.on(Node.EventType.TOUCH_START, () => {
			if (this.isOver) {
				this.resetGame()
				this.bird.resetBird()
				this.startGame()
			}
			if (this.isOver === false) {
				this.bird.fly()
			}
		})
	}

	// TODO DELETE
	// onKeyDown(event: EventKeyboard) {
	// 	switch (event.keyCode) {
	// 		case KeyCode.KEY_A:
	// 			this.gameOver()
	// 			break
	// 		case KeyCode.KEY_P:
	// 			this.results.addScore()
	// 			break
	// 		case KeyCode.KEY_Q:
	// 			this.resetGame()
	// 			this.bird.resetBird()
	// 	}
	// }

	startGame() {
		this.results.hideResults()
		director.resume()
	}

	gameOver() {
		this.results.showResults()
		this.isOver = true
		director.pause()
	}

	resetGame() {
		this.results.resetScore()
		this.pipeQueue.resetPool()
		this.isOver = false
		this.startGame()
	}

	passPipe() {
		this.results.addScore()
	}

	createPipe() {
		this.pipeQueue.addPool()
	}

	contactGroundPipe() {
		let collider = this.bird.getComponent(Collider2D)

		if (collider) {
			collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this)
		}
	}

	onBeginContact(
		selfCollider: Collider2D,
		otherCollider: Collider2D,
		contact: IPhysics2DContact | null,
	) {
		this.bird.hitSomething = true
	}

	birdStruck() {
		if (this.bird.hitSomething === true) {
			this.gameOver()
		}
	}

	update(dt: number) {
		if (this.isOver == false) {
			this.birdStruck()
		}
	}
}
