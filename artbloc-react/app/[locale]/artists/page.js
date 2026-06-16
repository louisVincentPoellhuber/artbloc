import ArtistCard from "@/ui/artist-card";

function Artists() {
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
    <div className="relative flex flex-col w-screen ">
      <div className="relative flex w-full h-26 text-8xl mt-40 ml-15">
        Nos artistes ▪
      </div>
      <div className="relative grid grid-cols-4 gap-y-15 justify-items-center w-full min-h-screen mt-15 mb-15">
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
  );
}

export default Artists;
