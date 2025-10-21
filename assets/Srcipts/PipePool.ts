import { _decorator, Component, instantiate, Node, NodePool, Prefab } from 'cc'
const { ccclass, property } = _decorator

@ccclass('PipePool')
export class PipePool extends Component {
	@property(Prefab) public prefabPipes: Prefab = null
	@property(Node) public pipePoolHome: Node

	public pool = new NodePool()

	initPool() {
		let initCount = 3

		for (let i = 0; i < initCount; i++) {
			let pipe = instantiate(this.prefabPipes)
			this.pool.put(pipe)
		}
	}

	addPool() {
		let pipe
		if (this.pool.size() > 0) {
			pipe = this.pool.get()
		} else {
			pipe = instantiate(this.prefabPipes)
		}

		this.pipePoolHome.addChild(pipe)
	}

	resetPool() {
		this.pipePoolHome.removeAllChildren()
		this.pool.clear()
		this.initPool()
	}
}
