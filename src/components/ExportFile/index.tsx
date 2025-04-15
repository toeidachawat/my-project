import { Button } from "antd";
import * as XLSX from "xlsx";
import { FileExcelOutlined } from "@ant-design/icons";
import "../../styles/table.css"; // นำเข้ารูปแบบ CSS

const ExportExcelButton = ({ data }: { data: any[] }) => {
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "รายการหวย");

    XLSX.writeFile(wb, "รายงานหวย.xlsx");
  };

  return (
    <Button
      icon={<FileExcelOutlined />}
      onClick={exportToExcel}
      // className="export-excel-btn" // เพิ่ม class สำหรับตกแต่ง
    >
      ส่งออก Excel
    </Button>
  );
};

export default ExportExcelButton;
