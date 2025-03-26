set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.call_webhook_on_user_creation()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
DECLARE
    response json;
    webhook_url text := current_setting('ANITA_INTERNAL_API_URL');
    auth_token text := current_setting('ANITA_INTERNAL_API_KEY');
BEGIN
    response := http_post(
        webhook_url,
        json_build_object('user_id', NEW.id, 'email', NEW.email)::text,
        ARRAY[ 'Authorization', auth_token ]
    );
    RETURN NEW;
END;
$function$
;



