
import SearchComponent from '@/components/SearchComponent';

const Index = () => {
  return (
    <div className="min-h-screen bg-white py-6">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Patent Search System
        </h1>
        <SearchComponent />
      </div>
    </div>
  );
};

export default Index;
