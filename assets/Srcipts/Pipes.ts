import {
	_decorator,
	Component,
	find,
	Node,
	screen,
	UITransform,
	Vec3,
} from 'cc'
import { Utils } from './Utils'
const { ccclass, property } = _decorator

@ccclass('Pipes')
export class Pipes extends Component {
	@property(Node) public topPipe: Node
	@property(Node) public bottomPipe: Node

	utils = new Utils()
	public tempStartLocationUp: Vec3 = new Vec3(0, 0, 0)
	public tempStartLocationDown: Vec3 = new Vec3(0, 0, 0)
	public scene = screen.windowSize

	public game // speed from GameControl
	public pipeSpeed: number // Final speed of pipes
	public tempSpeed: number // Temporary speed

	isPass: boolean
	hasCreatedNewPipe: boolean // Flag to ensure only one new pipe is created

	onLoad() {
		this.game = find('GameControl').getComponent('GameControl')
		this.pipeSpeed = this.game.pipeSpeed
		this.initPosition()
		this.isPass = false
		this.hasCreatedNewPipe = false
	}

	initPosition() {
		this.tempStartLocationUp.x =
			this.topPipe.getComponent(UITransform).width + this.scene.width
		this.tempStartLocationDown.x =
			this.topPipe.getComponent(UITransform).width + this.scene.width

		let gap = this.utils.getRandomNum(90, 100)
		let topHeight = this.utils.getRandomNum(0, 450)

		this.tempStartLocationUp.y = topHeight
		this.tempStartLocationDown.y = topHeight - gap * 10

		this.bottomPipe.setPosition(this.tempStartLocationDown)
		this.topPipe.setPosition(this.tempStartLocationUp)
	}

	update(dt: number) {
		this.tempSpeed = this.pipeSpeed * dt
		this.tempStartLocationUp = this.topPipe.position
		this.tempStartLocationDown = this.bottomPipe.position

		this.tempStartLocationUp.x -= this.tempSpeed
		this.tempStartLocationDown.x -= this.tempSpeed

		this.topPipe.setPosition(this.tempStartLocationUp)
		this.bottomPipe.setPosition(this.tempStartLocationDown)

		if (this.isPass == false && this.topPipe.position.x <= 0) {
			this.isPass = true
			this.game.passPipe()
		}

		if (
			!this.hasCreatedNewPipe &&
			this.topPipe.position.x < 0 - this.scene.width
		) {
			this.hasCreatedNewPipe = true
			this.game.createPipe()
			this.destroy()
		}
	}
}
