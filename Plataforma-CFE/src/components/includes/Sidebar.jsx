import { useState, useEffect } from "react"; 
import { Link, useNavigate } from "react-router-dom";
import { dataSidebar } from "../../data/navigationConfig";

const Sidebar = ({ setIsAuthenticated }) => {
    const logo = "/cfe2.png";
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate = useNavigate();

    // Obtener el tipo de usuario desde localStorage
    const userType = localStorage.getItem("userType");

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                isSidebarOpen &&
                !document.getElementById("sidebar").contains(event.target) &&
                !event.target.closest("#menu-button")
            ) {
                setIsSidebarOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isSidebarOpen]);

    const handleLogout = () => {
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("userType"); // Limpia el tipo de usuario
        setIsAuthenticated(false);
        navigate("/login");
    };

    // Filtrar los elementos del Sidebar según el tipo de usuario
    const filteredSidebarData = dataSidebar.filter(item => {
        // Si tiene restrictedTo, solo mostrarlo si coincide con el tipo de usuario
        if (item.restrictedTo && item.restrictedTo === "admin" && userType !== "1") {
            return false;
        }
        return true;
    });

    return (
        <>
            <button
                id="menu-button"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                aria-controls="sidebar"
                type="button"
                className={`fixed top-4 left-4 z-50 p-2 bg-emerald-600 rounded-md text-white sm:hidden transition-transform duration-500 ease-in-out ${
                    isSidebarOpen ? "translate-x-60" : "translate-x-0"
                }`}
                style={{ zIndex: 101 }}
            >
                <span className="sr-only">{isSidebarOpen ? "Cerrar Sidebar" : "Abrir Sidebar"}</span>
                <svg
                    className="w-6 h-6"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {isSidebarOpen ? (
                        <path
                            clipRule="evenodd"
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        />
                    ) : (
                        <path
                            clipRule="evenodd"
                            fillRule="evenodd"
                            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                        />
                    )}
                </svg>
            </button>

            <aside
                id="sidebar"
                className={`fixed top-0 left-0 z-40 w-60 h-full bg-white text-gray-800 shadow-lg transform transition-transform duration-500 ease-in-out ${
                    isSidebarOpen ? "translate-x-0 shadow-xl" : "-translate-x-full"
                } sm:translate-x-0 sm:relative sm:transform-none overflow-y-auto`}
                aria-label="Sidebar"
                style={{ height: "100vh", maxHeight: "100%" }}
            >
                <div className="flex flex-col h-full">
                    <div className="flex items-center justify-center h-20 bg-emerald-600">
                        <Link to="/" onClick={() => setIsSidebarOpen(false)}>
                            <img src={logo} alt="Logo" className="w-40 h-30 cursor-pointer" />
                        </Link>
                    </div>

                    <ul className="flex-grow px-4 py-6 space-y-2">
                        {filteredSidebarData.map((item, index) => (
                            <li key={index}>
                                {item.action === "logout" ? (
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center p-3 rounded-md hover:bg-emerald-100 transition-all w-full text-left"
                                    >
                                        <item.icon className="w-5 h-5 text-emerald-600" />
                                        <span className="ml-4 text-sm font-medium">{item.name}</span>
                                    </button>
                                ) : (
                                    <Link
                                        to={item.link}
                                        className="flex items-center p-3 rounded-md hover:bg-emerald-100 transition-all"
                                        onClick={() => setIsSidebarOpen(false)}
                                    >
                                        <item.icon className="w-5 h-5 text-emerald-600" />
                                        <span className="ml-4 text-sm font-medium">{item.name}</span>
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </aside>

            {isSidebarOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black/50 sm:hidden transition-opacity duration-500 ease-in-out"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}
        </>
    );
};

export default Sidebar;
