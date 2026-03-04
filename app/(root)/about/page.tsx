import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { getCurrentUser } from '@/lib/actions/auth.action'
import UserError from '@/components/UserError'
import Image from 'next/image'
import Link from 'next/link'
import {
  Target,
  Users,
  Award,
  Zap,
  Heart,
  Globe,
  CheckCircle,
  Star,
  TrendingUp,
  Shield,
  Lightbulb
} from 'lucide-react'

const AboutPage = async () => {
  const user = await getCurrentUser()
  if (!user) return <UserError />

  const stats = [
    { label: 'Interviews Conducted', value: '5k+', icon: <Target className="w-6 h-6" /> },
    { label: 'Success Rate', value: '95%', icon: <TrendingUp className="w-6 h-6" /> },
    { label: 'Satisfied Users', value: '1k+', icon: <Users className="w-6 h-6" /> },
    { label: 'Countries Reached', value: '10+', icon: <Globe className="w-6 h-6" /> }
  ]

  const values = [
    {
      icon: <Heart className="w-8 h-8 text-red-500" />,
      title: 'Empowerment',
      description: 'Building confidence to help you succeed.'
    },
    {
      icon: <Lightbulb className="w-8 h-8 text-yellow-500" />,
      title: 'Innovation',
      description: 'AI that adapts to your learning style.'
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-500" />,
      title: 'Trust',
      description: 'Protecting your privacy and data.'
    },
    {
      icon: <Award className="w-8 h-8 text-purple-500" />,
      title: 'Excellence',
      description: 'Delivering top-tier AI feedback.'
    }
  ]

  const team = [
    {
      name: 'Sarah Chen',
      role: 'CEO & Co-Founder',
      bio: 'Ex-Google recruiter with 10+ years in talent acquisition.',
      image: '/user-avatar.png'
    },
    {
      name: 'Marcus Johnson',
      role: 'CTO & Co-Founder',
      bio: 'AI researcher and former Microsoft NLP engineer.',
      image: '/user-avatar.png'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Product',
      bio: 'Expert in UX and career development.',
      image: '/user-avatar.png'
    },
    {
      name: 'David Kim',
      role: 'Lead AI Engineer',
      bio: 'Specializes in conversational AI and feedback systems.',
      image: '/user-avatar.png'
    }
  ]

  return (
    <div className="space-y-20 md:space-y-28 lg:space-y-36">
      {/* Hero Section */}
      <section className="text-center space-y-10 md:space-y-14 pt-10 md:pt-20">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-6 py-2 rounded-full text-primary text-sm font-medium shadow-sm">
            <Star className="w-4 h-4" />
            About Sidvia
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground">
            Transforming Interview Preparation
            <br />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              with AI Precision
            </span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed mt-2">
            Personalized AI coaching designed to help you ace interviews by building on your strengths and targeting your growth areas.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
            <CardContent className="space-y-4 text-center">
              <div className="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center text-primary">
                {stat.icon}
              </div>
              <div>
                <div className="text-3xl max-sm:text-3xl mb-2 font-extrabold bg-gradient-to-b from-neutral-50 to-neutral-600 text-transparent bg-clip-text">{stat.value}</div>
                <div className="text-sm font-medium text-muted-foreground">{stat.label}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Mission Section */}
      <section className="grid md:grid-cols-2 gap-20 items-center">
        <div className="space-y-6">
          <h2 className="text-4xl font-bold text-foreground">Our Mission</h2>
          <p className="text-muted-foreground leading-relaxed">
            We empower you to showcase your best self. Traditional preparation is costly, generic, and slow.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-2">
            Sidvia’s AI platform delivers instant, personalized coaching—making expert interview prep accessible and effective for everyone.
          </p>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-foreground">Tailored AI coaching</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-foreground">Real-time feedback</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-foreground">Accessible & affordable</span>
            </div>
          </div>
        </div>
        <div className="relative mt-10 md:mt-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 blur-3xl rounded-full" />
          <Image
            src="/Young_candidate.png"
            alt="Young Candidate"
            width={450}
            height={450}
            className="relative rounded-full brightness-80"
          />
        </div>
      </section>

      {/* Values Section */}
      <section className="space-y-14">
        <div className="text-center space-y-6">
          <h2 className="text-4xl font-bold text-foreground mb-2">Our Values</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            These core principles guide our work and shape the products we build.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <Card key={index} className="text-center p-6 hover:shadow-lg transition-all hover:-translate-y-1">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-muted/50 rounded-full flex items-center justify-center">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-1">{value.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-foreground">Meet Our Team</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A diverse group of engineers, designers, and career experts passionate about your success.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <Card key={index} className="text-center p-6 hover:shadow-lg transition-all hover:-translate-y-1">
              <CardContent className="space-y-4">
                <div className="relative w-20 h-20 mx-auto">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={80}
                    height={80}
                    className="rounded-full object-cover border-4 border-border"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">{member.name}</h3>
                  <p className="text-primary text-sm font-medium">{member.role}</p>
                </div>
                <p className="text-muted-foreground text-xs leading-relaxed">{member.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Technology Section */}
      <section className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl p-12 border border-border/50">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-primary/10 px-3 py-1 rounded-full text-primary text-sm font-medium">
                <Zap className="w-4 h-4" />
                Powered by AI
              </div>
              <h2 className="text-3xl font-bold text-foreground">Advanced AI Technology</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our AI models are built on data from thousands of successful interviews across industries, providing personalized and actionable insights.
              </p>
            </div>
            <div className="space-y-6">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Natural Language Processing</h4>
                  <p className="text-muted-foreground text-sm">Analyzes your responses for clarity, structure, and content quality.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Real-time Feedback</h4>
                  <p className="text-muted-foreground text-sm">Instant insights and suggestions during your practice.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Adaptive Learning</h4>
                  <p className="text-muted-foreground text-sm">Our AI evolves with your progress to tailor coaching uniquely to you.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative mt-10 md:mt-0">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-2xl rounded-full" />
            <div className="relative bg-card/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-border/50">
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm text-muted-foreground">AI Analysis Active</span>
                </div>
                <div className="space-y-3">
                  <div className="h-2 bg-primary/20 rounded-full">
                    <div className="h-2 bg-primary rounded-full w-4/5 animate-pulse" />
                  </div>
                  <div className="h-2 bg-primary/20 rounded-full">
                    <div className="h-2 bg-primary rounded-full w-3/5 animate-pulse" />
                  </div>
                  <div className="h-2 bg-primary/20 rounded-full">
                    <div className="h-2 bg-primary rounded-full w-5/6 animate-pulse" />
                  </div>
                </div>
                <div className="text-xs text-muted-foreground mt-2">
                  Processing speech patterns, analyzing content structure, generating personalized feedback...
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section - Integrated into About Page as requested */}
      <section className="space-y-12 pb-10">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-foreground">Get in Touch</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We&apos;re here to support you in every step of your career journey. Choose how you&apos;d like to reach us.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="group relative overflow-hidden border border-border/20 hover:border-primary/30 transition-all duration-300">
            <CardContent className="p-8 space-y-6">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <Globe className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Email Support</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Fast and reliable help for all your inquiries via email.
                </p>
              </div>
              <Button asChild variant="outline" className="w-full">
                <a href="mailto:support@sidvia.com">Send Email</a>
              </Button>
            </CardContent>
          </Card>

          <Card className="group relative overflow-hidden border border-border/20 hover:border-primary/30 transition-all duration-300">
            <CardContent className="p-8 space-y-6">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <Zap className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Live Chat</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Get instant support and answers from our live team.
                </p>
              </div>
              <Button asChild variant="outline" className="w-full">
                <a href="https://wa.me/918591070093" target="_blank" rel="noopener noreferrer">Start Chat</a>
              </Button>
            </CardContent>
          </Card>

          <Card className="group relative overflow-hidden border border-border/20 hover:border-primary/30 transition-all duration-300">
            <CardContent className="p-8 space-y-6">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <Users className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Phone Support</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Talk directly with an expert to solve complex issues.
                </p>
              </div>
              <Button asChild variant="outline" className="w-full">
                <a href="tel:+15551234567">Call Now</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Floating Chat Bubble for better experience */}
      <div className="fixed bottom-8 right-8 z-[100]">
        <a
          href="https://wa.me/918591070093"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-16 h-16 bg-primary text-primary-foreground rounded-full shadow-2xl hover:scale-110 transition-transform active:scale-95 group relative"
        >
          <Zap className="w-8 h-8" />
          <span className="absolute -top-2 -left-2 flex h-5 w-5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-5 w-5 bg-accent"></span>
          </span>
          <div className="absolute right-full mr-4 bg-background border border-border px-4 py-2 rounded-xl text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
            Chat with us! 👋
          </div>
        </a>
      </div>

      {/* CTA Section */}

      <section className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl p-8 md:p-12 border border-border/50 my-2.5">
        <div className="text-center space-y-6">
          <h3 className="text-2xl font-bold text-foreground">Ready to Elevate Your Interview Skills?</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join thousands who have enhanced their success with Sidvia’s AI-driven coaching.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-2">
            <Button asChild size="lg" className="gap-2 text-base font-medium">
              <Link href="/interview">Start Your Journey</Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="gap-2 text-base font-medium border-muted hover:border-primary">View Performance Tips</Button>
          </div>
        </div>
      </section>

      <footer className="backdrop-blur-sm py-8 px-6">
        <hr className='mb-12' />
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg">
                <svg width={32} height={32} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                  <path d="m32 10 8 14 -8 14 -8 -14Z" fill="#00E676" />
                  <path d="m32 54 -8 -14 8 -14 8 14Z" fill="#00E676" opacity={0.5} />
                  <path cx={16} cy={16} r={4} fill="#00E676" opacity={0.3} d="M40 32A8 8 0 0 1 32 40A8 8 0 0 1 24 32A8 8 0 0 1 40 32z" />
                  <path d="M16 32q16 -12 32 0 -16 12 -32 0Z" stroke="#00E676" strokeWidth={2} fill="none" />
                </svg>
              </div>
              <span className="text-xl font-semibold text-foreground">Sidvia</span>
            </div>
            <div className="text-sm text-muted-foreground">
              © 2025 Sidvia Inc. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default AboutPage
