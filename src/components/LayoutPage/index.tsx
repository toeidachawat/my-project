import React from "react";
import { Layout, Menu } from "antd";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom"; // นำเข้า useNavigate จาก react-router-dom

// กำหนด Props ให้รองรับ children
interface Props {
  children?: React.ReactNode;
}

const { Header, Sider, Content } = Layout;

const LayoutWrapper: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate(); // ใช้ useNavigate สำหรับเปลี่ยนหน้า

  const handleMenuClick = (key: string) => {
    // เช็คว่าเมนูที่กดคือเมนูไหน แล้วนำทางไปยังหน้าอื่น
    switch (key) {
      case "1":
        navigate("/"); // นำทางไปหน้าแรก
        break;
      case "2":
        navigate("/user"); // นำทางไปหน้าผู้ใช้
        break;
      default:
        break;
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header
        className="header"
        style={{ backgroundColor: "#001529", padding: "0 24px" }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            height: "64px", // สูงเท่ากับ default ของ Ant Design
          }}
        >
          <img
            src="/src/assets/icons8-lottery-100.png"
            alt="Logo"
            style={{ height: "32px", marginRight: "12px" }}
          />
          <span
            style={{ color: "white", fontSize: "20px", fontWeight: "bold" }}
          >
            My Lottaly
          </span>
        </div>
      </Header>

      <Layout>
        {/* Sidebar */}
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            style={{ height: "100%", borderRight: 0 }}
            onClick={({ key }) => handleMenuClick(key)} // ใช้ onClick เพื่อเรียก handleMenuClick
          >
            <Menu.Item key="1" icon={<HomeOutlined />}>
              หน้าแรก
            </Menu.Item>
            <Menu.Item key="2" icon={<UserOutlined />}>
              ผู้ใช้
            </Menu.Item>
          </Menu>
        </Sider>

        <Layout style={{ padding: "0 24px 24px" }}>
          {/* Content */}
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: "#fff",
            }}
          >
            {children} {/* แสดง children ที่ได้รับจากภายนอก */}
          </Content>

          {/* Footer */}
        </Layout>
      </Layout>
    </Layout>
  );
};

export default LayoutWrapper;
