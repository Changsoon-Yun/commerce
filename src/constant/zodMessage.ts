class ZodMessage {
  message: string;

  constructor(message: string) {
    this.message = message;
  }
}

const zodMessage = {
  login: {
    email: new ZodMessage('이메일 형식에 맞지 않습니다.'),
    password: new ZodMessage('비밀번호 형식에 맞지 않습니다.'),
  },

  register: {
    userName: {
      min: new ZodMessage('이름을 입력해 주세요.'),
      max: new ZodMessage('이름은 최대 50자 입니다.'),
    },
  },

  product: {
    title: new ZodMessage('제목을 입력해 주세요.'),
    desc: new ZodMessage('내용을 입력해 주세요.'),
    category: new ZodMessage('카테고리를 선택해 주세요.'),
    price: new ZodMessage('가격을 입력해 주세요.'),
    condition: new ZodMessage('상태를 선택해 주세요.'),
    imgList: new ZodMessage('최소1장 필요'),
  },

  order: {
    buyer_name: new ZodMessage('이름을 입력해 주세요.'),
    buyer_tel: new ZodMessage('전화번호를 입력해 주세요.'),
    buyer_email: new ZodMessage('이메일 형식에 맞지 않습니다.'),
    buyer_addr: new ZodMessage('배송주소를 입력해 주세요.'),
    buyer_postcode: new ZodMessage('우편번호를 입력해 주세요.'),
  },
};

export { zodMessage };
