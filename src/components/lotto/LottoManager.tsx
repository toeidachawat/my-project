import { useState } from "react";
import axios from "axios";
import { DataItem } from "./types";
import LottoForm from "./LottoForm";
import LottoTabs from "./LottoTabs";
import SummaryCards from "./SummaryCards";
import DangerNumbers from "./DangerNumbers";
import ExportButtons from "./ExportButtons";

const LottoManager = () => {
  const [data, setData] = useState<DataItem[]>([]);

  // ฟังก์ชั่นในการ generate เลขโต๊ด
  const generateReverseCombinations = (num: string): string[] => {
    if (num.length !== 3) return [];
    const perms = new Set<string>();

    const permute = (str: string[], l = 0) => {
      if (l === str.length - 1) {
        perms.add(str.join(""));
      } else {
        for (let i = l; i < str.length; i++) {
          [str[l], str[i]] = [str[i], str[l]];
          permute([...str], l + 1);
        }
      }
    };

    permute(num.split(""));
    return Array.from(perms);
  };

  // บันทึกข้อมูลไปยัง Backend
  const saveDataToBackend = async (newData: DataItem[]) => {
    try {
      await axios.post("/api/lotto", newData);
      console.log("Data saved to backend!");
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  // เพิ่มเลขลงในตาราง
  const handleAdd = (value: {
    number: string;
    category: string;
    amount: string;
    isReversed: boolean;
  }) => {
    if (!value.number) return;

    const newData: DataItem[] = [];
    const amount = value.amount;
    const digitCount = value.number.length;

    // กรณีเป็นเลข 3 ตัวและเป็นโต๊ด
    if (digitCount === 3 && value.category === "โต๊ด") {
      const permutations = generateReverseCombinations(value.number);
      permutations.forEach((perm, index) => {
        if (!data.some((d) => d.number === perm && d.category === "โต๊ด")) {
          newData.push({
            key: data.length + index,
            number: perm,
            category: "โต๊ด",
            amount,
            isReversed: false,
          });
        }
      });
    } else {
      // กรณีปกติ - เพิ่มเลข
      newData.push({
        key: data.length,
        number: value.number,
        category: value.category,
        amount: value.amount,
        isReversed: false,
      });

      // กรณีเป็นเลข 2 ตัวและต้องการกลับเลข
      if (digitCount === 2 && value.isReversed) {
        const reversedNumber = value.number.split("").reverse().join("");
        if (reversedNumber !== value.number) {
          newData.push({
            key: data.length + 1,
            number: reversedNumber,
            category: value.category,
            amount,
            isReversed: false,
          });
        }
      }
    }

    setData([...data, ...newData]);
    saveDataToBackend(newData);
  };

  // ลบรายการ
  const handleDelete = (key: number) => {
    setData(data.filter((item) => item.key !== key));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="space-y-6">
        <LottoTabs data={data} onDelete={handleDelete} />

        <LottoForm onAddNumber={handleAdd} />
        <div style={{ paddingTop: 14 }}>
          <ExportButtons data={data} />
        </div>
        <div style={{ paddingTop: 14 }}>
          <SummaryCards data={data} />
        </div>

        <DangerNumbers data={data} threshold={500} />
      </div>
    </div>
  );
};

export default LottoManager;
