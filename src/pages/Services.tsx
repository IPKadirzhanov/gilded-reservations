import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Heart, Building2, Cake, Users, PartyPopper, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import GlassCard from "@/components/ui/GlassCard";
import Section from "@/components/ui/Section";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import weddingImage from "@/assets/gallery/wedding-1.jpg";
import corporateImage from "@/assets/gallery/corporate-1.jpg";
import birthdayImage from "@/assets/gallery/birthday-1.jpg";
import venueImage from "@/assets/gallery/venue-1.jpg";

const services = [
  {
    id: "wedding",
    icon: Heart,
    title: "Свадебные банкеты",
    description: "Ваш идеальный день в атмосфере роскоши и романтики",
    image: weddingImage,
    features: [
      "Полное оформление зала",
      "Авторское свадебное меню",
      "Координация церемонии",
      "Фото и видео",
      "Лимузин для молодожёнов",
    ],
    priceFrom: "от 350 000 ₽",
  },
  {
    id: "corporate",
    icon: Building2,
    title: "Корпоративные мероприятия",
    description: "Бизнес-встречи, тимбилдинги и праздничные корпоративы",
    image: corporateImage,
    features: [
      "Конференц-оборудование",
      "Бизнес-меню",
      "Развлекательная программа",
      "Брендирование зала",
      "Трансфер сотрудников",
    ],
    priceFrom: "от 200 000 ₽",
  },
  {
    id: "birthday",
    icon: Cake,
    title: "Юбилеи и дни рождения",
    description: "Незабываемый праздник для самых близких",
    image: birthdayImage,
    features: [
      "Тематическое оформление",
      "Праздничное меню",
      "Торт на заказ",
      "Ведущий и музыка",
      "Фотозона",
    ],
    priceFrom: "от 150 000 ₽",
  },
  {
    id: "conference",
    icon: Mic,
    title: "Конференции и семинары",
    description: "Деловые мероприятия на высшем уровне",
    image: venueImage,
    features: [
      "Проектор и экран",
      "Микрофоны и звук",
      "Кофе-брейки",
      "Зона нетворкинга",
      "Техническая поддержка",
    ],
    priceFrom: "от 80 000 ₽",
  },
  {
    id: "party",
    icon: PartyPopper,
    title: "Частные вечеринки",
    description: "Эксклюзивные мероприятия в закрытом формате",
    image: weddingImage,
    features: [
      "Приватная атмосфера",
      "Авторский декор",
      "Премиум меню",
      "DJ и танцпол",
      "VIP-сервис",
    ],
    priceFrom: "от 250 000 ₽",
  },
  {
    id: "banquet",
    icon: Users,
    title: "Банкеты любого формата",
    description: "Индивидуальный подход к каждому событию",
    image: corporateImage,
    features: [
      "Гибкая рассадка",
      "Меню по запросу",
      "Персональный менеджер",
      "Парковка",
      "Гардероб",
    ],
    priceFrom: "от 100 000 ₽",
  },
];

const Services = () => {
  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-chocolate-dark/80 to-background" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <p className="text-primary font-medium tracking-widest uppercase text-sm mb-4">
              Наши услуги
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Создаём <span className="text-gold-gradient">идеальные события</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Полный спектр услуг для проведения мероприятий любого масштаба и формата
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <Section>
        <div className="space-y-20">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <div
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Image */}
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="relative rounded-3xl overflow-hidden aspect-[4/3] group">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                    <div className="absolute top-6 left-6">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-gold flex items-center justify-center shadow-gold">
                        <service.icon size={24} className="text-primary-foreground" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <GlassCard>
                    <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                      {service.title}
                    </h2>
                    <p className="text-muted-foreground mb-6">{service.description}</p>

                    <ul className="space-y-3 mb-8">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-3 text-foreground/80">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Стоимость</p>
                        <p className="text-2xl font-bold text-gold-gradient">
                          {service.priceFrom}
                        </p>
                      </div>
                      <Link to="/booking">
                        <Button variant="gold">Запросить расчёт</Button>
                      </Link>
                    </div>
                  </GlassCard>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section className="bg-chocolate-dark/50">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <GlassCard className="text-center py-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Не нашли нужный формат?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
              Мы создадим индивидуальное предложение специально для вашего события
            </p>
            <Link to="/booking">
              <Button variant="gold" size="lg">
                Оставить заявку
              </Button>
            </Link>
          </GlassCard>
        </motion.div>
      </Section>

      <Footer />
    </div>
  );
};

export default Services;
