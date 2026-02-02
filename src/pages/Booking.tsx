import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CalendarIcon, CheckCircle2, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import GlassCard from "@/components/ui/GlassCard";
import Section from "@/components/ui/Section";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const bookingSchema = z.object({
  name: z.string().min(2, "Минимум 2 символа").max(100, "Максимум 100 символов"),
  phone: z
    .string()
    .min(10, "Введите корректный номер телефона")
    .max(20, "Максимум 20 символов")
    .regex(/^[\d\s\-\+\(\)]+$/, "Некорректный формат номера"),
  event_date: z.date({ required_error: "Выберите дату" }),
  guests_count: z.coerce.number().min(10, "Минимум 10 гостей").max(300, "Максимум 300 гостей"),
  event_type: z.string().min(1, "Выберите тип мероприятия"),
  comment: z.string().max(1000, "Максимум 1000 символов").optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

const eventTypes = [
  { value: "wedding", label: "Свадьба" },
  { value: "corporate", label: "Корпоратив" },
  { value: "birthday", label: "День рождения / Юбилей" },
  { value: "conference", label: "Конференция" },
  { value: "party", label: "Частная вечеринка" },
  { value: "other", label: "Другое" },
];

const Booking = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: "",
      phone: "",
      guests_count: 50,
      event_type: "",
      comment: "",
    },
  });

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("booking_requests").insert({
        name: data.name,
        phone: data.phone,
        event_date: format(data.event_date, "yyyy-MM-dd"),
        guests_count: data.guests_count,
        event_type: eventTypes.find((t) => t.value === data.event_type)?.label || data.event_type,
        comment: data.comment || null,
      });

      if (error) throw error;

      setIsSuccess(true);
      toast({
        title: "Заявка отправлена!",
        description: "Мы свяжемся с вами в ближайшее время",
      });
    } catch (error) {
      console.error("Booking error:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось отправить заявку. Попробуйте позже.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen">
        <Header />
        <Section className="pt-40">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-lg mx-auto"
          >
            <GlassCard className="text-center py-12">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="w-20 h-20 rounded-full bg-gradient-gold mx-auto mb-6 flex items-center justify-center"
              >
                <CheckCircle2 size={40} className="text-primary-foreground" />
              </motion.div>
              <h2 className="font-display text-3xl font-bold text-foreground mb-4">
                Заявка отправлена!
              </h2>
              <p className="text-muted-foreground mb-8">
                Спасибо за вашу заявку! Наш менеджер свяжется с вами в течение 30 минут для уточнения деталей.
              </p>
              <Button
                variant="gold"
                onClick={() => {
                  setIsSuccess(false);
                  form.reset();
                }}
              >
                Отправить ещё заявку
              </Button>
            </GlassCard>
          </motion.div>
        </Section>
        <Footer />
      </div>
    );
  }

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
              Онлайн-бронирование
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Забронируйте <span className="text-gold-gradient">вашу дату</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Заполните форму, и мы свяжемся с вами в течение 30 минут
            </p>
          </motion.div>
        </div>
      </section>

      {/* Form */}
      <Section className="!pt-0">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <GlassCard className="p-8 md:p-10">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Name */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">Ваше имя *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Иван Иванов"
                            className="bg-card/50 border-primary/20 focus:border-primary rounded-xl h-12"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Phone */}
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">Телефон *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="+7 (747) 133-24-72"
                            className="bg-card/50 border-primary/20 focus:border-primary rounded-xl h-12"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Date */}
                  <FormField
                    control={form.control}
                    name="event_date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className="text-foreground">Дата мероприятия *</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full h-12 justify-start text-left font-normal bg-card/50 border-primary/20 hover:bg-card/80 rounded-xl",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
                                {field.value
                                  ? format(field.value, "d MMMM yyyy", { locale: ru })
                                  : "Выберите дату"}
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0 bg-card border-primary/20" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date < new Date()}
                              initialFocus
                              className="pointer-events-auto"
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Guests */}
                  <FormField
                    control={form.control}
                    name="guests_count"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">Количество гостей *</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min={10}
                            max={300}
                            placeholder="50"
                            className="bg-card/50 border-primary/20 focus:border-primary rounded-xl h-12"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Event Type */}
                  <FormField
                    control={form.control}
                    name="event_type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">Тип мероприятия *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-card/50 border-primary/20 focus:border-primary rounded-xl h-12">
                              <SelectValue placeholder="Выберите тип" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-card border-primary/20">
                            {eventTypes.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Comment */}
                  <FormField
                    control={form.control}
                    name="comment"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-foreground">Комментарий</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Расскажите о ваших пожеланиях..."
                            className="bg-card/50 border-primary/20 focus:border-primary rounded-xl min-h-[120px] resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    variant="gold"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="animate-spin mr-2" size={20} />
                        Отправка...
                      </>
                    ) : (
                      "Отправить заявку"
                    )}
                  </Button>

                  <p className="text-center text-muted-foreground text-sm">
                    Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
                  </p>
                </form>
              </Form>
            </GlassCard>
          </motion.div>
        </div>
      </Section>

      <Footer />
    </div>
  );
};

export default Booking;
