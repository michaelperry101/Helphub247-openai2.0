import dynamic from 'next/dynamic'
const ChatWindow = dynamic(()=>import('../../components/ChatWindow'), { ssr:false })
export default function ChatPage(){ return (<div className='card'><ChatWindow/></div>) }
