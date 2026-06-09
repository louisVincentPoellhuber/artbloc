"use client";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

function Artist() {
  const artistParams = useSearchParams();

  const name = artistParams.get("name");
  const attributes = artistParams.get("attributes");
  const picURL = artistParams.get("picURL");

  let component = (
    <div className="relative flex flex-col w-screen min-h-screen ml-15">
      <div className="relative flex w-full h-26 text-8xl mt-40 ">{name}</div>
      <div className="relative flex w-full h-14 text-xl mt-5 ">
        {attributes}
      </div>
      <div className="relative flex">
        <Image src={picURL} width={400} height={400} alt={name} />
      </div>
    </div>
  );
  return component;
}

export default Artist;
