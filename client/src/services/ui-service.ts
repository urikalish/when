import { Action } from '../model/action';

export class UiService {
	static setWidthAndHeight() {
		document.documentElement.style.setProperty('--main-height', `${window.innerHeight}px`);
		document.documentElement.style.setProperty('--main-width', `${window.innerWidth}px`);
	}

	static createUI(onHandleAction) {
		const inputElm = document.getElementById('year-selector');
		inputElm?.addEventListener('input', event => {
			onHandleAction(Action.CHANGE_YEAR_SELECTOR, (event.target as HTMLInputElement).value);
		});
		const submitElm = document.getElementById('submit-button');
		submitElm?.addEventListener('click', () => {
			onHandleAction(Action.SUBMIT_GUESS, (inputElm as HTMLInputElement)?.value);
		});
	}

	static markGamePhase(phase) {
		document.body.setAttribute('data-phase', phase);
	}

	static updateImageSource(src) {
		const imgElm = document.getElementById('image');
		if (imgElm) {
			imgElm.setAttribute('src', src);
		}
	}

	static updateSubmitButtonText(text) {
		const btnElm = document.getElementById('submit-button');
		if (btnElm) {
			btnElm.textContent = text;
		}
	}

	static init(onHandleAction) {
		window.addEventListener('resize', UiService.setWidthAndHeight);
		UiService.setWidthAndHeight();
		this.createUI(onHandleAction);
	}
}
