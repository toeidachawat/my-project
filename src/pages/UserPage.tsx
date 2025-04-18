import React, { useState } from "react";
import {
  Tabs,
  Form,
  Input,
  Button,
  Card,
  Typography,
  Row,
  Col,
  InputNumber,
  Divider,
  Alert,
} from "antd";
import {
  CalculatorOutlined,
  NumberOutlined,
  DollarOutlined,
  PercentageOutlined,
} from "@ant-design/icons";
import "../styles/UserPage.css";

const { Title, Text } = Typography;
const { TabPane } = Tabs;

// กำหนด interface สำหรับผลลัพธ์
interface CalculationResult {
  status: "success" | "error";
  message?: string;
  number?: string;
  amount?: number;
  rate?: number;
  winAmount?: number;
}

const UserPage: React.FC = () => {
  // สำหรับแท็ป 3 ตัว
  const [threeDigitsNumber, setThreeDigitsNumber] = useState<string>("");
  const [threeDigitsAmount, setThreeDigitsAmount] = useState<number | null>(0);
  const [threeDigitsRate, setThreeDigitsRate] = useState<number | null>(600);
  const [threeDigitsResult, setThreeDigitsResult] =
    useState<CalculationResult | null>(null);

  // สำหรับแท็ป 2 ตัว
  const [twoDigitsNumber, setTwoDigitsNumber] = useState<string>("");
  const [twoDigitsAmount, setTwoDigitsAmount] = useState<number | null>(0);
  const [twoDigitsRate, setTwoDigitsRate] = useState<number | null>(90);
  const [twoDigitsResult, setTwoDigitsResult] =
    useState<CalculationResult | null>(null);

  // สำหรับแท็ป 2 ตัวบน
  const [twoDigitsUpNumber, setTwoDigitsUpNumber] = useState<string>("");
  const [twoDigitsUpAmount, setTwoDigitsUpAmount] = useState<number | null>(0);
  const [twoDigitsUpRate, setTwoDigitsUpRate] = useState<number | null>(90);
  const [twoDigitsUpResult, setTwoDigitsUpResult] =
    useState<CalculationResult | null>(null);

  // สำหรับแท็ป 2 ตัวล่าง
  const [twoDigitsDownNumber, setTwoDigitsDownNumber] = useState<string>("");
  const [twoDigitsDownAmount, setTwoDigitsDownAmount] = useState<number | null>(
    0
  );
  const [twoDigitsDownRate, setTwoDigitsDownRate] = useState<number | null>(90);
  const [twoDigitsDownResult, setTwoDigitsDownResult] =
    useState<CalculationResult | null>(null);

  // ฟังก์ชันคำนวณสำหรับ 3 ตัว
  const calculateThreeDigits = (): void => {
    if (
      threeDigitsNumber.length !== 3 ||
      isNaN(Number(threeDigitsNumber)) ||
      !threeDigitsAmount ||
      !threeDigitsRate
    ) {
      setThreeDigitsResult({
        status: "error",
        message: "กรุณากรอกข้อมูลให้ถูกต้อง",
      });
      return;
    }

    const winAmount = threeDigitsAmount * threeDigitsRate;
    setThreeDigitsResult({
      status: "success",
      number: threeDigitsNumber,
      amount: threeDigitsAmount,
      rate: threeDigitsRate,
      winAmount: winAmount,
    });
  };

  // ฟังก์ชันคำนวณสำหรับ 2 ตัว
  const calculateTwoDigits = (): void => {
    if (
      twoDigitsNumber.length !== 2 ||
      isNaN(Number(twoDigitsNumber)) ||
      !twoDigitsAmount ||
      !twoDigitsRate
    ) {
      setTwoDigitsResult({
        status: "error",
        message: "กรุณากรอกข้อมูลให้ถูกต้อง",
      });
      return;
    }

    const winAmount = twoDigitsAmount * twoDigitsRate;
    setTwoDigitsResult({
      status: "success",
      number: twoDigitsNumber,
      amount: twoDigitsAmount,
      rate: twoDigitsRate,
      winAmount: winAmount,
    });
  };

  // ฟังก์ชันคำนวณสำหรับ 2 ตัวบน
  const calculateTwoDigitsUp = (): void => {
    if (
      twoDigitsUpNumber.length !== 2 ||
      isNaN(Number(twoDigitsUpNumber)) ||
      !twoDigitsUpAmount ||
      !twoDigitsUpRate
    ) {
      setTwoDigitsUpResult({
        status: "error",
        message: "กรุณากรอกข้อมูลให้ถูกต้อง",
      });
      return;
    }

    const winAmount = twoDigitsUpAmount * twoDigitsUpRate;
    setTwoDigitsUpResult({
      status: "success",
      number: twoDigitsUpNumber,
      amount: twoDigitsUpAmount,
      rate: twoDigitsUpRate,
      winAmount: winAmount,
    });
  };

  // ฟังก์ชันคำนวณสำหรับ 2 ตัวล่าง
  const calculateTwoDigitsDown = (): void => {
    if (
      twoDigitsDownNumber.length !== 2 ||
      isNaN(Number(twoDigitsDownNumber)) ||
      !twoDigitsDownAmount ||
      !twoDigitsDownRate
    ) {
      setTwoDigitsDownResult({
        status: "error",
        message: "กรุณากรอกข้อมูลให้ถูกต้อง",
      });
      return;
    }

    const winAmount = twoDigitsDownAmount * twoDigitsDownRate;
    setTwoDigitsDownResult({
      status: "success",
      number: twoDigitsDownNumber,
      amount: twoDigitsDownAmount,
      rate: twoDigitsDownRate,
      winAmount: winAmount,
    });
  };

  // แสดงผลลัพธ์สำหรับ 3 ตัว
  const renderThreeDigitsResult = (): React.ReactNode => {
    if (!threeDigitsResult) return null;

    if (threeDigitsResult.status === "error") {
      return (
        <Alert message={threeDigitsResult.message} type="error" showIcon />
      );
    }

    return (
      <Card className="result-card">
        <Title level={4}>ผลการคำนวณ</Title>
        <Text>ถ้าถูกรางวัล เลข {threeDigitsResult.number} (3 ตัวตรง)</Text>
        <Title level={3} type="success">
          คุณจะได้รับเงิน:{" "}
          {threeDigitsResult.winAmount?.toLocaleString("th-TH")} บาท
        </Title>
        <Text type="secondary">
          เงินต้น {threeDigitsResult.amount} บาท × อัตราจ่าย{" "}
          {threeDigitsResult.rate} เท่า
        </Text>
      </Card>
    );
  };

  // แสดงผลลัพธ์สำหรับ 2 ตัว
  const renderTwoDigitsResult = (): React.ReactNode => {
    if (!twoDigitsResult) return null;

    if (twoDigitsResult.status === "error") {
      return <Alert message={twoDigitsResult.message} type="error" showIcon />;
    }

    return (
      <Card className="result-card">
        <Title level={4}>ผลการคำนวณ</Title>
        <Text>
          ถ้าถูกรางวัล เลข {twoDigitsResult.number} (2 ตัว บนหรือล่าง)
        </Text>
        <Title level={3} type="success">
          คุณจะได้รับเงิน: {twoDigitsResult.winAmount?.toLocaleString("th-TH")}{" "}
          บาท
        </Title>
        <Text type="secondary">
          เงินต้น {twoDigitsResult.amount} บาท × อัตราจ่าย{" "}
          {twoDigitsResult.rate} เท่า
        </Text>
      </Card>
    );
  };

  // แสดงผลลัพธ์สำหรับ 2 ตัวบน
  const renderTwoDigitsUpResult = (): React.ReactNode => {
    if (!twoDigitsUpResult) return null;

    if (twoDigitsUpResult.status === "error") {
      return (
        <Alert message={twoDigitsUpResult.message} type="error" showIcon />
      );
    }

    return (
      <Card className="result-card">
        <Title level={4}>ผลการคำนวณ</Title>
        <Text>ถ้าถูกรางวัล เลข {twoDigitsUpResult.number} (2 ตัวบน)</Text>
        <Title level={3} type="success">
          คุณจะได้รับเงิน:{" "}
          {twoDigitsUpResult.winAmount?.toLocaleString("th-TH")} บาท
        </Title>
        <Text type="secondary">
          เงินต้น {twoDigitsUpResult.amount} บาท × อัตราจ่าย{" "}
          {twoDigitsUpResult.rate} เท่า
        </Text>
      </Card>
    );
  };

  // แสดงผลลัพธ์สำหรับ 2 ตัวล่าง
  const renderTwoDigitsDownResult = (): React.ReactNode => {
    if (!twoDigitsDownResult) return null;

    if (twoDigitsDownResult.status === "error") {
      return (
        <Alert message={twoDigitsDownResult.message} type="error" showIcon />
      );
    }

    return (
      <Card className="result-card">
        <Title level={4}>ผลการคำนวณ</Title>
        <Text>ถ้าถูกรางวัล เลข {twoDigitsDownResult.number} (2 ตัวล่าง)</Text>
        <Title level={3} type="success">
          คุณจะได้รับเงิน:{" "}
          {twoDigitsDownResult.winAmount?.toLocaleString("th-TH")} บาท
        </Title>
        <Text type="secondary">
          เงินต้น {twoDigitsDownResult.amount} บาท × อัตราจ่าย{" "}
          {twoDigitsDownResult.rate} เท่า
        </Text>
      </Card>
    );
  };

  return (
    <div className="lottery-calculator">
      <Row justify="center">
        <Col xs={24} sm={20} md={16} lg={14} xl={12}>
          <Card>
            <Title level={2} style={{ textAlign: "center" }}>
              เครื่องคำนวณหวยใต้ดิน
            </Title>
            <Divider />

            <Tabs defaultActiveKey="1">
              <TabPane
                tab={
                  <span>
                    <CalculatorOutlined /> 3 ตัว
                  </span>
                }
                key="1"
              >
                <Form layout="vertical">
                  <Form.Item label="เลข 3 ตัว" required>
                    <Input
                      prefix={<NumberOutlined />}
                      placeholder="ป้อนตัวเลข 3 หลัก เช่น 123"
                      maxLength={3}
                      value={threeDigitsNumber}
                      onChange={(e) => setThreeDigitsNumber(e.target.value)}
                    />
                  </Form.Item>
                  <Form.Item label="จำนวนเงิน (บาท)" required>
                    <InputNumber
                      prefix={<DollarOutlined />}
                      placeholder="จำนวนเงินที่แทง"
                      style={{ width: "100%" }}
                      min={1}
                      value={threeDigitsAmount}
                      onChange={(value) => setThreeDigitsAmount(value)}
                    />
                  </Form.Item>
                  <Form.Item label="อัตราจ่าย (เท่า)" required>
                    <InputNumber
                      prefix={<PercentageOutlined />}
                      placeholder="เช่น 600"
                      style={{ width: "100%" }}
                      min={1}
                      value={threeDigitsRate}
                      onChange={(value) => setThreeDigitsRate(value)}
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button
                      type="primary"
                      size="large"
                      block
                      onClick={calculateThreeDigits}
                    >
                      คำนวณ
                    </Button>
                  </Form.Item>
                </Form>

                {renderThreeDigitsResult()}
              </TabPane>

              <TabPane
                tab={
                  <span>
                    <CalculatorOutlined /> 2 ตัว
                  </span>
                }
                key="2"
              >
                <Form layout="vertical">
                  <Form.Item label="เลข 2 ตัว" required>
                    <Input
                      prefix={<NumberOutlined />}
                      placeholder="ป้อนตัวเลข 2 หลัก เช่น 45"
                      maxLength={2}
                      value={twoDigitsNumber}
                      onChange={(e) => setTwoDigitsNumber(e.target.value)}
                    />
                  </Form.Item>
                  <Form.Item label="จำนวนเงิน (บาท)" required>
                    <InputNumber
                      prefix={<DollarOutlined />}
                      placeholder="จำนวนเงินที่แทง"
                      style={{ width: "100%" }}
                      min={1}
                      value={twoDigitsAmount}
                      onChange={(value) => setTwoDigitsAmount(value)}
                    />
                  </Form.Item>
                  <Form.Item label="อัตราจ่าย (เท่า)" required>
                    <InputNumber
                      prefix={<PercentageOutlined />}
                      placeholder="เช่น 90"
                      style={{ width: "100%" }}
                      min={1}
                      value={twoDigitsRate}
                      onChange={(value) => setTwoDigitsRate(value)}
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button
                      type="primary"
                      size="large"
                      block
                      onClick={calculateTwoDigits}
                    >
                      คำนวณ
                    </Button>
                  </Form.Item>
                </Form>

                {renderTwoDigitsResult()}
              </TabPane>

              <TabPane
                tab={
                  <span>
                    <CalculatorOutlined /> 2 ตัวบน
                  </span>
                }
                key="3"
              >
                <Form layout="vertical">
                  <Form.Item label="เลข 2 ตัวบน" required>
                    <Input
                      prefix={<NumberOutlined />}
                      placeholder="ป้อนตัวเลข 2 หลัก เช่น 45"
                      maxLength={2}
                      value={twoDigitsUpNumber}
                      onChange={(e) => setTwoDigitsUpNumber(e.target.value)}
                    />
                  </Form.Item>
                  <Form.Item label="จำนวนเงิน (บาท)" required>
                    <InputNumber
                      prefix={<DollarOutlined />}
                      placeholder="จำนวนเงินที่แทง"
                      style={{ width: "100%" }}
                      min={1}
                      value={twoDigitsUpAmount}
                      onChange={(value) => setTwoDigitsUpAmount(value)}
                    />
                  </Form.Item>
                  <Form.Item label="อัตราจ่าย (เท่า)" required>
                    <InputNumber
                      prefix={<PercentageOutlined />}
                      placeholder="เช่น 90"
                      style={{ width: "100%" }}
                      min={1}
                      value={twoDigitsUpRate}
                      onChange={(value) => setTwoDigitsUpRate(value)}
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button
                      type="primary"
                      size="large"
                      block
                      onClick={calculateTwoDigitsUp}
                    >
                      คำนวณ
                    </Button>
                  </Form.Item>
                </Form>

                {renderTwoDigitsUpResult()}
              </TabPane>

              <TabPane
                tab={
                  <span>
                    <CalculatorOutlined /> 2 ตัวล่าง
                  </span>
                }
                key="4"
              >
                <Form layout="vertical">
                  <Form.Item label="เลข 2 ตัวล่าง" required>
                    <Input
                      prefix={<NumberOutlined />}
                      placeholder="ป้อนตัวเลข 2 หลัก เช่น 45"
                      maxLength={2}
                      value={twoDigitsDownNumber}
                      onChange={(e) => setTwoDigitsDownNumber(e.target.value)}
                    />
                  </Form.Item>
                  <Form.Item label="จำนวนเงิน (บาท)" required>
                    <InputNumber
                      prefix={<DollarOutlined />}
                      placeholder="จำนวนเงินที่แทง"
                      style={{ width: "100%" }}
                      min={1}
                      value={twoDigitsDownAmount}
                      onChange={(value) => setTwoDigitsDownAmount(value)}
                    />
                  </Form.Item>
                  <Form.Item label="อัตราจ่าย (เท่า)" required>
                    <InputNumber
                      prefix={<PercentageOutlined />}
                      placeholder="เช่น 90"
                      style={{ width: "100%" }}
                      min={1}
                      value={twoDigitsDownRate}
                      onChange={(value) => setTwoDigitsDownRate(value)}
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button
                      type="primary"
                      size="large"
                      block
                      onClick={calculateTwoDigitsDown}
                    >
                      คำนวณ
                    </Button>
                  </Form.Item>
                </Form>

                {renderTwoDigitsDownResult()}
              </TabPane>
            </Tabs>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default UserPage;
