const screenWidh = window.innerWidth;
const screenHeight = window.innerHeight;

class Kami {
	constructor() {
		this.div = document.createElement("div");

		// 大きさ
		this.div.style.width = "20px";
		this.div.style.height = "10px";

		// 色
		this.r = this.rand(100, 255);
		this.g = this.rand(100, 255);
		this.b = this.rand(100, 255);
		this.div.style.backgroundColor = `rgb(${this.r}, ${this.g}, ${this.b})`;

		// 位置
		this.x = this.rand(0, screenWidh);
		this.y = this.rand(0, screenHeight);
		this.vx = this.rand(-10, 10);
		this.vy = this.rand(5, 15);
		this.div.style.position = "fixed";
		this.div.style.left = `${this.x}px`;
		this.div.style.top = `${this.y}px`;

		// 回転
		this.angle = 0;
		this.rotateSpeed = this.rand(10, 40);
		this.rotateX = this.rand(0, 10) / 10;
		this.rotateY = this.rand(0, 10) / 10;
		this.rotateZ = this.rand(0, 10) / 10;

		document.body.appendChild(this.div);
	}

	rand(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	update() {
		// 回転
		this.angle += this.rotateSpeed;
		this.div.style.transform
			= `rotate3d(${this.rotateX}, ${this.rotateY}, ${this.rotateZ}, ${this.angle}deg)`;

		// 位置
		this.x += this.vx;
		this.y += this.vy;
		this.div.style.left = `${this.x}px`;
		this.div.style.top = `${this.y}px`;

		// 画面外
		if (this.x < 0 || screenWidh < this.x) this.initKami();
		if (screenHeight < this.y) this.initKami();
	}

	initKami() {
		this.x = this.rand(0, screenWidh);
		this.y = -20;
	}
}

const KAMI_MAX = 150;
const kamis = [];
for (let i = 0; i < KAMI_MAX; i++) {
	kamis.push(new Kami());
}
setInterval(() => {
	kamis.forEach(kami => kami.update());
}, 1000 / 20);
