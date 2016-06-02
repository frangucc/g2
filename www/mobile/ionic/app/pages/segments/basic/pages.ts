import {Page, Platform, ActionSheet, NavController} from 'ionic-angular';


@Page({
  templateUrl: './build/pages/segments/basic/template.html'
})
export class BasicPage {
  pack: string = "mypacks";
  isAndroid: boolean = false;

  constructor(public platform: Platform, public nav: NavController) { }
  openPack() { 
    window.open("/#/slides/basic", "_system");
  }
  openMenu() {
    let actionSheet = ActionSheet.create({
      title: 'Albums',
      buttons: [
        {
          text: 'SMS',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'trash' : null,
          handler: () => {
            console.log('Delete clicked');
          }
        },
        {
          text: 'Email',
          icon: !this.platform.is('ios') ? 'share' : null,
          handler: () => {
            console.log('Share clicked');
          }
        },
        {
          text: 'Facebook',
          icon: !this.platform.is('ios') ? 'arrow-dropright-circle' : null,
          handler: () => {
            console.log('Play clicked');
          }
        },
        {
          text: 'Twitter',
          icon: !this.platform.is('ios') ? 'heart-outline' : null,
          handler: () => {
            console.log('Favorite clicked');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel', // will always sort to be on the bottom
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    this.nav.present(actionSheet);
  }
}
