import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { CakeSlice, LockKeyhole, Mail } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { Button, Card, Input } from '../components/ui';
import { useAuth } from '../hooks/use-auth';
import { authService } from '../services/auth.service';

const schema = z.object({ email: z.string().email('Enter a valid email address'), password: z.string().min(6, 'Password must be at least 6 characters') });
type FormValues = z.infer<typeof schema>;
export function LoginPage(): React.JSX.Element {
  const navigate = useNavigate(); const { signIn } = useAuth();
  const form = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: { email: '', password: '' } });
  const submit = async (values: FormValues) => { try { signIn(await authService.login(values)); navigate('/', { replace: true }); } catch { form.setError('root', { message: 'Unable to sign in. Please verify your credentials.' }); } };
  return <main className="grid min-h-screen place-items-center bg-cream p-5"><motion.div initial={{opacity:0,y:18}} animate={{opacity:1,y:0}} className="w-full max-w-md"><div className="mb-7 text-center"><div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-rose text-white shadow-lg"><CakeSlice/></div><h1 className="text-3xl font-bold">Welcome back</h1><p className="mt-2 text-[#806c75]">Sign in to manage Cakes by Shiddat.</p></div><Card><form onSubmit={form.handleSubmit(submit)} className="space-y-5"><label className="block text-sm font-semibold">Email<div className="relative mt-2"><Mail className="absolute left-3 top-3 h-4 w-4 text-[#9b838d]"/><Input type="email" autoComplete="email" className="pl-9" {...form.register('email')}/></div><span className="text-xs text-red-600">{form.formState.errors.email?.message}</span></label><label className="block text-sm font-semibold">Password<div className="relative mt-2"><LockKeyhole className="absolute left-3 top-3 h-4 w-4 text-[#9b838d]"/><Input type="password" autoComplete="current-password" className="pl-9" {...form.register('password')}/></div><span className="text-xs text-red-600">{form.formState.errors.password?.message}</span></label>{form.formState.errors.root && <p className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{form.formState.errors.root.message}</p>}<Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>{form.formState.isSubmitting ? 'Signing in…' : 'Sign in securely'}</Button></form></Card></motion.div></main>;
}
