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
          // ไม่ต้อง swap กลับ เพราะใช้ [...str]
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
    number2: string;
    number3: string;
    category: string;
    amount: string;
    isReversed: boolean;
  }) => {
    if (!value.number2 && !value.number3) return;

    const newData: DataItem[] = [];
    const amount = value.amount;

    if (
      value.number3 &&
      value.category === "โต๊ด" &&
      value.number3.length === 3
    ) {
      const permutations = generateReverseCombinations(value.number3);
      permutations.forEach((perm, index) => {
        if (!data.some((d) => d.number3 === perm && d.category === "โต๊ด")) {
          newData.push({
            key: data.length + index,
            number2: "",
            number3: perm,
            category: "โต๊ด",
            amount,
          });
        }
      });
    } else {
      newData.push({
        key: data.length,
        number2: value.number2,
        number3: value.number3,
        category: value.category,
        amount: value.amount,
      });

      if (value.number2 && value.number2.length === 2 && value.isReversed) {
        const reversedNumber2 = value.number2.split("").reverse().join("");
        if (reversedNumber2 !== value.number2) {
          newData.push({
            key: data.length + 1,
            number2: reversedNumber2,
            number3: value.number3,
            category: value.category,
            amount,
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
        {/* ส่วนฟอร์มเพิ่มเลข */}
        <LottoForm onAddNumber={handleAdd} />

        {/* ส่วนแสดงข้อมูลในรูปแบบ tabs */}
        <LottoTabs data={data} onDelete={handleDelete} />

        {/* ส่วนปุ่มส่งออกข้อมูล */}
        <ExportButtons data={data} />

        {/* ส่วนแสดงสรุปยอด */}
        <SummaryCards data={data} />

        {/* ส่วนแสดงเลขอั้น */}
        <DangerNumbers data={data} threshold={500} />
      </div>
    </div>
  );
};

export default LottoManager;
