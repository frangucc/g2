import {IonicApp, Page} from 'ionic-angular';


@Page({
    templateUrl: './build/pages/lists/chapters/template.html'
})
export class ChaptersPage { 
  constructor(app: IonicApp) {
    app.getComponent('leftMenu').enable(true);
  }
}


