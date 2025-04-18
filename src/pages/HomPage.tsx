import LottoManager from "../components/lotto/LottoManager";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800">
            ระบบจัดการเลขลอตเตอรี่
          </h1>
        </div>

        <LottoManager />
      </div>
    </div>
  );
};

export default HomePage;
