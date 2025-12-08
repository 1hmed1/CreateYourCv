import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CheckCircle, FileText, Bot, Palette } from "lucide-react";

export default function Home() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-image');

  const features = [
    {
      icon: <FileText className="w-8 h-8 text-accent" />,
      title: "Interactive CV & Resume Builder",
      description: "Easily create a fully professional CV or resume with our step-by-step guided form. Your career documents, crafted in minutes.",
    },
    {
      icon: <Palette className="w-8 h-8 text-accent" />,
      title: "Multiple Attractive Templates",
      description: "Choose from multiple attractive, modern templates for CVs, resumes, and portfolios. Switch designs instantly with a single click.",
    },
    {
      icon: <Bot className="w-8 h-8 text-accent" />,
      title: "Portfolio Showcase",
      description: "Build a stunning portfolio to showcase your projects and skills. Let your work speak for itself and stand out from the crowd.",
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-accent" />,
      title: "Easy Download",
      description: "Easily download your professional CV, resume, and portfolio in a print-ready format, perfect for job applications.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="container mx-auto px-4 md:px-6 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tighter font-headline">
                Craft Your Professional Story, Made for Pakistan.
              </h1>
              <p className="text-lg text-foreground/80">
                Create fully professional CVs, resumes, and portfolios with multiple attractive templates. Download your documents with ease and land your dream job in the global market.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                  <Link href="/cv-builder">Create Your CV Now</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/portfolio-builder">Build Your Portfolio</Link>
                </Button>
              </div>
            </div>
            <div className="relative h-64 md:h-96 rounded-lg overflow-hidden shadow-2xl">
              {heroImage && (
                <Image
                  src={heroImage.imageUrl}
                  alt={heroImage.description}
                  fill
                  style={{ objectFit: 'cover' }}
                  data-ai-hint={heroImage.imageHint}
                  priority
                />
              )}
               <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent"></div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="bg-card py-16 md:py-24">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-headline">Powerful Tools for Your Career</h2>
              <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
                Everything you need to create a compelling professional presence, from CVs to portfolios.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="bg-background shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardHeader className="items-center">
                    {feature.icon}
                  </CardHeader>
                  <CardContent className="text-center">
                    <CardTitle className="text-xl mb-2 font-headline">{feature.title}</CardTitle>
                    <p className="text-foreground/70">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 md:px-6 py-16 md:py-24">
          <div className="bg-card p-8 md:p-12 rounded-lg shadow-xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4">Ready to Land Your Dream Job?</h2>
            <p className="text-lg text-foreground/80 max-w-2xl mx-auto mb-8">
              Start building your professional CV and portfolio today. It's free, fast, and designed for success.
            </p>
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <Link href="/cv-builder">Get Started for Free</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
