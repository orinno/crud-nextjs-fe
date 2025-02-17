import bcrypt from 'bcryptjs'; //ini sempet error, solving: syntax npm i --save-dev @types/bcryptjs

export async function hashPassword(password: string): Promise<string>{
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
}

export async function verifyPass(inputPassword: string, hashPassword: string): Promise<boolean>{
    return await bcrypt.compare(inputPassword, hashPassword);
}

export async function comparePassword(password: string, hashedPassword: string): Promise<boolean>{
    return await bcrypt.compare(password, hashedPassword);
  }