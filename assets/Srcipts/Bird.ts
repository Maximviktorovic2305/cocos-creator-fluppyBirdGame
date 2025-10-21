import {
	_decorator,
	Animation,
	CCFloat,
	Component,
	Node,
	tween,
	Vec3,
} from 'cc'
const { ccclass, property } = _decorator

@ccclass('Bird')
export class Bird extends Component {
	@property(CCFloat) public jumpHeight: number = 100
	@property(CCFloat) public jumpDuration: number = 0.5

	public birdAnimation: Animation
	public birdLocation: Vec3
	public hitSomething: boolean

	onLoad() {
		this.resetBird()
		this.birdAnimation = this.node.getComponent(Animation)

	}

	resetBird() {
		this.birdLocation = new Vec3(0, 0, 0)
		this.node.setPosition(this.birdLocation)
		this.hitSomething = false
	}

	fly() {
		this.birdAnimation.stop()
		tween(this.node)
			.by(
				this.jumpDuration,
				{ position: new Vec3(0, this.jumpHeight, 0) },
				{
					easing: 'smooth'
				},
			)
			.start()

		this.birdAnimation.play()
	}
}
