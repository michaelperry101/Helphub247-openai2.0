export default async function handler(req, res){
  if(req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })
  // Placeholder: client uses SpeechSynthesis for TTS. If you have an OpenAI TTS flow, implement here.
  return res.status(200).json({ ok:true })
}
