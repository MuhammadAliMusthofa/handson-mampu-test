import { User } from "@/src/types";
import { Badge } from "../../ui/Badge";


interface InfoFieldProps {
  label: string;
  value: string;
  href?: string;
}

function InfoField({ label, value, href }: InfoFieldProps) {
  return (
    <div>
      <dt className="text-xs text-slate-500 uppercase tracking-wider mb-0.5">{label}</dt>
      <dd className="text-sm text-slate-200">
        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 hover:underline"
          >
            {value}
          </a>
        ) : (
          value
        )}
      </dd>
    </div>
  );
}

interface UserProfileCardProps {
  user: User;
  postsCount: number;
  completedCount: number;
  pendingCount: number;
}

export function UserProfileCard({ user, postsCount, completedCount, pendingCount }: UserProfileCardProps) {
  const initials = user.name
    .trim()
    .split(/\s+/)
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <section
      aria-labelledby="profile-heading"
      className="rounded-2xl border border-slate-700/50 bg-slate-800/60 p-6 space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div
          className="size-16 rounded-full flex items-center justify-center text-xl font-bold shrink-0 shadow-inner"
          style={{
            background: `hsl(${(user.id * 47) % 360}, 55%, 25%)`,
            color: `hsl(${(user.id * 47) % 360}, 80%, 70%)`,
          }}
          aria-hidden="true"
        >
          {initials}
        </div>
        <div>
          <h1 id="profile-heading" className="text-2xl font-bold text-slate-100">
            {user.name}
          </h1>
          <p className="text-slate-400">@{user.username}</p>
        </div>
        <div className="flex flex-wrap gap-2 sm:ml-auto">
          <Badge variant="primary">{postsCount} posts</Badge>
          <Badge variant="success">✓ {completedCount} selesai</Badge>
          {pendingCount > 0 && (
            <Badge variant="warning">⏳ {pendingCount} tertunda</Badge>
          )}
        </div>
      </div>

      <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <InfoField label="Email" value={user.email} href={`mailto:${user.email}`} />
        <InfoField label="Telepon" value={user.phone} />
        <InfoField label="Website" value={user.website} href={`https://${user.website}`} />
        <InfoField label="Username" value={user.username} />
        <InfoField
          label="Alamat"
          value={`${user.address.street}, ${user.address.suite}, ${user.address.city} ${user.address.zipcode}`}
        />
        <InfoField label="Kota" value={user.address.city} />
      </dl>

      <div className="rounded-xl border border-slate-700/50 bg-slate-900/40 p-4">
        <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Perusahaan</p>
        <p className="font-semibold text-slate-200">{user.company.name}</p>
        <p className="text-sm text-slate-400 mt-0.5 italic">
          &ldquo;{user.company.catchPhrase}&rdquo;
        </p>
        <p className="text-xs text-slate-500 mt-1">{user.company.bs}</p>
      </div>
    </section>
  );
}