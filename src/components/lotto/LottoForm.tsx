import { Button, Checkbox, Form, Input, Radio } from "antd";
import { useForm, useWatch } from "antd/es/form/Form";
import { useState } from "react";
import "../../styles/LottoForm.css"; // ต้องสร้างไฟล์ CSS แยกต่างหาก

interface LottoFormProps {
  onAddNumber: (values: any) => void;
}

const LottoForm = ({ onAddNumber }: LottoFormProps) => {
  const [form] = useForm();
  const number2 = useWatch("number2", form);
  const number3 = useWatch("number3", form);
  const [isReversed, setIsReversed] = useState(false);

  const handleSubmit = (values: any) => {
    onAddNumber({ ...values, isReversed });
    form.resetFields();
    setIsReversed(false);
  };

  return (
    <div className="lotto-form-container">
      <h2 className="lotto-form-title">เพิ่มหมายเลขหวย</h2>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <div className="lotto-form-layout">
          {/* Two-digit number section */}
          <div className="lotto-form-group">
            <Form.Item
              label={<span className="lotto-form-label">เลข 2 ตัว</span>}
              name="number2"
              rules={[
                { pattern: /^\d{0,2}$/, message: "กรอกได้สูงสุด 2 หลัก" },
              ]}
              style={{ flex: 1, minWidth: "120px", marginBottom: "8px" }}
            >
              <Input
                className="lotto-form-input"
                placeholder="เช่น 25"
                maxLength={2}
                disabled={!!number3}
              />
            </Form.Item>

            <Form.Item style={{ marginBottom: "8px", marginTop: "28px" }}>
              <Checkbox
                className="lotto-form-checkbox"
                disabled={!!number3}
                checked={isReversed}
                onChange={(e) => setIsReversed(e.target.checked)}
              >
                กลับเลข (25 ↔ 52)
              </Checkbox>
            </Form.Item>
          </div>

          {/* Three-digit number section */}
          <Form.Item
            label={<span className="lotto-form-label">เลข 3 ตัว</span>}
            name="number3"
            style={{ flex: 1, minWidth: "120px", marginBottom: "8px" }}
            rules={[{ pattern: /^\d{0,3}$/, message: "กรอกได้สูงสุด 3 หลัก" }]}
          >
            <Input
              className="lotto-form-input"
              placeholder="เช่น 789"
              maxLength={3}
              disabled={!!number2}
              onChange={(e) => {
                if (!e.target.value) {
                  form.resetFields(["category"]);
                }
                setIsReversed(false);
              }}
            />
          </Form.Item>

          {/* Category selection */}
          <Form.Item
            label={<span className="lotto-form-label">ประเภท</span>}
            name="category"
            style={{ flex: 1, minWidth: "200px", marginBottom: "8px" }}
            rules={[{ required: true, message: "กรุณาเลือกประเภท!" }]}
          >
            <Radio.Group
              className="lotto-form-radio"
              optionType="button"
              buttonStyle="solid"
              style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}
            >
              <Radio.Button value="บน">บน</Radio.Button>
              <Radio.Button value="ล่าง">ล่าง</Radio.Button>
              {number3 && <Radio.Button value="โต๊ด">โต๊ด</Radio.Button>}
            </Radio.Group>
          </Form.Item>

          {/* Amount section */}
          <Form.Item
            label={<span className="lotto-form-label">จำนวนเงิน (บาท)</span>}
            name="amount"
            style={{ flex: 1, minWidth: "140px", marginBottom: "8px" }}
            rules={[
              { required: true, message: "กรุณากรอกจำนวนเงิน!" },
              { pattern: /^[0-9]+$/, message: "ต้องเป็นตัวเลขเท่านั้น" },
            ]}
          >
            <Input className="lotto-form-input" placeholder="เช่น 50" />
          </Form.Item>
        </div>

        {/* Add button */}
        <Form.Item style={{ marginBottom: 0 }}>
          <Button
            className="lotto-form-button"
            type="primary"
            htmlType="submit"
            size="large"
          >
            เพิ่มรายการ
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LottoForm;
