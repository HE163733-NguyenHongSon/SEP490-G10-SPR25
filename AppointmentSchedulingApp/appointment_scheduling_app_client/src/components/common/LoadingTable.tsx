import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; 

export const LoadingTable = () => (
    <table className="w-full   border-separate   border border-gray-300 rounded-md " >
      <thead>
        <tr>
          <th className="p-2 border-b"><Skeleton width="100%" /></th>
          <th className="p-2 border-b"><Skeleton width="100%" /></th>
          <th className="p-2 border-b"><Skeleton width="100%" /></th>
          <th className="p-2 border-b"><Skeleton width="100%" /></th>
          <th className="p-2 border-b"><Skeleton width="100%" /></th>
        </tr>
      </thead>
      <tbody>
        {Array(4).fill(0).map((_, index) => (
          <tr key={index}>
            <td className="p-2 border-b"><Skeleton width="100%" height={80} /></td>
            <td className="p-2 border-b"><Skeleton width="100%" height={80} /></td>
            <td className="p-2 border-b"><Skeleton width="100%" height={80} /></td>
            <td className="p-2 border-b"><Skeleton width="100%" height={80} /></td>
            <td className="p-2 border-b"><Skeleton width="100%" height={80} /></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
  
