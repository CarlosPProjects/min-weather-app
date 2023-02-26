import Image from "next/image";

const Header = () => {
  return (
    <div className="absolute top-0 left-0 z-10">
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
