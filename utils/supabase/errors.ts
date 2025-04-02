export default function getErrorMessageFromCode(code: string) {
  console.log('***********ERROR***********');
  console.log(code);
  console.log('***********ERROR***********');

  switch (code) {
    case 'anonymous_provider_disabled':
      return 'Anonyme Anmeldungen sind nicht möglich.';
    case 'bad_code_verifier':
      return 'Ein Fehler ist bei der Anmeldung aufgetreten. Bitte versuche es erneut.';
    case 'bad_json':
      return 'Die Anfrage konnte nicht verarbeitet werden. Bitte versuche es später erneut.';
    case 'bad_jwt':
      return 'Deine Anmeldung ist abgelaufen. Bitte melde dich erneut an.';
    case 'bad_oauth_callback':
      return 'Die Anmeldung über den externen Anbieter konnte nicht abgeschlossen werden. Bitte versuche es erneut.';
    case 'bad_oauth_state':
      return 'Die Anmeldung über den externen Anbieter konnte nicht abgeschlossen werden. Bitte versuche es erneut.';
    case 'captcha_failed':
      return 'Die Sicherheitsüberprüfung konnte nicht abgeschlossen werden. Bitte versuche es erneut.';
    case 'conflict':
      return 'Ein Fehler ist aufgetreten. Bitte warte einen Moment und versuche es erneut.';
    case 'email_address_invalid':
      return 'Diese E-Mail-Adresse wird nicht unterstützt. Bitte verwende eine andere E-Mail-Adresse.';
    case 'email_address_not_authorized':
      return 'Diese E-Mail-Adresse ist nicht autorisiert. Bitte verwende eine andere E-Mail-Adresse.';
    case 'email_conflict_identity_not_deletable':
      return 'Diese E-Mail-Adresse wird bereits von einem anderen Konto verwendet.';
    case 'email_exists':
      return 'Diese E-Mail-Adresse wird bereits verwendet.';
    case 'email_not_confirmed':
      return 'Deine E-Mail-Adresse ist noch nicht bestätigt.';
    case 'email_provider_disabled':
      return 'Die Anmeldung mit E-Mail und Passwort ist derzeit nicht möglich.';
    case 'flow_state_expired':
      return 'Deine Anmeldung ist abgelaufen. Bitte melde dich erneut an.';
    case 'flow_state_not_found':
      return 'Deine Anmeldung ist abgelaufen. Bitte melde dich erneut an.';
    case 'hook_payload_invalid_content_type':
      return 'Ein Fehler ist aufgetreten. Bitte versuche es später erneut.';
    case 'hook_payload_over_size_limit':
      return 'Die Anfrage ist zu groß. Bitte versuche es mit weniger Daten erneut.';
    case 'hook_timeout':
      return 'Die Anfrage hat zu lange gedauert. Bitte versuche es erneut.';
    case 'hook_timeout_after_retry':
      return 'Die Anfrage konnte nicht abgeschlossen werden. Bitte versuche es später erneut.';
    case 'identity_already_exists':
      return 'Dieser Account ist bereits mit einem anderen Konto verknüpft.';
    case 'identity_not_found':
      return 'Der Account konnte nicht gefunden werden.';
    case 'insufficient_aal':
      return 'Bitte bestätige deine Identität mit einer zusätzlichen Sicherheitsüberprüfung.';
    case 'invite_not_found':
      return 'Der Einladungslink ist ungültig oder wurde bereits verwendet.';
    case 'invalid_credentials':
      return 'E-Mail oder Passwort ist falsch.';
    case 'manual_linking_disabled':
      return 'Das Verknüpfen von Konten ist derzeit nicht möglich.';
    case 'mfa_challenge_expired':
      return 'Die Sicherheitsüberprüfung ist abgelaufen. Bitte fordere eine neue an.';
    case 'mfa_factor_name_conflict':
      return 'Bitte wähle einen anderen Namen für die Sicherheitsüberprüfung.';
    case 'mfa_factor_not_found':
      return 'Die Sicherheitsüberprüfung konnte nicht gefunden werden.';
    case 'mfa_ip_address_mismatch':
      return 'Die Sicherheitsüberprüfung muss von der gleichen IP-Adresse abgeschlossen werden.';
    case 'mfa_phone_enroll_not_enabled':
      return 'Die Anmeldung mit Telefonnummer ist derzeit nicht möglich.';
    case 'mfa_phone_verify_not_enabled':
      return 'Die Verifizierung per Telefon ist derzeit nicht möglich.';
    case 'mfa_totp_enroll_not_enabled':
      return 'Die Anmeldung mit Authenticator-App ist derzeit nicht möglich.';
    case 'mfa_totp_verify_not_enabled':
      return 'Die Verifizierung mit Authenticator-App ist derzeit nicht möglich.';
    case 'mfa_verification_failed':
      return 'Der Code ist falsch. Bitte versuche es erneut.';
    case 'mfa_verification_rejected':
      return 'Die Sicherheitsüberprüfung wurde abgelehnt.';
    case 'mfa_verified_factor_exists':
      return 'Diese Telefonnummer ist bereits verifiziert. Bitte entferne die alte Verifizierung zuerst.';
    case 'mfa_web_authn_enroll_not_enabled':
      return 'Die Anmeldung mit WebAuthn ist derzeit nicht möglich.';
    case 'mfa_web_authn_verify_not_enabled':
      return 'Die Verifizierung mit WebAuthn ist derzeit nicht möglich.';
    case 'no_authorization':
      return 'Bitte melde dich an, um fortzufahren.';
    case 'not_admin':
      return 'Du hast keine Berechtigung für diese Aktion.';
    case 'oauth_provider_not_supported':
      return 'Dieser Anmeldungsanbieter wird nicht unterstützt.';
    case 'otp_disabled':
      return 'Die Anmeldung mit Einmalkennung ist derzeit nicht möglich.';
    case 'otp_expired':
      return 'Der Code ist abgelaufen. Bitte fordere einen neuen an.';
    case 'over_email_send_rate_limit':
      return 'Zu viele E-Mails wurden gesendet. Bitte warte einen Moment und versuche es erneut.';
    case 'over_request_rate_limit':
      return 'Zu viele Anfragen. Bitte warte einen Moment und versuche es erneut.';
    case 'over_sms_send_rate_limit':
      return 'Zu viele SMS wurden gesendet. Bitte warte einen Moment und versuche es erneut.';
    case 'phone_exists':
      return 'Diese Telefonnummer wird bereits verwendet.';
    case 'phone_not_confirmed':
      return 'Bitte bestätige zuerst deine Telefonnummer.';
    case 'phone_provider_disabled':
      return 'Die Anmeldung mit Telefonnummer ist derzeit nicht möglich.';
    case 'provider_disabled':
      return 'Dieser Anmeldungsanbieter ist derzeit nicht verfügbar.';
    case 'provider_email_needs_verification':
      return 'Bitte bestätige deine E-Mail-Adresse, um fortzufahren.';
    case 'reauthentication_needed':
      return 'Bitte melde dich erneut an, um dein Passwort zu ändern.';
    case 'reauthentication_not_valid':
      return 'Der Code ist falsch. Bitte versuche es erneut.';
    case 'refresh_token_not_found':
      return 'Deine Anmeldung ist abgelaufen. Bitte melde dich erneut an.';
    case 'refresh_token_already_used':
      return 'Deine Anmeldung ist abgelaufen. Bitte melde dich erneut an.';
    case 'request_timeout':
      return 'Die Anfrage hat zu lange gedauert. Bitte versuche es erneut.';
    case 'same_password':
      return 'Bitte wähle ein anderes Passwort als dein aktuelles.';
    case 'saml_assertion_no_email':
      return 'Die Anmeldung konnte nicht abgeschlossen werden. Bitte versuche es erneut.';
    case 'saml_assertion_no_user_id':
      return 'Die Anmeldung konnte nicht abgeschlossen werden. Bitte versuche es erneut.';
    case 'saml_entity_id_mismatch':
      return 'Die Anmeldung konnte nicht abgeschlossen werden. Bitte versuche es erneut.';
    case 'saml_idp_already_exists':
      return 'Dieser Anmeldungsanbieter ist bereits konfiguriert.';
    case 'saml_idp_not_found':
      return 'Der Anmeldungsanbieter konnte nicht gefunden werden.';
    case 'saml_metadata_fetch_failed':
      return 'Die Anmeldung konnte nicht abgeschlossen werden. Bitte versuche es erneut.';
    case 'saml_provider_disabled':
      return 'Die Anmeldung über SSO ist derzeit nicht möglich.';
    case 'saml_relay_state_expired':
      return 'Deine Anmeldung ist abgelaufen. Bitte melde dich erneut an.';
    case 'saml_relay_state_not_found':
      return 'Deine Anmeldung ist abgelaufen. Bitte melde dich erneut an.';
    case 'session_expired':
      return 'Deine Anmeldung ist abgelaufen. Bitte melde dich erneut an.';
    case 'session_not_found':
      return 'Deine Anmeldung ist abgelaufen. Bitte melde dich erneut an.';
    case 'signup_disabled':
      return 'Die Registrierung neuer Konten ist derzeit nicht möglich.';
    case 'single_identity_not_deletable':
      return 'Diese Anmeldungsmethode kann nicht entfernt werden.';
    case 'sms_send_failed':
      return 'Die SMS konnte nicht gesendet werden. Bitte versuche es später erneut.';
    case 'sso_domain_already_exists':
      return 'Diese Domain ist bereits für SSO konfiguriert.';
    case 'sso_provider_not_found':
      return 'Der Anmeldungsanbieter konnte nicht gefunden werden.';
    case 'too_many_enrolled_mfa_factors':
      return 'Du hast die maximale Anzahl an Sicherheitsüberprüfungen erreicht.';
    case 'unexpected_audience':
      return 'Ein Fehler ist aufgetreten. Bitte versuche es später erneut.';
    case 'unexpected_failure':
      return 'Ein unerwarteter Fehler ist aufgetreten. Bitte versuche es später erneut.';
    case 'user_already_exists':
      return 'Ein Konto mit diesen Daten existiert bereits.';
    case 'user_banned':
      return 'Dein Konto wurde vorübergehend gesperrt. Bitte versuche es später erneut.';
    case 'user_not_found':
      return 'Das Konto konnte nicht gefunden werden.';
    case 'user_sso_managed':
      return 'Diese Einstellungen können nicht geändert werden.';
    case 'validation_failed':
      return 'Bitte überprüfe deine Eingaben.';
    case 'weak_password':
      return 'Das Passwort ist zu schwach. Bitte wähle ein stärkeres Passwort.';
    default:
      return 'Ein unbekannter Fehler ist aufgetreten. Bitte wende dich an den Support.';
  }
}
