import i18n from '../i18n/i18n';

export const generateWhatsAppLink = (cart, totalPrice, clientInfo) => {
  const phoneNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '212642853333';
  
  let message = `${i18n.t('whatsapp.greeting')}\n\n`;
  
  message += `*Détails du Client:*\n`;
  message += `• Nom: ${clientInfo.name}\n`;
  message += `• Téléphone: ${clientInfo.phone}\n`;
  message += `• Email: ${clientInfo.email}\n`;
  message += `• Adresse: ${clientInfo.address}\n`;
  message += `• Ville: ${clientInfo.city}\n\n`;

  message += `*Détails de la Commande:*\n`;
  cart.forEach((item) => {
    message += `• ${item.name} x ${item.quantity} — ${item.price * item.quantity} MAD\n`;
  });
  
  message += `\n*TOTAL: ${totalPrice} MAD*\n`;
  
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
};
