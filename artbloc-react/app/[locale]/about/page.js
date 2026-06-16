import SectionBox from "@/ui/section-box";
import ArtistCard from "@/ui/artist-card";

function About() {
  const aboutMissionText = [
    "Mission ▪",
    "Art Bloc vise à offrir un espace  aux artistes émergents par l’intermédiaire d’expositions temporaires à Montréal.",
    `Notre mission est de réduire les barrières d'accès au monde de l’art pour les artistes émergents et de leur offrir une visibilité. En proposant un espace d'exposition accessible, le projet aspire à démocratiser l'art local. 
    
    Nos évènements encouragent  les échanges entre les artistes et le public pour créer un environnement dynamique, propice pour tisser des liens au sein de la scène culturelle locale.`,
  ];

  const aboutMissionTextAddOn = [
    " w-full h-30 text-9xl ",
    " w-3/4 h-20 text-3xl font-bold ",
    " w-3/4 h-80 text-3xl ",
  ];

  const aboutHistoryText = [
    "Notre histoire ▪",
    "Notre engagement à nourrir la créativité",
    `Art Bloc est né en octobre 2024 d'une observation simple mais percutante : plusieurs jeunes artistes abandonnent progressivement leur pratique créative sous le poids des responsabilités personnelles et professionnelles. Sa fondatrice, elle-même artiste et thérapeute, a remarqué cette tendance parmi ses amis et collègues et a voulu créer un espace où ces talents pourraient renouer avec leur identité artistique.

Là où les musiciens on les open mics, les artistes auront Art Bloc. Nous cherchons à servir de pierre angulaire au parcours de tous ceux qui veulent donner une voix à l’artiste en eux.`,
  ];

  const aboutHistoryTextAddOn = [
    " w-full h-26 text-8xl text-[#f5ebd9] ",
    " w-full h-20 text-4xl text-[#f5ebd9] font-bold ",
    " w-full h-120 text-4xl text-[#f5ebd9] ",
  ];

  const artistText = [
    [
      "Louis-Vincent Poellhuber",
      "Communications",
      "Pixel art • Guitar • Vocals",
    ],
    ["Jennie Ming", "Art Coordinator", "Pixel art • Guitar • Vocals"],
    ["Nancy Zhu", "Art Coordinator", "Pixel art • Guitar • Vocals"],
    ["Helen Vuong", "Event Coordinator", "Pixel art • Guitar • Vocals"],
    ["Yu Xuan Zhao", "Curation/Design", "Pixel art • Guitar • Vocals"],
    ["Tian-Su Zhong", "Event Management", "Pixel art • Guitar • Vocals"],
  ];

  const artistTextAddOn = [
    ["bg-[#d57278]", "bg-[#d98187]"],
    ["bg-[#548b8c]", "bg-[#5c9899]"],
  ];

  const artistPics = [
    "/ABHomeLogo.png",
    "/ABHomeLogo.png",
    "/ABHomeLogo.png",
    "/ABHomeLogo.png",
    "/ABHomeLogo.png",
    "/ABHomeLogo.png",
  ];

  const artistLinks = [
    `/artists/artist/${artistText[0][0]}`,
    `/artists/artist/${artistText[1][0]}`,
    `/artists/artist/${artistText[2][0]}`,
    `/artists/artist/${artistText[3][0]}`,
    `/artists/artist/${artistText[4][0]}`,
    `/artists/artist/${artistText[5][0]}`,
  ];

  const artistInfo = [
    {
      name: artistText[0][0],
      attributes: artistText[0][2],
      picURL: artistPics[0],
    },
    {
      name: artistText[1][0],
      attributes: artistText[1][2],
      picURL: artistPics[1],
    },
    {
      name: artistText[2][0],
      attributes: artistText[2][2],
      picURL: artistPics[2],
    },
    {
      name: artistText[3][0],
      attributes: artistText[3][2],
      picURL: artistPics[3],
    },
    {
      name: artistText[4][0],
      attributes: artistText[4][2],
      picURL: artistPics[4],
    },
    {
      name: artistText[5][0],
      attributes: artistText[5][2],
      picURL: artistPics[5],
    },
  ];

  return (
    <div>
      <SectionBox
        role="aboutMission"
        text={aboutMissionText}
        textAddOn={aboutMissionTextAddOn}
      />

      <SectionBox role="aboutStaticPic" bgImg="bg-[url(/chungus.png)]" />

      <SectionBox
        role="aboutHistory"
        text={aboutHistoryText}
        textAddOn={aboutHistoryTextAddOn}
        img="/ABHomeLogo.png"
        imgAddOn="2025 Event pic"
        bgImg="bg-[#4d7b7f]"
      />

      <div className="relative flex flex-col w-screen ">
        <div className="relative flex w-full h-26 text-8xl mt-20 ml-15">
          Rencontrez-nous ▪
        </div>
        <div className="relative flex w-full h-12 justify-center items-center text-4xl mt-10 ">
          Conseil exécutif
        </div>
        <div className="relative grid grid-cols-4 gap-y-15 justify-items-center w-full min-h-screen mt-7 mb-15">
          <ArtistCard
            text={artistText[0]}
            textAddOn={artistTextAddOn[0]}
            img={artistPics[0]}
            imgAddOn={artistText[0][0]}
            link={artistLinks[0]}
            params={artistInfo[0]}
          />
          <ArtistCard
            text={artistText[1]}
            textAddOn={artistTextAddOn[0]}
            img={artistPics[1]}
            imgAddOn={artistText[1][0]}
            link={artistLinks[1]}
            params={artistInfo[1]}
          />
          <ArtistCard
            text={artistText[2]}
            textAddOn={artistTextAddOn[0]}
            img={artistPics[2]}
            imgAddOn={artistText[2][0]}
            link={artistLinks[2]}
            params={artistInfo[2]}
          />
          <ArtistCard
            text={artistText[3]}
            textAddOn={artistTextAddOn[0]}
            img={artistPics[3]}
            imgAddOn={artistText[3][0]}
            link={artistLinks[3]}
            params={artistInfo[3]}
          />

          <div className="relative flex w-full col-span-4 h-12 justify-center items-center text-4xl mt-10 ">
            Satellites
          </div>

          <ArtistCard
            text={artistText[4]}
            textAddOn={artistTextAddOn[1]}
            img={artistPics[4]}
            imgAddOn={artistText[4][0]}
            link={artistLinks[4]}
            params={artistInfo[4]}
          />
          <ArtistCard
            text={artistText[5]}
            textAddOn={artistTextAddOn[1]}
            img={artistPics[5]}
            imgAddOn={artistText[5][0]}
            link={artistLinks[5]}
            params={artistInfo[5]}
          />
        </div>
      </div>
    </div>
  );
}

export default About;
