import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { RefreshCw, Calendar, Users, Phone, FileText, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import GlassCard from "@/components/ui/GlassCard";
import Section from "@/components/ui/Section";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface BookingRequest {
  id: string;
  name: string;
  phone: string;
  event_date: string;
  guests_count: number;
  event_type: string;
  comment: string | null;
  status: string;
  created_at: string;
}

const statusColors: Record<string, string> = {
  new: "bg-primary/20 text-primary",
  contacted: "bg-blue-500/20 text-blue-400",
  confirmed: "bg-green-500/20 text-green-400",
  cancelled: "bg-destructive/20 text-destructive",
};

const statusLabels: Record<string, string> = {
  new: "Новая",
  contacted: "Связались",
  confirmed: "Подтверждена",
  cancelled: "Отменена",
};

const Admin = () => {
  const [bookings, setBookings] = useState<BookingRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");

  const fetchBookings = async () => {
    setIsLoading(true);
    try {
      let query = supabase
        .from("booking_requests")
        .select("*")
        .order("created_at", { ascending: false });

      if (filter !== "all") {
        query = query.eq("status", filter);
      }

      const { data, error } = await query;

      if (error) throw error;
      setBookings(data || []);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить заявки",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [filter]);

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from("booking_requests")
        .update({ status: newStatus })
        .eq("id", id);

      if (error) throw error;

      setBookings((prev) =>
        prev.map((booking) =>
          booking.id === id ? { ...booking, status: newStatus } : booking
        )
      );

      toast({
        title: "Статус обновлён",
        description: `Заявка переведена в статус "${statusLabels[newStatus]}"`,
      });
    } catch (error) {
      console.error("Error updating status:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось обновить статус",
        variant: "destructive",
      });
    }
  };

  const stats = {
    total: bookings.length,
    new: bookings.filter((b) => b.status === "new").length,
    confirmed: bookings.filter((b) => b.status === "confirmed").length,
  };

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-chocolate-dark/80 to-background" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <p className="text-primary font-medium tracking-widest uppercase text-sm mb-4">
              Панель управления
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Заявки на <span className="text-gold-gradient">бронирование</span>
            </h1>
          </motion.div>
        </div>
      </section>

      <Section className="!pt-4">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[
            { label: "Всего заявок", value: stats.total, icon: FileText },
            { label: "Новых", value: stats.new, icon: Clock },
            { label: "Подтверждённых", value: stats.confirmed, icon: Calendar },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <GlassCard className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-gold flex items-center justify-center">
                  <stat.icon size={20} className="text-primary-foreground" />
                </div>
                <div>
                  <p className="text-muted-foreground text-sm">{stat.label}</p>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Filters & Actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[200px] bg-card/50 border-primary/20 rounded-xl">
              <SelectValue placeholder="Фильтр по статусу" />
            </SelectTrigger>
            <SelectContent className="bg-card border-primary/20">
              <SelectItem value="all">Все заявки</SelectItem>
              <SelectItem value="new">Новые</SelectItem>
              <SelectItem value="contacted">Связались</SelectItem>
              <SelectItem value="confirmed">Подтверждённые</SelectItem>
              <SelectItem value="cancelled">Отменённые</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" onClick={fetchBookings} disabled={isLoading}>
            <RefreshCw size={16} className={isLoading ? "animate-spin" : ""} />
            Обновить
          </Button>
        </div>

        {/* Table */}
        <GlassCard className="overflow-hidden p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-primary/10 hover:bg-transparent">
                  <TableHead className="text-foreground font-semibold">Дата заявки</TableHead>
                  <TableHead className="text-foreground font-semibold">Имя</TableHead>
                  <TableHead className="text-foreground font-semibold">Телефон</TableHead>
                  <TableHead className="text-foreground font-semibold">Мероприятие</TableHead>
                  <TableHead className="text-foreground font-semibold">Дата события</TableHead>
                  <TableHead className="text-foreground font-semibold">Гостей</TableHead>
                  <TableHead className="text-foreground font-semibold">Статус</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
                      Загрузка...
                    </TableCell>
                  </TableRow>
                ) : bookings.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
                      Заявок пока нет
                    </TableCell>
                  </TableRow>
                ) : (
                  bookings.map((booking) => (
                    <TableRow key={booking.id} className="border-primary/10">
                      <TableCell className="text-muted-foreground">
                        {format(new Date(booking.created_at), "d MMM yyyy, HH:mm", { locale: ru })}
                      </TableCell>
                      <TableCell className="font-medium text-foreground">{booking.name}</TableCell>
                      <TableCell>
                        <a
                          href={`tel:${booking.phone}`}
                          className="flex items-center gap-2 text-primary hover:text-gold-light"
                        >
                          <Phone size={14} />
                          {booking.phone}
                        </a>
                      </TableCell>
                      <TableCell className="text-foreground/80">{booking.event_type}</TableCell>
                      <TableCell className="text-foreground/80">
                        <div className="flex items-center gap-2">
                          <Calendar size={14} className="text-primary" />
                          {format(new Date(booking.event_date), "d MMMM yyyy", { locale: ru })}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-foreground/80">
                          <Users size={14} className="text-primary" />
                          {booking.guests_count}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Select
                          value={booking.status}
                          onValueChange={(value) => updateStatus(booking.id, value)}
                        >
                          <SelectTrigger
                            className={`w-[140px] h-8 text-xs border-0 ${
                              statusColors[booking.status]
                            }`}
                          >
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-card border-primary/20">
                            <SelectItem value="new">Новая</SelectItem>
                            <SelectItem value="contacted">Связались</SelectItem>
                            <SelectItem value="confirmed">Подтверждена</SelectItem>
                            <SelectItem value="cancelled">Отменена</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </GlassCard>
      </Section>

      <Footer />
    </div>
  );
};

export default Admin;
