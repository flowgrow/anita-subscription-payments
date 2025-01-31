alter type "auth"."factor_type" rename to "factor_type__old_version_to_be_dropped";

create type "auth"."factor_type" as enum ('totp', 'webauthn', 'phone');

alter table "auth"."mfa_factors" alter column factor_type type "auth"."factor_type" using factor_type::text::"auth"."factor_type";

drop type "auth"."factor_type__old_version_to_be_dropped";

alter table "auth"."mfa_challenges" add column "otp_code" text;

alter table "auth"."mfa_challenges" add column "web_authn_session_data" jsonb;

alter table "auth"."mfa_factors" add column "last_challenged_at" timestamp with time zone;

alter table "auth"."mfa_factors" add column "phone" text;

alter table "auth"."mfa_factors" add column "web_authn_aaguid" uuid;

alter table "auth"."mfa_factors" add column "web_authn_credential" jsonb;

CREATE UNIQUE INDEX mfa_factors_last_challenged_at_key ON auth.mfa_factors USING btree (last_challenged_at);

CREATE UNIQUE INDEX unique_phone_factor_per_user ON auth.mfa_factors USING btree (user_id, phone);

alter table "auth"."mfa_factors" add constraint "mfa_factors_last_challenged_at_key" UNIQUE using index "mfa_factors_last_challenged_at_key";


