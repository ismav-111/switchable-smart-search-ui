
import React, { useState } from 'react';
import { Search, Expand, Minimize, ArrowRight, Filter, Save, HelpCircle, FileSpreadsheet } from 'lucide-react';
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
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  const [searchMode, setSearchMode] = useState<'standard' | 'ai'>('standard');

  // Mock function to simulate search
  const handleSearch = () => {
    if (searchQuery.trim() === '') return;
    
    if (searchMode === 'ai') {
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
    <div className="w-full max-w-5xl mx-auto px-4">
      <Card className="border border-gray-200 shadow-md bg-white">
        <CardHeader className="pb-2 border-b">
          <CardTitle className="text-2xl font-bold text-center">Patent Search</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-6">
            {/* Search Input and Mode Selection */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1 w-full">
                  <Input
                    type="text"
                    placeholder="Enter patent number, keyword, or inventor name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pr-10 w-full border-2 focus-visible:ring-1"
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
                <Tabs 
                  defaultValue={searchMode} 
                  className="w-full md:w-auto"
                  onValueChange={(value) => setSearchMode(value as 'standard' | 'ai')}
                >
                  <TabsList className="w-full grid grid-cols-2">
                    <TabsTrigger value="standard">Standard Search</TabsTrigger>
                    <TabsTrigger value="ai">AI Search</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              
              {/* Quick Actions */}
              <div className="flex flex-wrap gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-1"
                >
                  <HelpCircle className="h-4 w-4" />
                  <span>Help</span>
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-1"
                >
                  <Save className="h-4 w-4" />
                  <span>Save Query</span>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex items-center gap-1"
                    >
                      <Filter className="h-4 w-4" />
                      <span>Filters</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuGroup>
                      <DropdownMenuItem>All Microsoft</DropdownMenuItem>
                      <DropdownMenuItem>Filing Start Year</DropdownMenuItem>
                      <DropdownMenuItem>Filing End Year</DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-1"
                >
                  <FileSpreadsheet className="h-4 w-4" />
                  <span>Export</span>
                </Button>
              </div>
            </div>
            
            {/* Results Section */}
            <div className="mt-4">
              {searchMode === 'ai' && aiResponse && (
                <Card className="mb-6 border-l-4 border-l-blue-500">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-md font-medium">AI Search Results</CardTitle>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => setIsExpanded(!isExpanded)}
                      className="h-8 w-8"
                    >
                      {isExpanded ? <Minimize className="h-4 w-4" /> : <Expand className="h-4 w-4" />}
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className={cn(
                      "text-sm whitespace-pre-line transition-all duration-300 ease-in-out",
                      isExpanded ? "" : "max-h-[120px] overflow-hidden"
                    )}>
                      {aiResponse}
                    </div>
                    {!isExpanded && aiResponse.length > 120 && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="mt-2 text-xs flex items-center text-blue-600 hover:text-blue-800" 
                        onClick={() => setIsExpanded(true)}
                      >
                        Show more <ArrowRight className="ml-1 h-3 w-3" />
                      </Button>
                    )}
                  </CardContent>
                </Card>
              )}
              
              {searchMode === 'standard' && searchResults.length > 0 && (
                <>
                  <div className="text-sm text-muted-foreground mb-4">
                    Showing 1-{searchResults.length} of {searchResults.length} results
                  </div>
                  <div className="space-y-4">
                    {searchResults.map((result) => (
                      <Card key={result.id} className="overflow-hidden hover:shadow-md transition-shadow">
                        <CardContent className="p-0">
                          <div className="p-4 border-l-4 border-blue-500">
                            <div className="flex justify-between">
                              <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">{result.id}</span>
                              <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">Grant</span>
                            </div>
                            <h3 className="font-medium text-base mt-2">{result.title}</h3>
                            <div className={cn(
                              "text-muted-foreground text-sm mt-2",
                              expandedResults.has(result.id) ? "" : "line-clamp-2"
                            )}>
                              {result.content}
                            </div>
                            {result.content.length > 50 && (
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="mt-2 h-6 text-xs text-blue-600 hover:text-blue-800 p-0" 
                                onClick={() => toggleExpand(result.id)}
                              >
                                {expandedResults.has(result.id) ? "Show less" : "Show more"}
                              </Button>
                            )}
                            <div className="flex justify-between items-center mt-3 text-xs text-muted-foreground">
                              <span>Filed: 2022-06-15</span>
                              <Button variant="outline" size="sm" className="h-7 text-xs">
                                View Details
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </>
              )}
              
              {((searchMode === 'ai' && !aiResponse) || (searchMode === 'standard' && searchResults.length === 0)) && 
                searchQuery.trim() !== '' && (
                  <div className="text-center p-10 bg-muted/30 rounded-lg">
                    <Search className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">No results found for "{searchQuery}"</p>
                  </div>
                )}
                
              {searchQuery.trim() === '' && (
                <div className="text-center p-12 bg-muted/30 rounded-lg">
                  <Search className="mx-auto h-10 w-10 text-muted-foreground mb-3" />
                  <p className="text-lg text-muted-foreground">Enter a search query to begin</p>
                  <p className="text-muted-foreground text-sm mt-2">
                    Search by patent number, keyword, or inventor name
                  </p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SearchComponent;
