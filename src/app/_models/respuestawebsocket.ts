import { FingersResults } from '../_models/fingersresults';

export class RespuestaWebSocket{

	Maker : string;
	Device : string;
	CaptureSeq : string;
	IsSuccess : boolean;
	Description : string;
	FingersResults : FingersResults[];

}