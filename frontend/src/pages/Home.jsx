import { useNavigate } from 'react-router-dom'
import logo from '@assets/images/logo.png'

function Home() {
  const navigate = useNavigate();

  const handleIdentifyWithApp = () => {
    navigate('/login');
  }

  const handleOrderWithoutIdentity = () => {
    navigate('/order');
  }

  return (
    <div className="min-h-screen flex flex-col bg-caffenio-bg font-gilroy">
      {/* Logo */}
      <div className="p-6 md:p-8">
        <img src={logo} alt="Caffenio Logo" className="h-20 md:h-24" />
      </div>

      {/* Contenedor Principal */}
      <div className="flex-1 flex flex-col items-center pt-8 md:pt-16 px-6 pb-12">
        {/* Título */}
        <div className="text-center mb-12 md:mb-20">
          <h1 className="text-3xl md:text-5xl text-gray-800">
            <span className="font-medium">¡Bienvenido a </span>
            <span className="font-semibold">CAFFENIO!</span>
          </h1>
        </div>

        {/* Tarjetas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 w-full max-w-5xl">
          {/* Tarjeta: Identificate con la App */}
          <button 
            onClick={handleIdentifyWithApp}
            className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 md:p-12 flex flex-col items-center justify-center min-h-[280px] md:min-h-[320px] hover:scale-105 transform"
          >
            <div className="w-full h-32 md:h-40 mb-6 flex items-center justify-center">
              {/* Placeholder para icono/imagen */}
              <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-100 rounded-2xl flex items-center justify-center">
                <svg 
                  className="w-16 h-16 md:w-20 md:h-20 text-gray-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 text-center">
              Identificate con la App
            </h2>
          </button>

          {/* Tarjeta: Realizar pedido sin identificarte */}
          <button 
            onClick={handleOrderWithoutIdentity}
            className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 md:p-12 flex flex-col items-center justify-center min-h-[280px] md:min-h-[320px] hover:scale-105 transform"
          >
            <div className="w-full h-32 md:h-40 mb-6 flex items-center justify-center">
              {/* Placeholder para icono/imagen */}
              <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-100 rounded-2xl flex items-center justify-center">
                <svg 
                  className="w-16 h-16 md:w-20 md:h-20 text-gray-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
              </div>
            </div>
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 text-center">
              Realizar pedido sin identificarte
            </h2>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home
