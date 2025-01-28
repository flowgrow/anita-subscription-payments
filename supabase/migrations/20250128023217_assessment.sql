create table "public"."assessment_per_device" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "user_id" uuid,
    "ua" text not null,
    "px_per_mm" real,
    "min_contrast" real default '0.1'::real
);


alter table "public"."assessment_per_device" enable row level security;

create table "public"."assessment_per_user" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "user_id" uuid,
    "acuity" real,
    "colorblind" real
);


alter table "public"."assessment_per_user" enable row level security;

CREATE UNIQUE INDEX assessment_per_device_pkey ON public.assessment_per_device USING btree (id, ua);

CREATE UNIQUE INDEX assessment_per_user_pkey ON public.assessment_per_user USING btree (id);

alter table "public"."assessment_per_device" add constraint "assessment_per_device_pkey" PRIMARY KEY using index "assessment_per_device_pkey";

alter table "public"."assessment_per_user" add constraint "assessment_per_user_pkey" PRIMARY KEY using index "assessment_per_user_pkey";

alter table "public"."assessment_per_device" add constraint "public_assessment_per_device_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE not valid;

alter table "public"."assessment_per_device" validate constraint "public_assessment_per_device_user_id_fkey";

alter table "public"."assessment_per_user" add constraint "public_assessment_per_user_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE not valid;

alter table "public"."assessment_per_user" validate constraint "public_assessment_per_user_user_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.get_user_id_by_email(user_email text)
 RETURNS uuid
 LANGUAGE plpgsql
AS $function$
  declare
  user_id uuid;
begin
  select id 
  from auth.users 
  where email = user_email 
  into user_id;

  return user_id;
end;
$function$
;

grant delete on table "public"."assessment_per_device" to "anon";

grant insert on table "public"."assessment_per_device" to "anon";

grant references on table "public"."assessment_per_device" to "anon";

grant select on table "public"."assessment_per_device" to "anon";

grant trigger on table "public"."assessment_per_device" to "anon";

grant truncate on table "public"."assessment_per_device" to "anon";

grant update on table "public"."assessment_per_device" to "anon";

grant delete on table "public"."assessment_per_device" to "authenticated";

grant insert on table "public"."assessment_per_device" to "authenticated";

grant references on table "public"."assessment_per_device" to "authenticated";

grant select on table "public"."assessment_per_device" to "authenticated";

grant trigger on table "public"."assessment_per_device" to "authenticated";

grant truncate on table "public"."assessment_per_device" to "authenticated";

grant update on table "public"."assessment_per_device" to "authenticated";

grant delete on table "public"."assessment_per_device" to "service_role";

grant insert on table "public"."assessment_per_device" to "service_role";

grant references on table "public"."assessment_per_device" to "service_role";

grant select on table "public"."assessment_per_device" to "service_role";

grant trigger on table "public"."assessment_per_device" to "service_role";

grant truncate on table "public"."assessment_per_device" to "service_role";

grant update on table "public"."assessment_per_device" to "service_role";

grant delete on table "public"."assessment_per_user" to "anon";

grant insert on table "public"."assessment_per_user" to "anon";

grant references on table "public"."assessment_per_user" to "anon";

grant select on table "public"."assessment_per_user" to "anon";

grant trigger on table "public"."assessment_per_user" to "anon";

grant truncate on table "public"."assessment_per_user" to "anon";

grant update on table "public"."assessment_per_user" to "anon";

grant delete on table "public"."assessment_per_user" to "authenticated";

grant insert on table "public"."assessment_per_user" to "authenticated";

grant references on table "public"."assessment_per_user" to "authenticated";

grant select on table "public"."assessment_per_user" to "authenticated";

grant trigger on table "public"."assessment_per_user" to "authenticated";

grant truncate on table "public"."assessment_per_user" to "authenticated";

grant update on table "public"."assessment_per_user" to "authenticated";

grant delete on table "public"."assessment_per_user" to "service_role";

grant insert on table "public"."assessment_per_user" to "service_role";

grant references on table "public"."assessment_per_user" to "service_role";

grant select on table "public"."assessment_per_user" to "service_role";

grant trigger on table "public"."assessment_per_user" to "service_role";

grant truncate on table "public"."assessment_per_user" to "service_role";

grant update on table "public"."assessment_per_user" to "service_role";

create policy "Enable all for users based on user_id"
on "public"."assessment_per_device"
as permissive
for all
to public
using ((auth.uid() = user_id));


create policy "Enable all for users based on user_id"
on "public"."assessment_per_user"
as permissive
for all
to public
using ((auth.uid() = user_id));




