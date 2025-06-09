import { Spin } from "antd";

interface LoadingSpinnerProps {
  minHeight?: string;
}

const LoadingSpinner = ({ minHeight = "200px" }: LoadingSpinnerProps) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: minHeight,
      }}
    >
      <Spin size="large" />
    </div>
  );
};

export default LoadingSpinner;
