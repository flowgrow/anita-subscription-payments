alter table "public"."auth_transfer_tokens" drop constraint "auth_transfer_tokens_user_id_fkey";

alter table "public"."a11y_settings" drop constraint "public_a11y_settings_user_id_fkey";

alter table "public"."anita_button_state" drop constraint "public_anita_button_state_user_id_fkey";

alter table "public"."assessment_per_device" drop constraint "public_assessment_per_device_user_id_fkey";

alter table "public"."assessment_per_user" drop constraint "public_assessment_per_user_user_id_fkey";

alter table "public"."reader_settings" drop constraint "public_reader_settings_user_id_fkey";

alter table "public"."auth_transfer_tokens" add constraint "public_auth_transfer_tokens_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."auth_transfer_tokens" validate constraint "public_auth_transfer_tokens_user_id_fkey";

alter table "public"."a11y_settings" add constraint "public_a11y_settings_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."a11y_settings" validate constraint "public_a11y_settings_user_id_fkey";

alter table "public"."anita_button_state" add constraint "public_anita_button_state_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."anita_button_state" validate constraint "public_anita_button_state_user_id_fkey";

alter table "public"."assessment_per_device" add constraint "public_assessment_per_device_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."assessment_per_device" validate constraint "public_assessment_per_device_user_id_fkey";

alter table "public"."assessment_per_user" add constraint "public_assessment_per_user_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."assessment_per_user" validate constraint "public_assessment_per_user_user_id_fkey";

alter table "public"."reader_settings" add constraint "public_reader_settings_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."reader_settings" validate constraint "public_reader_settings_user_id_fkey";



