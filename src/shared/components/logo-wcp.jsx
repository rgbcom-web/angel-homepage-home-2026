import Image from "next/image";

export default function LogoWCP({ className }) {
  return (
    <div className={`relative h-auto w-[6.25rem] tablet:w-[5rem] ${className}`}>
      <div className="relative w-full pb-[63%]">
        <Image
          src="/images/common/logo-wcp.png"
          alt="World Class Product Logo"
          fill
          className="object-contain"
        />
      </div>
    </div>
  );
}
