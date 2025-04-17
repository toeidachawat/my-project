import { Tabs, Table, Button, Popconfirm } from "antd";
import { DataItem } from "./types";

interface LottoTabsProps {
  data: DataItem[];
  onDelete: (key: number) => void;
}

const LottoTabs = ({ data, onDelete }: LottoTabsProps) => {
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
        <div className="text-center">
          <Popconfirm
            title="คุณแน่ใจหรือไม่ว่าจะลบ?"
            onConfirm={() => onDelete(record.key)}
            okText="ใช่"
            cancelText="ยกเลิก"
          >
            <Button
              danger
              size="large"
              className="font-medium text-base hover:bg-red-50"
            >
              ลบ
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <Tabs
        defaultActiveKey="บน"
        className="lotto-tabs"
        items={["บน", "ล่าง", "โต๊ด"].map((cat) => ({
          key: cat,
          label: `เลข ${cat}`,
          children: (
            <Table
              className="custom-table"
              dataSource={data.filter((item) => item.category === cat)}
              columns={columns}
              rowKey="key"
              pagination={{ pageSize: 6 }}
              bordered
              rowClassName={() => "text-base"}
            />
          ),
        }))}
      />
    </div>
  );
};

export default LottoTabs;
