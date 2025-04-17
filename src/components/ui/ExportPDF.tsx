import { Button } from "antd";
import { FilePdfOutlined } from "@ant-design/icons";
import { DataItem } from "../lotto/types";

interface ExportPDFButtonProps {
  data: DataItem[];
}

const ExportPDFButton = ({ data }: ExportPDFButtonProps) => {
  // ฟังก์ชันสำหรับสร้าง PDF และดาวน์โหลด
  const generatePDF = () => {
    if (data.length === 0) {
      alert("ไม่มีข้อมูลสำหรับการส่งออก");
      return;
    }

    // ในตัวอย่างนี้เราจะใช้วิธีสร้าง HTML และพิมพ์เป็น PDF แทนเนื่องจากไม่ได้ติดตั้งไลบรารี PDF
    // สำหรับการใช้งานจริงควรใช้ไลบรารีเช่น jsPDF หรือ pdfmake

    const newWindow = window.open("", "_blank");

    if (!newWindow) {
      alert("กรุณาอนุญาตให้เปิดหน้าต่างป๊อปอัพสำหรับสร้าง PDF");
      return;
    }

    let htmlContent = `
      <html>
        <head>
          <title>รายงานข้อมูลลอตเตอรี่</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1 { text-align: center; color: #333; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
            .summary { margin-top: 30px; }
            .summary h2 { color: #444; }
            @media print {
              button { display: none; }
            }
          </style>
        </head>
        <body>
          <h1>รายงานข้อมูลลอตเตอรี่</h1>
          <button onclick="window.print()">พิมพ์เป็น PDF</button>
          <table>
            <thead>
              <tr>
                <th>เลข 2 ตัว</th>
                <th>เลข 3 ตัว</th>
                <th>ประเภท</th>
                <th>จำนวนเงิน (บาท)</th>
              </tr>
            </thead>
            <tbody>
    `;

    // เพิ่มแถวข้อมูล
    data.forEach((item) => {
      htmlContent += `
        <tr>
          <td>${item.number2 || "-"}</td>
          <td>${item.number3 || "-"}</td>
          <td>${item.category}</td>
          <td>${parseInt(item.amount).toLocaleString()}</td>
        </tr>
      `;
    });

    // คำนวณยอดรวม
    const totalAmount = data.reduce(
      (sum, item) => sum + parseInt(item.amount || "0"),
      0
    );

    htmlContent += `
            </tbody>
          </table>
          
          <div class="summary">
            <h2>สรุปยอดรวม</h2>
            <p><strong>จำนวนรายการทั้งหมด:</strong> ${data.length} รายการ</p>
            <p><strong>ยอดเงินรวมทั้งสิ้น:</strong> ${totalAmount.toLocaleString()} บาท</p>
          </div>
        </body>
      </html>
    `;

    newWindow.document.open();
    newWindow.document.write(htmlContent);
    newWindow.document.close();
  };

  return (
    <Button
      type="default"
      icon={<FilePdfOutlined />}
      onClick={generatePDF}
      size="large"
      className="bg-red-50 text-red-700 border-red-200 hover:bg-red-100 hover:border-red-300"
    >
      ส่งออกเป็น PDF
    </Button>
  );
};

export default ExportPDFButton;
