import { getUser } from '@lib/utils/user';
import { mergeDefault } from '@sapphire/utilities';
import constate from 'constate';
import { useCallback, useState } from 'react';
const user = getUser();


const useDiscordPackState = () => {
	
	const [pack, setPack] = useState<{id: number, username: string, rights: number} | null>(user?.id ? user : null);

	const mergePack = useCallback((newPack: Partial<{id: number, username: string, rights: number}>) => setPack(mergeDefault(pack!, newPack)), [pack]);

	return { pack, mergePack };
};

export const [UserProvider, useUserState, mergeUser] = constate(
	useDiscordPackState,
	(value) => value.pack,
	(value) => value.mergePack
);

export default UserProvider;