import { useForm, useWatch } from "antd/es/form/Form";
import { Button, Checkbox, Form, Input, Radio } from "antd";
import { useState } from "react";

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
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <div className="flex flex-wrap gap-4 items-end">
        {/* เลข 2 ตัว */}
        <Form.Item
          label="เลข 2 ตัว"
          name="number2"
          className="flex-1 min-w-[120px]"
          rules={[{ pattern: /^\d{0,2}$/, message: "กรอกได้สูงสุด 2 หลัก" }]}
        >
          <Input
            placeholder="เช่น 25"
            maxLength={2}
            disabled={!!number3}
            className="text-lg text-center"
          />
        </Form.Item>

        {/* Checkbox กลับเลข */}
        <Form.Item className="flex items-center mt-6">
          <Checkbox
            disabled={!!number3}
            checked={isReversed}
            onChange={(e) => setIsReversed(e.target.checked)}
          >
            กลับเลข (25 ↔ 52)
          </Checkbox>
        </Form.Item>

        {/* เลข 3 ตัว */}
        <Form.Item
          label="เลข 3 ตัว"
          name="number3"
          className="flex-1 min-w-[120px]"
          rules={[{ pattern: /^\d{0,3}$/, message: "กรอกได้สูงสุด 3 หลัก" }]}
        >
          <Input
            placeholder="เช่น 789"
            maxLength={3}
            disabled={!!number2}
            className="text-lg text-center"
            onChange={(e) => {
              if (!e.target.value) {
                form.resetFields(["category"]);
              }
              setIsReversed(false);
            }}
          />
        </Form.Item>

        {/* ประเภท */}
        <Form.Item
          label="ประเภท"
          name="category"
          className="flex-1 min-w-[160px]"
          rules={[{ required: true, message: "กรุณาเลือกประเภท!" }]}
        >
          <Radio.Group
            optionType="button"
            buttonStyle="solid"
            className="flex flex-wrap gap-2"
          >
            <Radio.Button value="บน">บน</Radio.Button>
            <Radio.Button value="ล่าง">ล่าง</Radio.Button>
            {number3 && <Radio.Button value="โต๊ด">โต๊ด</Radio.Button>}
          </Radio.Group>
        </Form.Item>

        {/* จำนวนเงิน */}
        <Form.Item
          label="จำนวนเงิน (บาท)"
          name="amount"
          className="flex-1 min-w-[140px]"
          rules={[
            { required: true, message: "กรุณากรอกจำนวนเงิน!" },
            { pattern: /^[0-9]+$/, message: "ต้องเป็นตัวเลขเท่านั้น" },
          ]}
        >
          <Input placeholder="เช่น 50" className="text-lg text-center" />
        </Form.Item>

        {/* ปุ่มเพิ่ม */}
        <Form.Item className="w-full">
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            className="w-full bg-primary font-semibold text-white"
          >
            เพิ่มรายการ
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
};

export default LottoForm;
