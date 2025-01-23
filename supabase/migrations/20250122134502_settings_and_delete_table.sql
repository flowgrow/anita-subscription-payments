alter table "public"."customers" drop constraint "customers_id_fkey";

alter table "public"."subscriptions" drop constraint "subscriptions_user_id_fkey";

alter table "public"."users" drop constraint "users_id_fkey";

create table "public"."a11y_settings" (
    "user_id" uuid not null default auth.uid(),
    "settings" text,
    "created_at" timestamp with time zone not null default now(),
    "id" uuid not null default gen_random_uuid(),
    "updated_at" timestamp with time zone not null default now(),
    "settings_name" text not null
);


alter table "public"."a11y_settings" enable row level security;

create table "public"."reader_settings" (
    "user_id" uuid not null,
    "settings" jsonb,
    "created_at" timestamp with time zone not null default now(),
    "id" uuid not null default gen_random_uuid(),
    "updated_at" timestamp with time zone not null default now(),
    "settings_name" text
);


alter table "public"."reader_settings" enable row level security;

create table "public"."to_delete" (
    "id" uuid not null,
    "created_at" timestamp with time zone not null default now()
);


alter table "public"."to_delete" enable row level security;

CREATE UNIQUE INDEX a11y_settings_pkey ON public.a11y_settings USING btree (id);

CREATE UNIQUE INDEX a11y_settings_settings_name_key ON public.a11y_settings USING btree (settings_name);

CREATE UNIQUE INDEX reader_settings_pkey ON public.reader_settings USING btree (id);

CREATE UNIQUE INDEX to_delete_pkey ON public.to_delete USING btree (id);

alter table "public"."a11y_settings" add constraint "a11y_settings_pkey" PRIMARY KEY using index "a11y_settings_pkey";

alter table "public"."reader_settings" add constraint "reader_settings_pkey" PRIMARY KEY using index "reader_settings_pkey";

alter table "public"."to_delete" add constraint "to_delete_pkey" PRIMARY KEY using index "to_delete_pkey";

alter table "public"."a11y_settings" add constraint "a11y_settings_settings_name_check" CHECK ((length(settings_name) < 2000)) not valid;

alter table "public"."a11y_settings" validate constraint "a11y_settings_settings_name_check";

alter table "public"."a11y_settings" add constraint "a11y_settings_settings_name_key" UNIQUE using index "a11y_settings_settings_name_key";

alter table "public"."a11y_settings" add constraint "public_a11y_settings_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."a11y_settings" validate constraint "public_a11y_settings_user_id_fkey";

alter table "public"."customers" add constraint "public_customers_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."customers" validate constraint "public_customers_id_fkey";

alter table "public"."reader_settings" add constraint "public_reader_settings_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."reader_settings" validate constraint "public_reader_settings_user_id_fkey";

alter table "public"."reader_settings" add constraint "reader_settings_settings_name_check" CHECK ((length(settings_name) < 2000)) not valid;

alter table "public"."reader_settings" validate constraint "reader_settings_settings_name_check";

alter table "public"."subscriptions" add constraint "public_subscriptions_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."subscriptions" validate constraint "public_subscriptions_user_id_fkey";

alter table "public"."to_delete" add constraint "public_to_delete_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."to_delete" validate constraint "public_to_delete_id_fkey";

alter table "public"."users" add constraint "public_users_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."users" validate constraint "public_users_id_fkey";

grant delete on table "public"."a11y_settings" to "anon";

grant insert on table "public"."a11y_settings" to "anon";

grant references on table "public"."a11y_settings" to "anon";

grant select on table "public"."a11y_settings" to "anon";

grant trigger on table "public"."a11y_settings" to "anon";

grant truncate on table "public"."a11y_settings" to "anon";

grant update on table "public"."a11y_settings" to "anon";

grant delete on table "public"."a11y_settings" to "authenticated";

grant insert on table "public"."a11y_settings" to "authenticated";

