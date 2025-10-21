import { _decorator, Component, Node } from 'cc'
const { ccclass, property } = _decorator

@ccclass('Utils')
export class Utils extends Component {
	public getRandomNum = (min: number, max: number) => {
		return Math.random() * (max - min) + min
	}
}
