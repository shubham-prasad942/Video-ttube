import { Link } from "react-router-dom";
import { links } from "../SidebarCont";

const Category = () => {
  return (
    <div id="special" className="flex gap-1.5 px-1 m-3 overflow-x-auto sm:hidden">
      {links.map((elem, index) => {
        return (
          <div key={index} className="bg-gray-400 rounded-full px-3 py-1 flex items-center flex-shrink-0">
            <Link
              key={index}
              to={elem.path}
              className="rounded-md text-sm font-medium hover:bg-gray-100 transition text-[#374151] flex gap-1"
            >
              <img
                src={elem.image}
                alt={elem.name}
                className="w-5 h-5 sm:w-6 sm:h-6 object-contain "
              />
              <span>{elem.name}</span>
            </Link>
          </div>
        );
      })}
    </div>
  );
};
export default Category;
