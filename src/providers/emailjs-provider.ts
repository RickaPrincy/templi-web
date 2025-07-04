import emailjs from '@emailjs/browser';
import { Env } from '@/config/env';

export type EmailTemplateParams = {
  user_id: string;
  user_name: string;
  user_email: string;
  user_message: string;
  template_url: string;
  template_name: string;
  template_description: string;
  tag_1: string;
  tag_2: string;
  tag_3: string;
};

export const emailjsProvider = {
  send: async (data: EmailTemplateParams) => {
    return emailjs.send(Env.EMAILJS_SERVICE_ID, Env.EMAILJS_TEMPLATE_ID, data, {
      publicKey: Env.EMAILJS_PUBLIC_KEY,
      limitRate: {
        id: data?.user_id,
        throttle: 10_800_000,
      },
    });
  },
};
