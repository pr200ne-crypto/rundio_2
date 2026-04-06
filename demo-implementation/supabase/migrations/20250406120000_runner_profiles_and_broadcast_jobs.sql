-- ============================================
-- ランニング・パーソナルラジオ: プロフィールと生成ジョブ
-- アクセスは原則 Next.js API（service_role）経由を想定。
-- ============================================

-- ランナー嗜好・目的（1ユーザー1行）
create table public.runner_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users (id) on delete cascade,
  likes_notes text,
  run_purpose text,
  course_vibes text,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null,
  unique (user_id)
);

comment on table public.runner_profiles is '走る目的・好み・コースのイメージ（オンボーディング）';

create index idx_runner_profiles_user_id on public.runner_profiles (user_id);

-- 放送生成ジョブ
create table public.broadcast_jobs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users (id) on delete cascade,
  status text not null default 'pending'
    check (status in ('pending', 'processing', 'ready', 'failed')),
  target_duration_min integer,
  target_distance_km numeric(8, 2),
  audio_storage_path text,
  error_message text,
  meta jsonb default '{}'::jsonb,
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

comment on table public.broadcast_jobs is 'パーソナル放送の生成ジョブと成果物メタ';

create index idx_broadcast_jobs_user_id on public.broadcast_jobs (user_id);
create index idx_broadcast_jobs_status on public.broadcast_jobs (status);

alter table public.runner_profiles enable row level security;
alter table public.broadcast_jobs enable row level security;

-- Clerk 経由の JWT を Supabase に載せない構成では、
-- anon/authenticated からの直接参照は行わず service_role がバイパスする前提。
