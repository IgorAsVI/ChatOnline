import { LightningElement } from 'lwc';
import Id from '@salesforce/user/Id';



export default class MsgChat extends LightningElement {
    msgs = [];
    txtMsg = '';
    
    connectedCallback(){
      
      console.log('antes daqui');
      console.log(Id);
  
      window.addEventListener("message", (message) => {
        console.log('ta escutando');
      });
    }

    postMessageinScreen(input){
      
      var bodyMsg = input.detail.bodyMsg;
      var IsRemetente = input.detail.IsRemetente;
      console.log(JSON.stringify(input));
        try{
          var teste = this.msgs;
          teste.push({
            user: 'igor Assis',
                body: bodyMsg,
                id: Math.random() + 1,
                remetente : IsRemetente
          })
          this.msgs = [];
          this.msgs = teste;
          console.log(JSON.stringify(this.msgs));
          return this.msgs;
        }catch(e){
          console.log(e.message);
          console.log(JSON.stringify(e));
        }
      }

    async handleEnter(event){
      if(event.keyCode === 13){
        if(this.txtMsg != ''){
          var input = { detail :{
            IsRemetente: true,
            bodyMsg : this.txtMsg
          }
          }
          await this.postMessageinScreen(input);
          this.txtMsg ='';
          const ContainerMsgs = this.template.querySelector('[data-id="ContainerMsgs"]');
          const divsMsgs = this.template.querySelectorAll('.Msgs');
          divsMsgs[(divsMsgs.length - 1)].scrollIntoView(false);
          console.log(divsMsgs[(divsMsgs.length - 1)]);

        }
        
      }else{
          this.txtMsg = event.target.value;
      }
      }

    }