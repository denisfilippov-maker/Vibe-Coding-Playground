import { NextRequest, NextResponse } from 'next/server'

interface ContactPayload {
  name: string
  contact: string
  message?: string
}

async function sendToTelegram(payload: ContactPayload): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID
  if (!token || !chatId) return

  const text = [
    '📬 *Новая заявка с сайта*',
    '',
    `👤 *Имя:* ${payload.name}`,
    `📞 *Контакт:* ${payload.contact}`,
    payload.message ? `💬 *Сообщение:* ${payload.message}` : '',
    '',
    `🕐 ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })}`,
  ]
    .filter(Boolean)
    .join('\n')

  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: 'Markdown',
    }),
  })
}

export async function POST(req: NextRequest) {
  try {
    const body: ContactPayload = await req.json()

    if (!body.name?.trim() || !body.contact?.trim()) {
      return NextResponse.json(
        { error: 'Имя и контакт обязательны' },
        { status: 400 }
      )
    }

    const payload: ContactPayload = {
      name: body.name.trim(),
      contact: body.contact.trim(),
      message: body.message?.trim() || '',
    }

    // Console log — всегда (удобно для отладки)
    console.log('[CONTACT]', payload)

    // Telegram — если заданы ENV vars
    await sendToTelegram(payload)

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[CONTACT ERROR]', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
