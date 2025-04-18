import { Card } from "antd";
import { DataItem, DangerousNumber } from "./types";
import Text from "../ui/Text"; // ใช้ component Text เดิม

interface DangerNumbersProps {
  data: DataItem[];
  threshold?: number; // ค่า threshold ที่จะแสดงเป็นเลขอั้น
}

const DangerNumbers = ({ data, threshold = 500 }: DangerNumbersProps) => {
  // คำนวณเลขอั้น
  const getDangerousNumbers = (): DangerousNumber[] => {
    const numberMap: { [key: string]: number } = {};

    data.forEach((item) => {
      const num = item.number || item.number;
      if (num) {
        numberMap[num] = (numberMap[num] || 0) + parseFloat(item.amount || "0");
      }
    });

    return (
      Object.entries(numberMap)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .filter(([_, sum]) => sum >= 440 && sum >= threshold)
        .map(([num, sum]) => ({ number: num, total: sum }))
    );
  };

  const dangerousNumbers = getDangerousNumbers();

  return (
    <Card
      title={<h3 className="text-lg font-medium">เลขอั้น</h3>}
      className="bg-white shadow-sm rounded-lg mt-6"
      bordered={false}
    >
      {dangerousNumbers.length > 0 ? (
        <div>
          <Text color="red" strong className="text-base flex items-center">
            <span className="text-xl mr-2">⚠️</span> เลขที่มียอดแทงเกิน{" "}
            {threshold} บาท:
          </Text>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            {dangerousNumbers.map((item) => (
              <div
                key={item.number}
                className="bg-red-50 p-4 rounded-lg border border-red-100"
              >
                <div className="flex justify-between items-center">
                  <Text color="red" className="text-lg font-semibold">
                    เลข {item.number}
                  </Text>
                  <Text color="red" strong className="text-lg">
                    {item.total.toLocaleString()} บาท
                  </Text>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <Text color="darkGrey" className="text-base">
          ไม่มีเลขที่มียอดแทงเกิน {threshold} บาท
        </Text>
      )}
    </Card>
  );
};

export default DangerNumbers;
