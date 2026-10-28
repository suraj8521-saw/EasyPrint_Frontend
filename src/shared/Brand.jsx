import React from 'react';
import { Printer } from 'lucide-react';
export default function Brand({ compact = false }) {
 return <div className={`brand ${compact ? 'brand-compact' : ''}`}><span className="brand-mark"><Printer strokeWidth={2.8}/></span><span><strong>Easy<span>Print</span></strong><small>Print Smarter, Live Easier</small></span></div>;
}
