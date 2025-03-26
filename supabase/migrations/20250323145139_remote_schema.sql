drop function if exists "public"."call_webhook_on_user_creation"();

drop view if exists "public"."user_assessments";

create or replace view "public"."user_assessments" as  SELECT u.id,
    assessment_per_user.acuity,
    assessment_per_user.colorblind,
    assessment_per_device.ua,
    assessment_per_device.px_per_mm,
    assessment_per_device.min_contrast,
    assessment_per_user.astigmatism,
    assessment_per_user."cognitiveLoad",
    assessment_per_user.disoriented,
    assessment_per_user."leftRight",
    assessment_per_user."longTexts",
    assessment_per_user."phoneDistraction",
    assessment_per_user."readAgain",
    assessment_per_user."readAloud",
    assessment_per_user."readMedium",
    assessment_per_user."readingAid",
    assessment_per_user."syllableSplitting",
    assessment_per_user."wordMixup"
   FROM ((users u
     JOIN assessment_per_user ON ((assessment_per_user.user_id = u.id)))
     JOIN assessment_per_device ON ((assessment_per_device.user_id = u.id)));



