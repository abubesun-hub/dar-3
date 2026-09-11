-- =====================================================
-- إعداد قاعدة بيانات محتوى الموقع — الصق هذا الملف
-- كاملاً في SQL Editor داخل لوحة Supabase ثم نفّذه.
--
-- تنبيه أمني مهم:
-- بعد التنفيذ، اذهب إلى Authentication → Sign In / Up
-- وأوقف خيار "Allow new users to sign up"
-- حتى لا يتمكن أي شخص من التسجيل والتعديل على المحتوى.
-- =====================================================

-- 1) جدول محتوى الموقع (صف واحد فقط)
create table if not exists public.site_content (
  id int primary key default 1 check (id = 1),
  data jsonb not null,
  updated_at timestamptz not null default now()
);

-- 2) تفعيل الحماية على مستوى الصفوف (RLS)
alter table public.site_content enable row level security;

-- 3) الجميع (الزوار) يستطيعون القراءة
create policy "public_read_content"
  on public.site_content
  for select
  using (true);

-- 4) المسجّلون فقط (المدير) يستطيعون الكتابة
create policy "authenticated_write_content"
  on public.site_content
  for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');
