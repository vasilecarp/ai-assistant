import Image from "next/image";

export default function Home() {
  return (
    <main className="">
      <h1>AI assistant</h1>
      {/* Header */}
      <header>
        <Image
          src="https://i.imgur.com/MCHWJZS.png"
          alt="Logo"
          width={50}
          height={50}
        />
      </header>
      {/* Form */}
    </main>
  );
}
