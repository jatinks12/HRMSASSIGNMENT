import { makeAutoObservable } from "mobx";


class FormStore{
  
  formStatus:boolean=false;
  constructor(){
    makeAutoObservable(this)
  }
 
  handleFormCancel(){  
    this.formStatus=false;
  }

  setFormStatus(){
    this.formStatus=true;
  }
}
let formstore = new FormStore();
export default formstore;