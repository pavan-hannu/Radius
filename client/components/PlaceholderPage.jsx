import React from "react";
import { Card, Typography, Button, Space } from "antd";
import { RocketOutlined, BuildOutlined } from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;

const PlaceholderPage = ({
  title,
  description,
  icon: Icon = BuildOutlined,
}) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "400px",
      }}
    >
      <Card style={{ textAlign: "center", maxWidth: "500px", width: "100%" }}>
        <Space direction="vertical" size="large">
          <Icon style={{ fontSize: "64px", color: "#1976d2", opacity: 0.6 }} />

          <div>
            <Title level={2} style={{ marginBottom: "8px" }}>
              {title}
            </Title>
            <Paragraph
              style={{ fontSize: "16px", color: "#666", marginBottom: "24px" }}
            >
              {description}
            </Paragraph>
          </div>

          <div>
            <Text
              type="secondary"
              style={{ display: "block", marginBottom: "16px" }}
            >
              This page is ready to be built! Continue prompting to add content
              and functionality.
            </Text>

            <Button
              type="primary"
              icon={<RocketOutlined />}
              size="large"
              style={{ borderRadius: "8px" }}
            >
              Start Building This Page
            </Button>
          </div>
        </Space>
      </Card>
    </div>
  );
};

export default PlaceholderPage;
