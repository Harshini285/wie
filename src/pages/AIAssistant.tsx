import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, FileText, Scale, BookOpen, Upload, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  citations?: { title: string; section: string; relevance: string }[];
}

const sampleCitations = [
  { title: 'Indian Penal Code, 1860', section: 'Section 420', relevance: 'Cheating and dishonestly inducing delivery of property' },
  { title: 'Consumer Protection Act, 2019', section: 'Section 2(7)', relevance: 'Definition of consumer' },
  { title: 'Supreme Court Judgment', section: 'AIR 2019 SC 1234', relevance: 'Consumer rights in online transactions' },
];

const initialMessages: Message[] = [
  {
    id: '1',
    role: 'assistant',
    content: 'Namaste! I\'m NyayAI, your AI Legal Assistant. I can help you understand Indian laws, analyze legal documents, and provide guidance on legal matters. How can I assist you today?\n\nYou can:\n• Ask questions about Indian laws\n• Upload case facts for analysis\n• Get information about your legal rights',
    timestamp: new Date(),
  }
];

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [caseFacts, setCaseFacts] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showCitations, setShowCitations] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Based on your query regarding "${input.slice(0, 50)}...", here's what I found:\n\nUnder Indian law, this matter is typically governed by relevant sections of the applicable Acts. The legal position suggests that you may have certain rights and remedies available.\n\n**Key Points:**\n1. Documentation of evidence is crucial\n2. Limitation period may apply\n3. Both civil and criminal remedies might be available\n\nWould you like me to elaborate on any specific aspect or help you find a lawyer specializing in this area?`,
        timestamp: new Date(),
        citations: sampleCitations,
      };

      setMessages(prev => [...prev, aiMessage]);
      setShowCitations(true);
    }, 1500);
  };

  const handleAnalyzeFacts = () => {
    if (!caseFacts.trim()) return;

    setIsAnalyzing(true);

    setTimeout(() => {
      const analysisMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: `**Case Analysis Report**\n\nI've analyzed the facts you provided. Here's my assessment:\n\n**Case Strength: Medium-High (65-75%)**\n\n**Legal Issues Identified:**\n1. Potential breach of contract under Indian Contract Act, 1872\n2. Possible violation of consumer rights\n3. Tort of negligence may apply\n\n**Recommended Actions:**\n• Send a legal notice within 30 days\n• Document all communications\n• Consider mediation before litigation\n\n**Similar Cases:**\n- Similar cases have seen favorable outcomes for complainants in 68% of instances.\n\n**Note:** This analysis is for informational purposes. Please consult a qualified lawyer for legal advice.`,
        timestamp: new Date(),
        citations: sampleCitations,
      };

      setMessages(prev => [...prev, analysisMessage]);
      setShowCitations(true);
      setIsAnalyzing(false);
      setCaseFacts('');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-180px)]">
            {/* Main Chat Area */}
            <div className="lg:col-span-3 flex flex-col">
              <Card className="flex-1 flex flex-col overflow-hidden">
                <CardHeader className="border-b border-border py-4">
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-xl gradient-teal flex items-center justify-center">
                      <Bot className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <h2 className="font-heading font-semibold">AI Legal Assistant</h2>
                      <p className="text-xs text-muted-foreground">Powered by NyayAI</p>
                    </div>
                  </CardTitle>
                </CardHeader>

                <Tabs defaultValue="chat" className="flex-1 flex flex-col">
                  <TabsList className="mx-4 mt-4">
                    <TabsTrigger value="chat">Chat</TabsTrigger>
                    <TabsTrigger value="analyze">Analyze Case</TabsTrigger>
                  </TabsList>

                  <TabsContent value="chat" className="flex-1 flex flex-col p-4">
                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          {message.role === 'assistant' && (
                            <div className="w-8 h-8 rounded-lg gradient-teal flex items-center justify-center flex-shrink-0">
                              <Bot className="w-4 h-4 text-primary-foreground" />
                            </div>
                          )}
                          <div className={`max-w-[80%] ${message.role === 'user' ? 'order-1' : ''}`}>
                            <div
                              className={`rounded-2xl px-4 py-3 ${
                                message.role === 'user'
                                  ? 'bg-teal text-primary-foreground rounded-br-sm'
                                  : 'bg-secondary text-foreground rounded-bl-sm'
                              }`}
                            >
                              <p className="whitespace-pre-wrap text-sm">{message.content}</p>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1 px-2">
                              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                          {message.role === 'user' && (
                            <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                              <User className="w-4 h-4 text-foreground" />
                            </div>
                          )}
                        </div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>

                    {/* Input */}
                    <div className="flex gap-2">
                      <Input
                        placeholder="Ask a legal question..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                        className="flex-1"
                      />
                      <Button variant="hero" onClick={handleSendMessage}>
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="analyze" className="flex-1 flex flex-col p-4">
                    <div className="flex-1 space-y-4">
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">
                          Enter Case Facts
                        </label>
                        <Textarea
                          placeholder="Describe your case facts in detail. Include relevant dates, parties involved, sequence of events, and any documentation you have..."
                          value={caseFacts}
                          onChange={(e) => setCaseFacts(e.target.value)}
                          className="min-h-[200px]"
                        />
                      </div>

                      <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-teal/50 transition-colors cursor-pointer">
                        <Upload className="w-8 h-8 mx-auto text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">
                          Upload supporting documents (PDF, Images)
                        </p>
                      </div>

                      <Button
                        variant="hero"
                        className="w-full"
                        onClick={handleAnalyzeFacts}
                        disabled={!caseFacts.trim() || isAnalyzing}
                      >
                        {isAnalyzing ? (
                          <>
                            <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                            Analyzing...
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-4 h-4 mr-2" />
                            Analyze Case
                          </>
                        )}
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </Card>
            </div>

            {/* Citations Panel */}
            <div className="hidden lg:block">
              <Card className="h-full overflow-hidden">
                <CardHeader className="border-b border-border py-4">
                  <CardTitle className="text-base flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-teal" />
                    Cited Laws & Judgments
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 overflow-y-auto h-[calc(100%-60px)]">
                  {showCitations ? (
                    <div className="space-y-4">
                      {sampleCitations.map((citation, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-lg bg-secondary/50 border border-border hover:border-teal/50 transition-colors cursor-pointer"
                        >
                          <div className="flex items-start gap-2">
                            <Scale className="w-4 h-4 text-teal mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-sm font-medium text-foreground">{citation.title}</p>
                              <Badge variant="teal" className="mt-1 text-xs">{citation.section}</Badge>
                              <p className="text-xs text-muted-foreground mt-2">{citation.relevance}</p>
                            </div>
                          </div>
                        </div>
                      ))}

                      <div className="pt-4 border-t border-border">
                        <p className="text-xs text-muted-foreground mb-2">Additional Resources</p>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm text-teal hover:text-teal-light cursor-pointer">
                            <FileText className="w-4 h-4" />
                            <span>View Full Act</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-teal hover:text-teal-light cursor-pointer">
                            <FileText className="w-4 h-4" />
                            <span>Related Judgments</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <BookOpen className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                      <p className="text-sm text-muted-foreground">
                        Citations will appear here when you ask questions
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
