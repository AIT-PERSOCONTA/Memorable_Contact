"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

export default function SuccessPage() {
    return (
        <div className="min-h-screen bg-[#f5f1ed] flex items-center justify-center p-8">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="max-w-md w-full bg-white p-12 rounded-[40px] shadow-2xl text-center space-y-8"
            >
                <div className="flex justify-center">
                    <CheckCircle size={80} className="text-[#ed6b06]" />
                </div>
                <h1 className="text-4xl font-bold text-[#504d47]">Payment Successful!</h1>
                <p className="text-[#504d47]/70 text-lg">
                    Thank you for your investment in Memorable Contact. Your pre-sales spot is secured.
                </p>
                <Link
                    href="/"
                    className="block w-full py-4 bg-[#ed6b06] text-white rounded-2xl font-bold text-xl uppercase tracking-widest hover:bg-[#af4d02] transition-colors"
                >
                    Back to Home
                </Link>
            </motion.div>
        </div>
    );
}
