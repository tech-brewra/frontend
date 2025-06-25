// import { useState } from "react";
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Badge } from "@/components/ui/badge";
// import { History, RefreshCw, CheckCircle, XCircle, Clock } from "lucide-react";

// interface DataHistoryEntry {
//   timestamp: Date;
//   type: 'fetch' | 'refresh' | 'scout_trigger';
//   status: 'success' | 'error' | 'loading';
//   source: 'cache' | 'api';
//   details?: string;
//   dataSize?: number;
// }

// // Mock history data - in a real app this would come from a store or API
// const mockHistory: DataHistoryEntry[] = [
//   {
//     timestamp: new Date(Date.now() - 10 * 60 * 1000), // 10 minutes ago
//     type: 'refresh',
//     status: 'success',
//     source: 'api',
//     details: 'Scout triggered and market data refreshed',
//     dataSize: 15
//   },
//   {
//     timestamp: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
//     type: 'fetch',
//     status: 'success',
//     source: 'cache',
//     details: 'Loaded cached market intelligence data',
//     dataSize: 15
//   },
//   {
//     timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
//     type: 'scout_trigger',
//     status: 'error',
//     source: 'api',
//     details: 'Scout deployment failed - network timeout'
//   },
//   {
//     timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
//     type: 'fetch',
//     status: 'success',
//     source: 'api',
//     details: 'Initial market data fetch completed',
//     dataSize: 12
//   }
// ];

// const getStatusIcon = (status: string) => {
//   switch (status) {
//     case 'success':
//       return <CheckCircle className="h-4 w-4 text-green-600" />;
//     case 'error':
//       return <XCircle className="h-4 w-4 text-red-600" />;
//     case 'loading':
//       return <Clock className="h-4 w-4 text-yellow-600" />;
//     default:
//       return <Clock className="h-4 w-4 text-gray-600" />;
//   }
// };

// const getStatusBadge = (status: string) => {
//   const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
//     success: "default",
//     error: "destructive",
//     loading: "secondary"
//   };
  
//   return (
//     <Badge variant={variants[status] || "outline"} className="text-xs">
//       {status}
//     </Badge>
//   );
// };

// const getTypeIcon = (type: string) => {
//   switch (type) {
//     case 'refresh':
//       return <RefreshCw className="h-4 w-4 text-blue-600" />;
//     case 'scout_trigger':
//       return <RefreshCw className="h-4 w-4 text-purple-600" />;
//     default:
//       return <History className="h-4 w-4 text-gray-600" />;
//   }
// };

// const formatTimeAgo = (timestamp: Date) => {
//   const now = new Date();
//   const diffMs = now.getTime() - timestamp.getTime();
//   const diffMins = Math.floor(diffMs / (1000 * 60));
//   const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
//   const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

//   if (diffMins < 60) {
//     return `${diffMins} minutes ago`;
//   } else if (diffHours < 24) {
//     return `${diffHours} hours ago`;
//   } else {
//     return `${diffDays} days ago`;
//   }
// };

// export const DataHistoryDialog = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <Dialog open={isOpen} onOpenChange={setIsOpen}>
//       <DialogTrigger asChild>
//         <Button
//           variant="outline"
//           size="sm"
//           className="flex items-center gap-2"
//         >
//           <History className="h-4 w-4" />
//           History
//         </Button>
//       </DialogTrigger>
//       <DialogContent className="max-w-2xl max-h-[80vh]">
//         <DialogHeader>
//           <DialogTitle className="flex items-center gap-2">
//             <History className="h-5 w-5" />
//             Data Load History
//           </DialogTitle>
//         </DialogHeader>
        
//         <ScrollArea className="max-h-[60vh] pr-4">
//           <div className="space-y-4">
//             {mockHistory.map((entry, index) => (
//               <div key={index} className="flex items-start gap-3 p-4 border rounded-lg bg-white hover:bg-gray-50 transition-colors">
//                 <div className="flex-shrink-0 mt-1">
//                   {getTypeIcon(entry.type)}
//                 </div>
                
//                 <div className="flex-1 min-w-0">
//                   <div className="flex items-center justify-between gap-2 mb-1">
//                     <div className="flex items-center gap-2">
//                       <span className="font-medium text-sm capitalize">
//                         {entry.type.replace('_', ' ')}
//                       </span>
//                       {getStatusBadge(entry.status)}
//                     </div>
                    
//                     <div className="flex items-center gap-2 text-xs text-gray-500">
//                       {getStatusIcon(entry.status)}
//                       <span>{formatTimeAgo(entry.timestamp)}</span>
//                     </div>
//                   </div>
                  
//                   <p className="text-sm text-gray-600 mb-2">
//                     {entry.details}
//                   </p>
                  
//                   <div className="flex items-center gap-4 text-xs text-gray-500">
//                     <span className="flex items-center gap-1">
//                       <span className={`w-2 h-2 rounded-full ${
//                         entry.source === 'api' ? 'bg-blue-500' : 'bg-green-500'
//                       }`} />
//                       {entry.source === 'api' ? 'Fresh data' : 'Cached data'}
//                     </span>
                    
//                     {entry.dataSize && (
//                       <span>
//                         {entry.dataSize} records loaded
//                       </span>
//                     )}
                    
//                     <span className="text-gray-400">
//                       {entry.timestamp.toLocaleString()}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </ScrollArea>
        
//         <div className="pt-4 border-t">
//           <p className="text-xs text-gray-500 text-center">
//             Showing data load history for the current session
//           </p>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// };


import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { History, RefreshCw, CheckCircle, XCircle, Loader2, Calendar, TrendingUp, BarChart3, Clock } from "lucide-react";

interface MarketIntelligenceResponse {
  report: {
    timestamp: string;
    data: any;
    [key: string]: any;
  };
  report_history: string[]; // Array of timestamp strings
  [key: string]: any;
}

