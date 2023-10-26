import { Space, Spin, Typography } from "antd";

export default function LoadingScreen() {
  return (
    <div style={{ textAlign: "center", height: "100vh", position: "relative" }}>
      <Space
        direction="vertical"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Spin />
        <Typography.Text>Please wait ...</Typography.Text>
      </Space>
    </div>
  );
}
