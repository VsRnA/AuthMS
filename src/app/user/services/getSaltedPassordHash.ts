import bcrypt from 'bcrypt';

export default async (password: string) => bcrypt.hash(password, await bcrypt.genSalt(10));
