import { z } from 'zod';

// const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d|\W).{8,}$/;
export const loginFormSchema = z.object({
  email: z.string().email({ message: '이메일 형식에 맞지 않습니다.' }),
  // password: z.string().regex(regex, { message: '비밀번호 형식에 맞지 않습니다.' }),
  password: z.string().min(4, { message: '비밀번호 형식에 맞지 않습니다.' }),
});

export const registerFormSchema = loginFormSchema.extend({
  userName: z
    .string()
    .min(1, { message: '이름을 입력해 주세요.' })
    .max(50, { message: '이름은 최대 50자 입니다.' }),
});

export const productFormSchema = z.object({
  title: z.string().min(1, { message: '제목을 입력해 주세요.' }),
  desc: z.string().min(1, { message: '내용을 입력해 주세요.' }),
  category: z.string().min(1, { message: '카테고리를 선택해 주세요.' }),
  price: z.string().min(1, { message: '가격을 입력해 주세요.' }).or(z.number()),
  condition: z.string().min(1, { message: '상태를 선택해 주세요.' }),
  imgList: z
    .array(
      z.object({
        src: z.string(),
        blob: z.instanceof(File),
      })
    )
    .refine((data) => data?.length <= 1, { message: '최소1장 필요' }),
});

export const orderDataFormSchema = z.object({
  amount: z.number(),
  name: z.string(),
  buyer_name: z.string().min(1, { message: '이름을 입력해 주세요.' }),
  buyer_tel: z.string().min(1, { message: '전화번호를 입력해 주세요.' }),
  buyer_email: z.string().email({ message: '이메일 형식에 맞지 않습니다.' }),
  buyer_addr: z.string().min(1, { message: '배송주소를 입력해 주세요.' }),
  buyer_postcode: z.string().min(1, { message: '우편번호를 입력해 주세요.' }),
});
