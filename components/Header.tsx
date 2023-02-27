import Image from "next/image";

const Header = () => {
  return (
    <div className="absolute z-40 max-sm:h-full max-sm:w-full flex items-end justify-center max-sm:py-2">
      <Image
        src="/logo.png"
        width={100}
        height={100}
        alt="logo"
        priority
        className="invert"
      />
    </div>
  );
};
export default Header;
