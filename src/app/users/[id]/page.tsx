import { Suspense } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import userService from "@/src/services/user.service";
import { BreadCrumpDetail } from "@/src/components/users/detail/BreadCrumpDetail";
import { DetailSkeleton } from "@/src/components/skeletons/DetailSkeleton";
import { UserDetailContainer } from "../../containers/UserDetailContainer";
import { ApiError } from "@/src/services/api";

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

  if (isNaN(userId)) {
    return { title: "Pengguna tidak ditemukan" };
  }

  try {
    const user = await userService.getById(userId);
    return {
      title: user.name,
      description: `Profil ${user.name}: email ${user.email}, bekerja di ${user.company.name}.`,
      openGraph: {
        title: `${user.name} | MAMPU Users`,
        description: `Lihat aktivitas, posts, dan todos dari ${user.name}.`,
      },
    };
  } catch {
    return { title: "Pengguna tidak ditemukan" };
  }
}

export default async function UserDetailPage({ params }: PageProps) {
  const { id } = await params;
  const userId = Number(id);

  if (isNaN(userId) || userId <= 0) {
    notFound();
  }

  try {
    const user = await userService.getById(userId); 
    
    return (
      <main className="min-h-screen">
        <BreadCrumpDetail userName={user.name} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Suspense fallback={<DetailSkeleton />}>
            <UserDetailContainer user={user} />
          </Suspense>
        </div>
      </main>
    );
  } catch (err) {
    if (err instanceof ApiError && err.status === 404) {
      notFound();
    }
    throw err; 
  }
}