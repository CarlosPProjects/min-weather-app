import Image from "next/image";

const Header = () => {
  return (
    <>
      <Image
        src="/logo.png"
        width={100}
        height={100}
        alt="logo"
        priority
        className="invert"
      />
    </>
  );
};
export default Header;