const API_BASE_URL = 'https://backend-11kr.onrender.com';

interface DataHistoryDialogProps {
  onReportSelected?: (reportData: any) => void;
}

export const DataHistoryDialog = ({ onReportSelected }: DataHistoryDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [reportHistory, setReportHistory] = useState<string[]>([]);
  const [currentReport, setCurrentReport] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [loadingTimestamp, setLoadingTimestamp] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && reportHistory.length === 0) {
      fetchHistoryData();
    }
  }, [isOpen]);

  const parseTimestamp = (timestamp: string): Date => {
    try {
      return new Date(timestamp);
    } catch (error) {
      console.warn('Failed to parse timestamp:', timestamp);
      return new Date();
    }
  };

  const fetchHistoryData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${API_BASE_URL}/market_intelligence`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: MarketIntelligenceResponse = await response.json();
      console.log('API Response:', data);
      
      // Set current report
      if (data.report) {
        setCurrentReport(data.report);
      }
      
      // Set report history (sorted by timestamp, most recent first)
      if (data.report_history && Array.isArray(data.report_history)) {
        const sortedHistory = [...data.report_history].sort((a, b) => 
          new Date(b).getTime() - new Date(a).getTime()
        );
        setReportHistory(sortedHistory);
      }
      
    } catch (err) {
      console.error('Error fetching history:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch history data');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSpecificReport = async (timestamp: string) => {
    setLoadingTimestamp(timestamp);
    
    try {
      // Make API call with timestamp parameter
      const response = await fetch(`${API_BASE_URL}/market_intelligence?timestamp=${timestamp}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Set the selected report (could be data.report or data itself depending on API structure)
      const reportData = data.report || data;
      setSelectedReport(reportData);
      
      console.log(`Loaded report for ${timestamp}:`, reportData);
      
      // Notify parent component about the selected report
      if (onReportSelected) {
        onReportSelected(reportData);
      }
      
      // Close the dialog after successful report selection
      setIsOpen(false);
      
    } catch (err) {
      console.error(`Error loading report for ${timestamp}:`, err);
      setError(`Failed to load report for ${timestamp}: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setLoadingTimestamp(null);
    }
  };

  const refreshHistory = async () => {
    setReportHistory([]);
    setCurrentReport(null);
    setSelectedReport(null);
    await fetchHistoryData();
  };

  const formatTimestamp = (timestamp: string) => {
    try {
      const date = parseTimestamp(timestamp);
      return {
        date: date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        }),
        time: date.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        }),
        full: date.toLocaleString('en-US')
      };
    } catch (error) {
      return {
        date: timestamp,
        time: '',
        full: timestamp
      };
    }
  };

  const isCurrentReport = (timestamp: string) => {
    return currentReport && currentReport.timestamp === timestamp;
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
        >
          <History className="h-4 w-4" />
          History
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <History className="h-5 w-5" />
              Report History
              {reportHistory.length > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {reportHistory.length} reports
                </Badge>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={refreshHistory}
              disabled={isLoading}
              className="flex items-center gap-1"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4" />
              )}
              Refresh
            </Button>
          </DialogTitle>
        </DialogHeader>
        
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">
              <XCircle className="h-4 w-4 inline mr-1" />
              {error}
            </p>
          </div>
        )}
        
        <ScrollArea className="max-h-[50vh] pr-4">
          {isLoading && reportHistory.length === 0 ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin mr-2" />
              Loading report history...
            </div>
          ) : reportHistory.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <BarChart3 className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No report history available</p>
              <p className="text-sm mt-1">Try refreshing to load recent data</p>
            </div>
          ) : (
            <div className="space-y-2">
              {reportHistory.map((timestamp, index) => {
                const formatted = formatTimestamp(timestamp);
                const isCurrent = isCurrentReport(timestamp);
                const isLoading = loadingTimestamp === timestamp;
                
                return (
                  <div 
                    key={timestamp}
                    className={`
                      flex items-center justify-between p-4 border rounded-lg transition-all cursor-pointer
                      ${isCurrent 
                        ? 'bg-blue-50 border-blue-200 hover:bg-blue-100' 
                        : 'bg-white hover:bg-gray-50 border-gray-200'
                      }
                      ${isLoading ? 'opacity-75' : ''}
                    `}
                    onClick={() => !isLoading && fetchSpecificReport(timestamp)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0">
                        <BarChart3 className={`h-5 w-5 ${isCurrent ? 'text-blue-600' : 'text-gray-500'}`} />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm">
                            Report #{reportHistory.length - index}
                          </span>
                          {isCurrent && (
                            <Badge variant="default" className="text-xs">
                              Current
                            </Badge>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatted.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {formatted.time}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {isLoading ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                          <span className="text-xs text-blue-600">Loading...</span>
                        </>
                      ) : (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-xs h-7 px-3 hover:bg-blue-50"
                          onClick={(e) => {
                            e.stopPropagation();
                            fetchSpecificReport(timestamp);
                          }}
                        >
                          <TrendingUp className="h-3 w-3 mr-1" />
                          Load Report
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </ScrollArea>
        
        {selectedReport && (
          <div className="pt-4 border-t">
            <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <p className="text-sm font-medium text-green-800">Report Loaded Successfully</p>
              </div>
              <div className="text-xs text-green-600 space-y-1">
                <p>
                  <strong>Timestamp:</strong> {selectedReport.timestamp}
                </p>
                <p>
                  <strong>Data Points:</strong> {Object.keys(selectedReport.data || selectedReport || {}).length}
                </p>
              </div>  
            </div>
          </div>
        )}
        
        <div className="pt-4 border-t">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>Market Intelligence API • Historical Reports</span>
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              Connected
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};