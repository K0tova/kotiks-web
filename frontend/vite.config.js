import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';
import dotenv from 'dotenv';

// Load environment variables from repo-root .env before Vite processes them.
dotenv.config({ path: path.resolve(__dirname, '../.env') });

export default defineConfig({
  plugins: [react()]
});
