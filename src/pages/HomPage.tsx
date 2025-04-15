import { useState } from "react";
import {
  Button,
  Card,
  Checkbox,
  Col,
  Form,
  Input,
  Row,
  Select,
  Table,
  Typography,
  Tabs,
  Popconfirm,
} from "antd";
import "../styles/table.css";

// import { useEffect } from "react";
import axios from "axios";
import ExportExcelButton from "../components/ExportFile";
import ExportPDFButton from "../components/ExportPDF";
import { useForm, useWatch } from "antd/es/form/Form";
import Text from "../components/Text";

const { Title } = Typography;
const { TabPane } = Tabs;

interface DataItem {
  key: number;
  number2: string;
  number3: string;
  category: string;
  amount: string;
}

const HomePage = () => {
  const [amount, setAmount] = useState<string>("");
  const [data, setData] = useState<DataItem[]>([]);
  const [isReversed, setIsReversed] = useState<boolean>(false);
  const [form] = useForm();
  const number2 = useWatch("number2", form);
  const number3 = useWatch("number3", form);
  // ตัวอย่างการเชื่อมต่อกับ Backend
  const saveDataToBackend = async (newData: DataItem[]) => {
    try {
      // ส่งข้อมูลไปยัง backend
      await axios.post("/api/lotto", newData);
      console.log("Data saved to backend!");
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  // เพิ่มเลขลงในตาราง
  const handleAdd = (value: DataItem) => {
    if (!value.number2 && !value.number3) return;

    const newData: DataItem[] = [];

    if (
      value.number3 &&
      value.category === "โต๊ด" &&
      value.number3.length === 3
    ) {
      const permutations = generateReverseCombinations(value.number3);
      permutations.forEach((perm) => {
        if (!data.some((d) => d.number3 === perm && d.category === "โต๊ด")) {
          newData.push({
            key: data.length + newData.length,
            number2: "",
            number3: perm,
            category: "โต๊ด",
            amount,
          });
        }
      });
    } else {
      newData.push({
        key: data.length,
        number2: value.number2,
        number3: value.number3,
        category: value.category,
        amount: value.amount,
      });

      if (value.number2 && value.number2.length === 2 && isReversed) {
        const reversedNumber2 = value.number2.split("").reverse().join("");
        if (reversedNumber2 !== value.number2) {
          newData.push({
            key: data.length + 1,
            number2: reversedNumber2,
            number3: value.number3,
            category: value.category,
            amount,
          });
        }
      }
    }

    setData([...data, ...newData]);

    saveDataToBackend(newData); // ส่งข้อมูลไปยัง backend
    form.resetFields();
    setAmount("");
    // setCategory("");
    setIsReversed(false);
  };

  // ฟังก์ชั่นในการ generate เลขโต๊ด
  const generateReverseCombinations = (num: string): string[] => {
    if (num.length !== 3) return [];
    const perms = new Set<string>();

    const permute = (str: string, prefix = "") => {
      if (str.length === 0) {
        perms.add(prefix);
      } else {
        for (let i = 0; i < str.length; i++) {
          permute(str.slice(0, i) + str.slice(i + 1), prefix + str[i]);
        }
      }
    };

    permute(num);
    return Array.from(perms);
  };

  const categoryOptions = [
    { value: "บน", label: "บน" },
    { value: "ล่าง", label: "ล่าง" },
  ];

  const columns = [
    {
      title: "เลข 2 ตัว",
      dataIndex: "number2",
      key: "number2",
    },
    {
      title: "เลข 3 ตัว",
      dataIndex: "number3",
      key: "number3",
    },
    {
      title: "หมวดหมู่",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "จำนวนเงิน",
      dataIndex: "amount",
      key: "amount",
      render: (amount: string) => `${Number(amount).toLocaleString()} บาท`,
    },
    {
      title: "",
      key: "action",
      render: (_: unknown, record: DataItem) => (
        <div style={{ textAlign: "center" }}>
          <Popconfirm
            title="คุณแน่ใจหรือไม่ว่าจะลบ?"
            onConfirm={() => handleDelete(record.key)}
            okText="ใช่"
            cancelText="ยกเลิก"
          >
            <Button danger size="large" style={{ fontSize: "16px" }}>
              ลบ
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const handleDelete = (key: number) => {
    setData(data.filter((item) => item.key !== key));
  };

  const totalAmountByCategory = (category: string) =>
    data
      .filter((item) => item.category === category && item.number2)
      .reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);

  const totalAmountByCategoryTree = (category: string) =>
    data
      .filter((item) => item.category === category && item.number3)
      .reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);

  const totalAmount = () => {
    return data.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
  };

  return (
    <>
      <Card
        title={<Title level={4}>เพิ่มเลข</Title>}
        style={{ marginBottom: 24 }}
      >
        <Form layout="vertical" onFinish={handleAdd} form={form}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              gap: 10,
            }}
          >
            <div>
              <Form.Item
                label={<span className="form-label-large">เลข 2 ตัว</span>}
                name="number2"
                style={{ flex: 1, marginBottom: 8 }}
              >
                <Input disabled={number3} type="number" placeholder="เช่น 25" />
              </Form.Item>

              <Checkbox
                disabled={number3}
                checked={isReversed}
                onChange={(e) => setIsReversed(e.target.checked)}
              >
                กลับเลข
              </Checkbox>
            </div>
            <Form.Item
              label={<span className="form-label-large">เลข 3 ตัว</span>}
              name="number3"
              style={{ flex: 1 }}
            >
              <Input
                disabled={number2}
                type="number"
                placeholder="เช่น 789"
                onChange={(e) => {
                  if (!e.target.value) {
                    form.resetFields(["category"]);
                  }
                  setIsReversed(false);
                }}
              />
            </Form.Item>

            <Form.Item
              label={<span className="form-label-large">ประเภท</span>}
              name="category"
              style={{ flex: 1 }}
            >
              <Select
                options={
                  number3
                    ? [...categoryOptions, { value: "โต๊ด", label: "โต๊ด" }]
                    : categoryOptions
                }
                placeholder="เลือกประเภท"
              />
            </Form.Item>

            <Form.Item
              label={<span className="form-label-large">จำนวน</span>}
              name="amount"
              rules={[
                { required: true, message: "กรุณากรอกจำนวนเงิน!" },
                {
                  pattern: /^[0-9]+$/,
                  message: "กรุณากรอกจำนวนเงินเป็นตัวเลข",
                },
              ]}
              style={{ flex: 1 }}
            >
              <Input
                type="number"
                onChange={(e) => setAmount(e.target.value)}
                placeholder="บาท"
              />
            </Form.Item>

            <div style={{ paddingTop: 30 }}>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100px" }}
              >
                เพิ่ม
              </Button>
            </div>
          </div>
        </Form>
      </Card>

      <Tabs defaultActiveKey="บน">
        {["บน", "ล่าง", "โต๊ด"].map((cat) => (
          <TabPane tab={`เลข ${cat}`} key={cat}>
            <Table
              className="custom-table"
              dataSource={data.filter((item) => item.category === cat)}
              columns={columns}
              rowKey="key"
              pagination={{ pageSize: 6 }}
            />
          </TabPane>
        ))}
      </Tabs>
      <div style={{ paddingTop: "10px", display: "flex", gap: 10 }}>
        <ExportExcelButton data={data} />
        <ExportPDFButton data={data} />
      </div>

      <Row gutter={16} style={{ marginTop: 24 }}>
        <Col xs={24} md={12}>
          <Card title="สรุปยอด 2 ตัว" style={{ marginBottom: 16 }}>
            <Text color="darkGrey">
              ยอดรวม (2 ตัวบน): {totalAmountByCategory("บน")} บาท
            </Text>
            <Text color="darkGrey">
              ยอดรวม (2 ตัวล่าง): {totalAmountByCategory("ล่าง")} บาท
            </Text>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="สรุปยอด 3 ตัว" style={{ marginBottom: 16 }}>
            <Text color="darkGrey">
              ยอดรวม (3 ตัวบน): {totalAmountByCategoryTree("บน")} บาท
            </Text>
            <Text color="darkGrey">
              ยอดรวม (3 ตัวล่าง): {totalAmountByCategoryTree("ล่าง")} บาท
            </Text>
            <Text color="darkGrey">
              ยอดรวม (3 ตัวโต๊ด): {totalAmountByCategoryTree("โต๊ด")} บาท
            </Text>
          </Card>
        </Col>
        <Col xs={24}>
          <Card title="ยอดรวมทั้งหมด" style={{ marginTop: 16 }}>
            <Text color="darkGrey">ยอดรวมทั้งหมด: {totalAmount()} บาท</Text>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default HomePage;
