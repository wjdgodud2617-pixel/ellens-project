-- ELDYN — safe to run more than once
create table if not exists public.daily_logs (
  user_id uuid not null references auth.users(id) on delete cascade,
  date date not null,
  payload jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  primary key (user_id, date)
);

alter table public.daily_logs enable row level security;

drop policy if exists "Users can read their own daily logs" on public.daily_logs;
drop policy if exists "Users can insert their own daily logs" on public.daily_logs;
drop policy if exists "Users can update their own daily logs" on public.daily_logs;
drop policy if exists "Users can delete their own daily logs" on public.daily_logs;

create policy "Users can read their own daily logs"
on public.daily_logs for select
using (auth.uid() = user_id);

create policy "Users can insert their own daily logs"
on public.daily_logs for insert
with check (auth.uid() = user_id);

create policy "Users can update their own daily logs"
on public.daily_logs for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Users can delete their own daily logs"
on public.daily_logs for delete
using (auth.uid() = user_id);

grant select, insert, update, delete on public.daily_logs to authenticated;
