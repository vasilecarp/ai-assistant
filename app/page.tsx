import Image from "next/image";
import { SettingsIcon } from "lucide-react";

export default function Home() {
  return (
    <main className="">
      {/* Header */}
      <header className="flex fixed top-0 justify-between text-white w-full p-5">
        <Image
          src="https://i.imgur.com/MCHWJZS.png"
          alt="Logo"
          width={50}
          height={50}
        />

        <SettingsIcon
          className="p-2 m-2 rounded-full cursor-pointer bg-purple-600 text-black transition-all ease-in-out duration-150 hover:bg-purple-700 hover:text-white"
          //onClick={() => setDisplaySettings(!displaySettings)}
          size={40}
        />
      </header>
      {/* Form */}
    </main>
  );
}
