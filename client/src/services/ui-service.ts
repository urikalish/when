import { Answer } from '../model/answer';

export class UiService {
	static setWidthAndHeight() {
		document.documentElement.style.setProperty('--main-height', `${window.innerHeight}px`);
		document.documentElement.style.setProperty('--main-width', `${window.innerWidth}px`);
	}

	static createUI(onChangeYearSelection, onClickSubmit, onClickNext) {
		const rangeInputElm = document.getElementById('year-selector');
		rangeInputElm?.addEventListener('input', () => {
			const strYear = (rangeInputElm as HTMLInputElement)?.value;
			if (strYear) {
				onChangeYearSelection(parseInt(strYear));
			}
		});
		const submitBtnElm = document.getElementById('submit-button');
		submitBtnElm?.addEventListener('click', () => {
			const strYear = (rangeInputElm as HTMLInputElement)?.value;
			if (strYear) {
				onClickSubmit(parseInt(strYear));
			}
		});
		const nextBtnElm = document.getElementById('next-button');
		nextBtnElm?.addEventListener('click', () => {
			onClickNext();
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

	static showAnswer(answer: Answer) {
		const yearElm = document.getElementById('answer-year');
		if (yearElm) {
			yearElm.textContent = answer.year.toString();
		}
		const titleElm = document.getElementById('answer-title');
		if (titleElm) {
			titleElm.textContent = answer.title.toString();
		}
		const infoElm = document.getElementById('answer-info');
		if (infoElm) {
			infoElm.textContent = answer.info.toString();
		}
	}

	static init(onChangeYearSelection, onClickSubmit, onClickNext) {
		window.addEventListener('resize', UiService.setWidthAndHeight);
		UiService.setWidthAndHeight();
		this.createUI(onChangeYearSelection, onClickSubmit, onClickNext);
	}
}
