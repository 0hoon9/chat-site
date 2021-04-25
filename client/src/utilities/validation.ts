export const validateEmail = (email: string) => {
  if (email.trim() === '') {
    return '이메일을 입력해주세요';
  }

  if (!/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
    return '유효하지 않은 이메일 형식입니다';
  }
};

export const validateUsername = (value: string) => {
  if (value.trim() === '') {
    return '닉네임을 입력해주세요';
  }

  if (/[^A-Za-z0-9_-]/.test(value)) {
    return '닉네임 특수문자 사용불가';
  }
};
