import { Game } from '../model/game';
import { Phase } from '../model/phase';
import { answers } from '../data/answers';
import { Guess } from '../model/guess';
import { CommonService } from './common-service';
import { UiService } from './ui-service';
// import { AnalyticsService, AnalyticsAction, AnalyticsCategory } from './analytics-service';

export class GameService {
	static game: Game = new Game();

	static setPhase(phase: Phase) {
		GameService.game.phase = phase;
		UiService.markGamePhase(phase);
	}

	static goUserGuess() {
		GameService.setPhase(Phase.USER_GUESS);
		const game = GameService.game;
		const answer = game.answers[game.guesses.length];
		const guess = new Guess();
		game.guesses.push(guess);
		UiService.updateImageSource(`img/${answer.img}`);
	}

	static handleChangeYearSelection(value: number) {
		const game = GameService.game;
		const guess = game.guesses[game.guesses.length - 1];
		guess.year = value;
		UiService.updateSubmitButtonText(value);
	}

	static handleClickSubmit() {
		const game = GameService.game;
		const index = game.guesses.length - 1;
		const guess = game.guesses[index];
		guess.endTime = Date.now();
		UiService.showAnswer(game.answers[index]);
		GameService.setPhase(Phase.SHOW_ANSWER);
	}

	static handleClickNext() {
		const game = GameService.game;
		if (game.guesses.length === game.answers.length) {
			GameService.setPhase(Phase.GAME_END);
		} else {
			GameService.goUserGuess();
		}
	}

	static init() {
		UiService.init(GameService.handleChangeYearSelection, GameService.handleClickSubmit, GameService.handleClickNext);
		GameService.game.answers = CommonService.shuffleArray([...answers]);
		GameService.setPhase(Phase.GAME_INIT);
		// AnalyticsService.sendEvent(AnalyticsCategory.GAME_PHASE, AnalyticsAction.GAME_PHASE_GAME_STARTED);
	}

	static start() {
		GameService.game.startTime = Date.now();
		GameService.goUserGuess();
	}
}
