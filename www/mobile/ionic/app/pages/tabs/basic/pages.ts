import {NavController, NavParams} from 'ionic-angular';
import {Page, ViewController, Platform} from 'ionic-angular';


@Page({
  templateUrl: './build/pages/tabs/basic/skills.html'
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
      '<ion-tab tabTitle="Circuits" [root]="tabTwo" tabBadge="5" tabBadgeStyle="primary"></ion-tab>' +
      '<ion-tab tabTitle="Skill Cards" [root]="tabOne" tabBadge="2" tabBadgeStyle="primary"></ion-tab>' +
      '<ion-tab tabTitle="Projects" [root]="tabThree"  tabBadge="9" tabBadgeStyle="secondary"></ion-tab>' +
    '</ion-tabs>',
})
export class BasicPage {
  tabOne = TabTextPage1;
  tabTwo = TabTextPage2;
  tabThree = TabTextPage3;
}


@Page({
  templateUrl: './build/pages/tabs/basic/skills.html'
})
export class TabTextPage1 { }

@Page({
  templateUrl: './build/pages/tabs/basic/circuits.html'
})
export class TabTextPage2 { }

@Page({
  templateUrl: './build/pages/tabs/basic/projects.html'
})
export class TabTextPage3 { }
