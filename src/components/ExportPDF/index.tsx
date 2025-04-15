import { Button } from "antd";
import jsPDF from "jspdf";
import { FilePdfOutlined } from "@ant-design/icons";

const ExportPdfButton = ({ data }: { data: any[] }) => {
  const exportToPdf = () => {
    const doc = new jsPDF();

    // โหลดฟอนต์จาก Base64 แล้วใช้งาน

    doc.text("ข้อมูลของคุณ:", 20, 20);
    let y = 30;
    data.forEach((item, index) => {
      doc.text(
        `${index + 1}. ${item.number2} - ${item.number3} - ${item.category} - ${
          item.amount
        }`,
        20,
        y
      );
      y += 10;
    });

    doc.save("data.pdf");
  };

  return (
    <Button icon={<FilePdfOutlined />} onClick={exportToPdf}>
      ส่งออกเป็น PDF
    </Button>
  );
};

export default ExportPdfButton;
