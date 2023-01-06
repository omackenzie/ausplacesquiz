import { createClient } from '@supabase/supabase-js';

let supabaseURL = import.meta.env.VITE_SUPABASE_URL;
let supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

console.log(supabaseURL);
console.log(supabaseAnonKey);

export const supabase = createClient(supabaseURL, supabaseAnonKey);
