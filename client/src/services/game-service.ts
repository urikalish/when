import { Game } from '../model/game';
import { Phase } from '../model/phase';
import { answers } from '../data/answers';
import { Guess } from '../model/guess';
import { CommonService } from './common-service';
// import { AnalyticsService, AnalyticsAction, AnalyticsCategory } from './analytics-service';
import { UiService } from './ui-service';
import { Action } from '../model/action';

export class GameService {
	static game: Game = new Game();

	static goPhaseGameInit() {
		// AnalyticsService.sendEvent(AnalyticsCategory.GAME_PHASE, AnalyticsAction.GAME_PHASE_GAME_STARTED);
	}

	static goPhaseUserGuess() {
		const game = GameService.game;
		const answer = game.answers[game.guesses.length];
		const guess = new Guess();
		game.guesses.push(guess);
		UiService.updateImageSource(`img/${answer.src}`);
	}

	static goPhase(phase: Phase) {
		GameService.game.phase = phase;
		UiService.markGamePhase(phase);
		if (phase === Phase.GAME_INIT) {
			GameService.goPhaseGameInit();
		} else if (phase === Phase.USER_GUESS) {
			GameService.goPhaseUserGuess();
		}
	}

	static handleAction(action: Action, value: string) {
		if (action === Action.CHANGE_YEAR_SELECTOR) {
			UiService.updateSubmitButtonText(value);
		} else if (action === Action.SUBMIT_GUESS) {
			alert(value);
		}
	}

	static init() {
		const game = GameService.game;
		UiService.init(GameService.handleAction);
		GameService.goPhase(Phase.GAME_INIT);
		game.answers = CommonService.shuffleArray([...answers]);
	}

	static start() {
		const game = GameService.game;
		game.startTime = Date.now();
		GameService.goPhase(Phase.USER_GUESS);
	}
}
