import { FC, MouseEventHandler } from "react";

interface Props {
  children: React.ReactNode;
  className: string;
  onClick: MouseEventHandler<HTMLDivElement>;
}

const Button: FC<Props> = ({ children, className, onClick }) => {
  return (
    <>
      <div className={`${className}`} onClick={onClick}>
        {children}
      </div>
    </>
  );
};
export default Button;
