class ToastMessage {
  description: string;

  constructor(description: string) {
    this.description = description;
  }
}

class ToastMessageWithTitle extends ToastMessage {
  title: string;

  constructor(title: string, description: string) {
    super(description);
    this.title = title;
  }
}

const toastMessage = {
  login: new ToastMessageWithTitle('로그인 성공!', '메인 페이지로 이동합니다!'),
  register: new ToastMessageWithTitle(
    '회원 가입 성공!',
    '로그인까지 했어요! 메인 페이지로 이동합니다!'
  ),
  productAdd: new ToastMessage('상품 등록을 성공 했습니다. 이전 페이지로 이동합니다.'),
  productEdit: new ToastMessage('상품 수정을 성공 했습니다. 이전 페이지로 이동합니다.'),
  productDelete: new ToastMessage('상품 삭제에 성공 했습니다.'),
  updateOrderState: new ToastMessage('주문 상태 수정을 성공 했습니다.'),
  cancelOrder: new ToastMessage('주문 취소를 성공 했습니다.'),
};

export { toastMessage };
