import React from "react";
import Moment from "react-moment";

export default function ArtworkProposal(props: any) {
  const { data } = props;
  // console.log(data);
  return (
    <div className="flex flex-row col-span-5">
      <div className="w-32 h-24">
        {data.pictures[0] && (
          <img
            className="object-cover justify-self-center self-center w-32 h-24 rounded-3xl"
            src={`./../${process.env.REACT_APP_IMAGES_PATH}${data.pictures[0].url}`}
            alt="Failed to load"
          />
        )}
      </div>
      <div className="w-44 h-20 overflow-hidden pl-2">
        <div className="flex flex-row justify-between mb-2">
          <div className="font-bold text-slate-900 text-md overflow-hidden w-24">
            {data.title}
          </div>
          <div className="text-sky-600 text-xs pt-1 overflow-hidden">
            <Moment date={data.created_at} format="DD/MM/YYYY" />
          </div>
        </div>
        <p className="text-gray-700 text-xs">{data.description}</p>
      </div>
    </div>
  );
}