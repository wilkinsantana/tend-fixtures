import { env } from '$env/dynamic/private';

export const load = () => ({ message: env.FIXTURE_MESSAGE || '(unset)' });
