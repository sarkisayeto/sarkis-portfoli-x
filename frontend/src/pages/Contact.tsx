import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';

const Contact = () => {
  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      value: 'sarkisekpinda832@gmail.com',
      href: 'mailto:sarkisekpinda832@gmail.com',
    },
    {
      icon: Phone,
      title: 'Téléphone',
      value: '+229 0155963913',
      href: 'tel:+2290155963913',
    },
    {
      icon: MapPin,
      title: 'Localisation',
      value: 'Benin',
      href: null,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Prenons{' '}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                contact
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Vous avez un projet en tête ou simplement une question ? N'hésitez pas à me contacter, je vous répondrai dans les plus brefs délais.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Contact Info Cards */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:col-span-1 space-y-4"
            >
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                  className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <info.icon className="text-primary" size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{info.title}</h3>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="text-sm text-muted-foreground hover:text-primary transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-sm text-muted-foreground">{info.value}</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-lg p-6"
              >
                <h3 className="font-semibold mb-2">Disponibilité</h3>
                <p className="text-sm text-muted-foreground">
                  Actuellement disponible pour de nouvelles opportunités et projets freelance.
                </p>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2"
            >
              <div className="bg-card border border-border rounded-lg p-8">
                <h2 className="text-2xl font-semibold mb-6">Envoyez-moi un message</h2>
                <ContactForm />
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
