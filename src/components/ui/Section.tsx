import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  id?: string;
}

const Section = ({ children, className, title, subtitle, id }: SectionProps) => {
  return (
    <section id={id} className={`py-20 md:py-28 ${className || ""}`}>
      <div className="container mx-auto px-4">
        {(title || subtitle) && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            {subtitle && (
              <p className="text-primary font-medium tracking-widest uppercase text-sm mb-3">
                {subtitle}
              </p>
            )}
            {title && (
              <>
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                  {title}
                </h2>
                <div className="section-divider" />
              </>
            )}
          </motion.div>
        )}
        {children}
      </div>
    </section>
  );
};

export default Section;
