"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useTranslations } from 'next-intl'
import { FormSubmit } from '@/components/ui/form-button'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Icon } from '@/components/ui/icon';
import { Button } from '@/components/ui/button'
import { CardHeadline } from '../../components/card'
import { toast } from 'sonner'
import { useRef, useState } from 'react'
import confetti from "canvas-confetti";

export type SubmitHandler = (values: {email: string; message: string;}) => Promise<{id: number}>;

export function ContactForm({
  onSubmit
}: {onSubmit: SubmitHandler}) {
  const t = useTranslations('ProfilePage');
  const formSchema = z.object({
    email: z.string().email({
      message: t('z.email'),
    }),
    message: z.string({
      message: t('z.message'),
    }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      message: ''
    },
  });

  const _onSubmit: SubmitHandler = async (values) => {
    return await onSubmit(values);
  }

  return (
    <Form {...form}>
      <form className="flex flex-col gap-2" onSubmit={form.handleSubmit(_onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('email')}</FormLabel>
              <FormControl>
                <Input placeholder={t('email')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('message')}</FormLabel>
              <FormControl>
                <Textarea className="min-h-[200px]" placeholder={t('message')} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormSubmit className="w-full">{t('submit')}</FormSubmit>
      </form>
    </Form>
  )
}

export function ContactButton({
  onSubmit
}: {onSubmit: SubmitHandler}) {
  const t = useTranslations('ProfilePage');
  const [open, setOpen] = useState(false);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className='rounded-full' >
            <Icon type={'PaperPlaneIcon'} className="size-4 mr-2" />
            {t('sendMessage')}
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-[400px]">
          <CardHeadline className="mb-4">{t('sendMessage')}</CardHeadline>
          <ContactForm onSubmit={(val) => onSubmit(val)
            .then((result) => {
              toast(t('sent'));
              confetti();
              setOpen(false);
              return result;
            })} />
        </DialogContent>
      </Dialog>
    </>
  )
}
