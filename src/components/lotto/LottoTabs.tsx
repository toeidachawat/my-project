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
      title: "เลข",
      dataIndex: "number",
      key: "number",
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

  <div className="lotto-tabs__table-container"></div>;

  return (
    <div className="lotto-tabs">
      <div className="lotto-tabs__header">
        <div className="lotto-tabs__title">รายการหวยของคุณ</div>
      </div>
      <div className="lotto-tabs__content">
        <Table
          className="lotto-tabs__table"
          dataSource={data.filter((item) => item.category)}
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
                <p>ยังไม่มีรายการ </p>
              </div>
            ),
          }}
        />
      </div>
    </div>
  );
};

export default LottoTabs;
