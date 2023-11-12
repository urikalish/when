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
		const game = GameService.game;
		game.phase = phase;
		UiService.markGamePhase(phase);
	}

	static updateScore() {
		const game = GameService.game;
		const index = game.guesses.length - 1;
		const guess = game.guesses[index];
		const answer = game.answers[index];
		const maxScorePerGuess = game.config.maxScore / game.answers.length;
		const maxDistance = Math.max(Math.abs(guess.year - game.config.yearMin), Math.abs(guess.year - game.config.yearMax));
		const curDistance = Math.abs(answer.year - guess.year);
		const distanceFraction = curDistance / maxDistance;
		game.score -= distanceFraction * maxScorePerGuess;
		//alert(game.score);
	}

	static goUserGuess() {
		const game = GameService.game;
		GameService.setPhase(Phase.USER_GUESS);
		const answer = game.answers[game.guesses.length];
		const guess = new Guess();
		game.guesses.push(guess);
		UiService.updateImageSource(`img/${answer.img}`);
	}

	static handleClickSubmit(year: number) {
		const game = GameService.game;
		const index = game.guesses.length - 1;
		const guess = game.guesses[index];
		guess.endTime = Date.now();
		guess.year = year;
		UiService.showAnswer(game.answers[index], game.answers.length - game.guesses.length);
		GameService.setPhase(Phase.SHOW_ANSWER);
		GameService.updateScore();
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
		const game = GameService.game;
		UiService.init(game.config, GameService.handleClickSubmit, GameService.handleClickNext);
		game.answers = CommonService.shuffleArray([...answers]);
		GameService.setPhase(Phase.GAME_INIT);
		// AnalyticsService.sendEvent(AnalyticsCategory.GAME_PHASE, AnalyticsAction.GAME_PHASE_GAME_STARTED);
	}

	static start() {
		const game = GameService.game;
		game.guesses = [];
		game.score = game.config.maxScore;
		game.startTime = Date.now();
		GameService.goUserGuess();
	}
}
