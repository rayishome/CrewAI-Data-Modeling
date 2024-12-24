import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { AlertCircle, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";
import { analyzeData } from "@/lib/api";
import type { AnalysisResponse } from "@/lib/types";

const formSchema = z.object({
  apiKey: z.string().min(1, "API key is required"),
  tableSchemas: z.string().min(1, "Table schemas are required"),
  businessProblems: z.string().min(1, "Business problems are required"),
});

type FormValues = z.infer<typeof formSchema>;

export default function Home() {
  const { toast } = useToast();
  const [results, setResults] = useState<AnalysisResponse | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      apiKey: "",
      tableSchemas: "",
      businessProblems: "",
    },
  });

  const mutation = useMutation({
    mutationFn: analyzeData,
    onSuccess: (data) => {
      setResults(data);
      toast({
        title: "Analysis Complete",
        description: "Expert analysis has been generated successfully.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: FormValues) => {
    mutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Dimensional Modeling & ETL Planning Assistant
          </h1>
          <p className="text-muted-foreground">
            Enter your data requirements and let our AI experts analyze and plan your data architecture.
          </p>
        </div>

        <Card>
          <CardContent className="pt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="apiKey"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>OpenAI API Key</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="sk-..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tableSchemas"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Table Definitions</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder={`Table Name: Orders\nColumns: OrderID, CustomerID, OrderDate, TotalAmount\n\nTable Name: Customers\nColumns: CustomerID, CustomerName, Email, Region`}
                          className="min-h-[150px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="businessProblems"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Business Problems and Analysis Needs</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="I want to analyze customer retention and sales trends.\nI need insights on regional performance and top customers."
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? "Analyzing..." : "Analyze"}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {results && (
          <Card>
            <CardContent className="pt-6">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="business-analyst">
                  <AccordionTrigger>
                    Business Analyst Output
                    <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="prose prose-sm max-w-none">
                      <h4>Analysis Opportunities</h4>
                      <ul>
                        {results.businessAnalyst.opportunities.map((opp, i) => (
                          <li key={i}>{opp}</li>
                        ))}
                      </ul>

                      <h4>Limitations</h4>
                      <ul>
                        {results.businessAnalyst.limitations.map((limit, i) => (
                          <li key={i}>{limit}</li>
                        ))}
                      </ul>

                      <h4>Follow-up Questions</h4>
                      <ul>
                        {results.businessAnalyst.questions.map((q, i) => (
                          <li key={i}>{q}</li>
                        ))}
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="kimball-expert">
                  <AccordionTrigger>
                    Kimball Expert Output
                    <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="prose prose-sm max-w-none">
                      <h4>Dimensional Model</h4>
                      <h5>Facts</h5>
                      <ul>
                        {results.kimballExpert.facts.map((fact, i) => (
                          <li key={i}>{fact}</li>
                        ))}
                      </ul>

                      <h5>Dimensions</h5>
                      <ul>
                        {results.kimballExpert.dimensions.map((dim, i) => (
                          <li key={i}>{dim}</li>
                        ))}
                      </ul>

                      <h5>Relationships</h5>
                      <ul>
                        {results.kimballExpert.relationships.map((rel, i) => (
                          <li key={i}>{rel}</li>
                        ))}
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="data-architect">
                  <AccordionTrigger>
                    Data Architect Output
                    <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="prose prose-sm max-w-none">
                      <h4>ETL Steps</h4>
                      <ol>
                        {results.dataArchitect.etlSteps.map((step, i) => (
                          <li key={i}>{step}</li>
                        ))}
                      </ol>

                      <h4>Technical Issues</h4>
                      <ul>
                        {results.dataArchitect.issues.map((issue, i) => (
                          <li key={i}>{issue}</li>
                        ))}
                      </ul>

                      <h4>Solutions</h4>
                      <ul>
                        {results.dataArchitect.solutions.map((solution, i) => (
                          <li key={i}>{solution}</li>
                        ))}
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
