import crypto from 'crypto';

export const hashPassword = async (
  password: string,
  salt: string,
): Promise<string> => {
  return new Promise((resolve, reject) => {
    crypto.scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) reject(err);
      resolve(derivedKey.toString('hex'));
    });
  });
};

export const generateSalt = async (): Promise<string> => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(16, (err, buffer) => {
      if (err) reject(err);
      resolve(buffer.toString('hex'));
    });
  });
};

export const generateToken = async (): Promise<string> => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(32, (err, buffer) => {
      if (err) reject(err);
      resolve(buffer.toString('hex'));
    });
  });
};

export const verifyPassword = async (
  password: string,
  salt: string,
  hash: string,
): Promise<boolean> => {
  try {
    const derivedKey = await hashPassword(password, salt);
    return derivedKey === hash;
  } catch (error) {
    console.error('Failed to verify password:', error);
    throw new Error('Password verification failed');
  }
};

export const generateResetToken = async (): Promise<string> => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(32, (err, buffer) => {
      if (err) reject(err);
      resolve(buffer.toString('hex'));
    });
  });
};

export const generateResetTokenExpiry = (): Date => {
  const now = new Date();
  return new Date(now.setMinutes(now.getMinutes() + 10));
};

export const generateEmailToken = async (): Promise<string> => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(32, (err, buffer) => {
      if (err) reject(err);
      resolve(buffer.toString('hex'));
    });
  });
};

export const generateEmailTokenExpiry = (): Date => {
  const now = new Date();
  return new Date(now.setHours(now.getHours() + 1));
};

export const generateAuthToken = async (): Promise<string> => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(32, (err, buffer) => {
      if (err) reject(err);
      resolve(buffer.toString('hex'));
    });
  });
};

export const generateAuthTokenExpiry = (): Date => {
  const now = new Date();
  return new Date(now.setHours(now.getHours() + 1));
};

export const generateRefreshToken = async (): Promise<string> => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(32, (err, buffer) => {
      if (err) reject(err);
      resolve(buffer.toString('hex'));
    });
  });
};

export const generateRefreshTokenExpiry = (): Date => {
  const now = new Date();
  return new Date(now.setDate(now.getDate() + 30));
};

export const generateVerificationToken = async (): Promise<string> => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(32, (err, buffer) => {
      if (err) reject(err);
      resolve(buffer.toString('hex'));
    });
  });
};

export const generateVerificationTokenExpiry = (): Date => {
  const now = new Date();
  return new Date(now.setHours(now.getHours() + 1));
};

export const generateVerificationTokenExpiryDate = (): Date => {
  const now = new Date();
  return new Date(now.setHours(now.getHours() + 24));
};

export const generateVerificationTokenExpiryDate2 = (): Date => {
  const now = new Date();
  return new Date(now.setHours(now.getHours() + 2));
};
