import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/index';

@Injectable({
  providedIn: 'root'
})

export class WebsocketService {

  	ws: WebSocket;
  	messageToServer;

    createObservableSocket(url:string):Observable<any>{

        this.ws = new WebSocket(url);

        return new Observable(
          	observer => {

	            this.ws.onmessage = (event) => observer.next(event.data);

	            this.ws.onerror = (event) => observer.error(event);

	            this.ws.onclose = (event) => observer.complete();

        	}
     	);
    }

    sendMessage(message: String){
    	this.messageToServer = message;
    	this.ws.onopen = (evt) => this.ws.send(this.messageToServer);
    }

    closeConnection(){
    	this.ws.close();
    }
}
