import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import GlassCard from "@/components/ui/GlassCard";
import Section from "@/components/ui/Section";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const contactInfo = [
  {
    icon: Phone,
    title: "Телефон",
    value: "+7 (747) 133-24-72",
    link: "tel:+77471332472",
    description: "Звоните с 10:00 до 22:00",
  },
  {
    icon: Mail,
    title: "Email",
    value: "info@royalhall.ru",
    link: "mailto:info@royalhall.ru",
    description: "Ответим в течение часа",
  },
  {
    icon: MapPin,
    title: "Адрес",
    value: "г. Алматы, ул. Наурызбай батыр, д. 85",
    link: "https://maps.google.com",
    description: "Станция метро ",
  },
  {
    icon: Clock,
    title: "Режим работы",
    value: "Пн-Пт: 10:00 - 22:00",
    description: "Сб-Вс: 12:00 - 00:00",
  },
];

const Contacts = () => {
  const whatsappLink = "https://wa.me/77471332472?text=Здравствуйте! Хочу узнать о бронировании зала.";

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-chocolate-dark/80 to-background" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <p className="text-primary font-medium tracking-widest uppercase text-sm mb-4">
              Контакты
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Свяжитесь <span className="text-gold-gradient">с нами</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Мы всегда рады ответить на ваши вопросы и помочь с организацией мероприятия
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Cards */}
      <Section className="!pt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contactInfo.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <GlassCard hover className="text-center h-full">
                <div className="w-14 h-14 rounded-2xl bg-gradient-gold mx-auto mb-4 flex items-center justify-center shadow-gold">
                  <item.icon size={24} className="text-primary-foreground" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                {item.link ? (
                  <a
                    href={item.link}
                    className="text-primary hover:text-gold-light transition-colors block mb-1"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="text-foreground mb-1">{item.value}</p>
                )}
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* WhatsApp CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mb-16"
        >
          <GlassCard className="inline-block px-8 py-6">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <p className="text-foreground font-medium">
                Предпочитаете мессенджеры?
              </p>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <Button variant="whatsapp" size="lg">
                  <MessageCircle size={20} />
                  Написать в WhatsApp
                </Button>
              </a>
            </div>
          </GlassCard>
        </motion.div>

        {/* Map */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="rounded-3xl overflow-hidden border border-primary/20 h-[500px]">
            <iframe
              src="https://go.2gis.com/VWKqi"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Карта расположения Royal Hall"
            />
          </div>
        </motion.div>
      </Section>

      <Footer />
    </div>
  );
};

export default Contacts;
