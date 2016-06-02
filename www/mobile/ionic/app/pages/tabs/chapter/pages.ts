import {NavController, NavParams} from 'ionic-angular';
import {Page, ViewController, Platform} from 'ionic-angular';


@Page({
  templateUrl: './build/pages/tabs/chapter/skills.html'
})
class TabTextPage {
  isAndroid: boolean = false;

  constructor(platform: Platform) {
    this.isAndroid = platform.is('android');
  }
}

@Page({
  template:
    '<ion-tabs class="tabs-basic">' +
      '<ion-tab tabTitle="Skill Cards" [root]="tabOne"></ion-tab>' +
      '<ion-tab tabTitle="Circuits" [root]="tabTwo"></ion-tab>' +
      '<ion-tab tabTitle="Projects" [root]="tabThree"></ion-tab>' +
    '</ion-tabs>',
})
export class ChapterPage {
  tabOne = TabTextPage1;
  tabTwo = TabTextPage2;
  tabThree = TabTextPage3;
}


@Page({
  templateUrl: './build/pages/tabs/chapter/skills.html'
})
export class TabTextPage1 { }

@Page({
  templateUrl: './build/pages/tabs/chapter/circuits.html'
})
export class TabTextPage2 { }

@Page({
  templateUrl: './build/pages/tabs/chapter/projects.html'
})
export class TabTextPage3 { }
