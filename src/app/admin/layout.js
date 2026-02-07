import AdminNavbar from "@/components/admin/AdminNavbar";

export default function AdminLayout({ children }) {
    return (
        <div className="min-h-screen bg-emerald-950 text-white selection:bg-gold/30">
            <AdminNavbar />
            <main className="container mx-auto px-6 py-8">
                {children}
            </main>
        </div>
    );
}
