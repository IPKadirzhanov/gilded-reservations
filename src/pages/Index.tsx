import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MessageCircle, Star, Users, Calendar, Award, ChefHat } from "lucide-react";
import { Button } from "@/components/ui/button";
import GlassCard from "@/components/ui/GlassCard";
import Section from "@/components/ui/Section";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import heroVideo from "@/assets/hero-video.mp4";
import weddingImage from "@/assets/gallery/wedding-1.jpg";
import corporateImage from "@/assets/gallery/corporate-1.jpg";
import birthdayImage from "@/assets/gallery/birthday-1.jpg";

const advantages = [
  {
    icon: Award,
    title: "15 лет опыта",
    description: "Более 2000 успешно проведённых мероприятий",
  },
  {
    icon: Users,
    title: "До 300 гостей",
    description: "Просторный зал с гибкой рассадкой",
  },
  {
    icon: ChefHat,
    title: "Авторская кухня",
    description: "Шеф-повар с мишленовским опытом",
  },
  {
    icon: Calendar,
    title: "Под ключ",
    description: "Полное сопровождение вашего события",
  },
];

const packages = [
  {
    name: "Классический",
    price: "от 5 000 Т",
    perPerson: "за гостя",
    features: ["Аренда зала 6 часов", "Базовое меню", "Сервировка", "Аудиосистема"],
    popular: false,
  },
  {
    name: "Премиум",
    price: "от 8 500 Т",
    perPerson: "за гостя",
    features: ["Аренда зала 8 часов", "Премиум меню", "Декор зала", "Ведущий и DJ", "Фотограф 2 часа"],
    popular: true,
  },
  {
    name: "VIP",
    price: "от 15 000 Т",
    perPerson: "за гостя",
    features: [
      "Аренда зала на весь день",
      "Эксклюзивное меню",
      "Авторский декор",
      "Полная организация",
      "Фото и видео",
      "Координатор события",
    ],
    popular: false,
  },
];

const testimonials = [
  {
    name: "Анна и Дмитрий",
    event: "Свадьба, июнь 2024",
    text: "Это был самый волшебный день в нашей жизни! Команда Royal Hall продумала каждую деталь. Гости до сих пор в восторге!",
    rating: 5,
  },
  {
    name: "Михаил Петров",
    event: "Корпоратив, декабрь 2024",
    text: "Провели здесь новогодний корпоратив на 150 человек. Безупречный сервис, отличная кухня и внимание к мелочам.",
    rating: 5,
  },
  {
    name: "Елена Козлова",
    event: "Юбилей 50 лет",
    text: "Отмечали юбилей мамы. Атмосфера роскоши и уюта одновременно. Отдельное спасибо шеф-повару!",
    rating: 5,
  },
];

const Index = () => {
  const whatsappLink = "https://wa.me/79001234567?text=Здравствуйте! Хочу узнать о бронировании зала.";

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section with Video Background */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover">
          <source src={heroVideo} type="video/mp4" />
        </video>

        {/* Overlay */}
        <div className="video-overlay" />

        {/* Floating particles effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-primary/30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 5 + Math.random() * 5,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="text-primary font-medium tracking-widest uppercase text-sm mb-4">
              Банкетный зал премиум-класса
            </p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight"
          >
            Идеальное место для
            <span className="block text-gold-gradient">свадеб и банкетов</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10"
          >
            Забронируйте дату онлайн за 1 минуту и создайте незабываемое событие в атмосфере роскоши и безупречного
            сервиса
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/booking">
              <Button variant="hero" size="xl" className="w-full sm:w-auto">
                Забронировать дату
              </Button>
            </Link>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <Button variant="whatsapp" size="xl" className="w-full sm:w-auto">
                <MessageCircle size={20} />
                WhatsApp
              </Button>
            </a>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-primary/30 flex items-start justify-center p-2">
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-primary"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* Advantages Section */}
      <Section subtitle="Почему мы" title="Преимущества Royal Hall">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {advantages.map((adv, index) => (
            <motion.div
              key={adv.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <GlassCard hover className="text-center h-full">
                <div className="w-16 h-16 rounded-2xl bg-gradient-gold mx-auto mb-5 flex items-center justify-center shadow-gold">
                  <adv.icon size={28} className="text-primary-foreground" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">{adv.title}</h3>
                <p className="text-muted-foreground text-sm">{adv.description}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Services Preview */}
      <Section subtitle="Наши услуги" title="Мы проводим" className="bg-chocolate-dark/50">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Свадьбы", image: weddingImage, desc: "Ваш идеальный день" },
            { title: "Корпоративы", image: corporateImage, desc: "Бизнес-мероприятия" },
            { title: "Юбилеи", image: birthdayImage, desc: "Семейные праздники" },
          ].map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <Link to="/services" className="group block">
                <div className="relative overflow-hidden rounded-3xl aspect-[4/3]">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-primary text-sm font-medium mb-1">{service.desc}</p>
                    <h3 className="font-display text-2xl font-semibold text-foreground">{service.title}</h3>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Link to="/services">
            <Button variant="outline" size="lg">
              Все услуги
            </Button>
          </Link>
        </motion.div>
      </Section>

      {/* Packages Section */}
      <Section subtitle="Наши пакеты" title="Выберите свой формат">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className={pkg.popular ? "md:-mt-4 md:mb-4" : ""}
            >
              <GlassCard className={`h-full relative ${pkg.popular ? "border-primary/50 shadow-gold-glow" : ""}`}>
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-gold text-primary-foreground text-xs font-semibold px-4 py-1.5 rounded-full">
                      Популярный
                    </span>
                  </div>
                )}
                <div className="text-center mb-6 pt-2">
                  <h3 className="font-display text-2xl font-semibold text-foreground mb-2">{pkg.name}</h3>
                  <p className="text-3xl font-bold text-gold-gradient">{pkg.price}</p>
                  <p className="text-muted-foreground text-sm">{pkg.perPerson}</p>
                </div>
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-foreground/80">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link to="/booking" className="block">
                  <Button variant={pkg.popular ? "gold" : "outline"} className="w-full">
                    Запросить расчёт
                  </Button>
                </Link>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Testimonials Section */}
      <Section subtitle="Отзывы" title="Что говорят наши клиенты" className="bg-chocolate-dark/50">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <GlassCard className="h-full">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-foreground/80 mb-6 italic">"{testimonial.text}"</p>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-muted-foreground text-sm">{testimonial.event}</p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <Section>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <GlassCard className="text-center py-12 md:py-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Готовы создать <span className="text-gold-gradient">незабываемое событие?</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
              Оставьте заявку сейчас и получите бесплатную консультацию с нашим event-менеджером
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/booking">
                <Button variant="gold" size="lg">
                  Забронировать дату
                </Button>
              </Link>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <Button variant="glass" size="lg">
                  <MessageCircle size={18} />
                  Написать в WhatsApp
                </Button>
              </a>
            </div>
          </GlassCard>
        </motion.div>
      </Section>

      {/* Map Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <div className="rounded-3xl overflow-hidden border border-primary/20 h-[400px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2245.3728853974825!2d37.618423!3d55.751244!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTXCsDQ1JzA0LjUiTiAzN8KwMzcnMDYuMyJF!5e0!3m2!1sru!2sru!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Карта"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
