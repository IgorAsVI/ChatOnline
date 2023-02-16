import { LightningElement,api } from 'lwc';
import {subscribe,onError} from 'lightning/empApi';
import Id from '@salesforce/user/Id';

export default class ListenEvent extends LightningElement {
    channelName = '/event/ChatOnlineMsg__e';
    @api addEvent = event => {
        console.log('Escutou');
    };
    
    connectedCallback(){
        console.log('Iniciou o ouvinte');
        this.registerErrorListener();

        const self = this;

        window.addEventListener("message", (message) => {
             this.sendEventToParent(this,message.data.data.payload.BodyMessage__c);
             console.log('para ver se chega aqui ainda');
          });

        const msgEvent = function(response){
            console.log(JSON.stringify(response));
          try{
              if(1 == 1){
                self.sendEventToParent(self,response.data.payload.BodyMessage__c);
              }else{
                console.log('Chegou uma msg mas n para vc');
              }
          }catch(e){
             
              console.log(e.message);
              console.log(JSON.stringify(e));
          }
      }

       subscribe(this.channelName,-1,msgEvent).then((response) =>{
            
       });
      
    }

    sendEventToParent(self,bodyMsgTxt){
        self.dispatchEvent(new CustomEvent('listenevent', {
            detail: {IsRemetente: false,
                     bodyMsg : bodyMsgTxt } 
            }));
    }

    registerErrorListener() {
        onError((error) => {
            console.log('Received error from server: ', JSON.stringify(error));
        });
    }
}