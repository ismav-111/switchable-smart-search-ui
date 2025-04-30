
import React, { useState } from 'react';
import { Search, Expand, Minimize, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

interface SearchResult {
  id: string;
  title: string;
  content: string;
}

const SearchComponent: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isAISearch, setIsAISearch] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [aiResponse, setAIResponse] = useState<string>('');
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [expandedResults, setExpandedResults] = useState<Set<string>>(new Set());

  // Mock function to simulate search
  const handleSearch = () => {
    if (searchQuery.trim() === '') return;
    
    if (isAISearch) {
      // Simulate AI search response
      setAIResponse(
        `Memotech record not found for USPTO record with application number ${searchQuery}. 
        
        The search performed across multiple patent databases shows no matching records for this application number. This could be due to several factors:
        
        1. The application might be recent and not yet indexed in the Memotech system
        2. There might be a formatting issue with the application number
        3. The application might exist in a different patent office database
        
        Recommended actions:
        - Verify the application number format (e.g., US-XXXXXXXX-A1)
        - Try searching by other parameters such as inventor name or filing date
        - Check if the application has been published yet`
      );
      setSearchResults([]);
    } else {
      // Simulate regular search results
      setSearchResults([
        {
          id: '1',
          title: 'Method and system of providing access to documents stored in personal storage mediums',
          content: 'Patent application related to document access systems in personal storage.'
        },
        {
          id: '2',
          title: 'System for data processing with distributed databases',
          content: 'Patent describing distributed database architecture for large-scale data processing.'
        },
        {
          id: '3',
          title: 'Method for secure authentication in networked systems',
          content: 'Security patent focusing on authentication methods for enterprise networks.'
        }
      ]);
      setAIResponse('');
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedResults(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Patent Search</h1>
        
        <div className="flex flex-col gap-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1 flex items-center relative">
              <Input
                type="text"
                placeholder="Enter search query..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pr-10"
              />
              <Button 
                size="icon" 
                variant="ghost" 
                className="absolute right-0" 
                onClick={handleSearch}
              >
                <Search className="h-5 w-5" />
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <span className={cn("text-sm", isAISearch ? "text-muted-foreground" : "font-medium")}>Standard</span>
              <Switch 
                checked={isAISearch} 
                onCheckedChange={setIsAISearch}
              />
              <span className={cn("text-sm", isAISearch ? "font-medium" : "text-muted-foreground")}>AI Search</span>
            </div>
          </div>
          
          <div className="flex gap-2 flex-wrap">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => {}}
            >
              Show Help
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => {}}
            >
              Save Query
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => {}}
            >
              Show My Saved Queries
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => {}}
            >
              Export To Excel
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div className="flex items-center gap-2">
              <span className="text-sm whitespace-nowrap">Filter By:</span>
              <select className="flex-1 h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm">
                <option>All Microsoft</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <select className="flex-1 h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm">
                <option>Filing Start Year</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <select className="flex-1 h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm">
                <option>Filing End Year</option>
              </select>
              <Button variant="ghost" size="sm">Clear</Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Results Section */}
      <div className="mt-6">
        {isAISearch && aiResponse && (
          <Card className="mb-6">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-md font-medium">AI Search Results</CardTitle>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? <Minimize className="h-4 w-4" /> : <Expand className="h-4 w-4" />}
              </Button>
            </CardHeader>
            <CardContent>
              <div className={cn(
                "text-sm whitespace-pre-line",
                isExpanded ? "" : "max-h-[120px] overflow-hidden"
              )}>
                {aiResponse}
              </div>
              {!isExpanded && aiResponse.length > 120 && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="mt-2 text-xs" 
                  onClick={() => setIsExpanded(true)}
                >
                  Show more <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              )}
            </CardContent>
          </Card>
        )}
        
        {!isAISearch && searchResults.length > 0 && (
          <>
            <div className="text-sm text-muted-foreground mb-4">
              Showing 1-{searchResults.length} of {searchResults.length} results
            </div>
            <div className="border rounded-md">
              <table className="min-w-full divide-y divide-border">
                <thead className="bg-muted">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Ref #
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Title
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Filed
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-card divide-y divide-border">
                  {searchResults.map((result) => (
                    <tr key={result.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {result.id}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <div>
                          <div className="font-medium">{result.title}</div>
                          <div className={cn(
                            "text-muted-foreground mt-1",
                            expandedResults.has(result.id) ? "" : "line-clamp-1"
                          )}>
                            {result.content}
                          </div>
                          {result.content.length > 50 && (
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="mt-1 h-6 text-xs" 
                              onClick={() => toggleExpand(result.id)}
                            >
                              {expandedResults.has(result.id) ? "Show less" : "Show more"}
                            </Button>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        Grant
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        2022-06-15
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
        
        {((isAISearch && !aiResponse) || (!isAISearch && searchResults.length === 0)) && 
          searchQuery.trim() !== '' && (
            <div className="text-center p-8 text-muted-foreground">
              No results found for "{searchQuery}"
            </div>
          )}
          
        {searchQuery.trim() === '' && (
          <div className="text-center p-8 text-muted-foreground">
            Enter a search query to begin
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchComponent;
