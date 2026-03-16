import { Link } from "react-router-dom";
import { links } from "../SidebarCont";
import { useDispatch, useSelector } from "react-redux";
import { updateCategory } from "/src/redux/Features/categorySlice";

const Sidebar = () => {
  const showMenu = useSelector((state) => state.menu.show);
  const dispatch = useDispatch();
  return (
    <>
      {showMenu ? (
        <aside className=" min-h-screen bg-white hidden sm:flex ">
          <div className="flex flex-col gap-2">
            {links.map((elem, index) => (
              <Link
                onClick={() => {
                  dispatch(
                    updateCategory({
                      category: elem.activeTab,
                      categoryId: elem.categoryId,
                    })
                  );
                }}
                key={index}
                to={elem.path}
                className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
              >
                <img
                  src={elem.image}
                  alt={elem.name}
                  className="w-6 h-6 object-contain"
                />
                <span>{elem.name}</span>
              </Link>
            ))}
          </div>
        </aside>
      ) : null}
    </>
  );
};

export default Sidebar;
