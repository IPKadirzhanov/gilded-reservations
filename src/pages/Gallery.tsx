import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Section from "@/components/ui/Section";

import wedding1 from "@/assets/gallery/wedding-1.jpg";
import wedding2 from "@/assets/gallery/wedding-2.jpg";
import corporate1 from "@/assets/gallery/corporate-1.jpg";
import birthday1 from "@/assets/gallery/birthday-1.jpg";
import cuisine1 from "@/assets/gallery/cuisine-1.jpg";
import venue1 from "@/assets/gallery/venue-1.jpg";

const galleryImages = [
  { src: wedding1, alt: "Свадебный банкет", category: "Свадьбы" },
  { src: corporate1, alt: "Корпоративное мероприятие", category: "Корпоративы" },
  { src: birthday1, alt: "День рождения", category: "Юбилеи" },
  { src: wedding2, alt: "Свадебная церемония", category: "Свадьбы" },
  { src: cuisine1, alt: "Изысканная кухня", category: "Кухня" },
  { src: venue1, alt: "Банкетный зал", category: "Интерьер" },
];

const categories = ["Все", "Свадьбы", "Корпоративы", "Юбилеи", "Кухня", "Интерьер"];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("Все");

  const filteredImages =
    activeCategory === "Все"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory);

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
              Галерея
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Атмосфера <span className="text-gold-gradient">роскоши</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Посмотрите, как мы создаём незабываемые события
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <Section className="!pt-0 !pb-8">
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? "bg-gradient-gold text-primary-foreground shadow-gold"
                  : "bg-card/50 text-foreground/70 hover:bg-card hover:text-foreground border border-primary/20"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </Section>

      {/* Gallery Grid */}
      <Section className="!pt-0">
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.src}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group cursor-pointer"
                onClick={() => setSelectedImage(image.src)}
              >
                <div className="relative overflow-hidden rounded-3xl aspect-square">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-background/0 group-hover:bg-background/40 transition-colors duration-300 flex items-center justify-center">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileHover={{ opacity: 1, scale: 1 }}
                      className="w-14 h-14 rounded-full bg-gradient-gold flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      <ZoomIn size={24} className="text-primary-foreground" />
                    </motion.div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-background/90 to-transparent">
                    <p className="text-primary text-xs font-medium mb-1">{image.category}</p>
                    <p className="text-foreground font-medium">{image.alt}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </Section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-card/80 border border-primary/20 flex items-center justify-center text-foreground hover:text-primary transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X size={24} />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={selectedImage}
              alt="Enlarged view"
              className="max-w-full max-h-[85vh] object-contain rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default Gallery;
