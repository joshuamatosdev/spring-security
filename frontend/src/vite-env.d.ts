/// <reference types="vite/client" />
import { UserConfig } from 'vite';
import { InlineConfig } from 'vitest';

declare module 'vite' {
    interface UserConfig {
        test?: InlineConfig;
    }
}