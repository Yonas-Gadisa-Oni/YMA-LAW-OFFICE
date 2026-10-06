import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Calendar, NewspaperClipping, PaperPlaneTilt, Sparkle, Clock, ArrowRight } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { NEWSLETTER_ARTICLES, NEWSLETTER_ARCHIVE, INSIGHTS } from "@/constants";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [expandedArticle, setExpandedArticle] = useState<string | null>(null);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    setSubscribed(true);
    toast.success("Successfully subscribed to the newsletter!");
    setEmail("");
  };

  return (
    <section id="newsletter" className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start mb-12">
          <span className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">Legal Updates</span>
          <h2 className="max-w-2xl text-3xl font-bold text-[#081b2d] md:text-4xl">Sports Law Newsletter & Insights</h2>
          <div className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-blue-500 to-blue-700" />
        </div>

        {/* Featured Articles */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {NEWSLETTER_ARTICLES.map((article, i) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <Card
                className={`flex h-full cursor-pointer flex-col border-slate-200 bg-white transition-all duration-300 hover:border-blue-400 hover:shadow-md ${
                  expandedArticle === article.id ? "border-blue-500" : ""
                }`}
                onClick={() => setExpandedArticle(expandedArticle === article.id ? null : article.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className="border border-blue-200 bg-blue-50 text-xs text-blue-800">
                      {article.category}
                    </Badge>
                    <span className="text-xs text-slate-600">{article.readTime}</span>
                  </div>
                  <CardTitle className="text-sm leading-snug text-[#081b2d]">{article.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <p className="flex-1 text-xs leading-relaxed text-slate-700">{article.excerpt}</p>
                  <div className="mt-3 flex items-center justify-between border-t border-slate-200 pt-3">
                    <span className="flex items-center gap-1 text-xs text-slate-600">
                      <Calendar className="w-3 h-3" />
                      {article.date}
                    </span>
                    <span className="text-xs text-blue-700">{article.author}</span>
                  </div>
                  <AnimatePresence>
                    {expandedArticle === article.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="mt-3 overflow-hidden border-t border-slate-200 pt-3"
                      >
                        <p className="text-xs leading-relaxed text-slate-700">{article.content}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Insights */}
        <div className="mb-16">
          <h3 className="mb-6 text-xl font-bold text-[#081b2d]">Latest Legal Insights</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {INSIGHTS.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
              >
                <Card className="flex h-full flex-col border-slate-200 bg-white transition-all duration-300 hover:border-blue-400 hover:shadow-md">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="border border-blue-200 bg-blue-50 text-xs text-blue-800">
                        {item.category}
                      </Badge>
                      <span className="flex items-center gap-1 text-xs text-slate-600">
                        <Clock className="w-3 h-3" />
                        {item.date}
                      </span>
                    </div>
                    <CardTitle className="text-sm leading-snug text-[#081b2d]">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <p className="flex-1 text-xs leading-relaxed text-slate-700">{item.excerpt}</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-3 self-start gap-1 text-blue-700 hover:bg-blue-50 hover:text-blue-900"
                    >
                      Read More <ArrowRight className="w-3 h-3" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Subscribe Form */}
        <div className="max-w-2xl mx-auto">
          <Card className="border-blue-200 bg-white shadow-sm">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <NewspaperClipping className="mx-auto mb-3 h-10 w-10 text-blue-700" />
                <h3 className="mb-2 text-xl font-bold text-[#081b2d]">Subscribe to Our Newsletter</h3>
                <p className="text-sm text-slate-700">
                  Get the latest sports law updates, case analyses, and regulatory changes delivered to your inbox.
                </p>
              </div>
              {subscribed ? (
                <div className="text-center py-4">
                  <Sparkle className="mx-auto mb-2 h-8 w-8 text-blue-700" />
                  <p className="font-medium text-blue-800">You&apos;re subscribed! Check your inbox for our latest update.</p>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 border-slate-300 bg-white text-slate-900 placeholder:text-slate-500 focus:border-blue-500"
                  />
                  <Button
                    type="submit"
                    className="gap-2 bg-blue-700 font-semibold text-white hover:bg-blue-800"
                  >
                    <PaperPlaneTilt className="w-4 h-4" />
                    Subscribe
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Archive */}
        {NEWSLETTER_ARCHIVE.length > 0 && (
          <div className="mt-12">
            <h4 className="mb-4 font-semibold text-[#081b2d]">Archive</h4>
            <div className="space-y-2">
              {NEWSLETTER_ARCHIVE.map((arch) => (
                <div key={arch.id} className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-3">
                  <Calendar className="h-4 w-4 flex-shrink-0 text-blue-700" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[#081b2d]">{arch.title}</p>
                    <p className="text-xs text-slate-700">{arch.summary}</p>
                  </div>
                  <span className="flex-shrink-0 text-xs text-slate-600">{arch.date}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}