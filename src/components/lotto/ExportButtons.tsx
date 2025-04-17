// import { Button } from "antd";
import { DataItem } from "./types";
import ExportExcelButton from "../ui/ExportFile";
import ExportPDFButton from "../ui/ExportPDF";

interface ExportButtonsProps {
  data: DataItem[];
}

const ExportButtons = ({ data }: ExportButtonsProps) => {
  return (
    <div className="flex gap-4 my-6">
      <ExportExcelButton data={data} />
      <ExportPDFButton data={data} />
    </div>
  );
};

export default ExportButtons;
