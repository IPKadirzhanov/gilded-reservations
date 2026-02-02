import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock, Instagram, Facebook, Send } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-chocolate-dark border-t border-primary/10">
      {/* Decorative top gradient */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-5">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-full bg-gradient-gold flex items-center justify-center shadow-gold-glow">
                <span className="font-display text-2xl font-bold text-primary-foreground">
                  R
                </span>
              </div>
              <div>
                <h3 className="font-display text-xl font-semibold text-foreground">
                  Royal Hall
                </h3>
                <p className="text-xs text-muted-foreground tracking-widest uppercase">
                  Банкетный зал
                </p>
              </div>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Создаём незабываемые события уже более 15 лет. Ваша идеальная свадьба, 
              корпоратив или юбилей начинается здесь.
            </p>
            {/* Social links */}
            <div className="flex gap-3">
              {[
                { icon: Instagram, href: "#" },
                { icon: Facebook, href: "#" },
                { icon: Send, href: "#" },
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  className="w-10 h-10 rounded-xl bg-card/50 border border-primary/20 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold text-foreground mb-5">
              Навигация
            </h4>
            <ul className="space-y-3">
              {[
                { name: "Главная", href: "/" },
                { name: "Услуги и банкеты", href: "/services" },
                { name: "Галерея", href: "/gallery" },
                { name: "Онлайн-бронирование", href: "/booking" },
                { name: "Контакты", href: "/contacts" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display text-lg font-semibold text-foreground mb-5">
              Услуги
            </h4>
            <ul className="space-y-3">
              {[
                "Свадебные банкеты",
                "Корпоративные мероприятия",
                "Юбилеи и дни рождения",
                "Конференции",
                "Частные вечеринки",
              ].map((service) => (
                <li key={service}>
                  <span className="text-muted-foreground text-sm">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg font-semibold text-foreground mb-5">
              Контакты
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-primary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground text-sm">
                  г. Москва, ул. Примерная, д. 123
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-primary flex-shrink-0" />
                <a
                  href="tel:+79001234567"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  +7 (900) 123-45-67
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-primary flex-shrink-0" />
                <a
                  href="mailto:info@royalhall.ru"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  info@royalhall.ru
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock size={18} className="text-primary mt-0.5 flex-shrink-0" />
                <div className="text-muted-foreground text-sm">
                  <p>Пн-Пт: 10:00 - 22:00</p>
                  <p>Сб-Вс: 12:00 - 00:00</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm text-center sm:text-left">
            © {currentYear} Royal Hall. Все права защищены.
          </p>
          <div className="flex gap-6">
            <Link
              to="/admin"
              className="text-muted-foreground hover:text-primary transition-colors text-sm"
            >
              Панель управления
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
