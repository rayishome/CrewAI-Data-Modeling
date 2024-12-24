export interface AnalysisResponse {
  businessAnalyst: {
    opportunities: string[];
    limitations: string[];
    questions: string[];
  };
  kimballExpert: {
    facts: string[];
    dimensions: string[];
    relationships: string[];
  };
  dataArchitect: {
    etlSteps: string[];
    issues: string[];
    solutions: string[];
  };
}

export interface AnalysisRequest {
  apiKey: string;
  tableSchemas: string;
  businessProblems: string;
}
