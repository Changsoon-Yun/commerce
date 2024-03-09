import { z } from 'zod';
import { zodMessage } from '@/constant/zodMessage.ts';

const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d|\W).{8,}$/;
export const loginFormSchema = z.object({
  email: z.string().email(zodMessage.login.email),
  password: z.string().regex(regex, zodMessage.login.password),
});

export const registerFormSchema = loginFormSchema.extend({
  userName: z
    .string()
    .min(1, zodMessage.register.userName.min)
    .max(50, zodMessage.register.userName.max),
});

export const productFormSchema = z.object({
  title: z.string().min(1, zodMessage.product.title),
  desc: z.string().min(1, zodMessage.product.desc),
  category: z.string().min(1, zodMessage.product.category),
  price: z.string().min(1, zodMessage.product.price).or(z.number()),
  condition: z.string().min(1, zodMessage.product.condition),
  imgList: z
    .array(
      z.object({
        src: z.string(),
        blob: z.instanceof(File),
      })
    )
    .refine((data) => data?.length <= 1, zodMessage.product.imgList),
});

export const orderDataFormSchema = z.object({
  amount: z.number(),
  name: z.string(),
  buyer_name: z.string().min(1, zodMessage.order.buyer_name),
  buyer_tel: z.string().min(1, zodMessage.order.buyer_tel),
  buyer_email: z.string().email(zodMessage.order.buyer_email),
  buyer_addr: z.string().min(1, zodMessage.order.buyer_addr),
  buyer_postcode: z.string().min(1, zodMessage.order.buyer_postcode),
});
