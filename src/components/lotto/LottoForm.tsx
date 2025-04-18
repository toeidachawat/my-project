import { Button, Checkbox, Form, Input, Radio } from "antd";
import { useForm, useWatch } from "antd/es/form/Form";
import { useState, useEffect } from "react";
import "../../styles/LottoForm.css";

interface LottoFormProps {
  onAddNumber: (values: any) => void;
}

const LottoForm = ({ onAddNumber }: LottoFormProps) => {
  const [form] = useForm();
  const number = useWatch("number", form);
  const [isReversed, setIsReversed] = useState(false);
  const [digitCount, setDigitCount] = useState<number>(0);

  // ตรวจสอบจำนวนหลักของตัวเลข
  useEffect(() => {
    if (number) {
      setDigitCount(number.length);
    } else {
      setDigitCount(0);
    }
  }, [number]);

  const handleSubmit = (values: any) => {
    const submitValues = {
      ...values,
      isReversed: isReversed && digitCount === 2,
    };

    onAddNumber(submitValues);
    form.resetFields();
    setIsReversed(false);
  };

  return (
    <div className="lotto-form-container">
      <h2 className="lotto-form-title">เพิ่มหมายเลขหวย</h2>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <div className="lotto-form-layout">
          {/* Single input for both 2 and 3 digit numbers */}
          <Form.Item
            label={<span className="lotto-form-label">เลข 2-3 ตัว</span>}
            name="number"
            rules={[
              { required: true, message: "กรุณากรอกตัวเลข!" },
              { pattern: /^\d{2,3}$/, message: "กรอกได้ 2-3 หลักเท่านั้น" },
            ]}
            style={{ flex: 1, minWidth: "120px", marginBottom: "8px" }}
          >
            <Input
              className="lotto-form-input"
              placeholder="เช่น 25 หรือ 789"
              maxLength={3}
              onChange={(e) => {
                const value = e.target.value;
                // Reset category if necessary when changing number
                if (value.length !== 3) {
                  form.setFieldsValue({ category: undefined });
                }
              }}
            />
          </Form.Item>

          {/* Checkbox for reversing 2-digit numbers */}
          {digitCount === 2 && (
            <Form.Item style={{ marginBottom: "8px" }}>
              <Checkbox
                className="lotto-form-checkbox"
                checked={isReversed}
                onChange={(e) => setIsReversed(e.target.checked)}
              >
                กลับเลข ({number} ↔{" "}
                {number ? number.split("").reverse().join("") : ""})
              </Checkbox>
            </Form.Item>
          )}

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
              style={{ display: "flex", gap: "8px" }}
            >
              <Radio.Button value="บน">บน</Radio.Button>
              <Radio.Button value="ล่าง">ล่าง</Radio.Button>
              {digitCount === 3 && (
                <Radio.Button value="โต๊ด">โต๊ด</Radio.Button>
              )}
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
