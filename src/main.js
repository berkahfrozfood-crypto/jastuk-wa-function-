export default async ({ req, res, log, error }) => {
  try {
    const body = JSON.parse(req.body || '{}');
    log('Body: '+JSON.stringify(body));
    const TOKEN = process.env.META_WA_TOKEN;
    const PHONE_ID = process.env.META_PHONE_ID;
    if (!TOKEN) return res.json({ error: 'Set META_WA_TOKEN dulu' }, 400);
    let to = (body.hp || '628123456789').replace(/^0/, '62');
    let msg = body.message || `🔥 JOB BARU ${body.lok || 'Koja'}\n💼 ${body.title || 'Tukang'}\n💰 ${body.budget || 'Rp 1jt'}\nCek: https://jastuk.id`;
    const r = await fetch(`https://graph.facebook.com/v20.0/${PHONE_ID}/messages`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${TOKEN}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ messaging_product: 'whatsapp', to: to, type: 'text', text: { body: msg } })
    });
    const data = await r.json();
    log(JSON.stringify(data));
    return res.json({ ok: true, data });
  } catch (e) {
    error(e.message);
    return res.json({ error: e.message }, 500);
  }
}
