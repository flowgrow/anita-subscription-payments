create table "public"."auth_transfer_tokens" (
    "token" uuid not null,
    "user_id" uuid not null,
    "session_data" jsonb not null,
    "created_at" timestamp with time zone default (now() AT TIME ZONE 'utc'::text)
);


alter table "public"."auth_transfer_tokens" enable row level security;

CREATE UNIQUE INDEX auth_transfer_tokens_pkey ON public.auth_transfer_tokens USING btree (token);

alter table "public"."auth_transfer_tokens" add constraint "auth_transfer_tokens_pkey" PRIMARY KEY using index "auth_transfer_tokens_pkey";

alter table "public"."auth_transfer_tokens" add constraint "auth_transfer_tokens_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) not valid;

alter table "public"."auth_transfer_tokens" validate constraint "auth_transfer_tokens_user_id_fkey";

grant delete on table "public"."auth_transfer_tokens" to "anon";

grant insert on table "public"."auth_transfer_tokens" to "anon";

grant references on table "public"."auth_transfer_tokens" to "anon";

grant select on table "public"."auth_transfer_tokens" to "anon";

grant trigger on table "public"."auth_transfer_tokens" to "anon";

grant truncate on table "public"."auth_transfer_tokens" to "anon";

grant update on table "public"."auth_transfer_tokens" to "anon";

grant delete on table "public"."auth_transfer_tokens" to "authenticated";

grant insert on table "public"."auth_transfer_tokens" to "authenticated";

grant references on table "public"."auth_transfer_tokens" to "authenticated";

grant select on table "public"."auth_transfer_tokens" to "authenticated";

grant trigger on table "public"."auth_transfer_tokens" to "authenticated";

grant truncate on table "public"."auth_transfer_tokens" to "authenticated";

grant update on table "public"."auth_transfer_tokens" to "authenticated";

grant delete on table "public"."auth_transfer_tokens" to "service_role";

grant insert on table "public"."auth_transfer_tokens" to "service_role";

grant references on table "public"."auth_transfer_tokens" to "service_role";

grant select on table "public"."auth_transfer_tokens" to "service_role";

grant trigger on table "public"."auth_transfer_tokens" to "service_role";

grant truncate on table "public"."auth_transfer_tokens" to "service_role";

grant update on table "public"."auth_transfer_tokens" to "service_role";

create policy "Only service role can delete tokens"
on "public"."auth_transfer_tokens"
as permissive
for delete
to public
using ((current_setting('role'::text) = 'service_role'::text));


create policy "Only service role can read tokens"
on "public"."auth_transfer_tokens"
as permissive
for select
to public
using ((current_setting('role'::text) = 'service_role'::text));


create policy "Users can create their own transfer tokens"
on "public"."auth_transfer_tokens"
as permissive
for insert
to authenticated
with check ((auth.uid() = user_id));




