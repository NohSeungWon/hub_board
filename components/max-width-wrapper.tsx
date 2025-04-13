import { MAX_SIZE } from "@/constants/max_width_wrapper";

interface maxWidthWrapperProps {
  size?: (typeof MAX_SIZE)[keyof typeof MAX_SIZE];
  children?: React.ReactNode;
}

export default function maxWidthWrapper({
  size = MAX_SIZE.XL3,
  children,
}: maxWidthWrapperProps) {
  return <div className={`${size ? size : ""} m-auto`}>{children}</div>;
}
