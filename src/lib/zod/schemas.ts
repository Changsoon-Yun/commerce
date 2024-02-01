import { z } from 'zod';

// const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d|\W).{8,}$/;
export const loginFormSchema = z.object({
  email: z.string().email({ message: '이메일 형식에 맞지 않습니다.' }),
  // password: z.string().regex(regex, { message: '비밀번호 형식에 맞지 않습니다.' }),
  password: z.string(),
});

export const registerFormSchema = loginFormSchema.extend({
  userName: z
    .string()
    .min(1, { message: '이름은 최소 1자 이상 입니다.' })
    .max(20, { message: '이름은 최대 20자 입니다.' }),
});

export const productFormSchema = z.object({
  title: z.string().min(1, { message: '제목은 최소 1글자 이상 입니다.' }),
  desc: z.string().min(1, { message: '내용은 최소 1글자 이상 입니다.' }),
  category: z.string().min(1, { message: '카테고리를 선택해 주세요.' }),
  price: z.string().min(1, { message: '가격은 100원 이상입니다.' }).or(z.number()),
  condition: z.string().min(1, { message: '상태를 선택해주세요.' }),
  imgList: z
    .array(
      z.object({
        src: z.string(),
        blob: z.instanceof(File),
      })
    )
    .refine((data) => data?.length <= 1, { message: '최소1장 필요' }),
});
