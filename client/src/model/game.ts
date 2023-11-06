import { Answer } from './answer';
import { Guess } from './guess';

export enum Phase {
	GAME_INIT = 'game-init',
	USER_GUESS = 'user-guess',
	SHOW_ANSWER = 'show-answer',
	GAME_END = 'game-end',
}

export class Game {
	startTime = Date.now();
	phase: Phase = Phase.GAME_INIT;
	answers: Answer[] = [];
	guesses: Guess[] = [];
}
