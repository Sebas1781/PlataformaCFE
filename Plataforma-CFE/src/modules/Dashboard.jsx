import dashboardConfig from '../data/dashboardConfig';
import InteractiveMap from '../components/globals/InteractiveMap';

const Dashboard = () => {
    return (
      <div className="text-center">
        <h3 className="text-2xl font-light mb-4">Menú Principal</h3>
        <hr className="border-4 mb-4" />
        <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6 p-4 justify-center items-center">
          {dashboardConfig.map((item, index) => (
            <button
              key={index}
              className="boton bg-emerald-600 text-white font-bold py-8 px-8 rounded hover:bg-emerald-500 flex flex-col items-center justify-center"
              onClick={() => window.location.href = item.link}
              style={{ width: '300px', height: '200px' }}
            >
              <item.icon className="w-12 h-12 mb-2 text-white" />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
        {/* <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6 p-4 justify-center items-center flex-grow">
                    <InteractiveMap />
                </div> */}
      </div>
    );
  };

export default Dashboard