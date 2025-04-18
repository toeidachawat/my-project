// import { Button } from "antd";
import { DataItem } from "./types";
import ExportExcelButton from "../ui/ExportFile";
import ExportPDFButton from "../ui/ExportPDF";

interface ExportButtonsProps {
  data: DataItem[];
}

const ExportButtons = ({ data }: ExportButtonsProps) => {
  return (
    <div style={{ display: "flex", gap: 6 }}>
      <ExportExcelButton data={data} />
      <ExportPDFButton data={data} />
    </div>
  );
};

export default ExportButtons;
