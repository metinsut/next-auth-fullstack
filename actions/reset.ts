'use server';

import * as z from 'zod';

import { ResetSchema } from '@/schemas';
import { getUserByEmail } from '@/data/user';
import { sendPasswordResetEmail } from '@/lib/mail';
import { generatePasswordResetToken } from '@/lib/tokens';

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid emaiL!' };
  }

  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return { error: 'Email not found!' };
  }
  console.log('1');

  const passwordResetToken = await generatePasswordResetToken(email);
  console.log('2', passwordResetToken);
  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  );
  console.log('3');

  return { success: 'Reset email sent!' };
};
