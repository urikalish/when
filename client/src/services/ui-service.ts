import { Answer } from '../model/answer';
import { Config } from '../model/config';

export class UiService {
	static setWidthAndHeight() {
		document.documentElement.style.setProperty('--w', `${window.innerWidth}px`);
		document.documentElement.style.setProperty('--h', `${window.innerHeight}px`);
	}

	static createUI(config: Config, onClickSubmit, onClickNext) {
		const rangeInputElm = document.getElementById('year-selector');
		if (rangeInputElm) {
			rangeInputElm.setAttribute('min', config.yearMin.toString());
			rangeInputElm.setAttribute('max', config.yearMax.toString());
			rangeInputElm.setAttribute('value', config.yearDefault.toString());
			rangeInputElm.addEventListener('input', () => {
				const strYear = (rangeInputElm as HTMLInputElement)?.value;
				if (strYear) {
					const btnElm = document.getElementById('submit-button');
					if (btnElm) {
						btnElm.textContent = strYear;
					}
				}
			});
		}
		const submitBtnElm = document.getElementById('submit-button');
		if (submitBtnElm) {
			submitBtnElm.textContent = config.yearDefault.toString();
			submitBtnElm.addEventListener('click', () => {
				const strYear = (rangeInputElm as HTMLInputElement)?.value;
				if (strYear) {
					onClickSubmit(parseInt(strYear));
				}
			});
		}
		const nextBtnElm = document.getElementById('next-button');
		if (nextBtnElm) {
			nextBtnElm.addEventListener('click', () => {
				onClickNext();
			});
		}
	}

	static markGamePhase(phase: string) {
		document.body.setAttribute('data-phase', phase);
	}

	static updateImageSource(imgSrc: string) {
		const imgElm = document.getElementById('image');
		if (imgElm) {
			imgElm.setAttribute('src', imgSrc);
		}
	}

	static showAnswer(answer: Answer, moreCount: number) {
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
		const moreCountElm = document.getElementById('more-count');
		if (moreCountElm) {
			if (moreCount > 1) {
				moreCountElm.textContent = 'עוד ' + moreCount.toString() + ' שאלות';
			} else if (moreCount === 1) {
				moreCountElm.textContent = 'עוד שאלה אחת';
			} else {
				moreCountElm.textContent = '';
			}
		}
		const nextBtnElm = document.getElementById('next-button');
		if (nextBtnElm) {
			nextBtnElm.textContent = moreCount > 0 ? 'הבא' : 'סיום';
		}
	}

	static showScore(score: number) {
		const scoreElm = document.getElementById('score');
		const scoreNumberElm = document.getElementById('score-number');
		if (scoreNumberElm) {
			scoreNumberElm.textContent = score.toString();
		}
		const scoreTextElm = document.getElementById('score-text');
		if (scoreTextElm) {
			if (score >= 95) {
				scoreTextElm.textContent = 'מעולה!!!';
			} else if (score >= 90) {
				scoreTextElm.textContent = 'טוב מאוד!!';
			} else if (score >= 85) {
				scoreTextElm.textContent = 'כמעט טוב מאוד!';
			} else if (score >= 75) {
				scoreTextElm.textContent = 'טוב';
			} else if (score >= 65) {
				scoreTextElm.textContent = 'כמעט טוב';
			} else if (score >= 60) {
				scoreTextElm.textContent = 'מספיק';
			} else {
				scoreTextElm.textContent = 'נכשל';
			}
			if (scoreElm) {
				if (score >= 85) {
					scoreElm.classList.add('success');
				} else if (score < 60) {
					scoreElm.classList.add('failure');
				}
			}
		}
	}

	static init(config: Config, onClickSubmit: (year: number) => void, onClickNext: () => void) {
		window.addEventListener('resize', UiService.setWidthAndHeight);
		UiService.setWidthAndHeight();
		this.createUI(config, onClickSubmit, onClickNext);
	}
}