grant references on table "public"."a11y_settings" to "authenticated";

grant select on table "public"."a11y_settings" to "authenticated";

grant trigger on table "public"."a11y_settings" to "authenticated";

grant truncate on table "public"."a11y_settings" to "authenticated";

grant update on table "public"."a11y_settings" to "authenticated";

grant delete on table "public"."a11y_settings" to "service_role";

grant insert on table "public"."a11y_settings" to "service_role";

grant references on table "public"."a11y_settings" to "service_role";

grant select on table "public"."a11y_settings" to "service_role";

grant trigger on table "public"."a11y_settings" to "service_role";

grant truncate on table "public"."a11y_settings" to "service_role";

grant update on table "public"."a11y_settings" to "service_role";

grant delete on table "public"."reader_settings" to "anon";

grant insert on table "public"."reader_settings" to "anon";

grant references on table "public"."reader_settings" to "anon";

grant select on table "public"."reader_settings" to "anon";

grant trigger on table "public"."reader_settings" to "anon";

grant truncate on table "public"."reader_settings" to "anon";

grant update on table "public"."reader_settings" to "anon";

grant delete on table "public"."reader_settings" to "authenticated";

grant insert on table "public"."reader_settings" to "authenticated";

grant references on table "public"."reader_settings" to "authenticated";

grant select on table "public"."reader_settings" to "authenticated";

grant trigger on table "public"."reader_settings" to "authenticated";

grant truncate on table "public"."reader_settings" to "authenticated";

grant update on table "public"."reader_settings" to "authenticated";

grant delete on table "public"."reader_settings" to "service_role";

grant insert on table "public"."reader_settings" to "service_role";

grant references on table "public"."reader_settings" to "service_role";

grant select on table "public"."reader_settings" to "service_role";

grant trigger on table "public"."reader_settings" to "service_role";

grant truncate on table "public"."reader_settings" to "service_role";

grant update on table "public"."reader_settings" to "service_role";

grant delete on table "public"."to_delete" to "anon";

grant insert on table "public"."to_delete" to "anon";

grant references on table "public"."to_delete" to "anon";

grant select on table "public"."to_delete" to "anon";

grant trigger on table "public"."to_delete" to "anon";

grant truncate on table "public"."to_delete" to "anon";

grant update on table "public"."to_delete" to "anon";

grant delete on table "public"."to_delete" to "authenticated";

grant insert on table "public"."to_delete" to "authenticated";

grant references on table "public"."to_delete" to "authenticated";

grant select on table "public"."to_delete" to "authenticated";

grant trigger on table "public"."to_delete" to "authenticated";

grant truncate on table "public"."to_delete" to "authenticated";

grant update on table "public"."to_delete" to "authenticated";

grant delete on table "public"."to_delete" to "service_role";

grant insert on table "public"."to_delete" to "service_role";

grant references on table "public"."to_delete" to "service_role";

grant select on table "public"."to_delete" to "service_role";

grant trigger on table "public"."to_delete" to "service_role";

grant truncate on table "public"."to_delete" to "service_role";

grant update on table "public"."to_delete" to "service_role";

create policy "Can do everything on their own data"
on "public"."a11y_settings"
as permissive
for all
to public
using ((auth.uid() = user_id))
with check ((auth.uid() = user_id));


create policy "Can view own user settings."
on "public"."reader_settings"
as permissive
for select
to public
using ((auth.uid() = user_id));


create policy "Users can create their own settings"
on "public"."reader_settings"
as permissive
for insert
to authenticated
with check ((auth.uid() = user_id));


create policy "Users can edit their own settings"
on "public"."reader_settings"
as permissive
for update
to authenticated
with check ((auth.uid() = user_id));


create policy "Enable insert for authenticated users only"
on "public"."to_delete"
as permissive
for insert
to public
with check (true);


create policy "Enable select for users based on user_id"
on "public"."to_delete"
as permissive
for select
to public
using ((auth.uid() = id));




