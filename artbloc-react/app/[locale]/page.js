import SectionBox from "@/ui/section-box";

function Home() {
  const homeEventBubblesText = [
    "Édition 2026 ▪",
    "Novembre 2026",
    "Montreal",
    "GRATUIT",
    "Billets",
    "Musique",
    "Sculpture",
    "Peinture",
    "Art digital",
    "Dessin",
    "Installations",
    "Nourriture",
    "Voir tous nos événements >",
  ];
  const homeEventBubblesTextAddOn = [
    " w-180 h-26 text-8xl text-[#f5ebd9] ",
    " w-80 h-28 text-4xl text-[#f5ebd9] ",
    " w-1/4 h-1/10 bg-[#f5ebd9] ",
    " text-3xl ",
    " w-115 h-12 text-4xl text-[#f5ebd9] ",
  ];
  const homeEventBubblesLink = [
    "https://www.eventbrite.ca/e/pop-up-exhibition-fragments-of-us-tickets-1467377809529?utm-campaign=social&utm-content=attendeeshare&utm-medium=discovery&utm-term=listing&utm-source=cp&aff=ebdsshcopyurl",
    "/events",
  ];

  const homeArtistCarouselText = ["Nos artistes ▪", "Voir tous nos artistes >"];
  const homeArtistCarouselTextAddOn = [
    " w-180 h-26 text-8xl ",
    " w-100 h-12 text-4xl text-[#f5ebd9] ",
  ];
  const homeInvolvementText = [
    "Impliquez-vous!",
    [
      "Joindre en tant qu’artiste",
      "Les artistes sont au coeur de notre projet. Incrivez-vous pour discuter des possibilités de participer à un de nos prochains évènements.",
    ],
    [
      "Inscrivez-vous à notre infolettre",
      "Rejoignez notre communauté et restez à jour de toutes les nouvelles de Art Bloc!",
    ],
    [
      "Contribuer à notre mission",
      "Vos contributions nous aident à pérenniser notre organisme et à toucher un public plus large grâce à l'art. Chaque don compte pour bâtir une communauté artistique inclusive.",
    ],
  ];
  const homeInvolvementTextAddOn = [
    " w-full h-30 text-8xl ",
    " w-full h-28 text-3xl ",
    " w-7/8 h-40 text-lg",
  ];
  //need actual links
  const homeInvolvementLink = [
    "/contact",
    "mailto:artbloc@outlook.com",
    "/contact",
  ];
  const homeInvolvementBg = ["bg-[#d57278]", "bg-[#e8998d]"];

  return (
    <div>
      <SectionBox
        role="homeStaticPic"
        text="Expositions éphémères à but non lucratif où l'art et la communauté se rencontrent"
        textAddOn=" w-140 h-22 text-3xl text-white text-center"
        img="/ABHomeLogo.png"
        imgAddOn="home AB logo"
        bgImg="bg-[url(/ABBannerTemp.jpg)]"
      />

      <SectionBox
        role="homeABDesc"
        text="Art Bloc est une description bien claire, orientée vers la communauté, le bloc, etc."
        textAddOn=" w-screen h-screen text-7xl text-center "
      />

      <SectionBox
        role="homeEventBubbles"
        text={homeEventBubblesText}
        textAddOn={homeEventBubblesTextAddOn}
        link={homeEventBubblesLink}
        bgImg="bg-[#586744]"
      />

      <SectionBox
        role="homeArtistCarousel"
        text={homeArtistCarouselText}
        textAddOn={homeArtistCarouselTextAddOn}
        link="/artists"
        bgImg="bg-[#ef8678]"
      />

      <SectionBox
        role="homeInvolvement"
        text={homeInvolvementText}
        textAddOn={homeInvolvementTextAddOn}
        link={homeInvolvementLink}
        bgImg={homeInvolvementBg}
      />
    </div>
  );
}

export default Home;
