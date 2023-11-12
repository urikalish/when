import { Answer } from './answer';
import { Guess } from './guess';
import { Phase } from './phase';
import { Config } from './config';

export class Game {
	config: Config = new Config();
	startTime = Date.now();
	phase: Phase = Phase.GAME_INIT;
	answers: Answer[] = [];
	guesses: Guess[] = [];
	score = 100;
}
