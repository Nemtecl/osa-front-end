import Moment from "react-moment";
import { FaTrophy } from "react-icons/fa";

export default function Trophies(props: any) {
  const { data } = props;
  return (
    <div className="flex flex-row col-span-5">
      <div className="flex-none w-32 h-24">
        <div className="flex items-center justify-center w-32 h-20 rounded-3xl">
          <FaTrophy className="text-[#ffa41e] text-7xl z-60" />
        </div>
      </div>

      <div className="grow h-20 overflow-hidden ml-2">
        <div className="flex justify-between mb-2">
          <div className="grow font-bold text-slate-900 text-base overflow-hidden w-16">
            {data.name}
          </div>
          <div className="text-600 text-[#ffa41e] text-s pt-1 pl-2 overflow-hidden">
            <Moment date={data.created_at} format="DD/MM/YYYY" />
          </div>
        </div>
        <p className="text-gray-700 text-xs">{data.description}</p>
      </div>
    </div>
  );
}
