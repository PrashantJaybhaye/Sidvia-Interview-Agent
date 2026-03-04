import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { getCurrentUser } from '@/lib/actions/auth.action'
import UserError from '@/components/UserError'
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageSquare,
  Headphones,
  Globe,
  Twitter,
  Linkedin,
  Github,
  Zap,
  ShieldCheck,
  User,
  HelpCircle,
  Handshake
} from 'lucide-react'

const ContactPage = async () => {
  const user = await getCurrentUser()
  if (!user) return <UserError />

  const contactMethods = [
    {
      icon: <Mail className="w-7 h-7" />,
      title: 'Email Support',
      description: 'Get help via email within 24 hours',
      contact: 'support@sidvia.com',
      action: 'Send Email',
      href: 'mailto:support@sidvia.com'
    },
    {
      icon: <MessageSquare className="w-7 h-7" />,
      title: 'Live Chat',
      description: 'Chat with our support team in real-time',
      contact: 'Available 9 AM - 6 PM EST',
      action: 'Start Chat',
      href: 'https://wa.me/918591070093'
    },
    {
      icon: <Phone className="w-7 h-7" />,
      title: 'Phone Support',
      description: 'Speak directly with our team',
      contact: '+1 (555) 123-4567',
      action: 'Call Now',
      href: 'tel:+15551234567'
    }
  ]

  const socialLinks = [
    { icon: <Twitter className="w-6 h-6" />, name: 'Twitter', url: '#' },
    { icon: <Linkedin className="w-6 h-6" />, name: 'LinkedIn', url: '#' },
    { icon: <Github className="w-6 h-6" />, name: 'GitHub', url: '#' }
  ]

  const faqs = [
    {
      question: "How does Sidvia work?",
      answer: "Sidvia uses advanced AI to conduct realistic mock interviews and provide detailed feedback on your performance.",
      icon: <Zap className="w-5 h-5 text-primary" />
    },
    {
      question: "Is my data secure?",
      answer: "Yes, we use enterprise-grade security measures to protect your personal information and interview data.",
      icon: <ShieldCheck className="w-5 h-5 text-primary" />
    },
    {
      question: "Can I practice for specific roles?",
      answer: "Absolutely! Sidvia offers customized interviews for various roles, experience levels, and tech stacks.",
      icon: <User className="w-5 h-5 text-primary" />
    },
    {
      question: "What if I need technical support?",
      answer: "Our support team is available via email, chat, and phone to help you with any technical issues.",
      icon: <HelpCircle className="w-5 h-5 text-primary" />
    }
  ]

  return (
    <div className="container mx-auto px-4 md:px-8 space-y-20 md:space-y-28 lg:space-y-36">
      {/* Header Section */}
      <section className="text-center space-y-8 md:space-y-12 pt-10 md:pt-20">
        <div className="inline-flex items-center gap-2 bg-primary/10 px-6 py-2 rounded-full text-primary text-base font-semibold shadow-sm">
          <Headphones className="w-5 h-5" />
          Get in Touch
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight">
          We&apos;re Here to <br />
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Help You Succeed
          </span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mt-2">
          Have questions about Sidvia? Need technical support? Want to share feedback?
          We&apos;d love to hear from you and help you on your interview preparation journey.
        </p>
      </section>

      {/* Why Contact Us Section */}
      {/* Why Contact Us Section - Redesigned */}
      <section className="max-w-4xl mx-auto bg-gradient-to-br from-primary/5 to-primary/10 rounded-3xl border border-border/20 p-8 md:p-10 mb-12">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-1 rounded-full text-primary text-sm font-medium mb-4">
              <HelpCircle className="w-4 h-4" />
              Support
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              How we can help you
            </h2>
            <p className="text-muted-foreground mt-2">
              Our team is ready to assist with any questions or needs you may have.
            </p>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-muted-foreground text-base md:text-lg">
            <li className="flex items-start gap-3">
              <div className="bg-primary/10 p-1.5 rounded-full mt-0.5">
                <User className="w-4 h-4 text-primary" />
              </div>
              <span>Personalized interview prep support</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="bg-primary/10 p-1.5 rounded-full mt-0.5">
                <MessageSquare className="w-4 h-4 text-primary" />
              </div>
              <span>Feedback & feature requests</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="bg-primary/10 p-1.5 rounded-full mt-0.5">
                <Zap className="w-4 h-4 text-primary" />
              </div>
              <span>Report technical issues</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="bg-primary/10 p-1.5 rounded-full mt-0.5">
                <Handshake className="w-4 h-4 text-primary" />
              </div>
              <span>Partnership opportunities</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Contact Methods - Redesigned */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
            Choose your preferred contact method
          </h2>
          <p className="text-muted-foreground">
            We offer multiple ways to get in touch based on your needs
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {contactMethods.map((method, index) => (
            <Card
              key={index}
              className="group relative overflow-hidden border border-border/20 hover:border-primary/30 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CardContent className="p-6 space-y-5">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                  {method.icon}
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-foreground">
                    {method.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {method.description}
                  </p>
                </div>
                <div className="space-y-3 pt-2">
                  <p className="font-medium text-sm text-foreground/90">
                    {method.contact}
                  </p>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-border/50 hover:border-primary/80 transition-colors"
                  >
                    <a href={method.href} target={method.href.startsWith('http') ? "_blank" : undefined} rel="noopener noreferrer">
                      {method.action}
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Office Info & Social Links */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
        <div className="space-y-10">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Visit Our Office</h2>
          <p className="text-muted-foreground leading-relaxed text-base md:text-lg mb-4">
            While we primarily operate remotely, our team is based in San Francisco.
            We&apos;re always happy to meet with partners, investors, or enterprise clients.
          </p>
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <MapPin className="w-6 h-6 text-primary mt-1" />
              <div>
                <h4 className="font-semibold text-foreground mb-1">Address</h4>
                <p className="text-muted-foreground text-sm md:text-base">
                  91 Springboard, 4th Floor, Ackruti Trade Centre<br />
                  MIDC Industrial Area, Andheri East, Mumbai, Maharashtra 400093<br />
                  India
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Clock className="w-6 h-6 text-primary mt-1" />
              <div>
                <h4 className="font-semibold text-foreground mb-1">Business Hours</h4>
                <p className="text-muted-foreground text-sm md:text-base">
                  Monday - Friday: 9:00 AM - 6:00 PM PST<br />
                  Saturday - Sunday: Closed
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Globe className="w-6 h-6 text-primary mt-1" />
              <div>
                <h4 className="font-semibold text-foreground mb-1">Global Support</h4>
                <p className="text-muted-foreground text-sm md:text-base">
                  24/7 online support available worldwide
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="relative mt-10 md:mt-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 blur-3xl rounded-full" />
          <div className="relative bg-card/80 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-border/40 shadow-lg">
            <div className="space-y-8">
              <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">Connect With Us</h3>
              <div className="flex gap-4 md:gap-8 justify-center mb-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    className="w-12 h-12 md:w-14 md:h-14 bg-primary/10 hover:bg-primary/20 rounded-full flex items-center justify-center text-primary transition-colors shadow"
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-foreground mb-1">Quick Links</h4>
                <div className="space-y-2 text-sm md:text-base">
                  <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                    Help Center & FAQ
                  </a>
                  <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                    Feature Requests
                  </a>
                  <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                    Bug Reports
                  </a>
                  <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                    Partnership Inquiries
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">Frequently asked questions</h2>
          <p className="text-muted-foreground">
            Can&apos;t find what you&apos;re looking for? Check out our comprehensive FAQ section.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqs.map((faq, index) => (
            <Card key={index} className="hover:border-primary transition-colors">
              <CardHeader className="flex flex-row items-start space-y-0 space-x-4 pb-2">
                {faq.icon}
                <CardTitle className="text-base">{faq.question}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center">
          <Button variant="outline">
            View all FAQs
          </Button>
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

export default ContactPage