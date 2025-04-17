import { Card, Row, Col } from "antd";
import { DataItem } from "./types";
import Text from "../ui/Text"; // ใช้ component Text เดิม

interface SummaryCardsProps {
  data: DataItem[];
}

const SummaryCards = ({ data }: SummaryCardsProps) => {
  // คำนวณยอดรวมตามประเภท 2 ตัว
  const totalAmountByCategory = (category: string) =>
    data
      .filter((item) => item.category === category && item.number2)
      .reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);

  // คำนวณยอดรวมตามประเภท 3 ตัว
  const totalAmountByCategoryTree = (category: string) =>
    data
      .filter((item) => item.category === category && item.number3)
      .reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);

  // คำนวณยอดรวมทั้งหมด
  const totalAmount = () => {
    return data.reduce((sum, item) => sum + (parseFloat(item.amount) || 0), 0);
  };

  return (
    <Row gutter={[16, 16]} className="mt-6">
      <Col xs={24} md={8}>
        <Card
          title={<h3 className="text-lg font-medium">สรุปยอด 2 ตัว</h3>}
          className="bg-white shadow-sm rounded-lg h-full"
          bordered={false}
        >
          <div className="space-y-3">
            <Text color="darkGrey" className="text-base">
              ยอดรวม (2 ตัวบน): {totalAmountByCategory("บน").toLocaleString()}{" "}
              บาท
            </Text>
            <Text color="darkGrey" className="text-base">
              ยอดรวม (2 ตัวล่าง):{" "}
              {totalAmountByCategory("ล่าง").toLocaleString()} บาท
            </Text>
          </div>
        </Card>
      </Col>

      <Col xs={24} md={8}>
        <Card
          title={<h3 className="text-lg font-medium">สรุปยอด 3 ตัว</h3>}
          className="bg-white shadow-sm rounded-lg h-full"
          bordered={false}
        >
          <div className="space-y-3">
            <Text color="darkGrey" className="text-base">
              ยอดรวม (3 ตัวบน):{" "}
              {totalAmountByCategoryTree("บน").toLocaleString()} บาท
            </Text>
            <Text color="darkGrey" className="text-base">
              ยอดรวม (3 ตัวล่าง):{" "}
              {totalAmountByCategoryTree("ล่าง").toLocaleString()} บาท
            </Text>
            <Text color="darkGrey" className="text-base">
              ยอดรวม (3 ตัวโต๊ด):{" "}
              {totalAmountByCategoryTree("โต๊ด").toLocaleString()} บาท
            </Text>
          </div>
        </Card>
      </Col>

      <Col xs={24} md={8}>
        <Card
          title={<h3 className="text-lg font-medium">ยอดรวมทั้งหมด</h3>}
          className="bg-white shadow-sm rounded-lg h-full"
          bordered={false}
        >
          <Text color="darkGrey" className="text-xl font-semibold">
            ยอดรวมทั้งหมด: {totalAmount().toLocaleString()} บาท
          </Text>
        </Card>
      </Col>
    </Row>
  );
};

export default SummaryCards;
