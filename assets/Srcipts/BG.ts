import {
	_decorator,
	Component,
	Node,
	UITransform,
	Vec3,
	director,
	Canvas,
} from 'cc'
import { GameControl } from './GameControl'
const { ccclass, property } = _decorator

@ccclass('BG')
export class BG extends Component {
	@property(Node) public BG1: Node
	@property(Node) public BG2: Node
	@property({ type: GameControl }) public gameControl: GameControl | null = null

	public bgWidth1: number
	public bgWidth2: number

	public tempStartLocation1 = new Vec3()
	public tempStartLocation2 = new Vec3()

	protected onLoad(): void {
		this.startUp()
	}

	startUp() {
		this.bgWidth1 = this.BG1.getComponent(UITransform).width
		this.bgWidth2 = this.BG2.getComponent(UITransform).width

		this.tempStartLocation1.x = 0
		this.tempStartLocation2.x = this.bgWidth1

		this.BG1.setPosition(this.tempStartLocation1)
		this.BG2.setPosition(this.tempStartLocation2)
	}

	update(deltaTime: number) {
		const backgroundSpeedRatio = 0.4
		const baseSpeed = this.gameControl ? this.gameControl.speed : 100
		const currentSpeed = baseSpeed * backgroundSpeedRatio

		this.tempStartLocation1 = this.BG1.position
		this.tempStartLocation2 = this.BG2.position

		this.tempStartLocation1.x -= currentSpeed * deltaTime
		this.tempStartLocation2.x -= currentSpeed * deltaTime

		const scene = director.getScene()
		const canvas = scene.getComponentInChildren(Canvas)

		if (this.tempStartLocation1.x <= 0 - this.bgWidth1) {
			this.tempStartLocation1.x = canvas.getComponent(UITransform).width
		}
		if (this.tempStartLocation2.x <= 0 - this.bgWidth2) {
			this.tempStartLocation2.x = canvas.getComponent(UITransform).width
		}

		this.BG1.setPosition(this.tempStartLocation1)
		this.BG2.setPosition(this.tempStartLocation2)
	}
}
