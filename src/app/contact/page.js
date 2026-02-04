"use client";

import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="container mx-auto px-4 py-16 max-w-4xl">
            <h1 className="text-4xl font-serif text-gold text-center mb-12">Contact Us</h1>

            <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-8">
                    <div className="flex items-start gap-4">
                        <div className="bg-gold/20 p-3 rounded-full"><Mail className="w-6 h-6 text-gold" /></div>
                        <div>
                            <h3 className="font-bold text-xl text-white">Email</h3>
                            <p className="text-emerald-200">support@ansarimatrimonials.com</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="bg-gold/20 p-3 rounded-full"><Phone className="w-6 h-6 text-gold" /></div>
                        <div>
                            <h3 className="font-bold text-xl text-white">Phone</h3>
                            <p className="text-emerald-200">+91 987 654 3210</p>
                            <p className="text-xs text-emerald-400">Available Mon-Fri, 9am - 6pm</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="bg-gold/20 p-3 rounded-full"><MapPin className="w-6 h-6 text-gold" /></div>
                        <div>
                            <h3 className="font-bold text-xl text-white">Office</h3>
                            <p className="text-emerald-200">
                                123, Crescent Tower,<br />
                                Linking Road, Bandra West,<br />
                                Mumbai, Maharashtra 400050
                            </p>
                        </div>
                    </div>
                </div>

                <form className="bg-emerald-900/30 p-8 rounded-2xl border border-gold/10 space-y-4">
                    <h3 className="text-2xl font-serif text-gold mb-4">Send a Message</h3>
                    <input type="text" placeholder="Your Name" className="w-full bg-emerald-950 border border-gold/20 rounded-lg p-3 text-white focus:border-gold outline-none" />
                    <input type="email" placeholder="Your Email" className="w-full bg-emerald-950 border border-gold/20 rounded-lg p-3 text-white focus:border-gold outline-none" />
                    <textarea rows={4} placeholder="How can we help?" className="w-full bg-emerald-950 border border-gold/20 rounded-lg p-3 text-white focus:border-gold outline-none" />
                    <button className="w-full bg-gold text-emerald-950 font-bold py-3 rounded-lg hover:bg-white transition-colors">Submit</button>
                </form>
            </div>
        </div>
    );
}
