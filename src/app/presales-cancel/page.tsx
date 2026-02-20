"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { XCircle } from 'lucide-react';

export default function CancelPage() {
    return (
        <div className="min-h-screen bg-[#f5f1ed] flex items-center justify-center p-8">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="max-w-md w-full bg-white p-12 rounded-[40px] shadow-2xl text-center space-y-8"
            >
                <div className="flex justify-center">
                    <XCircle size={80} className="text-red-500" />
                </div>
                <h1 className="text-4xl font-bold text-[#504d47]">Payment Cancelled</h1>
                <p className="text-[#504d47]/70 text-lg">
                    The payment was not completed. If you had trouble, please try again or contact support.
                </p>
                <Link
                    href="/pricing"
                    className="block w-full py-4 bg-[#504d47] text-white rounded-2xl font-bold text-xl uppercase tracking-widest hover:bg-black transition-colors"
                >
                    Return to Pricing
                </Link>
            </motion.div>
        </div>
    );
}
