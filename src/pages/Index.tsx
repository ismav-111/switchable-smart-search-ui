
import SearchComponent from '@/components/SearchComponent';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Patent Search System
        </h1>
        <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
          Search patents using standard keyword search or our AI-powered search technology
        </p>
        <SearchComponent />
      </div>
    </div>
  );
};

export default Index;
