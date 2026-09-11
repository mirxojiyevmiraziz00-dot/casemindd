create table if not exists public.telegram_messages (
  update_id bigint primary key,
  chat_id bigint not null,
  user_id bigint,
  username text,
  text text,
  ai_reply text,
  raw_update jsonb not null,
  created_at timestamptz not null default now()
);

create index if not exists idx_telegram_messages_chat_id on public.telegram_messages (chat_id);

-- Server-only table: only service_role (used by webhook handler) needs access.
-- No anon/authenticated grants: this data is never exposed to app users.
revoke all on public.telegram_messages from anon, authenticated;
grant all on public.telegram_messages to service_role;

alter table public.telegram_messages enable row level security;

-- No policies: service_role bypasses RLS; anon/authenticated have no grants and no policies.
