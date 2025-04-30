
import React, { useState } from 'react';
import { Search, Expand, X, ArrowRight, Filter, Save, HelpCircle, FileSpreadsheet, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { cn } from '@/lib/utils';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface SearchResult {
  id: string;
  title: string;
  status: string;
  filed: string;
  source: string;
  url: string;
}

const SearchComponent: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchMode, setSearchMode] = useState<'standard' | 'ai'>('standard');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [aiResponse, setAIResponse] = useState<string>('');
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [filters, setFilters] = useState({
    company: 'All Microsoft',
    startYear: '',
    endYear: '',
    searchFields: {
      all: true,
      title: false,
      abstract: false,
      claims: false
    }
  });

  // Mock function to simulate search
  const handleSearch = () => {
    if (searchQuery.trim() === '') return;
    
    if (searchMode === 'ai') {
      // Simulate AI search response
      setAIResponse(
        `Memotech record not found for USPTO record with application number ${searchQuery}.`
      );
      setSearchResults([]);
    } else {
      // Simulate regular search results
      setSearchResults([
        {
          id: '412254-1201',
          title: 'Method and system of providing access to documents stored in personal storage mediums',
          status: 'Grant',
          filed: '2022-06-15',
          source: 'uspto.gov',
          url: 'https://patents.uspto.gov/412254-1201'
        },
        {
          id: '412255-1305',
          title: 'System for data processing with distributed databases',
          status: 'Published',
          filed: '2021-08-22',
          source: 'uspto.gov',
          url: 'https://patents.uspto.gov/412255-1305'
        },
        {
          id: '412256-1408',
          title: 'Method for secure authentication in networked systems',
          status: 'Grant',
          filed: '2021-04-10',
          source: 'uspto.gov',
          url: 'https://patents.uspto.gov/412256-1408'
        }
      ]);
      setAIResponse('');
    }
  };

  const clearFilters = () => {
    setFilters({
      company: 'All Microsoft',
      startYear: '',
      endYear: '',
      searchFields: {
        all: true,
        title: false,
        abstract: false,
        claims: false
      }
    });
  };

  const toggleSearchField = (field: 'all' | 'title' | 'abstract' | 'claims') => {
    if (field === 'all') {
      setFilters({
        ...filters,
        searchFields: {
          all: true,
          title: false,
          abstract: false,
          claims: false
        }
      });
    } else {
      setFilters({
        ...filters,
        searchFields: {
          ...filters.searchFields,
          all: false,
          [field]: !filters.searchFields[field]
        }
      });
    }
  };

  return (
    <div className="w-full">
      {/* Search Bar Section */}
      <div className="bg-gray-50 p-4 rounded-lg shadow-sm mb-4">
        <div className="flex flex-col gap-4">
          {/* Search Input with Mode Toggle */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex items-center gap-2 flex-grow">
              <span className="font-medium text-gray-700 whitespace-nowrap">Search :</span>
              <div className="relative w-full">
                <Input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pr-10 border-gray-300"
                  placeholder="Enter patent number, keyword, or inventor name..."
                />
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="absolute right-0 top-0 h-full" 
                  onClick={handleSearch}
                >
                  <Search className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* AI Search Toggle Button */}
            <Button
              variant={searchMode === 'ai' ? "default" : "outline"}
              className={cn(
                "flex gap-2",
                searchMode === 'ai' ? "bg-blue-600 text-white" : "bg-white text-gray-700"
              )}
              onClick={() => setSearchMode(searchMode === 'ai' ? 'standard' : 'ai')}
            >
              <div className="bg-blue-600 text-white p-1 rounded">
                <Search className="h-4 w-4" />
              </div>
              AI Search
            </Button>
          </div>

          {/* Search By Dropdown */}
          <div className="flex flex-wrap gap-4 items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex gap-2 bg-white border-gray-300">
                  <span>Search by</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuGroup>
                  <DropdownMenuItem>Patent Number</DropdownMenuItem>
                  <DropdownMenuItem>Title</DropdownMenuItem>
                  <DropdownMenuItem>Abstract</DropdownMenuItem>
                  <DropdownMenuItem>Inventor</DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* AI Response Section */}
      {searchMode === 'ai' && aiResponse && (
        <Card className="mb-6 border-gray-200 bg-white">
          <CardContent className="p-4">
            <div className="flex justify-between items-center mb-2">
              <p className="font-medium text-gray-700">AI Search Results</p>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsExpanded(!isExpanded)}
                className="h-8 w-8"
              >
                <Expand className="h-5 w-5" />
              </Button>
            </div>
            <div className={cn(
              "text-sm text-gray-800 transition-all duration-300 ease-in-out",
              isExpanded ? "max-h-full" : "max-h-20 overflow-hidden"
            )}>
              {aiResponse}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2 my-4 justify-center md:justify-start">
        <Button 
          variant="outline" 
          className="border-blue-400 text-blue-600 hover:bg-blue-50"
        >
          <HelpCircle className="h-4 w-4 mr-1" />
          Show Help
        </Button>
        <Button 
          variant="outline"
          className="border-blue-400 text-blue-600 hover:bg-blue-50"
        >
          <Save className="h-4 w-4 mr-1" />
          Save Query
        </Button>
        <Button 
          variant="outline"
          className="border-blue-400 text-blue-600 hover:bg-blue-50"
        >
          Show My Saved Queries
        </Button>
        <Button 
          variant="outline"
          className="border-blue-400 text-blue-600 hover:bg-blue-50"
        >
          <FileSpreadsheet className="h-4 w-4 mr-1" />
          Export To Excel
        </Button>
      </div>

      {/* Filters Section */}
      <div className="flex flex-wrap gap-3 mb-6 items-center">
        <span className="font-medium text-gray-700">Filter By:</span>
        
        <div className="flex gap-2">
          <Select value={filters.company} onValueChange={(value) => setFilters({...filters, company: value})}>
            <SelectTrigger className="w-[180px] bg-white border-gray-300">
              <SelectValue placeholder="All Microsoft" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All Microsoft">All Microsoft</SelectItem>
              <SelectItem value="Microsoft Corp">Microsoft Corp</SelectItem>
              <SelectItem value="Microsoft Research">Microsoft Research</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={filters.startYear} onValueChange={(value) => setFilters({...filters, startYear: value})}>
            <SelectTrigger className="w-[180px] bg-white border-gray-300">
              <SelectValue placeholder="Filing Start Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
              <SelectItem value="2021">2021</SelectItem>
              <SelectItem value="2020">2020</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={filters.endYear} onValueChange={(value) => setFilters({...filters, endYear: value})}>
            <SelectTrigger className="w-[180px] bg-white border-gray-300">
              <SelectValue placeholder="Filing End Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
              <SelectItem value="2021">2021</SelectItem>
              <SelectItem value="2020">2020</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button 
          variant="ghost" 
          className="text-blue-600 hover:bg-blue-50 flex items-center"
          onClick={clearFilters}
        >
          <X className="h-4 w-4 mr-1" />
          Clear
        </Button>
      </div>

      {/* Search Fields */}
      <div className="flex flex-wrap gap-3 mb-6 items-center">
        <span className="font-medium text-gray-700">Search By:</span>
        
        <div className="flex gap-4 items-center">
          <label className="flex items-center gap-2">
            <input 
              type="checkbox" 
              checked={filters.searchFields.all}
              onChange={() => toggleSearchField('all')} 
              className="rounded text-blue-600"
            />
            All
          </label>
          
          <label className="flex items-center gap-2">
            <input 
              type="checkbox" 
              checked={filters.searchFields.title}
              onChange={() => toggleSearchField('title')} 
              className="rounded text-blue-600"
            />
            Title
          </label>
          
          <label className="flex items-center gap-2">
            <input 
              type="checkbox" 
              checked={filters.searchFields.abstract}
              onChange={() => toggleSearchField('abstract')} 
              className="rounded text-blue-600"
            />
            Abstract
          </label>
          
          <label className="flex items-center gap-2">
            <input 
              type="checkbox" 
              checked={filters.searchFields.claims}
              onChange={() => toggleSearchField('claims')} 
              className="rounded text-blue-600"
            />
            Claims (USPTO docs)
          </label>
        </div>
      </div>

      {/* Results Section */}
      {searchResults.length > 0 && (
        <div className="mt-6">
          <div className="text-sm text-gray-600 mb-2">
            Showing 1-{searchResults.length} of {searchResults.length} results
          </div>
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead className="font-medium">AOQ Ref #</TableHead>
                  <TableHead className="font-medium">Title</TableHead>
                  <TableHead className="font-medium">Status</TableHead>
                  <TableHead className="font-medium">Filed</TableHead>
                  <TableHead className="font-medium">Source</TableHead>
                  <TableHead className="font-medium">URL</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {searchResults.map((result) => (
                  <TableRow key={result.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{result.id}</TableCell>
                    <TableCell className="max-w-md">{result.title}</TableCell>
                    <TableCell>{result.status}</TableCell>
                    <TableCell>{result.filed}</TableCell>
                    <TableCell>{result.source}</TableCell>
                    <TableCell>
                      <a href={result.url} className="text-blue-600 hover:underline">Link</a>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}

      {/* Initial Empty State or No Results */}
      {searchResults.length === 0 && searchMode !== 'ai' && searchQuery.trim() !== '' && (
        <div className="text-center p-10 bg-gray-50 rounded-lg">
          <Search className="mx-auto h-8 w-8 text-gray-400 mb-2" />
          <p className="text-gray-500">No results found for "{searchQuery}"</p>
        </div>
      )}
      
      {searchResults.length === 0 && searchQuery.trim() === '' && !aiResponse && (
        <div className="text-center p-12 bg-gray-50 rounded-lg">
          <Search className="mx-auto h-10 w-10 text-gray-400 mb-3" />
          <p className="text-lg text-gray-500">Enter a search query to begin</p>
          <p className="text-gray-500 text-sm mt-2">
            Search by patent number, keyword, or inventor name
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchComponent;
