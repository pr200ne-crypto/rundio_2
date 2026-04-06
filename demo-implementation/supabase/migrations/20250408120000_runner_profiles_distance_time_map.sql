-- オンボーディング: よく走る距離・時間・地図上のコース起点
alter table public.runner_profiles
  add column if not exists run_distance_km numeric(8, 2),
  add column if not exists run_duration_min integer,
  add column if not exists course_lat double precision,
  add column if not exists course_lng double precision,
  add column if not exists course_label text;

comment on column public.runner_profiles.run_distance_km is 'よく走る距離（km）';
comment on column public.runner_profiles.run_duration_min is 'よく走る時間（分）';
comment on column public.runner_profiles.course_lat is 'コース起点 緯度（地図選択）';
comment on column public.runner_profiles.course_lng is 'コース起点 経度（地図選択）';
comment on column public.runner_profiles.course_label is 'コース・場所の任意メモ';
