import { FC } from "react";

interface Props {
  children: React.ReactNode;
  className: string;
}

const Loader: FC<Props> = ({ children, className }) => {
  return (
    <div
      className={`${className} absolute top-0 left-0 bottom-0 right-0 grid place-content-center z-40`}
    >
      <div className="flex flex-row gap-6 items-center">{children}</div>
    </div>
  );
};
export default Loader;
