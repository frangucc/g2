import {Page, Platform, NavController} from 'ionic-angular';


@Page({
    templateUrl: './build/pages/slides/basic/template.html'
})
export class BasicPage {


  startGamifyed() {
  }

  slides = [
    {
      title: "Open your first Pack!",
      description: "Complete circuits and their coding to earn your skills cards, packs and parts.",
      image: "img/pack-test2.png",
    },
    {
      title: "Read the Chapter",
      description: "Read up on the science and technology origins of the pack, code and hardware.",
      image: "img/book-slide.png",
    },
    {
      title: "Test your Circuits",
      description: "Follow along and complete the circuits. Check in your work and get ranked.",
      image: "img/circuits.png",
    },
    {
      title: "Earn Skill Cards",
      description: "Rise from 'Newb' to 'Guru' by earning skill cards. Rise from a newb to guru.",
      image: "img/cards.png",
    }
    
  ];
}
