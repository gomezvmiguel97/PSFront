import {ImagenesPuc} from '../_models/imagenespuc';

export class BusquedaBiometricaResponse{

	nombre : string;
	apellidoPat : string;
	apellidoMat : string;
	idBiometrico: string;
	rfc : string;
	curp : string;
	imagenes: ImagenesPuc[];
	estatus: number;
	mensaje: string;
}