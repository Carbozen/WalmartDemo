import Image from 'next/image';
import Link from 'next/link';


export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen min-w-screen p-4 bg-white" style={{ backgroundImage: "url('/abstract.png')" }}>
      <div className='flex items-baseline'>
        <h1 className="text-5xl font-bold mb-6 text-gray-800">EcoSync: Reduce Your Emissions</h1>
        <Image src="/leaf.png" width={50} height={50}></Image>

      </div> 
      
      <h3 className=' text-gray-700 mb-10'>EcoSync is a smart platform designed to help Walmart suppliers reduce scope 3 emissions through data-driven insights and AI recommendations </h3>
      
      <div className="flex gap-5">
        <Link
          href="/supplier"
          className="bg-green-200 text-green-900 px-6 py-3 my-10 rounded-full hover:bg-gradient-to-r hover:from-green-300 hover:to-green-500 hover:text-white shadow-md hover:shadow-lg transform hover:scale-105 transition-all ease-in-out flex items-center justify-center gap-2 duration-300"
        >
          <Image
            src="/supplier.jpg"
            alt="Supplier"
            width={50}
            height={50}
            className="w-[50px] h-[50px] object-cover rounded"
          />
          I'm a Supplier
        </Link>

        <Link
          href="/manager"
          className="bg-green-200 text-green-900 px-6 py-3 my-10 rounded-full hover:bg-gradient-to-r hover:from-green-300 hover:to-green-500 hover:text-white shadow-md hover:shadow-lg transform hover:scale-105 transition-all ease-in-out flex items-center justify-center gap-2 duration-300"
        >
          <Image
            src="/manager.jpg"
            alt="Supplier"
            width={50}
            height={50}
            className="w-[50px] h-[50px] object-cover rounded"
          />
          I'm a Manager
        </Link>
      </div>
    </main>
  );
}
