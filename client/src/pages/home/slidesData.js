import { Slide } from "../../hooks/useSlides";

export const slides = [
  new Slide({
    title: "Collection of matchups",
    body:
      "Do you need to know how to play a given matchup again? Then you can quickly go here and look into your notes and stats.",
    src: "/collection.png",
  }),
  new Slide({
    title: "Personalized notes",
    body:
      "You can write specific notes for your played matchup. A note can also contain tags, and you can mix many tags with each other for unique combinations of notes!",
    src: "/notes_new.png",
  }),
  new Slide({
    title: "Matchup statistics",
    body:
      "We will keep track of your wins and losses in a given matchup that way you can look back at how you've done.",
    src: "/progress.png",
  }),
  new Slide({
    title: "Select a matchup when in a game",
    body:
      "Leaguedex will know when you're in a game, and therefor we allow you to quickly select the matchup yourself.",
    src: "/match.png",
  }),
  new Slide({
    title: "Tracks your played matchups",
    body:
      "Didn't you have time, or did you forget to manually select the matchup? We do our best to track your played matchups.",
    src: "/notifications.png",
  }),
  new Slide({
    title: "Manually add matchups",
    body:
      "Do you just want to create matchups without playing a phyisical game? Then you can simply do so!",
    src: "/create.png",
  }),
  new Slide({
    title: "Share your matchups",
    body:
      "Do you want to help others? Then you can make your matchup public for others to view on your profile!",
    src: "/profile.png",
  }),
  new Slide({
    title: "Like matchups",
    body: "Matchups with the most likes will be displayed on the home page!",
    src: "/like.png",
  }),
  new Slide({
    title: "Use any account you want",
    body:
      "Do you have 20 smurfs? Then no worries! You can use them all. Do note we do not need any personal information to do so!",
    src: "/accounts.png",
  }),
];
