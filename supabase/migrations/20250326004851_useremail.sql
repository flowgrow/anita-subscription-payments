drop function if exists "public"."call_webhook_on_user_creation"();

drop function if exists "public"."get_user_id_by_email"(user_email text);

alter table "public"."users" add column "email" text;

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_update_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
begin
  update public.users
    set
      email = new.email,
      first_name = new.raw_user_meta_data->>'first_name',
      last_name = new.raw_user_meta_data->>'last_name',
      avatar_url = new.raw_user_meta_data->>'avatar_url'
    where id = new.id;
  return new;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
begin
  insert into public.users (id, email, first_name, last_name, avatar_url)
  values (new.id, new.email, new.raw_user_meta_data->>'first_name', new.raw_user_meta_data->>'last_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$function$
;



