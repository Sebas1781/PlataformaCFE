import { Link } from "react-router-dom";
import { dataMenu } from "../../data/navigationConfig";

const Dashboard = () => {
    return (
        <div className="flex flex-col items-center justify-start bg-white w-full p-6 sm:p-8">
            <h3 className="text-2xl sm:text-4xl text-gray-800 mb-6 tracking-wide text-center">
                Menú Principal
            </h3>
            <div className="w-full max-w-5xl border-t-4 border-emerald-600 mb-8 sm:mb-12"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {dataMenu.map((item, index) => (
                    <Link
                        to={item.link}
                        key={index}
                        className="group flex flex-col items-center justify-center bg-white border border-gray-200 rounded-lg shadow-md p-6 hover:bg-emerald-600 hover:shadow-lg hover:scale-105 transition-all duration-300"
                        style={{ height: '200px' }}
                    >
                        <div className="w-20 h-20 bg-emerald-600 rounded-full flex items-center justify-center mb-4 group-hover:bg-white transition-all">
                            <item.icon className="w-8 h-8 text-white group-hover:text-emerald-600 transition-all" />
                        </div>
                        <span className="text-lg font-medium text-gray-800 group-hover:text-white">
                            {item.label}
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
