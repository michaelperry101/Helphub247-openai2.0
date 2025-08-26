export default async function handler(req, res){
  if(req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  let body = req.body
  try{ body = typeof body === 'string' ? JSON.parse(body) : body }catch(e){}
  const messages = body.messages || []
  const key = process.env.OPENAI_API_KEY
  const model = process.env.OPENAI_MODEL || 'gpt-5'
  if(!key) return res.status(200).json({ reply: `Carys (demo): I heard "${messages[messages.length-1]?.content||''}"` })
  try{
    const resp = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${key}` },
      body: JSON.stringify({ model, messages: [{ role:'system', content:'You are Carys, a helpful British AI assistant. Keep responses concise and friendly.' }, ...messages] })
    })
    const j = await resp.json()
    const reply = j?.choices?.[0]?.message?.content || 'Sorry, no answer.'
    return res.status(200).json({ reply })
  }catch(e){
    return res.status(500).json({ reply: 'Carys (error): OpenAI request failed.' })
  }
}
