import {
	_decorator,
	Canvas,
	Component,
	director,
	Node,
	UITransform,
	Vec3,
} from 'cc'
import { GameControl } from './GameControl'
const { ccclass, property } = _decorator

@ccclass('Ground')
export class Ground extends Component {
	@property(Node) public ground1: Node
	@property(Node) public ground2: Node
	@property(Node) public ground3: Node
	@property({ type: GameControl }) public gameControl: GameControl | null = null

	public groundWidth1: number
	public groundWidth2: number
	public groundWidth3: number

	public tempStartLocation1 = new Vec3()
	public tempStartLocation2 = new Vec3()
	public tempStartLocation3 = new Vec3()

	protected onLoad(): void {
		this.startUp()
	}

	startUp() {
		this.groundWidth1 = this.ground1.getComponent(UITransform).width
		this.groundWidth2 = this.ground2.getComponent(UITransform).width
		this.groundWidth3 = this.ground3.getComponent(UITransform).width

		this.tempStartLocation1.x = 0
		this.tempStartLocation2.x = this.groundWidth1
		this.tempStartLocation3.x = this.groundWidth1 + this.groundWidth2

		this.ground1.setPosition(this.tempStartLocation1)
		this.ground2.setPosition(this.tempStartLocation2)
		this.ground3.setPosition(this.tempStartLocation3)
	}

	update(deltaTime: number) {
		const currentSpeed = this.gameControl ? this.gameControl.speed : 300

		this.tempStartLocation1 = this.ground1.position
		this.tempStartLocation2 = this.ground2.position
		this.tempStartLocation3 = this.ground3.position

		this.tempStartLocation1.x -= currentSpeed * deltaTime
		this.tempStartLocation2.x -= currentSpeed * deltaTime
		this.tempStartLocation3.x -= currentSpeed * deltaTime

		const scene = director.getScene()
		const canvas = scene.getComponentInChildren(Canvas)

		if (this.tempStartLocation1.x <= 0 - this.groundWidth1) {
			this.tempStartLocation1.x = canvas.getComponent(UITransform).width
		}
		if (this.tempStartLocation2.x <= 0 - this.groundWidth2) {
			this.tempStartLocation2.x = canvas.getComponent(UITransform).width
		}
		if (this.tempStartLocation3.x <= 0 - this.groundWidth3) {
			this.tempStartLocation3.x = canvas.getComponent(UITransform).width
		}

		this.ground1.setPosition(this.tempStartLocation1)
		this.ground2.setPosition(this.tempStartLocation2)
		this.ground3.setPosition(this.tempStartLocation3)
	}
}
