import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AdminDashboard from "@/components/admin/AdminDashboard";

export default async function AdminPage() {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'admin') {
        redirect("/admin/login");
    }

    return <AdminDashboard />;
}
