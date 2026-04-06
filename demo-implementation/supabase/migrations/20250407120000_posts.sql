-- 投稿 CRUD（Clerk ユーザーと紐づけ）
-- アプリは service_role でアクセスし、サーバー側で clerk_user_id を検証する。

create table public.posts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users (id) on delete cascade,
  title text not null,
  body text not null default '',
  created_at timestamptz default now() not null,
  updated_at timestamptz default now() not null
);

comment on table public.posts is 'ユーザー投稿（講義・統合デモ用）';

create index idx_posts_user_id on public.posts (user_id);
create index idx_posts_created_at on public.posts (created_at desc);

alter table public.posts enable row level security;
