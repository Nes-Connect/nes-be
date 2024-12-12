import * as argon2 from 'argon2';

// Mã hóa mật khẩu
export const hashPasswordHelper = async (password: string): Promise<string> => {
  try {
    const hash = await argon2.hash(password, {
      type: argon2.argon2id,
    });
    return hash;
  } catch (err) {
    throw new Error('Error hashing password');
  }
};

// Xác thực mật khẩu
export const verifyPasswordHelper = async (
  passwordhHashed: string,
  password: string,
): Promise<boolean> => {
  try {
    return await argon2.verify(passwordhHashed, password);
  } catch (err) {
    throw new Error('Error verifying password');
  }
};
