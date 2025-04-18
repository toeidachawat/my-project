import { Tabs, Table, Button, Popconfirm } from "antd";
import { DataItem } from "./types";
import "../../styles/LottoTabs.css";

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
      align: "center" as const,
      render: (text: string, record: DataItem) => (
        <span className="lotto-tabs__number">
          {text}
          {record.isReversed && (
            <span className="lotto-tabs__reversed-badge">กลับเลขแล้ว</span>
          )}
        </span>
      ),
    },
    {
      title: "เลข 3 ตัว",
      dataIndex: "number3",
      key: "number3",
      align: "center" as const,
      render: (text: string) => (
        <span className="lotto-tabs__number">{text}</span>
      ),
    },
    {
      title: "หมวดหมู่",
      dataIndex: "category",
      key: "category",
      align: "center" as const,
      render: (category: string) => (
        <span
          className={`lotto-tabs__category lotto-tabs__category--${category}`}
        >
          {category}
        </span>
      ),
    },
    {
      title: "จำนวนเงิน",
      dataIndex: "amount",
      key: "amount",
      align: "right" as const,
      render: (amount: string) => (
        <span className="lotto-tabs__amount">
          ฿{Number(amount).toLocaleString()}
        </span>
      ),
    },
    {
      title: "",
      key: "action",
      align: "center" as const,
      render: (_: unknown, record: DataItem) => (
        <Popconfirm
          title="คุณแน่ใจหรือไม่ว่าจะลบ?"
          onConfirm={() => onDelete(record.key)}
          okText="ใช่"
          cancelText="ยกเลิก"
          placement="left"
          okButtonProps={{ className: "lotto-tabs__confirm-button" }}
          cancelButtonProps={{ className: "lotto-tabs__cancel-button" }}
        >
          <Button danger className="lotto-tabs__delete-button">
            ลบ
          </Button>
        </Popconfirm>
      ),
    },
  ];

  const tabItems = ["บน", "ล่าง", "โต๊ด"].map((cat) => ({
    key: cat,
    label: <span className="lotto-tabs__tab-label">เลข{cat}</span>,
    children: (
      <div className="lotto-tabs__table-container">
        <Table
          className="lotto-tabs__table"
          dataSource={data.filter((item) => item.category === cat)}
          columns={columns}
          rowKey="key"
          pagination={{
            pageSize: 6,
            className: "lotto-tabs__pagination",
          }}
          bordered
          locale={{
            emptyText: (
              <div className="lotto-tabs__empty-state">
                <p>ยังไม่มีรายการ {cat}</p>
              </div>
            ),
          }}
        />
      </div>
    ),
  }));

  return (
    <div className="lotto-tabs">
      <div className="lotto-tabs__header">
        <h2 className="lotto-tabs__title">รายการหวยของคุณ</h2>
        <p className="lotto-tabs__subtitle">ดูรายการทั้งหมดตามประเภท</p>
      </div>
      <div className="lotto-tabs__content">
        <Tabs
          defaultActiveKey="บน"
          className="lotto-tabs__tabs"
          items={tabItems}
          type="card"
        />
      </div>
    </div>
  );
};

export default LottoTabs;
