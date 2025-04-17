import { Button } from "antd";
import { FileExcelOutlined } from "@ant-design/icons";
import { DataItem } from "../lotto/types";

interface ExportExcelButtonProps {
  data: DataItem[];
}

const ExportExcelButton = ({ data }: ExportExcelButtonProps) => {
  // ฟังก์ชันสำหรับแปลงข้อมูลเป็น CSV
  const convertToCSV = (objArray: DataItem[]) => {
    const array = [["เลข 2 ตัว", "เลข 3 ตัว", "ประเภท", "จำนวนเงิน"]];

    objArray.forEach((item) => {
      array.push([
        item.number2 || "",
        item.number3 || "",
        item.category,
        item.amount,
      ]);
    });

    return array.map((row) => row.join(",")).join("\n");
  };

  // ฟังก์ชันสำหรับดาวน์โหลดไฟล์ CSV
  const downloadCSV = () => {
    if (data.length === 0) {
      alert("ไม่มีข้อมูลสำหรับการส่งออก");
      return;
    }

    const csv = convertToCSV(data);
    const blob = new Blob(["\ufeff", csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "lotto-data.csv");
    link.style.visibility = "hidden";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Button
      type="default"
      icon={<FileExcelOutlined />}
      onClick={downloadCSV}
      size="large"
      className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100 hover:border-green-300"
    >
      ส่งออกเป็น Excel
    </Button>
  );
};

export default ExportExcelButton;
