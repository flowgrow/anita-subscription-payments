# On User Created Function

This Supabase Edge Function is triggered automatically when a new user is created in Supabase Auth. It calls the `/api/new-signup` endpoint in your application to perform any necessary actions for new user signups.

## Functionality

When a new user is created in Supabase Auth:

1. This function is triggered automatically
2. It extracts the user's email address
3. It calls your application's `/api/new-signup` endpoint with the email as a query parameter
4. The endpoint is called with the `auth_token` header set to the `INTERNAL_API_KEY` for authentication

## Deployment

To deploy this function to your Supabase project:

```bash
# Navigate to your project root
cd /path/to/your/project

# Deploy the function
supabase functions deploy on-user-created --project-ref your-project-ref
```

## Environment Variables

This function requires the following environment variables:

- `INTERNAL_API_KEY`: The secret key used to authenticate with your application's API
- `APP_URL`: The base URL of your application (defaults to http://localhost:3000 if not set)

Set these variables in the Supabase dashboard or using the CLI:

```bash
supabase secrets set INTERNAL_API_KEY=your-secret-key --project-ref your-project-ref
supabase secrets set APP_URL=https://your-app-url.com --project-ref your-project-ref
```

## Testing

You can test this function by creating a new user in Supabase Auth through your application's signup flow or directly through the Supabase dashboard.

## Logs

View function logs in the Supabase dashboard under Functions > on-user-created > Logs.
