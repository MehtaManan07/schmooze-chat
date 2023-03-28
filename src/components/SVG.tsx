import React from "react";
import Logo from "../../assets/svg/logo.svg";
import Welcome from "../../assets/svg/phone.svg";
const ImageMap: any = {
  Logo,
  Welcome,
};
type Images = "Logo" | "Welcome";

type IProps = {
  fill?: string;
  size?: number;
  height?: number;
  width?: number;
  type: Images;
};
const SVGImage = ({ fill, type, size, width, height }: IProps) => {
  const Component = ImageMap[type];
  return (
    <Component
      fill={fill || '#fff'}
      height={size ? size : height ? height : 32}
      width={size ? size : width ? width : 32}
    />
  );
};
export default SVGImage;
