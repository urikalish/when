import { Answer } from './answer';
import { Guess } from './guess';
import { Phase } from './phase';

export class Game {
	startTime = Date.now();
	phase: Phase = Phase.GAME_INIT;
	answers: Answer[] = [];
	guesses: Guess[] = [];
}
