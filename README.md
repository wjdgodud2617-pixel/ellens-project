# ELDYN v5 — Nutrition Edition

**Move Forward.**  
**Every Limit Defines Your Next.**

ELDYN v5 is the new baseline release. It retains the existing GPS running, profile, progress, meal logging and Supabase sync features, and standardizes the Nutrition workflow around the deployed `analyze-food` Edge Function.

## Nutrition features

- Expanded Korean/English food search
- Recent foods and favourites
- Manual nutrition entry
- Food photo AI analysis
- Packaged-food nutrition label scan
- Editable analysis result before saving
- Portion-based automatic recalculation
- Save to breakfast, lunch, dinner or snack
- AI one-line nutrition note
- Daily calories and macro totals

## Deployment

1. Keep your existing `config.js` Supabase project URL and publishable/anon key.
2. Upload the web files in this folder to the existing GitHub repository and commit.
3. Vercel will redeploy automatically when connected to that repository.
4. Supabase Edge Function name must be exactly `analyze-food`.
5. Supabase Edge Function Secret must contain `OPENAI_API_KEY`.

The canonical Edge Function source is located at:

`supabase/functions/analyze-food/index.ts`

Never put the OpenAI API key or Supabase secret/service-role key in GitHub or `config.js`.
