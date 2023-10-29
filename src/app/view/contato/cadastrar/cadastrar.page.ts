import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Computadores } from 'src/app/model/entity/Computadores';
import { FirebaseService } from 'src/app/model/service/firebase.service';
//import { Alert } from 'src/app/common/Alert';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
})
export class CadastrarPage implements OnInit {
  public categoria!: string;
  public processador!: string;
  public placaVideo!: string;
  public memoriaRam!: string;
  public armazenamento!: number;
  public imagem: any;
  public alert!: AlertController;

  constructor(
    //private alertController: Alert,
    private router: Router,
    private firebase: FirebaseService
  ) {}

  ngOnInit() {}

  uploadFile(imagem: any) {
    this.imagem = imagem.files;
  }

  cadastrar() {
    if (this.categoria && this.processador) {
      let novo: Computadores = new Computadores(
        this.categoria,
        this.processador
      );
      novo.placaVideo = this.placaVideo;
      novo.memoriaRam = this.memoriaRam;
      novo.armazenamento = this.armazenamento;

      if (this.imagem) {
        this.firebase.uploadImage(this.imagem, novo)?.then(() => {
          this.router.navigate(['/home']);
        });
      } else {
        this.firebase
          .cadastrar(novo)
          .then(() => this.router.navigate(['/home']))
          .catch((error) => {
            console.log(error);
            //this.alertController.presentAlert('Error', 'Error ao salvar o Computador')
          });
      }
    } else {
      //this.alertControlle.presentAlert('error', 'Categoria e processador é obrigatorio')
    }
  }

  voltar() {
    this.router.navigate(['/home']);
  }
}
