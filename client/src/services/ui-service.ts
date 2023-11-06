export class UiService {
	static setWidthAndHeight() {
		document.documentElement.style.setProperty('--main-height', `${window.innerHeight}px`);
		document.documentElement.style.setProperty('--main-width', `${window.innerWidth}px`);
	}

	static createUI(/*onHandleAction*/) {}

	static markGamePhase(phase) {
		document.body.setAttribute('data-phase', phase);
	}

	static updateImageSource(src) {
		const imgElm = document.getElementById('image');
		if (imgElm) {
			imgElm.setAttribute('src', src);
		}
	}

	static init(/*onHandleAction*/) {
		window.addEventListener('resize', UiService.setWidthAndHeight);
		UiService.setWidthAndHeight();
		this.createUI(/*onHandleAction*/);
	}
}
