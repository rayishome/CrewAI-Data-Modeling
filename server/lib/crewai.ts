import { createOpenAIClient, getExpertResponse } from "./openai";

const SYSTEM_PROMPTS = {
  businessAnalyst: `You are an experienced business analyst specializing in data analysis and requirements gathering. 
Analyze the provided table schemas and business problems to identify analysis opportunities, limitations, and follow-up questions.
Respond in JSON format with the following structure:
{
  "opportunities": string[],
  "limitations": string[],
  "questions": string[]
}`,

  kimballExpert: `You are a Kimball methodology expert specializing in dimensional modeling.
Based on the table schemas, business problems, and analyst insights, propose a dimensional model.
Respond in JSON format with the following structure:
{
  "facts": string[],
  "dimensions": string[],
  "relationships": string[]
}`,

  dataArchitect: `You are a senior data architect specializing in ETL processes and data warehousing.
Review the proposed dimensional model and create an ETL plan that addresses technical challenges.
Respond in JSON format with the following structure:
{
  "etlSteps": string[],
  "issues": string[],
  "solutions": string[]
}`,
};

interface AnalysisInput {
  apiKey: string;
  tableSchemas: string;
  businessProblems: string;
}

export async function analyzeCrew(input: AnalysisInput) {
  const openai = await createOpenAIClient(input.apiKey);

  // Business Analyst Analysis
  const businessAnalystResponse = await getExpertResponse(
    openai,
    SYSTEM_PROMPTS.businessAnalyst,
    `Table Schemas:\n${input.tableSchemas}\n\nBusiness Problems:\n${input.businessProblems}`
  );
  const businessAnalystResults = JSON.parse(businessAnalystResponse.choices[0].message.content);

  // Kimball Expert Analysis
  const kimballExpertResponse = await getExpertResponse(
    openai,
    SYSTEM_PROMPTS.kimballExpert,
    `Table Schemas:\n${input.tableSchemas}\n\nBusiness Problems:\n${input.businessProblems}\n\nAnalyst Insights:\n${JSON.stringify(businessAnalystResults, null, 2)}`
  );
  const kimballExpertResults = JSON.parse(kimballExpertResponse.choices[0].message.content);

  // Data Architect Analysis
  const dataArchitectResponse = await getExpertResponse(
    openai,
    SYSTEM_PROMPTS.dataArchitect,
    `Dimensional Model:\n${JSON.stringify(kimballExpertResults, null, 2)}\n\nOriginal Schemas:\n${input.tableSchemas}`
  );
  const dataArchitectResults = JSON.parse(dataArchitectResponse.choices[0].message.content);

  return {
    businessAnalyst: businessAnalystResults,
    kimballExpert: kimballExpertResults,
    dataArchitect: dataArchitectResults,
  };
}
