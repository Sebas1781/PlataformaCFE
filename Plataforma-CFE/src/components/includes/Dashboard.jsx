import { Link } from "react-router-dom";
import { dataMenu } from '../../data/navigationConfig';

const Dashboard = () => {
    return (
        <div className="flex flex-col items-center justify-start bg-gray-50 min-h-screen p-6 sm:p-8 lg:pl-72">
            <h3 className="text-2xl sm:text-4xl text-gray-800 mb-6 tracking-wide text-center sm:text-left">
                Menú Principal
            </h3>
            <div className="w-full max-w-5xl border-t-4 border-emerald-600 mb-8 sm:mb-12"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full max-w-5xl">
                {dataMenu.map((item, index) => (
                    <Link
                        to={item.link} // Aquí se define el enlace
                        key={index}
                        className="group flex flex-col items-center justify-center bg-white border border-gray-200 rounded-lg shadow-md p-4 sm:p-6 hover:bg-emerald-600 hover:shadow-lg hover:scale-105 transition-all duration-300"
                        style={{ height: '200px' }}
                    >
                        <div className="w-20 h-20 sm:w-16 sm:h-16 bg-emerald-600 rounded-full flex items-center justify-center mb-4 transition-colors duration-300 group-hover:bg-white">
                            <item.icon className="w-8 h-8 sm:w-8 sm:h-8 text-white transition-colors duration-300 group-hover:text-emerald-600" />
                        </div>
                        <span className="text-sm sm:text-lg font-medium text-gray-800 text-center transition-colors duration-300 group-hover:text-white">
                            {item.label}
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;

