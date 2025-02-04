import React, { FC } from "react";

interface T {
  name: string;
  count: number | undefined;
}

interface ItemList {
  itemList: T[]; 
}

const FilterButtonList: FC<ItemList> = ({ itemList }) => {
  return (
    <div className="flex flex-row items-center justify-start">
      {itemList.map((item) => (
        <button
          key={item.name}
          className="px-6 py-1 m-4 text-#635F5F rounded-full hover:bg-cyan-600 hover:text-white flex items-center justify-start min-w-fit gap-4 border border-gray-300 shadow-md"
        >
          {item.name}({item.count ?? 0}) 
        </button>
      ))}
    </div>
  );
};

export default FilterButtonList;
