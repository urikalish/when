import { Answer } from '../model/answer';

export class UiService {
	static setWidthAndHeight() {
		document.documentElement.style.setProperty('--w', `${window.innerWidth}px`);
		document.documentElement.style.setProperty('--h', `${window.innerHeight}px`);
		document.documentElement.style.setProperty('--u', `${window.innerHeight / 100}px`);
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

	static updateImageSource(imgSrc) {
		const imgElm = document.getElementById('image');
		if (imgElm) {
			imgElm.setAttribute('src', imgSrc);
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
			infoElm.replaceChildren();
			answer.info.forEach(i => {
				const infoSectionElm = document.createElement('p');
				infoSectionElm.textContent = i;
				infoSectionElm.classList.add('answer-info-section');
				infoElm.appendChild(infoSectionElm);
			});
		}
		const linkElm = document.getElementById('answer-link');
		if (linkElm) {
			linkElm.setAttribute('href', answer.link);
		}
	}

	static init(onChangeYearSelection, onClickSubmit, onClickNext) {
		window.addEventListener('resize', UiService.setWidthAndHeight);
		UiService.setWidthAndHeight();
		this.createUI(onChangeYearSelection, onClickSubmit, onClickNext);
	}
}
