import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { postContact } from '@/lib/api';
import emailjs from '@emailjs/browser';
import { validateContactForm } from '@/lib/validators';

const ContactForm = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    const errors = validateContactForm(formData);
    if (errors.length > 0) {
      errors.forEach((error) => toast.error(error.message));
      return;
    }

    setLoading(true);
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined;

    try {
      // If EmailJS is configured, send via EmailJS
      if (serviceId && templateId && publicKey) {
        await emailjs.send(
          serviceId,
          templateId,
          {
            from_name: formData.name,
            from_email: formData.email,
            subject: formData.subject,
            message: formData.message,
          },
          { publicKey }
        );
      }

      // Fire-and-forget save to backend (optional: store message in DB)
      // We don't await to avoid blocking UX if API is slow
      postContact(formData).catch(() => {});

      toast.success('Message envoyé avec succès !');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err: unknown) {
      let msg = "Erreur lors de l'envoi du message";
      if (err && typeof err === 'object') {
        const e = err as { message?: string; response?: { data?: { message?: string } } };
        msg = e.response?.data?.message ?? e.message ?? msg;
      }
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className="space-y-6 max-w-2xl mx-auto"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Nom complet *</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Votre nom"
            required
            maxLength={100}
            disabled={loading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="votre@email.com"
            required
            maxLength={255}
            disabled={loading}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="subject">Sujet *</Label>
        <Input
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="Sujet de votre message"
          required
          maxLength={200}
          disabled={loading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message *</Label>
        <Textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Écrivez votre message ici..."
          required
          maxLength={2000}
          rows={6}
          disabled={loading}
        />
        <p className="text-xs text-muted-foreground text-right">
          {formData.message.length} / 2000 caractères
        </p>
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full bg-primary hover:bg-primary/90"
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 animate-spin" size={20} />
            Envoi en cours...
          </>
        ) : (
          <>
            <Send className="mr-2" size={20} />
            Envoyer le message
          </>
        )}
      </Button>
    </motion.form>
  );
};

export default ContactForm;
