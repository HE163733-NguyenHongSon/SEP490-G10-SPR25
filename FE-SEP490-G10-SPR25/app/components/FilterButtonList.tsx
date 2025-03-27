import React, { FC } from "react";
import { memo } from "react";

interface T {
  name: string;
  count: number | undefined;
}

interface ItemList {
  itemList: T[];
  onFilterSelect: (filter: string) => void;
  selectedItem: string;
}

const FilterButtonList: FC<ItemList> = ({
  itemList,
  onFilterSelect,
  selectedItem,
}) => {
  return (
    <div className="flex flex-row flex-wrap ">
      {itemList.map((item) => (
        <button
          key={item.name}
          onClick={() => onFilterSelect(item.name)}
          className={`${selectedItem===item.name?'bg-cyan-500 text-white':''} px-4 py-1 mx-2 my-4 text-#635F5F rounded-full hover:bg-cyan-500 hover:text-white flex items-center justify-start min-w-fit gap-4 border border-gray-300 shadow-md`}
        >
          {item.name}({item.count ?? 0})
        </button>
      ))}
    </div>
  );
};

export default memo(FilterButtonList);
