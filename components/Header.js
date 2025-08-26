'use client'
import Image from 'next/image'
import Link from 'next/link'
export default function Header(){
  return (
    <header className="header">
      <div className="header-inner">
        <div style={{width:80}}></div>
        <div style={{display:'flex',alignItems:'center',gap:12}}>
          <Image src="/logo.svg" alt="Helphub247" width={160} height={36} priority />
        </div>
        <nav style={{display:'flex',gap:12}}>
          <Link href="/subscribe" className="text-sm">Subscribe</Link>
          <Link href="/settings" className="text-sm">Settings</Link>
        </nav>
      </div>
    </header>
  )
}
