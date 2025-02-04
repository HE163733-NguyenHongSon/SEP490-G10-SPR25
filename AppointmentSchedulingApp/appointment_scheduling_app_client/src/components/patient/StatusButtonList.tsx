import React, { FC } from "react";

interface Status {
  name: string;
  number: number | undefined;
}

interface StatusListProps {
  statusList: Status[];
}

const FilterButtonList: FC<StatusListProps> = ({ statusList }) => {
  return (
    <div className="flex flex-row items-center justify-start   ">
      {statusList.map((status) => (
        <button
          key={status.name}
          className="px-6 py-1 m-4 text-#635F5F  rounded-full hover:bg-cyan-600 hover:text-white flex  items-center justify-start min-w-fit  gap-4 border border-gray-300 shadow-md "
        >
          {status.name}({status.number})
        </button>
      ))}
    </div>
  );
};

export default FilterButtonList;
