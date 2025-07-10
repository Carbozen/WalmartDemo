import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main
      className="flex flex-col items-center justify-center min-h-screen min-w-screen p-8 bg-gradient-to-br from-green-50 to-blue-50"
      style={{ 
        backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url('/abstract.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="text-center max-w-4xl mx-auto">
        <div className="flex items-center justify-center mb-8">
          <h1 className="text-6xl font-bold text-gray-800 mr-4">
            EcoSync
          </h1>
          <Image src="/leaf.png" width={60} height={60} alt="leaf" className="animate-pulse" />
        </div>

        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Reduce Your Emissions
        </h2>

        <p className="text-lg text-gray-600 mb-12 leading-relaxed max-w-3xl mx-auto">
          EcoSync is a smart platform designed to help Walmart suppliers reduce
          scope 3 emissions through data-driven insights and AI recommendations.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Link
            href="/supplier"
            className="group bg-gradient-to-r from-green-400 to-green-600 text-white px-8 py-4 rounded-xl hover:from-green-500 hover:to-green-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 min-w-[280px]"
          >
            <Image
              src="/supplier.jpg"
              alt="Supplier"
              width={40}
              height={40}
              className="w-[40px] h-[40px] object-cover rounded-full border-2 border-white"
            />
            <span className="font-semibold text-lg">I&apos;m a Supplier</span>
          </Link>

          <Link
            href="/manager"
            className="group bg-gradient-to-r from-blue-400 to-blue-600 text-white px-8 py-4 rounded-xl hover:from-blue-500 hover:to-blue-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3 min-w-[280px]"
          >
            <Image
              src="/manager.jpg"
              alt="Manager"
              width={40}
              height={40}
              className="w-[40px] h-[40px] object-cover rounded-full border-2 border-white"
            />
            <span className="font-semibold text-lg">I&apos;m a Manager</span>
          </Link>
        </div>

        <div className="mt-12 text-sm text-gray-500">
          <p>Prototype Demo • Walmart Sustainability Initiative</p>
        </div>
      </div>
    </main>
  );
}
