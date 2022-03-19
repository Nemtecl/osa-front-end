import React from "react";

export default function ArtworkSearchCard(props: any) {
  const { data } = props;

  return (
    <div className="flex flex-row col-span-5">
      <div className="flex-none w-28 h-24">
        {data?.pictures[0] && (
          <img
            className="object-cover justify-self-center self-center w-32 h-24 rounded-3xl"
            src={`./../${process.env.REACT_APP_IMAGES_PATH}${data.pictures[0].url}`}
            alt="Failed to load"
          />
        )}
      </div>
      <div className="grid place-content-evenly overflow-hidden ml-3">
        <div className="font-bold text-slate-900 text-base overflow-hidden">
          {data?.title}
        </div>
        <p className="text-gray-700 text-xs">
          {data?.address}, {data?.city}
        </p>
      </div>
    </div>
  );
}