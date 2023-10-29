import { AlertController } from "@ionic/angular";

export class Alert{
  constructor(private alertController: AlertController){

  }

  async presentAlert( subHeader : string, message : string ){
    const alert = await this.alertController.create({
      header: 'Cadastro de Computadores',
      subHeader : subHeader,
      message : message,
      buttons : ['OK']
    })
    await alert.present()
  }
}

