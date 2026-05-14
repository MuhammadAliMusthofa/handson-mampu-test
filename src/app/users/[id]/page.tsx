import { Suspense } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import userService from "@/src/services/user.service";
import BasicUserDetail from "../../containers/UserDetailContainer";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const users = await userService.getUsersWithActivity();
  return users.map((u) => ({ id: String(u.id) }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const userId = Number(id);

  if (isNaN(userId)) return { title: "Pengguna tidak ditemukan" };

  try {
    const user = await userService.getById(userId);
    return { title: `${user.name} | MAMPU Users` };
  } catch {
    return { title: "Pengguna tidak ditemukan" };
  }
}

export default async function UserDetailPage({ params }: PageProps) {
  const { id } = await params;
  const userId = Number(id);

  if (isNaN(userId) || userId <= 0) notFound();

  try {
    // Fetch data dasar user di server
    const user = await userService.getById(userId); 
    
    return (
      <main className="min-h-screen bg-slate-950 p-8">
        <div className="max-w-4xl mx-auto">
          <a href="/users" className="inline-block mb-6 text-blue-400 hover:underline">
            &larr; Kembali ke Daftar Pengguna
          </a>
          
          <h1 className="text-2xl font-bold text-white mb-6">Detail Halaman User</h1>

          {/* Lempar data user ke Client Component yang akan nge-fetch aktivitasnya */}
          <Suspense fallback={<div className="text-white">Loading detail...</div>}>
            <BasicUserDetail user={user} />
          </Suspense>
        </div>
      </main>
    );
  } catch (err) {
    notFound(); 
  }
}