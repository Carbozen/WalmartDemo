import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-white">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Welcome to Walmart Portal</h1>

      <div className="flex gap-6">
        <Link
          href="/supplier"
          className="bg-green-200 text-green-900 px-4 py-4 rounded-lg hover:bg-green-300 flex flex-col items-center"
        >
          <Image
            src="/supplier.jpg"
            alt="Supplier"
            width={100}
            height={100}
            className="rounded mb-2"
          />
          I'm a Supplier
        </Link>

        <Link
          href="/manager"
          className="bg-green-300 text-green-900 px-4 py-4 rounded-lg hover:bg-green-400 flex flex-col items-center"
        >
          <Image
            src="/manager.jpg"
            alt="Manager"
            width={100}
            height={100}
            className="rounded mb-2"
          />
          I'm a Manager
        </Link>
      </div>
    </main>
  );
}
